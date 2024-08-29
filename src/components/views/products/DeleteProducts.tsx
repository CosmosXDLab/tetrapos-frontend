import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { TrashIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks/useProducts";
import { useModal } from "@/hooks/useModal";

interface DeleteProductProps {
	selectedIds: string[];
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ selectedIds }) => {
	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
	const DeleteProductMutation = useDeleteProduct();

	const handleDeleteSelected = async () => {
		for (const id of selectedIds) {
			await DeleteProductMutation.mutateAsync(id);
		}
		onAlertOpenChange(false); // Cierra el diálogo después de eliminar
		showCosmosToast({ type: "success", message: "Cliente eliminado" });
	};

	return (
		<CosmosAlertDialog
			open={alertOpen}
			onOpenChange={onAlertOpenChange}
			className="w-[500px] h-auto"
			title="Eliminar"
			trigger={
				<Button variant={"icon"} size={"icon"}>
					<TrashIcon className="fill-current" />
				</Button>
			}
			footer={
				<div className="flex justify-end gap-2">
					<AlertDialogCancel asChild>
						<Button variant="decline">No</Button>
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button variant="accept" onClick={handleDeleteSelected}>
							Si
						</Button>
					</AlertDialogAction>
				</div>
			}
		>
			<p>¿Desea eliminar los clientes seleccionados?</p>
		</CosmosAlertDialog>
	);
};

export default DeleteProduct;
