import { PRIORITY_COLORS, STATUS_COLORS } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { ToolTip } from '@/components/ui/ToolTip';
import { checkIsOverdue, cn, formatDate } from '@/utils/helpers';
import { useInternsByIds } from '../interns/useInterns';
import Avatar from '@/components/ui/Avatar';
import { Layer } from '../offers/Offer';
import { FaCalendarXmark } from 'react-icons/fa6';

export default function Project({ project, layout }) {
  const { id, subject, description, startDate, endDate, status, priority, teamMembers } = project;
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'group relative grid cursor-pointer grid-rows-[24px_auto_20px_28px] gap-3 rounded-lg  border border-border bg-background-disabled p-3 shadow-md transition-transform duration-300 hover:scale-95',
        layout === 'grid' && 'h-[240px]',
        priority !== 'None' && 'rounded-tr-none'
      )}
      onClick={() => navigate(String(id))}
    >
      <Layer condition={checkIsOverdue(project, 'project')} icon={<FaCalendarXmark />} />

      <PriorityIndicator priority={priority} />
      <div className='flex items-center justify-between'>
        <Date startDate={startDate} endDate={endDate} isOverdue={checkIsOverdue(project, 'project')} />
      </div>
      <div className='space-y-2'>
        <h3 className='line-clamp-2 text-lg font-semibold text-text-primary'>{subject}</h3>
        <p className='line-clamp-2 text-sm text-text-secondary'>{description || 'No description'}</p>
      </div>
      <ProgressBar project={project} />
      <div className='mt-auto flex items-center justify-between '>
        <Members members={teamMembers} />
        <p className={`w-fit rounded-md p-2 py-1 text-xs text-white ${STATUS_COLORS[status || 'Not Started']?.bg}`}>
          {status || 'Not Started'}
        </p>
      </div>
    </div>
  );
}

function Date({ startDate, endDate, isOverdue }) {
  const overdue = 'bg-red-500 text-white';
  const notOverdue = 'bg-background-secondary text-text-secondary';

  return (
    <div className='project-date relative h-6 w-fit text-nowrap'>
      <div className={`side absolute z-[1] ${isOverdue ? overdue : notOverdue}`}>
        <span>{formatDate(isOverdue ? endDate : startDate)}</span>
      </div>
      <div className={`side -z-[1] overflow-hidden  ${isOverdue ? notOverdue : overdue}`}>
        <span className='text-white'>{formatDate(isOverdue ? startDate : endDate)}</span>
      </div>
    </div>
  );
}

function PriorityIndicator({ priority }) {
  return (
    <>
      <div
        className={`absolute -right-[1.2px] -top-[1.5px] h-[2px] w-16 rounded-lg ${PRIORITY_COLORS[priority]?.bg}`}
      ></div>
      <div
        className={`absolute -right-[1px] -top-[1.2px] h-16 w-[2px] rounded-lg ${PRIORITY_COLORS[priority]?.bg}`}
      ></div>
    </>
  );
}

function ProgressBar({ project }) {
  const { status, tasks, progress, completedTasks } = project;
  const color = STATUS_COLORS[status]?.bg;

  return (
    <div className='flex items-center gap-2'>
      <span className='text-xs font-bold text-text-primary'>
        {completedTasks.length}/{tasks.length}
      </span>
      <div className='relative w-full rounded-lg bg-background-tertiary py-1'>
        <div
          className={`absolute top-0 h-full rounded-lg transition-all duration-500 ${color}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

function Members({ members }) {
  const { interns: teamMembers } = useInternsByIds(members);
  const [parent] = useAutoAnimate({ duration: 400 });

  if (!members.length)
    return <div className='grid h-full place-content-center text-xs font-medium text-text-secondary'>No Team</div>;

  const wrapperWidth = members.length === 1 ? 36 : (members.slice(0, 3).length + (members.length > 3 ? 1 : 0)) * 25;

  return (
    <div className='relative h-7' style={{ width: `${wrapperWidth}px` }} ref={parent}>
      {teamMembers?.slice(0, 3).map(({ id, fullName, avatar, gender }, i) => (
        <ToolTip key={id || fullName} content={<span className='text-xs text-text-secondary'>{fullName}</span>}>
          <Avatar
            custom={{ avatar, gender }}
            className='absolute top-0 z-[1] h-7 w-7'
            style={{ left: `${i * 15}px` }}
            alt={fullName}
          />
        </ToolTip>
      ))}
      {members.length > 3 && (
        <span
          className={`absolute z-[1] grid h-7 w-7 place-content-center rounded-full border border-border bg-background-secondary text-xs font-bold text-text-primary`}
          style={{ left: `${members.slice(0, 3).length * 15}px` }}
          color='tertiary'
        >
          +{members.slice(3).length}
        </span>
      )}
    </div>
  );
}
