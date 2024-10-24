import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export function fetchData(path) {
  return api.get(path);
}
