import { useQuery } from '@tanstack/react-query';
import { useMutate } from '@/hooks/useMutate';
import {
  getAllSupervisors,
  getSupervisor,
  addSupervisor,
  updateSupervisor,
  deleteSupervisor,
} from '@/services/supervisorsAPI';
import { getAdditionalData } from '../interns/useInterns';

// Queries

export function useSupervisors() {
  const { data, error, isPending } = useQuery({
    queryKey: ['supervisors'],
    queryFn: getAllSupervisors,
  });

  const supervisors = data?.map((supervisor) => ({ ...supervisor, ...getAdditionalData(supervisor) }));

  return { supervisors, error, isLoading: isPending };
}

export function useSupervisor(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ['supervisor', id],
    queryFn: () => getSupervisor(id),
  });

  const supervisor = { ...data, ...getAdditionalData(data) };

  return { supervisor, error, isLoading: isPending };
}

// Mutations
export const useAddSupervisor = () =>
  useMutate({
    queryKey: ['supervisors', 'add'],
    mutationFn: addSupervisor,
    loadingMessage: 'Adding supervisor...',
    successMessage: 'Supervisor added successfully',
    errorMessage: 'Failed to add supervisor',
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
