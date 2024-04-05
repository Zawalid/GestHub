import { axiosFetch } from ".";

export const getAllOffers = async () => await axiosFetch("offers");

export const getOffer = async (id) => await axiosFetch(`offer/${id}`);
