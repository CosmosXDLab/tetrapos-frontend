import { CreateWarehouseSchema } from "@/schemas/warehouses/createWarehousesSchema";
import { UpdateWarehouseSchema } from "@/schemas/warehouses/updateWarehousesSchema";
import type { z } from "zod";

export interface Warehouse {
    id: string;
    code: string;
    name: string;
    description: string;
}

export type CreateWarehouse = z.infer<typeof CreateWarehouseSchema>;

export type UpdateWarehouse = z.infer<typeof UpdateWarehouseSchema>;