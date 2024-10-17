import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { EndPointsValues } from "@/types";
import type { Carriers } from "@/types/carriers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllCarriers() {
	return useQuery<Carriers[]>({
		queryFn: async () => {
			const response = await apiRequest<Carriers[]>("get", EndPoints.sales.carriers);
			return response.data;
		},
		queryKey: ["getAllCarriers"],
	});
}

export function useGetCarrierById(id: string) {
	return useQuery<Carriers>({
		queryFn: async () => {
			const endpoint = `${EndPoints.sales.carriers}/${id}` as EndPointsValues;
			const response = await apiRequest<Carriers>("get", endpoint);
			return response.data;
		},
		queryKey: ["getCarrierById", id],
	});
}

export function useCreateCarrier() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Carriers) => {
			const response = await apiRequest<Carriers>("post", EndPoints.sales.carriers, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCarriers"] });
		},
	});
}

export function useUpdateCarrier() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, id }: { data: Carriers; id: string }) => {
			const endpoint = `${EndPoints.sales.carriers}/${id}` as EndPointsValues;
			const response = await apiRequest<Carriers>("put", endpoint, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCarriers"] });
		},
	});
}

export function useDeleteCarrier() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const endpoint = `${EndPoints.sales.carriers}/${id}` as EndPointsValues;
			const response = await apiRequest<null>("delete", endpoint);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCarriers"] });
		},
	});
}
