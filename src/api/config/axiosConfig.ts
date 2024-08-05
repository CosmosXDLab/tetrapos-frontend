import { createBaseURL } from "@/utils";
import axios, { type AxiosInstance } from "axios";

export const createAPI = (baseURL: string): AxiosInstance => {
	return axios.create({ baseURL });
};

export const api = createAPI(createBaseURL());
