import GuidesComponent from "@/components/views/guides/GuidesComponent";
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/guides')({
  component: GuidesComponent
})