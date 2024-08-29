import { CosmosInput } from "@/components/cosmos/CosmosInput";
import { CosmosSelect } from "@/components/cosmos/CosmosSelect";
import { TrashIcon } from "@/components/icons";
import PencilIcon from "@/components/icons/PencilIcon";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { useRef, useState } from "react";
import placeholder from "/placeholder.jpg";
import type { CreateProduct } from "@/types/products";
import type { UseFormReturn } from "react-hook-form";

const GeneralTab = ({ form }: { form: UseFormReturn<CreateProduct, undefined> }) => {
	const [image, setImage] = useState<string | null>();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		setImage("");

		const files = event.target.files;

		if (files && files.length > 0) {
			setImage(URL.createObjectURL(files[0]));
		}
	};

	const handlePencilClick = () => {
		console.log("click");
		fileInputRef.current?.click();
	};

	return (
		<div className="flex">
			<div className="grid items-center grid-cols-2 w-[60%] gap-6">
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosInput showLabel required type="text" label="Código" {...field} />
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosInput showLabel required type="text" label="Nombre" {...field} />
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<div className="col-span-2">
							<CosmosInput showLabel type="text" label="Descripción" {...field} />
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="kind"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosSelect showLabel required label="Tipo" {...field} />
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="classification"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosSelect showLabel required label="Clasificación" {...field} />
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="product_category"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosSelect showLabel required label="Categoría" {...field} />
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="product_family"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosSelect showLabel required label="Familia" {...field} />
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="measurement_unit"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosSelect showLabel required label="Unidad de medida" {...field} />
						</div>
					)}
				/>
			</div>
			<div className="p-12 flex flex-col gap-2 items-center justify-center w-[40%]">
				<div className="flex items-center justify-center w-full border border-cosmos-label h-52">
					{image ? (
						<img className="object-fill h-full" src={image} alt="placeholder" />
					) : (
						<button type="button" onClick={handlePencilClick} className="focus:border-none">
							<img className="object-fill h-full" src={placeholder} alt="placeholder" />
						</button>
					)}
				</div>
				<div className="flex gap-2">
					<Button variant="icon" size="icon" onClick={handlePencilClick}>
						<PencilIcon className="fill-cosmos-label" />
					</Button>
					<Button variant="icon" size="icon">
						<TrashIcon className="fill-cosmos-label" />
					</Button>
					<input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
				</div>
			</div>
		</div>
	);
};

export default GeneralTab;
