import { useQuery } from '@tanstack/react-query';
import { getAllProjects, getProject, addProject, updateProject, deleteProject } from '@/services/projectsAPI';
import { useMutate } from '@/hooks/useMutate';
import { getProgress } from '@/utils/helpers';

const getAdditionalProjectData = (project) => {
  if (!project) return null;

  const completedTasks = project.tasks.filter((task) => task?.status === 'Done');
  const progress = getProgress((completedTasks.length / project.tasks.length) * 100)
  return {
    ...project,
    tasksNumber: project.tasks.length,
    completedTasks,
    progress,
    teamCount: project.teamMembers.length,
  };
};

const filterAdditionalProjectData = (project) => {
  if (!project) return null;
  // eslint-disable-next-line no-unused-vars
  const { tasksNumber, completedTasks, progress, teamCount, ...rest } = project;
  return rest;
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
    mutationFn: (data) => addProject(filterAdditionalProjectData(data)),
    loadingMessage: 'Adding project...',
    successMessage: 'Project added successfully',
    errorMessage: 'Failed to add project',
  });
export const useUpdateProject = ({ showToast } = {}) =>
  useMutate({
    queryKey: ['projects', 'update'],
    mutationFn: ({ id, data }) => updateProject(id, filterAdditionalProjectData(data)),
    showToast,
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
