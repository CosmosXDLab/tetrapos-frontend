export enum ApiRoutes {
	SALES_CUSTOMERS = "sales/customers",
	SALES_INVOICES = "sales/invoices",
	PRODUCTS = "products",
	CASH_JOURNALS = "sales/cash-journals",
	// Añadir más rutas según se necesiten
}

export const EndPoints = {
	sales: {
		customers: ApiRoutes.SALES_CUSTOMERS,
		invoices: ApiRoutes.SALES_INVOICES,
		cashJournals: ApiRoutes.CASH_JOURNALS
	},
	products: ApiRoutes.PRODUCTS,
} as const;
