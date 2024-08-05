import type { HttpMethod } from "@/utils";
import type { EndPointsValues } from "../../types";
import { api } from "../config/axiosConfig";

export async function apiRequest<T>(method: HttpMethod, endpoint: EndPointsValues, data?: T) {
	switch (method) {
		case "get":
			return await api.get<T>(endpoint);
		case "post":
			return await api.post<T>(endpoint, data);
		case "put":
			return await api.put<T>(endpoint, data);
		case "delete":
			return await api.delete<T>(endpoint);
		default:
			throw new Error(`Unsupported HTTP method: ${method}`);
	}
}
