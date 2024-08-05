import { useState } from "react";

interface UseModalOptions {
	onOpen?: () => void;
	onClose?: () => void;
}

export const useModal = ({ onOpen, onClose }: UseModalOptions = {}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const openModal = () => {
		setIsOpen(true);
		setError(null);
		if (onOpen) onOpen();
	};

	const closeModal = () => {
		setIsOpen(false);
		if (onClose) onClose();
	};

	const onOpenChange = (open: boolean) => {
		if (open) {
			openModal();
		} else {
			closeModal();
		}
	};

	const setModalError = (errorMessage: string | null) => {
		setError(errorMessage);
	};

	return {
		isOpen,
		error,
		openModal,
		closeModal,
		onOpenChange, // Asegúrate de usar esto en el componente CosmosModal
		setModalError,
	};
};
