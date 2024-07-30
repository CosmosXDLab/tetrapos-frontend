import RootLayout from "@/components/layouts/root/layout";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
	component: () => (
		<RootLayout>
			<Outlet />
			<Toaster />
		</RootLayout>
	),
});
