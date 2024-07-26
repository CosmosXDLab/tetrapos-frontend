import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/punto-de-venta')({
  component: () => <div>Hello /punto-de-venta!</div>
})