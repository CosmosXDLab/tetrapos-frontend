import { format } from "date-fns";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";

interface CosmosCalendarProps {
	id?: string;
	showLabel: boolean;
	label?: string;
	placeholder?: string;
	required?: boolean;
	selected?: string; // Cambiado a string para toISOString
	onSelect?: (date: string | undefined) => void; // Cambiado a string para toISOString
}

const CosmosCalendar = ({
	id,
	showLabel,
	label,
	placeholder,
	required,
	selected,
	onSelect
}: CosmosCalendarProps) => {
	const handleSelect = (date: Date | undefined) => {
		if (date) {
			onSelect?.(date.toISOString());
		} else {
			onSelect?.(undefined);
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
						{selected ? (
							format(new Date(selected), "dd/MM/yyyy")
						) : (
							<span>{placeholder || "Selecciona una fecha"}</span>
						)}
						<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
					</Button>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={selected ? new Date(selected) : undefined}
					onSelect={handleSelect}
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
