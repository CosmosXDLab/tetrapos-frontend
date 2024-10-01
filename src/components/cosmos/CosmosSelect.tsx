import { ChevronDownIcon } from "@radix-ui/react-icons";
import React from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface SelectOptions {
	value: string;
	label: string;
}

interface BaseSelectProps {
	id?: string;
	required?: boolean;
	showLabel?: boolean;
	label?: string;
	placeholder?: string;
	selectLabel?: string;
	options?: SelectOptions[];
	icon?: React.ReactNode;
	disabled?: boolean;
	value?: string; // Agrega el valor actual
	defaultValue?: string; // Para valores por defecto
	onValueChange?: (value: string) => void;
}

export type SelectProps = BaseSelectProps;

const CosmosSelect = React.forwardRef<HTMLDivElement, SelectProps>(
	({
		id,
		required,
		label,
		placeholder,
		showLabel,
		selectLabel,
		options,
		icon,
		disabled = false,
		value, // Recibimos value aquí
		defaultValue,
		onValueChange,
		...props
	}) => {
		const handleValueChange = (value: string) => {
			if (!disabled && onValueChange) {
				onValueChange(value);
			}
		};

		return (
			<div className="flex flex-col items-start justify-center gap-4">
				{showLabel && label && (
					<Label htmlFor={id} className="font-normal">
						{label} {required && <span className="text-red-500">*</span>}
					</Label>
				)}

				<Select
					onValueChange={handleValueChange}
					value={value} // Usamos el valor controlado aquí
					defaultValue={defaultValue}
					disabled={disabled}
					{...props}
				>
					<SelectTrigger icon={icon || <ChevronDownIcon />} className={disabled ? "cursor-not-allowed opacity-50" : ""}>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					{!disabled && (
						<SelectContent>
							<SelectGroup>
								{selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
								{options?.map(({ label, value }) => (
									<SelectItem key={value} value={value}>
										{label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					)}
				</Select>
			</div>
		);
	},
);

CosmosSelect.displayName = "CosmosSelect";

export { CosmosSelect };
