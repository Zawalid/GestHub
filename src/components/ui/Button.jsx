import { forwardRef } from 'react';
import { FaSpinner } from './Icons';
import { cn } from '../../utils/helpers';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'transition-colors duration-300 flex font-medium',
  variants: {
    color: {
      primary: 'bg-primary text-white hover:bg-primary-hover',
      secondary: 'bg-secondary text-white hover:bg-secondary-hover',
      tertiary: 'bg-background-secondary text-text-primary hover:bg-background-tertiary',
      delete: 'bg-red-600 text-white hover:bg-red-700',
    },
    size: {
      small: 'px-2 py-1.5 text-xs rounded-md',
      default: 'px-3 py-2 text-sm rounded-lg',
      large: 'px-4 py-3 text-base rounded-xl',
    },
    type: {
      outline: 'bg-transparent border border-border  hover:border-transparent text-text-primary ',
      transparent: 'bg-transparent text-text-tertiary hover:text-text-secondary',
    },
    shape: {
      icon: 'h-8 w-8 items-center justify-center rounded-[4px] p-1 bg-background-secondary text-text-tertiary hover:bg-background-tertiary',
    },
    display: {
      'with-icon': 'gap-3 items-center',
      centered: 'justify-center',
    },
    state: {
      disabled:
        'bg-background-disabled cursor-not-allowed border-transparent hover:bg-background-disabled text-text-disabled',
      active: 'bg-primary text-white hover:bg-primary',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'default',
    display: 'centered',
  },
  compoundVariants: [
    {
      color: 'primary',
      type: 'outline',
      className: 'hover:bg-primary hover:text-white',
    },
    {
      color: 'secondary',
      type: 'outline',
      className: 'hover:bg-secondary hover:text-white',
    },
    { color: 'delete', type: 'outline', className: 'hover:bg-red-700 ' },
    { shape: 'icon', size: 'small', className: 'h-6 w-6 text-sm' },
    { shape: 'icon', size: 'large', className: 'text-xl w-10 h-10' },
    { shape: 'icon', type: 'transparent', className: 'bg-transparent' },
  ],
});

export const Button = forwardRef(
  (
    { children, isLoading, disabled, onClick, className, type, size, color, state, display, shape,  ...props },
    ref
  ) => {

  

    return (
      <button
        className={cn(
          button({
            color,
            state: disabled ? 'disabled' : state,
            type,
            size,
            shape,
            display,
          }),
          className
        )}
        ref={ref}
        disabled={disabled}
        onClick={(e) => state !== 'disabled' && onClick?.(e)}
        {...props}
      >
        {isLoading ? (
          <div className='flex items-center gap-3 text-white'>
            <FaSpinner className='animate-spin' />
            <span>{`${children.split(' ')[0]}ing ${children.split(' ')[1]}...`}</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
