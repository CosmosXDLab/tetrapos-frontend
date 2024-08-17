import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
    {
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Seleccionar todos"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				className={cn(row.getIsSelected() ? "border-none" : "")}
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Seleccionar fila"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "fechaApertura",
		header: "Fecha de apertura",
	},
	{
		accessorKey: "FechaCierre",
		header: "Fecha de cierre",
	},
	{
		accessorKey: "actions",
		header: "",
		cell: () => {
			return (
				<div className="flex gap-2">
					<Button variant={"outline"} size={"icon"} className="border-2 border-label">
						eye
					</Button>
					<Button variant={"outline"} size={"icon"} className="border-2 border-label">
						pen
					</Button>
				</div>
			);
		},
	},
]