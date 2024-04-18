import { Heading } from '@/components/Heading';
import { useNavigate, useParams } from 'react-router-dom';
import { useProject } from '../../features/projects/useProjects';
import ProjectOverview from '@/features/projects/ProjectOverview/ProjectOverview';
import { useEffect } from 'react';

export function ProjectDetails() {
  const { id, tab } = useParams();
  const navigate = useNavigate();
  const { project, isLoading, error } = useProject(id);

  useEffect(() => {
    if (!['overview', 'tasks', 'notes'].includes(tab)) navigate(`/app/projects/${id}/overview`);
  }, [id, tab, navigate]);

  useEffect(() => {
    document.title = `${project?.name}`;
  }, [project?.name]);

  if (isLoading) return <Heading>Loading...</Heading>;
  if (error) return <Heading>{error.message}</Heading>;
  if (!project) return <Heading>Project not found</Heading>;

  return <ProjectOverview />;
}
