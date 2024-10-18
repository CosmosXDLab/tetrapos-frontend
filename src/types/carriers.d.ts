import { CreateCarriersSchema } from "@/schemas/carriers/createCarriersSchema"; 
import type { UpdateCarrierSchema } from "@/schemas/carriers/updateCarriersSchema";

export interface Carriers{
    id: string;
    identification_document_type: string;
    identification_document_number: string;
    business_name: string;
    first_names: string;
    last_names: string;
    license_number: string;
}
export type CreateCarriers= z.infer<typeof CreateCarriersSchema>;

export type UpdateCarriers = z.infer<typeof UpdateCarrierSchema>;