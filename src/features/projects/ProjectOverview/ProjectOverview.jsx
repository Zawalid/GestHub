import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useProject } from '../useProjects';
import { Members, ProgressBar } from '../Project';
import { Button } from '@/components/ui';
import { FaPlus } from '@/components/ui/Icons';
import AddNewMember from './AddNewMember';
import Tasks from './Tasks';
import Overview from './Overview';

const tabs = {
  overview: { class: 'left-0 w-[65px]', element: <Overview /> },
  tasks: { class: 'left-[98px] w-[40px]', element: <Tasks /> },
};

export default function ProjectOverview() {
  const [isOpen, setIsOpen] = useState();
  const currentTab = tabs[useParams()?.tab];
  const [parent] = useAutoAnimate({ duration: 400 });

  return (
    <>
      <Header onAddNewMember={() => setIsOpen(true)} />
      <div className='flex flex-col overflow-hidden'>
        <Tabs />
        <div className='flex flex-1 overflow-auto pr-2 pt-4' ref={parent}>
          {currentTab?.element}
        </div>
      </div>

      <AddNewMember isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

function Header({ onAddNewMember }) {
  const { id } = useParams();
  const { project } = useProject(id);

  const { name, status, progress, teamMembers } = project || {};

  return (
    <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center'>
      <div className='flex-1 space-y-2'>
        <h4 className='font-semibold text-text-primary'>{name}</h4>
        <div className='grid grid-cols-[auto_min-content] items-center gap-2'>
          <ProgressBar progress={progress} status={status} />
          <span className='text-nowrap text-xs font-medium text-text-secondary'>{progress}% completed</span>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-between gap-5 sm:justify-end'>
        <div className=' h-9'>
          <Members members={teamMembers} size='large' />
        </div>
        <Button display='with-icon' className='text-nowrap' onClick={onAddNewMember}>
          <FaPlus />
          New Member
        </Button>
      </div>
    </div>
  );
}

function Tabs() {
  const params = useParams();
  const currentTab = tabs[params?.tab];

  if (!currentTab) return;

  return (
    <div
      className='relative flex flex-col-reverse justify-between gap-3 border-b-2 border-border py-3 mobile:flex-row mobile:items-center'
      id='tabs'
    >
      <div className=' flex items-center gap-8'>
        <div
          className={`absolute -bottom-0.5 h-0.5 rounded-lg bg-primary transition-all duration-300 ${currentTab.class}`}
        ></div>
        {Object.keys(tabs).map((tab) => (
          <Link
            key={tab}
            to={`/app/projects/${params?.id}/${tab}`}
            className='py-1.5 text-sm font-medium capitalize text-text-secondary transition-colors duration-300 hover:text-text-primary'
          >
            {tab}
          </Link>
        ))}
      </div>
    </div>
  );
}
