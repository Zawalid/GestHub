import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addIntern, deleteIntern, updateIntern } from "./api/internsAPI";
import { toast } from "sonner";
import { useRef } from "react";
import {
  addSupervisor,
  deleteSupervisor,
  updateSupervisor,
} from "./api/supervisorsAPI";

const useMutate = ({
  queryKey,
  mutationFn,
  loadingMessage,
  successMessage,
  errorMessage,
}) => {
  const queryClient = useQueryClient();
  const toastId = useRef(null);

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: queryKey,
    mutationFn,
    onMutate: () => {
      if (loadingMessage)
        toastId.current = toast.loading(loadingMessage, {
          id: toastId.current,
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      successMessage && toast.success(successMessage, { id: toastId.current });
    },
    onError: (error) => {
      console.log(error);
      errorMessage && toast.error(errorMessage, { id: toastId.current });
    },
  });

  return { mutate, isPending, error, isSuccess };
};

// Interns
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

// Supervisors
export const useAddSupervisor = () =>
  useMutate({
    queryKey: ["supervisors", "add"],
    mutationFn: addSupervisor,
    loadingMessage: "Adding supervisor...",
    successMessage: "Supervisor added successfully",
    errorMessage: "Failed to add supervisor",
  });

export const useUpdateSupervisor = () =>
  useMutate({
    queryKey: ["supervisors", "update"],
    mutationFn: ({ id, data }) => updateSupervisor(id, data),
    loadingMessage: "Updating supervisor...",
    successMessage: "Supervisor updated successfully",
    errorMessage: "Failed to update supervisor",
  });

export const useDeleteSupervisor = () =>
  useMutate({
    queryKey: ["supervisors", "delete"],
    mutationFn: deleteSupervisor,
    loadingMessage: "Deleting supervisor...",
    successMessage: "Supervisor deleted successfully",
    errorMessage: "Failed to delete supervisor",
  });
