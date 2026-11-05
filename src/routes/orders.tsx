import { createFileRoute } from '@tanstack/react-router'

import { OrdersScreen } from '@/components/haven/screens/row3'

export const Route = createFileRoute('/orders')({
  head: () => ({ meta: [{ title: 'My Orders · Nail Haven' }] }),
  component: () => <OrdersScreen />,
})
