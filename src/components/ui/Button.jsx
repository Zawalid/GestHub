import { FaSpinner } from "react-icons/fa6";
import { cn } from "../../utils/helpers";
import { tv } from "tailwind-variants";

const button = tv({
  base: "transition-colors duration-300 flex font-medium",
  variants: {
    color: {
      primary: "bg-primary text-white hover:bg-primary-hover",
      secondary: "bg-secondary text-white hover:bg-secondary-hover",
      tertiary:
        "bg-background-secondary text-text-primary hover:bg-background-tertiary",
      delete: "bg-red-500 text-white hover:bg-red-600",
    },
    size: {
      small: "px-2 py-1.5 text-xs rounded-md",
      default: "px-3 py-2 text-sm rounded-lg",
      large: "px-4 py-3 text-base rounded-xl",
    },
    type: {
      outline:
        "bg-transparent border border-border  hover:border-transparent text-text-primary ",
      transparent:
        "bg-transparent text-text-tertiary hover:text-text-secondary",
    },
    shape: {
      icon: "h-8 w-8 items-center justify-center rounded-[4px] p-1 bg-background-secondary text-text-tertiary hover:bg-background-tertiary",
    },
    display: {
      "with-icon": "gap-4 items-center",
      centered: "justify-center",
    },
    state: {
      cancel:
        "bg-background-secondary text-text-secondary  hover:bg-background-tertiary",
      disabled: "bg-background-disabled text-text-disabled",
      active: "bg-primary text-white hover:bg-primary",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "default",
    display: "centered",
  },
  compoundVariants: [
    {
      color: "primary",
      type: "outline",
      className: "hover:bg-primary hover:text-white",
    },
    {
      color: "secondary",
      type: "outline",
      className: "hover:bg-secondary hover:text-white",
    },
    { color: "delete", type: "outline", className: "hover:bg-red-600 " },
    { shape: "icon", size: "small", className: "h-6 w-6 text-sm" },
    { shape: "icon", size: "large", className: "text-xl w-10 h-10" },
    { shape: "icon", type: "transparent",className : "bg-transparent" },
  ],
});

export function Button({
  children,
  isLoading,
  onClick,
  className,
  type,
  size,
  color,
  state,
  display,
  shape,
}) {
  return (
    <button
      className={cn(
        button({ color, state, type, size, shape, display }),
        className
      )}
      disabled={state === "disabled"}
      onClick={() => state !== "disabled" && onClick?.()}
    >
      {isLoading ? (
        <div className="flex items-center gap-3 text-white">
          <FaSpinner className="animate-spin" />
          <span>{`${children.split(" ")[0]}ing ${
            children.split(" ")[1]
          }...`}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
