import { FaCalendarXmark, FaDiagramProject, LuClipboardList, FaListCheck, LuListTodo } from '@/components/ui/Icons';
import { getTimelineDates } from '@/utils/helpers';
import { useUser } from '@/hooks/useUser';

export default function InternOverview() {
  return (
    <div className='flex h-full flex-col  gap-5'>
      <Stats />
    </div>
  );
}

function Stats() {
  const { user, isLoading } = useUser();

  return (
    <div className='flex flex-col gap-5 mobile:grid mobile:grid-cols-2 md:grid-cols-4'>
      <div className='flex items-start justify-between rounded-lg bg-background-secondary p-3 shadow-md '>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-text-secondary'>Active Projects</h4>
          {isLoading ? (
            <div className='sending'></div>
          ) : (
            <h3 className='text-3xl font-bold text-text-primary'>{user?.projects?.length}</h3>
          )}
        </div>
        <div className='rounded-lg bg-background-tertiary p-2 text-xl '>
          <FaDiagramProject />
        </div>
      </div>
      <div className='flex items-start justify-between rounded-lg bg-blue-500 p-3 shadow-md dark:bg-blue-600'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>Assigned Tasks</h4>
          {isLoading ? (
            <div className='sending'></div>
          ) : (
            <h3 className='text-3xl font-bold text-white'>{user?.tasks?.length}</h3>
          )}
        </div>
        <div className='rounded-lg bg-white/30 p-2 text-xl text-white'>
          <LuClipboardList />
        </div>
      </div>
      <div className='flex items-start justify-between rounded-lg bg-green-500 p-3 shadow-md dark:bg-green-600'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>Completed Tasks</h4>
          {isLoading ? (
            <div className='sending'></div>
          ) : (
            <h3 className='text-3xl font-bold text-white'>{user?.tasks?.filter((p) => p.status === 'Done').length}</h3>
          )}
        </div>
        <div className='rounded-lg bg-white/30 p-2 text-xl text-white'>
          <FaListCheck />
        </div>
      </div>
      <div className='flex items-start justify-between rounded-lg bg-red-400 p-3 shadow-md dark:bg-red-500'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>Overdue Tasks</h4>
          {isLoading ? (
            <div className='sending'></div>
          ) : (
            <h3 className='text-3xl font-bold text-white'>
              {
                user?.tasks?.filter((p) => {
                  const { isOverdue } = getTimelineDates(p.created_at, p.dueDate);
                  return isOverdue;
                }).length
              }
            </h3>
          )}
        </div>
        <div className='rounded-lg bg-white/30 p-2 text-xl text-white'>
          <FaCalendarXmark />
        </div>
      </div>
      <div className='flex items-start justify-between rounded-lg bg-orange-400 p-3 shadow-md dark:bg-orange-500'>
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-white/80'>To Do Tasks</h4>
          {isLoading ? (
            <div className='sending'></div>
          ) : (
            <h3 className='text-3xl font-bold text-white'>{user?.tasks?.filter((p) => p.status === 'To Do').length}</h3>
          )}
        </div>
        <div className='rounded-lg bg-white/30 p-2 text-xl text-white'>
          <LuListTodo />
        </div>
      </div>
    </div>
  );
}
