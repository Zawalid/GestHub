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
      <label className='text-sm font-medium text-text-tertiary'>{label}</label>
      {message && <ErrorTooltip message={message} />}
    </div>
  );
}

export function ErrorTooltip({ message }) {
  return (
    <Tippy
      content={message.split('\n').map((msg, index) => (
        <p key={index} className='text-white'>
          {msg}
        </p>
      ))}
      placement='top'
      className=' rounded-lg bg-red-500 p-2 text-xs font-semibold text-white'
    >
      <span className='cursor-pointer text-red-500'>
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

export const InputField = forwardRef(
  (
    { children, type, className, name, errorMessage, label, showIcon = true, iconClassName, customIcon, ...props },
    ref
  ) => {
    const icon = showIcon && (icons[name] || icons[type]);

    return (
      <div className='space-y-1.5'>
        <Label label={label} message={errorMessage} />
        <div
          className={cn(input({ icon: Boolean(customIcon || icon), disabled: props.disabled, readOnly: props.readOnly }), className)}
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
