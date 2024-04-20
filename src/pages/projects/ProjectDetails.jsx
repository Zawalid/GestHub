import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProject } from '../../features/projects/useProjects';
import ProjectOverview from '@/features/projects/ProjectOverview/ProjectOverview';
import { capitalize, changeTitle } from '@/utils/helpers';
import { Status } from '@/components/ui';

export function ProjectDetails() {
  const { id, tab } = useParams();
  const navigate = useNavigate();
  const { project, isLoading, error } = useProject(+id);

  useEffect(() => {
    if (!['overview', 'tasks', 'notes'].includes(tab)) navigate(`/app/projects/${id}/overview`,{replace : true});
  }, [id, tab, navigate]);

  useEffect(() => {
    changeTitle(project ? `${project?.subject} | ${capitalize(tab)}` : 'Project Not Found');
  }, [project, tab]);

  if (isLoading) return <Status status='loading' />;
  if (error)
    return (
      <Status
        status='error'
        heading={error.message === 'Not found' && "Sorry, we couldn't find the project you're looking for."}
        message={
          error.message === 'Not found'
            ? 'Please check the project ID or contact your administrator if you believe this is an error.'
            : error.message
        }
      />
    );

  return <ProjectOverview />;
}
