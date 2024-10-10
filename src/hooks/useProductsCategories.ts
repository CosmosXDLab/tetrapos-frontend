import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

export function useGetAllProductsCategories() {
	return useQuery<Product["product_category"][]>({
		queryFn: async () => {
			const response = await apiRequest<Product["product_category"][]>("get", EndPoints.categories);
			return response.data;
		},
		queryKey: ["getAllProductsCategories"],
	});
}
