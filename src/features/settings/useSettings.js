import { useQuery } from '@tanstack/react-query';
import { getSettings, updatePassword, updateProfile, updateSettings, uploadFile } from '@/services/settingsAPI';
import { filterObject, getFile } from '@/utils/helpers';
import { useMutate, useUser } from '@/hooks';
import { useRoutes } from '@/hooks/useRoutes';
import { useEffect } from 'react';

export function useSettings(local) {
  const { data, error, isPending, isFetching } = useQuery({ queryKey: ['settings'], queryFn: getSettings });

  const settings = data ? { ...data, appLogo: { src: getFile(data, 'appLogo') || '/SVG/logo.svg', file: null } } : null;
  const localSettings = useLocalSettings();

  if (settings) localStorage.setItem('settings', JSON.stringify(settings));

  if (isFetching || !settings) {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) return { settings: local ? localSettings : JSON.parse(savedSettings), isLoading: false, error };
  }

  return { settings: local ? localSettings : settings, isLoading: isPending, error };
}

const useLocalSettings = () => {
  const { sidebar, routes } = useRoutes();
  const localSettings = JSON.parse(localStorage.getItem('local_settings'));

  useEffect(() => {
    if (!localSettings && sidebar.length) {
      localStorage.setItem(
        'local_settings',
        JSON.stringify({
          notificationsSound: true,
          deleteConfirmation: true,
          animations: true,
          defaultHomeView: 'overview',
          toastPosition: 'bottom-right',
          theme: 'orange',
          showInSideBar: sidebar.map((s) => s.name).toSorted() || [],
          showCount: false,
        })
      );
    }
  }, [localSettings, sidebar]);

  return {
    ...localSettings,
    defaultHomeView: routes.includes(localSettings?.defaultHomeView) ? localSettings?.defaultHomeView : 'overview',
    showInSideBar : localSettings?.showInSideBar || []
  };
};

export function useUpdateProfile() {
  return useMutate({
    queryKey: ['user', 'update'],
    mutationFn: ({ id, user }) => {
      if (Object.keys(filterObject(user, ['avatar', 'cv'], 'exclude')).length) {
        updateProfile(id, filterObject(user, ['avatar', 'cv'], 'exclude'));
      }
      if (user?.avatar) uploadFile(id, user.avatar?.file, 'avatar');
      if (user?.cv) uploadFile(id, user.cv?.file, 'cv');
    },
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

export function useUpdateSettings(local) {
  return useMutate({
    queryKey: ['settings', 'update'],
    mutationFn: (settings) =>
      local ? localStorage.setItem('local_settings', JSON.stringify(settings)) : updateSettings(settings),
    loadingMessage: 'Updating settings...',
    successMessage: 'Settings updated successfully',
    errorMessage: 'Failed to update settings',
  });
}
