import { axiosFetch } from '.';

export const login = async (email, password) => await axiosFetch('login', 'POST', { email, password });

export const register = async (user) => await axiosFetch('register', 'POST', user);

export const logout = async () => await axiosFetch('logout', 'POST', null);

export const getUser = async () => await axiosFetch('user');
