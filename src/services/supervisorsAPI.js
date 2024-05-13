import { axiosFetch } from '.';

export const getAllSupervisors = async () => await axiosFetch('supervisors');

export const getSupervisor = async (id) => !id ? null : await axiosFetch(`supervisors/${id}`);

export const addSupervisor = async (data) => await axiosFetch('profiles', 'POST', {...data,role : 'supervisor'});

export const updateSupervisor = async (id, data) => await axiosFetch(`profiles/${id}`, 'PUT', {...data,role : 'supervisor'});

export const deleteSupervisor = async (id) => await axiosFetch(`profiles/${id}`, 'DELETE');

export const deleteSupervisors = async (ids) => await axiosFetch(`multiple/supervisors/delete`, 'POST', { ids });
