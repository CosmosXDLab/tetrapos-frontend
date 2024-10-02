import { z } from "zod";

export const CreateWarehouseSchema = z
    .object({
        code: z.string().min(1, "Código es requerido"),
        name: z.string().min(1, "Nombre es requerido"),
        description: z.string().optional(),
    });
