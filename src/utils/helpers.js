import { clsx } from 'clsx';
import { DateTime, Interval } from 'luxon';
import { twMerge } from 'tailwind-merge';

//*------ Dates And Time
const getIsoDate = (date) => DateTime.fromISO(new Date(date).toISOString());

export const formatDate = (date, includeTime) => {
  if (!date) return null;
  return getIsoDate(date).toLocaleString(includeTime ? DateTime.DATETIME_MED : DateTime.DATE_FULL);
};

const intervals = [
  {
    name: 'Yesterday',
    interval: {
      start: DateTime.local().minus({ days: 1 }).startOf('day'),
      end: DateTime.local().minus({ days: 1 }).endOf('day'),
    },
  },
  { name: 'Today', interval: { start: DateTime.local().startOf('day'), end: DateTime.local().endOf('day') } },
  {
    name: 'Tomorrow',
    interval: {
      start: DateTime.local().plus({ days: 1 }).startOf('day'),
      end: DateTime.local().plus({ days: 1 }).endOf('day'),
    },
  },
  {
    name: 'Last 7 Days',
    interval: {
      start: DateTime.local().minus({ days: 7 }).startOf('day'),
      end: DateTime.local().startOf('day').minus({ milliseconds: 1 }),
    },
  },
  { name: 'This Week', interval: { start: DateTime.local().startOf('week'), end: DateTime.local().endOf('week') } },
  {
    name: 'Next Week',
    interval: {
      start: DateTime.local().plus({ weeks: 1 }).startOf('week'),
      end: DateTime.local().plus({ weeks: 1 }).endOf('week'),
    },
  },
  {
    name: 'Last 30 Days',
    interval: {
      start: DateTime.local().minus({ days: 30 }).startOf('day'),
      end: DateTime.local().startOf('day').minus({ milliseconds: 1 }),
    },
  },
  { name: 'This Month', interval: { start: DateTime.local().startOf('month'), end: DateTime.local().endOf('month') } },
  {
    name: 'Next Month',
    interval: {
      start: DateTime.local().plus({ months: 1 }).startOf('month'),
      end: DateTime.local().plus({ months: 1 }).endOf('month'),
    },
  },
  {
    name: 'Last 90 Days',
    interval: {
      start: DateTime.local().minus({ days: 90 }).startOf('day'),
      end: DateTime.local().startOf('day').minus({ milliseconds: 1 }),
    },
  },
  {
    name: 'Last 6 Months',
    interval: {
      start: DateTime.local().minus({ months: 6 }).startOf('month'),
      end: DateTime.local().startOf('month').minus({ milliseconds: 1 }),
    },
  },
  { name: 'This Year', interval: { start: DateTime.local().startOf('year'), end: DateTime.local().endOf('year') } },
  {
    name: 'Next Year',
    interval: {
      start: DateTime.local().plus({ years: 1 }).startOf('year'),
      end: DateTime.local().plus({ years: 1 }).endOf('year'),
    },
  },
  {
    name: 'Last Year',
    interval: {
      start: DateTime.local().minus({ years: 1 }).startOf('year'),
      end: DateTime.local().startOf('year').minus({ milliseconds: 1 }),
    },
  },
];
export const checkDateInIntervals = (date, dateInterval) => {
  const interval = intervals.find((d) => d.name === dateInterval).interval;
  return Interval.fromDateTimes(interval.start, interval.end).contains(getIsoDate(date));
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

export const getRelativeTime = (date) => {
  if (!date) return null;
  const now = getIsoDate(new Date());
  const isoDate = getIsoDate(date);

  const get = (type) => Math.abs(Math.ceil(isoDate.diff(now, type).toObject()[type]));

  const seconds = get('seconds');
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = get('minutes');
  if (minutes < 60) return `${minutes} min ago`;

  const hours = get('hours');
  if (hours < 24) return `${hours}h ago`;

  const days = get('days');
  if (days < 7) return `${days}d ago`;

  const weeks = get('weeks');
  if (weeks < 4) return `${weeks}w ago`;

  const months = get('months');
  if (months < 12) return `${months} mo ago`;

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

export const isAlreadyApplied = (user, offer_id) => user?.applications?.find((d) => d.offer_id === +offer_id);

// Filter
export const getFilter = (data, key) =>
  [...new Set(data?.map((el) => el[key]))].map((f) => ({ value: f, checked: false }));

export const getIntervals = (key) =>
  intervals
    .map((interval) => interval.name)
    .map((interval) => ({
      value: { value: interval, condition: (el) => checkDateInIntervals(el[key], interval) },
      checked: false,
    }));
