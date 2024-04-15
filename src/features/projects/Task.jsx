import { BsCalendar4Event, IoTrashOutline, MdDriveFileRenameOutline } from '@/components/ui/Icons';
import { PRIORITY_COLORS } from '@/utils/constants';
import { Members } from './Project';

export default function Task({ task, onDelete, onEdit }) {
  const { id, title, description, dueDate, priority, assignee } = task;

  return (
    <div className='relative h-[150px]  space-y-3.5 rounded-lg border border-border bg-background-secondary p-4 shadow-sm'>
      <div className='space-y-2.5'>
        <div className='flex items-center justify-between gap-5'>
          <h4 className='line-clamp-1 font-semibold text-text-primary'>{title || 'Untitled'}</h4>
          {priority !== 'None' && (
            <span className={`rounded-md px-2 py-1 text-center text-xs ${PRIORITY_COLORS[priority]}`}>{priority}</span>
          )}
        </div>
        <p className='line-clamp-2 text-xs text-text-secondary'>{description || 'No description'}</p>
      </div>

      <div className='flex items-center justify-between border-t border-border pt-3'>
        {assignee !== 'None' && <Members members={typeof assignee === 'object' ? [assignee] : []} />}
        <div className='flex items-center gap-2 text-xs font-medium text-text-secondary'>
          <BsCalendar4Event />
          {dueDate ? <span>{dueDate}</span> : <span>No due date set</span>}
        </div>
      </div>
      <div className=' absolute -bottom-3 left-1/2 flex -translate-x-1/2 divide-x divide-border overflow-hidden rounded-full border border-border bg-background-secondary shadow-md'>
        {[
          { icon: <MdDriveFileRenameOutline />, onClick: onEdit },
          { icon: <IoTrashOutline />, onClick: onDelete },
        ].map((b, i) => (
          <button
            className='px-2 py-1 text-text-primary transition-colors duration-300 hover:bg-background-primary'
            key={i}
            onClick={() => b.onClick(id)}
          >
            {b.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
