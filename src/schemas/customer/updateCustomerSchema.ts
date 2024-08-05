import { z } from "zod";

export const UpdateCustomerSchema = z
	.object({
		id: z.string(),
		identification_document_type: z.string(),
		identification_document_number: z.string(),
		business_name: z.string().default(""),
		first_names: z.string().default(""),
		last_names: z.string().default(""),
		district: z
			.string()
			.min(1, { message: "El distrito no puede estar vacío" })
			.max(100, { message: "El distrito no puede exceder los 100 caracteres" }),
		province: z.string().min(1, { message: "La provincia no puede estar vacía" }).max(100, {
			message: "La provincia no puede exceder los 100 caracteres",
		}),
		region: z
			.string()
			.min(1, { message: "La región no puede estar vacía" })
			.max(100, { message: "La región no puede exceder los 100 caracteres" }),
		address: z.string().min(1, { message: "La dirección no puede estar vacía" }).max(100, {
			message: "La dirección no puede exceder los 100 caracteres",
		}),
		phone_number: z.string().min(1, { message: "El número de teléfono no puede estar vacío" }).max(15, {
			message: "El número de teléfono no puede exceder los 15 caracteres",
		}),
		email: z.string().email({ message: "Formato de correo electrónico inválido" }),
		birthday: z.string().default(new Date().toISOString()),
	})
	.refine(
		(data) => {
			return !!data.business_name && !data.first_names && !data.last_names;
		},
		{
			message: "Debe proporcionar 'Nombres' y 'Apellidos' para 'DNI' o 'Razón Social' para 'RUC'",
			path: ["business_name", "first_names", "last_names"],
		},
	);
