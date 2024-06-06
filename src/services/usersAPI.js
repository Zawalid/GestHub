import axios from 'axios';
import { axiosFetch } from '.';

// Users
export const getAllUsers = async () => await axiosFetch('users');

export const getUser = async () => {
  const user = await axiosFetch('user');
  if (user) localStorage.setItem('in', 'true');
  return user;
};

export const deleteUser = async (id) => await axiosFetch(`profiles/${id}`, 'DELETE');

export const deleteUsers = async (ids) => await axiosFetch(`multiple/users/delete`, 'POST', { ids });

// Auth
export const login = async (email, password) => {
  const [ipResult, locationResult] = await Promise.allSettled([
    axios.get('https://api64.ipify.org'),
    axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client'),
  ]);

  const ip = ipResult.status === 'fulfilled' ? ipResult.value.data : 'Unknown';
  const location =
    locationResult.status === 'fulfilled' ? locationResult.value.data : { city: 'Unknown', countryName: 'Unknown' };

  return await axiosFetch(
    'login',
    'POST',
    { email, password },
    {
      'Accept-For': ip,
      'Accept-From': `${location.city}, ${location.countryName}`,
    }
  );
};

export const register = async (user) => await axiosFetch('register', 'POST', user);

export const logout = async () => await axiosFetch('logout', 'POST');

// Profile
export const updateProfile = async (id, user) => await axiosFetch(`profiles/${id}`, 'PUT', user);

export const updatePassword = async (id, passwords) => await axiosFetch(`profiles/${id}/password`, 'POST', passwords);

export const getSettings = async () => await axiosFetch('settings');

export const updateSettings = async (data) => await axiosFetch('settings', 'POST', data);

export const uploadFile = async (id, file, type) => {
  const formData = new FormData();
  formData.append(type, file);
  formData.append('type', type);
 return await axiosFetch(`files/${id}`, 'POST', formData);
};

