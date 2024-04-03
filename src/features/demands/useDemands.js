import { useQuery } from "@tanstack/react-query";
import {
  getAllDemands,
  getDemand,
  addDemand,
  updateDemand,
  deleteDemand,
} from "@/services/demandsAPI";
import { useMutate } from "@/hooks/useMutate";

// Queries

export function useDemands() {
  const { data, error, isPending } = useQuery({
    queryKey: ["demands"],
    queryFn: getAllDemands,
  });
  return {
    demands: data,
    error,
    isLoading: isPending,
  };
}
export const useDemand = (id) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["demand", id],
    queryFn: () => getDemand(id),
  });
  return {
    demand: data,
    error,
    isLoading: isPending,
  };
};

// Mutations

export const useAddDemand = () =>
  useMutate({
    queryKey: ["demands", "add"],
    mutationFn: addDemand,
    loadingMessage: "Adding demand...",
    successMessage: "Demand added successfully",
    errorMessage: "Failed to add demand",
  });
export const useUpdateDemand = () =>
  useMutate({
    queryKey: ["demands", "update"],
    mutationFn: ({ id, data }) => updateDemand(id, data),
    loadingMessage: "Updating demand...",
    successMessage: "Demand updated successfully",
    errorMessage: "Failed to update demand",
  });

export const useDeleteDemand = () =>
  useMutate({
    queryKey: ["demands", "delete"],
    mutationFn: deleteDemand,
    loadingMessage: "Deleting demand...",
    successMessage: "Demand deleted successfully",
    errorMessage: "Failed to delete demand",
  });
