import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TabsTableProps } from "../../../../../cosmos/CustomTabsTable/types";
import EditableCell from "./EditableCell";

const LocationsTable = <TData, TValue>({ data, columns }: TabsTableProps<TData, TValue>) => {
	const [editData, setEditData] = useState<TData[]>(data);
	const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
	const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null); // Para modo editable
	const scrollAreaRef = useRef<HTMLDivElement | null>(null);

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

	const isRowEmpty = (row: TData & Record<string, unknown>) => Object.values(row).every((value) => !value);

	// Seleccionar fila
	const handleSelectRow = useCallback(
		(rowIndex: number) => {
			setSelectedRowIndex(rowIndex === selectedRowIndex ? null : rowIndex);
		},
		[selectedRowIndex],
	);

	// Eliminar fila seleccionada
	const handleSelectRowDelete = useCallback(() => {
		if (selectedRowIndex !== null) {
			setEditData((prev) => {
				const updatedData = prev.filter((_, index) => index !== selectedRowIndex);
				// Si después de eliminar no hay fila vacía al final, añadir una
				if (!isRowEmpty(updatedData[updatedData.length - 1])) {
					return [...updatedData, {} as TData];
				}
				return updatedData;
			});
			setSelectedRowIndex(null);
		}
	}, [selectedRowIndex]);

	// Agregar fila vacía si la última no está vacía
	const handleSelectRowAdd = useCallback(() => {
		const lastRow = editData[editData.length - 1];
		if (lastRow && !isRowEmpty(lastRow)) {
			setEditData((prev) => [...prev, {} as TData]);
		}
	}, [editData]);

	// Editar fila seleccionada
	const handleRowEdit = useCallback((rowIndex: number) => {
		setEditingRowIndex(rowIndex); // Activa el modo editable para la fila seleccionada
	}, []);

	// Manejar la tecla Enter o Delete
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Delete" || event.key === "Backspace") {
				console.log("Delete or Backspace key pressed");
				handleSelectRowDelete();
			}
			if ((event.key === "Insert" || event.key === "Enter") && !event.repeat) {
				console.log("Insert or Enter key pressed");
				handleSelectRowAdd();
			}
		},
		[handleSelectRowAdd, handleSelectRowDelete],
	);

	// Validar fila vacía al crear una nueva fila
	useEffect(() => {
		if (editData.length === 0 || !isRowEmpty(editData[editData.length - 1])) {
			setEditData((prev) => [...prev, {} as TData]);
		}
	}, [editData]);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	useEffect(() => {
		setEditData(data);
	}, [data]);

	const scrollToBottom = () => {
		if (scrollAreaRef.current) {
			setTimeout(() => {
				scrollAreaRef.current?.scrollTo({
					top: scrollAreaRef.current.scrollHeight,
					behavior: "smooth",
				});
			}, 100);
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [editData]);

	return (
		<ScrollArea
			ref={scrollAreaRef}
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
							onClick={() => handleSelectRow(rowIndex)}
							onDoubleClick={() => handleRowEdit(rowIndex)} // Doble clic para editar
							data-state={row.getIsSelected() && "selected"}
							className={`px-4 border-b border-cosmos-border cursor-pointer ${selectedRowIndex === rowIndex ? "" : ""}`}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell className="px-4 py-2" key={cell.id}>
									{editingRowIndex === rowIndex ? (
										<EditableCell getValue={cell.getValue} table={table} column={cell.column} row={row} />
									) : (
										flexRender(cell.column.columnDef.cell, cell.getContext())
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ScrollArea>
	);
};

export default LocationsTable;
