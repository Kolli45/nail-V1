import { createFileRoute } from '@tanstack/react-router'

import { CartScreen } from '@/components/haven/screens/row3'

export const Route = createFileRoute('/cart')({
  head: () => ({ meta: [{ title: 'My Cart · Nail Haven' }] }),
  component: () => <CartScreen />,
})
