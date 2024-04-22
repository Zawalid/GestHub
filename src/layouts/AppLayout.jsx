import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Sidebar from '../components/Sidebar';
import Settings from '../features/settings/Settings';
import AppBar from '../components/AppBar';

export function AppLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className='flex size-full'>
      <Sidebar openSettings={() => setIsSettingsOpen(true)} />
      <div className='ml-14 flex flex-1 flex-col overflow-hidden bg-background-secondary p-1.5 md:ml-0'>
        <AppBar />
        <Main />
      </div>
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

function Main() {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <main
      className='flex-1 grid gap-5 overflow-y-auto overflow-x-hidden rounded-xl bg-background-primary p-3 sm:rounded-2xl sm:p-5'
      ref={parent}
    >
      <Outlet />
    </main>
  );
}
