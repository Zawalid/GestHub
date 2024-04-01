import axios from "axios";

export const getAllInterns = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + "/interns");
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getIntern = async (id) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + `/interns/${id}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
