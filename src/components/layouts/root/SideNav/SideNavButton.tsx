import { Button } from "@/components/ui/button";
import { Link, type LinkProps } from "@tanstack/react-router";

interface NavButtonProps {
	to: LinkProps["to"];
	children: React.ReactNode;
}

const SideNavButton = ({ to, children }: NavButtonProps) => {
	return (
		<Button asChild variant={"navlink"}>
			<Link to={to}>{children}</Link>
		</Button>
	);
};

export default SideNavButton;
