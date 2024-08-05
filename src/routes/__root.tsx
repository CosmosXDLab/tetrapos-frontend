import { Toaster } from "@/components/ui/sonner";
import RootLayout from "@/layouts/RootLayout/RootLayout";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<RootLayout>
			<Outlet />
			<Toaster />
		</RootLayout>
	),
});
