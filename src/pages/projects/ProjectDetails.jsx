import { Heading } from '@/components/Heading';
import { Link, useParams } from 'react-router-dom';
import { useProject } from '../../features/projects/useProjects';
import { Button } from '@/components/ui';
import { IoChevronBack } from 'react-icons/io5';

export function ProjectDetails() {
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);

  const { title, description, priority, status, startDate, endDate, tasks, teamMembers } = project || {};

  const render = () => {
    if (isLoading) return <Heading>Loading...</Heading>;
    if (error) return <Heading>{error.message}</Heading>;
    if (!project) return <Heading>Project not found</Heading>;

    return (
      <div className=''>
        <p>{title}</p>
        <p>{description}</p>
        <p>{priority}</p>
        <p>{status}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p>Tasks :{tasks.length}</p>
        <p>Team : {teamMembers.length}</p>
      </div>
    );
  };

  return (
    <>
      <Link to='/app/projects' replace={true}>
        <Button color='tertiary' display='with-icon' size='small'>
          <IoChevronBack />
          Back
        </Button>
      </Link>
      <Heading>Project</Heading>
      {render()}
    </>
  );
}
