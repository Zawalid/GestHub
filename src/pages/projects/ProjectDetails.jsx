import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProject } from '../../features/projects/useProjects';
import ProjectOverview from '@/features/projects/ProjectOverview/ProjectOverview';
import { capitalize, changeTitle } from '@/utils/helpers';
import { Status } from '@/components/ui';
import { useUser } from '@/hooks/useUser';

export function ProjectDetails() {
  const { id, tab } = useParams();
  const { project, isLoading, error } = useProject(id);
  const { user } = useUser();
  const navigate = useNavigate();

  const canAccess = ['admin', 'super-admin'].includes(user?.role) || user?.projects?.map(p => p.id).includes(+id);

  useEffect(() => {
    if (!['overview', 'tasks', 'notes'].includes(tab)) navigate(`/app/projects/${id}/overview`, { replace: true });
  }, [id, tab, navigate]);

  useEffect(() => {
    const title =
      project && !canAccess
        ? 'Access Denied'
        : project
          ? `${project?.subject} | ${capitalize(tab)}`
          : isLoading
            ? 'Loading...'
            : 'Project Not Found';
    changeTitle(title);
  }, [project, tab, user, canAccess, isLoading]);

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
  if (project && !canAccess)
    return (
      <Status
        status='locked'
        message='You do not have the necessary permissions to view this project. Please verify the project ID .'
      />
    );

  return <ProjectOverview tasksCount={project?.tasks?.length} />;
}
