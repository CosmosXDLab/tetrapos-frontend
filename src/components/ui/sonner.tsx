import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import SuccessIcon from "../icons/SuccessIcon";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-cosmos-label group-[.toaster]:shadow-lg flex items-center justify-start space-x-4",
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
					success:
						"group-[.toast]:bg-success group-[.toast]:text-success-foreground group-[.toaster]:border-2 group-[.toaster]:border-cosmos-label",
				},
			}}
			icons={{
				success: <SuccessIcon className="w-6 h-6 fill-cosmos-label " />,
			}}
			{...props}
		/>
	);
};

export { Toaster };
