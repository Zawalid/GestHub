import { FaCalendarXmark, FaDiagramProject, LuClipboardList, FaListCheck } from '@/components/ui/Icons';
import { checkIsTaskOverdue,  getTimelineDates } from '@/utils/helpers';
import { useTasks } from '../projects/useTasks';
import { useProjects } from '../projects/useProjects';
import { TasksAnalytics } from './SupervisorOverview';
import { Stat } from './Stat';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui';

export default function InternOverview() {
  return (
    <div className='flex h-full flex-col gap-5'>
      <div className='grid place-content-start gap-5 lg:grid-cols-[3fr,2fr]'>
        <Stats />
        <InternshipStatus />
      </div>
      <TasksAnalytics />
    </div>
  );
}

function Stats() {
  const { tasks, isLoading } = useTasks();
  const { projects } = useProjects();

  const stats = [
    {
      label: { value: 'Active Projects' },
      value: { value: projects?.length },
      icon: { icon: <FaDiagramProject /> },
      className: 'bg-primary',
    },
    {
      label: { value: 'Assigned Tasks' },
      value: { value: tasks?.length },
      icon: { icon: <LuClipboardList /> },
      className: 'bg-blue-500 dark:bg-blue-600',
    },
    {
      label: { value: 'Completed Tasks' },
      value: { value: tasks?.filter((p) => p.status === 'Done').length },
      icon: { icon: <FaListCheck /> },
      className: 'bg-green-500 dark:bg-green-600',
    },
    {
      label: { value: 'Overdue Tasks' },
      value: {
        value: tasks?.filter(checkIsTaskOverdue).length,
      },
      icon: { icon: <FaCalendarXmark /> },
      className: 'bg-red-400 dark:bg-red-500',
    },
  ];
  return (
    <div className='flex flex-col gap-5 mobile:grid mobile:grid-cols-2'>
      {stats.map((stat, index) => (
        <Stat key={index} isLoading={isLoading} {...stat} />
      ))}
    </div>
  );
}

function InternshipStatus() {
  const { user } = useUser();
  const { daysLeft, isOverdue } = getTimelineDates(user?.startDate, user?.endDate);

  return (
    <div className='flex flex-col justify-center items-center gap-3 rounded-lg border border-border p-3 shadow-md'>
      {/* <img src='/SVG/time.svg' alt='' className='absolute w-36' /> */}
      <h3 className='w-4/5 text-center  font-medium text-text-secondary'>
        You have <span className='mx-0.5 font-semibold text-text-primary'>{daysLeft}</span> days left on your internship
      </h3>
      <Button disabled={!isOverdue}>Generate Attestation</Button>
    </div>
  );
}
