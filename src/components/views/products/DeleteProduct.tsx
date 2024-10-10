import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { TrashIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useDeleteProduct } from "@/hooks/useProducts";

interface DeleteProductProps {
	selectedIds: string[];
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ selectedIds }) => {
	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
	const deleteProductMutation = useDeleteProduct();

	const handleDeleteSelected = async () => {
		for (const id of selectedIds) {
			await deleteProductMutation.mutateAsync(id);
		}
		onAlertOpenChange(false); // Cierra el diálogo después de eliminar
		showCosmosToast({ type: "success", message: "Producto eliminado" });
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
			<p>¿Desea eliminar los productos seleccionados?</p>
		</CosmosAlertDialog>
	);
};

export default DeleteProduct;
