import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { EndPointsValues } from "@/types";
import type { CashJournals } from "@/types/cash-journals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllCashJournals() {
	return useQuery<CashJournals[]>({
		queryFn: async () => {
			const response = await apiRequest<CashJournals[]>("get", EndPoints.sales.cashJournals);
			return response.data;
		},
		queryKey: ["getAllCashJournals"],
	});
}

export function useGetCashJournalsById(id: string) {
	return useQuery<CashJournals>({
		queryFn: async () => {
			const endpoint = `${EndPoints.sales.cashJournals}/${id}` as EndPointsValues;
			const response = await apiRequest<CashJournals>("get", endpoint);
			return response.data;
		},
		queryKey: ["getProductById", id],
	});
}

export function useCreateCashJournals() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CashJournals) => {
			const response = await apiRequest<CashJournals>("post", EndPoints.sales.cashJournals, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCashJournals"] });
		},
	});
}

export function useUpdateCashJournals() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, id }: { data: CashJournals; id: string }) => {
			const endpoint = `${EndPoints.sales.cashJournals}/${id}` as EndPointsValues;
			const response = await apiRequest<CashJournals>("put", endpoint, data);

			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCashJournals"] });
		},
	});
}

export function useDeleteCashJournals() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const endpoint = `${EndPoints.sales.cashJournals}/${id}` as EndPointsValues;
			const response = await apiRequest<null>("delete", endpoint);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCashJournals"] });
		},
	});
}
