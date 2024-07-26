// import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
// import CosmosCalendar from "@/components/cosmos/CosmosCalendar";
// import { CosmosInput } from "@/components/cosmos/CosmosInput";
// import CosmosModal from "@/components/cosmos/CosmosModal";
// import { CosmosSelect } from "@/components/cosmos/CosmosSelect";
// import { PlusIcon } from "@/components/icons";
// import { AlertDialogCancel } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { DialogClose } from "@/components/ui/dialog";
// import type { NewEntityCliente } from "@/utils/entities/cliente";
// import { keys } from "@/utils/entities/keynames";
// import {
// 	CreateClienteSchema,
// 	type CreateClienteType,
// } from "@/utils/forms/createClienteSchema";
// import useHttpRequest from "@/utils/hooks/useHttpRequest";
// import { EndPoints } from "@/utils/http-client/api-config";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

import CosmosModal from "@/components/cosmos/CosmosModal";
import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";
import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { CosmosInput } from "@/components/cosmos/CosmosInput";
import {
	CreateClienteSchema,
	type CreateClienteType,
} from "@/utils/forms/createClienteSchema";
import { CosmosSelect } from "@/components/cosmos/CosmosSelect";

// const renderCosmosSelect = (
// 	id: string,
// 	label: string,
// 	options: { value: string; label: string }[],
// 	onChange: (value: string) => void,
// 	required?: boolean,
// ) => (
// 	<div className="col-span-1">
// 		<CosmosSelect
// 			id={id}
// 			showLabel
// 			label={label}
// 			options={options}
// 			onValueChange={onChange}
// 			required={required}
// 		/>
// 	</div>
// );

// const SignUpSchema = z.object({
// 	identification_document_type: z.string().min(3).max(20),
// 	email: z.string().email(),
// 	password: z.string().min(3).max(20),
// });
// type SignUpSchemaType = z.infer<typeof SignUpSchema>;

// const ModalCrearCliente = () => {
// 	const [alertOpen, setAlertOpen] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [formValues, setFormValues] = useState<NewEntityCliente>({
// 		identification_document_type: "DNI",
// 		identification_document_number: "",
// 		business_name: "",
// 		first_names: "",
// 		last_names: "",
// 		birthday: new Date().toISOString(),
// 		district: "",
// 		province: "",
// 		region: "",
// 		address: "",
// 		phone_number: "",
// 		email: "",
// 	});

// 	// const {
// 	// 	register,
// 	// 	handleSubmit: submitForm,
// 	// 	formState: { errors },
// 	// 	watch,
// 	// } = useForm<CreateClienteType>({
// 	// 	resolver: zodResolver(CreateClienteSchema),
// 	// });

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

// 	// const handleInputChange = (id: string, newValue: string | null) => {
// 	// 	setFormValues((prevValues) => ({
// 	// 		...prevValues,
// 	// 		[id]: newValue,
// 	// 	}));
// 	// };

// 	const { mutationResult: createClientMutation } =
// 		useHttpRequest<NewEntityCliente>(EndPoints.sales.clientes, keys.clientes, {
// 			method: "POST",
// 			data: formValues,
// 		});

// 	const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
// 		console.log(data);

// 		// createClientMutation.mutateAsync().catch((err) => setError(err.message));
// 		// setAlertOpen(false);
// 	};

// 	return (
// 		<CosmosModal
// 			className="w-[800px]"
// 			title="Agregar cliente"
// 			onClose={() => setError(null)}
// 			error={error}
// 			trigger={
// 				<Button variant="icon" size="icon">
// 					<PlusIcon className="fill-current" />
// 				</Button>
// 			}
// 			footer={
// 				<div className="flex justify-end gap-2">
// 					<DialogClose asChild>
// 						<Button variant="decline">Cancelar</Button>
// 					</DialogClose>
// 					<CosmosAlertDialog
// 						open={alertOpen}
// 						onOpenChange={setAlertOpen}
// 						className="w-[500px] h-auto"
// 						title="Confirmación"
// 						trigger={<Button variant="accept">Guardar</Button>}
// 						footer={
// 							<div className="flex justify-end gap-2">
// 								<AlertDialogCancel asChild>
// 									<Button variant="decline">No</Button>
// 								</AlertDialogCancel>
// 								<Button variant="accept" onClick={handleSubmit(onSubmit)}>
// 									Si
// 								</Button>
// 							</div>
// 						}
// 					>
// 						<p className="text-sm">¿Deseas agregar este nuevo cliente?</p>
// 					</CosmosAlertDialog>
// 				</div>
// 			}
// 		>
// 			{/* <>
// 				<div className="col-span-1">
// 					<CosmosSelect
// 						id="tipo-documento"
// 						showLabel
// 						label="Tipo de documento"
// 						options={options.documento}
// 						// onValueChange={(value) =>
// 						// 	handleInputChange("identification_document_type", value)
// 						// }
// 						{...register("identification_document_type")}
// 						required={true}
// 					/>
// 				</div>

// 				<div className="col-span-1">
// 					<CosmosInput
// 						id="numero-documento"
// 						type="text"
// 						showLabel
// 						label="Número de documento"
// 						required
// 						{...register("identification_document_number")}
// 						// onChange={(e) =>
// 						// 	handleInputChange(
// 						// 		"identification_document_number",
// 						// 		e.target.value,
// 						// 	)
// 						// }
// 					/>
// 				</div>

