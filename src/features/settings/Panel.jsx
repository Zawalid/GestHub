import { cloneElement } from 'react';
import { PiGear, PiLockKey, PiSidebar, PiUserCircle } from 'react-icons/pi';
import { Overlay } from '../../components/ui/Modal';
import { useUser } from '@/hooks/useUser';
import { LuInfo } from 'react-icons/lu';

export function Panel({ isOpen, onClose, currentTab, setCurrentTab }) {
  const { user } = useUser();
  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} closeOnBlur={true} />
      <div
        className={`absolute top-0 z-40 flex h-full w-[200px] flex-col items-start gap-3 border-r border-border bg-background-disabled p-3  shadow-md transition-[left]  duration-500 sm:static sm:pt-[45px] sm:shadow-none ${
          isOpen ? 'left-0' : '-left-full'
        }`}
      >
        {[
          {
            name: 'profile',
            icon: <PiUserCircle />,
          },
          {
            name: 'password',
            icon: <PiLockKey />,
          },
          {
            name: 'sidebar',
            icon: <PiSidebar />,
          },
          ...(user?.role === 'super-admin'
            ? [
                { name: 'general', icon: <PiGear /> },
                { name: 'about', icon: <LuInfo /> },
              ]
            : []),
        ].map(({ name, icon }) => (
          <Tab key={name} tabName={name} icon={icon} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        ))}
      </div>
    </>
  );
}

function Tab({ tabName, icon, currentTab, setCurrentTab }) {
  return (
    <button
      className={
        'flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-background-secondary ' +
        (currentTab === tabName ? 'bg-background-secondary font-medium  text-text-secondary' : 'text-text-tertiary')
      }
      onClick={() => setCurrentTab(tabName)}
    >
      {cloneElement(icon, { size: '22' })}
      <span className='text-sm capitalize'>{tabName}</span>
    </button>
  );
}
