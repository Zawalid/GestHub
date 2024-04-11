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
        defaultOptions.className,
        options?.className,
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
        "dropdown-option",
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

function SearchBar({ placeholder, query, onChange }) {
  return (
    <SearchInput
      placeholder={placeholder}
      query={query}
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
        "dropdown-toggler",
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
