import { axiosFetch } from '.';

export const getAllInterns = async () => await axiosFetch('interns');

export const getIntern = async (id) => (!id ? null : await axiosFetch(`interns/${id}`));

export const addIntern = async (data) => await axiosFetch('profiles', 'POST', {...data,role : 'intern'});

export const updateIntern = async (id, data) => await axiosFetch(`profiles/${id}`, 'PUT', {...data,role : 'intern'});

export const deleteIntern = async (id) => await axiosFetch(`profiles/${id}`, 'DELETE');
