import { axiosFetch } from ".";

export const getAllSupervisors = async () => await axiosFetch("supervisors");

export const getSupervisor = async (id) =>
  await axiosFetch(`supervisors/${id}`);

export const addSupervisor = async (data) =>
  await axiosFetch("supervisors", "POST", data);

export const updateSupervisor = async (id, data) =>
  await axiosFetch(`supervisors/${id}`, "PUT", data);

export const deleteSupervisor = async (id) =>
  await axiosFetch(`supervisors/${id}`, "DELETE");
