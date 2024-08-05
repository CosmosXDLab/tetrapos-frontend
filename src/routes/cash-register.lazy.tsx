import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/cash-register")({
	component: () => <div>Hello /cash-register!</div>,
});
