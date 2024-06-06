import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({ baseURL: '/', withCredentials: true });

axiosInstance.interceptors.request.use((config) => {
  if ((config.method == 'post' || config.method == 'put' || config.method == 'delete') && !Cookies.get('XSRF-TOKEN')) {
    return axiosInstance.get('/sanctum/csrf-cookie').then(() => config);
  }
  return config;
}, null);

export const axiosFetch = async (resource, method, data, headers) => {
  try {
    const response = await axiosInstance({
      method: method || 'GET',
      url: `/api/${resource}`,
      data: data,
      headers: {
        Accept: 'application/json',
        'Accept-Path': true,
        ...(headers && headers),
      },
    });
    return response.data?.data || response.data;
  } catch (e) {
    if (e?.response?.data?.message === 'Unauthenticated.') {
      localStorage.removeItem('in');
      location.assign('/login');
    }
    if (['login', 'register', 'logout', 'password', 'profiles','emails'].some((url) => resource.includes(url))) {
      throw Error(e.response.data.message || 'Something went wrong. Please try again.');
    }
    throw Error(e.response?.status === 404 ? 'Not found' : getAxiosErrorMessage(e.code));
  }
};

const getAxiosErrorMessage = (code) => {
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
