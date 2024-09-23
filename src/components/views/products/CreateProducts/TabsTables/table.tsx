import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/utils/tailwindCN";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import type { TabsTableProps } from "../../../../cosmos/CustomTabsTable/types";
import EditableCell from "./Locations/EditableCell";

const TabsTable = <TData, TValue>({ columns, data }: TabsTableProps<TData, TValue>) => {
	const [editData, setEditData] = useState<TData[]>(data);
	const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
	const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null); // Nuevo estado para la fila en modo edición

	const table = useReactTable({
		data: editData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			updateData: (rowIndex: number, columnId: string, value: unknown) => {
				setEditData((prev) => prev.map((row, index) => (index === rowIndex ? { ...row, [columnId]: value } : row)));
			},
		},
	});

	const handleSelectRow = useCallback(
		(rowIndex: number) => {
			setSelectedRowIndex(rowIndex === selectedRowIndex ? null : rowIndex);
		},
		[selectedRowIndex],
	);

	const handleDoubleClick = useCallback((rowIndex: number) => {
		setEditingRowIndex(rowIndex); // Activar el modo edición para esta fila
	}, []);

	useEffect(() => {
		setEditData(data);
	}, [data]);

	return (
		<ScrollArea className="flex flex-col w-full h-auto overflow-auto border border-cosmos-border max-h-72">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} className="px-4">
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row, rowIndex) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
							onClick={() => handleSelectRow(rowIndex)}
							onDoubleClick={() => handleDoubleClick(rowIndex)} // Activar edición al hacer doble clic
							// className={`px-4 border-b border-cosmos-border cursor-pointer ${
							// 	selectedRowIndex === rowIndex ? "bg-cosmos-table-seleccion" : ""
							// }`}
							className={cn(
								"px-4 border-b border-cosmos-border cursor-pointer",
								selectedRowIndex === rowIndex && "bg-cosmos-table-seleccion",
								editingRowIndex === rowIndex && "bg-cosmos-table-seleccion",
							)}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell className="px-4 py-2" key={cell.id}>
									{editingRowIndex === rowIndex ? ( // Si la fila está en modo edición, renderizar los inputs editables
										<EditableCell getValue={cell.getValue} table={table} column={cell.column} row={row} />
									) : (
										flexRender(cell.column.columnDef.cell, cell.getContext()) // Si no, renderizar normalmente
									)}
								</TableCell>
							))}
						</TableRow>
					))}
					{/* Default Row */}
					<TableRow key="editableCell">
						{table.getAllColumns().map((column) => (
							<TableCell key={column.id} className="px-4 py-2">
								<EditableCell
									getValue={() => ""} // Default to empty for the new row
									table={table}
									column={column}
									row={{ index: table.getRowModel().rows.length }} // New row index
								/>
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</ScrollArea>
	);
};

export default TabsTable;
