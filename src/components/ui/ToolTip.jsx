import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export function ToolTip({ children, hidden, ...props }) {
  if (hidden) return children;
  return (
    <Tippy className='tooltip'  theme='custom' {...props}>
      {children}
    </Tippy>
  );
}
