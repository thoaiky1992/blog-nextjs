import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "content-type": "application/json",
  },
});
