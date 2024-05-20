import { useQuery } from '@tanstack/react-query';
import { useMutate } from '@/hooks/useMutate';
import { getAllSessions, deleteSession, getSession, deleteSessions } from '@/services/sessionsAPI';

// Queries

export function useSessions() {
  const { data, error, isPending } = useQuery({
    queryKey: ['sessions'],
    queryFn: getAllSessions,
  });

  return {
    sessions: data,
    error,
    isLoading: isPending,
  };
}
export function useSession(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ['sessions', id],
    queryFn: () => getSession(id),
  });

  return {
    session: data,
    error,
    isLoading: isPending,
  };
}

export const useDeleteSession = () =>
  useMutate({
    queryKey: ['sessions', 'delete'],
    mutationFn: deleteSession,
    loadingMessage: 'Deleting session...',
    successMessage: 'Session deleted successfully',
    errorMessage: 'Failed to delete session',
  });

export const useDeleteSessions = () =>
  useMutate({
    queryKey: ['sessions', 'delete', 'multiple'],
    mutationFn: deleteSessions,
    loadingMessage: 'Deleting sessions...',
    successMessage: 'Sessions deleted successfully',
    errorMessage: 'Failed to delete sessions',
  });
