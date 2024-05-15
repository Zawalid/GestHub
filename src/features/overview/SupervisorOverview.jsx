import { DateTime } from 'luxon';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Rectangle } from 'recharts';
import { FaCalendarXmark, FaDiagramProject, FaRegCircleCheck, IoPeople } from '@/components/ui/Icons';
import { useProjects } from '@/features/projects/useProjects';
import { checkIsTaskOverdue, getTimelineDates } from '@/utils/helpers';
import { useTasks } from '@/features/projects/useTasks';
import PieChartStats, { Legend, createCustomTooltip } from '@/features/overview/PieChart';
import { Status } from '@/components/ui';
import { Stat } from './Stat';

export default function SupervisorOverview() {
  const { projects, isLoading } = useProjects();
  return (
    <div className='flex h-full flex-col gap-5'>
      <Stats projects={projects} isLoading={isLoading} />
      <div className='grid flex-1 gap-5 lg:grid-cols-[3fr,2fr]'>
        <TasksAnalytics />
        <PieChartStats
          data={[
            { name: 'Completed', value: projects?.filter((p) => p.status === 'Completed').length },
            { name: 'In-progress', value: projects?.filter((p) => p.status === 'In Progress').length },
            { name: 'Not Started', value: projects?.filter((p) => p.status === 'Not Started').length },
          ]}
          title='Projects Status'
          legend={[
            { text: 'Completed', color: 'bg-green-500' },
            { text: 'In Progress', color: 'bg-blue-500' },
            { text: 'Not Started', color: 'bg-gray-500' },
          ]}
          COLORS={['#16a34a', '#3b82f6', '#6B7280']}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export function TasksAnalytics() {
  const { tasks, isLoading } = useTasks();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const data = days.map((day, i) => {
    const tasksOnDay = tasks?.filter((task) => DateTime.fromISO(task.created_at).weekday === i + 1);
    const completedTasksOnDay = tasks?.filter(
      (task) => task.status === 'Done' && DateTime.fromISO(task.updated_at).weekday === i + 1
    );
    const overdueTasks = tasks?.filter((t) => checkIsTaskOverdue(t) && DateTime.fromISO(t.dueDate).weekday === i + 1);

    return {
      name: day.slice(0, 3),
      fullName : day,
      Added: tasksOnDay?.length,
      Completed: completedTasksOnDay?.length,
      Overdue: overdueTasks?.length,
    };
  });

  const CustomTooltip = createCustomTooltip([
    { key: 'fullName',label : 'Day'},
    { key: 'Added', intro: 'Added' },
    { key: 'Completed', intro: 'Completed' },
    { key: 'Overdue', intro: 'Overdue' },
  ]);

  return (
    <div className='relative min-h-[300px] flex-1 grid gap-5 rounded-lg border border-border bg-background-secondary p-3'>
      <div className='flex justify-between gap-5'>
        <h2 className='text-lg font-bold text-text-primary'>Weekly Tasks Progress</h2>
        <Legend
          legend={[
            { text: 'Added', color: 'bg-blue-500' },
            { text: 'Completed', color: 'bg-green-500' },
            { text: 'Overdue', color: 'bg-red-500' },
          ]}
        />
      </div>
      {isLoading ? (
        <Status status='loading' />
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} className=''>
            <XAxis dataKey='name' className='text-xs font-medium' />
            <YAxis width={30} domain={[0, 'dataMax']} allowDecimals={false} />{' '}
            <Tooltip
              content={CustomTooltip}
              wrapperClassName='tooltip'
              cursor={<Rectangle radius={5} stroke='var(--border)' fill='var(--background-tertiary)' />}
            />
            <Bar dataKey='Added' fill='#3b82f6' legendType='circle' />
            <Bar dataKey='Completed' fill='#16a34a' legendType='circle' />
            <Bar dataKey='Overdue' fill='#ef4444' legendType='circle' />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

function Stats({ projects, isLoading }) {
  const stats = [
    {
      label: { value: 'Total Projects' },
      value: { value: projects?.length },
      icon: { icon: <FaDiagramProject /> },
      className: 'bg-orange-400 dark:bg-orange-500',
    },
    {
      label: { value: 'Completed Projects' },
      value: { value: projects?.filter((p) => p.status === 'Completed').length },
      icon: { icon: <FaRegCircleCheck /> },
      className: 'bg-green-500 dark:bg-green-600',
    },
    {
      label: { value: 'Overdue Projects' },
      value: {
        value: projects?.filter((p) => {
          const { isOverdue } = getTimelineDates(p.startDate, p.endDate);
          return isOverdue;
        }).length,
      },
      icon: { icon: <FaCalendarXmark /> },
      className: 'bg-red-400 dark:bg-red-500',
    },
    {
      label: { value: 'Team Members', color: 'text-text-secondary' },
      value: {
        value: [...new Set(projects?.map((p) => p.teamMembers).flat())].length,
        color: 'text-text-primary',
      },
      icon: { icon: <IoPeople />, className: 'bg-background-tertiary' },
      className: 'border border-border bg-background-secondary',
    },
  ];

  return (
    <div className='flex flex-col gap-5 mobile:grid mobile:grid-cols-2 md:grid-cols-4'>
      {stats.map((stat, index) => (
        <Stat key={index} isLoading={isLoading} {...stat} />
      ))}
    </div>
  );
}
