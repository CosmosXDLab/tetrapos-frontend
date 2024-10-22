import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { PlusIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useCreateWarehouse } from "@/hooks/useWarehouses";
import { useModal } from "@/hooks/useModal";
import { CreateWarehouseSchema } from "@/schemas/warehouses/createWarehousesSchema"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";
import { CreateWarehouse } from "@/types/warehouses";

const CreateWarehouseModal = () => {
    const { isOpen: modalOpen, error, onOpenChange: onModalOpenChange, setModalError } = useModal();
    const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
    const { mutateAsync: mutateCreateWarehouse } = useCreateWarehouse();

    const form = useForm<CreateWarehouse>({
        resolver: zodResolver(CreateWarehouseSchema),
        defaultValues: {
            code: "",
            name: "",
            description: "",
        },
    });

    const onSubmit = async (values: CreateWarehouse) => {
        try {
            await mutateCreateWarehouse(values);
            onAlertOpenChange(false);
            onModalOpenChange(false);
            form.reset();
            showCosmosToast({
                message: "Almacén creado con éxito",
                type: "success",
            });
        } catch (error) {
            onAlertOpenChange(false);
            setModalError((error as Error).message);
        }
    };

    const onError = (errors: FieldErrors) => {
        console.log(errors);
        onAlertOpenChange(false);
        setModalError("Por favor, revisa los campos del formulario.");
    };

    return (
        <CosmosModal
            className="w-[800px]"
            title="Agregar Almacén"
            titleError="Hubo un error al registrar el almacén"
            error={error}
            open={modalOpen}
            onOpenChange={onModalOpenChange}
            trigger={
                <Button variant="icon" size="icon">
                    <PlusIcon className="fill-current" />
                </Button>
            }
            footer={
                <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="decline">Cancelar</Button>
                    </DialogClose>
                    <CosmosAlertDialog
                        open={alertOpen}
                        onOpenChange={onAlertOpenChange}
                        className="w-[500px] h-auto"
                        title="Confirmación"
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
                        <p className="text-sm">¿Deseas agregar este nuevo almacén?</p>
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

export default CreateWarehouseModal;
