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
