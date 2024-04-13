import { Link, Navigate, useParams } from 'react-router-dom';
import { useProject } from '../useProjects';
import { Members, ProgressBar } from '../Project';
import { Button } from '@/components/ui';
import { FaPlus } from 'react-icons/fa';
import { PiListBold, RxViewVertical } from '@/components/ui/Icons';
import { useState } from 'react';

export default function ProjectOverview() {
  return (
    <div className=''>
      <Header />
      <Tabs />
    </div>
  );
}

function Header() {
  const { id } = useParams();
  const { project } = useProject(id);

  const { name, status, progress, teamMembers } = project || {};

  return (
    <div className='flex flex-col sm:items-center justify-between gap-5 sm:flex-row'>
      <div className='flex-1 space-y-2'>
        <h4 className='font-semibold text-text-primary'>{name}</h4>
        <div className='grid grid-cols-[auto_min-content] items-center gap-2'>
          <ProgressBar progress={progress} status={status} />
          <span className='text-nowrap text-xs font-medium text-text-secondary'>{progress}% completed</span>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-between sm:justify-end gap-5'>
        <div className=' h-9'>
          <Members members={teamMembers} size='large' />
        </div>
        <Button display='with-icon' className='text-nowrap'>
          <FaPlus />
          New Member
        </Button>
      </div>
    </div>
  );
}
const tabs = {
  overview: { class: 'left-0 w-[65px]', element: null },
  tasks: {
    class: 'left-[98px] w-[40px]',
    element: (
      <div className='flex gap-3 justify-between'>
        <Button display='with-icon' size='small' color='tertiary'>
          <RxViewVertical />
          Board
        </Button>
        <Button display='with-icon' size='small' color='tertiary'>
          <PiListBold />
          List
        </Button>
      </div>
    ),
  },
  notes: { class: 'left-[168px] w-[42px]', element: null },
};

function Tabs() {
  const params = useParams();
  const currentTab = tabs[params?.tab];

  return (
    <div className='relative mt-6 flex-col-reverse flex gap-3 mobile:flex-row mobile:items-center justify-between border-b-2 border-border py-3'>
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
      {currentTab.element}
    </div>
  );
}
