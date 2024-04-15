import { axiosFetch } from '.';

export const getAllOffers = async () => await axiosFetch('offers');

//export const getOffer = async (id) => await axiosFetch(`offers/${id}`);
export const getOffer = async () => await axiosFetch(`offer`);

export const addOffer = async (data) => await axiosFetch('offers', 'POST', data);

export const updateOffer = async (id, data) => await axiosFetch(`offers/${id}`, 'PUT', data);

export const deleteOffer = async (id) => await axiosFetch(`offers/${id}`, 'DELETE');
