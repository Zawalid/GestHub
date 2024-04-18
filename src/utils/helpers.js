import { clsx } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

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

export function formatTime(time) {
  const date = new Date(time);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formattedDate;
}

export const getIncrementedID = (array) => {
  const ids = array.map((item) => item.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

export const formatDate = (date) => DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL);

export const changeTitle = (title) => (document.title = title || 'Loading...');

export const capitalize = (string) => string?.charAt(0).toUpperCase() + string?.slice(1);
