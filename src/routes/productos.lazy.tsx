import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CustomDataTable from "@/components/cosmos/CustomDataTable/CustomDataTable";
import { FilterIcon, TrashIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { columns } from "@/components/views/clientes/columns";
import ModalCrearCliente from "@/components/views/clientes/modal-crear-cliente";
import type { EntityCliente } from "@/utils/entities/cliente";
import { keys } from "@/utils/entities/keynames";
import useHttpRequest from "@/utils/hooks/useHttpRequest";
import { EndPoints } from "@/utils/http-client/api-config";
import { createLazyFileRoute } from "@tanstack/react-router";

const ProductosComponent = () => {
	/* const {
		queryResult: { data: response },
	} = useHttpRequest<EntityCliente[]>(EndPoints.sales.clientes, keys.clientes, {
		method: "GET",
	});*/

	return (
		<div className="flex flex-col w-full h-full gap-5 px-12 py-12">
			<div className="flex justify-between w-full">
				<h1 className="text-3xl font-semibold text-cosmos-texto">Productos</h1>
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
				<CustomDataTable columns={columns} data={[]} />
			</ScrollArea>
		</div>
	);
};

export const Route = createLazyFileRoute("/productos")({
	component: ProductosComponent,
});
