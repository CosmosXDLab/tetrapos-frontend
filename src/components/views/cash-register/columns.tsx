import ClosedEyeIcon from "@/components/icons/ClosedEyeIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatDateSchema } from "@/lib/utils";
import { CashRegister } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import UpdateCashRegisterModal from "./UpdateCashRegisterModal";

export const columns: ColumnDef<CashRegister>[] = [
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
		accessorKey: "opening_date",
		header: "Fecha de apertura",
		cell: ({ row }) => {
			return row.original.opening_date ? formatDateSchema(new Date(row.original.opening_date), 5) : '-';
		}
	},
	{
		accessorKey: "closing_date",
		header: "Fecha de cierre",
		cell: ({ row }) => {
			return row.original.closing_date ? formatDateSchema(new Date(row.original.closing_date), 5) : '(En curso)';
		}
	},
	{
		accessorKey: "actions",
		header: "",
		cell: ({ row }) => {
			const [isModalOpen, setIsModalOpen] = useState({ show: false, ispreview: false });

			const handleOpenModal = (ispreview: boolean = false) => {
				setIsModalOpen(() => ({ show: true, ispreview }));
			};

			const handleCloseModal = () => {
				setIsModalOpen(() => ({ show: false, ispreview: false }));
			};
		
			return (
				<div className="flex gap-2">
					<Button variant={"icon"} size={"icon"} onClick={() => handleOpenModal(true)}>
						<ClosedEyeIcon className="fill-current" />
					</Button>
					<Button variant={"icon"} size={"icon"} onClick={() => handleOpenModal()}>
						<PencilIcon className="fill-current" />
					</Button>

					{isModalOpen && (
						<UpdateCashRegisterModal cashRegisterID={row.original.id} isOpen={isModalOpen.show} isPreview={isModalOpen.ispreview} onClose={handleCloseModal} />
					)}
				</div>
			);
		},
	},
]