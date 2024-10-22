import { z } from "zod";

export const CreateCarrierSchema = z
  .object({
    identification_document_type: z.enum(["DNI", "RUC"], {
      errorMap: () => ({
        message: "Tipo de documento debe ser 'DNI' o 'RUC'",
      }),
    }),
    identification_document_number: z
      .string()
      .min(1, {
        message: "El número de documento no puede estar vacío",
      })
      .max(20, {
        message: "El número de documento no puede exceder los 20 caracteres",
      }),
    business_name: z.string().default(""),
    first_names: z.string().default(""),
    last_names: z.string().default(""),
    license_number: z
      .string()
      .min(1, {
        message: "El número de licencia no puede estar vacío",
      })
      .max(15, {
        message: "El número de licencia no puede exceder los 15 caracteres",
      }),
  })
  .refine(
    (data) => {
      if (data.identification_document_type === "DNI") {
        return (
          !!data.first_names &&
          !!data.last_names &&
          !data.business_name &&
          !!data.license_number
        );
      }
      return (
        !!data.business_name &&
        !data.first_names &&
        !data.last_names &&
        !!data.license_number
      );
    },
    {
      message:
        "Debe proporcionar 'Nombres', 'Apellidos' y 'Número de licencia' para 'DNI' o 'Razón Social' y 'Número de licencia' para 'RUC'",
      path: ["business_name", "first_names", "last_names", "license_number"],
    }
  );
