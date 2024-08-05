import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/utils/tailwindCN";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface CosmosAlertDialogProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	trigger: React.ReactNode;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	description?: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const CosmosAlertDialog = ({
	title,
	trigger,
	header,
	children,
	footer,
	description,
	className,
	open,
	onOpenChange,
	...props
}: CosmosAlertDialogProps) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent className={cn("sm:max-w-[700px] p-0 gap-0", className)} {...props}>
				{header ? (
					<header className="flex items-center justify-between px-6 font-semibold h-14 text-texto">{header}</header>
				) : (
					<header className="flex items-center justify-between px-6 font-semibold h-14 text-texto">
						<AlertDialogTitle>{title}</AlertDialogTitle>
						<AlertDialogDescription className="sr-only">{title}</AlertDialogDescription>
						<AlertDialogCancel asChild>
							<Button size={"icon"} variant={"link"}>
								<Cross1Icon className="fill-cosmos-texto size-4" />
							</Button>
						</AlertDialogCancel>
					</header>
				)}

				<div
					className={cn("flex items-center gap-6 px-6 py-4 border-y-2 border-border-color", footer ? "" : "border-t-2")}
				>
					{children}
				</div>

				{footer && <footer className="flex items-center gap-2 px-6 h-14 place-content-end">{footer}</footer>}
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CosmosAlertDialog;
