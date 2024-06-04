import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Rectangle } from 'recharts';
import { DateTime } from 'luxon';
import {
  FaCalendarXmark,
  FaDiagramProject,
  FaRegCircleCheck,
  LuClipboardList,
  FaChevronLeft,
  FaChevronRight,
  BsCalendar4Event,
  TbProgressCheck,
  MdOutlineNotStarted,
} from '@/components/ui/Icons';
import { checkIsOverdue, getIsoDate } from '@/utils/helpers';
import PieChartStats, { Legend, createCustomTooltip } from '@/features/overview/PieChart';
import { Button, Status } from '@/components/ui';
import { Stat } from './Stat';
import { useStats } from './useStats';

export default function SupervisorOverview() {
  const { stats, isLoading } = useStats();
  return (
    <div className='flex h-full flex-col gap-5 overflow-x-auto'>
      <Stats />
      <div className='grid gap-5 lg:grid-cols-[3fr,2fr]'>
        <TasksAnalytics />
        <PieChartStats
          data={[
            { name: 'Completed', value: stats?.projects?.completedProjects },
            { name: 'In Progress', value: stats?.projects?.inProgressProjects },
            { name: 'Not Started', value: stats?.projects?.notStartedProjects },
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
  const { stats, isLoading } = useStats();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [weekOffset, setWeekOffset] = useState(0);
  const startOfWeek = DateTime.local().startOf('week').plus({ weeks: weekOffset });

  const data = days.map((day, i) => {
    const currentDay = startOfWeek.plus({ days: i });

    const tasksOnDay = stats?.tasks.tasks?.filter(
      (task) => getIsoDate(task.created_at).toISODate() === currentDay.toISODate()
    );
    const completedTasksOnDay = stats?.tasks.tasks?.filter(
      (task) => task.status === 'Done' && getIsoDate(task.updated_at).toISODate() === currentDay.toISODate()
    );
    const overdueTasks = stats?.tasks.tasks?.filter(
      (t) => checkIsOverdue(t, 'task') && getIsoDate(t.dueDate).toISODate() === currentDay.toISODate()
    );
    const dueTasks = stats?.tasks.tasks?.filter((t) => DateTime.fromISO(t.dueDate).toISODate() === currentDay.toISODate());

    return {
      name: DateTime.local().weekdayLong === day ? 'Today' : day.slice(0, 3),
      fullName: day,
      Added: tasksOnDay?.length,
      Completed: completedTasksOnDay?.length,
      Overdue: overdueTasks?.length,
      Due: dueTasks?.length,
    };
  });

  const CustomTooltip = createCustomTooltip([
    {
      key: 'fullName',
      label: 'Day',
      condition: (day) => {
        if (DateTime.local().weekdayLong === day) return '(Today)';
      },
    },
    { key: 'Added', intro: 'Added' },
    { key: 'Completed', intro: 'Completed' },
    { key: 'Overdue', intro: 'Overdue' },
    { key: 'Due', intro: 'Due' },
  ]);

  return (
    <div className='relative grid min-h-[400px] rounded-lg border border-border bg-background-secondary p-3'>
      <div className='mb-5 flex flex-col items-center justify-between gap-2 self-start sm:flex-row'>
        <h2 className='text-lg font-bold text-text-primary'>Weekly Tasks Progress</h2>
        <div className='flex items-center justify-between gap-4'>
          <span className='text-xs font-medium text-text-secondary'>
            {startOfWeek.toFormat('MM/dd/yyyy')} - {startOfWeek.plus({ days: 6 }).toFormat('MM/dd/yyyy')}
          </span>
          <div className='flex items-center gap-0.5'>
            <Button shape='icon' size='small' onClick={() => setWeekOffset((w) => w - 1)}>
              <FaChevronLeft />
            </Button>
            <Button shape='icon' size='small' disabled={weekOffset === 0} onClick={() => setWeekOffset(0)}>
              <BsCalendar4Event />
            </Button>
            <Button shape='icon' size='small' onClick={() => setWeekOffset((w) => w + 1)}>
              <FaChevronRight />
            </Button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Status status='loading' />
      ) : (
        <ResponsiveContainer width='100%' height='100%' >
          <BarChart data={data} >
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
            <Bar dataKey='Due' fill='#f59e0b' legendType='circle' /> 
          </BarChart>
        </ResponsiveContainer>
      )}
      <Legend
        legend={[
          { text: 'Added', color: 'bg-blue-500' },
          { text: 'Completed', color: 'bg-green-500' },
          { text: 'Overdue', color: 'bg-red-500' },
          { text: 'Due', color: 'bg-yellow-500' },
        ]}
        className='items-end'
      />
    </div>
  );
}

function Stats() {
  const { stats, isLoading } = useStats();
  const navigate = useNavigate();

  const statistics = [
    {
      label: { value: 'Total Projects' },
      value: { value: stats?.projects?.totalProjects },
      icon: { icon: <FaDiagramProject /> },
      className: 'bg-orange-400 dark:bg-orange-500',
      onClick: () => navigate('/app/projects'),
    },
    {
      label: { value: 'Completed Projects' },
      value: { value: stats?.projects?.completedProjects },
      icon: { icon: <FaRegCircleCheck /> },
      className: 'bg-green-500 dark:bg-green-600',
      onClick: () => navigate('/app/projects', { state: { filter: 'Completed' } }),
    },
    {
      label: { value: 'Overdue Projects' },
      value: {
        value: stats?.projects?.overdueProjects,
      },
      icon: { icon: <FaCalendarXmark /> },
      className: 'bg-red-400 dark:bg-red-500',
      onClick: () => navigate('/app/projects', { state: { filter: 'Overdue' } }),
    },
  ];

  return (
    <div className='flex flex-col gap-5 mobile:grid mobile:grid-cols-2 md:grid-cols-4'>
      {statistics.map((stat, index) => (
        <Stat key={index} isLoading={isLoading} {...stat} />
      ))}
      <div className='space-y-3 rounded-lg border border-border bg-background-secondary p-3 shadow-md'>
        <div className='flex items-start justify-between'>
          <h4 className='text-sm font-medium text-text-secondary'>Total Tasks</h4>
          <div className='rounded-lg bg-background-tertiary p-2 text-xl'>
            <LuClipboardList />
          </div>
        </div>
        <div className='flex flex-wrap  w-fit gap-0.5 overflow-hidden rounded-lg'>
          {[
            {
              color: 'bg-gray-500',
              icon: <MdOutlineNotStarted />,
              value: stats?.tasks?.toDoTasks ,
            },
            {
              color: 'bg-blue-500',
              icon: <TbProgressCheck />,
              value: stats?.tasks?.inProgressTasks ,
            },
            {
              color: 'bg-green-600',
              icon: <FaRegCircleCheck />,
              value: stats?.tasks?.completedTasks ,
            },
            {
              color: 'bg-red-500',
              icon: <FaCalendarXmark />,
              value: stats?.tasks?.overdueTasks ,
            },
          ].map(({ color, icon, value }) => (
            <div key={color} className={`flex items-center gap-1 px-2.5 py-1 text-white ${color}`}>
              {icon}
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
