import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CustomDataTable from "@/components/cosmos/CustomDataTable/CustomDataTable";
import { FilterIcon, TrashIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { columns } from "./columns";
import { useState } from "react";
import { useGetAllCashRegister } from "@/hooks/useCashRegister";

const CashRegiterComponent = () => {
	const { data } = useGetAllCashRegister();
    const [selectedRowsData, setSelectedRowsData] = useState<Record<string, any>>({});
	const selectedIds = Object.values(selectedRowsData).map((row) => row.id);

	return (
		<div className="flex flex-col w-full h-full gap-5 px-12 py-12">
			<div className="flex justify-between w-full">
				<h1 className="text-3xl font-semibold text-cosmos-texto">Diario de Caja</h1>
				<div className="flex gap-2">
                    <Button variant="icon" size="icon">
                        <PlusIcon className="fill-current" />
                    </Button>

					<Button variant={"icon"} size={"icon"}>
						<TrashIcon className="fill-current" />
					</Button>
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
				<Button variant={"icon"} size={"icon"}>
					<FilterIcon className="fill-current" />
				</Button>
			</div>
			<ScrollArea className="w-full h-[450px]">
				<CustomDataTable columns={columns} data={data || []} onRowSelectionChange={setSelectedRowsData} />
			</ScrollArea>
		</div>
	);
};

export default CashRegiterComponent;