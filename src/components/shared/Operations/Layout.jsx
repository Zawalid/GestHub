import { Button } from '@/components/ui';
import { PiGridFourFill, PiListBold } from 'react-icons/pi';
import { useOperations } from './useOperations';

export function Layout({ className = '' }) {
  const { layout, onchangeLayout, disabled } = useOperations();
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {[
        { layout: 'grid', icon: <PiListBold className='text-lg' /> },
        { layout: 'list', icon: <PiGridFourFill className='text-lg' /> },
      ].map((button) => (
        <Button
          key={button.layout}
          shape='icon'
          state={layout === button.layout ? 'active' : null}
          onClick={() => onchangeLayout(button.layout)}
          disabled={disabled}
        >
          {button.icon}
        </Button>
      ))}
    </div>
  );
}