// 				{watch("identification_document_type") === "DNI" ? (
// 					<>
// 						<div className="col-span-1" />

// 						<div className="col-span-1">
// 							<CosmosInput
// 								id="nombres"
// 								type="text"
// 								showLabel
// 								label="Nombres"
// 								required
// 								{...register("first_names")}
// 								// onChange={(e) =>
// 								// 	handleInputChange("first_names", e.target.value)
// 								// }
// 							/>
// 						</div>

// 						<div className="col-span-1">
// 							<CosmosInput
// 								id="apellidos"
// 								type="text"
// 								showLabel
// 								label="Apellidos"
// 								required
// 								{...register("last_names")}
// 								// onChange={(e) =>
// 								// 	handleInputChange("last_names", e.target.value)
// 								// }
// 							/>
// 						</div>

// 						<div className="col-span-1" />
// 					</>
// 				) : (
// 					<div className="col-span-3">
// 						<CosmosInput
// 							id="razon-social"
// 							type="text"
// 							showLabel
// 							label="Razón social"
// 							required
// 							{...register("business_name")}
// 							// onChange={(e) =>
// 							// 	handleInputChange("business_name", e.target.value)
// 							// }
// 						/>
// 					</div>
// 				)}

// 				<div className="col-span-1">
// 					<CosmosSelect
// 						id="departamento"
// 						showLabel
// 						label="Departamento"
// 						options={options.departamento}
// 						required={true}
// 						{...register("region")}
// 						// onValueChange={(value) => handleInputChange("region", value)}
// 					/>
// 				</div>

// 				<div className="col-span-1">
// 					<CosmosSelect
// 						id="provincia"
// 						showLabel
// 						label="Provincia"
// 						options={options.provincia}
// 						required={true}
// 						{...register("province")}
// 						// onValueChange={(value) => handleInputChange("province", value)}
// 					/>
// 				</div>

// 				<div className="col-span-1">
// 					<CosmosSelect
// 						id="distrito"
// 						showLabel
// 						label="Distrito"
// 						options={options.provincia}
// 						required={true}
// 						{...register("district")}
// 						// onValueChange={(value) => handleInputChange("district", value)}
// 					/>
// 				</div>

// 				<div className="col-span-2">
// 					<CosmosInput
// 						id="direccion"
// 						type="text"
// 						showLabel
// 						label="Dirección"
// 						{...register("address")}
// 						// onChange={(e) => handleInputChange("address", e.target.value)}
// 					/>
// 				</div>

// 				<div className="col-span-1" />

// 				<div className="col-span-1">
// 					<CosmosInput
// 						id="telefono"
// 						type="text"
// 						showLabel
// 						label="Nro. Celular"
// 						{...register("phone_number")}
// 						// onChange={(e) => handleInputChange("phone_number", e.target.value)}
// 					/>
// 				</div>

// 				<div className="col-span-1">
// 					<CosmosInput
// 						id="email"
// 						type="email"
// 						showLabel
// 						label="Correo electrónico"
// 						{...register("email")}
// 						// onChange={(e) => handleInputChange("email", e.target.value)}
// 					/>
// 				</div>

// 				<div className="col-span-1">
// 					<CosmosCalendar
// 						id="fecha-nacimiento"
// 						showLabel
// 						label="F. de nacimiento"
// 						onDateChange={(date) => register("birthday", { value: date })}
// 					/>
// 				</div>
// 			</> */}

// 			<div className="col-span-1">
// 				<CosmosSelect
// 					id="tipo-documento"
// 					showLabel
// 					label="Tipo de documento"
// 					options={options.documento}
// 					onValueChange={(value) =>
// 						register("identification_document_type", { value })
// 					}
// 					{...register("identification_document_type")}
// 					required={true}
// 				/>
// 			</div>

// 			<div className="col-span-1">
// 				<CosmosInput
// 					id="email"
// 					type="email"
// 					showLabel
// 					label="Correo electrónico"
// 					required
// 					{...register("email")}
// 				/>
// 			</div>

// 			{errors.email && <span>{errors.email.message}</span>}

// 			<input
// 				className="input"
// 				placeholder="password"
// 				{...register("password")}
// 			/>

// 			{errors.password && <span>{errors.password.message}</span>}

// 			<button type="submit">submit!</button>
// 		</CosmosModal>
// 	);
// };

// export default ModalCrearCliente;

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

	// 1. Define your form.
	const form = useForm<CreateClienteType>({
		resolver: zodResolver(CreateClienteSchema),
		defaultValues: {
			email: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: CreateClienteType) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<CosmosModal
			className="w-[800px]"
			title="Agregar cliente"
			// onClose={() => setError(null)}
			// error={error}
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
								<Button variant="accept" onClick={form.handleSubmit(onSubmit)}>
									Si
								</Button>
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
								onValueChange={field.onChange}
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
								required
								type="email"
								label="Correo electrónico"
								{...field}
							/>
						</div>
					)}
				/>
			</Form>
		</CosmosModal>
	);
};

export default ModalCrearCliente;
