import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Gem,
  Heart,
  Menu,
  MessageCircle,
  Search,
  Send,
  Share2,
  ShoppingBag,
  Truck,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { FILTERS, PRODUCTS, PRODUCT_DETAIL, REVIEWS, currency, img, productDetail } from '@/data/fixtures'
import type { Design, NailShape, Product } from '@/data/fixtures'
import { itemExtra, useHaven } from '@/lib/store'
import {
  BottomNav,
  Btn,
  CartIconBadge,
  Card,
  ColorPicker,
  DesignPicker,
  IconButton,
  InnerHeader,
  Logo,
  Phone,
  ScreenBody,
  SectionLabel,
  ShapePicker,
  Stars,
  Stepper,
  TitleHeader,
} from '../primitives'
import type { To } from '../primitives'

/** Default options used when a ready design is added without customizing. */
const DEFAULT_PICK = { shape: 'Almond' as NailShape, color: 'Rose', design: 'None' as Design }

export { CartIconBadge }

/* ───────────── 1 · Home ───────────── */

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14.5 3h3c.2 2.1 1.6 3.6 3.5 3.8v3.1c-1.3 0-2.6-.4-3.6-1.1v6.4a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3.2a2.7 2.7 0 1 0 2 2.6Z" />
    </svg>
  )
}

function ServiceCard({ eyebrow, title, bullets, cta, image, to }: { eyebrow: string; title: string; bullets: string[]; cta: string; image: string; to: To }) {
  return (
    <Card className="relative flex gap-2.5 p-1.5 @3xl:gap-5 @3xl:p-3">
      <img
        src={img(image, 200, 200)}
        alt=""
        className="w-[112px] h-[104px] @3xl:w-[170px] @3xl:h-[180px] @5xl:w-[200px] @5xl:h-[200px] rounded-[16px] object-cover shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0 py-0.5 @3xl:py-2 @3xl:pr-12">
        <p className="text-[8px] @3xl:text-[11px] leading-none tracking-[0.18em] text-mute font-medium mt-0.5">{eyebrow}</p>
        <h3 className="font-serif text-[15px] @3xl:text-[22px] @5xl:text-[24px] font-semibold text-burgundy leading-[1.15] mt-1 @3xl:mt-2">{title}</h3>
        <ul className="mt-1 @3xl:mt-3 @3xl:space-y-1">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-1.5 @3xl:gap-2 text-[10px] leading-[14px] @3xl:text-[14px] @3xl:leading-[22px] text-ink">
              <span className="grid size-[11px] @3xl:size-[17px] place-items-center rounded-full bg-rose-grad text-white shrink-0">
                <Check className="size-[8px] @3xl:size-[11px]" strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <Link
          to={to}
          className="mt-1 @3xl:mt-4 inline-flex items-center h-[24px] @3xl:h-[40px] rounded-full bg-rose-grad px-4 @3xl:px-6 text-[10.5px] @3xl:text-[13.5px] font-semibold text-white shadow-rose hover:brightness-105"
        >
          {cta}
        </Link>
      </div>
      <Link
        to={to}
        aria-label={cta}
        className="absolute top-1/2 -translate-y-1/2 right-2.5 @3xl:top-4 @3xl:right-4 @3xl:translate-y-0 grid size-7 @3xl:size-10 place-items-center rounded-full border border-line bg-white text-burgundy shadow-soft hover:border-rose"
      >
        <ChevronRight className="size-4 @3xl:size-5" />
      </Link>
    </Card>
  )
}

