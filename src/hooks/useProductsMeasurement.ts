import { EndPoints } from "@/api/config/endpoints";
import { apiRequest } from "@/api/services/apiRequest";
import type { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

export function useGetAllProductsMeasurement() {
	return useQuery<Product["measurement_unit"][]>({
		queryFn: async () => {
			const response = await apiRequest<Product["measurement_unit"][]>("get", EndPoints.measurement);
			return response.data;
		},
		queryKey: ["getAllProductsMeasurement"],
	});
}
