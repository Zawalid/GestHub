import { axiosFetch } from '.';

export const getAllOffers = async () => await axiosFetch('offers');

export const getAllVisibleOffers = async () => await axiosFetch('offers/visible', null, null, true);

export const getOffer = async (id) => (!id || id === 'new' ? null : await axiosFetch(`offers/${id}`));

export const addOffer = async (data) => await axiosFetch('offers', 'POST', data);

export const updateOffer = async (id, data) => await axiosFetch(`offers/${id}`, 'PUT', data);

export const deleteOffer = async (id) => await axiosFetch(`offers/${id}`, 'DELETE');

export const getSectors = async () => await axiosFetch('sectors');

export const getCities = async () => await axiosFetch('cities');
