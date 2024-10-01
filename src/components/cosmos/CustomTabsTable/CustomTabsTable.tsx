import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useEffect, useRef, useState } from "react";
import EditableCell from "./EditableCell";
import type { TabsTableProps } from "./types";

const CustomTabsTable = <TData, TValue>({ columns, data: initialData }: TabsTableProps<TData, TValue>) => {
	const [state, setState] = useState({
		editData: initialData,
		selectedRowIndex: null as number | null,
		editingRowIndex: null as number | null,
		newRowData: {} as Record<string, TValue>,
		resetNewRow: false,
	});

	const tableRef = useRef<HTMLDivElement>(null);
	let clickTimeout: NodeJS.Timeout | null = null;

	const table = useReactTable({
		data: state.editData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			updateData: useCallback((rowIndex: number, columnId: string, value: unknown) => {
				setState((prevState) => ({
					...prevState,
					editData: prevState.editData.map((row, index) => (index === rowIndex ? { ...row, [columnId]: value } : row)),
				}));
			}, []),
			updateNewRowData: useCallback((columnId: string, value: unknown) => {
				setState((prevState) => ({
					...prevState,
					newRowData: { ...prevState.newRowData, [columnId]: value as TValue },
				}));
			}, []),
			resetNewRow: state.resetNewRow,
		},
	});

	// Agregar la nueva fila si todos los valores están completos
	const handleAddRow = useCallback(() => {
		const isRowComplete = Object.values(state.newRowData).every((value) => value !== undefined && value !== "");
		if (isRowComplete) {
			setState((prevState) => ({
				...prevState,
				editData: [...prevState.editData, prevState.newRowData as TData],
				newRowData: {},
				resetNewRow: true,
			}));
		} else {
			console.log("Complete all fields before adding the row");
		}
	}, [state.newRowData]);

	// Maneja la detección de teclas (Enter o Insert)
	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Enter" || event.key === "Insert") {
				handleAddRow();
			}
		},
		[handleAddRow],
	);

	// Obtenemos el index de la fila seleccionada
	const handleRowClick = useCallback(
		(rowIndex: number) => {
			console.log("Single click: ", table.getRowModel().rows[rowIndex].original);
			setState((prevState) => ({ ...prevState, selectedRowIndex: rowIndex }));
		},
		[table],
	);

	const handleRowDoubleClick = useCallback(
		(rowIndex: number) => {
			console.log("Double click: ", table.getRowModel().rows[rowIndex].original);
			setState((prevState) => ({ ...prevState, editingRowIndex: rowIndex }));
		},
		[table],
	);

	const handleRowClickHandler = useCallback(
		(rowIndex: number) => {
			if (clickTimeout) clearTimeout(clickTimeout);
			clickTimeout = setTimeout(() => {
				handleRowClick(rowIndex);
				clickTimeout = null;
			}, 200);
		},
		[handleRowClick],
	);

	const handleRowDoubleClickHandler = useCallback(
		(rowIndex: number) => {
			if (clickTimeout) clearTimeout(clickTimeout);
			handleRowDoubleClick(rowIndex);
		},
		[handleRowDoubleClick],
	);

	useEffect(() => {
		const handleKeyPressWrapper = (e: KeyboardEvent) => handleKeyPress(e);
		window.addEventListener("keydown", handleKeyPressWrapper);
		return () => {
			window.removeEventListener("keydown", handleKeyPressWrapper);
		};
	}, [handleKeyPress]);

	useEffect(() => {
		if (state.resetNewRow) {
			setState((prevState) => ({ ...prevState, resetNewRow: false }));
		}
	}, [state.resetNewRow]);

	// Seteamos la data inicial en la tabla
	useEffect(() => {
		setState((prevState) => ({ ...prevState, editData: initialData }));
	}, [initialData]);

	return (
		<ScrollArea
			ref={tableRef}
			className="flex flex-col w-full h-auto overflow-auto border border-cosmos-border max-h-72"
		>
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
							onClick={() => handleRowClickHandler(rowIndex)}
							onDoubleClick={() => handleRowDoubleClickHandler(rowIndex)}
							className={`bg-white text-cosmos-texto hover:bg-cosmos-table-seleccion cursor-pointer ${
								state.selectedRowIndex === rowIndex ? "bg-cosmos-table-seleccion" : ""
							}`}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell
									key={cell.id}
									className="p-5"
									style={{ textAlign: cell.column.columnDef.meta?.type === "checkbox" ? "center" : "left" }}
								>
									{state.editingRowIndex === rowIndex ? (
										<EditableCell getValue={cell.getValue} table={table} column={cell.column} row={row} />
									) : (
										flexRender(cell.column.columnDef.cell, cell.getContext())
									)}
								</TableCell>
							))}
						</TableRow>
					))}
					<TableRow>
						{table.getHeaderGroups()[0].headers.map((header) => (
							<TableCell
								key={`new-row-${header.id}`}
								className="p-5"
								style={{ textAlign: header.column.columnDef.meta?.type === "checkbox" ? "center" : "left" }}
							>
								<EditableCell table={table} column={header.column} />
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</ScrollArea>
	);
};

export default CustomTabsTable;
