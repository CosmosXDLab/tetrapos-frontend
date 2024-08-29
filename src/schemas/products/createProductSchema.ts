import { z } from "zod";

export const CreateProductSchema = z.object({
	code: z.string().min(1, { message: "El código no puede estar vacío" }),
	name: z.string().min(1, { message: "El nombre no puede estar vacío" }),
	description: z.string().optional(),
	kind: z.string().min(1, { message: "El tipo no puede estar vacío" }),
	classification: z.string().min(1, { message: "La clasificación no puede estar vacía" }),

	product_category: z.object({
		code: z.string().min(1, { message: "El código de la categoría no puede estar vacío" }),
		name: z.string().min(1, { message: "El nombre de la categoría no puede estar vacío" }),
		description: z.string().optional(),
	}),

	product_family: z.object({
		code: z.string().min(1, { message: "El código de la familia no puede estar vacío" }),
		name: z.string().min(1, { message: "El nombre de la familia no puede estar vacío" }),
		description: z.string().optional(),
	}),

	measurement_unit: z.object({
		code: z.string().min(1, { message: "El código de la unidad de medida no puede estar vacío" }),
		name: z.string().min(1, { message: "El nombre de la unidad de medida no puede estar vacío" }),
		description: z.string().optional(),
	}),

	product_controller: z.object({
		stock_management: z.boolean(),
		minimun_stock: z.number().min(0, { message: "El stock mínimo no puede ser negativo" }),
		maximun_stock: z.number().min(0, { message: "El stock máximo no puede ser negativo" }),
	}),

	product_locations: z.array(
		z.object({
			location: z.object({
				code: z.string().min(1, { message: "El código de la ubicación no puede estar vacío" }),
				name: z.string().min(1, { message: "El nombre de la ubicación no puede estar vacío" }),
				description: z.string().optional(),
			}),
			product_stocks: z.array(
				z.object({
					period: z.string().min(1, { message: "El período no puede estar vacío" }),
					available_stock: z.number().min(0, { message: "El stock disponible no puede ser negativo" }),
					reserved_stock: z.number().min(0, { message: "El stock reservado no puede ser negativo" }),
					total_stock: z.number().min(0, { message: "El stock total no puede ser negativo" }),
					consumed_stock: z.number().min(0, { message: "El stock consumido no puede ser negativo" }),
				}),
			),
		}),
	),

	barcodes: z.array(z.string().min(1, { message: "El código de barras no puede estar vacío" })).optional(),

	state: z.string().min(1, { message: "El estado no puede estar vacío" }),
});
