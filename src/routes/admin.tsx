import { createFileRoute } from '@tanstack/react-router'

import { AdminScreen } from '@/components/haven/screens/row3'

export const Route = createFileRoute('/admin')({
  head: () => ({ meta: [{ title: 'Admin Control Panel · Nail Haven' }] }),
  component: () => <AdminScreen />,
})
