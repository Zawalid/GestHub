import { useQuery } from '@tanstack/react-query';
import { getNotifications, markAsRead, markAllAsRead } from '@/services/notificationsAPI';
import { useMutate } from '@/hooks/useMutate';
import { getRelativeTime } from '@/utils/helpers';

// Queries

export function useNotifications() {
  const { data, error, isPending } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    // refetchInterval: 5000,
  });

  const notifications = data?.notifications || [];
  const unreadNotifications = notifications?.filter((n) => !n.isRead).map((n) => n.id);

  return {
    notifications,
    unreadNotifications,
    error,
    isLoading: isPending,
  };
}

// Mutations

export const useMarkNotificationAsRead = () =>
  useMutate({
    queryKey: ['notifications', 'add'],
    mutationFn: markAsRead,
  });
export const useMarkAllNotificationsAsRead = () =>
  useMutate({
    queryKey: ['notifications', 'update'],
    mutationFn: markAllAsRead,
  });

// export const useDeleteNotification = () =>
//   useMutate({
//     queryKey: ['notifications', 'delete'],
//     mutationFn: deleteNotification,
//     loadingMessage: 'Deleting notification...',
//     successMessage: 'Notification deleted successfully',
//     errorMessage: 'Failed to delete notification',
//   });
