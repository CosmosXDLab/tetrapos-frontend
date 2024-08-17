import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { EndPointsValues } from "@/types";
import type { CashRegister } from "@/types/cash-register";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllCashRegister() {
	return useQuery<CashRegister[]>({
		queryFn: async () => {
			const response = await apiRequest<CashRegister[]>("get", EndPoints.sales.cashRegister);
			return response.data;
		},
		queryKey: ["getAllCashRegister"],
	});
}

export function useGetCashRegisterById(id: string) {
	return useQuery<CashRegister>({
		queryFn: async () => {
			const endpoint = `${EndPoints.sales.cashRegister}/${id}` as EndPointsValues;
			const response = await apiRequest<CashRegister>("get", endpoint);
			return response.data;
		},
		queryKey: ["getProductById", id],
	});
}

export function useCreateCashRegister() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CashRegister) => {
			const response = await apiRequest<CashRegister>("post", EndPoints.sales.cashRegister, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCashRegister"] });
		},
	});
}

export function useUpdateCashRegister() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, id }: { data: CashRegister; id: string }) => {
			const endpoint = `${EndPoints.sales.cashRegister}/${id}` as EndPointsValues;
			const response = await apiRequest<CashRegister>("put", endpoint, data);

			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCashRegister"] });
		},
	});
}

export function useDeleteCashRegister() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const endpoint = `${EndPoints.sales.cashRegister}/${id}` as EndPointsValues;
			const response = await apiRequest<null>("delete", endpoint);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCashRegister"] });
		},
	});
}
