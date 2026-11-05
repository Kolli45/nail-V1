import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  Bell,
  ChartColumn,
  ChevronDown,
  ClipboardList,
  EllipsisVertical,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Trash,
  Users,
  User,
  Eye,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { DEFAULT_ADMIN_DETAILS, SHIPPING_ADDRESS, STATUS_STYLES, currency, img } from '@/data/fixtures'
import type { OrderStatus } from '@/data/fixtures'
import { useHaven } from '@/lib/store'
import { BottomNav, Btn, Card, DesignIcon, LotusIcon, Logo, NailShapeIcon, Phone, ScreenBody, Stepper, TitleHeader, colorHex, useFrameMode } from '../primitives'

export function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-semibold', STATUS_STYLES[status], className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

/* ───────────── 9 · Cart ───────────── */

export function CartScreen() {
  const { cart: items, setQty, removeItem, setSource } = useHaven()
  const navigate = useNavigate()
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const checkout = (
    <Btn
      className="w-full"
      disabled={items.length === 0}
      onClick={() => {
        setSource('cart')
        navigate({ to: '/shipping' })
      }}
    >
      Checkout
    </Btn>
  )
  const thumb = 'w-[92px] h-[104px] @3xl:w-[130px] @3xl:h-[140px] rounded-[16px] object-cover'
  const chip = 'inline-flex items-center gap-1 rounded-full bg-blush px-2 @3xl:px-3 py-0.5 @3xl:py-1 text-[10px] @3xl:text-[12px] font-medium text-ink'
  return (
    <Phone>
      <TitleHeader title="My Cart" fallback="/shop" />
      <ScreenBody className="px-4 pt-2 pb-3 space-y-3 @3xl:px-0 @3xl:pt-4 @3xl:space-y-0 @3xl:grid @3xl:grid-cols-[1.6fr_1fr] @3xl:gap-8 @3xl:items-start">
        <div className="space-y-3 @3xl:space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="flex gap-3 @3xl:gap-5 p-2.5 @3xl:p-3">
            {item.productId ? (
              <Link to="/product/$id" params={{ id: item.productId }} className="shrink-0">
                <img src={img(item.image, 130, 140)} alt={item.name} className={thumb} loading="lazy" />
              </Link>
            ) : (
              <img src={img(item.image, 130, 140)} alt={item.name} className={thumb} loading="lazy" />
            )}
            <div className="flex-1 min-w-0 flex flex-col @3xl:py-1.5 @3xl:pr-1.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[14px] @3xl:text-[17px] font-semibold text-ink leading-tight pt-0.5">{item.name}</h3>
                <button
                  type="button"
                  aria-label="Remove"
                  onClick={() => removeItem(item.id)}
                  className="grid size-7 place-items-center rounded-full text-mute hover:bg-blush hover:text-burgundy -mt-0.5 -mr-0.5"
                >
                  <Trash className="size-4" strokeWidth={1.7} />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1 @3xl:gap-1.5 mt-1.5 @3xl:mt-2.5">
                <span className={chip}>
                  <NailShapeIcon shape={item.shape} className="h-3 @3xl:h-3.5" />
                  {item.shape}
                </span>
                <span className={chip}>
                  <span className="size-2.5 @3xl:size-3 rounded-full" style={{ backgroundColor: colorHex(item.color) }} />
                  {item.color}
                </span>
                <span className={chip}>{item.design}</span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-[15px] @3xl:text-[19px] font-bold text-burgundy">{currency(item.price * item.qty)}</span>
                <Stepper size="sm" value={item.qty} onChange={(n) => setQty(item.id, n)} />
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <Link to="/shop" aria-label="Shop" className="block">
            <Card className="py-10 @3xl:py-20 text-center hover:border-rose">
              <ShoppingCart className="mx-auto size-8 @3xl:size-12 text-rose" strokeWidth={1.5} />
            </Card>
          </Link>
        )}
        </div>
        <Card className="px-4 py-3 @3xl:px-6 @3xl:py-6 @3xl:sticky @3xl:top-[100px]">
          <div className="flex justify-between text-[13px] @3xl:text-[15px]">
            <span className="text-mute">Subtotal</span>
            <span className="font-medium text-ink">{currency(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center border-t border-line mt-2.5 pt-2.5 @3xl:mt-4 @3xl:pt-4">
            <span className="text-[14px] @3xl:text-[16px] font-semibold text-ink">Total</span>
            <span className="text-[19px] @3xl:text-[26px] font-bold text-burgundy">{currency(subtotal)}</span>
          </div>
          <div className="hidden @3xl:block mt-6">{checkout}</div>
        </Card>
      </ScreenBody>
      <div className="@3xl:hidden shrink-0 px-4 pb-3">{checkout}</div>
      <BottomNav active="Shop" />
    </Phone>
  )
}

