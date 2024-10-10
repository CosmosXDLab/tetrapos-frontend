import { CosmosInput } from "@/components/cosmos/CosmosInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RowData } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { EditableCellProps } from "./types";

type ValueType = string | number | boolean;

const EditableCell = <TData extends RowData>({ getValue, table, column, row }: EditableCellProps<TData>) => {
	const initialValue = getValue ? getValue() : ""; // Valor inicial de la celda
	const columnMeta = column.columnDef.meta;
	const tableMeta = table.options.meta;

	// Función para definir valores predeterminados basados en el tipo de columna
	const getDefaultValue = () => {
		switch (columnMeta?.type) {
			case "select":
				return "Seleccionar"; // Valor predeterminado para select
			case "number":
				return 0; // Valor predeterminado para números
			case "checkbox":
				return false; // Valor predeterminado para checkbox
			default:
				return ""; // Valor predeterminado para texto
		}
	};

	// Estado local con tipo definido y valor predeterminado si es necesario
	const [value, setValue] = useState<ValueType>(
		initialValue === null || initialValue === undefined || initialValue === ""
			? getDefaultValue()
			: (initialValue as ValueType),
	);

	// Sincronizar el valor cuando el valor inicial cambia
	useEffect(() => {
		setValue(
			initialValue === null || initialValue === undefined || initialValue === ""
				? getDefaultValue()
				: (initialValue as ValueType),
		);
	}, [initialValue]);

	// Resetear el valor si el estado resetNewRow es true
	useEffect(() => {
		if (tableMeta?.resetNewRow) {
			setValue(getDefaultValue()); // Establece el valor predeterminado para restablecer el input
		}
	}, [tableMeta?.resetNewRow]);

	// Actualiza el valor en la tabla cuando cambia
	const updateTableData = (updatedValue: ValueType) => {
		setValue(updatedValue); // Actualizar el valor local
		tableMeta?.updateData(row?.index ?? 0, column.id, updatedValue); // Actualizar los datos de la tabla
	};

	const addNewRowData = (updatedValue: ValueType) => {
		setValue(updatedValue); // Actualizar el valor local
		tableMeta?.updateNewRowData(column.id, updatedValue); // Actualizar los datos de la nueva fila
	};

	// Manejo de cambio para input/select
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const newValue = e.target.value;
		if (row) {
			updateTableData(newValue);
		} else {
			addNewRowData(newValue);
		}
	};

	// Manejo de cambio para checkbox
	const handleCheckboxChange = (isChecked: boolean) => {
		updateTableData(isChecked);
	};

	const renderInput = () => {
		switch (columnMeta?.type) {
			case "select":
				return (
					<Select
						value={value as string}
						onValueChange={(newValue) => {
							setValue(newValue); // Actualiza el valor localmente
							if (row) {
								updateTableData(newValue); // Si hay una fila existente, actualiza la tabla
							} else {
								addNewRowData(newValue); // Si es una nueva fila, actualiza la nueva fila
							}
						}}
					>
						<SelectTrigger className="max-w-24">
							<SelectValue placeholder="Seleccionar" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{columnMeta.options?.map(({ label, value }) => (
									<SelectItem key={value} value={value}>
										{label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				);
			case "number":
				return (
					<CosmosInput
						type="number"
						value={value as number}
						onChange={handleInputChange}
						placeholder="Ingresa un número"
						className="w-20"
						min={0}
					/>
				);
			case "checkbox":
				return (
					<Checkbox
						checked={value as boolean}
						onCheckedChange={handleCheckboxChange} // Actualiza el checkbox
						aria-label="Seleccionar fila"
					/>
				);
			default:
				return (
					<CosmosInput
						type="text"
						value={value as string}
						onChange={handleInputChange}
						placeholder="Ingresa un valor"
						className="w-20"
					/>
				);
		}
	};

	return <div>{renderInput()}</div>;
};

export default EditableCell;
