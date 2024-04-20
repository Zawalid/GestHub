import { DateTime } from 'luxon';
import { ToolTip } from '@/components/ui';
import { STATUS_COLORS } from '@/utils/constants';
import { useAnimatedProgress } from '@/hooks';
import { formatDate } from '@/utils/helpers';

export function Details({ project }) {
  const { description, startDate, endDate, status } = project || {};

  return (
    <div className='space-y-6 rounded-lg  border-border '>
      <div className='flex  flex-1 flex-col gap-2'>
        <label className='text-sm font-medium text-text-tertiary'>Description</label>
        <textarea
          placeholder='This project has no description...'
          rows='4'
          readOnly
          className='resize-none rounded-lg bg-background-secondary p-3 text-sm text-text-primary outline-none placeholder:text-sm
          '
          value={description}
        ></textarea>
      </div>
      <TimeLine startDate={startDate} endDate={endDate} status={status} />
    </div>
  );
}

export function Progress({ progress: pr, status }) {
  const progress = useAnimatedProgress(pr);
  return (
    <>
      <div className='flex items-center gap-2 sm:hidden'>
        <span className='text-xs font-medium text-text-primary'>{progress}%</span>
        <div className='relative w-full rounded-lg bg-background-tertiary py-1'>
          <div
            className={`absolute top-0 h-full rounded-lg transition-all duration-[3s] ${STATUS_COLORS[status]?.bg}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className='relative hidden items-center justify-center sm:flex'>
        <svg className='h-full w-full' viewBox='0 0 100 100'>
          <circle
            className='stroke-current text-border'
            strokeWidth='8'
            cx='50'
            cy='50'
            r='40'
            fill='transparent'
          ></circle>
          <circle
            className='stroke-current text-background-secondary'
            strokeWidth='6'
            cx='50'
            cy='50'
            r='40'
            fill='transparent'
          ></circle>
          <circle
            className={`progress-ring__circle  stroke-current ${STATUS_COLORS[status]?.text}`}
            strokeWidth='6'
            strokeLinecap='round'
            cx='50'
            cy='50'
            r='40'
            fill='transparent'
            strokeDasharray='251.2'
            strokeDashoffset={`calc(251.2 - (251.2 * ${progress}) / 100)`}
          ></circle>
        </svg>
        <span className='absolute text-xs font-medium text-text-primary'>{progress}%</span>
      </div>
    </>
  );
}

function TimeLine({ startDate, endDate, status }) {
  const today = DateTime.fromISO(DateTime.now().toISO());
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  const currentDay = Math.ceil(today.diff(start, 'days').toObject().days);
  const duration = Math.ceil(end.diff(start, 'days').toObject().days);
  const daysLeft = Math.floor(end.diff(today, 'days').toObject().days);
  const daysToStart = Math.ceil(start.diff(today, 'days').toObject().days);
  const isOverdue = daysLeft <= 0;

  const progress = useAnimatedProgress((currentDay / duration) * 100);

  return (
    <div className='space-y-3 '>
      <label className='text-sm font-medium text-text-tertiary'>Timeline</label>
      <div className='flex justify-between'>
        <div className='flex items-center gap-1.5'>
          <span className='h-2 w-2 rounded-full bg-blue-500'></span>
          <ToolTip content={<span className='text-xs text-text-secondary'>Start Date</span>}>
            <span className='text-sm font-medium text-text-secondary'>{formatDate(startDate)}</span>
          </ToolTip>
        </div>
        <div className='flex items-center gap-1.5'>
          <span className='h-2 w-2 rounded-full bg-red-500'></span>
          <ToolTip content={<span className='text-xs text-text-secondary'>End Date</span>}>
            <span className='text-sm font-medium text-text-secondary'>{formatDate(endDate)}</span>
          </ToolTip>
        </div>
      </div>
      <div className='relative w-full rounded-lg bg-background-tertiary py-1'>
        <div
          className={`absolute top-0 h-full max-w-full rounded-lg transition-all duration-[3s] ${isOverdue ? 'bg-red-500' : STATUS_COLORS[status]?.bg}`}
          style={{ width: daysToStart > 0 ? '12px' : `${isOverdue ? 100 : progress}%` }}
        >
          <ToolTip
            content={<span className='text-xs text-text-secondary'>
              {isOverdue
                ? 'The project is overdue'
                : daysToStart > 0
                  ? `The project will start in ${daysToStart} days`
                  : `${daysLeft} days left until the project ends`}{' '}
            </span>}
          >
            <span className='absolute -top-0.5 right-0 h-3 w-3 rounded-full bg-text-primary'></span>
          </ToolTip>
        </div>
      </div>
    </div>
  );
}
