import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { EndPointsValues } from "@/types";
import type { Guide } from "@/types/guides";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllGuides() {
	return useQuery<Guide[]>({
		queryFn: async () => {
			const response = await apiRequest<Guide[]>("get", EndPoints.guides);
			return response.data;
		},
		queryKey: ["getAllGuides"],
	});
}

export function useGetGuideById(id: string) {
	return useQuery<Guide>({
		queryFn: async () => {
			const endpoint = `${EndPoints.guides}/${id}` as EndPointsValues;
			const response = await apiRequest<Guide>("get", endpoint);
			return response.data;
		},
		queryKey: ["getGuideById", id],
	});
}

export function useCreateGuide() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Guide) => {
			const response = await apiRequest<Guide>("post", EndPoints.guides, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllGuides"] });
		},
	});
}

export function useUpdateGuide() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, id }: { data: Guide; id: string }) => {
			const endpoint = `${EndPoints.guides}/${id}` as EndPointsValues;
			const response = await apiRequest<Guide>("put", endpoint, data);
			console.log(response.data);

			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllGuides"] });
		},
	});
}

export function useDeleteGuide() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const endpoint = `${EndPoints.guides}/${id}` as EndPointsValues;
			const response = await apiRequest<null>("delete", endpoint);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllGuides"] });
		},
	});
}
