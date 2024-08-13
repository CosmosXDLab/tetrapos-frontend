import { Toaster } from "@/components/ui/sonner";
import RootLayout from "@/layouts/RootLayout/RootLayout";
import { createRootRoute, Link, Outlet, ScrollRestoration } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<RootLayout>
			<ScrollRestoration />
			<Outlet />
			<Toaster />
		</RootLayout>
	),
	notFoundComponent: () => (
		<div>
			<h1>Página no encontrada</h1>
			<Link to="/">Regresar a inicio</Link>
		</div>
	),
});
