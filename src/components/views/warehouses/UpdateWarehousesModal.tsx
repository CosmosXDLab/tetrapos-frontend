import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useGetWarehouseById, useUpdateWarehouse } from "@/hooks/useWarehouses"; // Hooks personalizados
import { useModal } from "@/hooks/useModal";
import { UpdateWarehouseSchema } from "@/schemas/warehouses/updateWarehousesSchema"; 
import { type FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateWarehouse } from "@/types/warehouses";

const UpdateWarehouseModal = ({
    warehouseID,
    isOpen,
    onClose,
}: { warehouseID: string; isOpen: boolean; onClose: () => void }) => {
    const { error, setModalError } = useModal();
    const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
    const { data, isSuccess } = useGetWarehouseById(warehouseID); // Obtener datos del almacén por ID
    const { mutateAsync: mutateUpdateWarehouse } = useUpdateWarehouse();

    const warehouseName = data?.name;

    const form = useForm<UpdateWarehouse>({
        resolver: zodResolver(UpdateWarehouseSchema),
        values:
            isSuccess && data
                ? {
                      id: data.id,
                      code: data.code,
                      name: data.name,
                      description: data.description,
                  }
                : undefined,
        defaultValues: {
            code: "",
            name: "",
            description: "",
        },
    });

    const onSubmit = async (values: UpdateWarehouse) => {
        try {
            await mutateUpdateWarehouse({ data: values, id: warehouseID });
            onAlertOpenChange(false);
            onClose();
            form.reset();
            showCosmosToast({
                message: "Almacén actualizado con éxito",
                type: "success",
            });
        } catch (error) {
            onAlertOpenChange(false);
            setModalError((error as Error).message);
        }
    };

    const onError = (errors: FieldErrors) => {
        onAlertOpenChange(false);
        setModalError("Por favor, revisa los campos del formulario.");
    };

    return (
        <CosmosModal
            title={`Actualizar Almacén - ${warehouseName}`}
            error={error}
            open={isOpen}
            onOpenChange={onClose}
            footer={
                <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="decline">Cancelar</Button>
                    </DialogClose>
                    <CosmosAlertDialog
                        open={alertOpen}
                        onOpenChange={onAlertOpenChange}
                        className="w-[500px] h-auto"
                        title="Actualizar"
                        trigger={<Button variant="accept">Guardar</Button>}
                        footer={
                            <div className="flex justify-end gap-2">
                                <AlertDialogCancel asChild>
                                    <Button variant="decline">No</Button>
                                </AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button variant="accept" onClick={form.handleSubmit(onSubmit, onError)}>
                                        Si
                                    </Button>
                                </AlertDialogAction>
                            </div>
                        }
                    >
                        <p className="text-sm">¿Deseas actualizar los datos del almacén {warehouseName}?</p>
                    </CosmosAlertDialog>
                </div>
            }
        >
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <div className="col-span-1">
                            <CosmosInput showLabel required type="text" label="Código" {...field} />
                        </div>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <div className="col-span-1">
                            <CosmosInput showLabel required type="text" label="Nombre" {...field} />
                        </div>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <div className="col-span-2">
                            <CosmosInput showLabel type="text" label="Descripción" {...field} />
                        </div>
                    )}
                />
            </Form>
        </CosmosModal>
    );
};

export default UpdateWarehouseModal;
