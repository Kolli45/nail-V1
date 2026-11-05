import { createFileRoute } from '@tanstack/react-router'

import { OrderConfirmedScreen } from '@/components/haven/screens/row2'

export const Route = createFileRoute('/order-confirmed/$id')({
  head: () => ({ meta: [{ title: 'Order Confirmed · Nail Haven' }] }),
  component: OrderConfirmedPage,
})

function OrderConfirmedPage() {
  const { id } = Route.useParams()
  return <OrderConfirmedScreen orderId={`#${id}`} />
}
