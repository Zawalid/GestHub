import { clsx } from 'clsx';
import { DateTime, Interval } from 'luxon';
import { twMerge } from 'tailwind-merge';

//*------ Dates And Time
export const getIsoDate = (date) => DateTime.fromISO(new Date(date).toISOString());

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
    time: 'past',
  },
  {
    name: 'Today',
    interval: { start: DateTime.local().startOf('day'), end: DateTime.local().endOf('day') },
    time: 'present',
  },
  {
    name: 'Tomorrow',
    interval: {
      start: DateTime.local().plus({ days: 1 }).startOf('day'),
      end: DateTime.local().plus({ days: 1 }).endOf('day'),
    },
    time: 'future',
  },
  {
    name: 'Last 7 Days',
    interval: {
      start: DateTime.local().minus({ days: 7 }).startOf('day'),
      end: DateTime.local().startOf('day').minus({ milliseconds: 1 }),
    },
    time: 'past',
  },
  {
    name: 'This Week',
    interval: { start: DateTime.local().startOf('week'), end: DateTime.local().endOf('week') },
    time: 'present',
  },
  {
    name: 'Next Week',
    interval: {
      start: DateTime.local().plus({ weeks: 1 }).startOf('week'),
      end: DateTime.local().plus({ weeks: 1 }).endOf('week'),
    },
    time: 'future',
  },
  {
    name: 'Last 30 Days',
    interval: {
      start: DateTime.local().minus({ days: 30 }).startOf('day'),
      end: DateTime.local().startOf('day').minus({ milliseconds: 1 }),
    },
    time: 'past',
  },
  {
    name: 'This Month',
    interval: { start: DateTime.local().startOf('month'), end: DateTime.local().endOf('month') },
    time: 'present',
  },
  {
    name: 'Next Month',
    interval: {
      start: DateTime.local().plus({ months: 1 }).startOf('month'),
      end: DateTime.local().plus({ months: 1 }).endOf('month'),
    },
    time: 'future',
  },
  {
    name: 'Last 90 Days',
    interval: {
      start: DateTime.local().minus({ days: 90 }).startOf('day'),
      end: DateTime.local().startOf('day').minus({ milliseconds: 1 }),
    },
    time: 'past',
  },
  {
    name: 'Last 6 Months',
    interval: {
      start: DateTime.local().minus({ months: 6 }).startOf('month'),
      end: DateTime.local().startOf('month').minus({ milliseconds: 1 }),
    },
    time: 'past',
  },
  {
    name: 'This Year',
    interval: { start: DateTime.local().startOf('year'), end: DateTime.local().endOf('year') },
    time: 'present',
  },
  {
    name: 'Next Year',
    interval: {
      start: DateTime.local().plus({ years: 1 }).startOf('year'),
      end: DateTime.local().plus({ years: 1 }).endOf('year'),
    },
    time: 'future',
  },
  {
    name: 'Last Year',
    interval: {
      start: DateTime.local().minus({ years: 1 }).startOf('year'),
      end: DateTime.local().startOf('year').minus({ milliseconds: 1 }),
    },
    time: 'past',
  },
];
export const checkDateInIntervals = (date, dateInterval) => {
  const interval = intervals.find((d) => d.name === dateInterval).interval;
  return Interval.fromDateTimes(interval.start, interval.end).contains(getIsoDate(date));
};
export const getTimelineDates = (startDate, endDate) => {
  const today = DateTime.fromISO(DateTime.now().toISO()).startOf('day');
  const start = DateTime.fromISO(startDate).startOf('day');
  const end = DateTime.fromISO(endDate).startOf('day');

  const currentDay = Math.ceil(today.diff(start, 'days').toObject().days);
  const duration = Math.ceil(end.diff(start, 'days').toObject().days);
  const daysLeft = Math.floor(end.diff(today, 'days').toObject().days);
  const daysToStart = Math.ceil(start.diff(today, 'days').toObject().days);
  const isOverdue = daysLeft < 0;

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

export const filterObject = (obj, keys, keysType) => {
  const filtered = {};
  for (const key in obj) {
    if (keysType === 'include' && keys.includes(key)) filtered[key] = obj[key];
    if (keysType === 'exclude' && !keys.includes(key)) filtered[key] = obj[key];
  }
  return filtered;
};

export const getIncrementedID = (array) => {
  const ids = array.map((item) => item.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

export const changeTitle = (title) => (document.title = title || 'Loading...');

export const capitalize = (string) => string?.charAt(0).toUpperCase() + string?.slice(1);

export const getProgress = (ratio) => +(ratio ? (ratio % 1 === 0 ? Math.floor(ratio) : ratio.toFixed(1)) : 0);

export const getFile = (data, type) => {
  const file = data?.files?.find((file) => file.type === type)?.url;
  return file ? `/assets${file}` : null;
};



// Filter
export const getFilter = (data, key, checked) =>
  [...new Set(data?.map((el) => el[key]))].map((f) => ({ value: f, checked: f === checked }));

export const getIntervals = (key, returned = ['past', 'present', 'future'], excluded = []) => {
  return intervals
    .filter((interval) => returned.includes(interval.time))
    .filter((interval) => !excluded.includes(interval.name))
    .map((interval) => interval.name)
    .map((interval) => ({
      value: { value: interval, condition: (el) => checkDateInIntervals(el[key], interval) },
      checked: false,
    }));
};

export const checkIsOverdue = (el, type) => {
  const startDate = type === 'task' ? el.created_at : el.startDate;
  const endDate = type === 'task' ? el.dueDate : el.endDate;
  const { isOverdue } = getTimelineDates(startDate, endDate);

  if (type === 'task') return isOverdue && el.status !== 'Done';
  return isOverdue && el.status !== 'Completed';
};
