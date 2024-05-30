import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FaPlus } from 'react-icons/fa6';
import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { Button } from '@/components/ui';
import { Status } from '@/components/ui/Status';
import ProjectsSkeleton from './ProjectsSkeleton';
import Project from './Project';
import { useUser } from '@/hooks/useUser';

export default function ProjectsList() {
  const { data: projects, isLoading, error, layout, appliedFiltersNumber, query } = useOperations();
  const { user } = useUser();
  const [parent] = useAutoAnimate({ duration: 500 });
  const navigate = useNavigate();

  const isAdmin = ['admin', 'super-admin'].includes(user?.role);

  const onAdd = () => navigate('/app/projects/new');

  const render = () => {
    if (isLoading) return <ProjectsSkeleton layout={layout} />;
    if (error) return <Status status='error' heading={error.message} message='Please try again later' />;
    if (projects.length === 0 && !query && !appliedFiltersNumber) {
      const heading = isAdmin
        ? 'It appears there are currently no projects available'
        : 'It appears you are not currently included in any projects';

      const message = isAdmin
        ? 'Start by creating a new one.'
        : `Please wait for a project assignment or contact your ${user?.role === 'supervisor' ? 'administrator' : 'supervisor'}.`;

      return (
        <div className='absolute grid h-full w-full place-content-center place-items-center gap-5'>
          <img src='/SVG/projects.svg' alt='' className='w-[200px]' />
          <div className='space-y-2 text-center'>
            <h2 className='font-medium text-text-primary'>{heading} </h2>
            <p className='text-sm text-text-secondary'>{message}</p>{' '}
          </div>
          {isAdmin && <Button onClick={onAdd}>New Project</Button>}
        </div>
      );
    }
    if (projects.length === 0 && (query || appliedFiltersNumber))
      return (
        <Status status='noResults' heading='No projects found' message='Try changing your search query or filters' />
      );
    return (
      <>
        {!appliedFiltersNumber && !query && isAdmin && <New type='Project' layout={layout} onAdd={onAdd} />}
        {projects?.map((project) => (
          <Project key={project.id} project={project} layout={layout} />
        ))}
        <div className='col-span-full'>
          <Operations.ViewMore color='tertiary' />
        </div>
      </>
    );
  };

  return (
    <div className='flex flex-1 flex-col overflow-hidden gap-5'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <Operations.DropDown>
            <Operations.SortBy />
            <Operations.OrderBy />
          </Operations.DropDown>
          <Operations.Filter />
        </div>
        <Operations.Layout />
      </div>

      <div
        className={`scroll flex-1 gap-4 overflow-auto p-1 pr-2 ${
          layout === 'grid' && !isLoading
            ? 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] place-content-start sm:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]'
            : 'flex flex-col'
        }`}
        ref={parent}
      >
        {render()}
      </div>
    </div>
  );
}

export function New({ type, layout, onAdd }) {
  return (
    <Button
      color='tertiary'
      className={`group flex items-center justify-center rounded-lg   border  border-border bg-background-disabled p-3 shadow-md ${
        layout === 'grid' ? 'h-[240px] flex-col gap-2' : 'h-20 gap-4'
      }`}
      onClick={onAdd}
    >
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary p-1 text-text-tertiary hover:bg-background-tertiary group-hover:bg-background-tertiary'>
        <FaPlus />
      </div>
      <h3 className='font-semibold text-text-primary'>Add New {type}</h3>
    </Button>
  );
}
