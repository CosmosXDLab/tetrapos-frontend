import { CreateWarehouseSchema } from "@/schemas/warehouses/createWarehousesSchema";
import type { z } from "zod";

export interface Warehouse {
    id: string;
    code: string;
    name: string;
    description: string;
}

export type CreateWarehouse = z.infer<typeof CreateWarehouseSchema>;