import { AxiosClient } from "./axoisClient";


export const getUserTransactions = (token) =>
    AxiosClient.get("/transactions",  {
        headers: {
          Authorization: "Bearer " + token,
        },
    });
