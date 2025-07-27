import axios from 'axios';

// Check if localStorage is available (client-side)
const isLocalStorageAvailable = process.client && typeof localStorage !== 'undefined';

// Get stored user state
const localStorageState = isLocalStorageAvailable ? JSON.parse(localStorage.getItem('tlkeys')) : null;
const token = localStorageState ? localStorageState.auth.token : null;

// Get stored currency or fallback to USD
const currency = isLocalStorageAvailable && localStorage.getItem('currency')
  ? localStorage.getItem('currency')
  : 'USD';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Accept-Language': 'en',
    'Content-Type': 'application/json',
    'currency': currency,
    'Accept': 'application/json',
    'secret-key': process.env.SECRET_KEY,
    'api-key': process.env.API_KEY,
  },
});

const responseHandler = (response) => response;
const errorHandler = (error) => {
  if (error.response?.status === 401 && isLocalStorageAvailable) {
    localStorage.removeItem('tlkeys');
  }
  return Promise.reject(error);
};

api.interceptors.response.use(responseHandler, errorHandler);

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;