/* ───────────── 10 · Orders ───────────── */

export function OrdersScreen() {
  const { orders } = useHaven()
  return (
    <Phone>
      <TitleHeader title="My Orders" back={false} />
      <ScreenBody className="px-4 pt-3 pb-3 space-y-3 @3xl:px-0 @3xl:pt-4 @3xl:space-y-0 @3xl:grid @3xl:grid-cols-2 @3xl:gap-5">
        {orders.map((o) => (
          <Card key={o.id} className="flex gap-3 @3xl:gap-5 p-2.5 @3xl:p-3 items-center">
            <img src={img(o.image, 120, 120)} alt="" className="size-[84px] @3xl:size-[120px] rounded-[16px] object-cover" loading="lazy" />
            <div className="flex-1 min-w-0 @3xl:pr-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] @3xl:text-[18px] font-bold text-ink">{o.id}</h3>
                <StatusBadge status={o.status} />
              </div>
              <p className="text-[12px] @3xl:text-[14px] text-mute mt-1">{o.date}</p>
              <p className="text-[15px] @3xl:text-[20px] font-bold text-burgundy mt-2 @3xl:mt-3">{currency(o.total)}</p>
            </div>
          </Card>
        ))}
      </ScreenBody>
      <BottomNav active="Orders" />
    </Phone>
  )
}

/* ───────────── 11 · Admin Control Panel (desktop) ───────────── */

const ADMIN_NAV = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Orders', icon: ClipboardList },
  { label: 'Customers', icon: Users },
  { label: 'Products', icon: Package },
  { label: 'Analytics', icon: ChartColumn },
  { label: 'Settings', icon: Settings },
]
const STATUSES: OrderStatus[] = ['New', 'Processing', 'Shipped', 'Delivered']

