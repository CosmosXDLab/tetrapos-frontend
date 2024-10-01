import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { EndPointsValues } from "@/types";
import type { CreateProduct, Product } from "@/types/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllProducts() {
	return useQuery<Product[]>({
		queryFn: async () => {
			const response = await apiRequest<Product[]>("get", EndPoints.products);
			return response.data;
		},
		queryKey: ["getAllProducts"],
	});
}

export function useGetProductById(id: string) {
	return useQuery<Product>({
		queryFn: async () => {
			const endpoint = `${EndPoints.products}/${id}` as EndPointsValues;
			const response = await apiRequest<Product>("get", endpoint);
			return response.data;
		},
		queryKey: ["getProductById", id],
	});
}

export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateProduct) => {
			const response = await apiRequest<CreateProduct>("post", EndPoints.products, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
		},
	});
}

export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, id }: { data: Product; id: string }) => {
			const endpoint = `${EndPoints.products}/${id}` as EndPointsValues;
			const response = await apiRequest<Product>("put", endpoint, data);
			console.log(response.data);

			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
		},
	});
}

export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const endpoint = `${EndPoints.products}/${id}` as EndPointsValues;
			const response = await apiRequest<null>("delete", endpoint);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
		},
	});
}
