import { useQuery } from '@tanstack/react-query';
import { useMutate } from '@/hooks/useMutate';
import {
  getAllSessions,
  deleteSession,
  getSession,
  deleteSessions,
  abortSession,
  abortSessions,
} from '@/services/sessionsAPI';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';

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

const getAbortionOptions = (isMultiple, number) => {
  const mutation = {
    queryKey: ['session', 'abort', isMultiple ? 'multiple' : ''],
    mutationFn: isMultiple ? abortSessions : abortSession,
    loadingMessage: `Approving session${isMultiple ? 's' : ''}...`,
    successMessage: `Session${isMultiple ? 's' : ''} aborted successfully`,
    errorMessage: `Failed to abort session${isMultiple ? 's' : ''}`,
  };

  const abort = {
    message: `Are you sure you want to abort ${isMultiple ? number : 'this'} session${isMultiple ? 's' : ''}?`,
    title: `Abort Session${isMultiple ? 's' : ''}`,
    confirmText: 'Abort',
buttonClassName: 'bg-orange-700 hover:bg-orange-800',  };
  return { mutation, abort };
};

export const useAbortSession = () => {
  const { openModal } = useConfirmationModal();
  const abortion = useMutate(getAbortionOptions().mutation);

  const abort = (id, options) =>
    openModal({ ...getAbortionOptions().abort, onConfirm: () => abortion.mutate(id, options) });

  return { ...abortion, abort };
};

export const useAbortSessions = () => {
  const { openModal } = useConfirmationModal();
  const abortion = useMutate(getAbortionOptions(true).mutation);

  const abort = (ids, options) =>
    openModal({
      ...getAbortionOptions(true, ids.length).abort,
      onConfirm: () => {
        options.onConfirm?.();
        abortion.mutate(ids, options);
      },
    });

  return { ...abortion, abort };
};
