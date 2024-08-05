import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { CreateCustomer, Customer, EndPointsValues, UpdateCustomer } from "@/types"; // Assuming you have a Customer type
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// export function useDeleteCustomer(
// 	options?: UseMutationOptions<null, Error, string>, // Expect 'string' (id) as the argument during mutation
// ) {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: async (id: string) => {
// 			const endpoint = `${EndPoints.sales.customers}/${id}` as EndPointsValues;
// 			const response = await apiRequest<null>("delete", endpoint);
// 			return response.data;
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["getAllCustomers"] });
// 		},
// 		...options,
// 	});
// }

export function useGetAllCustomers() {
	return useQuery<Customer[]>({
		queryFn: async () => {
			const response = await apiRequest<Customer[]>("get", EndPoints.sales.customers);
			return response.data;
		},
		queryKey: ["getAllCustomers"],
	});
}

export function useGetCustomerById(id: string) {
	return useQuery<Customer>({
		queryFn: async () => {
			const endpoint = `${EndPoints.sales.customers}/${id}` as EndPointsValues;
			const response = await apiRequest<Customer>("get", endpoint);
			return response.data;
		},
		queryKey: ["getCustomerById", id],
	});
}

export function useCreateCustomer() {
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
}
