import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id?: string;
	required?: boolean;
	showLabel?: boolean;
	label?: string;
	placeholder?: string;
	iconStart?: React.ReactNode;
	iconEnd?: React.ReactNode;
}

export type InputProps = BaseInputProps;

const CosmosInput = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id,
			required,
			label,
			placeholder,
			showLabel,
			iconStart,
			iconEnd,
			type,
			...props
		},
		ref,
	) => {
		return (
			<div className="relative flex flex-col items-start justify-center gap-4">
				{showLabel && label && (
					<Label htmlFor={id} className="font-normal">
						{label} {required && <span className="text-red-500">*</span>}
					</Label>
				)}

				<div className="relative w-full">
					{iconStart && (
						<span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							{iconStart}
						</span>
					)}

					<Input
						ref={ref}
						type={type}
						placeholder={placeholder}
						className={`w-full ${iconStart ? "pl-10" : "pl-3"} ${iconEnd ? "pr-10" : "pr-3"}`}
						{...props}
					/>

					{iconEnd && (
						<span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
							{iconEnd}
						</span>
					)}
				</div>
			</div>
		);
	},
);

CosmosInput.displayName = "CosmosInput";

export { CosmosInput };
