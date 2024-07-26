import { api } from "./api-config";
import type { EndPointsValues } from "./types";

export async function getAxios<T>(endpoint: string) {
	return await api.get<T>(endpoint);
}

export async function postAxios<T>(endpoint: EndPointsValues, data: T) {
	return await api.post<T>(endpoint, data);
}

export async function putAxios<T>(endpoint: EndPointsValues, data: T) {
	return await api.put<T>(endpoint, data);
}

export async function deleteAxios<T>(endpoint: EndPointsValues) {
	return await api.delete<T>(endpoint);
}
