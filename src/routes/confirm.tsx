import { createFileRoute } from '@tanstack/react-router'

import { ConfirmScreen } from '@/components/haven/screens/row2'

export const Route = createFileRoute('/confirm')({
  head: () => ({ meta: [{ title: 'Confirm Your Design · Nail Haven' }] }),
  component: () => <ConfirmScreen />,
})
