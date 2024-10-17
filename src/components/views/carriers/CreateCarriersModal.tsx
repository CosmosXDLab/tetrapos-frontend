import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { PlusIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useCreateCarrier } from "@/hooks/useCarriers";
import { useModal } from "@/hooks/useModal";
import { CreateCarrierSchema } from "@/schemas/carriers/createCarriersSchema"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
// import { CreateCarrier } from "@/types/carriers";

const CreateCarrierModal = () => {
    const { isOpen: modalOpen, error, onOpenChange: onModalOpenChange, setModalError } = useModal();
    const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
    const { mutateAsync: mutateCreateCarrier } = useCreateCarrier();

    const form = useForm<CreateCarrier>({
        resolver: zodResolver(CreateCarrierSchema),
        defaultValues: {
            identification_document_number: "",
            license_number: "",
            identification_document_type: "",
            first_names: "",
            business_name: "", // Fecha de emisión
            last_names: "",    // Estado
        },
    });

    const onSubmit = async (values: CreateCarrier) => {
        try {
            await mutateCreateCarrier(values);
            onAlertOpenChange(false);
            onModalOpenChange(false);
            form.reset();
            showCosmosToast({
                message: "Transportista creado con éxito",
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
            title="Agregar Transportista"
            titleError="Hubo un error al registrar el transportista"
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
                                        Sí
                                    </Button>
                                </AlertDialogAction>
                            </div>
                        }
                    >
                        <p className="text-sm">¿Deseas agregar este nuevo transportista?</p>
                    </CosmosAlertDialog>
                </div>
            }
        >
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="identification_document_number"
                    render={({ field }) => (
                        <div className="col-span-1">
                            <CosmosInput showLabel required type="text" label="Número de documento" {...field} />
                        </div>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="license_number"
                    render={({ field }) => (
                        <div className="col-span-1">
                            <CosmosInput showLabel required type="text" label="Número de serie" {...field} />
                        </div>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="identification_document_type"
                    render={({ field }) => (
                        <div className="col-span-1">
                            <CosmosInput showLabel required type="text" label="Documento del cliente" {...field} />
                        </div>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="first_names"
                    render={({ field }) => (
                        <div className="col-span-1">
                            <CosmosInput showLabel required type="text" label="Nombre del cliente" {...field} />
                        </div>
                    )}
                />

                <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                        <div className="col-span-1">
                            <CosmosInput showLabel required type="text" label="Fecha de emisión" {...field} />
                        </div>
                    )}
                />

                <FormField
                    control={form.control}
                    name="last_names"
                    render={({ field }) => (
                        <div className="col-span-1">
                            <CosmosInput showLabel required type="text" label="Estado" {...field} />
                        </div>
                    )}
                />
            </Form>
        </CosmosModal>
    );
};

export default CreateCarrierModal;
