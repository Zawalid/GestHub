import { useQuery } from '@tanstack/react-query';
import { useMutate } from '@/hooks/useMutate';
import { getAllAdmins, getAdmin, addAdmin, updateAdmin, deleteAdmin, deleteAdmins } from '@/services/adminsAPI';
import { formatUserData } from '@/hooks/useUser';

// Queries

export function useAdmins() {
  const { data, error, isPending } = useQuery({
    queryKey: ['admins'],
    queryFn: getAllAdmins,
  });

  return { admins: data?.map(formatUserData), error, isLoading: isPending };
}

export function useAdmin(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ['admins', id],
    queryFn: () => getAdmin(id),
    enabled : !!id,

  });

  return { admin: formatUserData(data), error, isLoading: isPending };
}

// Mutations
export const useAddAdmin = () =>
  useMutate({
    queryKey: ['admins', 'add'],
    mutationFn: addAdmin,
    loadingMessage: 'Adding admin...',
    successMessage: 'Admin added successfully',
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

export const useDeleteAdmins = () =>
  useMutate({
    queryKey: ['admins', 'delete', 'multiple'],
    mutationFn: deleteAdmins,
    loadingMessage: 'Deleting admins...',
    successMessage: 'Admins deleted successfully',
    errorMessage: 'Failed to delete admins',
  });
