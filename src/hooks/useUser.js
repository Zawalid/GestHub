import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login, register, logout, getUser, updateProfile, updatePassword, updateAvatar } from '@/services/usersAPI';
import { useMutate } from './useMutate';
import { getAvatar } from '@/utils/helpers';

const useRedirect = (isLogout) => {
  const navigate = useNavigate();

  if (isLogout) return () => navigate('/');
  return (message) => {
    toast.success(message);
    navigate('/app');
  };
};

export function useLogin() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: () => redirect("Logged in successfully. You'll be redirected now."),
    onError: (error) => toast.error(error.message),
  });

  return { login: mutate, isLogging: isPending, error };
}

export function useRegister() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['register'],
    mutationFn: (user) => register(user),
    onSuccess: () => redirect("Registered in successfully. You'll be redirected now."),
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

  return { logout: mutate, isLoggingOut: isPending, error };
}

export function useUser() {
  const { data, error, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: 1,
  });

  return {
    user: data ? { ...data, avatar: { src: getAvatar(data), file: null } } : null,
    isAuthenticated: Boolean(data),
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
    errorMessage: 'Failed to update profile',
  });
}
export function useUpdateAvatar() {
  return useMutate({
    queryKey: ['user', 'updateAvatar'],
    mutationFn: ({ id, file }) => updateAvatar(id, file),
    loadingMessage: 'Updating profile...',
    successMessage: 'Profile updated successfully',
    errorMessage: 'Failed to update profile',
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
