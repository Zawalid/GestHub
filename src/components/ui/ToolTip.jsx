import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export function ToolTip(props) {
  return <Tippy className="bg-text-secondary" theme="custom" {...props} />;
}
