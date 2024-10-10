import randomKey from "@/utils/randomKey";
import isotipoCosmos from "/cosmos_isotipo.png";
import routesNavigators from "@/navigation/routesNavigators";
import { Link, type LinkProps } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

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

const SideNav = () => {
	const renderAllIconsExceptLast = () => {
		const allButLastIcons = routesNavigators.slice(0, -1);
		return allButLastIcons.map(({ icon: Icon, path }) => (
			<SideNavButton key={randomKey()} to={path}>
				<Icon className="fill-current" width={35} height={35} /> {/*Aumento de tamaño de iconos SideNav*/}
			</SideNavButton>
		));
	};

	const renderLastIcon = () => {
		const { icon: Icon, path } = routesNavigators[routesNavigators.length - 1];
		return (
			<SideNavButton key={randomKey()} to={path}>
				<Icon className="fill-current" width={35} height={35} /> {/*Aumento de tamaño de icono tuerca*/}
			</SideNavButton>
		);
	};

	return (
		<div className="flex flex-col items-center justify-between w-24 h-full p-4 text-cosmos-label bg-cosmos-secundario">
			<img className="w-12" src={isotipoCosmos} alt="Isotipo de Cosmos" />
			<div className="flex flex-col items-center justify-center w-full h-full gap-10">{renderAllIconsExceptLast()}</div>
			<div>{renderLastIcon()}</div>
		</div>
	);
};

export default SideNav;
