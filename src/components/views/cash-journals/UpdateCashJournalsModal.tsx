import CosmosModal from "@/components/cosmos/CosmosModal";
import { showCosmosToast } from "@/components/cosmos/CosmosToast";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useGetCashJournalsById, useUpdateCashJournals } from "@/hooks/useCashJournals";
import { useModal } from "@/hooks/useModal";
import { updateCashJournalsSchema } from "@/schemas/cash-journals/updateCashJournalsSchema";
import type { UpdateCashJournals } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const UpdateCashJournalsModal = ({
	cashRegisterID,
	isOpen,
	onClose,
	isPreview,
}: { cashRegisterID: string; isOpen: boolean; onClose: () => void, isPreview: boolean }) => {
	const { error, setModalError } = useModal();
	const { isOpen: alertOpen, onOpenChange: onAlertOpenChange } = useModal();
	const { data, isSuccess, isPending } = useGetCashJournalsById(cashRegisterID);
	const { mutateAsync: mutateUpdateCashRegister } = useUpdateCashJournals();

	const form = useForm<UpdateCashJournals>({
		resolver: zodResolver(updateCashJournalsSchema),
		values:
			isSuccess && data
				? {
						id: data.id,
						opening_date: data.opening_date || "",
						closing_date: new Date().toISOString()
					}
				: undefined,
		defaultValues: {
			opening_date: "",
			closing_date: new Date().toISOString()
		},
	});

	const onSubmit = async (values: UpdateCashJournals) => {
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
			title={isPreview ? 'Visualizar diario de caja' : `Cerrar día`}
			className="w-[350px]"
			classNameBody="flex"
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
						<Button variant="accept" onClick={form.handleSubmit(onSubmit, onError)}>
							Aceptar
						</Button>
					</div>
			}
		>
			<div className="w-[300px] h-[125px] flex flex-col justify-center items-center gap-3">
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13 0C8 0 4 4 4 9V10C1.78 10 0 11.78 0 14V32C0 34.22 1.78 36 4 36H13.44C16.36 38.58 20.12 40 24 40C28.2435 40 32.3131 38.3143 35.3137 35.3137C38.3143 32.3131 40 28.2435 40 24C40 19.7565 38.3143 15.6869 35.3137 12.6863C32.3131 9.68571 28.2435 8 24 8C23.32 8 22.64 8.06 22 8.16C21.52 3.54 17.64 0 13 0ZM13 4C14.3261 4 15.5979 4.52678 16.5355 5.46447C17.4732 6.40215 18 7.67392 18 9V10H8V9C8 7.67392 8.52678 6.40215 9.46447 5.46447C10.4021 4.52678 11.6739 4 13 4ZM24 12C27.1826 12 30.2348 13.2643 32.4853 15.5147C34.7357 17.7652 36 20.8174 36 24C36 27.1826 34.7357 30.2348 32.4853 32.4853C30.2348 34.7357 27.1826 36 24 36C20.8174 36 17.7652 34.7357 15.5147 32.4853C13.2643 30.2348 12 27.1826 12 24C12 20.8174 13.2643 17.7652 15.5147 15.5147C17.7652 13.2643 20.8174 12 24 12ZM22 16V26L29.28 30.38L30.84 27.8L25 24.3V16H22Z" fill="#474D66"/>
				</svg>
				<span className="font-light">Se cerrará el día para el registro de ventas con fecha de <span className="font-semibold">{form.getValues().closing_date ? formatCustomDate(form.getValues().closing_date) : ''}</span></span>

			</div>
		</CosmosModal>
	);
};

export default UpdateCashJournalsModal;