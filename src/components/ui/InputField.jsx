import Tippy from "@tippyjs/react";
import { forwardRef } from "react";
import {
  IoMailOutline,
  IoKeyOutline,
  IoSearchOutline,
  IoCalendarNumberOutline,
  FiPhone,
  MdDriveFileRenameOutline,
  BiSolidCity,
  MdError,
} from "./Icons";
import { cn } from "../../utils/helpers";
import { tv } from "tailwind-variants";

const input = tv({
  base: "w-full pl-4 disabled:bg-background-disabled disabled:text-text-disabled disabled:placeholder:text-text-disabled disabled:cursor-not-allowed transition-colors  duration-300 bg-background-secondary py-1.5 pr-2 text-text-primary outline-none text-sm placeholder:text-sm",
  variants: {
    type: {
      icon: "pl-9",
      search: "pr-8",
    },
  },
});

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
  ({ className, errorMessage, name, type, label, children, ...props }, ref) => {
    const icon = icons[name] || icons[type];

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
        <div className="relative bg-background-secondary overflow-hidden rounded-lg border border-border w-full ">
          {icon && (
            <span className="bg-background-tertiary h-full w-7 grid place-content-center absolute left-0 z-10 text-text-tertiary duration-300">
              {icon}
            </span>
          )}
          {type === "textarea" ? (
            <textarea
              className={cn(input(), className, "resize-none")}
              ref={ref}
              {...props}
            ></textarea>
          ) : (
            <input
              type={type || "text"}
              className={cn(
                input({
                  type: icon ? "icon" : name === "search" ? "search" : null,
                }),
                className
              )}
              ref={ref}
              {...props}
            />
          )}
          {children}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
