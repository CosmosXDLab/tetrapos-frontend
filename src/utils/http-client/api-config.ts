import axios from "axios";

const apiUrl = process.env.API_URL;
export const apiVersion = "v1";
export const baseURL = `${apiUrl}/${apiVersion}`;
export const api = axios.create({ baseURL });

export const EndPoints = {
	sales: {
		clientes: "sales/customers",
		pagos: "sales/invoices",
	},
} as const;
