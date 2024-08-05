import type { CreateCustomerSchema } from "@/schemas/customer/createCustomerSchema";
import type { UpdateCustomerSchema } from "@/schemas/customer/updateCustomerSchema";
import type { z } from "zod";

export interface Customer {
	id: string;
	identification_document_type: string;
	identification_document_number: string;
	business_name: string;
	first_names: string;
	last_names: string;
	birthday: string;
	district: string;
	province: string;
	region: string;
	address: string;
	phone_number: string;
	email: string;
}

export type CreateCustomer = z.infer<typeof CreateCustomerSchema>;

export type UpdateCustomer = z.infer<typeof UpdateCustomerSchema>;
