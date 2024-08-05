import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { TrashIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCustomer } from "@/hooks/useCustomer";
import { useModal } from "@/hooks/useModal";

interface DeleteCustomerProps {
	selectedIds: string[];
}

const DeleteCustomer: React.FC<DeleteCustomerProps> = ({ selectedIds }) => {
	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
	const deleteCustomerMutation = useDeleteCustomer();

	const handleDeleteSelected = async () => {
		for (const id of selectedIds) {
			await deleteCustomerMutation.mutateAsync(id);
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

export default DeleteCustomer;
