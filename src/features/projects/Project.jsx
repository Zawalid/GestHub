import { Button } from '@/components/ui';
import { IoTrashOutline, IoEyeOutline } from '@/components/ui/Icons';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { useDeleteProject } from './useProjects';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';

export default function Project({ project, layout }) {
  const { id, name, description, startDate, endDate, status, priority, tasks, teamMembers, progress } = project;

  return (
    <div
      className={`relative grid grid-rows-[24px_auto_20px_28px] gap-3 rounded-lg rounded-tr-none border border-border bg-background-disabled p-3 shadow-md ${
        layout === 'grid' ? 'h-[240px]' : ''
      }`}
    >
      <div
        className={`absolute -right-[1.2px] -top-[1.5px] h-[2px] w-16 rounded-lg ${PRIORITY_COLORS[priority]}`}
      ></div>
      <div className={`absolute -right-[1px] -top-[1.2px] h-16 w-[2px] rounded-lg ${PRIORITY_COLORS[priority]}`}></div>
      <div className='flex items-center justify-between gap-5'>
        <Date startDate={startDate} endDate={endDate} />
        <Actions id={id} />
      </div>

      <div className='space-y-2'>
        <h3 className='line-clamp-2 text-lg font-semibold text-text-primary'>{name}</h3>
        <p className='line-clamp-2 text-sm text-text-secondary'>{description || 'No description'}</p>
      </div>
      <Progress tasks={tasks} statusColor={STATUS_COLORS[status].bg} progress={progress} />
      <div className='mt-auto flex items-center justify-between '>
        <Members members={teamMembers} />
        <p className={`w-fit rounded-md p-2 py-1 text-xs text-white ${STATUS_COLORS[status || 'Not Started'].bg}`}>
          {status || 'Not Started'}
        </p>
      </div>
    </div>
  );
}

function Members({ members }) {
  if (!members.length) return <span className='text-xs font-medium text-text-secondary'>No Team</span>;
  return (
    <div className='relative h-7 flex-1'>
      {members.slice(0, 3).map((m, i) => (
        <img
          key={m}
          src='/images/default-profile.jpg'
          alt='avatar'
          className='absolute top-0 z-[1] h-7 w-7 rounded-full border-2 border-border'
          style={{ left: `${i * 15}px` }}
        />
      ))}
      {members.slice(3).length !== 0 && (
        <span
          className='absolute z-[1] grid h-7 w-7 place-content-center rounded-full border border-border bg-background-secondary text-xs font-bold'
          style={{ left: `${members.slice(0, 3).length * 15}px` }}
          color='tertiary'
        >
          +{members.slice(3).length}
        </span>
      )}
    </div>
  );
}

function Progress({ tasks, statusColor, progress }) {
  const completedTasks = tasks.filter((task) => task?.status === 'Completed');

  return (
    <div className='flex items-center gap-2'>
      <span className='text-xs font-bold text-text-primary'>
        {completedTasks.length}/{tasks.length}
      </span>
      <div className='relative w-full rounded-lg bg-background-tertiary py-1'>
        <div className={`absolute top-0 h-full rounded-lg ${statusColor}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function Actions({ id }) {
  const { openModal } = useConfirmationModal();
  const { mutate } = useDeleteProject();
  const navigate = useNavigate();

  return (
    <div className='flex gap-1'>
      <Button shape='icon' size='small' onClick={() => navigate(id)}>
        <IoEyeOutline />
      </Button>
      <Button
        shape='icon'
        color='delete'
        size='small'
        onClick={() =>
          openModal({
            message: 'Are you sure you want to delete this project ?',
            title: 'Delete Project',
            confirmText: 'Delete',
            onConfirm: () => mutate(id),
          })
        }
      >
        <IoTrashOutline />
      </Button>
    </div>
  );
}

function Date({ startDate, endDate }) {
  return (
    <div className='project-date relative h-6 w-20'>
      <div className='side absolute z-[1] bg-background-secondary'>
        <span className='text-text-secondary '>{startDate}</span>
      </div>
      <div className='side -z-[1] overflow-hidden bg-red-500'>
        <span className='text-white'>{endDate}</span>
      </div>
    </div>
  );
}
