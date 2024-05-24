import { BsCalendar4Event, FaRegClone, IoTrashOutline, MdDriveFileRenameOutline } from '@/components/ui/Icons';
import { PRIORITY_COLORS } from '@/utils/constants';
import { checkIsOverdue, formatDate } from '@/utils/helpers';
import { ToolTip } from '@/components/ui/ToolTip';
import Avatar from '@/components/ui/Avatar';

export default function Task({
  task,
  onDelete,
  onEdit,
  onClone,
  layout,
  group,
  canManipulateTasks,
  isCreatingProject,
}) {
  const { title, description, dueDate, priority, assignee, status, project } = task;

  if (layout === 'list')
    return (
      <div className='grid grid-cols-5 place-items-center items-center justify-items-end gap-5 rounded-md bg-background-secondary p-2'>
        <div className='col-span-2 flex w-full min-w-[250px] items-center gap-2'>
          <span className={`mt-[1px] h-2 w-2 rounded-sm ${group.color}`}></span>
          <h4 className='line-clamp-2 text-nowrap text-xs font-semibold text-text-primary sm:text-sm'>
            {task.title || 'Untitled'}
          </h4>
        </div>
        <Assignee assignee={assignee} className='ml-auto' />
        <span
          className={`text-center text-xs font-medium ${checkIsOverdue(task, 'task') ? 'text-red-500' : 'text-text-secondary'}`}
        >
          {task.dueDate ? formatDate(task.dueDate) : 'N/A'}
        </span>
        <span className={`rounded-md px-2 py-1 text-center text-xs text-white ${PRIORITY_COLORS[task.priority]?.bg}`}>
          {task.priority}
        </span>
      </div>
    );

  return (
    <div className='relative flex min-h-[144px] flex-col gap-4 rounded-lg border border-border bg-background-secondary p-4 pt-8 shadow-sm transition-all duration-300'>
      <div className='space-y-2.5'>
        <div className='flex items-center justify-between gap-5'>
          <h4 className='line-clamp-2 text-xs font-semibold text-text-primary sm:text-base'>{title || 'Untitled'}</h4>
          {priority !== 'None' && (
            <span
              className={`absolute right-2 top-2 rounded-md px-2 py-0.5 text-center text-[10px] font-medium text-white ${PRIORITY_COLORS[priority]?.bg}`}
            >
              {priority}
            </span>
          )}
        </div>
        <ToolTip content={<span>{description}</span>} hidden={!description || description.length < 90}>
          <p className='line-clamp-2 text-xs text-text-secondary'>{description || 'No description'}</p>
        </ToolTip>
      </div>

      <div className='flex flex-1 items-center justify-between border-t border-border pt-3'>
        <Assignee assignee={assignee} />
        <div
          className={`flex items-center gap-2 text-xs font-medium ${checkIsOverdue(task, 'task') ? 'text-red-500' : 'text-text-secondary'}`}
        >
          <BsCalendar4Event />
          {dueDate ? <span>{formatDate(dueDate)}</span> : <span>N/A</span>}
        </div>
      </div>
      {(canManipulateTasks || isCreatingProject) && (
        <div className='absolute -top-3 left-1/2 flex -translate-x-1/2 divide-x divide-border overflow-hidden rounded-full border border-border bg-background-secondary shadow-md'>
          {[
            { icon: <MdDriveFileRenameOutline />, onClick: onEdit },
            { icon: <IoTrashOutline />, onClick: onDelete },
            {
              icon: <FaRegClone size={14} />,
              onClick: () =>
                onClone({
                  title,
                  description,
                  dueDate,
                  priority,
                  status,
                  intern_id: assignee?.id || null,
                  project_id: project,
                  assignee
                }),
            },
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
  const { firstName, lastName, avatar, gender } = assignee || {};

  return typeof assignee !== 'object' ? (
    <span className='text-xs font-medium text-text-secondary'>N/A</span>
  ) : (
    <ToolTip content={<span>{`${firstName} ${lastName}`}</span>}>
      <Avatar custom={{ avatar, gender }} className='h-7 w-7' alt={`${firstName} ${lastName}`} />
    </ToolTip>
  );
}
