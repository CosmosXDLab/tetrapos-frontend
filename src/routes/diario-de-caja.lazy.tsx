import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/diario-de-caja')({
  component: () => <div>Hello /diario-de-caja!</div>
})