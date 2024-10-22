import { z } from "zod";

export const UpdateCarrierSchema = z
  .object({
    id: z.string(),
    identification_document_type: z.string(),
    identification_document_number: z.string(),
    business_name: z.string().default(""),
    first_names: z.string().default(""),
    last_names: z.string().default(""),
    license_number: z
      .string()
      .min(1, { message: "El número de licencia no puede estar vacío" })
      .max(15, { message: "El número de licencia no puede exceder los 15 caracteres" }),
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
    }
  );
