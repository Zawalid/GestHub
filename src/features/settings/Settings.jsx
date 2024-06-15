import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { PiArrowRight, PiX } from '@/components/ui/Icons';
import { Panel } from './Panel';
import { Button, Modal } from '@/components/ui';
import { useUser } from '@/hooks/useUser';
import Profile from './Profile';
import Password from './Password';
import General from './General';
import About from './About';
import SideBar from './SideBar';
import Preferences from './Preferences';

export default function Settings({ isOpen, onClose }) {
  const [currentTab, setCurrentTab] = useState('preferences');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [key, setKey] = useState();

  useEffect(() => {
    setCurrentTab('preferences');
    setKey(Math.random());
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='sm:flex-row md:border lg:h-5/6 lg:w-5/6 '>
      <div className='absolute left-0 top-0 z-10 flex w-full justify-between border-b border-border bg-background-primary px-5 py-2 sm:left-[200px] sm:w-[calc(100%-200px)]'>
        <h3 className='text-lg font-bold capitalize text-text-primary sm:text-xl'>{currentTab}</h3>
        <div className='z-50 flex gap-2'>
          <Button className='sm:hidden' shape='icon' size='small' onClick={() => setIsPanelOpen(!isPanelOpen)}>
            <PiArrowRight className={isPanelOpen ? 'rotate-180' : ''} />
          </Button>
          <Button className='sm:hidden' shape='icon' size='small' onClick={onClose}>
            <PiX />
          </Button>
        </div>
      </div>
      <Panel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <Content currentTab={currentTab} key={key} />
    </Modal>
  );
}

function Content({ currentTab }) {
  const { user } = useUser();
  const [parent] = useAutoAnimate({ duration: 300 });

  const tabs = {
    profile: <Profile />,
    password: <Password />,
    preferences : <Preferences />,
    sidebar : <SideBar />,
    ...(user?.role === 'super-admin' && {
      general: <General />,
      about: <About />,
    }),
  };

  return (
    <div
      className='flex flex-1 flex-col gap-3 overflow-hidden pb-4 pt-16  transition-opacity duration-500 child-padding '
      ref={parent}
    >
      {tabs[currentTab]}
    </div>
  );
}
