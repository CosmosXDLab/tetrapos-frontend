import { CosmosInput } from "@/components/cosmos/CosmosInput";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { CreateProduct } from "@/types/products";
import { useState } from "react";

const ControllerTab = ({ form }: { form: UseFormReturn<CreateProduct, undefined> }) => {
	const [controlStock, setControlStock] = useState<boolean>(false);

	return (
		<div className="flex flex-col gap-10">
			<div className="flex items-center gap-4">
				<p>Controlar Stock</p>
				<Checkbox checked={controlStock} onCheckedChange={() => setControlStock(!controlStock)} />
			</div>

			<div className="grid items-center grid-cols-2 w-[60%] gap-6">
				<FormField
					control={form.control}
					name="product_controller.minimun_stock"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosInput
								showLabel
								type="number"
								label="Stock mínimo"
								accept="number"
								min={0}
								defaultValue={0}
								disabled={!controlStock}
								{...field}
							/>
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="product_controller.maximun_stock"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosInput
								showLabel
								type="number"
								label="Stock máximo"
								accept="number"
								min={0}
								defaultValue={0}
								disabled={!controlStock}
								{...field}
							/>
						</div>
					)}
				/>
			</div>
		</div>
	);
};

export default ControllerTab;
