export enum ApiRoutes {
	SALES_CLIENTES = "sales/customers",
	SALES_PAGOS = "sales/invoices",
	PRODUCTS = "/products"
	// Añadir más rutas según se necesiten
}

export const EndPoints = {
	sales: {
		customers: ApiRoutes.SALES_CLIENTES,
		invoices: ApiRoutes.SALES_PAGOS,
	},
	products: {
		base: ApiRoutes.PRODUCTS
	}
} as const;
