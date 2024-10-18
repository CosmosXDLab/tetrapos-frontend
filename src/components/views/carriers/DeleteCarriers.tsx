import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { TrashIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCarrier } from "@/hooks/useCarriers";
import { useModal } from "@/hooks/useModal";

interface DeleteCarrierProps {
	selectedIds: string[];
}

const DeleteCarrier: React.FC<DeleteCarrierProps> = ({ selectedIds }) => {
	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
	const deleteCarrierMutation = useDeleteCarrier();

	const handleDeleteSelected = async () => {
		for (const id of selectedIds) {
			await deleteCarrierMutation.mutateAsync(id);
		}
		onAlertOpenChange(false);
		showCosmosToast({ type: "success", message: "Transportista eliminado" });
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
							Sí
						</Button>
					</AlertDialogAction>
				</div>
			}
		>
			<p>¿Desea eliminar los transportistas seleccionados?</p>
		</CosmosAlertDialog>
	);
};

export default DeleteCarrier;
