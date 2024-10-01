import CosmosAlertDialog from "@/components/cosmos/CosmosAlertDialog";
import CosmosModal from "@/components/cosmos/CosmosModal";
import { CosmosTabs } from "@/components/cosmos/CosmosTabs";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { PlusIcon } from "@/components/icons";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useModal } from "@/hooks/useModal";
import { useCreateProduct } from "@/hooks/useProducts";
import { CreateProductSchema } from "@/schemas/products/createProductSchema";
import type { CreateProduct } from "@/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";
import BarcodesTab from "./BarcodesTab";
import ControllerTab from "./ControllerTab";
import GeneralTab from "./GeneralTab";
import LocationsTab from "./LocationsTab";

const CreateProductsModal = () => {
	const { isOpen: modalOpen, error, onOpenChange: onModalOpenChange, setModalError } = useModal();
	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();

	const { mutateAsync: mutateCreateProduct } = useCreateProduct();

	const form = useForm<CreateProduct>({
		resolver: zodResolver(CreateProductSchema),
		defaultValues: {
			code: "",
			name: "",
			description: "",
			classification: "",
			kind: "",
			measurement_unit: {
				code: "",
				name: "",
				description: "",
			},
			product_category: {
				code: "",
				name: "",
				description: "",
			},
			product_family: {
				code: "",
				name: "",
				description: "",
			},
			barcodes: [],
			state: "",
			product_locations: [],
			product_controller: {
				stock_management: false,
				minimun_stock: 0,
				maximun_stock: 0,
			},
		},
	});

	const onSubmit = async (values: CreateProduct) => {
		try {
			await mutateCreateProduct(values);
			console.log(values);

			onAlertOpenChange(false);
			onModalOpenChange(false);
			form.reset();
			showCosmosToast({
				message: "Se registró un nuevo producto",
				type: "success",
			});
		} catch (error) {
			onAlertOpenChange(false);
			setModalError((error as Error).message);
			console.log(error);
			console.log(values);
		}
	};

	const onError = (errors: FieldErrors) => {
		console.log(errors);
		console.log(form.getValues());

		onAlertOpenChange(false);
		setModalError("Por favor, revisa los campos del formulario.");
	};

	return (
		<CosmosModal
			title="Agregar producto"
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
						<p className="text-sm">¿Deseas agregar este nuevo producto?</p>
					</CosmosAlertDialog>
				</div>
			}
		>
			<Form {...form}>
				<div className="col-span-3 row-span-2">
					<CosmosTabs
						defaultValue="general"
						options={[
							{ value: "general", label: "General", content: <GeneralTab form={form} /> },
							{ value: "controlador", label: "Controlador", content: <ControllerTab form={form} /> },
							{ value: "ubicaciones", label: "Ubicaciones", content: <LocationsTab /> },
							{ value: "codigo_barras", label: "Código de Barras", content: <BarcodesTab /> },
							{ value: "precios", label: "Precios", content: <div>Precios</div> },
							{ value: "ensamblado", label: "Ensamblado", content: <div>Ensamblado</div> },
						]}
					/>
				</div>
			</Form>
		</CosmosModal>
	);
};

export default CreateProductsModal;
