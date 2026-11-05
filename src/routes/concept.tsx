import { createFileRoute } from '@tanstack/react-router'

import { PresentationCanvas } from '@/components/haven/canvas'

export const Route = createFileRoute('/concept')({
  head: () => ({ meta: [{ title: 'Mobile App UI Concept · Nail Haven' }] }),
  component: PresentationCanvas,
})
