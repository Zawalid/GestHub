import { useMutate } from '@/hooks/useMutate';
import { addIntern, deleteIntern, getAllInterns, getIntern, updateIntern } from '@/services/internsAPI';
import { getAvatar } from '@/utils/helpers';
import { useQuery } from '@tanstack/react-query';

// Queries

export const getAdditionalData = (data) => {
  return {
    fullName: `${data?.firstName} ${data?.lastName}`,
    avatar: getAvatar(data),
  };
};

export function useInterns() {
  const { data, error, isPending } = useQuery({
    queryKey: ['interns'],
    queryFn: getAllInterns,
  });

  const interns = data?.map((intern) => ({ ...intern, ...getAdditionalData(intern) }));

  return { interns, error, isLoading: isPending };
}

export function useInternsByIds(ids) {
  const { data, error, isPending } = useQuery({
    queryKey: ['interns', ...ids],
    queryFn: () => Promise.all(ids.map((id) => getIntern(id))),
  });

  const interns = data?.map((intern) => ({ ...intern, ...getAdditionalData(intern) }));

  return { interns, error, isLoading: isPending };
}

export function useIntern(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ['intern', id],
    queryFn: () => getIntern(id),
  });

  const intern = { ...data, ...getAdditionalData(data) };

  return { intern, error, isLoading: isPending };
}

// Mutations

export const useAddIntern = () =>
  useMutate({
    queryKey: ['interns', 'add'],
    mutationFn: addIntern,
    loadingMessage: 'Adding intern...',
    successMessage: 'Intern added successfully',
    errorMessage: 'Failed to add intern',
  });

export const useUpdateIntern = () =>
  useMutate({
    queryKey: ['interns', 'update'],
    mutationFn: ({ id, data }) => updateIntern(id, data),
    loadingMessage: 'Updating intern...',
    successMessage: 'Intern updated successfully',
    errorMessage: 'Failed to update intern',
  });

export const useDeleteIntern = () =>
  useMutate({
    queryKey: ['interns', 'delete'],
    mutationFn: deleteIntern,
    loadingMessage: 'Deleting intern...',
    successMessage: 'Intern deleted successfully',
    errorMessage: 'Failed to delete intern',
  });
