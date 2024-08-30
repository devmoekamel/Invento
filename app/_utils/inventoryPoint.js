import { useSelector } from "react-redux";
import { AxiosClient } from "./axoisClient";

export const getUserInventory = (token) =>
  AxiosClient.get("/stock", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  
export const UpdateUserInventory = (token,data) =>
  AxiosClient.put("/stock",data,{
    headers: {
      Authorization: "Bearer " + token,
    },
  });
