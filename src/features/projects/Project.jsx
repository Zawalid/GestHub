import { Button } from '@/components/ui';
import { IoTrashOutline, IoEyeOutline } from '@/components/ui/Icons';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { useDeleteProject } from './useProjects';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ToolTip } from '@/components/ui/ToolTip';
import { formatDate } from '@/utils/helpers';

export default function Project({ project, layout }) {
  const { id, name, description, startDate, endDate, status, priority, tasks, teamMembers, progress, completedTasks } =
    project;

  return (
    <div
      className={`relative grid grid-rows-[24px_auto_20px_28px] gap-3 rounded-lg rounded-tr-none border border-border bg-background-disabled p-3 shadow-md ${
        layout === 'grid' ? 'h-[240px]' : ''
      }`}
    >
      <PriorityIndicator priority={priority} />

      <div className='flex items-center justify-between gap-5'>
        <Date startDate={startDate} endDate={endDate} />
        <Actions id={id} />
      </div>

      <div className='space-y-2'>
        <h3 className='line-clamp-2 text-lg font-semibold text-text-primary'>{name}</h3>
        <p className='line-clamp-2 text-sm text-text-secondary'>{description || 'No description'}</p>
      </div>

      <div className='flex items-center gap-2'>
        <span className='text-xs font-bold text-text-primary'>
          {completedTasks.length}/{tasks.length}
        </span>
        <ProgressBar progress={progress} status={status} />
      </div>

      <div className='mt-auto flex items-center justify-between '>
        <Members members={teamMembers} />
        <p className={`w-fit rounded-md p-2 py-1 text-xs text-white ${STATUS_COLORS[status || 'Not Started']?.bg}`}>
          {status || 'Not Started'}
        </p>
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
    <div className='project-date relative h-6 w-fit text-nowrap'>
      <div className='side absolute z-[1] bg-background-secondary'>
        <span className='text-text-secondary '>{formatDate(startDate)}</span>
      </div>
      <div className='side -z-[1] overflow-hidden bg-red-500'>
        <span className='text-white'>{formatDate(endDate)}</span>
      </div>
    </div>
  );
}

function PriorityIndicator({ priority }) {
  return (
    <>
      <div
        className={`absolute -right-[1.2px] -top-[1.5px] h-[2px] w-16 rounded-lg ${PRIORITY_COLORS[priority]}`}
      ></div>
      <div className={`absolute -right-[1px] -top-[1.2px] h-16 w-[2px] rounded-lg ${PRIORITY_COLORS[priority]}`}></div>
    </>
  );
}

export function ProgressBar({ progress, status }) {
  const color = STATUS_COLORS[status]?.bg;

  return (
    <div className='relative w-full rounded-lg bg-background-tertiary py-1'>
      <div className={`absolute top-0 transition-all duration-500 h-full rounded-lg ${color}`} style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export function Members({ members, size = 'small' }) {
  const [parent] = useAutoAnimate({ duration: 400 });

  if (!members.length)
    return <div className='grid h-full place-content-center text-xs font-medium text-text-secondary'>No Team</div>;

  const sizes = {
    small: 'w-7 h-7',
    large: 'w-9 h-9',
  };

  const wrapperWidth = members.length === 1 ? 36 : (members.slice(0, 3).length + (members.length > 3 ? 1 : 0)) * 25;

  return (
    <div className='relative h-7' style={{ width: `${wrapperWidth}px` }} ref={parent}>
      {members.slice(0, 3).map((member, i) => (
        <ToolTip key={member.id || member} content={<span>{`${member.firstName} ${member.lastName}`}</span>}>
          <img
            src={member.image || '/images/default-profile.jpg'}
            alt={`${member.firstName} ${member.lastName}`}
            className={`absolute top-0 z-[1] ${sizes[size]} rounded-full border-2 border-border`}
            style={{ left: `${i * (size === 'small' ? 15 : 20)}px` }}
          />
        </ToolTip>
      ))}
      {members.length > 3 && (
        <span
          className={`absolute z-[1] grid ${sizes[size]} place-content-center rounded-full border border-border bg-background-secondary text-xs font-bold text-text-primary`}
          style={{ left: `${members.slice(0, 3).length * (size === 'small' ? 15 : 20)}px` }}
          color='tertiary'
        >
          +{members.slice(3).length}
        </span>
      )}
    </div>
  );
}
