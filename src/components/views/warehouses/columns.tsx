import { Button } from "@/components/ui/button";
import ClosedEyeIcon from "@/components/icons/ClosedEyeIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Warehouse } from "@/types/warehouses";
import type { ColumnDef } from "@tanstack/react-table";
import UpdateWarehousesModal from "./updateWarehousesModal";
import { useState } from "react";

export const columns: ColumnDef<Warehouse>[] = [
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
        accessorKey: "code",
        header: "Código",
    },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "description",
        header: "Descripción",
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
					<Button variant={"icon"} size={"icon"} onClick={() => console.log(row.original.name)}>
						<ClosedEyeIcon className="fill-current" />
					</Button>
					<Button variant={"icon"} size={"icon"} onClick={handleOpenModal}>
						<PencilIcon className="fill-current" />
					</Button>

					{isModalOpen && (
						<UpdateWarehousesModal warehouseID={row.original.id} isOpen={isModalOpen} onClose={handleCloseModal} />
					)}
				</div>
			);
		},
	},
];
