import { forwardRef } from 'react';

export const Switch = forwardRef(({ disabled, ...props }, ref) => {
  return (
    <label className='relative inline-flex  items-center'>
      <input
        type='checkbox'
        className='peer sr-only'
        {...props}
        disabled={disabled}
        ref={ref}
        checked={props.checked || false}
      />
      <div
        className={`peer h-5 w-9 rounded-full bg-background-tertiary after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full    after:bg-white  after:transition-all  after:duration-300 after:content-[''] peer-checked:bg-primary  peer-checked:after:translate-x-full peer-focus:outline-none rtl:peer-checked:after:-translate-x-full ${disabled ? 'after:opacity-50 ' : 'cursor-pointer'} `}
      ></div>
    </label>
  );
});

Switch.displayName = 'Switch';
