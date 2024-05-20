import { NavLink, useParams } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Tasks from './Tasks';
import Overview from './Overview';

const tabs = {
  overview: { class: 'left-0 w-[65px]', element: <Overview /> },
  tasks: {
    class: 'left-[98px] w-[40px]',
    element: <Tasks />,
    count: (count) => (
      <span className='rounded-lg border border-border bg-background-tertiary px-2 py-0.5 text-sm text-text-primary'>
        {count}
      </span>
    ),
  },
};

export default function ProjectOverview({ tasksCount }) {
  const [parent] = useAutoAnimate({ duration: 400 });
  const params = useParams();
  const currentTab = tabs[params?.tab];

  return (
    <div className='flex flex-1 flex-col gap-4 overflow-auto' ref={parent}>
      <div
        className='relative flex flex-col-reverse justify-between gap-3 border-b-2 border-border pb-3 mobile:flex-row mobile:items-center'
        id='tabs'
      >
        <div className=' flex items-center gap-8'>
          <div
            className={`absolute -bottom-0.5 h-0.5 rounded-lg bg-primary transition-all duration-300 ${currentTab?.class}`}
          ></div>
          {Object.keys(tabs).map((tab) => (
            <NavLink
              key={tab}
              to={`/app/projects/${params?.id}/${tab}`}
              className='group flex items-center gap-2 py-1.5 text-sm font-medium capitalize  text-text-secondary transition-colors duration-300 hover:text-text-primary'
            >
              <span className='group-[.active]:text-text-primary'>{tab}</span>
              {tabs[tab].count?.(tasksCount)}
            </NavLink>
          ))}
        </div>
      </div>

      {currentTab?.element}
    </div>
  );
}
