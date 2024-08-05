import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/pos")({
	component: () => <div>Hello /pos!</div>,
});
