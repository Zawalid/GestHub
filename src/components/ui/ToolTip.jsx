import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export function ToolTip(props) {
  return <Tippy  className="tooltip" theme="custom" {...props} />;
}
