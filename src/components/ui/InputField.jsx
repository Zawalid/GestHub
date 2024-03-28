import Tippy from "@tippyjs/react";
import { forwardRef } from "react";
import { MdError } from "react-icons/md";
import { IoIosSearch, IoMdKey, IoMdMail } from "react-icons/io";

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
  search: <IoIosSearch />,
  email: <IoMdMail />,
  password: <IoMdKey />,
};

export const InputField = forwardRef(
  ({ className, errorMessage, name, label, children, ...props }, ref) => {
    const icon = icons[name];
    const cls = `${icon ? "pl-8" : "pl-4"} ${
      name === "search" ? "pr-8" : ""
    } ${className} `;

    return (
      <div>
        <div className="flex mb-1 justify-between items-center">
          <label className="font-medium text-text-tertiary text-sm">
            {label}
          </label>
          <ErrorTooltip message={errorMessage} />
        </div>

        <div className="relative w-full ">
          {icon && (
            <span className="absolute left-1.5 top-1/2 z-10 -translate-y-1/2 text-lg text-text-tertiary duration-300">
              {icon}
            </span>
          )}
          <input
            type={props.type || "text"}
            className={`w-full rounded-lg border border-border bg-background-secondary py-1.5  font-medium text-text-primary outline-none text-sm placeholder:text-sm ${cls}`}
            {...props}
            ref={ref}
          />
          {children}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
