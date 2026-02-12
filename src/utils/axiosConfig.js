import axios from "axios";
import { getItem } from "./storage";

axios.interceptors.request.use(
  async (config) => {
    const token = await getItem("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
