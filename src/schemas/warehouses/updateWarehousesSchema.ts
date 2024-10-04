import { z } from "zod";

export const UpdateWarehouseSchema = z.object({
    id: z.string(), 
    code: z.string(),
    name: z.string().default(""),
    description: z.string().default(""),  
});