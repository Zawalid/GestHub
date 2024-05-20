import { useQuery } from '@tanstack/react-query';
import { useMutate } from '@/hooks/useMutate';
import { getAllUsers, deleteUser, deleteUsers } from '@/services/usersAPI';
import { formatUserData } from '@/hooks/useUser';

// Queries

export function useUsers() {
  const { data, error, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  return {
    users: data?.map((user) => ({ ...formatUserData(user), 
       })),
    error,
    isLoading: isPending,
  };
}

export const useDeleteUser = () =>
  useMutate({
    queryKey: ['users', 'delete'],
    mutationFn: deleteUser,
    loadingMessage: 'Deleting user...',
    successMessage: 'User deleted successfully',
    errorMessage: 'Failed to delete user',
  });

export const useDeleteUsers = () =>
  useMutate({
    queryKey: ['users', 'delete', 'multiple'],
    mutationFn: deleteUsers,
    loadingMessage: 'Deleting users...',
    successMessage: 'Users deleted successfully',
    errorMessage: 'Failed to delete users',
  });
