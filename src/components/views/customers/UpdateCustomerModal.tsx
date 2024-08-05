import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import CosmosCalendar from "@/components/cosmos/CosmosCalendar";
import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { CosmosSelect } from "@/components/cosmos/CosmosSelect";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useGetCustomerById, useUpdateCustomer } from "@/hooks/useCustomer";
import { useModal } from "@/hooks/useModal";
import { UpdateCustomerSchema } from "@/schemas/customer/updateCustomerSchema";
import type { UpdateCustomer } from "@/types";
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

const UpdateCustomerModal = ({
	customerID,
	isOpen,
	onClose,
}: { customerID: string; isOpen: boolean; onClose: () => void }) => {
	const { error, setModalError } = useModal();
	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
	const { data, isSuccess, isPending } = useGetCustomerById(customerID);
	const { mutateAsync: mutateUpdateCustomer } = useUpdateCustomer();

	const customerName = (data?.first_names && data.last_names) || data?.business_name;

	const form = useForm<UpdateCustomer>({
		resolver: zodResolver(UpdateCustomerSchema),
		values:
			isSuccess && data
				? {
						id: data.id,
						email: data.email,
						identification_document_type: data.identification_document_type,
						identification_document_number: data.identification_document_number,
						business_name: data.business_name,
						region: data.region,
						province: data.province,
						district: data.district,
						address: data.address,
						phone_number: data.phone_number,
						birthday: data.birthday || new Date().toISOString(),
						first_names: data.first_names,
						last_names: data.last_names,
					}
				: undefined,
		defaultValues: {
			email: "",
			business_name: "",
			region: "",
			province: "",
			district: "",
			address: "",
			phone_number: "",
			birthday: "",
			first_names: "",
			last_names: "",
		},
	});

	const onSubmit = async (values: UpdateCustomer) => {
		console.log(values);

		try {
			await mutateUpdateCustomer({ data: values, id: customerID });
			onAlertOpenChange(false);
			onClose();
			form.reset();
			showCosmosToast({
				message: "Se actualizó el cliente",
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
			title={`Actualizar cliente - ${customerName}`}
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
						<p className="text-sm">¿Desea actualizar los datos del cliente {customerName}?</p>
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
								<CosmosInput showLabel type="text" label="Nro. Celular" {...field} />
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

					<FormField
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
					/>
				</Form>
			</>
		</CosmosModal>
	);
};

export default UpdateCustomerModal;