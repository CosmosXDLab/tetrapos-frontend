import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import CosmosCalendar from "@/components/cosmos/CosmosCalendar";
import { CosmosInput } from "@/components/cosmos/CosmosInput";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { CosmosSelect } from "@/components/cosmos/CosmosSelect";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { PlusIcon } from "@/components/icons";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import type { NewEntityCliente } from "@/utils/entities/cliente";
import { keys } from "@/utils/entities/keynames";
import {
	CreateClienteSchema,
	type CreateClienteType,
} from "@/utils/forms/createClienteSchema";
import useHttpRequest from "@/utils/hooks/useHttpRequest";
import { EndPoints } from "@/utils/http-client/api-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

const ModalCrearCliente = () => {
	const [alertOpen, setAlertOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<CreateClienteType>({
		resolver: zodResolver(CreateClienteSchema),
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

	const { resetField} = form;

	const { mutationResult: createClienteMutation } =
		useHttpRequest<NewEntityCliente>(EndPoints.sales.clientes, keys.clientes, {
			method: "POST",
			data: form.getValues(),
		});

	const onSubmit = () => {
		createClienteMutation
			.mutateAsync()
			.then(() => {
				setAlertOpen(false);
				setModalOpen(false);
				setError(null);
				form.reset();
				showCosmosToast({
					message: "Se registró un nuevo cliente",
					type: "success",
				});
			})
			.catch((error: any) => {
				setError(error.message);
				setAlertOpen(false);
			});
	};

	const onError = () => {
		setAlertOpen(false);
		setError("Por favor, revisa los campos del formulario.");
	};

	return (
		<CosmosModal
			className="w-[800px]"
			title="Agregar cliente"
			error={error}
			open={modalOpen}
			onOpenChange={setModalOpen}
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
						onOpenChange={setAlertOpen}
						className="w-[500px] h-auto"
						title="Confirmación"
						trigger={<Button variant="accept">Guardar</Button>}
						footer={
							<div className="flex justify-end gap-2">
								<AlertDialogCancel asChild>
									<Button variant="decline">No</Button>
								</AlertDialogCancel>
								<AlertDialogAction asChild>
									<Button
										variant="accept"
										onClick={form.handleSubmit(onSubmit, onError)}
									>
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
									field.onChange(value);
									resetField("identification_document_number");
									resetField("first_names");
									resetField("last_names");
									resetField("business_name");
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
								maxLength={form.watch("identification_document_type") === "DNI" ? 8 : 11}
								onInput={(e) => {
									e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
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
									<CosmosInput
										showLabel
										required
										type="text"
										label="Nombres"
										{...field}
									/>
								</div>
							)}
						/>

						<FormField
							control={form.control}
							name="last_names"
							render={({ field }) => (
								<div className="col-span-1">
									<CosmosInput
										showLabel
										required
										type="text"
										label="Apellidos"
										{...field}
									/>
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
								<CosmosInput
									showLabel
									required
									type="text"
									label="Razón social"
									{...field}
								/>
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
								maxLength={9}
								onInput={(e) => {
									e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
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
							<CosmosInput
								showLabel
								type="email"
								label="Correo electrónico"
								{...field}
							/>
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

				{/* <FormField
					control={form.control}
					name="birthday"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date of birth</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>
								Your date of birth is used to calculate your age.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/> */}
			</Form>
		</CosmosModal>
	);
};

export default ModalCrearCliente;
