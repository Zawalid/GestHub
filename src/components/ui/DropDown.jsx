import Tippy from '@tippyjs/react';
import { cloneElement, forwardRef } from 'react';
import { SearchInput } from './SearchInput';
import { IoChevronDownOutline } from './Icons';
import { cn } from '../../utils/helpers';

const defaultOptions = {
  theme: 'light',
  className: 'max-h-[200px]',
  placement: 'bottom-end',
  trigger: 'click',
  shouldCloseOnClick: true,
  interactive: true,
  arrow: false,
};
/**
 * DropDown component.
 *
 * @component
 *
 * @param {Object} props - Props that get passed to the DropDown component.
 * @param {React.ReactNode} props.children - The content of the dropdown.
 * @param {React.ReactNode} props.toggler - The element that triggers the dropdown.
 * @param {string} [props.togglerClassName] - Additional CSS classes to apply to the toggler.
 * @param {boolean} [props.togglerDisabled=false] - If true, the toggler is disabled.
 * @param {boolean} [props.togglerTooltip=false] - Used to check if the toggler is a Tippy component.
 * @param {Object} [props.options] - Options for the dropdown.
 * @param {string} [props.options.className='max-h-[200px]'] - Additional CSS classes to apply to the dropdown.
 * @param {string} [props.options.placement='bottom-end'] - The placement of the dropdown.
 * @param {string} [props.options.trigger='click'] - The event that triggers the dropdown.
 * @param {boolean} [props.options.shouldCloseOnClick=true] - If true, the dropdown closes when clicked.
 * @param {function} [props.onOpen] - The function to call when the dropdown is shown.
 * @param {function} [props.onClose] - The function to call when the dropdown is hidden.
 *
 * @returns {React.ElementType} Returns a Tippy component with the DropDown.
 */
export function DropDown({
  children,
  toggler,
  togglerClassName,
  togglerDisabled,
  togglerTooltip,
  options,
  onOpen,
  onClose,
  setIsOpen,
}) {
  const buttonProps = {
    onClick: (e) => e?.stopPropagation(),
    className: togglerClassName,
    disabled: togglerDisabled,
  };

  const render = () => {
    if (togglerTooltip) return cloneElement(toggler);
    if (['Button', 'Toggler'].includes(toggler.type.displayName)) return cloneElement(toggler, buttonProps);
    return (
      <button type='button' {...buttonProps}>
        {toggler}
      </button>
    );
  };

  return (
    <Tippy
      content={<ul className='grid gap-1'>{children}</ul>}
      className={cn(
        'dropdown rounded-md border border-border bg-background-primary p-0 shadow-md',
        defaultOptions.className,
        options?.className
      )}
      theme={options?.theme || defaultOptions.theme}
      trigger={options?.trigger || defaultOptions.trigger}
      interactive={options?.interactive || defaultOptions?.interactive}
      arrow={options?.arrow || defaultOptions?.arrow}
      placement={options?.placement || defaultOptions.placement}
      onShow={(instance) => {
        setIsOpen?.(true);
        onOpen?.();
        (options?.shouldCloseOnClick ?? defaultOptions.shouldCloseOnClick) &&
          instance.popper.addEventListener('click', () => instance.hide());
      }}
      onHidden={() => {
        setIsOpen?.(false);
        onClose?.();
      }}
    >
      {render()}
    </Tippy>
  );
}

function Option({ children, onClick, className = '', isDeleteButton, size = '', isCurrent, disabled, id }) {
  return (
    <li
      className={cn(
        'dropdown-option',
        size,
        isDeleteButton && 'delete',
        isCurrent && 'current',
        className,
        disabled && 'disabled'
      )}
      onClick={(e) => disabled || onClick?.(e)
      }
      id={id}
    >
      {children}
    </li>
  );
}

function SearchBar({ placeholder, query, onChange }) {
  return (
    <SearchInput placeholder={placeholder} query={query} onChange={onChange} className='mb-2 rounded-md text-sm' />
  );
}

const Toggler = forwardRef(({ children, icon, className = '' }, ref) => {
  return (
    <button type='button' className={cn('dropdown-toggler', className)} ref={ref}>
      {children}
      {icon || <IoChevronDownOutline className='text-text-tertiary' />}
    </button>
  );
});
Toggler.displayName = 'Toggler';

function Title({ children, className = '' }) {
  return <h4 className={`pl-1 text-sm font-medium text-text-primary ${className}`}>{children}</h4>;
}

function Divider({ className = '' }) {
  return <hr className={`border border-border ${className}`} />;
}

function NestedMenu({ children, toggler, togglerClassName, options }) {
  return (
    <DropDown
      toggler={toggler}
      togglerClassName={togglerClassName}
      options={{
        ...options,
        trigger: options?.trigger || 'mouseenter focus',
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
