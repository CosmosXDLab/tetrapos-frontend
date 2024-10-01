import CosmosModal from "@/components/cosmos/CosmosModal";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useCreateCashJournals } from "@/hooks/useCashJournals";
import { useModal } from "@/hooks/useModal";
import { createCashJournalsSchema } from "@/schemas/cash-journals/createCashJournalsSchema";
import type { CreateCashJournals } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CreateCashJournalsModal = () => {
	const { isOpen: modalOpen, error, onOpenChange: onModalOpenChange, setModalError } = useModal();

	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();

	const { mutateAsync: mutateCreateCustomer } = useCreateCashJournals();

	const form = useForm<CreateCashJournals>({
		resolver: zodResolver(createCashJournalsSchema),
		defaultValues: {
			opening_date: new Date().toISOString(),
			closing_date: ""
		},
	});

	const onSubmit = async (values: CreateCashJournals) => {
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

	const formatCustomDate = (date: Date) => {
		const capitalizeFirstLetter = (text: string) => {
			return text.charAt(0).toUpperCase() + text.slice(1);
		}

		const dayAbbreviations = {
			lunes: 'Lun.',
			martes: 'Mar.',
			miércoles: 'Mie.',
			jueves: 'Jue.',
			viernes: 'Vie.',
			sábado: 'Sab.',
			domingo: 'Dom.'
		};

		const dayOfWeek = format(date, 'eeee', { locale: es });
		const day = format(date, 'd');
		const fullMonth = format(date, 'MMM', { locale: es }).replace('.', '');
		return `${capitalizeFirstLetter(dayAbbreviations[dayOfWeek as keyof typeof dayAbbreviations])} ${day} de ${capitalizeFirstLetter(fullMonth)}.`;
	};

	return (
		<CosmosModal
			className="w-[350px]"
			classNameBody="flex"
			title="Aperturar día"
            titleError="Hubo un error al aperturar el día"
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
					<Button variant="accept" onClick={form.handleSubmit(onSubmit, onError)}>
						Aceptar
					</Button>
				</div>
			}
		>
			<div className="w-[300px] h-[200px] flex flex-col justify-center items-center gap-3">
				<svg width="50" height="50" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M23.44 39.68C22.32 39.88 21.18 40 20 40C9 40 0 31 0 20C0 9 9 0 20 0C31 0 40 9 40 20C40 21.18 39.88 22.32 39.68 23.44C38 22.52 36.06 22 34 22C31.48 22 29.14 22.78 27.2 24.12L21 20.4V10H18V22L24.86 26.22C23.08 28.32 22 31 22 34C22 36.06 22.52 38 23.44 39.68ZM32 26V32H26V36H32V42H36V36H42V32H36V26H32Z" fill="#474D66"/>
				</svg>
				<span className="font-light">Se abrirá un nuevo día para el registro de ventas con fechade <span className="font-semibold">{formatCustomDate(form.getValues().opening_date)}</span> Si está de acuerdo en continuar, se cerrará el diario actual en curso</span>

			</div>
		</CosmosModal>
	);
};

export default CreateCashJournalsModal;
