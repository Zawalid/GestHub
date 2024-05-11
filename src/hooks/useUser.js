import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  login,
  register,
  logout,
  getUser,
  updateProfile,
  updatePassword,
  updateAvatar,
  getSettings,
  updateSettings,
} from '@/services/usersAPI';
import { useMutate } from './useMutate';
import { getFile } from '@/utils/helpers';
import { useConfirmationModal } from './useConfirmationModal';

const useRedirect = () => {
  const navigate = useNavigate();
  const source = useLocation().state?.source;

  return (message, role) => {
    toast.success(message);
    navigate(source ? source : role === 'user' ? '/' : '/app');
  };
};

export function useLogin() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => redirect("Logged in successfully. You'll be redirected now.", data?.data?.role),
    onError: (error) => toast.error(error.message),
  });

  return { login: mutate, isLogging: isPending, error };
}

export function useRegister() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['register'],
    mutationFn: (user) => register(user),
    onSuccess: (data) => redirect("Registered in successfully. You'll be redirected now.", data?.role),
    onError: (error) => toast.error(error.message),
  });

  return { register: mutate, isRegistering: isPending, error };
}

export function useLogout() {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => location.assign('/'),
    onError: (error) => toast.error(error.message),
  });
  const { openModal } = useConfirmationModal();

  const logoutFn = () =>
    openModal({
      message: 'You are about to log out. Do you wish to proceed?',
      title: 'Logout',
      confirmText: 'Logout',
      onConfirm: mutate,
    });

  return { logout: logoutFn, isLoggingOut: isPending, error };
}

export function useUser() {
  const { data, error, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: 1,
  });

  return {
    user: data ? { ...data, avatar: { src: getFile(data, 'avatar'), file: null }, cv: getFile(data, 'cv') } : null,
    isAuthenticated: Boolean(data),
    isLoading: isPending,
    error,
  };
}

export function useSettings() {
  const { data, error, isPending } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    retry: 1,
  });

  return {
    settings: data,
    isLoading: isPending,
    error,
  };
}

export function useUpdateProfile() {
  return useMutate({
    queryKey: ['user', 'update'],
    mutationFn: ({ id, user }) => updateProfile(id, user),
    loadingMessage: 'Updating profile...',
    successMessage: 'Profile updated successfully',
  });
}

export function useUpdateAvatar() {
  return useMutate({
    queryKey: ['user', 'updateAvatar'],
    mutationFn: ({ id, file }) => updateAvatar(id, file),
    loadingMessage: 'Updating profile...',
    successMessage: 'Profile updated successfully',
  });
}

export function useUpdatePassword() {
  const { user } = useUser();
  return useMutate({
    queryKey: ['user', 'updatePassword'],
    mutationFn: (passwords) => updatePassword(user?.profile_id, passwords),
    loadingMessage: 'Updating password...',
    successMessage: 'Password updated successfully',
  });
}

export function useUpdateSettings() {
  return useMutate({
    queryKey: ['settings', 'update'],
    mutationFn: (data) => updateSettings(data),
    loadingMessage: 'Updating settings...',
    successMessage: 'Settings updated successfully',
    errorMessage: 'Failed to update settings',
  });
}
