import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CosmosModal from "@/components/cosmos/CosmosModal";
import CustomDataTable from "@/components/cosmos/CustomDataTable/CustomDataTable";
import { FilterIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllCarriers } from "@/hooks/useCarriers"; // Hook para obtener transportistas
import { JsonToCsv } from "@/lib/jsonToCsv";
import { Carriers } from "@/types/carriers";
import { useState } from "react";
import CreateCarrierModal from "./CreateCarriersModal"; // Modal para crear transportista
import DeleteCarrier from "./DeleteCarriers"; // Componente para eliminar transportistas
import { columns } from "./columns"; // Columnas específicas para transportistas

const CarrierView = () => {
	const { data, isLoading } = useGetAllCarriers(); // Hook para obtener transportistas
	const [selectedRowsData, setSelectedRowsData] = useState<Record<string, Carriers>>({});
	const [showConfirmDownload, setShowConfirmDownload] = useState<boolean>(false);
	const selectedIds = Object.values(selectedRowsData).map((row) => row.id);

	const exportData = () => {
		if (!data || data.length === 0) return;
		JsonToCsv.exec(data, `carriers-${Date.now().toString()}`);
		setShowConfirmDownload(false);
	};

	return (
		<div className="flex flex-col w-full h-full gap-5 px-12 py-12">
			<div className="flex justify-between w-full">
				<h1 className="text-3xl font-semibold text-cosmos-texto">Transportistas</h1>
				<div className="flex gap-2">
					<CreateCarrierModal /> 
					<DeleteCarrier selectedIds={selectedIds} /> 
				</div>
			</div>
			<div className="flex items-center gap-2">
				<div className="w-full">
					<CosmosInput
						id="buscar"
						type="text"
						placeholder="Buscar"
						// onChange={(e) => handleInputChange("buscar", e.target.value)}
					/>
				</div>
				<Button variant={"icon"} size={"icon"} onClick={() => setShowConfirmDownload(true)}>
					<FilterIcon className="fill-current" />
				</Button>
				<CosmosModal
					children={<p className="text-sm">¿Deseas generar este reporte?</p>}
					onOpenChange={() => setShowConfirmDownload(!showConfirmDownload)}
					open={showConfirmDownload}
					title="Confirmar"
					footer={
						<div className="flex justify-end gap-2">
							<Button variant="decline" onClick={() => setShowConfirmDownload(false)}>
								No
							</Button>
							<Button variant="accept" onClick={exportData}>
								Sí
							</Button>
						</div>
					}
				/>
			</div>
			<ScrollArea className="w-full h-[450px]">
				<CustomDataTable
					columns={columns}
					data={data || []}
					onRowSelectionChange={setSelectedRowsData}
					loading={isLoading}
				/>
			</ScrollArea>
		</div>
	);
};

export default CarrierView;
