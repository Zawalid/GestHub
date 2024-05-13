import { axiosFetch } from '.';

export const getAllAdmins = async () => await axiosFetch('admins');

export const getAdmin = async (id) => !id ? null : await axiosFetch(`admins/${id}`);

export const addAdmin = async (data) => await axiosFetch('profiles', 'POST', {...data,role : 'admin'});

export const updateAdmin = async (id, data) => await axiosFetch(`profiles/${id}`, 'PUT', {...data,role : 'admin'});

export const deleteAdmin = async (id) => await axiosFetch(`profiles/${id}`, 'DELETE');

export const deleteAdmins = async (ids) => await axiosFetch(`multiple/admins/delete`, 'POST', { ids });
