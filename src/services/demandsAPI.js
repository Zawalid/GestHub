import { axiosFetch } from '.';

export const getAllDemand = async () => await axiosFetch('demand');

export const getOffer = async (id) => !id ? null : await axiosFetch(`demand/${id}`);

export const addOffer = async (data) => await axiosFetch('demand', 'POST', data);

export const updateOffer = async (id, data) => await axiosFetch(`demand/${id}`, 'PUT', data);

export const deleteOffer = async (id) => await axiosFetch(`demand/${id}`, 'DELETE');
