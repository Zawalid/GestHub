import Tippy from "@tippyjs/react";
import { SearchInput } from "./SearchInput";

const defaultOptions = {
  className: "  overflow-auto  max-h-[200px]",
  placement: "bottom-end",
  trigger: "click",
  shouldCloseOnClick: true,
};
export function DropDown({
  children,
  toggler,
  togglerClassName,
  togglerDisabled,
  options,
  onOpen,
  onClose,
}) {
  return (
    <Tippy
      content={<ul className="grid gap-1 p-2">{children}</ul>}
      className={
        "dropdown rounded-md border border-border bg-background-primary p-0 shadow-md " +
        (options?.className || defaultOptions.className)
      }
      theme="light"
      trigger={options?.trigger || defaultOptions.trigger}
      interactive={true}
      arrow={false}
      placement={options?.placement || defaultOptions.placement}
      onShow={(instance) => {
        onOpen?.();
        (options?.shouldCloseOnClick ?? defaultOptions.shouldCloseOnClick) &&
          instance.popper.addEventListener("click", () => instance.hide());
      }}
      onHidden={onClose}
    >
      <button
        onClick={(e) => e.stopPropagation()}
        className={togglerClassName}
        disabled={togglerDisabled}
      >
        {toggler}
      </button>
    </Tippy>
  );
}

function Option({
  children,
  onClick,
  className = "",
  isDeleteButton,
  size = "",
  isCurrent,
  disabled,
  id,
}) {
  return (
    <li
      className={`dropDown-option ${size} ${className} ${
        isDeleteButton ? "delete" : " "
      } ${isCurrent ? "current" : ""} ${disabled ? "disabled" : ""}
        `}
      onClick={() => disabled || onClick?.()}
      id={id}
    >
      {children}
    </li>
  );
}

function SearchBar({ placeholder, value, onChange }) {
  return (
    <SearchInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-sm"
      iconClassName="text-text-tertiary text-sm"
    />
  );
}

function Toggler({ children }) {
  return (
    <span className="cursor-pointer  rounded-lg  bg-primary px-3 py-1.5   text-sm text-white  focus:outline-none">
      {children}
    </span>
  );
}

function Title({ children }) {
  return <span className="text-sm text-text-tertiary">{children}</span>;
}

function Divider() {
  return <hr className="border border-border" />;
}

function NestedMenu({ children, toggler, togglerClassName, options }) {
  return (
    <DropDown
      toggler={toggler}
      togglerClassName={togglerClassName}
      options={{
        ...options,
        trigger: options.trigger || "mouseenter focus",
      }}
    >
      {children}
    </DropDown>
  );
}
DropDown.Option = Option;
DropDown.SearchBar = SearchBar;
DropDown.Toggler = Toggler;
DropDown.Title = Title;
DropDown.Divider = Divider;
DropDown.NestedMenu = NestedMenu;
