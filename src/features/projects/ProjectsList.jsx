import { Operations } from '@/components/shared/operations/Operations';
import Project from './Project';
import { Button } from '@/components/ui';
import { FaPlus } from 'react-icons/fa6';
import { useOperations } from '@/components/shared/operations/useOperations';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Status } from '@/components/ui/Status';
import ProjectsSkeleton from './ProjectsSkeleton';
import { useNavigate } from 'react-router-dom';

export default function ProjectsList() {
  const { data: projects, isLoading, error, layout, appliedFiltersNumber, query } = useOperations();
  const [parent] = useAutoAnimate({ duration: 500 });

  const render = () => {
    if (isLoading) return <ProjectsSkeleton layout={layout} />;
    if (error) return <Status status='error' heading={error.message} message='Try again later' />;
    if (projects.length === 0)
      return (
        <Status status='noResults' heading='No projects found' message='Try changing your search query or filters' />
      );
    return (
      <>
        {!appliedFiltersNumber && !query && <NewProject layout={layout} />}
        {projects?.map((project) => (
          <Project key={project.id} project={project} layout={layout} />
        ))}
      </>
    );
  };

  return (
    <div className='flex flex-col gap-5'>
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
        className={`h-full gap-5 ${
          layout === 'grid'
            ? 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]'
            : 'flex flex-col'
        }`}
        ref={parent}
      >
        {render()}
      </div>
    </div>
  );
}

function NewProject({ layout }) {
  const navigate = useNavigate();

  return (
    <Button
      color='tertiary'
      className={`group flex items-center justify-center rounded-lg   border  border-border bg-background-disabled p-3 shadow-md ${
        layout === 'grid' ? 'h-[240px] flex-col gap-2' : 'w- h-20 gap-4'
      }`}
      onClick={() => navigate('/app/projects/new')}
    >
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary p-1 text-text-tertiary hover:bg-background-tertiary group-hover:bg-background-tertiary'>
        <FaPlus />
      </div>
      <h3 className='font-semibold text-text-primary'>Add New Project</h3>
    </Button>
  );
}
