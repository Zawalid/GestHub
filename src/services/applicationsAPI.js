import { axiosFetch } from '.';

export const getAllApplications = async () => await axiosFetch('applications');

export const getApplication = async (id) => (!id ? null : await axiosFetch(`applications/${id}`));

export const addApplication = async (data) => await axiosFetch('applications', 'POST', data);

export const deleteApplication = async (id) => await axiosFetch(`applications/${id}`, 'DELETE');

export const deleteApplications = async (ids) => await axiosFetch(`multiple/applications/delete`, 'POST', { ids });

export const approveApplication = async (id) => await axiosFetch(`applications/${id}/approve`, 'PUT');

export const approveApplications = async (ids) => await axiosFetch(`multiple/applications/approve`, 'POST', { ids });

export const rejectApplication = async (id) => await axiosFetch(`applications/${id}/reject`, 'PUT');

export const rejectApplications = async (ids) => await axiosFetch(`multiple/applications/reject`, 'POST', { ids });

