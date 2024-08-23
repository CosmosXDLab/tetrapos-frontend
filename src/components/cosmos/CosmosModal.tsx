import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/utils/tailwindCN";
import { Cross1Icon } from "@radix-ui/react-icons";

interface CosmosModalProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	titleError?: string;
	trigger?: React.ReactNode;
	header?: React.ReactNode;
	children: React.ReactNode;
	footer?: React.ReactNode;
	error?: string | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	classNameBody?: string;
}

const CosmosModal = ({
	title,
	titleError,
	trigger,
	header,
	children,
	footer,
	error,
	className,
	open,
	onOpenChange,
	...props
}: CosmosModalProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent className={cn("sm:max-w-[700px] p-0 gap-0", className)} {...props}>
				{header ? (
					<header className="flex items-center justify-between px-6 font-semibold h-14 text-texto">{header}</header>
				) : (
					<header className="flex items-center justify-between px-6 font-semibold h-14 text-texto">
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription className="sr-only">{title}</DialogDescription>
						<DialogClose asChild>
							<Button size={"icon"} variant={"link"}>
								<Cross1Icon className="fill-cosmos-texto size-4" />
							</Button>
						</DialogClose>
					</header>
				)}

				{error && (
					<div className="px-6 py-2 border-t-2">
						<div className="min-h-[60px] text-cosmos-primario_a border rounded-md text-xs p-2 border-cosmos-primario_a flex flex-col gap-2">
							<p className="font-bold text-cosmos-primario_a">{ titleError || 'Hubo un error al registrar'}</p>
							<div dangerouslySetInnerHTML={{ __html: error }}/>
						</div>
					</div>
				)}

				<div
					className={cn(`grid items-center grid-cols-3 grid-rows-2 gap-6 p-6 border-y-2 ${props.classNameBody}` , footer ? "" : "border-t-2")}
				>
					{children}
				</div>

				{footer && <footer className="flex items-center gap-2 px-6 h-14 place-content-end">{footer}</footer>}
			</DialogContent>
		</Dialog>
	);
};

export default CosmosModal;
