import ClosedEyeIcon from "@/components/icons/ClosedEyeIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@/types/products";
import { cn } from "@/utils/tailwindCN";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export const columns: ColumnDef<Product>[] = [
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
		accessorKey: "kind",
		header: "Tipo de producto",
	},
	{
		accessorKey: "classification",
		header: "Clasificación",
	},
	{
		accessorKey: "product_category",
		header: "Categoría",
		cell: ({ row }) => {
			return <div>{row.original.product_category.name}</div>;
		},
	},
	{
		accessorKey: "product_family",
		header: "Familia",
		cell: ({ row }) => {
			return <div>{row.original.product_family.name}</div>;
		},
	},
	{
		accessorKey: "state",
		header: "Estado",
		cell: ({ row }) => {
			return (
				<div className="bg-cosmos-label rounded-full text-white px-2 py-1.5 text-center w-20">{row.original.state}</div>
			);
		},
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

					{/* {isModalOpen && (
						<UpdateCustomerModal customerID={row.original.id} isOpen={isModalOpen} onClose={handleCloseModal} />
					)} */}
				</div>
			);
		},
	},
];
