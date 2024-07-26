import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import TopBar from "./topbar";
import SideNav from "./SideNav/SideNav";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex w-screen h-screen">
			<SideNav />
			<div className="flex flex-col w-full">
				<TopBar />
				<div className="flex-1">{children}</div>
			</div>
			<TanStackRouterDevtools />
		</div>
	);
};

export default RootLayout;
