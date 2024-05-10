import axios from 'axios';

export const axiosFetch = async (resource, method, data) => {
  try {
    const response = await axios({
      method: method || 'GET',
      url: `/api/${resource}`,
      data: data,
      withCredentials: true,
      withXSRFToken: true,
      headers: { Accept: 'application/json', 'Accept-Path': true },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    if (
      e.request.responseURL.includes('login') ||
      e.request.responseURL.includes('register') ||
      e.request.responseURL.includes('logout') ||
      e.request.responseURL.includes('password') ||
      e.request.responseURL.includes('profiles')
    ) {
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
