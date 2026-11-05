import { createFileRoute } from '@tanstack/react-router'

import { AllDesignsScreen } from '@/components/haven/screens/row1'

export const Route = createFileRoute('/shop')({
  head: () => ({ meta: [{ title: 'All Designs · Nail Haven' }] }),
  component: () => <AllDesignsScreen />,
})
