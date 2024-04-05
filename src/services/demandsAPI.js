import { axiosFetch } from ".";

export const getAllDemand = async () => await axiosFetch("demand");

export const getOffer = async (id) => await axiosFetch(`demand/${id}`);

export const addOffer = async (data) =>
  await axiosFetch("demand", {
    method: "POST",
    data,
  });

export const updateOffer = async (id, data) =>
  await axiosFetch(`demand/${id}`, {
    method: "PUT",
    data,
  });

export const deleteOffer = async (id) =>
  await axiosFetch(`demand/${id}`, {
    method: "DELETE",
  });
