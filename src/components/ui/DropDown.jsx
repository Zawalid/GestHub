import Tippy from "@tippyjs/react";
import { cloneElement, forwardRef } from "react";
import { SearchInput } from "./SearchInput";
import { IoChevronDownOutline } from "./Icons";
import { cn } from "../../utils/helpers";

const defaultOptions = {
  className: "overflow-auto  max-h-[200px]",
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
  const buttonProps = {
    onClick: (e) => e?.stopPropagation(),
    className: togglerClassName,
    disabled: togglerDisabled,
  };

  return (
    <Tippy
      content={<ul className="grid gap-1 p-2">{children}</ul>}
      className={cn(
        "dropdown rounded-md border border-border bg-background-primary p-0 shadow-md",
        options?.className || defaultOptions.className
      )}
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
      {["Button", "Toggler"].includes(toggler.type.displayName) ? (
        cloneElement(toggler, buttonProps)
      ) : (
        <button {...buttonProps}>{toggler}</button>
      )}
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
      className={cn(
        "dropDown-option",
        size,
        isDeleteButton && "delete",
        isCurrent && "current",
        className,
        disabled && "disabled"
      )}
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

const Toggler = forwardRef(({ children, icon, className = "" }, ref) => {
  return (
    <button
      className={cn(
        "flex min-w-28 hover:bg-background-tertiary transition-colors duration-200 cursor-pointer items-center justify-between rounded-lg border border-border  bg-background-secondary p-2 text-start  text-sm text-text-secondary  focus:outline-none",
        className
      )}
      ref={ref}
    >
      {children}
      {icon || <IoChevronDownOutline className="text-text-tertiary" />}
    </button>
  );
});
Toggler.displayName = "Toggler";

function Title({ children }) {
  return <span className="text-sm pl-1 text-text-tertiary">{children}</span>;
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
        trigger: options?.trigger || "mouseenter focus",
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
