import { z } from "zod";

export const CreateClienteSchema = z.object({
	identification_document_type: z.enum(["DNI", "RUC"], {
		errorMap: () => ({ message: "Tipo de documento debe ser 'DNI' o 'RUC'" }),
	}),
	// identification_document_number: z
	// 	.string()
	// 	.min(1, {
	// 		message: "El número de documento de identificación no puede estar vacío",
	// 	})
	// 	.max(20, {
	// 		message:
	// 			"El número de documento de identificación no puede exceder los 20 caracteres",
	// 	}),
	// business_name: z
	// 	.string()
	// 	.min(1, { message: "El nombre comercial no puede estar vacío" })
	// 	.max(100, {
	// 		message: "El nombre comercial no puede exceder los 100 caracteres",
	// 	}),
	// first_names: z
	// 	.string()
	// 	.min(1, { message: "Los nombres no pueden estar vacíos" })
	// 	.max(100, { message: "Los nombres no pueden exceder los 100 caracteres" }),
	// last_names: z
	// 	.string()
	// 	.min(1, { message: "Los apellidos no pueden estar vacíos" })
	// 	.max(100, {
	// 		message: "Los apellidos no pueden exceder los 100 caracteres",
	// 	}),
	// birthday: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
	// 	message: "Formato de fecha de nacimiento inválido",
	// }),
	// district: z
	// 	.string()
	// 	.min(1, { message: "El distrito no puede estar vacío" })
	// 	.max(100, { message: "El distrito no puede exceder los 100 caracteres" }),
	// province: z
	// 	.string()
	// 	.min(1, { message: "La provincia no puede estar vacía" })
	// 	.max(100, { message: "La provincia no puede exceder los 100 caracteres" }),
	// region: z
	// 	.string()
	// 	.min(1, { message: "La región no puede estar vacía" })
	// 	.max(100, { message: "La región no puede exceder los 100 caracteres" }),
	// address: z
	// 	.string()
	// 	.min(1, { message: "La dirección no puede estar vacía" })
	// 	.max(100, { message: "La dirección no puede exceder los 100 caracteres" }),
	// phone_number: z
	// 	.string()
	// 	.min(1, { message: "El número de teléfono no puede estar vacío" })
	// 	.max(15, {
	// 		message: "El número de teléfono no puede exceder los 15 caracteres",
	// 	}),
	email: z
		.string()
		.email({ message: "Formato de correo electrónico inválido" }),
});

export type CreateClienteType = z.infer<typeof CreateClienteSchema>;
