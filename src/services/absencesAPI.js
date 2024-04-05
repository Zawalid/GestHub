import { axiosFetch } from ".";

export const getAllAbsence = async () => await axiosFetch("absence");

export const getOffer = async (id) => await axiosFetch(`absence/${id}`);

export const addOffer = async (data) =>
  await axiosFetch("absence", {
    method: "POST",
    data,
  });

export const updateOffer = async (id, data) =>
  await axiosFetch(`absence/${id}`, {
    method: "PUT",
    data,
  });

export const deleteOffer = async (id) =>
  await axiosFetch(`absence/${id}`, {
    method: "DELETE",
  });
