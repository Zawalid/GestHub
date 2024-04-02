import { axiosFetch } from ".";

export const getAllInterns = async () => await axiosFetch("interns");

export const getIntern = async (id) => await axiosFetch(`interns/${id}`);

export const addIntern = async (data) =>
  await axiosFetch("interns", "POST", data);

export const updateIntern = async (id, data) =>
  await axiosFetch(`interns/${id}`, "PUT", data);

export const deleteIntern = async (id) =>
  await axiosFetch(`interns/${id}`, "DELETE");
