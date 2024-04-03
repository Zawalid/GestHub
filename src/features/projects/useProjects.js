import { useQuery } from "@tanstack/react-query";
import {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
} from "@/services/projectsAPI";
import { useMutate } from "@/hooks/useMutate";

// Queries

export function useProjects() {
  const { data, error, isPending } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });
  return {
    projects: data,
    error,
    isLoading: isPending,
  };
}
export const useProject = (id) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
  });
  return {
    project: data,
    error,
    isLoading: isPending,
  };
};

// Mutations

export const useAddProject = () =>
  useMutate({
    queryKey: ["projects", "add"],
    mutationFn: addProject,
    loadingMessage: "Adding project...",
    successMessage: "Project added successfully",
    errorMessage: "Failed to add project",
  });
export const useUpdateProject = () =>
  useMutate({
    queryKey: ["projects", "update"],
    mutationFn: ({ id, data }) => updateProject(id, data),
    loadingMessage: "Updating project...",
    successMessage: "Project updated successfully",
    errorMessage: "Failed to update project",
  });

export const useDeleteProject = () =>
  useMutate({
    queryKey: ["projects", "delete"],
    mutationFn: deleteProject,
    loadingMessage: "Deleting project...",
    successMessage: "Project deleted successfully",
    errorMessage: "Failed to delete project",
  });
