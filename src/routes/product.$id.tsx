import { createFileRoute, notFound } from '@tanstack/react-router'

import { productDetail } from '@/data/fixtures'
import { ProductDetailsScreen } from '@/components/haven/screens/row1'

export const Route = createFileRoute('/product/$id')({
  loader: ({ params }) => {
    const product = productDetail(params.id)
    if (!product) throw notFound()
    return { name: product.name }
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? 'Product'} · Nail Haven` }] }),
  component: ProductPage,
})

function ProductPage() {
  const { id } = Route.useParams()
  // key resets the gallery position when moving between products
  return <ProductDetailsScreen key={id} productId={id} />
}
