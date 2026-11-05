import { createFileRoute } from '@tanstack/react-router'

import { DesignVibeScreen } from '@/components/haven/screens/row2'

export const Route = createFileRoute('/design')({
  head: () => ({ meta: [{ title: 'Design Your Vibe · Nail Haven' }] }),
  component: () => <DesignVibeScreen />,
})
