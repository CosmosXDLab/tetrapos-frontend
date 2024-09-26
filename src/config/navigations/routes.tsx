import {
	DashboardIcon,
	HomeIcon,
	LockClockIcon,
	PeopleIcon,
	SettingsIcon,
	ShoppingCartIcon,
	ViewInArIcon,
	//Falta insertar iconos de guias y almacenes
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
		path: "/cash-journals",
	},
	{
		name: "Guias",
		icon: DashboardIcon,
		path: "/guides",
	},
	{
		name: "Almacenes",
		icon: DashboardIcon,
		path: "/warehouses",
	},
	{
		name: "Configuración",
		icon: SettingsIcon,
		path: "/settings",
	},
];

export default routesNavigators;
