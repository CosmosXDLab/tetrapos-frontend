import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import CosmosCalendar from "@/components/cosmos/CosmosCalendar";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { PlusIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useGetCashRegisterById, useUpdateCashRegister } from "@/hooks/useCashRegister";
import { useModal } from "@/hooks/useModal";
import { UpdateCashRegisterSchema } from "@/schemas/cash-register/updateCashRegisterSchema";
import type { UpdateCashRegister } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";

const UpdateCashRegisterModal = ({
	cashRegisterID,
	isOpen,
	onClose,
	isPreview,
}: { cashRegisterID: string; isOpen: boolean; onClose: () => void, isPreview: boolean }) => {
	const { error, setModalError } = useModal();
	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
	const { data, isSuccess, isPending } = useGetCashRegisterById(cashRegisterID);
	const { mutateAsync: mutateUpdateCashRegister } = useUpdateCashRegister();

	const form = useForm<UpdateCashRegister>({
		resolver: zodResolver(UpdateCashRegisterSchema),
		values:
			isSuccess && data
				? {
						id: data.id,
						opening_date: data.opening_date || "",
						closing_date: data.closing_date || ""
					}
				: undefined,
		defaultValues: {
			opening_date: "",
			closing_date: ""
		},
	});

	const onSubmit = async (values: UpdateCashRegister) => {
		try {
			await mutateUpdateCashRegister({ data: values, id: cashRegisterID });
			onAlertOpenChange(false);
			onClose();
			form.reset();
			showCosmosToast({
				message: "Se actualizó diario de caja",
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
			title={isPreview ? 'Visualizar diario de caja' : `Actualizar diario de caja`}
			error={error}
			open={isOpen}
			onOpenChange={onClose}
			footer={
				isPreview ?
					null
					:
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
							<p className="text-sm">¿Desea actualizar los datos del diario de caja?</p>
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
								onSelect={() => {}}
								label="Fecha de apertura"
								disabled
							/>
						</div>
					)}
				/>

                <FormField
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
								disabled={isPreview}
							/>
						</div>
					)}
				/>

				<div className="col-span-1" />

			</Form>
		</CosmosModal>
	);
};

export default UpdateCashRegisterModal;