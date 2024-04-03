import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));


export function formatTime(time) {
  const date = new Date(time);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDate;
}