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
		path: "/productos",
	},
	{
		name: "Clientes",
		icon: PeopleIcon,
		path: "/clientes",
	},
	{
		name: "Punto de Venta",
		icon: ShoppingCartIcon,
		path: "/punto-de-venta",
	},
	{
		name: "Diario de Caja",
		icon: LockClockIcon,
		path: "/diario-de-caja",
	},
	{
		name: "Configuración",
		icon: SettingsIcon,
		path: "/configuracion",
	},
];

export default routesNavigators;
