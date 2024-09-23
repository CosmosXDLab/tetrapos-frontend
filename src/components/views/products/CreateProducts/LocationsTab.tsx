import CustomTabsTable from "@/components/cosmos/CustomTabsTable/CustomTabsTable";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/utils/tailwindCN";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type BarcodeData = {
	id: string;
	almacen: string;
	ubicacion: string;
	stockDisponible: number;
	stockReservado: number;
	stockTotal: number;
	principal: boolean;
};

const columns: ColumnDef<BarcodeData>[] = [
	{
		accessorKey: "almacen",
		header: "Almacén",
		meta: {
			type: "select",
			options: [
				{ label: "Almacén Pisco", value: "Almacén Pisco" },
				{ label: "Almacén Chincha", value: "Almacén Chincha" },
				{ label: "Almacén Ica", value: "Almacén Ica" },
			],
		},
	},
	{
		accessorKey: "ubicacion",
		header: "Ubicación",
		meta: {
			type: "text",
		},
	},
	{
		accessorKey: "stockDisponible",
		header: "Stock disponible",
		meta: {
			type: "number",
		},
	},
	{
		accessorKey: "stockReservado",
		header: "Stock reservado",
		meta: {
			type: "number",
		},
	},
	{
		accessorKey: "stockTotal",
		header: "Stock total",
		meta: {
			type: "number",
		},
	},
	{
		accessorKey: "principal",
		header: "Principal",
		cell: ({ row }) => (
			<Checkbox
				className={cn(row.getIsSelected() ? "border-none" : "")}
				disabled
				checked={row.getIsSelected()}
				onCheckedChange={(value) => {
					row.toggleSelected(!!value);
				}}
				aria-label="Seleccionar fila"
			/>
		),
		meta: {
			type: "checkbox",
		},
	},
];

const LocationsTab = () => {
	const [data, setData] = useState<BarcodeData[]>();

	useEffect(() => {
		setData([
			{
				id: "1",
				almacen: "Almacén Pisco",
				ubicacion: "Anaquel 1A",
				stockDisponible: 236,
				stockReservado: 0,
				stockTotal: 236,
				principal: true,
			},
			{
				id: "2",
				almacen: "Almacén Pisco",
				ubicacion: "Anaquel 1B",
				stockDisponible: 0,
				stockReservado: 0,
				stockTotal: 0,
				principal: false,
			},
			{
				id: "3",
				almacen: "Almacén Pisco",
				ubicacion: "Anaquel 1C",
				stockDisponible: 0,
				stockReservado: 0,
				stockTotal: 0,
				principal: false,
			},
			{
				id: "4",
				almacen: "Almacén Pisco",
				ubicacion: "Anaquel 1D",
				stockDisponible: 0,
				stockReservado: 0,
				stockTotal: 0,
				principal: false,
			},
			{
				id: "5",
				almacen: "Almacén Pisco",
				ubicacion: "Anaquel 1E",
				stockDisponible: 0,
				stockReservado: 0,
				stockTotal: 0,
				principal: false,
			},
		]);
	}, []);

	// log when data is updated
	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div>
			<CustomTabsTable columns={columns} data={data || []} />
		</div>
	);
};

export default LocationsTab;
