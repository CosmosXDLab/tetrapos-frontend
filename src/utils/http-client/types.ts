import type { EndPoints } from "./api-config";

// Recursive type to extract all possible endpoint values
type ExtractValues<T> = T extends object
	? { [K in keyof T]: ExtractValues<T[K]> }[keyof T]
	: T;

export type EndPointsValues = ExtractValues<typeof EndPoints>;
