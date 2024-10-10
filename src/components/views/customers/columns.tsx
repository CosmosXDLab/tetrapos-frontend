import CosmosModal from "@/components/cosmos/CosmosModal";
import ClosedEyeIcon from "@/components/icons/ClosedEyeIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useModal } from "@/hooks/useModal";
import type { Customer } from "@/types";
import { cn } from "@/utils/tailwindCN";
import type { ColumnDef } from "@tanstack/react-table";
import UpdateCustomerModal from "./UpdateCustomerModal";
import { useState } from "react";

export const columns: ColumnDef<Customer>[] = [
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
		accessorKey: "business_name",
		header: "Nombre o Razón social",
		cell: ({ row }) => {
			return (
				<span className="font"> {/* Modificación de columna en negrita */}
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
	{
		accessorKey: "actions",
		header: "",
		cell: ({ row }) => {
			const [isModalOpen, setIsModalOpen] = useState(false);

			const handleOpenModal = () => {
				setIsModalOpen(true);
			};

			const handleCloseModal = () => {
				setIsModalOpen(false);
			};

			return (
				<div className="flex gap-2">
					<Button variant={"icon"} size={"icon"} onClick={() => console.log(row.original.id)}>
						<ClosedEyeIcon className="fill-current" />
					</Button>
					<Button variant={"icon"} size={"icon"} onClick={handleOpenModal}>
						<PencilIcon className="fill-current" />
					</Button>

					{isModalOpen && (
						<UpdateCustomerModal customerID={row.original.id} isOpen={isModalOpen} onClose={handleCloseModal} />
					)}
				</div>
			);
		},
	},
];
