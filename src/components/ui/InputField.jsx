import Tippy from "@tippyjs/react";
import { forwardRef } from "react";
import { MdError } from "react-icons/md";

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
      <span
        className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-red-500 ${
          className || ""
        }`}
      >
        <MdError />
      </span>
    </Tippy>
  );
}

export const InputField = forwardRef(({ className, errorMessage, ...props }, ref) => {
  return (
    <div className="relative w-full ">
      <input
        type={props.type || "text"}
        className={`w-full rounded-lg border border-border bg-background-secondary py-1.5 pl-4 pr-10 font-medium text-text-primary outline-none ${className}`}
        {...props}
        ref={ref}
      />
      <ErrorTooltip message={errorMessage} />
    </div>
  );
});

InputField.displayName = "InputField";
