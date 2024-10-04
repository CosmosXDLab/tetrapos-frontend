export enum ApiRoutes {
	SALES_CUSTOMERS = "sales/customers",
	SALES_INVOICES = "sales/invoices",
	PRODUCTS = "products",
	GUIDES = "guides",
	WAREHOUSES = "products/warehouses",
	PRODUCTS_CATEGORIES = "products/categories",
	PRODUCTS_FAMILIES = "products/families",
	PRODUCTS_MEASUREMENT = "products/measurement-units",
	CASH_JOURNALS = "sales/cash-journals",
	// Añadir más rutas según se necesiten
}

export const EndPoints = {
	sales: {
		customers: ApiRoutes.SALES_CUSTOMERS,
		invoices: ApiRoutes.SALES_INVOICES,
		cashJournals: ApiRoutes.CASH_JOURNALS,
	},
	products: ApiRoutes.PRODUCTS,
	guides: ApiRoutes.GUIDES,
	warehouses: ApiRoutes.WAREHOUSES,
	categories: ApiRoutes.PRODUCTS_CATEGORIES,
	families: ApiRoutes.PRODUCTS_FAMILIES,
	measurement: ApiRoutes.PRODUCTS_MEASUREMENT,
} as const;
