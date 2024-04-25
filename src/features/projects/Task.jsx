import { BsCalendar4Event, IoTrashOutline, MdDriveFileRenameOutline } from '@/components/ui/Icons';
import { PRIORITY_COLORS } from '@/utils/constants';
import { formatDate } from '@/utils/helpers';
import { ToolTip } from '@/components/ui/ToolTip';

export default function Task({ task, onDelete, onEdit, layout, canManipulateTasks, isCreatingProject }) {
  const { title, description, dueDate, priority, assignee } = task;

  if (layout === 'list')
    return (
      <div className='grid grid-cols-[auto_repeat(3,100px)] place-items-center items-center gap-5 rounded-md bg-background-secondary p-2'>
        <div className='flex w-full items-center gap-2'>
          <span className={`mt-[1px] h-2 w-2 rounded-sm ${'group.color'}`}></span>
          <h4 className='line-clamp-2 font-semibold text-text-primary'>{task.title || 'Untitled'}</h4>
        </div>
        <Assignee assignee={assignee} />
        <span className='text-xs font-medium text-text-secondary'>
          {task.dueDate ? formatDate(task.dueDate) : 'N/A'}
        </span>
        <span className={`rounded-md px-2 py-1 text-center text-xs text-white ${PRIORITY_COLORS[task.priority]?.bg}`}>
          {task.priority}
        </span>
      </div>
    );

  return (
    <div className='relative flex min-h-[144px] flex-col gap-4 rounded-lg border border-border bg-background-secondary p-4 pt-6 shadow-sm transition-all duration-300'>
      <div className='space-y-2.5'>
        <div className='flex items-center justify-between gap-5'>
          <h4 className='line-clamp-2 font-semibold text-text-primary'>{title || 'Untitled'}</h4>
          {priority !== 'None' && (
            <span className={`rounded-md px-2 py-1 text-center text-xs text-white ${PRIORITY_COLORS[priority]?.bg}`}>
              {priority}
            </span>
          )}
        </div>
        <p className='line-clamp-2 text-xs text-text-secondary'>{description || 'No description'}</p>
      </div>

      <div className='flex flex-1 items-center justify-between border-t border-border pt-3'>
        <Assignee assignee={assignee} />
        <div className='flex items-center gap-2 text-xs font-medium text-text-secondary'>
          <BsCalendar4Event />
          {dueDate ? <span>{formatDate(dueDate)}</span> : <span>N/A</span>}
        </div>
      </div>
      {(canManipulateTasks || isCreatingProject) && (
        <div className='absolute -top-3 left-1/2 flex -translate-x-1/2 divide-x divide-border overflow-hidden rounded-full border border-border bg-background-secondary shadow-md'>
          {[
            { icon: <MdDriveFileRenameOutline />, onClick: onEdit },
            { icon: <IoTrashOutline />, onClick: onDelete },
          ].map((b, i) => (
            <button
              className='px-2 py-1 text-text-primary transition-colors duration-300 hover:bg-background-primary'
              key={i}
              onClick={() => b.onClick(task)}
            >
              {b.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Assignee({ assignee }) {
  return typeof assignee !== 'object' ? (
    <span className='text-xs font-medium text-text-secondary'>N/A</span>
  ) : (
    <ToolTip content={<span>{`${assignee.firstName} ${assignee.lastName}`}</span>}>
      <img
        src={assignee.avatar || '/images/default-profile.jpg'}
        alt={`${assignee.firstName} ${assignee.lastName}`}
        className='h-7 w-7 rounded-full border-2 border-border'
      />
    </ToolTip>
  );
}
