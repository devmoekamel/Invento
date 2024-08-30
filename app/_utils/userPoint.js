import { AxiosClient } from "./axoisClient.js";

const heads = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const register = (data) =>
  AxiosClient.post("/users/register", data, heads);
export const login = (data) => AxiosClient.post("/users/login", data, heads);
