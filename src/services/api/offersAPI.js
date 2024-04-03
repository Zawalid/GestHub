import { axiosFetch } from ".";

export const getAllOffers = async () => await axiosFetch("offers");

