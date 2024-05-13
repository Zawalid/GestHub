import { useQuery } from '@tanstack/react-query';
import { useMutate } from '@/hooks/useMutate';
import {
  getAllSupervisors,
  getSupervisor,
  addSupervisor,
  updateSupervisor,
  deleteSupervisor,
  deleteSupervisors,
} from '@/services/supervisorsAPI';
import { formatUserData } from '@/hooks/useUser';

// Queries

export function useSupervisors() {
  const { data, error, isPending } = useQuery({
    queryKey: ['supervisors'],
    queryFn: getAllSupervisors,
  });

  return { supervisors: data?.map(formatUserData), error, isLoading: isPending };
}

export function useSupervisor(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ['supervisor', id],
    queryFn: () => getSupervisor(id),
  });

  return { supervisor: formatUserData(data), error, isLoading: isPending };
}

// Mutations
export const useAddSupervisor = () =>
  useMutate({
    queryKey: ['supervisors', 'add'],
    mutationFn: addSupervisor,
    loadingMessage: 'Adding supervisor...',
    successMessage: 'Supervisor added successfully',
  });

export const useUpdateSupervisor = () =>
  useMutate({
    queryKey: ['supervisors', 'update'],
    mutationFn: ({ id, data }) => updateSupervisor(id, data),
    loadingMessage: 'Updating supervisor...',
    successMessage: 'Supervisor updated successfully',
  });

export const useDeleteSupervisor = () =>
  useMutate({
    queryKey: ['supervisors', 'delete'],
    mutationFn: deleteSupervisor,
    loadingMessage: 'Deleting supervisor...',
    successMessage: 'Supervisor deleted successfully',
    errorMessage: 'Failed to delete supervisor',
  });

export const useDeleteSupervisors = () =>
  useMutate({
    queryKey: ['supervisors', 'delete', 'multiple'],
    mutationFn: deleteSupervisors,
    loadingMessage: 'Deleting supervisors...',
    successMessage: 'Supervisors deleted successfully',
    errorMessage: 'Failed to delete supervisors',
  });
