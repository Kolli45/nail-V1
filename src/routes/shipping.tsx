import { createFileRoute } from '@tanstack/react-router'

import { ShippingScreen } from '@/components/haven/screens/row2'

export const Route = createFileRoute('/shipping')({
  head: () => ({ meta: [{ title: 'Shipping Details · Nail Haven' }] }),
  component: () => <ShippingScreen />,
})
