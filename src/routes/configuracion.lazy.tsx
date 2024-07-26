import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/configuracion')({
  component: () => <div>Hello /configuracion!</div>
})