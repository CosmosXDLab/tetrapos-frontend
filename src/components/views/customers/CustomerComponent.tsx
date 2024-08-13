import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CustomDataTable from "@/components/cosmos/CustomDataTable/CustomDataTable";
import { FilterIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Customer } from "@/types";
import { useState } from "react";
import CreateCustomerModal from "./CreateCustomerModal";
import { columns } from "./columns";
import { useGetAllCustomers, useGetCustomerById } from "@/hooks/useCustomer";
import DeleteCustomer from "./DeleteCustomer";
import { useDeleteProduct, useGetAllProducts, useGetProductById } from "@/hooks/useProducts";

const CustomerView = () => {
	const { data } = useGetAllCustomers();
	const [selectedRowsData, setSelectedRowsData] = useState<Record<string, Customer>>({});
	const selectedIds = Object.values(selectedRowsData).map((row) => row.id);

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

export default CustomerView;
