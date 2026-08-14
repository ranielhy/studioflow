import axios from "axios";

const env = import.meta.env as {
  VITE_API_URL?: string;
};

export const api = axios.create({
  baseURL: env.VITE_API_URL ?? "http://localhost:3333/api",
});
