import { BsCalendar4Event, IoTrashOutline, LuUser, MdDriveFileRenameOutline } from '@/components/ui/Icons';
import { PRIORITY_COLORS } from '@/utils/constants';
import { formatDate } from '@/utils/helpers';
import { ToolTip } from '@/components/ui/ToolTip';

export default function Task({ task, onDelete, onEdit, isDragging }) {
  const { title, description, dueDate, priority, assignee } = task;

  return (
    <div
      className={`relative flex h-[144px] flex-col gap-4 rounded-lg border border-border bg-background-secondary p-4 pt-6 shadow-sm transition-all duration-300 ${
        isDragging ? 'scale-90 opacity-70' : ''
      }`}
    >
      <div className='space-y-2.5'>
        <div className='flex items-center justify-between gap-5'>
          <h4 className='line-clamp-1 font-semibold text-text-primary'>{title || 'Untitled'}</h4>
          {priority !== 'None' && (
            <span className={`rounded-md px-2 py-1 text-center text-xs ${PRIORITY_COLORS[priority]}`}>{priority}</span>
          )}
        </div>
        <p className='line-clamp-2 text-xs text-text-secondary'>{description || 'No description'}</p>
      </div>

      <div className='flex flex-1 items-center justify-between border-t border-border pt-3'>
        {assignee === 'None' ? (
          <div className='flex items-center gap-1 text-xs font-medium text-text-secondary'>
            <LuUser />
            <span>N/A</span>
          </div>
        ) : (
          <ToolTip content={<span>{`${assignee.firstName} ${assignee.lastName}`}</span>}>
            <img
              src={assignee.image || '/images/default-profile.jpg'}
              alt={`${assignee.firstName} ${assignee.lastName}`}
              className='h-7 w-7 rounded-full border-2 border-border'
            />
          </ToolTip>
        )}
        <div className='flex items-center gap-2 text-xs font-medium text-text-secondary'>
          <BsCalendar4Event />
          {dueDate ? <span>{formatDate(dueDate)}</span> : <span>N/A</span>}
        </div>
      </div>
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
    </div>
  );
}
