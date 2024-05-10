import { useQuery } from '@tanstack/react-query';
import { useMutate } from '@/hooks/useMutate';
import {
  getAllAdmins,
  getAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} from '@/services/adminsAPI';
import { getAdditionalData } from '../interns/useInterns';

// Queries

export function useAdmins() {
  const { data, error, isPending } = useQuery({
    queryKey: ['admins'],
    queryFn: getAllAdmins,
  });

  const admins = data?.map((admin) => ({ ...admin, ...getAdditionalData(admin) }));

  return { admins, error, isLoading: isPending };
}

export function useAdmin(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ['admin', id],
    queryFn: () => getAdmin(id),
  });

  const admin = { ...data, ...getAdditionalData(data) };

  return { admin, error, isLoading: isPending };
}

// Mutations
export const useAddAdmin = () =>
  useMutate({
    queryKey: ['admins', 'add'],
    mutationFn: addAdmin,
    loadingMessage: 'Adding admin...',
    successMessage: 'Admin added successfully',
    errorMessage: 'Failed to add admin',
  });

export const useUpdateAdmin = () =>
  useMutate({
    queryKey: ['admins', 'update'],
    mutationFn: ({ id, data }) => updateAdmin(id, data),
    loadingMessage: 'Updating admin...',
    successMessage: 'Admin updated successfully',
  });

export const useDeleteAdmin = () =>
  useMutate({
    queryKey: ['admins', 'delete'],
    mutationFn: deleteAdmin,
    loadingMessage: 'Deleting admin...',
    successMessage: 'Admin deleted successfully',
    errorMessage: 'Failed to delete admin',
  });
