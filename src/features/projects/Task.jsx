import { useState } from 'react';
import {
  TbProgressCheck,
  FaRegCircleCheck,
  MdOutlineNotStarted,
  BsCalendar4Event,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from '@/components/ui/Icons';
import { ToolTip } from '@/components/ui/ToolTip';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/utils/constants';

const statusIcons = {
  'Not Started': <MdOutlineNotStarted size={25} />,
  'In Progress': <TbProgressCheck size={25} />,
  Completed: <FaRegCircleCheck size={20} />,
};

export default function Task({ task, onDelete, onEdit, onUpdate }) {
  const { id, title, description, dueDate, priority, status, assignee } = task;
  const [currentStatus, setCurrentStatus] = useState(status);

  const changeStatus = () => {
    const newStatus =
      currentStatus === 'Not Started' ? 'In Progress' : currentStatus === 'In Progress' ? 'Completed' : 'Not Started';

    setCurrentStatus(newStatus);
    onUpdate({ ...task, status: newStatus });
  };

  return (
    <div className="relative h-[190px] space-y-3.5 rounded-lg border border-border bg-background-secondary p-4 shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <img
              src={assignee.image || '/images/default-profile.jpg'}
              alt="avatar"
              className="h-7 w-7 cursor-pointer rounded-full border-2 border-border"
            />
            <span className="text-sm font-medium text-text-primary">
              {assignee === 'None' ? 'No Assigned Intern' : `${assignee.firstName} ${assignee.lastName}`}
            </span>
          </div>
          <ToolTip content={<span>{currentStatus}</span>} arrow={false}>
            <button
              onClick={changeStatus}
              className={`relative h-7 w-4 ${STATUS_COLORS[currentStatus || 'Not Started'].text}`}
            >
              {' '}
              {Object.keys(statusIcons).map((key) => (
                <span
                  key={key}
                  className={`absolute transition-transform duration-300 ${
                    key === currentStatus ? 'scale-100' : 'scale-0'
                  }
                  ${key === 'Completed' ? 'left-0.5 top-[3px]' : 'left-0 top-0 '}
                  `}
                >
                  {statusIcons[key]}
                </span>
              ))}
            </button>
          </ToolTip>
        </div>
        <h4 className="line-clamp-1 font-semibold text-text-primary">{title || 'Untitled'}</h4>
        <p className="line-clamp-2 text-xs text-text-secondary">{description || 'No description'}</p>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
          <BsCalendar4Event />
          {dueDate ? <span>{dueDate}</span> : <span>No due date set</span>}
        </div>
        {priority !== 'None' && (
          <span className={`rounded-md px-2 py-1 text-center text-xs ${PRIORITY_COLORS[priority]}`}>{priority}</span>
        )}
      </div>
      <div className=" absolute -bottom-3 left-1/2 flex -translate-x-1/2 divide-x divide-border overflow-hidden rounded-full border border-border bg-background-secondary shadow-md">
        {[
          { icon: <MdDriveFileRenameOutline />, onClick: onEdit },
          { icon: <IoTrashOutline />, onClick: onDelete },
        ].map((b, i) => (
          <button
            className="px-2 py-1 transition-colors duration-300 hover:bg-background-primary"
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
