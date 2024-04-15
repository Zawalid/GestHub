import axios from 'axios';

export const axiosFetch = async (resource, method, data) => {
  try {
    const response = await axios({
      method: method || 'GET',
      url: `${import.meta.env.VITE_API_URL}/${resource}`,
      data: data,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    throw Error(getAxiosErrorMessage(e.code));
  }
};

export const getAxiosErrorMessage = (code) => {
  switch (code) {
    case 'ERR_NETWORK' || 'ERR_CONNECTION_REFUSED':
      return 'Network error. Please check your internet connection.';
    case 'ERR_REQUEST_TIMEOUT':
      return 'Request timeout. Please try again.';
    case 'ERR_NO_RESPONSE':
      return 'No response from the server. Please try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
};
