import { forwardRef } from 'react';
import { FaSpinner } from './Icons';
import { cn } from '../../utils/helpers';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'transition-colors flex-shrink-0 duration-300 flex font-medium',
  variants: {
    color: {
      primary: 'bg-primary text-white hover:bg-primary-hover',
      secondary: 'bg-secondary text-white hover:bg-secondary-hover',
      tertiary: 'bg-background-secondary text-text-primary hover:bg-background-tertiary',
      red: 'bg-red-600 text-white hover:bg-red-700',
      green: 'bg-green-600 text-white hover:bg-green-700',
      orange : 'bg-orange-700 text-white hover:bg-orange-800',
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
      icon: 'h-8 w-8 items-center justify-center rounded-[4px] p-1 ',
    },
    state: {
      disabled:
        'bg-background-disabled cursor-not-allowed border-transparent hover:bg-background-disabled text-text-disabled',
      active: 'bg-primary text-white hover:bg-primary',
    },
    display: {
      'with-icon': 'gap-3 items-center',
      centered: 'justify-center',
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
    { shape: 'icon', size: 'small', className: 'h-6 w-6 text-xs' },
    { shape: 'icon', size: 'large', className: 'text-xl w-10 h-10' },
    { shape: 'icon', type: 'transparent', className: 'bg-transparent' },
  ],
});

/**
 * Button component.
 *
 * @component
 *
 * @param {Object} props - Props that get passed to the Button component.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {boolean} [props.isLoading=false] - If true, a loading spinner is displayed in the button.
 * @param {boolean} [props.disabled=false] - If true, the button is disabled.
 * @param {function} [props.onClick] - The function to call when the button is clicked.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {string} [props.type] - The type of the button. This can be 'outline' or 'transparent'.
 * @param {string} [props.size='default'] - The size of the button. This can be 'small', 'default', or 'large'.
 * @param {string} [props.color='primary'] - The color of the button. This can be 'primary', 'secondary', 'tertiary', or 'delete'.
 * @param {string} [props.state] - The state of the button. This can be 'disabled' or 'active'.
 * @param {string} [props.display='centered'] - The display of the button. This can be 'with-icon' or 'centered'.
 * @param {string} [props.shape] - The shape of the button. This can be 'icon'.
 * @param {React.LegacyRef<HTMLButtonElement>} ref - A ref that gets passed to the button element.
 *
 * @returns {React.ElementType} Returns a button element with the Button.
 */
export const Button = forwardRef(
  ({ children, isLoading, disabled, onClick, className, type, size, color, state, display, shape, ...props }, ref) => {
    return (
      <button
        className={cn(
          button({
            color: shape === 'icon' && !color ? 'tertiary' : color,
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
        type='button'
        {...props}
      >
        {isLoading ? (
          <div className='flex items-center gap-3 text-white'>
            <FaSpinner className='animate-spin' />
            {children}
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
