import axios from 'axios';

export const axiosFetch = async (resource, method, data, isAuth) => {
  try {
    // if (isAuth && method === 'POST') {
    //   const response = await axios.get(`${import.meta.env.VITE_AUTH_URL}/sanctum/csrf-cookie`, {
    //     withCredentials: true,
    //     withXSRFToken : true,
    //   });
    //   console.log(response.data);
    // }

    const response = await axios({
      method: method || 'GET',
      url: `${import.meta.env.VITE_API_URL}/${!method ? 'data/' : ''}${resource}`,
      data: data,
      withCredentials: isAuth,
      withXSRFToken: isAuth,
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    if (e.request.responseURL.includes('login') || e.request.responseURL.includes('register')) {
      throw Error(e.response.data.message);
    }
    throw Error(e.response?.status === 404 ? 'Not found' : getAxiosErrorMessage(e.code));
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
    case 'ERR_BAD_REQUEST':
      return 'Bad request. Please try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
};
