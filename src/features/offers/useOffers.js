import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllOffers, getOffer, addOffer, updateOffer, deleteOffer, getAllVisibleOffers } from '@/services/offersAPI';
import { useMutate } from '@/hooks/useMutate';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

// Queries

const getSkills = (offer) => (offer?.skills ? offer?.skills.split(',') : []);

export function useOffers() {
  const { data, error, isPending } = useQuery({ queryKey: ['offers'], queryFn: getAllOffers });

  const offers = data?.map((offer) => ({ ...offer, skills: getSkills(offer) }));

return {
    offers,
    error,
    isLoading: isPending,
  };
}

export function useVisibleOffers(latest) {
  const { data, error, isPending } = useQuery({ queryKey: ['offers/visible'], queryFn: getAllVisibleOffers });
  const [favorites, setFavorites] = useLocalStorageState('favorites', []);
  const queryClient = useQueryClient();

  const getOffers = () => {
   const offers = Array.isArray(data) ? data.map((offer) =>
  favorites.includes(String(offer.id)) ? { ...offer, isFavorite: true } : offer
) : [];

    return latest
      ? offers?.sort((a, b) => (a.status === b.status ? 0 : a.status === 'Urgent' ? -1 : 1)).slice(0, 5)
      : offers;
  };

  const onToggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]));
    queryClient.invalidateQueries({
      queryKey: ['offers'],
    });
  };

  const offers = getOffers()?.map((offer) => ({ ...offer, skills: getSkills(offer) }));

  return {
    offers,
    favorites,
    onToggleFavorite,
    error,
    isLoading: isPending,
  };
}

export const useOffer = (id) => {
  const { data, error, isPending } = useQuery({
    queryKey: ['offers', id],
    queryFn: () => getOffer(id),
  });

  return {
    offer: { ...data, skills: getSkills(data) },
    error,
    isLoading: isPending,
  };
};

// Mutations

export const useAddOffer = () =>
  useMutate({
    queryKey: ['offers', 'add'],
    mutationFn: addOffer,
    loadingMessage: 'Adding offer...',
    successMessage: 'Offer added successfully',
    errorMessage: 'Failed to add offer',
  });
export const useUpdateOffer = () =>
  useMutate({
    queryKey: ['offers', 'update'],
    mutationFn: ({ id, data }) => updateOffer(id, data),
    loadingMessage: 'Updating offer...',
    successMessage: 'Offer updated successfully',
    errorMessage: 'Failed to update offer',
  });
export const useDeleteOffer = () =>
  useMutate({
    queryKey: ['offers', 'delete'],
    mutationFn: deleteOffer,
    loadingMessage: 'Deleting offer...',
    successMessage: 'Offer deleted successfully',
    errorMessage: 'Failed to delete offer',
  });
