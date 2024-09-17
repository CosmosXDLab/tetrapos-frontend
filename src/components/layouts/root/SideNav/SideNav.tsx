import SideNavButton from "./SideNavButton";
import routesNavigators from "@/config/navigations/routes";
import randomKey from "@/utils/randomKey";
import isotipoCosmos from "/cosmos_isotipo.png";

const SideNav = () => {
	const renderAllIconsExceptLast = () => {
		const allButLastIcons = routesNavigators.slice(0, -1);
		return allButLastIcons.map(({ icon: Icon, path }) => (
			<SideNavButton key={randomKey()} to={path}>
				<Icon className="fill-current" width={35} height={35} />
			</SideNavButton>
		));
	};

	const renderLastIcon = () => {
		const { icon: Icon, path } = routesNavigators[routesNavigators.length - 1];
		return (
			<SideNavButton key={randomKey()} to={path}>
				<Icon className="fill-current" width={35} height={35} />
			</SideNavButton>
		);
	};

	return (
		<div className="flex flex-col items-center justify-between w-24 h-full p-4 text-cosmos-label bg-cosmos-secundario">
			<img className="w-12" src={isotipoCosmos} alt="Isotipo de Cosmos" />
			<div className="flex flex-col items-center justify-center w-full h-full gap-10">
				{renderAllIconsExceptLast()}
			</div>
			<div>{renderLastIcon()}</div>
		</div>
	);
};

export default SideNav;
