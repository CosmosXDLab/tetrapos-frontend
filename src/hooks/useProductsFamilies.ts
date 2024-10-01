import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

export function useGetAllProductsFamilies() {
	return useQuery<Product["product_family"][]>({
		queryFn: async () => {
			const response = await apiRequest<Product["product_family"][]>("get", EndPoints.families);
			return response.data;
		},
		queryKey: ["getAllProductsFamilies"],
	});
}
