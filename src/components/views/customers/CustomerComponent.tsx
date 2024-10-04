import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CosmosModal from "@/components/cosmos/CosmosModal";
import CustomDataTable from "@/components/cosmos/CustomDataTable/CustomDataTable";
import { FilterIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllCustomers } from "@/hooks/useCustomer";
import { JsonToCsv } from "@/lib/jsonToCsv";
import type { Customer } from "@/types";
import { useState } from "react";
import CreateCustomerModal from "./CreateCustomerModal";
import DeleteCustomer from "./DeleteCustomer";
import { columns } from "./columns";

const CustomerView = () => {
	const { data, isLoading } = useGetAllCustomers();
	const [selectedRowsData, setSelectedRowsData] = useState<Record<string, Customer>>({});
	const [showConfirmDownload, setShowConfirmDownload] = useState<boolean>(false);
	const selectedIds = Object.values(selectedRowsData).map((row) => row.id);

	const exportData = () => {
		if (!data || data?.length === 0) return;
		JsonToCsv.exec(data, `customers-${Date.now().toString()}`);
		setShowConfirmDownload(false);
	};

	return (
		<div className="flex flex-col w-full h-full gap-5 px-12 py-12">
			<div className="flex justify-between w-full">
				<h1 className="text-3xl font-semibold text-cosmos-texto">Clientes</h1>
				<div className="flex gap-2">
					<CreateCustomerModal />
					<DeleteCustomer selectedIds={selectedIds} />
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
							<Button variant="accept" onClick={() => exportData()}>
								Si
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

export default CustomerView;
