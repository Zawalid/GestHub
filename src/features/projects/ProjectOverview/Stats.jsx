import { FaCalendarXmark, TbProgress, FaListCheck, LuListTodo } from '@/components/ui/Icons';
import { checkIsOverdue } from '@/utils/helpers';
import { Stat } from '@/features/overview/Stat';

export function Stats({ isLoading, tasks }) {
  const stats = [
    {
      label: { value: 'To Do Tasks' },
      value: { value: tasks?.filter((p) => p.status === 'To Do').length },
      icon: { icon: <LuListTodo /> },
      className: 'bg-orange-400 dark:bg-orange-500',
    },
    {
      label: { value: 'In Progress Tasks' },
      value: { value: tasks?.filter((p) => p.status === 'In Progress').length },
      icon: { icon: <TbProgress /> },
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
        value: tasks?.filter((t) => checkIsOverdue(t, 'task')).length,
      },
      icon: { icon: <FaCalendarXmark /> },
      className: 'bg-red-400 dark:bg-red-500',
    },
  ];

  return (
    <div className='space-y-3'>
      <label className='text-sm font-medium text-text-tertiary'>Tasks Summary</label>
      <div className='flex flex-col gap-5 mobile:grid mobile:grid-cols-2 md:grid-cols-4'>
        {stats.map((stat, index) => (
          <Stat key={index} isLoading={isLoading} {...stat} />
        ))}
      </div>
    </div>
  );
}
