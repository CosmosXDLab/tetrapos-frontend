import {
	getAxios,
	postAxios,
	putAxios,
	deleteAxios,
} from "@/utils/http-client/generic-api-calls";
import type { EndPointsValues } from "@/utils/http-client/types";
import {
	useQuery,
	useMutation,
	useQueryClient,
	type UseMutationOptions,
} from "@tanstack/react-query";

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions<T> {
	method?: FetchMethod;
	data?: T;
}

export default function useHttpRequest<T>(
	endpoint: string,
	key: string,
	options?: FetchOptions<T>,
) {
	const queryClient = useQueryClient();
	const method = options?.method || "GET";

	const fetchFunction = async () => {
		const { data } = options || {};

		switch (method) {
			case "GET":
				return await getAxios<T>(endpoint);
			case "POST":
				return await postAxios<T>(endpoint as EndPointsValues, data!);
			case "PUT":
				return await putAxios<T>(endpoint as EndPointsValues, data!);
			case "DELETE":
				return await deleteAxios<T>(endpoint as EndPointsValues);
			default:
				throw new Error(`Unsupported method: ${method}`);
		}
	};

	const queryResult = useQuery({
		queryFn: fetchFunction,
		queryKey: [key, options],
		enabled: method === "GET", // Only run useQuery for GET requests
	});

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const mutationOptions: UseMutationOptions<any, Error, void, unknown> = {
		mutationFn: fetchFunction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [key] });
		},
	};

	const mutationResult = useMutation(mutationOptions);

	return { queryResult, mutationResult };
}
