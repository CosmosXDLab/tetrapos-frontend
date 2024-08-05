import { createLazyFileRoute } from "@tanstack/react-router";
import CustomerView from "../components/views/customers/CustomerComponent";

export const Route = createLazyFileRoute("/customers")({
	component: CustomerView,
});
