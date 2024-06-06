import Tippy from '@tippyjs/react';
import { forwardRef } from 'react';
import {
  IoMailOutline,
  IoKeyOutline,
  IoSearchOutline,
  IoCalendarNumberOutline,
  FiPhone,
  MdDriveFileRenameOutline,
  BsBuilding,
  MdError,
  IoSchool,
  FaCity,
  MdOutlineTimelapse,
  IoLocationOutline,
  GrMapLocation,
} from './Icons';
import { cn } from '../../utils/helpers';
import { tv } from 'tailwind-variants';

const input = tv({
  base: 'input-field relative py-1 rounded-lg bg-background-secondary px-2 overflow-hidden border border-border w-full',
  variants: {
    icon: { true: 'pl-9' },
    disabled: { true: 'bg-background-disabled' },
    readOnly: { true: 'bg-background-disabled' },
  },
});

const icons = {
  search: <IoSearchOutline />,
  email: <IoMailOutline />,
  password: <IoKeyOutline />,
  phone: <FiPhone />,
  text: <MdDriveFileRenameOutline />,
  date: <IoCalendarNumberOutline />,
  establishment: <BsBuilding />,
  academicLevel: <IoSchool />,
  city: <FaCity />,
  duration: <MdOutlineTimelapse />,
  location: <IoLocationOutline />,
  maps: <GrMapLocation />,
};

function Label({ label, message }) {
  if (!label) return null;

  return (
    <div className='flex items-center gap-2'>
      {typeof label === 'string' ? <label className='text-sm font-medium text-text-tertiary'>{label}</label> : label}
      {<ErrorTooltip message={message} />}
    </div>
  );
}

export function ErrorTooltip({ message }) {
  return (
    <Tippy
      content={message?.split('\n').map((msg, index) => (
        <p key={index} className='text-white'>
          {msg}
        </p>
      ))}
      placement='top'
      className=' rounded-lg bg-red-500 p-2 text-xs font-semibold text-white'
    >
      <span
        className={`cursor-pointer text-lg text-red-500 transition-transform duration-300 ${message ? 'scale-100' : 'scale-0'}`}
      >
        <MdError />
      </span>
    </Tippy>
  );
}

function Icon({ icon, className = '' }) {
  if (!icon) return null;
  return (
    <span
      className={`absolute left-0 top-0 z-10 grid h-full w-7 place-content-center border-r border-border bg-background-tertiary text-text-tertiary duration-300 ${className}`}
    >
      {icon}
    </span>
  );
}

/**
 * InputField component.
 *
 * @component
 *
 * @param {Object} props - Props that get passed to the InputField component.
 * @param {React.ReactNode} [props.children] - The children nodes of the InputField.
 * @param {string} [props.type] - The type of the input field. This can be 'text', 'password', 'email', etc.
 * @param {string} [props.className] - Additional CSS classes to apply to the input field.
 * @param {string} [props.parentClassName] - Additional CSS classes to apply to the input field parent element
 * @param {string} [props.name] - The name of the input field.
 * @param {string} [props.errorMessage] - The error message to display.
 * @param {string} [props.label] - The label for the input field.
 * @param {boolean} [props.showIcon=true] - If true, an icon is displayed in the input field.
 * @param {string} [props.iconClassName] - Additional CSS classes to apply to the icon.
 * @param {React.ReactNode} [props.customIcon] - A custom icon to display in the input field.
 * @param {React.LegacyRef<HTMLInputElement | HTMLTextAreaElement>} ref - A ref that gets passed to the input or textarea element.
 *
 * @returns {React.ElementType} Returns a div element with the InputField.
 */
export const InputField = forwardRef(
  (
    {
      children,
      type,
      className,
      parentClassName = '',
      name,
      errorMessage,
      label,
      showIcon = true,
      iconClassName,
      customIcon,
      ...props
    },
    ref
  ) => {
    const icon = showIcon && (icons[name] || icons[type]);

    return (
      <div className={`flex flex-col gap-1.5 ${parentClassName}`}>
        <Label label={label} message={errorMessage} />
        <div
          className={cn(
            input({
              icon: Boolean(customIcon || icon),
              disabled: Boolean(props.disabled),
              readOnly: Boolean(props.readOnly),
            }),
            className
          )}
        >
          {customIcon ? customIcon : showIcon && <Icon icon={icon} className={iconClassName} />}
          {type === 'textarea' ? (
            <textarea ref={ref} {...props}></textarea>
          ) : (
            <input type={type || 'text'} ref={ref} {...props} />
          )}
          {children}
        </div>
      </div>
    );
  }
);

InputField.displayName = 'InputField';
