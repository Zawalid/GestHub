import { axiosFetch } from '.';

export const getAllDemands = async () => await axiosFetch('demands');

export const getDemand = async (id) => (!id ? null : await axiosFetch(`demands/${id}`));

export const addDemand = async (data) => await axiosFetch('demands', 'POST', data);

export const deleteDemand = async (id) => await axiosFetch(`demands/${id}`, 'DELETE');

export const approveDemand = async (id) => await axiosFetch(`demands/${id}/approve`, 'POST');

export const rejectDemand = async (id) => await axiosFetch(`demands/${id}/reject`, 'POST');
