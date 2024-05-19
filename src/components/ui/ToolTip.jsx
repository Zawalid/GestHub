import Tippy from '@tippyjs/react';
import { forwardRef } from 'react';
import 'tippy.js/dist/tippy.css';

export const ToolTip = forwardRef(({ children, hidden, ...props }, ref) => {
  if (hidden) return children;
  return (
    <Tippy ref={ref} className='tooltip' theme='custom' {...props}>
      {children}
    </Tippy>
  );
});


ToolTip.displayName = 'ToolTip';
