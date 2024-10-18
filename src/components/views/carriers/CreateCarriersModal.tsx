import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { CosmosSelect } from "@/components/cosmos/CosmosSelect";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { PlusIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useCreateCarrier } from "@/hooks/useCarriers";
import { useModal } from "@/hooks/useModal";
import { CreateCarrierSchema } from "@/schemas/carriers/createCarriersSchema";
import { CreateCarriers } from "@/types/carriers";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";

const documentOptions = [
  { value: "DNI", label: "DNI" },
  { value: "RUC", label: "RUC" },
];

const CreateCarrierModal = () => {
  const { isOpen: modalOpen, error, onOpenChange: onModalOpenChange, setModalError } = useModal();
  const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
  const { mutateAsync: mutateCreateCarrier } = useCreateCarrier();

  const form = useForm<CreateCarriers>({
    resolver: zodResolver(CreateCarrierSchema),
    defaultValues: {
      identification_document_type: documentOptions[0].value,
      identification_document_number: "",
      business_name: "",
      first_names: "",
      last_names: "",
      license_number: "",
    },
  });

  const onSubmit = async (values: CreateCarriers) => {
    try {
      await mutateCreateCarrier(values);
      onAlertOpenChange(false);
      onModalOpenChange(false);
      form.reset();
      showCosmosToast({
        message: "Se registró un nuevo transportista",
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
      title="Agregar transportista"
      titleError="Hubo un error al registrar al transportista"
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
          name="identification_document_type"
          render={({ field }) => (
            <div className="col-span-1">
              <CosmosSelect
                showLabel
                required
                label="Tipo de documento"
                options={documentOptions}
                onValueChange={field.onChange}
                {...field}
              />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="identification_document_number"
          render={({ field }) => (
            <div className="col-span-1">
              <CosmosInput showLabel required type="text" label="Número de documento" {...field} />
            </div>
          )}
        />
        
        <div className="col-span-1" />

        {form.watch("identification_document_type") === "DNI" ? (
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
                <CosmosInput showLabel required type="text" label="Razón Social" {...field} />
              </div>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="license_number"
          render={({ field }) => (
            <div className="col-span-1">
              <CosmosInput showLabel type="text" label="Número de licencia" {...field} />
            </div>
          )}
        />
      </Form>
    </CosmosModal>
  );
};

export default CreateCarrierModal;