export function AdminScreen() {
  const mode = useFrameMode()
  const app = mode === 'app'
  const { adminOrders, setAdminStatus } = useHaven()
  const [nav, setNav] = useState('Orders')
  const [tab, setTab] = useState<OrderStatus>('New')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const newCount = adminOrders.filter((o) => o.status === 'New').length
  const tabs: { key: OrderStatus; label: string }[] = STATUSES.map((st) => ({ key: st, label: st === 'New' ? `New Orders (${newCount})` : st }))
  const q = query.trim().toLowerCase()
  const rows = adminOrders.filter(
    (o) => (!app || o.status === tab) && (!q || o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)),
  )
  const selected = adminOrders.find((o) => o.id === selectedId) ?? rows[0] ?? adminOrders[0]
  const details = selected?.details ?? DEFAULT_ADMIN_DETAILS
  const status = selected?.status ?? 'New'

  return (
    <div
      className={cn(
        'flex bg-surface text-ink overflow-hidden',
        app
          ? 'min-h-dvh h-dvh'
          : 'w-[980px] h-[844px] rounded-[24px] border border-line shadow-[0_30px_60px_-20px_rgba(122,30,46,0.35),0_8px_24px_rgba(122,30,46,0.08)]',
      )}
    >
      {/* Sidebar */}
      <aside className={cn('w-[200px] shrink-0 flex-col bg-[linear-gradient(180deg,#8C3A4C_0%,#7A1E2E_100%)] text-white px-4 py-7', app ? 'hidden md:flex' : 'flex')}>
        <Link to="/" aria-label="Nail Haven home">
          <Logo size="md" light tagline={null} />
        </Link>
        <nav className="mt-9 space-y-1">
          {ADMIN_NAV.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setNav(label)}
              className={cn(
                'w-full h-11 rounded-[14px] flex items-center gap-3 px-3.5 text-[13.5px] font-medium transition',
                nav === label ? 'bg-white text-burgundy shadow-soft' : 'text-white/80 hover:bg-white/10 hover:text-white',
              )}
            >
              <Icon className="size-[18px]" strokeWidth={1.8} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto text-center">
          <LotusIcon className="w-7 mx-auto text-white/50" />
          <p className="mt-2 text-[9px] leading-[1.7] tracking-[0.24em] text-white/60">
            BEAUTY BUSINESS
            <br />
            BIGGER TOGETHER
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col bg-linear-to-b from-[#FDF2F4] to-surface">
        <header className={cn('h-[64px] shrink-0 flex items-center justify-end gap-5 border-b border-line bg-white/70', app ? 'px-4 md:px-7' : 'px-7')}>
          {app && (
            <Link to="/" aria-label="Nail Haven home" className="mr-auto md:hidden">
              <Logo size="xs" tagline={null} />
            </Link>
          )}
          <button type="button" aria-label="Notifications" className="relative grid size-10 place-items-center rounded-full bg-surface border border-line text-burgundy">
            <Bell className="size-[19px]" strokeWidth={1.8} />
            {newCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid min-w-[18px] h-[18px] px-1 place-items-center rounded-full bg-[#E0384B] text-[10px] font-bold text-white ring-2 ring-white">
                {newCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-full bg-rose-grad text-white ring-2 ring-white shadow-soft">
              <User className="size-5" strokeWidth={1.8} />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-ink">Admin</p>
              <p className="text-[11px] text-mute">Salon Owner</p>
            </div>
            <ChevronDown className="size-4 text-mute" />
          </div>
        </header>

        <main className={cn('flex-1 min-h-0 overflow-y-auto no-scrollbar py-5', app ? 'px-4 md:px-7' : 'px-7')}>
          <h1 className="font-serif text-[26px] font-semibold text-burgundy">Orders Management</h1>

          <div className="flex gap-3 mt-3.5">
            <label className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-mute" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-10 rounded-full bg-white border border-line pl-10 pr-4 text-[13px] outline-none focus:border-rose focus:ring-2 focus:ring-rose/20"
                aria-label="Search"
              />
            </label>
            <label className="relative w-[140px] sm:w-[170px] shrink-0">
              <select
                aria-label="Status"
                value={tab}
                onChange={(e) => setTab(e.target.value as OrderStatus)}
                className="appearance-none w-full h-10 rounded-full bg-white border border-line pl-4 pr-9 text-[13px] text-ink outline-none focus:border-rose"
              >
                {STATUSES.map((st) => (
                  <option key={st}>{st}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-mute pointer-events-none" />
            </label>
          </div>

          <div className="max-w-full overflow-x-auto no-scrollbar mt-3.5">
            <div className="flex gap-1.5 p-1 rounded-full bg-white border border-line w-fit">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    setTab(t.key)
                    setSelectedId(null)
                  }}
                  className={cn(
                    'h-8 px-4 rounded-full text-[12.5px] font-semibold transition whitespace-nowrap',
                    tab === t.key ? 'bg-rose-grad text-white shadow-rose' : 'text-mute hover:text-burgundy',
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <Card className="mt-3.5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-[13px]">
              <thead>
                <tr className="bg-[#FBEAEE] text-left text-[11.5px] font-semibold text-mute">
                  <th className="py-2.5 pl-5 w-[70px] font-semibold">#</th>
                  <th className="py-2.5 font-semibold">Customer</th>
                  <th className="py-2.5 font-semibold">Date</th>
                  <th className="py-2.5 font-semibold">Status</th>
                  <th className="py-2.5 pr-5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelectedId(o.id)}
                    className={cn('border-t border-line cursor-pointer transition', selected?.id === o.id ? 'bg-[#FDF0F3]' : 'hover:bg-white')}
                  >
                    <td className="py-2 pl-5 font-semibold text-burgundy">{o.id}</td>
                    <td className="py-2 font-medium">{o.customer}</td>
                    <td className="py-2 text-mute">{o.date}</td>
                    <td className="py-2">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="py-2 pr-4 text-right">
                      <button type="button" aria-label="Actions" className="inline-grid size-8 place-items-center rounded-full text-mute hover:bg-blush hover:text-burgundy">
                        <EllipsisVertical className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr className="border-t border-line">
                    <td colSpan={5} className="py-6 text-center text-mute">
                      —
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>

          {/* Order details */}
          <Card className="mt-4 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-[18px] font-semibold text-burgundy">Order Details</h2>
              <StatusBadge status={status} />
            </div>
            <div className={cn('grid gap-5 mt-3', app ? 'grid-cols-1 lg:grid-cols-[1fr_1.15fr_1.15fr]' : 'grid-cols-[1fr_1.15fr_1.15fr]')}>
              <div>
                <h3 className="text-[12px] font-semibold text-ink mb-2">Customer Information</h3>
                <dl className="grid grid-cols-[62px_1fr] gap-y-1.5 text-[12px]">
                  <dt className="text-mute">Name</dt>
                  <dd className="font-medium">{selected?.details ? selected.customer : SHIPPING_ADDRESS.name}</dd>
                  <dt className="text-mute">Phone</dt>
                  <dd className="font-medium">{details.phone}</dd>
                  <dt className="text-mute">Address</dt>
                  <dd className="font-medium leading-snug">{details.address}</dd>
                </dl>
              </div>
              <div className={cn('border-line', app ? 'lg:border-l lg:pl-5' : 'border-l pl-5')}>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { k: 'Shape', v: details.shape, icon: <NailShapeIcon shape={details.shape} className="h-5" /> },
                    { k: 'Color', v: details.color, icon: <span className="size-4 rounded-full" style={{ backgroundColor: colorHex(details.color) }} /> },
                    { k: 'Design', v: details.design, icon: <DesignIcon design={details.design} className="size-4" /> },
                    { k: 'Length', v: String(details.length), icon: <span className="text-[12px] font-bold text-rose-deep">{details.length}</span> },
                  ].map((d) => (
                    <div key={d.k} className="flex flex-col items-center text-center">
                      <span className="grid size-10 place-items-center rounded-[12px] bg-[#FBEAEE] border border-line">{d.icon}</span>
                      <span className="text-[10.5px] text-mute mt-1">{d.k}:</span>
                      <span className="text-[11px] font-semibold text-ink leading-tight">{d.v}</span>
                    </div>
                  ))}
                </div>
                {details.note && (
                  <p className="mt-3 rounded-[12px] bg-blush/70 px-3 py-2 text-[11.5px] text-ink">
                    <span className="font-semibold text-burgundy">Note: </span>
                    {details.note}
                  </p>
                )}
              </div>
              <div className={cn('border-line', app ? 'lg:border-l lg:pl-5' : 'border-l pl-5')}>
                <div className="grid grid-cols-3 gap-2">
                  {details.references.map((r, i) => (
                    <img key={r + i} src={img(r, 76, 60)} alt="Reference photo" className="w-full h-[60px] rounded-[12px] object-cover" loading="lazy" />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <label className="relative">
                    <select
                      aria-label="Update Status"
                      value=""
                      onChange={(e) => selected && setAdminStatus(selected.id, e.target.value as OrderStatus)}
                      className="appearance-none w-full h-10 rounded-full bg-white border border-line pl-3.5 pr-8 text-[12px] font-semibold text-ink outline-none focus:border-rose"
                    >
                      <option value="" disabled hidden>
                        Update Status
                      </option>
                      <option value="New">New</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-mute pointer-events-none" />
                  </label>
                  <button type="button" className="h-10 rounded-full bg-rose-grad text-white text-[12px] font-semibold shadow-rose inline-flex items-center justify-center gap-1.5">
                    <Eye className="size-4" strokeWidth={1.8} />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
