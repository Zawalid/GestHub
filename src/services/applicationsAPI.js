import { axiosFetch } from '.';

export const getAllApplications = async () => await axiosFetch('applications');

export const getApplication = async (id) => (!id ? null : await axiosFetch(`applications/${id}`));

export const addApplication = async (data) => await axiosFetch('applications', 'POST', data);

export const deleteApplication = async (id) => await axiosFetch(`applications/${id}`, 'DELETE');

export const approveApplication = async (id) => await axiosFetch(`applications/${id}/approve`, 'PUT');

export const rejectApplication = async (id) => await axiosFetch(`applications/${id}/reject`, 'PUT');

export const markAsRead = async (id) => await axiosFetch(`applications/${id}/read`, 'PUT');
