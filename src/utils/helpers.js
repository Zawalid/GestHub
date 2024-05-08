import { clsx } from 'clsx';
import { DateTime, Interval } from 'luxon';
import { twMerge } from 'tailwind-merge';


//*------ Dates And Time
export const formatDate = (date, includeTime) => {
  if (!date) return null;
  const isoDate = new Date(date).toISOString();
  return DateTime.fromISO(isoDate).toLocaleString(includeTime ? DateTime.DATETIME_MED : DateTime.DATE_FULL);
};

export const checkDateInIntervals = (publicationDate, date) => {
  const dates = [
    { name: 'Today', interval: 'day' },
    { name: 'This Week', interval: 'week' },
    { name: 'This Month', interval: 'month' },
    { name: 'This Year', interval: 'year' },
  ];

  const interval = dates.find((d) => d.name === date).interval;
  const now = DateTime.local();
  const start = now.startOf(interval);
  const end = now.endOf(interval);

  return Interval.fromDateTimes(start, end).contains(DateTime.fromISO(publicationDate));
};

export const getTimelineDates = (startDate, endDate) => {
  const today = DateTime.fromISO(DateTime.now().toISO());
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  const currentDay = Math.ceil(today.diff(start, 'days').toObject().days);
  const duration = Math.ceil(end.diff(start, 'days').toObject().days);
  const daysLeft = Math.floor(end.diff(today, 'days').toObject().days);
  const daysToStart = Math.ceil(start.diff(today, 'days').toObject().days);
  const isOverdue = daysLeft <= 0;

  return { currentDay, duration, daysLeft, daysToStart, isOverdue };
};

export const getRelativeTime = (updated_at) => {
  if (!updated_at) return null;
  const now = DateTime.fromISO(DateTime.now().toISO());
  const date = DateTime.fromISO(new Date(updated_at).toISOString());

  const get = (type) => Math.abs(Math.ceil(date.diff(now, type).toObject()[type]));

  const seconds = get('seconds');
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = get('minutes');
  if (minutes < 60) return `${minutes}min ago`;

  const hours = get('hours');
  if (hours < 24) return `${hours}h ago`;

  const days = get('days');
  if (days < 7) return `${days}d ago`;

  const weeks = get('weeks');
  if (weeks < 4) return `${weeks}w ago`;

  const months = get('months');
  if (months < 12) return `${months}mo ago`;

  const years = get('years');
  return `${years}y ago`;
};

//* ----- Other 
export const cn = (...inputs) => twMerge(clsx(inputs));

export const objectDeepEquals = (a, b) => {
  if (!a && !b) return true;
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a && b && Object.keys(a).length !== Object.keys(b).length) return false;

  for (const key in a) {
    if (!objectDeepEquals(a?.[key], b?.[key])) return false;
  }

  return true;
};

export const getIncrementedID = (array) => {
  const ids = array.map((item) => item.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

export const changeTitle = (title) => (document.title = title || 'Loading...');

export const capitalize = (string) => string?.charAt(0).toUpperCase() + string?.slice(1);

export const getProgress = (ratio) => +(ratio ? (ratio % 1 === 0 ? Math.floor(ratio) : ratio.toFixed(1)) : 0);

export const canViewProject = (user, project) => {
  // return ['intern', 'supervisor'].includes(user?.role) && user?.projects?.includes(project.id);
  return (
    (user?.role === 'intern' && user?.projects?.includes(project.id)) ||
    (user?.role === 'supervisor' && project?.supervisor === user?.id) ||
    user?.role === 'super-admin'
  );
};

export const getFile = (data, type) => data?.files?.find((file) => file.type === type)?.url || null;

export const isAlreadyApplied = (user, offer_id) => user?.demands?.find((d) => d.offer_id === +offer_id);

