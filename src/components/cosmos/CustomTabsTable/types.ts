import type { Column, ColumnDef, Getter, Row, RowData, Table } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}

	interface ColumnMeta<TData extends RowData, TValue> {
		type: "text" | "number" | "select" | "checkbox";
		options?: { value: string; label: string }[];
	}
}

export interface TabsTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export interface EditableCellProps<TData extends RowData> {
	getValue: Getter<unknown>;
	row: Row<TData>;
	column: Column<TData, unknown>;
	table: Table<TData>;
}