export function HomeScreen() {
  return (
    <Phone>
      <div className="@3xl:hidden shrink-0 grid grid-cols-[48px_1fr_48px] items-center px-3 h-[46px]">
        <IconButton label="Menu">
          <Menu className="size-[22px]" strokeWidth={1.7} />
        </IconButton>
        <Logo size="sm" />
        <CartIconBadge />
      </div>
      <ScreenBody className="px-3 pb-1 @3xl:px-0">
        {/* Hero */}
        <section className="relative -mx-3 px-4 pt-1.5 min-h-[234px] @3xl:mx-0 @3xl:px-0 @3xl:pt-10 @3xl:min-h-0 @3xl:grid @3xl:grid-cols-2 @3xl:gap-10 @5xl:gap-14 @3xl:items-center">
          <div className="absolute right-0 top-0 h-[234px] w-[54%] overflow-hidden rounded-bl-[28px] [mask-image:linear-gradient(to_right,transparent_0%,black_28%)] @3xl:static @3xl:order-2 @3xl:w-full @3xl:h-[440px] @5xl:h-[520px] @3xl:rounded-[28px] @3xl:[mask-image:none] @3xl:shadow-soft">
            <img src={img('hero-hand', 600, 560)} alt="Hand with long almond nails in sheer pink" className="size-full object-cover object-[65%_center]" />
            <p className="absolute bottom-2.5 right-3 @3xl:bottom-6 @3xl:right-7 font-script text-[22px] @3xl:text-[40px] @5xl:text-[46px] leading-none text-burgundy/75 -rotate-6">More Than Nails ♡</p>
          </div>
          <div className="relative w-[226px] @3xl:w-auto @3xl:order-1">
            <p className="text-[8.5px] @3xl:text-[12px] leading-none tracking-[0.2em] font-medium text-mute mt-1">PREMIUM NAIL SERVICES</p>
            <h1 className="font-serif text-[24px] @3xl:text-[44px] @5xl:text-[58px] leading-[1.12] @3xl:leading-[1.08] font-semibold text-burgundy mt-1.5 @3xl:mt-4">
              Beautiful Nails, Happier You{' '}
              <Heart className="inline size-[18px] @3xl:size-[34px] @5xl:size-[42px] -mt-1 @3xl:-mt-2 text-burgundy" strokeWidth={1.6} />
            </h1>
            <p className="text-[11px] @3xl:text-[16px] @5xl:text-[18px] leading-[1.4] @3xl:leading-[1.6] text-ink/80 mt-1 @3xl:mt-5 @3xl:max-w-[460px]">
              Create your own custom nail set or choose from our best-selling collections.
            </p>
            <div className="@3xl:flex @3xl:flex-wrap @3xl:gap-3 @3xl:mt-8">
              <Btn to="/design" className="w-full mt-2.5 @3xl:w-auto @3xl:mt-0 @3xl:px-8" icon={<ArrowRight className="size-[18px]" />}>
                Start Designing
              </Btn>
              <Btn
                to="/shop"
                variant="secondary"
                className="w-full mt-1.5 text-[14px] @3xl:text-[15px] @3xl:w-auto @3xl:mt-0 @3xl:px-8"
                leading={<ShoppingBag className="size-[17px]" strokeWidth={1.7} />}
              >
                Shop Ready Designs
              </Btn>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-3 mt-2 @3xl:mt-10 rounded-full bg-surface/80 border border-line py-1.5 @3xl:py-4">
          {[
            { icon: Gem, label: 'Premium Quality' },
            { icon: Truck, label: 'Fast Delivery' },
            { icon: Heart, label: 'Trusted by 10K+' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-1.5 @3xl:gap-3">
              <span className="grid size-[24px] @3xl:size-[40px] place-items-center rounded-full bg-[#F8DDE3] text-rose-deep">
                <Icon className="size-[13px] @3xl:size-[19px]" strokeWidth={1.8} />
              </span>
              <span className="text-[9.5px] @3xl:text-[15px] text-ink font-semibold whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 mt-2 @3xl:space-y-0 @3xl:grid @3xl:grid-cols-2 @3xl:gap-5 @3xl:mt-8">
          <ServiceCard
            eyebrow="PROFESSIONAL SERVICE"
            title="Acrylic & Gel Nails"
            bullets={['Long-lasting results', 'Salon quality finish', 'Fast delivery']}
            cta="View Collection"
            image="acrylic-gel"
            to="/shop"
          />
          <ServiceCard
            eyebrow="MAKE IT YOURS"
            title="Custom Nail Design"
            bullets={['Choose your shape', 'Pick your colors', 'Add personal designs']}
            cta="Start Creating"
            image="custom-floral"
            to="/design"
          />
        </div>

        <div className="mt-2 @3xl:mt-14 flex items-center justify-between">
          <h3 className="font-serif text-[15px] @3xl:text-[28px] font-semibold text-burgundy">What Our Customers Say</h3>
          <button type="button" className="text-[10px] @3xl:text-[14px] font-semibold text-rose-deep hover:text-burgundy">
            See All Reviews →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-1 @3xl:gap-5 @3xl:mt-5">
          {REVIEWS.map((r) => (
            <Card key={r.author} className="px-2 py-1.5 rounded-[16px] @3xl:rounded-[20px] @3xl:px-6 @3xl:py-5">
              <div className="flex items-center gap-1.5 @3xl:gap-3">
                <img src={img(r.image, 44, 44)} alt="" className="size-[18px] @3xl:size-[44px] rounded-full object-cover" loading="lazy" />
                <Stars className="text-[9.5px] @3xl:text-[15px]" />
                <span className="ml-auto text-[8.5px] @3xl:text-[14px] font-medium @3xl:font-semibold text-mute @3xl:text-ink">{r.author}</span>
              </div>
              <p className="text-[9px] @3xl:text-[16px] leading-[1.3] @3xl:leading-[1.6] text-ink mt-1 @3xl:mt-4">“{r.quote}”</p>
            </Card>
          ))}
        </div>

        <div className="mt-1.5 @3xl:mt-14 flex items-end justify-between @3xl:flex-col @3xl:items-center @3xl:gap-2">
          <h3 className="font-serif text-[15px] @3xl:text-[28px] font-semibold text-burgundy leading-none">Follow Us</h3>
          <p className="text-[9.5px] @3xl:text-[15px] text-mute">Get inspired with our latest designs!</p>
        </div>
        <div className="grid grid-cols-4 gap-1.5 mt-1.5 @3xl:gap-4 @3xl:mt-6 @3xl:max-w-3xl @3xl:mx-auto">
          {[
            { icon: InstagramGlyph, label: 'Instagram' },
            { icon: TikTokGlyph, label: 'TikTok' },
            { icon: MessageCircle, label: 'WhatsApp' },
            { icon: Send, label: 'Telegram' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              className="h-8 @3xl:h-12 rounded-full bg-surface border border-line shadow-soft flex items-center justify-center gap-1 @3xl:gap-2 text-[10px] @3xl:text-[14px] font-semibold text-ink hover:border-rose"
            >
              <Icon className="size-[13px] @3xl:size-[18px] text-burgundy" />
              {label}
            </button>
          ))}
        </div>
      </ScreenBody>
      <BottomNav active="Home" />
    </Phone>
  )
}

/* ───────────── 2 · All Designs ───────────── */

function QuickAdd({ product }: { product: Product }) {
  const { addToCart } = useHaven()
  const [added, setAdded] = useState(false)
  return (
    <button
      type="button"
      aria-label="Add to cart"
      onClick={() => {
        addToCart({ productId: product.id, name: product.name, price: product.price, qty: 1, image: product.image, ...DEFAULT_PICK })
        setAdded(true)
        window.setTimeout(() => setAdded(false), 1200)
      }}
      className="grid size-8 @3xl:size-10 place-items-center rounded-[10px] @3xl:rounded-[12px] bg-rose-grad text-white shadow-rose transition active:scale-90 hover:brightness-105"
    >
      {added ? <Check className="size-4 @3xl:size-5" strokeWidth={2.6} /> : <ShoppingBag className="size-4 @3xl:size-5" strokeWidth={1.9} />}
    </button>
  )
}

export function AllDesignsScreen() {
  const [filter, setFilter] = useState('All')
  const [liked, setLiked] = useState<Record<string, boolean>>({ 'white-tip-french': true })
  const products = filter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.tags.includes(filter))
  return (
    <Phone>
      <TitleHeader
        title="All Designs"
        fallback="/"
        right={
          <IconButton label="Search">
            <Search className="size-[21px]" strokeWidth={1.8} />
          </IconButton>
        }
      />
      <div className="shrink-0 flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar @3xl:justify-center @3xl:px-0 @3xl:pt-2 @3xl:pb-6 @3xl:gap-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'h-9 @3xl:h-11 px-[18px] @3xl:px-6 rounded-full text-[13px] @3xl:text-[14px] font-semibold transition shrink-0',
              filter === f ? 'bg-rose-grad text-white shadow-rose' : 'bg-surface border border-line text-ink hover:border-rose',
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <ScreenBody className="px-4 pt-1.5 pb-4 @3xl:px-0 @3xl:pt-0">
        <div className="grid grid-cols-2 gap-3 @3xl:grid-cols-3 @5xl:grid-cols-4 @3xl:gap-5">
          {products.map((p) => (
            <Card key={p.id} className="p-2 @3xl:p-3 transition hover:-translate-y-0.5 hover:shadow-rose">
              <div className="relative">
                <Link to="/product/$id" params={{ id: p.id }} className="block">
                  <img src={img(p.image, 300, 300)} alt={p.name} className="w-full h-[168px] @3xl:h-[250px] rounded-[16px] object-cover" loading="lazy" />
                </Link>
                <button
                  type="button"
                  aria-label="Add to favorites"
                  onClick={() => setLiked((l) => ({ ...l, [p.id]: !l[p.id] }))}
                  className="absolute top-2 left-2 @3xl:top-3 @3xl:left-3 grid size-8 @3xl:size-9 place-items-center rounded-full bg-white/90 text-burgundy shadow-soft"
                >
                  <Heart className="size-4" strokeWidth={1.8} fill={liked[p.id] ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="px-1 pt-2 pb-0.5 @3xl:px-1.5 @3xl:pt-3">
                <Link to="/product/$id" params={{ id: p.id }} className="block">
                  <h3 className="text-[13.5px] @3xl:text-[16px] font-semibold text-ink truncate hover:text-burgundy">{p.name}</h3>
                </Link>
                <div className="flex items-center gap-1 mt-0.5 @3xl:mt-1 text-[11px] @3xl:text-[13px] text-mute">
                  <Stars rating={p.rating} className="text-[11px] @3xl:text-[13px]" />
                  <span className="font-semibold text-ink">{p.rating}</span>({p.reviews})
                </div>
                <div className="flex items-center justify-between mt-1.5 @3xl:mt-3">
                  <span className="text-[15px] @3xl:text-[18px] font-bold text-burgundy">{currency(p.price)}</span>
                  <QuickAdd product={p} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScreenBody>
      <BottomNav active="Shop" />
    </Phone>
  )
}

/* ───────────── 3 · Product Details ───────────── */

export function ProductDetailsScreen({ productId = PRODUCT_DETAIL.id }: { productId?: string }) {
  const [active, setActive] = useState(0)
  const [liked, setLiked] = useState(false)
  const { addToCart } = useHaven()
  const navigate = useNavigate()
  const p = productDetail(productId) ?? { ...PRODUCT_DETAIL, base: PRODUCTS[0] }
  const share = () => {
    const url = window.location.href
    if (navigator.share) navigator.share({ title: p.name, url }).catch(() => {})
    else navigator.clipboard?.writeText(url).catch(() => {})
  }
  const add = () => {
    addToCart({ productId: p.id, name: p.base.name, price: p.price, qty: 1, image: p.base.image, ...DEFAULT_PICK })
    navigate({ to: '/cart' })
  }
  const actions = (
    <>
      <Btn leading={<ShoppingBag className="size-[18px]" strokeWidth={1.9} />} onClick={add}>
        Add to Cart
      </Btn>
      <Btn variant="secondary" to="/customize/$id" params={{ id: p.id }}>
        Customize
      </Btn>
    </>
  )
  return (
    <Phone>
      <InnerHeader
        fallback="/shop"
        right={
          <div className="flex -mr-2">
            <IconButton label="Favorite" onClick={() => setLiked(!liked)}>
              <Heart className="size-[21px]" strokeWidth={1.8} fill={liked ? 'currentColor' : 'none'} />
            </IconButton>
            <IconButton label="Share" onClick={share}>
              <Share2 className="size-[20px]" strokeWidth={1.8} />
            </IconButton>
          </div>
        }
      />
      <ScreenBody className="px-4 pt-2 pb-3 @3xl:px-0 @3xl:pt-4 @3xl:grid @3xl:grid-cols-[1.1fr_1fr] @3xl:gap-10 @5xl:gap-14 @3xl:items-start">
        <div className="@3xl:sticky @3xl:top-[100px]">
          <div className="relative">
            <img
              src={img(p.gallery[active], 600, 520)}
              alt={p.name}
              className="w-full h-[300px] @3xl:h-[440px] @5xl:h-[520px] rounded-[20px] @3xl:rounded-[24px] object-cover shadow-soft"
            />
            <div className="absolute bottom-3 @3xl:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {p.gallery.map((_, i) => (
                <span key={i} className={cn('h-1.5 rounded-full transition-all', i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/60')} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2.5 @3xl:gap-3 mt-2.5 @3xl:mt-3">
            {p.gallery.map((g, i) => (
              <button
                key={g}
                type="button"
                onClick={() => setActive(i)}
                className={cn('rounded-[16px] overflow-hidden border-2 transition', i === active ? 'border-rose-deep' : 'border-transparent opacity-85 hover:opacity-100')}
              >
                <img src={img(g, 150, 110)} alt="" className="w-full h-[64px] @3xl:h-[96px] @5xl:h-[110px] object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        <div className="@3xl:pt-4">
          <h1 className="font-serif text-[24px] @3xl:text-[36px] @5xl:text-[42px] font-semibold text-burgundy mt-3.5 @3xl:mt-0 leading-tight">{p.name}</h1>
          <div className="flex items-center justify-between mt-1 @3xl:mt-3 @3xl:flex-col @3xl:items-start @3xl:gap-4">
            <div className="flex items-center gap-1.5 text-[12.5px] @3xl:text-[14px] text-mute">
              <Stars rating={p.rating} className="text-[14px] @3xl:text-[17px]" />
              <span className="font-semibold text-ink">{p.rating}</span>({p.reviews}) reviews
            </div>
            <span className="text-[22px] @3xl:text-[30px] font-bold text-burgundy">{currency(p.price)}</span>
          </div>
          <p className="text-[13px] @3xl:text-[16px] leading-[1.55] @3xl:leading-[1.7] text-ink/80 mt-2 @3xl:mt-5">{p.description}</p>
          <div className="grid grid-cols-3 gap-2 @3xl:gap-3 mt-3.5 @3xl:mt-7">
            {[
              { icon: Gem, label: 'High Quality' },
              { icon: Clock, label: 'Long-lasting' },
              { icon: Truck, label: 'Fast Delivery' },
            ].map(({ icon: Icon, label }) => (
              <Card key={label} className="flex flex-col items-center gap-1.5 @3xl:gap-2 py-2.5 @3xl:py-4 rounded-[16px]">
                <span className="grid size-8 @3xl:size-10 place-items-center rounded-full bg-[#F8DDE3] text-rose-deep">
                  <Icon className="size-4 @3xl:size-5" strokeWidth={1.7} />
                </span>
                <span className="text-[11px] @3xl:text-[13px] font-medium text-ink">{label}</span>
              </Card>
            ))}
          </div>
          <div className="hidden @3xl:grid grid-cols-2 gap-3 mt-8">{actions}</div>
        </div>
      </ScreenBody>
      <div className="@3xl:hidden shrink-0 px-4 pt-3 pb-7 bg-white/90 border-t border-line rounded-t-[24px] shadow-[0_-8px_24px_rgba(122,30,46,0.06)] grid grid-cols-2 gap-2.5">
        {actions}
      </div>
    </Phone>
  )
}

/* ───────────── 4 · Customize ───────────── */

export function CustomizeScreen({ productId = PRODUCT_DETAIL.id }: { productId?: string }) {
  const [color, setColor] = useState('Rose')
  const [shape, setShape] = useState<NailShape>('Almond')
  const [design, setDesign] = useState<Design>('None')
  const [qty, setQty] = useState(1)
  const { addToCart } = useHaven()
  const navigate = useNavigate()
  const p = productDetail(productId) ?? { ...PRODUCT_DETAIL, base: PRODUCTS[0] }
  const unit = p.price + itemExtra(design)
  const totalBar = (
    <>
      <div className="flex items-center justify-between mb-2.5 @3xl:mb-4 px-1">
        <span className="text-[13px] @3xl:text-[15px] text-mute font-medium">Total</span>
        <span className="text-[20px] @3xl:text-[26px] font-bold text-burgundy">{currency(unit * qty)}</span>
      </div>
      <Btn
        className="w-full"
        leading={<ShoppingBag className="size-[18px]" strokeWidth={1.9} />}
        onClick={() => {
          addToCart({ productId: p.id, name: p.base.name, price: unit, qty, image: p.base.image, shape, color, design })
          navigate({ to: '/cart' })
        }}
      >
        Add to Cart
      </Btn>
    </>
  )
  return (
    <Phone>
      <InnerHeader title="Customize" subtitle={p.name} fallback="/shop" />
      <ScreenBody className="px-4 pt-3 pb-3 @3xl:px-0 @3xl:pt-8 @3xl:grid @3xl:grid-cols-[0.85fr_1.15fr] @3xl:gap-10 @5xl:gap-14 @3xl:items-start">
        <div className="hidden @3xl:block sticky top-[100px]">
          <img src={img(p.gallery[0], 520, 560)} alt={p.name} className="w-full h-[440px] @5xl:h-[520px] rounded-[24px] object-cover shadow-soft" />
        </div>
        <div className="space-y-3.5 @3xl:space-y-6">
          <section>
            <SectionLabel className="@3xl:mb-3">Choose Color</SectionLabel>
            <Card className="p-2.5 @3xl:p-4">
              <ColorPicker value={color} onChange={setColor} size={34} />
            </Card>
          </section>
          <section>
            <SectionLabel className="@3xl:mb-3">Choose Shape</SectionLabel>
            <ShapePicker value={shape} onChange={setShape} />
          </section>
          <section>
            <SectionLabel className="@3xl:mb-3">Choose Design</SectionLabel>
            <DesignPicker value={design} onChange={setDesign} />
          </section>
          <section className="flex items-center justify-between">
            <h3 className="font-serif text-[16px] @3xl:text-[18px] font-semibold text-burgundy">Quantity</h3>
            <Stepper value={qty} onChange={setQty} />
          </section>
          <Card className="hidden @3xl:block p-5">{totalBar}</Card>
        </div>
      </ScreenBody>
      <div className="@3xl:hidden shrink-0 px-4 pt-3 pb-7 bg-white/90 border-t border-line rounded-t-[24px] shadow-[0_-8px_24px_rgba(122,30,46,0.06)]">{totalBar}</div>
    </Phone>
  )
}
