import { createLazyFileRoute } from '@tanstack/react-router'
import CarriersComponent from '@/components/views/carriers/CarriersComponent'

export const Route = createLazyFileRoute('/carriers')({
  // component: () => <div>Hello /dashboard!</div>,
  component: CarriersComponent,
})
