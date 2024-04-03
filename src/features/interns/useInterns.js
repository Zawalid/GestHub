import { useMutate } from "@/hooks/useMutate";
import {
  addIntern,
  deleteIntern,
  getAllInterns,
  getIntern,
  updateIntern,
} from "@/services/internsAPI";
import { useQuery } from "@tanstack/react-query";

// Queries
export function useInterns() {
  const { data, error, isPending } = useQuery({
    queryKey: ["interns"],
    queryFn: getAllInterns,
  });

  return { interns: data, error, isLoading: isPending };
}

export function useIntern(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["intern", id],
    queryFn: () => getIntern(id),
  });

  return { intern: data, error, isLoading: isPending };
}

// Mutations

export const useAddIntern = () =>
  useMutate({
    queryKey: ["interns", "add"],
    mutationFn: addIntern,
    loadingMessage: "Adding intern...",
    successMessage: "Intern added successfully",
    errorMessage: "Failed to add intern",
  });

export const useUpdateIntern = () =>
  useMutate({
    queryKey: ["interns", "update"],
    mutationFn: ({ id, data }) => updateIntern(id, data),
    loadingMessage: "Updating intern...",
    successMessage: "Intern updated successfully",
    errorMessage: "Failed to update intern",
  });

export const useDeleteIntern = () =>
  useMutate({
    queryKey: ["interns", "delete"],
    mutationFn: deleteIntern,
    loadingMessage: "Deleting intern...",
    successMessage: "Intern deleted successfully",
    errorMessage: "Failed to delete intern",
  });
