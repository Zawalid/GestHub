import { useQuery } from '@tanstack/react-query';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '@/services/notificationsAPI';
import { useMutate } from '@/hooks/useMutate';
import { getRelativeTime } from '@/utils/helpers';

const dummy = [
  {
    id: 1,
    icon: 'newProject',
    title: 'A new project has been assigned to you',
    subtitle: 'Project Alpha',
    created_at: '2024-05-30 19:19:02',
    isRead: false,
  },
  {
    id: 2,
    icon: 'overdueProject',
    title: 'One of your projects is overdue',
    subtitle: 'Project Beta',
    created_at: '2024-05-25 12:15:30',
    isRead: true,
  },
  {
    id: 3,
    icon: 'completedProject',
    title: 'One of your projects has been completed',
    subtitle: 'Project Gamma',
    created_at: '2024-05-24 11:14:29',
    isRead: false,
  },
  {
    id: 4,
    icon: 'newTask',
    title: 'A new task has been assigned to you',
    subtitle: 'Task 1',
    created_at: '2024-05-23 10:13:28',
    isRead: true,
  },
  {
    id: 5,
    icon: 'overdueTask',
    title: 'One of your tasks is overdue',
    subtitle: 'Task 2',
    created_at: '2024-05-22 09:12:27',
    isRead: false,
  },
  {
    id: 6,
    icon: 'acceptedApplication',
    title: 'Your application has been accepted',
    subtitle: 'Application 1',
    created_at: '2024-05-21 08:11:26',
    isRead: true,
  },
  {
    id: 7,
    icon: 'endingInternship',
    title: 'Your internship ends in 3 days',
    subtitle: 'Internship 1',
    created_at: '2024-05-20 07:10:25',
    isRead: false,
  },
  {
    id: 10,
    icon: 'completedInternship',
    title: 'An intern has completed their internship',
    subtitle: 'Intern B',
    created_at: '2024-05-17 04:07:22',
    isRead: true,
  },
  {
    id: 12,
    icon: 'newTask',
    title: 'A new task has been assigned to you',
    subtitle: 'Task 3',
    created_at: '2024-05-15 02:05:20',
    isRead: true,
  },
];

// Queries
export function useNotifications() {
  const { data, error, isPending } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    // refetchInterval: 5000,
  });

  // data?.notifications || [];
  const notifications = dummy
    .map((n) => ({ ...n, time: getRelativeTime(n.created_at) }))
    .toSorted((a, b) => new Date(b?.created_at) - new Date(a?.created_at));

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
export const useDeleteNotification = () =>
  useMutate({
    queryKey: ['notifications', 'delete'],
    mutationFn: deleteNotification,
  });
