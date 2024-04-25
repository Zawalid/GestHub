import { axiosFetch } from '.';

export const login = async (email, password) => await axiosFetch('login', 'POST', { email, password }, true);

export const register = async (user) => await axiosFetch('register', 'POST', user, true);

export const logout = async () => await axiosFetch('logout', 'POST', null, true);

export const getUser = async () => await axiosFetch('user', 'GET', null, true);

export const updateProfile = async (id, user) => await axiosFetch(`profiles/${id}`, 'PUT', user);
    
export const updatePassword = async (id, passwords) => await axiosFetch(`profiles/${id}/password`, 'POST', passwords);