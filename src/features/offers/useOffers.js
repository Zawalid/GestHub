import { useQuery } from "@tanstack/react-query";
import {
  getAllOffers,
  getOffer,
  addOffer,
  updateOffer,
  deleteOffer,
} from "@/services/offersAPI";
import { useMutate } from "@/hooks/useMutate";

// Queries

export function useOffers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["offers"],
    queryFn: getAllOffers,
  });
  return {
    offers: data,
    error,
    isLoading: isPending,
  };
}
export const useOffer = (id) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["offer", id],
    queryFn: () => getOffer(id),
  });
  return {
    offer: data,
    error,
    isLoading: isPending,
  };
};

// Mutations

export const useAddOffer = () =>
  useMutate({
    queryKey: ["offers", "add"],
    mutationFn: addOffer,
    loadingMessage: "Adding offer...",
    successMessage: "Offer added successfully",
    errorMessage: "Failed to add offer",
  });
export const useUpdateOffer = () =>
  useMutate({
    queryKey: ["offers", "update"],
    mutationFn: ({ id, data }) => updateOffer(id, data),
    loadingMessage: "Updating offer...",
    successMessage: "Offer updated successfully",
    errorMessage: "Failed to update offer",
  });

export const useDeleteOffer = () =>
  useMutate({
    queryKey: ["offers", "delete"],
    mutationFn: deleteOffer,
    loadingMessage: "Deleting offer...",
    successMessage: "Offer deleted successfully",
    errorMessage: "Failed to delete offer",
  });
