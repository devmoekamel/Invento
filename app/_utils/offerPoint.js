import { AxiosClient } from "./axoisClient";

export const getOffers = (token) =>
  AxiosClient.get("offers/all", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

export const acceptOffer = (token, data) =>
  AxiosClient.post("offers/accept", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  export const CreateOffer = (token, data) =>
    AxiosClient.post("offers", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  