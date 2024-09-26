import { createLazyFileRoute } from '@tanstack/react-router'
import WarehousesComponent from '@/components/views/warehouses/WarehousesComponent'

export const Route = createLazyFileRoute('/warehouses')({
  component: WarehousesComponent
})
