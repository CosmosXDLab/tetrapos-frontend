import { z } from "zod";

export const CreateClienteSchema = z
	.object({
		identification_document_type: z.enum(["DNI", "RUC"], {
			errorMap: () => ({ message: "Tipo de documento debe ser 'DNI' o 'RUC'" }),
		}),
		identification_document_number: z
			.string()
			.min(1, {
				message:
					"El número de documento de identificación no puede estar vacío",
			})
			.max(20, {
				message:
					"El número de documento de identificación no puede exceder los 20 caracteres",
			}),
		business_name: z.string().default(""),
		first_names: z.string().default(""),
		last_names: z.string().default(""),
		district: z
			.string()
			.min(1, { message: "El distrito no puede estar vacío" })
			.max(100, { message: "El distrito no puede exceder los 100 caracteres" }),
		province: z
			.string()
			.min(1, { message: "La provincia no puede estar vacía" })
			.max(100, {
				message: "La provincia no puede exceder los 100 caracteres",
			}),
		region: z
			.string()
			.min(1, { message: "La región no puede estar vacía" })
			.max(100, { message: "La región no puede exceder los 100 caracteres" }),
		address: z
			.string()
			.min(1, { message: "La dirección no puede estar vacía" })
			.max(100, {
				message: "La dirección no puede exceder los 100 caracteres",
			}),
		phone_number: z
			.string()
			.min(1, { message: "El número de teléfono no puede estar vacío" })
			.max(15, {
				message: "El número de teléfono no puede exceder los 15 caracteres",
			}),
		email: z
			.string()
			.email({ message: "Formato de correo electrónico inválido" }),
		birthday: z.string().default(new Date().toISOString()),
	})
	.refine(
		(data) => {
			if (data.identification_document_type === "DNI") {
				return !!data.first_names && !!data.last_names && !data.business_name;
			}
			return !!data.business_name && !data.first_names && !data.last_names;
		},
		{
			message:
				"Debe proporcionar 'Nombres' y 'Apellidos' para 'DNI' o 'Razón Social' para 'RUC'",
			path: ["business_name", "first_names", "last_names"],
		},
	);

export type CreateClienteType = z.infer<typeof CreateClienteSchema>;
