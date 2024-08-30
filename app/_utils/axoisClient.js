import axios from "axios";

const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// axios.defaults.withCredentials = true;
export const AxiosClient = axios.create({ baseURL: BaseUrl });
