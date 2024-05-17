import { axiosFetch } from '.';

export const login = async (email, password) => await axiosFetch('login', 'POST', { email, password }, true);

export const register = async (user) => await axiosFetch('register', 'POST', user, true);

export const logout = async () => await axiosFetch('logout', 'POST');

export const getUser = async () => await axiosFetch('user', 'GET');

export const updateProfile = async (id, user) => await axiosFetch(`profiles/${id}`, 'PUT', user);

export const updatePassword = async (id, passwords) => await axiosFetch(`profiles/${id}/password`, 'POST', passwords);

export const getSettings = async () => await axiosFetch('settings');

export const updateSettings = async (data) => await axiosFetch('settings', 'POST', data);

export const uploadFile = async (id, file, type) => {
  const formData = new FormData();
  formData.append(type, file);
  formData.append('type', type);
  await axiosFetch(`files/${id}`, 'POST', formData);
};
