import type { CreateProductSchema } from "@/schemas/products/createProductSchema";
import type { z } from "zod";

export interface Product {
	id: string;
	code: string;
	name: string;
	description: string;
	kind: string;
	classification: string;
	product_category: ProductCategory;
	product_family: ProductFamily;
	measurement_unit: MeasurementUnit;
	product_controller: ProductController;
	product_locations: ProductLocation[];
	barcodes: string[];
	state: string;
}

interface ProductCategory {
	id: string;
	code: string;
	name: string;
	description: string;
}

interface ProductFamily {
	id: string;
	code: string;
	name: string;
	description: string;
}

interface MeasurementUnit {
	id: string;
	code: string;
	name: string;
	description: string;
}

interface ProductController {
	stock_management: boolean;
	minimun_stock: number;
	maximun_stock: number;
}

interface ProductLocation {
	location: Location;
	product_stocks: ProductStock[];
}

interface Location {
	id: string;
	code: string;
	name: string;
	description: string;
}

interface ProductStock {
	period: string;
	available_stock: number;
	reserved_stock: number;
	total_stock: number;
	consumed_stock: number;
}

export type CreateProduct = z.infer<typeof CreateProductSchema>;
