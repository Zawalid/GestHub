import { axiosFetch } from '.';

export const login = async (email, password) => await axiosFetch('login', 'POST', { email, password }, true);

export const register = async (user) => await axiosFetch('register', 'POST', user, true);

export const logout = async () => await axiosFetch('logout', 'POST');

export const getUser = async () => await axiosFetch('user', 'GET');

export const updateProfile = async (id, user) => await axiosFetch(`profiles/${id}`, 'PUT', user);

export const updateAvatar = async (id, file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  await axiosFetch(`files/${id}`, 'POST', formData);
};

export const updatePassword = async (id, passwords) => await axiosFetch(`profiles/${id}/password`, 'POST', passwords);

export const getSettings = async () => await axiosFetch('settings');

export const updateSettings = async (data) => await axiosFetch('settings', 'POST', data);
