import Tippy from "@tippyjs/react";
import { forwardRef } from "react";
import { MdError } from "react-icons/md";
import {
  IoMailOutline,
  IoKeyOutline,
  IoSearchOutline,
  IoCalendarNumberOutline,
} from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiSolidCity } from "react-icons/bi";
import { cn } from "../../utils/helpers";

export function ErrorTooltip({ message, className }) {
  if (!message) return null;
  return (
    <Tippy
      content={message.split("\n").map((msg, index) => (
        <p key={index} className="text-white">
          {msg}
        </p>
      ))}
      placement="top"
      className=" rounded-lg bg-red-500 p-2 text-xs font-semibold text-white"
    >
      <span className={`cursor-pointer text-red-500 ${className || ""}`}>
        <MdError />
      </span>
    </Tippy>
  );
}

const icons = {
  search: <IoSearchOutline />,
  email: <IoMailOutline />,
  password: <IoKeyOutline />,
  phone: <FiPhone />,
  text: <MdDriveFileRenameOutline />,
  date: <IoCalendarNumberOutline />,
  city: <BiSolidCity />,
};

export const InputField = forwardRef(
  ({ className, errorMessage, name, label, children, ...props }, ref) => {
    const icon = icons[name] || icons[props.type];

    return (
      <div className="space-y-1.5">
        {label && (
          <div className="flex gap-2 items-center">
            <label className="font-medium text-text-tertiary text-sm">
              {label}
            </label>
            <ErrorTooltip message={errorMessage} />
          </div>
        )}

        <div className="relative overflow-hidden rounded-lg border border-border w-full ">
          {icon && (
            <span className="bg-background-tertiary h-full w-7 grid place-content-center absolute left-0 z-10 text-text-tertiary duration-300">
              {icon}
            </span>
          )}
          <input
            type={props.type || "text"}
            className={cn(
              "w-full bg-background-secondary py-1.5 pr-2 text-text-primary outline-none text-sm placeholder:text-sm",
              icon ? "pl-9" : "pl-4",
              name === "search" && "pr-8",
              className
            )}
            ref={ref}
            {...props}
          />
          {children}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
