import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import CosmosCalendar from "@/components/cosmos/CosmosCalendar";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { PlusIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useCreateCashRegister } from "@/hooks/useCashRegister";
import { useModal } from "@/hooks/useModal";
import { CreateCashRegisterSchema } from "@/schemas/cash-register/createCashRegisterSchema";
import type { CreateCashRegister } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";

const CreateCashRegisterModal = () => {
	const { isOpen: modalOpen, error, onOpenChange: onModalOpenChange, setModalError } = useModal();

	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();

	const { mutateAsync: mutateCreateCustomer } = useCreateCashRegister();

	const form = useForm<CreateCashRegister>({
		resolver: zodResolver(CreateCashRegisterSchema),
		defaultValues: {
			opening_date: "",
			closing_date: ""
		},
	});

	const onSubmit = async (values: CreateCashRegister) => {
		try {
			await mutateCreateCustomer(values);
			onAlertOpenChange(false);
			onModalOpenChange(false);
			form.reset();
			showCosmosToast({
				message: "Se registró una caja diario",
				type: "success",
			});
		} catch (error) {
			onAlertOpenChange(false);
			setModalError((error as Error).message);
		}
	};

	const onError = (errors: FieldErrors) => {
        const catchMessage = Object.values(errors).filter(row => !!row?.message).map(row => `<li>${row?.message}</li>`).join('')
		onAlertOpenChange(false);
		setModalError(`<ol>${catchMessage}</ol>`);
	};

	return (
		<CosmosModal
			className="w-[800px]"
			title="Agregar Caja diario"
            titleError="Hubo un error al registrar una caja diaria"
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
						<p className="text-sm">¿Deseas agregar esta nueva caja diario?</p>
					</CosmosAlertDialog>
				</div>
			}
		>
			<Form {...form}>

                <FormField
					control={form.control}
					name="opening_date"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosCalendar
								showLabel
                                required
								selected={field.value}
								onSelect={(date) => {
									field.onChange(date);
								}}
								label="Fecha de apertura"
							/>
						</div>
					)}
				/>

                {/*<FormField
					control={form.control}
					name="closing_date"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosCalendar
								showLabel
                                required
								selected={field.value}
								onSelect={(date) => {
									field.onChange(date);
								}}
								label="Fecha de cierre"
							/>
						</div>
					)}
				/> */}

				<div className="col-span-1" />

			</Form>
		</CosmosModal>
	);
};

export default CreateCashRegisterModal;
