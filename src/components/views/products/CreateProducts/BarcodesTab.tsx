import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef } from "react";

const BarcodesTab = () => {
	const [barcodes, setBarcodes] = useState([""]);
	const lastInputRef = useRef<HTMLInputElement | null>(null);

	// Agregar un nuevo input vacío si el actual no lo está
	const addBarcodeField = () => {
		if (barcodes[barcodes.length - 1] !== "") {
			setBarcodes([...barcodes, ""]);
		}
	};

	// Manejar cambio en el input
	const handleChange = (index: number, value: string) => {
		const updatedBarcodes = [...barcodes];
		updatedBarcodes[index] = value;
		setBarcodes(updatedBarcodes);
	};

	// Validar y eliminar inputs vacíos excepto el último
	const handleBlur = () => {
		const filteredBarcodes = barcodes.filter((barcode) => barcode !== "");
		if (filteredBarcodes.length === 0) {
			setBarcodes([""]);
		} else {
			setBarcodes([...filteredBarcodes, ""]);
		}
	};

	// Añadir nuevo input al enfocarse en el último
	const handleFocus = (index: number) => {
		if (index === barcodes.length - 1) {
			addBarcodeField();
		}
	};

	// Manejar la tecla Enter para agregar un nuevo input y mover el foco
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === "Enter") {
			addBarcodeField();
			setTimeout(() => {
				lastInputRef.current?.focus();
			}, 0);
		}
	};

	return (
		<ScrollArea className="flex flex-col w-full h-auto border border-cosmos-border max-h-72">
			<span className="flex items-center w-full h-10 px-4 font-semibold border-b border-cosmos-border">
				Código de Barras
			</span>
			{barcodes.map((barcode, index) => (
				<input
					key={index}
					ref={index === barcodes.length - 1 ? lastInputRef : null}
					value={barcode}
					onChange={(e) => handleChange(index, e.target.value)}
					onBlur={handleBlur}
					onFocus={() => handleFocus(index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					className="flex items-center w-full h-10 px-4 border-b border-cosmos-border focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Introduce un código de barras"
				/>
			))}
		</ScrollArea>
	);
};

export default BarcodesTab;
