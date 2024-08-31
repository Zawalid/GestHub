import { useQuery } from '@tanstack/react-query';
import { useMutate } from '@/hooks/useMutate';
import { getAllEmails, deleteEmail, deleteEmails, replyToEmail } from '@/services/emailsAPI';
import { contact } from '@/services/emailsAPI';
import { getEmail } from '@/services/emailsAPI';

// Queries

export function useEmails() {
  const { data, error, isPending } = useQuery({
    queryKey: ['emails'],
    queryFn: getAllEmails,
  });

  return { emails: data, error, isLoading: isPending };
}

export function useEmail(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ['admins', id],
    queryFn: () => getEmail(id),
    enabled: !!id,
  });

  return { email: data, error, isLoading: isPending };
}

export const useDeleteEmail = () =>
  useMutate({
    queryKey: ['emails', 'delete'],
    mutationFn: deleteEmail,
    loadingMessage: 'Deleting email...',
    successMessage: 'Email deleted successfully',
    errorMessage: 'Failed to delete email',
  });

export const useDeleteEmails = () =>
  useMutate({
    queryKey: ['emails', 'delete', 'multiple'],
    mutationFn: deleteEmails,
    loadingMessage: 'Deleting emails...',
    successMessage: 'Emails deleted successfully',
    errorMessage: 'Failed to delete emails',
  });

export function useContactUs() {
  return useMutate({
    queryKey: ['contact'],
    mutationFn: contact,
  });
}

export function useReplyToEmail() {
  return useMutate({
    queryKey: ['emails', 'reply'],
    mutationFn: replyToEmail,
  });
}
