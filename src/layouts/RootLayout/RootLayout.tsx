import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import SideNav from "./SideNav";
import TopBar from "./TopBar";

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
