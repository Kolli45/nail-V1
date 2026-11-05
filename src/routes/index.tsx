import { createFileRoute } from '@tanstack/react-router'

import { HomeScreen } from '@/components/haven/screens/row1'

export const Route = createFileRoute('/')({
  component: HomeScreen,
})
