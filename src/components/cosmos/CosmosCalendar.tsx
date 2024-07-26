import { format } from "date-fns";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Label } from "../ui/label";

interface CosmosCalendarProps {
	id: string;
	showLabel: boolean;
	label?: string;
	placeholder?: string;
	required?: boolean;
	onDateChange: (date: string) => void;
}

const CosmosCalendar = ({
	id,
	showLabel,
	label,
	placeholder,
	required,
	onDateChange,
	...props
}: CosmosCalendarProps) => {
	const [value, setValue] = useState<Date | undefined>(new Date());

	const handleDateChange = (date: Date | undefined) => {
		setValue(date);
		if (date) {
			onDateChange(date.toISOString());
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="flex flex-col items-start justify-center gap-4">
					{showLabel && label && (
						<Label htmlFor={id} className="font-normal">
							{label} {required && <span className="text-red-500">*</span>}
						</Label>
					)}
					<Button variant={"input"}>
						{value ? (
							format(value, "dd/MM/yyyy")
						) : (
							<span>Selecciona una fecha</span>
						)}
						<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
					</Button>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={value}
					onSelect={handleDateChange}
					disabled={(date) =>
						date > new Date() || date < new Date("1900-01-01")
					}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export default CosmosCalendar;
