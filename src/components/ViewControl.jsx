import { PiGridFourFill, PiListBold } from 'react-icons/pi';
import { Button } from './ui';

export function ViewControl({ view = 'list', setView }) {
  return (
    <div className='flex items-center gap-3'>
      <Button shape='icon' state={view === 'list' ? 'active' : null} onClick={() => setView('list')}>
        <PiListBold className='text-lg' />
      </Button>
      <Button shape='icon' state={view === 'list' ? 'active' : null} onClick={() => setView('grid')}>
        <PiGridFourFill className='text-lg' />
      </Button>
    </div>
  );
}
