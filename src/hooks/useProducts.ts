import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { Products, EndPointsValues } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetAllProducts() {
	return useQuery<Products[]>({
		queryFn: async () => {
			const response = await apiRequest<Products[]>("get", EndPoints.products.base);
			return response.data;
		},
		queryKey: ["getAllProducts"],
	});
}

export function useGetCustomerById(id: string) {
	return useQuery<Products>({
		queryFn: async () => {
			const endpoint = `${EndPoints.products.base}/${id}` as EndPointsValues;
			const response = await apiRequest<Products>("get", endpoint);
			return response.data;
		},
		queryKey: ["getProductById", id],
	});
}

/*export function useCreateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateCustomer) => {
			const response = await apiRequest<CreateCustomer>("post", EndPoints.sales.customers, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCustomers"] });
		},
	});
}

export function useUpdateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, id }: { data: UpdateCustomer; id: string }) => {
			const endpoint = `${EndPoints.sales.customers}/${id}` as EndPointsValues;
			const response = await apiRequest<UpdateCustomer>("put", endpoint, data);
			console.log(response.data);

			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCustomers"] });
		},
	});
}

export function useDeleteCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const endpoint = `${EndPoints.sales.customers}/${id}` as EndPointsValues;
			const response = await apiRequest<null>("delete", endpoint);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllCustomers"] });
		},
	});
}*/
