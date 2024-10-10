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
import { useCreateCustomer } from "@/hooks/useCustomer";
import { useModal } from "@/hooks/useModal";
import { CreateCustomerSchema } from "@/schemas/customer/createCustomerSchema";
import type { CreateCustomer } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";

const options = {
	documento: [
		{ value: "DNI", label: "DNI" },
		{ value: "RUC", label: "RUC" },
	],
	departamento: [
		{ value: "Lima", label: "Lima" },
		{ value: "Amazonas", label: "Amazonas" },
	],
	provincia: [
		{ value: "Huaraz", label: "Huaraz" },
		{ value: "Castilla", label: "Castilla" },
	],
	distrito: [
		{ value: "San Borja", label: "San Borja" },
		{ value: "San Isidro", label: "San Isidro" },
	],
};

const CreateCustomerModal = () => {
	const { isOpen: modalOpen, error, onOpenChange: onModalOpenChange, setModalError } = useModal();
	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();

	const { mutateAsync: mutateCreateCustomer, isPending } = useCreateCustomer(); // (a) Obtener valores de estado de useCreateCustomer

	const form = useForm<CreateCustomer>({
		resolver: zodResolver(CreateCustomerSchema),
		defaultValues: {
			email: "",
			identification_document_type: "DNI",
			identification_document_number: "",
			business_name: "",
			region: options.departamento[0].value,
			province: options.provincia[0].value,
			district: options.distrito[0].value,
			address: "",
			phone_number: "",
			birthday: new Date().toISOString(),
			first_names: "",
			last_names: "",
		},
	});

	const { resetField } = form; // (1) Desestructurar resetField para usarlo más abajo

	const onSubmit = async (values: CreateCustomer) => {
		try {
			await mutateCreateCustomer(values);
			onAlertOpenChange(false);
			onModalOpenChange(false);
			form.reset();
			showCosmosToast({
				message: "Se registró un nuevo cliente",
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
			title="Agregar cliente"
			titleError="Hubo un error al registrar al cliente"
			error={error}
			open={modalOpen}
			onOpenChange={onModalOpenChange}
			trigger={
				// (a)  Deshabilitar botón si isPending o alertOpen están activos
				<Button variant="icon" size="icon" disabled={alertOpen || isPending}>
					<PlusIcon className="fill-current" />
				</Button>
			}
			footer={
				<div className="flex justify-end gap-2">
					<DialogClose asChild>
						<Button variant="decline" disabled={isPending}>
							Cancelar
						</Button>
					</DialogClose>
					<CosmosAlertDialog
						open={alertOpen}
						onOpenChange={onAlertOpenChange}
						className="w-[500px] h-auto"
						title="Confirmación"
						trigger={
							<Button variant="accept" disabled={alertOpen || isPending}>
								Guardar
							</Button>
						}
						footer={
							<div className="flex justify-end gap-2">
								<AlertDialogCancel asChild>
									<Button variant="decline" disabled={isPending}>
										No
									</Button>
								</AlertDialogCancel>
								<AlertDialogAction asChild>
									<Button variant="accept" onClick={form.handleSubmit(onSubmit, onError)} disabled={isPending}>
										Si
									</Button>
								</AlertDialogAction>
							</div>
						}
					>
						<p className="text-sm">¿Deseas agregar este nuevo cliente?</p>
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
								options={options.documento}
								onValueChange={(value) => {
									field.onChange(value); // Actualizar el tipo de documento en el formulario (2)
									// Reseteamos los campos correspondientes al cambiar el tipo de documento (3)
									resetField("identification_document_number");
									resetField("business_name");
									resetField("first_names");
									resetField("last_names");
								}}
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
							<CosmosInput
								showLabel
								required
								type="text"
								label="Número de documento"
								// Permitir solo números y restringir extensión (1,2)
								maxLength={form.watch("identification_document_type") === "DNI" ? 8 : 11}
								onInput={(e) => {
									e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
								}}
								{...field}
							/>
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
								<CosmosInput showLabel required type="text" label="Razón social" {...field} />
							</div>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name="region"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosSelect
								showLabel
								label="Departamento"
								options={options.departamento}
								onValueChange={field.onChange}
								{...field}
							/>
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="province"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosSelect
								showLabel
								label="Provincia"
								options={options.provincia}
								onValueChange={field.onChange}
								{...field}
							/>
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="district"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosSelect
								showLabel
								label="Distrito"
								options={options.distrito}
								onValueChange={field.onChange}
								{...field}
							/>
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<div className="col-span-2">
							<CosmosInput showLabel type="text" label="Dirección" {...field} />
						</div>
					)}
				/>

				<div className="col-span-1" />

				<FormField
					control={form.control}
					name="phone_number"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosInput
								showLabel
								type="text"
								label="Nro. Celular"
								// Permitir solo números y restringir extensión (1,2)
								maxLength={9}
								onInput={(e) => {
									e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
								}}
								{...field}
							/>
						</div>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosInput showLabel type="email" label="Correo electrónico" {...field} />
						</div>
					)}
				/>

				{/* <FormField
					control={form.control}
					name="birthday"
					render={({ field }) => (
						<div className="col-span-1">
							<CosmosCalendar
								showLabel
								selected={field.value}
								onSelect={(date) => {
									field.onChange(date);
								}}
								label="F. de nacimiento"
							/>
						</div>
					)}
				/> */}
			</Form>
		</CosmosModal>
	);
};

export default CreateCustomerModal;
