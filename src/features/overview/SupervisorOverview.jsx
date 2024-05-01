import { DateTime } from 'luxon';
import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Sector,
  Rectangle,
} from 'recharts';
import { FaCalendarXmark, FaDiagramProject, FaRegCircleCheck, IoPeople } from '@/components/ui/Icons';
import { useProjects } from '@/features/projects/useProjects';
import { getTimelineDates } from '@/utils/helpers';
import { useTasks } from '@/features/projects/useTasks';

const COLORS = ['#6B7280', '#16a34a', '#3b82f6'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill='var(--text-primary)' className='text-sm font-bold'>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={3}
        textAnchor={textAnchor}
        fill='var(--text-secondary)'
        className='font-medium'
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

function ProjectStatus() {
  const [activeIndex, setActiveIndex] = useState(1);
  const { projects } = useProjects();
  const data = [
    { name: 'Not Started', value: projects?.filter((p) => p.status === 'Not Started').length },
    { name: 'In-progress', value: projects?.filter((p) => p.status === 'In Progress').length },
    { name: 'Completed', value: projects?.filter((p) => p.status === 'Completed').length },
  ];

  return (
    <div className='flex flex-col gap-5 rounded-lg border border-border p-3 shadow-md'>
      <h2 className='text-lg font-bold text-text-primary'>Projects Status</h2>
      <div className='flex justify-center gap-3'>
        <div className='flex items-center gap-2'>
          <span className='h-3 w-6 rounded-md bg-gray-500'></span>
          <span className='text-xs font-medium'>Not Started</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='h-3 w-6 rounded-md bg-blue-500'></span>
          <span className='text-xs font-medium'>In Progress</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='h-3 w-6 rounded-md bg-green-500'></span>
          <span className='text-xs font-medium'>Completed</span>
        </div>
      </div>
      <ResponsiveContainer className='flex-1'>
        <PieChart>
          <text
            x='50%'
            y='50%'
            dy={8}
            textAnchor='middle'
            className='text-2xl font-bold'
            fill='var(--text-primary'
          ></text>

          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
            cornerRadius='30%'
            paddingAngle={5}
            // label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            className='text-xs outline-none'
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, i) => setActiveIndex(i)}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} className='outline-none' stroke='transparent' fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function TasksAnalytics() {
  const { tasks } = useTasks();
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
    <div className='grid gap-5 rounded-lg border border-border bg-background-secondary p-3'>
      <div className='flex justify-between gap-5'>
        <h2 className='text-lg font-bold text-text-primary'>Weekly Tasks Progress</h2>
        <div className='flex gap-3'>
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

      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <XAxis dataKey='name' className='text-xs font-medium' />
          <YAxis min={0} />
          <Tooltip
            wrapperClassName='tooltip'
            itemStyle={{ color: 'var(--text-primary)' }}
            cursor={<Rectangle radius={5} stroke='var(--border)' fill='var(--background-tertiary)' />}
          />
          <Bar dataKey='Added' fill='#3b82f6' legendType='circle' />
          <Bar dataKey='Completed' fill='#16a34a' legendType='circle' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Stats() {
  const { projects } = useProjects();

  return (
    <div className='grid gap-5 mobile:grid-cols-2 md:grid-cols-4'>
      <div className='flex items-start justify-between rounded-lg bg-orange-400 p-3 shadow-md dark:bg-orange-500'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>Total Projects</h4>
          <h3 className='text-3xl font-bold text-white'>{projects?.length}</h3>
        </div>
        <div className='rounded-lg bg-white/30 p-2 text-xl text-white'>
          <FaDiagramProject />
        </div>
      </div>
      <div className='flex items-start justify-between rounded-lg bg-green-500 p-3 shadow-md dark:bg-green-600'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>Completed Projects</h4>
          <h3 className='text-3xl font-bold text-white'>{projects?.filter((p) => p.status === 'Completed').length}</h3>
        </div>
        <div className='rounded-lg bg-white/30 p-2 text-xl text-white'>
          <FaRegCircleCheck />
        </div>
      </div>
      <div className='flex items-start justify-between rounded-lg bg-red-400 p-3 shadow-md dark:bg-red-500'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>Overdue Projects</h4>
          <h3 className='text-3xl font-bold text-white'>
            {
              projects?.filter((p) => {
                const { isOverdue } = getTimelineDates(p.startDate, p.endDate);
                return isOverdue;
              }).length
            }
          </h3>
        </div>
        <div className='rounded-lg bg-white/30 p-2 text-xl text-white'>
          <FaCalendarXmark />
        </div>
      </div>
      <div className='flex items-start justify-between rounded-lg border border-border bg-background-secondary p-3 shadow-md'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-text-secondary'>Team Members</h4>
          <h3 className='text-3xl font-bold text-text-primary'>
            {[...new Set(projects?.map((p) => p.teamMembers).flat())].length}
          </h3>
        </div>
        <div className='rounded-lg bg-background-tertiary p-2 text-xl'>
          <IoPeople />
        </div>
      </div>
    </div>
  );
}

export default function SupervisorOverview() {
  return (
    <div className='flex h-full flex-col gap-5'>
      <Stats />
      <div className='grid flex-1 gap-5 lg:grid-cols-[3fr,2fr]'>
        <TasksAnalytics />
        <ProjectStatus />
      </div>
    </div>
  );
}
