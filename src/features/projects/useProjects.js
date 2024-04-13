import { useQuery } from '@tanstack/react-query';
import { getAllProjects, getProject, addProject, updateProject, deleteProject } from '@/services/projectsAPI';
import { useMutate } from '@/hooks/useMutate';

const getAdditionalProjectData = (project) => {
  if (!project) return null;

  const completedTasks = project.tasks.filter((task) => task?.status === 'Completed');
  const progress = (completedTasks.length / project.tasks.length) * 100;
  return {
    ...project,
    tasksNumber: project.tasks.length,
    completedTasks,
    progress,
    teamCount: project.teamMembers.length,
  };
};

// Queries

export function useProjects() {
  const { data, error, isPending } = useQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });

  return {
    projects: data?.map((p) => getAdditionalProjectData(p)),
    error,
    isLoading: isPending,
  };
}
export const useProject = (id) => {
  const { data, error, isPending } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
  });
  return {
    project: data && getAdditionalProjectData(data),
    error,
    isLoading: isPending,
  };
};

// Mutations

export const useAddProject = () =>
  useMutate({
    queryKey: ['projects', 'add'],
    mutationFn: addProject,
    loadingMessage: 'Adding project...',
    successMessage: 'Project added successfully',
    errorMessage: 'Failed to add project',
  });
export const useUpdateProject = () =>
  useMutate({
    queryKey: ['projects', 'update'],
    mutationFn: ({ id, data }) => updateProject(id, data),
    loadingMessage: 'Updating project...',
    successMessage: 'Project updated successfully',
    errorMessage: 'Failed to update project',
  });

export const useDeleteProject = () =>
  useMutate({
    queryKey: ['projects', 'delete'],
    mutationFn: deleteProject,
    loadingMessage: 'Deleting project...',
    successMessage: 'Project deleted successfully',
    errorMessage: 'Failed to delete project',
  });
