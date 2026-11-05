import { createFileRoute, notFound } from '@tanstack/react-router'

import { productDetail } from '@/data/fixtures'
import { CustomizeScreen } from '@/components/haven/screens/row1'

export const Route = createFileRoute('/customize/$id')({
  loader: ({ params }) => {
    if (!productDetail(params.id)) throw notFound()
  },
  head: () => ({ meta: [{ title: 'Customize · Nail Haven' }] }),
  component: CustomizePage,
})

function CustomizePage() {
  const { id } = Route.useParams()
  return <CustomizeScreen key={id} productId={id} />
}
