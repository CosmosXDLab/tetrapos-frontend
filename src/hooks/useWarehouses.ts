import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { EndPointsValues } from "@/types";
import type { Warehouse } from "@/types/warehouses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllWarehouses() {
	return useQuery<Warehouse[]>({
		queryFn: async () => {
			const response = await apiRequest<Warehouse[]>("get", EndPoints.warehouses);
			return response.data;
		},
		queryKey: ["getAllWarehouses"],
	});
}

export function useGetWarehouseById(id: string) {
	return useQuery<Warehouse>({
		queryFn: async () => {
			const endpoint = `${EndPoints.warehouses}/${id}` as EndPointsValues;
			const response = await apiRequest<Warehouse>("get", endpoint);
			return response.data;
		},
		queryKey: ["getWarehouseById", id],
	});
}

export function useCreateWarehouse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Warehouse) => {
			const response = await apiRequest<Warehouse>("post", EndPoints.warehouses, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllWarehouses"] });
		},
	});
}

export function useUpdateWarehouse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, id }: { data: Warehouse; id: string }) => {
			const endpoint = `${EndPoints.warehouses}/${id}` as EndPointsValues;
			const response = await apiRequest<Warehouse>("put", endpoint, data);
			console.log(response.data);

			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllWarehouses"] });
		},
	});
}

export function useDeleteWarehouse() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const endpoint = `${EndPoints.warehouses}/${id}` as EndPointsValues;
			const response = await apiRequest<null>("delete", endpoint);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllWarehouses"] });
		},
	});
}
