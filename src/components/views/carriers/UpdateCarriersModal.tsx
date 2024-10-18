import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { CosmosSelect } from "@/components/cosmos/CosmosSelect";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useGetCarrierById, useUpdateCarrier } from "@/hooks/useCarriers";
import { useModal } from "@/hooks/useModal";
import { UpdateCarrierSchema } from "@/schemas/carriers/updateCarriersSchema";
import type { UpdateCarriers } from "@/types/carriers";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";

const options = {
    documento: [
        { value: "DNI", label: "DNI" },
        { value: "RUC", label: "RUC" },
    ],
};

const UpdateCarrierModal = ({
    carrierID,
    isOpen,
    onClose,
}: { carrierID: string; isOpen: boolean; onClose: () => void }) => {
    const { error, setModalError } = useModal();
    const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
    const { data, isSuccess } = useGetCarrierById(carrierID);
    const { mutateAsync: mutateUpdateCarrier } = useUpdateCarrier();

    const carrierName =
        data?.first_names && data?.last_names
            ? `${data.first_names} ${data.last_names}`
            : data?.business_name;

    const form = useForm<UpdateCarriers>({
        resolver: zodResolver(UpdateCarrierSchema),
        values:
            isSuccess && data
                ? {
                      id: data.id,
                      identification_document_type: data.identification_document_type,
                      identification_document_number: data.identification_document_number,
                      business_name: data.business_name,
                      first_names: data.first_names,
                      last_names: data.last_names,
                      license_number: data.license_number,
                  }
                : undefined,
        defaultValues: {
            identification_document_type: "",
            identification_document_number: "",
            business_name: "",
            first_names: "",
            last_names: "",
            license_number: "",
        },
    });

    const onSubmit = async (values: UpdateCarriers) => {
        try {
            await mutateUpdateCarrier({ data: values, id: carrierID });
            onAlertOpenChange(false);
            onClose();
            form.reset();
            showCosmosToast({
                message: "Se actualizó el transportista",
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
            title={`Actualizar transportista - ${carrierName}`}
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
                        title="Actualizar"
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
                        <p className="text-sm">
                            ¿Desea actualizar los datos del transportista {carrierName}?
                        </p>
                    </CosmosAlertDialog>
                </div>
            }
        >
            <>

                <CosmosSelect
					label="Tipo de documento"
					placeholder={data?.identification_document_type}
					showLabel
					required
					disabled
				/>

				<CosmosInput
					label="Número de documento"
					placeholder={data?.identification_document_number}
					showLabel
					required
					disabled
				/>
                
                <div className="col-span-1" />

                <Form {...form}>
                {data?.identification_document_type === "DNI" ? (
						<>
							<FormField
								control={form.control}
								name="first_names"
								render={({ field }) => (
									<div className="col-span-1">
										<CosmosInput showLabel required type="text" label="Nombres" {...field} />
									</div>
								)}
							/>

							<FormField
								control={form.control}
								name="last_names"
								render={({ field }) => (
									<div className="col-span-1">
										<CosmosInput showLabel required type="text" label="Apellidos" {...field} />
									</div>
								)}
							/>

							<div className="col-span-1" />
						</>
					) : (
						<FormField
							control={form.control}
							name="business_name"
							render={({ field }) => (
								<div className="col-span-3">
									<CosmosInput showLabel required type="text" label="Razón social" {...field} />
								</div>
							)}
						/>
					)}

                    <FormField
                        control={form.control}
                        name="license_number"
                        render={({ field }) => (
                            <CosmosInput
                                label="Número de Licencia"
                                type="text"
                                showLabel
                                required
                                {...field}
                            />
                        )}
                    />
                </Form>
            </>
        </CosmosModal>
    );
};

export default UpdateCarrierModal;
