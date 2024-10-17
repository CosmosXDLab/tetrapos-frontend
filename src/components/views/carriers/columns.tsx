import { Button } from "@/components/ui/button";
import ClosedEyeIcon from "@/components/icons/ClosedEyeIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Carriers } from "@/types/carriers";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export const columns: ColumnDef<Carriers>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => {
					table.toggleAllPageRowsSelected(!!value);
				}}
				aria-label="Seleccionar todos"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				className={cn(row.getIsSelected() ? "border-none" : "")}
				checked={row.getIsSelected()}
				onCheckedChange={(value) => {
					row.toggleSelected(!!value);
				}}
				aria-label="Seleccionar fila"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
    {
        accessorKey: "identification_document_number",
        header: "Número de documento",
    },
    {
        accessorKey: "license_number",
        header: "Número de serie",
    },
    {
        accessorKey: "identification_document_type",
        header: "Documento del cliente",
    },
    {
        accessorKey: "first_names",
        header: "Nombre del cliente",
    },
    {
        accessorKey: "business_name",
        header: "Fecha de emisión", 
    },
    {
        accessorKey: "last_names", 
        header: "Estado",
    },
	{
		accessorKey: "actions",
		header: "",
		cell: ({row}) => {
			const [isModalOpen, setIsModalOpen] = useState(false);

			const handleOpenModal = () => {
				setIsModalOpen(true);
			};

			const handleCloseModal = () => {
				setIsModalOpen(false);
			};

			return (
				<div className="flex gap-2">
					<Button variant={"icon"} size={"icon"} onClick={() => console.log(row.original.first_names)}>
						<ClosedEyeIcon className="fill-current" />
					</Button>
					<Button variant={"icon"} size={"icon"} onClick={handleOpenModal}>
						<PencilIcon className="fill-current" />
					</Button>

					{isModalOpen && (
						<UpdateCarriersModal carrierID={row.original.id} isOpen={isModalOpen} onClose={handleCloseModal} />
					)}
				</div>
			);
		},
	},
];
