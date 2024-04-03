import { useQuery } from "@tanstack/react-query";
import {
  getAllAbsences,
  getAbsence,
  addAbsence,
  updateAbsence,
  deleteAbsence,
} from "@/services/absencesAPI";
import { useMutate } from "@/hooks/useMutate";

// Queries

export function useAbsences() {
  const { data, error, isPending } = useQuery({
    queryKey: ["absences"],
    queryFn: getAllAbsences,
  });
  return {
    absences: data,
    error,
    isLoading: isPending,
  };
}
export const useAbsence = (id) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["absence", id],
    queryFn: () => getAbsence(id),
  });
  return {
    absence: data,
    error,
    isLoading: isPending,
  };
};

// Mutations

export const useAddAbsence = () =>
  useMutate({
    queryKey: ["absences", "add"],
    mutationFn: addAbsence,
    loadingMessage: "Adding absence...",
    successMessage: "Absence added successfully",
    errorMessage: "Failed to add absence",
  });
export const useUpdateAbsence = () =>
  useMutate({
    queryKey: ["absences", "update"],
    mutationFn: ({ id, data }) => updateAbsence(id, data),
    loadingMessage: "Updating absence...",
    successMessage: "Absence updated successfully",
    errorMessage: "Failed to update absence",
  });

export const useDeleteAbsence = () =>
  useMutate({
    queryKey: ["absences", "delete"],
    mutationFn: deleteAbsence,
    loadingMessage: "Deleting absence...",
    successMessage: "Absence deleted successfully",
    errorMessage: "Failed to delete absence",
  });
