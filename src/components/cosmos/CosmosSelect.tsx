import React from "react";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface SelectOptions {
	value: string;
	label: string;
}

interface BaseSelectProps {
	id?: string;
	required?: boolean;
	showLabel: boolean;
	label?: string;
	placeholder?: string;
	selectLabel?: string;
	options: SelectOptions[];
	icon?: React.ReactNode;
	onValueChange: (value: string) => void;
}

export type SelectProps = BaseSelectProps;

const CosmosSelect = React.forwardRef<HTMLDivElement, SelectProps>(
	(
		{
			id,
			required,
			label,
			placeholder,
			showLabel,
			selectLabel,
			options,
			icon,
			onValueChange,
			...props
		},
		ref,
	) => {
		return (
			<div className="flex flex-col items-start justify-center gap-4">
				{showLabel && label && (
					<Label htmlFor={id} className="font-normal">
						{label} {required && <span className="text-red-500">*</span>}
					</Label>
				)}
				<Select
					onValueChange={onValueChange}
					{...props}
					defaultValue={options[0].value}
				>
					<SelectTrigger icon={icon || <ChevronDownIcon />}>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
							{options.map(({ label, value }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		);
	},
);

CosmosSelect.displayName = "CosmosSelect";

export { CosmosSelect };
