import { z } from "zod";

export const UpdateCashRegisterSchema = z
	.object({
		opening_date: z.string().min(1, "Seleccione una Fecha de apertura"),
        closing_date: z.string().min(1, "Seleccione una Fecha de cierre"),
	})
    .refine((payload) => {
            if (payload.closing_date && payload.opening_date) {
                const cls_date = new Date(payload.closing_date);
                const opn_date = new Date(payload.opening_date);
                cls_date.setHours(0, 0, 0, 0);
                opn_date.setHours(0, 0, 0, 0);
                return opn_date.getTime() <= cls_date.getTime()
            }

            return true
        },
        {
            message: "La 'Fecha de apertura' debe ser menor a la 'Fecha de cierre'"
        }
    )
