import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { DataTableProps } from "./types";
import "./CustomDataTable.css";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";

const CustomDataTable = <TData extends { id: string | number }, TValue>({
	columns,
	data,
	onRowSelectionChange, // New prop to notify parent component about selection changes
}: DataTableProps<TData, TValue> & { onRowSelectionChange: (selected: Record<string, TData>) => void }) => {
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection,
		},
	});

	// Compute selectedRowsData using useMemo
	const selectedRowsData = useMemo(() => {
		const selectedData: Record<string, TData> = {};
		for (const rowId in rowSelection) {
			if (rowSelection[rowId]) {
				const row = table.getRow(rowId);
				selectedData[rowId] = row.original;
			}
		}
		return selectedData;
	}, [rowSelection, table]);

	// Trigger the onRowSelectionChange callback after rendering
	useEffect(() => {
		onRowSelectionChange(selectedRowsData);
	}, [selectedRowsData, onRowSelectionChange]);

	return (
		<Table className="table-container">
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id} className="table-head">
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow className="table-body-row" key={row.id} data-state={row.getIsSelected() && "selected"}>
							{row.getVisibleCells().map((cell) => (
								<TableCell className="p-5" key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-24 text-center">
							Sin resultados
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default CustomDataTable;
