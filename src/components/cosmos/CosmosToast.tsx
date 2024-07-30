import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AlertIcon, CloseIcon, SuccessIcon } from "../icons";
import { Button } from "../ui/button";

interface CosmosToastProps {
	message: string;
	type?: "success" | "alert" | "info";
}

const getTypeStyles = (type: "success" | "alert" | "info") => {
	switch (type) {
		case "success":
			return {
				icon: <SuccessIcon className="w-6 h-6 fill-cosmos-label" />,
				text: "text-cosmos-label",
				border: "border-2 border-cosmos-label",
				closeIcon: "fill-cosmos-label",
			};
		case "alert":
			return {
				icon: <AlertIcon className="w-6 h-6 fill-cosmos-primario_a" />,
				text: "text-cosmos-primario_a",
				border: "border-2 border-cosmos-primario_a",
				closeIcon: "fill-cosmos-primario_a",
			};
		default:
			return {
				icon: null,
				text: "",
				border: "",
				closeIcon: "fill-cosmos-label",
			};
	}
};

export const showCosmosToast = ({
	message,
	type = "info",
}: CosmosToastProps) => {
	const { icon, text, border, closeIcon } = getTypeStyles(type);

	toast.custom(
		(t) => (
			<div className="w-[320px] text-sm flex items-center gap-4">
				{icon}
				<div className="flex items-center justify-between w-full">
					<p className={cn("text-xs font-semibold", text)}>{message}</p>
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => toast.dismiss(t)}
					>
						<CloseIcon className={cn("w-6 h-6", closeIcon)} />
					</Button>
				</div>
			</div>
		),
		{
			classNames: {
				toast: cn("rounded-lg p-4", border),
			},
		},
	);
};
