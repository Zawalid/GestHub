import { axiosFetch } from '.';

export const getNotifications = async () => await axiosFetch('notifications');

export const deleteNotification = async (id) => await axiosFetch(`notifications/${id}`, 'DELETE');

export const markAsRead = async (id) => await axiosFetch(`notifications/${id}/read`, 'PUT');

export const markAllAsRead = async () => await axiosFetch('multiple/notifications/read', 'POST');
