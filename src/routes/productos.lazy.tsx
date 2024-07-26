import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/productos')({
  component: () => <div>Hello /productos!</div>
})