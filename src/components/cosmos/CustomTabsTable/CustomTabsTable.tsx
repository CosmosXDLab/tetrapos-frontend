import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ColumnMeta, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import type { TabsTableProps } from "./types";

const CustomTabsTable = <TData, TValue>({ columns, data }: TabsTableProps<TData, TValue>) => {
	const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
	const [newRowData, setNewRowData] = useState<Record<string, unknown>>({});
	const tableRef = useRef<HTMLDivElement>(null);
	let clickTimeout: NodeJS.Timeout | null = null;

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			updateData: (rowIndex: number, columnId: string, value: unknown) => {
				console.log("updateData", rowIndex, columnId, value);
			},
		},
	});

	const handleRowClick = (rowIndex: number) => {
		const rowData = table.getRowModel().rows[rowIndex].original;
		console.log("Single click: ", rowData);
		setSelectedRowIndex(rowIndex);
	};

	const handleRowDoubleClick = (rowIndex: number) => {
		const rowData = table.getRowModel().rows[rowIndex].original;
		console.log("Double click: ", rowData);
	};

	const handleRowClickHandler = (rowIndex: number) => {
		if (clickTimeout) clearTimeout(clickTimeout);
		clickTimeout = setTimeout(() => {
			handleRowClick(rowIndex);
			clickTimeout = null;
		}, 200);
	};

	const handleRowDoubleClickHandler = (rowIndex: number) => {
		if (clickTimeout) clearTimeout(clickTimeout);
		handleRowDoubleClick(rowIndex);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
			setSelectedRowIndex(null);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleInputChange = (columnId: string, value: any) => {
		setNewRowData((prev) => ({ ...prev, [columnId]: value }));
	};

	const renderInputCell = (columnId: string, meta: ColumnMeta<TData, unknown> | undefined) => {
		const value = newRowData[columnId] || "";
		const metaType = meta?.type || "text";
		const metaOptions = meta?.options || [];

		const commonProps = {
			className: "w-20",
			value: value as string,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(columnId, e.target.value),
		};

		switch (metaType) {
			case "text":
			case "number":
				return <Input {...commonProps} type={metaType} min={metaType === "number" ? 0 : undefined} />;
			case "select":
				return (
					<Select onValueChange={(val) => handleInputChange(columnId, val)} value={value as string}>
						<SelectTrigger className="w-20">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							{metaOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			case "checkbox":
				return (
					<Checkbox checked={Boolean(value)} onCheckedChange={(checked) => handleInputChange(columnId, checked)} />
				);
			default:
				return null;
		}
	};

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
								selectedRowIndex === rowIndex ? "bg-cosmos-table-seleccion" : ""
							}`}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell
									key={cell.id}
									className="p-5"
									style={{ textAlign: cell.column.columnDef.meta?.type === "checkbox" ? "center" : "left" }}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
								{renderInputCell(header.id, header.column.columnDef.meta)}
							</TableCell>
						))}
					</TableRow>
				</TableBody>
			</Table>
		</ScrollArea>
	);
};

export default CustomTabsTable;
