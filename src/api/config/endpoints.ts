export enum ApiRoutes {
	SALES_CUSTOMERS = "sales/customers",
	SALES_INVOICES = "sales/invoices",
	PRODUCTS = "products",
	// Añadir más rutas según se necesiten
}

export const EndPoints = {
	sales: {
		customers: ApiRoutes.SALES_CUSTOMERS,
		invoices: ApiRoutes.SALES_INVOICES,
	},
	products: ApiRoutes.PRODUCTS,
} as const;
