import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));

export const formatToCamelCase = (str) => {
  const result = str.replace(/\s(.)/g, function (match) {
    return match.toUpperCase();
  });
  return result.replace(/\s/g, "").replace(/^(.)/, function (match) {
    return match.toLowerCase();
  });
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
