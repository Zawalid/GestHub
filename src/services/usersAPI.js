import { axiosFetch } from '.';

export const login = async (email, password) => await axiosFetch('auth/login', 'POST', { email, password });

export const register = async (user) => await axiosFetch('auth/register', 'POST', user);

export const logout = async () => await axiosFetch('/auth/logout', 'POST', null);

export const getUser = async () => await axiosFetch('user');
