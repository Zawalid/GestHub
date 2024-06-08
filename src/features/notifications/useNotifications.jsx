import { useQuery } from '@tanstack/react-query';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '@/services/notificationsAPI';
import { useMutate } from '@/hooks/useMutate';
import { getRelativeTime } from '@/utils/helpers';
import { useEffect } from 'react';
import { useSendNotification } from '@/hooks/useSendNotification';
import {
  FaDiagramProject,
  FaCalendarXmark,
  FaRegCircleCheck,
  LuListTodo,
  FaRegCalendarCheck,
  LuTimerReset,
  LiaUserPlusSolid,
  LuUpload,
  FaFileContract,
  FaBell,
} from '@/components/ui/Icons';

export const getIcons = (n) => {
  const icons = {
    newProject: { icon: <FaDiagramProject />, color: 'bg-orange-500' },
    overdueProject: { icon: <FaCalendarXmark />, color: 'bg-red-500' },
    completedProject: { icon: <FaRegCircleCheck />, color: 'bg-green-500' },
    newTask: { icon: <LuListTodo />, color: 'bg-yellow-600' },
    overdueTask: { icon: <FaCalendarXmark />, color: 'bg-red-500' },
    acceptedApplication: { icon: <FaRegCircleCheck />, color: 'bg-green-600' },
    endingInternship: { icon: <LuTimerReset />, color: 'bg-teal-500' },
    completedInternship: { icon: <FaRegCalendarCheck />, color: 'bg-purple-500' },
    newIntern: { icon: <LiaUserPlusSolid />, color: 'bg-indigo-500' },
    newFile: { icon: <LuUpload />, color: 'bg-blue-500' },
  };

  let icon = icons[n.action];

  if (n.action === 'newFile' && n.object === 'Internship attestation') {
    icon = { icon: <FaFileContract />, color: 'bg-orange-500' };
  }

  return icon || { icon: <FaBell />, color: 'bg-background-secondary' };
};

const sound = new Audio('/notification.mp3');

// Queries
export function useNotifications() {
  const { data, error, isPending } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
  });

  const notify = useSendNotification();

  const notifications = data
    ?.map((n) => ({ ...n, time: getRelativeTime(n.created_at) }))
    .toSorted((a, b) => new Date(b?.created_at) - new Date(a?.created_at));

  const unreadNotifications = notifications?.filter((n) => n.isRead === 'false');

  useEffect(() => {
    if (!unreadNotifications?.length) return;

    const playSound = () => {
      try {
        sound.play();
      } catch (error) {
        console.error('Failed to play notification sound:', error);
      }
    };

    const notifyLocally = (n) => {
      const iconData = getIcons(n) || {};
      notify(
        n.activity,
        {
          description: n.object,
          icon: {
            icon: iconData.icon || <FaBell />,
            className: iconData.color || 'bg-background-secondary',
          },
        },
        'local'
      );
    };

    unreadNotifications.forEach((n) => {
      const twentySecondsAgo = Date.now() - 20000;
      const notifiedIds = JSON.parse(localStorage.getItem('n_ids')) || [];

      if (new Date(n.created_at).getTime() > twentySecondsAgo && !notifiedIds.includes(n.id)) {
        if (typeof document !== 'undefined' && document.hidden) {
          notify(n.activity, { body: n.object });
        } else {
          playSound();
          notifyLocally(n);
        }
        localStorage.setItem('n_ids', JSON.stringify(notifiedIds.length > 20 ? [] : [...notifiedIds, n.id]));
      }
    });
  }, [unreadNotifications, notify]);

  return { notifications, unreadNotifications, error, isLoading: isPending };
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
