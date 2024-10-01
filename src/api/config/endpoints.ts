export enum ApiRoutes {
	SALES_CUSTOMERS = "sales/customers",
	SALES_INVOICES = "sales/invoices",
	PRODUCTS = "products",
	PRODUCTS_CATEGORIES = "products/categories",
	PRODUCTS_FAMILIES = "products/families",
	PRODUCTS_MEASUREMENT = "products/measurement-units",
	// Añadir más rutas según se necesiten
}

export const EndPoints = {
	sales: {
		customers: ApiRoutes.SALES_CUSTOMERS,
		invoices: ApiRoutes.SALES_INVOICES,
	},
	products: ApiRoutes.PRODUCTS,
	categories: ApiRoutes.PRODUCTS_CATEGORIES,
	families: ApiRoutes.PRODUCTS_FAMILIES,
	measurement: ApiRoutes.PRODUCTS_MEASUREMENT,
} as const;
