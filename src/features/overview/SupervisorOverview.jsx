import { DateTime } from 'luxon';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Rectangle } from 'recharts';
import { FaCalendarXmark, FaDiagramProject, FaRegCircleCheck, IoPeople } from '@/components/ui/Icons';
import { useProjects } from '@/features/projects/useProjects';
import { getTimelineDates } from '@/utils/helpers';
import { useTasks } from '@/features/projects/useTasks';
import PieChartStats from '@/features/overview/PieChart';
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
            { name: 'Not Started', value: projects?.filter((p) => p.status === 'Not Started').length },
            { name: 'In-progress', value: projects?.filter((p) => p.status === 'In Progress').length },
            { name: 'Completed', value: projects?.filter((p) => p.status === 'Completed').length },
          ]}
          title='Projects Status'
          legend={[
            { text: 'Not Started', color: 'bg-gray-500' },
            { text: 'In Progress', color: 'bg-blue-500' },
            { text: 'Completed', color: 'bg-green-500' },
          ]}
          COLORS={['#6B7280', '#3b82f6', '#16a34a']}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

function TasksAnalytics() {
  const { tasks, isLoading } = useTasks();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const data = days.map((day, i) => {
    const tasksOnDay = tasks?.filter((task) => DateTime.fromISO(task.created_at).weekday === i + 1);

    const completedTasksOnDay = tasks?.filter(
      (task) => task.status === 'Done' && DateTime.fromISO(task.updated_at).weekday === i + 1
    );

    return {
      name: day,
      Added: tasksOnDay?.length,
      Completed: completedTasksOnDay?.length,
    };
  });

  return (
    <div className='relative grid gap-5 rounded-lg border border-border bg-background-secondary p-3'>
      <div className='flex justify-between gap-5'>
        <h2 className='text-lg font-bold text-text-primary'>Weekly Tasks Progress</h2>
        <div className='flex items-start gap-3 pt-3'>
          <div className='flex items-center gap-2'>
            <span className='h-3 w-6 rounded-md bg-green-500'></span>
            <span className='text-xs font-medium'>Completed</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='h-3 w-6 rounded-md bg-blue-500'></span>
            <span className='text-xs font-medium'>Added</span>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Status status='loading' />
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data}>
            <XAxis dataKey='name' className='text-xs font-medium' />
            <YAxis domain={[0, 'dataMax']} allowDecimals={false} />{' '}
            <Tooltip
              wrapperClassName='tooltip'
              itemStyle={{ color: 'var(--text-primary)' }}
              cursor={<Rectangle radius={5} stroke='var(--border)' fill='var(--background-tertiary)' />}
            />
            <Bar dataKey='Added' fill='#3b82f6' legendType='circle' />
            <Bar dataKey='Completed' fill='#16a34a' legendType='circle' />
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
      className: 'bg-orange-400 p-3 shadow-md dark:bg-orange-500',
    },
    {
      label: { value: 'Completed Projects' },
      value: { value: projects?.filter((p) => p.status === 'Completed').length },
      icon: { icon: <FaRegCircleCheck /> },
      className: 'bg-green-500 p-3 shadow-md dark:bg-green-600',
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
      className: 'bg-red-400 p-3 shadow-md dark:bg-red-500',
    },
    {
      label: { value: 'Team Members', color: 'text-text-secondary' },
      value: {
        value: [...new Set(projects?.map((p) => p.teamMembers).flat())].length,
        color: 'text-text-primary',
      },
      icon: { icon: <IoPeople />, className: 'bg-background-tertiary' },
      className: 'border border-border bg-background-secondary p-3 shadow-md',
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
