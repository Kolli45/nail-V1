/**
 * Stubbed product data for the Nail Haven UI concept.
 * Every screen reads from this module, so real persistence can replace it later.
 */

/** Photo from /public/img, served directly by the site. */
export function img(name: string, _w?: number, _h?: number) {
  void _w
  void _h
  return `/img/${name}.jpg`
}

export const currency = (n: number) => `${n} DZD`

// ── Unified options (Customize, Design Wizard, Cart) ──
export const NAIL_SHAPES = ['Round', 'Almond', 'Coffin', 'Square', 'Stiletto'] as const
export type NailShape = (typeof NAIL_SHAPES)[number]

export const DESIGNS = ['None', 'French', 'Simple', 'Floral', 'Geometric', 'Cartoon'] as const
export type Design = (typeof DESIGNS)[number]

export type Swatch = { name: string; hex: string; glitter?: boolean }
export const COLORS: Swatch[] = [
  { name: 'Rose', hex: '#C9778A' },
  { name: 'Nude', hex: '#D9B8A5' },
  { name: 'Peach', hex: '#F2B8A0' },
  { name: 'Deep Red', hex: '#8E1F2F' },
  { name: 'Pink', hex: '#EE9DB4' },
  { name: 'Blush', hex: '#F4CCD3' },
  { name: 'Rosy Pink', hex: '#E08A9C' },
  { name: 'Mauve', hex: '#B07A8C' },
  { name: 'Coral', hex: '#EE8A7C' },
  { name: 'Lilac', hex: '#D7B8D9' },
  { name: 'Champagne', hex: '#E8D3B5' },
  { name: 'Black', hex: '#1E1416' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Glitter', hex: '#E2BFA8', glitter: true },
]

// ── Catalog ──
export type Product = { id: string; name: string; rating: number; reviews: number; price: number; image: string; tags: string[] }
export const PRODUCTS: Product[] = [
  { id: 'classic-acrylic', name: 'Classic Acrylic', rating: 4.9, reviews: 128, price: 2500, image: 'classic-acrylic', tags: ['Acrylic'] },
  { id: 'white-tip-french', name: 'White Tip French', rating: 4.8, reviews: 96, price: 2200, image: 'white-tip-french', tags: ['French', 'Gel'] },
  { id: 'floral-3d', name: '3D Floral Design', rating: 4.9, reviews: 75, price: 2800, image: 'floral-3d', tags: ['Acrylic', 'Gel'] },
  { id: 'minimal-nude', name: 'Minimal Nude', rating: 4.7, reviews: 64, price: 2000, image: 'minimal-nude', tags: ['Natural'] },
]

/** Price added once per set when a design other than "None" is chosen. */
export const DESIGN_EXTRA = 500

export const FILTERS = ['All', 'Acrylic', 'Gel', 'Natural', 'French']

export const PRODUCT_DETAIL = {
  id: 'classic-acrylic',
  name: 'Classic Acrylic Set',
  rating: 4.5,
  reviews: 128,
  price: 2500,
  description:
    'Handcrafted acrylic nails with a smooth, natural finish. Customize the shape and color to match your style.',
  gallery: ['classic-acrylic', 'classic-acrylic-2', 'acrylic-gel', 'custom-floral'],
}

const OTHER_SHOTS = ['classic-acrylic-2', 'acrylic-gel', 'custom-floral']

/** Detail data for any catalog product (Classic Acrylic uses the exact brief copy). */
export function productDetail(id: string) {
  const p = PRODUCTS.find((x) => x.id === id)
  if (!p) return null
  if (p.id === PRODUCT_DETAIL.id) return { ...PRODUCT_DETAIL, base: p }
  return {
    id: p.id,
    name: p.name,
    rating: p.rating,
    reviews: p.reviews,
    price: p.price,
    description: PRODUCT_DETAIL.description,
    gallery: [p.image, ...OTHER_SHOTS],
    base: p,
  }
}

export const REVIEWS = [
  { quote: 'Absolutely beautiful quality! They look exactly like the preview.', author: 'Sarah M.', image: 'acrylic-gel' },
  { quote: 'Fast delivery and amazing customer service!', author: 'Emily R.', image: 'custom-floral' },
]

// ── Cart ──
export type CartItem = { id: string; productId?: string; name: string; price: number; qty: number; image: string; shape: NailShape; color: string; design: Design }
export const CART: CartItem[] = [
  { id: 'c1', name: 'Classic Acrylic', price: 2500, qty: 1, image: 'classic-acrylic', shape: 'Almond', color: 'Rosy Pink', design: 'None' },
  { id: 'c2', name: '3D Floral Design', price: 2800, qty: 1, image: 'floral-3d', shape: 'Stiletto', color: 'Blush', design: 'Floral' },
]

// ── Orders ──
export type OrderStatus = 'New' | 'Processing' | 'Shipped' | 'Delivered'
export const STATUS_STYLES: Record<OrderStatus, string> = {
  New: 'bg-[#F8DDE3] text-[#A65B6C]',
  Processing: 'bg-[#DCE8F8] text-[#3466A8]',
  Shipped: 'bg-[#DDF1E3] text-[#2F8A4E]',
  Delivered: 'bg-[#D3E9DA] text-[#1E5E36]',
}

export type MyOrder = { id: string; date: string; total: number; status: OrderStatus; image: string }
export const MY_ORDERS: MyOrder[] = [
  { id: '#NH-1024', date: 'Mar 27, 2025', total: 2500, status: 'New', image: 'confirm-preview' },
  { id: '#NH-1018', date: 'Mar 20, 2025', total: 2800, status: 'Processing', image: 'floral-3d' },
  { id: '#NH-1009', date: 'Mar 12, 2025', total: 2200, status: 'Shipped', image: 'white-tip-french' },
]

export type AdminOrderDetails = {
  shape: NailShape
  color: string
  design: Design
  length: number
  phone: string
  address: string
  note: string
  payment?: 'cod' | 'card'
  references: string[]
}
export type AdminOrder = { id: string; customer: string; date: string; status: OrderStatus; orderRef?: string; details?: AdminOrderDetails }

export const ADMIN_ORDERS: AdminOrder[] = [
  { id: '#001', customer: 'Emma Wilson', date: 'Mar 27, 2025', status: 'New' },
  { id: '#002', customer: 'Olivia Brown', date: 'Mar 27, 2025', status: 'New' },
  { id: '#003', customer: 'Sophia Miller', date: 'Mar 26, 2025', status: 'Processing' },
  { id: '#004', customer: 'Ava Davis', date: 'Mar 26, 2025', status: 'Shipped' },
  { id: '#005', customer: 'Isabella Taylor', date: 'Mar 25, 2025', status: 'Delivered' },
]

export const SHIPPING_ADDRESS = {
  name: 'Emma Wilson',
  street: '1234 Maple Street',
  city: 'New York, NY 10001',
  phone: '+1 (123) 456-7890',
}

/** Details shown for seeded admin rows that have no stored order behind them. */
export const DEFAULT_ADMIN_DETAILS: AdminOrderDetails = {
  shape: 'Almond',
  color: 'Rosy Pink',
  design: 'Floral',
  length: 3,
  phone: SHIPPING_ADDRESS.phone,
  address: `${SHIPPING_ADDRESS.street}, ${SHIPPING_ADDRESS.city}`,
  note: 'Please deliver in the evening.',
  references: ['confirm-preview', 'custom-floral', 'vibe-preview'],
}
