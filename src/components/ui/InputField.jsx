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
  base: "input-field relative py-1 rounded-lg bg-background-secondary px-2 overflow-hidden border border-border w-full",
  variants: {
    icon: { true: "pl-9" },
  },
});

const icons = {
  search: <IoSearchOutline />,
  email: <IoMailOutline />,
  password: <IoKeyOutline />,
  phone: <FiPhone />,
  text: <MdDriveFileRenameOutline />,
  date: <IoCalendarNumberOutline />,
  city: <BiSolidCity />,
};

function Label({ label, message }) {
  if (!label) return null;

  return (
    <div className="flex gap-2 items-center">
      <label className="font-medium text-text-tertiary text-sm">{label}</label>
      {message && (
        <Tippy
          content={message.split("\n").map((msg, index) => (
            <p key={index} className="text-white">
              {msg}
            </p>
          ))}
          placement="top"
          className=" rounded-lg bg-red-500 p-2 text-xs font-semibold text-white"
        >
          <span className="cursor-pointer text-red-500">
            <MdError />
          </span>
        </Tippy>
      )}
    </div>
  );
}

function Icon({ icon }) {
  if (!icon) return null;
  return (
    <span className="border-r border-border top-0 bg-background-tertiary h-full w-7 grid place-content-center absolute left-0 z-10 text-text-tertiary duration-300">
      {icon}
    </span>
  );
}

export const InputField = forwardRef(
  ({ children, type, className, name, errorMessage, label, ...props }, ref) => {
    const icon = icons[name] || icons[type];

    return (
      <div className="space-y-1.5">
        <Label label={label} message={errorMessage} />
        <div className={cn(input({ icon: Boolean(icon) }), className)}>
          <Icon icon={icon} />
          {type === "textarea" ? (
            <textarea ref={ref} {...props}></textarea>
          ) : (
            <input type={type || "text"} ref={ref} {...props} />
          )}
          {children}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
