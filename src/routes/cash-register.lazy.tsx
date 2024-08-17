import { createLazyFileRoute } from "@tanstack/react-router";
import CashRegiterComponent from "@/components/views/cash-register/CashRegisterComponent";

export const Route = createLazyFileRoute("/cash-register")({
	component: CashRegiterComponent
});
