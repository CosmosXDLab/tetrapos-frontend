import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { EntityCliente } from "@/utils/entities/cliente";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<EntityCliente>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
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
		accessorKey: "business_name",
		header: "Nombre o Razón social",
		cell: ({ row }) => {
			return (
				<span className="font-semibold">
					{row.original.identification_document_type === "RUC"
						? row.original.business_name
						: `${row.original.first_names} ${row.original.last_names}`}
				</span>
			);
		},
	},
	{
		accessorKey: "identification_document_type",
		header: "Tipo de documento",
	},
	{
		accessorKey: "identification_document_number",
		header: "Número de documento",
	},
	{
		accessorKey: "phone_number",
		header: "Télefono",
	},
	{
		accessorKey: "email",
		header: "Correo",
	},
	// {
	// 	accessorKey: "actions",
	// 	header: "",
	// 	cell: () => {
	// 		return (
	// 			<div className="flex gap-2">
	// 				<Button
	// 					variant={"outline"}
	// 					size={"icon"}
	// 					className="border-2 border-label"
	// 				>
	// 					<EyeOpenIcon />
	// 				</Button>
	// 				<Button
	// 					variant={"outline"}
	// 					size={"icon"}
	// 					className="border-2 border-label"
	// 				>
	// 					<Pencil1Icon className="fill-current" />
	// 				</Button>
	// 			</div>
	// 		);
	// 	},
	// },
];
