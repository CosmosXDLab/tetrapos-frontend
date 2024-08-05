import {
	DashboardIcon,
	HomeIcon,
	LockClockIcon,
	PeopleIcon,
	SettingsIcon,
	ShoppingCartIcon,
	ViewInArIcon,
} from "@/components/icons";
import type { LinkProps } from "@tanstack/react-router";

interface RoutesNavigators {
	name: string;
	icon: React.ElementType;
	path: LinkProps["to"];
}

const routesNavigators: RoutesNavigators[] = [
	{
		name: "Inicio",
		icon: HomeIcon,
		path: "/",
	},
	{
		name: "Dashboard",
		icon: DashboardIcon,
		path: "/dashboard",
	},
	{
		name: "Productos",
		icon: ViewInArIcon,
		path: "/products",
	},
	{
		name: "Clientes",
		icon: PeopleIcon,
		path: "/customers",
	},
	{
		name: "Punto de Venta",
		icon: ShoppingCartIcon,
		path: "/pos",
	},
	{
		name: "Diario de Caja",
		icon: LockClockIcon,
		path: "/cash-register",
	},
	{
		name: "Configuración",
		icon: SettingsIcon,
		path: "/settings",
	},
];

export default routesNavigators;
