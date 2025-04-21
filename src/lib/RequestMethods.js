import axios from "axios";
import { store } from "../Redux/Store";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

userRequest.interceptors.request.use(
  (config) => {
    const token = store.getState().user.currentUser?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
