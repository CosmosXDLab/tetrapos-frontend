import { createLazyFileRoute } from "@tanstack/react-router";
import CashJournalsComponent from "@/components/views/cash-journals/CashJournalsComponent";

export const Route = createLazyFileRoute("/cash-journals")({
	component: CashJournalsComponent
});
