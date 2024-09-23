import { CosmosInput } from "@/components/cosmos/CosmosInput";
import { CosmosSelect } from "@/components/cosmos/CosmosSelect";
import { Checkbox } from "@/components/ui/checkbox";
import type { RowData } from "@tanstack/react-table";
import { type ChangeEvent, useEffect, useState } from "react";
import type { EditableCellProps } from "../../../../../cosmos/CustomTabsTable/types";

const EditableCell = <TData extends RowData>({ getValue, table, column, row }: EditableCellProps<TData>) => {
	const initialValue = getValue() ?? "";
	const columnMeta = column.columnDef.meta;
	const tableMeta = table.options.meta;
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue ?? "");
	}, [initialValue]);

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setValue(e.target.value);
		tableMeta?.updateData(row.index, column.id, e.target.value);
	};

	const onSelectionChange = (value: string) => {
		setValue(value);
		tableMeta?.updateData(row.index, column.id, value);
	};

	const renderInput = () => {
		switch (columnMeta?.type) {
			case "select":
				// Renderizar un select si el tipo es 'select'
				return <CosmosSelect options={columnMeta.options} onValueChange={onSelectionChange} />;
			case "number":
				// Renderizar un input de tipo number
				return <CosmosInput type="number" value={value} onChange={onChange} placeholder="Ingresa un número" />;

			case "checkbox":
				// Renderizar un input de tipo checkbox
				return (
					<Checkbox
						checked={value as boolean}
						onCheckedChange={(value) => {
							setValue(value);
							tableMeta?.updateData(row.index, column.id, value);
						}}
						aria-label="Seleccionar fila"
					/>
				);
			default:
				// Renderizar un input de tipo text por defecto
				return <CosmosInput type="text" value={value} onChange={onChange} placeholder="Ingresa un valor" />;
		}
	};

	return <div>{renderInput()}</div>;
};

export default EditableCell;
