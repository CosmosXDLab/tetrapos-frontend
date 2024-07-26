import { Button } from "@/components/ui/button";
import routesNavigators from "@/config/navigations/routes";
import randomKey from "@/utils/randomKey";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: () => (
		<div className="flex flex-wrap items-start justify-start w-full h-full gap-10 p-12">
			{routesNavigators.map(({ icon: Icon, name, path }) => (
				<Button key={randomKey()} variant={"homebutton"} size={"card"} asChild>
					<Link to={path} className="flex items-center gap-2">
						<Icon className="fill-current" width={32} />
						{name}
					</Link>
				</Button>
			))}
		</div>
	),
});
