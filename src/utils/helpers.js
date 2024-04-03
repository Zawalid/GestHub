import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));

export const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleString();
};

export const objectDeepEquals = (a, b) => {
  if(!a && !b) return true;
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (const key in a) {
    if (!objectDeepEquals(a[key], b[key])) return false;
  }

  return true;
};
