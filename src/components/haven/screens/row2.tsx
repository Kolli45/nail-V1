import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowRight,
  Banknote,
  Check,
  CreditCard,
  Heart,
  MapPin,
  Phone as PhoneIcon,
  ShoppingBag,
  StickyNote,
  User,
  Map as MapIcon,
  Building,
  Pencil,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { SHIPPING_ADDRESS, currency, img } from '@/data/fixtures'
import { VIBE_BASE_PRICE, itemExtra, useHaven } from '@/lib/store'
import type { Shipping } from '@/lib/store'
import {
  Btn,
  Card,
  ColorPicker,
  DesignIcon,
  DesignPicker,
  IconButton,
  InnerHeader,
  NailShapeIcon,
  Phone,
  ScreenBody,
  ShapePicker,
  StepIndicator,
  colorHex,
  useFrameMode,
} from '../primitives'
import type { To } from '../primitives'

const LENGTH_LABELS = ['Extra Short', 'Short', 'Medium', 'Long', 'Extra Long']

function FooterAction({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('shrink-0 px-4 pt-3 pb-7 @3xl:px-0 @3xl:pt-6 @3xl:pb-0', className)}>{children}</div>
}

function MiniLabel({ children }: { children: ReactNode }) {
  return <h3 className="font-serif text-[14px] @3xl:text-[18px] font-semibold text-burgundy mb-1.5 @3xl:mb-3">{children}</h3>
}

/** Desktop-only rounded panel (plain wrapper on phones). */
const panel = '@3xl:rounded-[20px] @3xl:bg-surface @3xl:border @3xl:border-line @3xl:shadow-soft'

/* ───────────── 5 · Design Your Vibe ───────────── */

export function DesignVibeScreen() {
  const { vibe, setVibe, setSource } = useHaven()
  const navigate = useNavigate()
  const { shape, color, design, length } = vibe
  const setShape = (v: typeof shape) => setVibe({ shape: v })
  const setColor = (v: string) => setVibe({ color: v })
  const setDesign = (v: typeof design) => setVibe({ design: v })
  const setLength = (v: number) => setVibe({ length: v })
  const next = (
    <Btn
      className="w-full @3xl:w-auto @3xl:px-12"
      icon={<ArrowRight className="size-[18px]" />}
      onClick={() => {
        setSource('design')
        navigate({ to: '/shipping' })
      }}
    >
      Next
    </Btn>
  )
  return (
    <Phone>
      <InnerHeader
        title="Design Your Vibe"
        subtitle="Express Yourself"
        right={
          <IconButton label="Cart" to="/cart">
            <ShoppingBag className="size-[21px]" strokeWidth={1.7} />
          </IconButton>
        }
      />
      <StepIndicator step={1} />
      <ScreenBody className="px-4 pt-3 pb-1 @3xl:px-0 @3xl:pt-8">
        <div className="flex gap-3 @3xl:gap-8 @5xl:gap-12 @3xl:items-start">
          <div className="relative w-[146px] @3xl:w-[300px] @5xl:w-[420px] shrink-0 h-[540px] @3xl:h-[600px] rounded-[20px] @3xl:rounded-[24px] overflow-hidden shadow-soft @3xl:sticky @3xl:top-[100px]">
            <img src={img('vibe-preview', 420, 640)} alt="Preview of the selected nail design" className="size-full object-cover" />
            <div className="absolute inset-x-0 top-0 h-28 @3xl:h-44 bg-linear-to-b from-white/70 to-transparent" />
            <p className="absolute top-3 left-3 @3xl:top-6 @3xl:left-6 font-script text-[25px] @3xl:text-[44px] @5xl:text-[52px] leading-[0.95] text-burgundy/70 -rotate-6">
              More
              <br />
              Than Nails
            </p>
            <span
              className="absolute bottom-3 left-3 @3xl:bottom-5 @3xl:left-5 size-6 @3xl:size-9 rounded-full ring-2 ring-white shadow-soft"
              style={{ backgroundColor: colorHex(color) }}
              aria-hidden
            />
          </div>
          <div className={cn('flex-1 min-w-0 space-y-3 @3xl:space-y-7 @3xl:p-7', panel)}>
            <section>
              <MiniLabel>Nail Shape</MiniLabel>
              <div className="@3xl:hidden">
                <ShapePicker value={shape} onChange={setShape} cols={3} compact />
              </div>
              <div className="hidden @3xl:block">
                <ShapePicker value={shape} onChange={setShape} />
              </div>
            </section>
            <section>
              <MiniLabel>Color</MiniLabel>
              <div className="@3xl:hidden">
                <ColorPicker value={color} onChange={setColor} size={20} />
              </div>
              <div className="hidden @3xl:block">
                <ColorPicker value={color} onChange={setColor} size={32} />
              </div>
            </section>
            <section>
              <MiniLabel>Design</MiniLabel>
              <div className="@3xl:hidden">
                <DesignPicker value={design} onChange={setDesign} compact />
              </div>
              <div className="hidden @3xl:block">
                <DesignPicker value={design} onChange={setDesign} />
              </div>
            </section>
            <section>
              <MiniLabel>Length</MiniLabel>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-[#A65B6C] h-1.5 cursor-pointer"
                aria-label="Length"
              />
              <div className="flex justify-between px-0.5 mt-1 @3xl:mt-2 text-[11px] @3xl:text-[13px] font-medium">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={n === length ? 'text-burgundy font-bold' : 'text-mute'}>
                    {n}
                  </span>
                ))}
              </div>
            </section>
            <div className="hidden @3xl:flex justify-end pt-2">{next}</div>
          </div>
        </div>
      </ScreenBody>
      <FooterAction className="@3xl:hidden">{next}</FooterAction>
    </Phone>
  )
}

/* ───────────── 6 · Shipping Details ───────────── */

function Field({ label, icon: Icon, children, className }: { label: string; icon: typeof User; children: ReactNode; className?: string }) {
  return (
    <label className={cn('block', className)}>
      <span className="block text-[12px] @3xl:text-[13px] font-semibold text-ink mb-1 @3xl:mb-1.5">{label}</span>
      <span className="relative flex items-start">
        <Icon className="absolute left-3.5 top-[13px] @3xl:top-[16px] size-[17px] text-rose-deep pointer-events-none" strokeWidth={1.7} />
        {children}
      </span>
    </label>
  )
}

const inputCls =
  'w-full h-[44px] @3xl:h-[50px] rounded-[14px] bg-white border border-line pl-10 pr-3 text-[13px] @3xl:text-[14px] text-ink placeholder:text-mute/70 outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/20'

export function ShippingScreen() {
  const { shipping, setShipping } = useHaven()
  const navigate = useNavigate()
  const mode = useFrameMode()
  const bind = (k: keyof Shipping) => ({
    value: shipping[k],
    onChange: (e: { target: { value: string } }) => setShipping({ ...shipping, [k]: e.target.value }),
    required: mode === 'app' && k !== 'notes',
  })
  return (
    <Phone>
      <InnerHeader title="Shipping Details" subtitle="Tell us where to deliver your order" fallback="/cart" />
      <StepIndicator step={2} />
      <ScreenBody className="px-4 pt-3 pb-1 @3xl:px-0 @3xl:pt-8">
        <form
          id="shipping-form"
          className={cn(
            'space-y-2.5 @3xl:space-y-0 @3xl:grid @3xl:grid-cols-2 @3xl:gap-x-5 @3xl:gap-y-5 @3xl:max-w-3xl @3xl:mx-auto @3xl:p-8',
            panel,
          )}
          onSubmit={(e) => {
            e.preventDefault()
            navigate({ to: '/confirm' })
          }}
        >
          <Field label="First Name" icon={User}>
            <input className={inputCls} autoComplete="given-name" {...bind('firstName')} />
          </Field>
          <Field label="Last Name" icon={User}>
            <input className={inputCls} autoComplete="family-name" {...bind('lastName')} />
          </Field>
          <Field label="Phone Number" icon={PhoneIcon}>
            <input className={inputCls} type="tel" placeholder="+213 000 00 00 00" autoComplete="tel" {...bind('phone')} />
          </Field>
          <Field label="State / Province" icon={MapIcon}>
            <input className={inputCls} placeholder="Enter your state" autoComplete="address-level1" {...bind('state')} />
          </Field>
          <Field label="City" icon={Building}>
            <input className={inputCls} autoComplete="address-level2" {...bind('city')} />
          </Field>
          <Field label="Address" icon={MapPin}>
            <input className={inputCls} autoComplete="street-address" {...bind('address')} />
          </Field>
          <Field label="Additional Notes (Optional)" icon={StickyNote} className="@3xl:col-span-2">
            <textarea
              className={cn(inputCls, 'h-[70px] @3xl:h-[96px] py-3 resize-none')}
              placeholder="Delivery instructions, preferred time"
              {...bind('notes')}
            />
          </Field>
        </form>
      </ScreenBody>
      <FooterAction className="@3xl:max-w-3xl @3xl:mx-auto @3xl:w-full">
        <Btn type="submit" form="shipping-form" className="w-full" icon={<ArrowRight className="size-[18px]" />}>
          Next
        </Btn>
      </FooterAction>
    </Phone>
  )
}

/* ───────────── 7 · Confirm Your Design ───────────── */

function EditLink({ to }: { to: To }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1 text-[11.5px] @3xl:text-[13px] font-semibold text-rose-deep hover:text-burgundy">
      <Pencil className="size-3" strokeWidth={2} />
      Edit
    </Link>
  )
}

function LengthBars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-end gap-[2px] h-3.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={cn('w-[3px] rounded-sm', n <= value ? 'bg-rose-deep' : 'bg-line')} style={{ height: `${30 + n * 14}%` }} />
      ))}
    </span>
  )
}

const cardH = 'font-serif text-[14px] @3xl:text-[18px] font-semibold text-burgundy'

export function ConfirmScreen() {
  const [payment, setPayment] = useState<'cod' | 'card'>('cod')
  const [liked, setLiked] = useState(true)
  const { vibe, shipping, source, cart, placeOrder } = useHaven()
  const navigate = useNavigate()
  const mode = useFrameMode()
  const fromCart = mode === 'app' && source === 'cart'

  const rows: { label: string; value: string; visual: ReactNode }[] = [
    { label: 'Nail Shape', value: vibe.shape, visual: <NailShapeIcon shape={vibe.shape} className="h-4" /> },
    { label: 'Color', value: vibe.color, visual: <span className="size-3.5 rounded-full" style={{ backgroundColor: colorHex(vibe.color) }} /> },
    { label: 'Design', value: vibe.design, visual: <DesignIcon design={vibe.design} className="size-3.5" /> },
    { label: 'Length', value: `${vibe.length} ${LENGTH_LABELS[vibe.length - 1]}`, visual: <LengthBars value={vibe.length} /> },
  ]

  const base = fromCart ? cart.reduce((n, i) => n + (i.price - itemExtra(i.design)) * i.qty, 0) : VIBE_BASE_PRICE
  const extra = fromCart ? cart.reduce((n, i) => n + itemExtra(i.design) * i.qty, 0) : itemExtra(vibe.design)
  const qty = fromCart ? cart.reduce((n, i) => n + i.qty, 0) : 1

  const hasShipping = Boolean(shipping.firstName && shipping.phone && shipping.address)
  const addr = hasShipping
    ? {
        name: `${shipping.firstName} ${shipping.lastName}`.trim(),
        street: shipping.address,
        city: [shipping.city, shipping.state].filter(Boolean).join(', '),
        phone: shipping.phone,
      }
    : SHIPPING_ADDRESS

  const confirm = () => {
    if (mode !== 'app') return
    if (!hasShipping) return void navigate({ to: '/shipping' })
    if (fromCart && cart.length === 0) return void navigate({ to: '/cart' })
    const id = placeOrder(payment)
    navigate({ to: '/order-confirmed/$id', params: { id: id.replace('#', '') } })
  }

  const confirmBtn = (
    <Btn className="w-full" leading={<Check className="size-[18px]" strokeWidth={2.4} />} onClick={confirm}>
      Confirm Order
    </Btn>
  )

  return (
    <Phone>
      <InnerHeader title="Confirm Your Design" fallback="/shipping" />
      <StepIndicator step={3} />
      <ScreenBody className="px-4 pt-2.5 pb-1 space-y-2 @3xl:px-0 @3xl:pt-8 @3xl:space-y-0 @3xl:grid @3xl:grid-cols-[1.25fr_1fr] @3xl:gap-8 @3xl:items-start">
        <div className="space-y-2 @3xl:space-y-5">
          <div className="relative">
            <img
              src={img(fromCart && cart[0] ? cart[0].image : 'confirm-preview', 620, 280)}
              alt={`Chosen design: ${vibe.shape}, ${vibe.color}, ${vibe.design}`}
              className="w-full h-[122px] @3xl:h-[260px] rounded-[20px] @3xl:rounded-[24px] object-cover shadow-soft"
            />
            <button
              type="button"
              aria-label="Favorite"
              onClick={() => setLiked(!liked)}
              className="absolute top-2.5 right-2.5 @3xl:top-4 @3xl:right-4 grid size-8 @3xl:size-10 place-items-center rounded-full bg-white/90 text-burgundy shadow-soft"
            >
              <Heart className="size-4 @3xl:size-5" strokeWidth={1.8} fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>

          <Card className="px-3 py-2 @3xl:px-6 @3xl:py-5">
            <h3 className={cn(cardH, 'mb-0.5 @3xl:mb-3')}>Order Summary</h3>
            {fromCart
              ? cart.map((i) => (
                  <div key={i.id} className="flex items-center gap-2 @3xl:gap-3 min-h-[30px] @3xl:min-h-[52px] text-[12px] @3xl:text-[14px] py-0.5 @3xl:py-1.5">
                    <img src={img(i.image, 44, 44)} alt="" className="size-[26px] @3xl:size-[44px] rounded-[8px] @3xl:rounded-[12px] object-cover" loading="lazy" />
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold text-ink truncate">
                        {i.name} × {i.qty}
                      </span>
                      <span className="block text-[10.5px] @3xl:text-[12.5px] text-mute truncate">
                        {i.shape} · {i.color} · {i.design}
                      </span>
                    </span>
                    <EditLink to="/cart" />
                  </div>
                ))
              : rows.map((r) => (
                  <div key={r.label} className="flex items-center h-[24px] @3xl:h-[38px] text-[12px] @3xl:text-[14px] @3xl:border-t @3xl:border-line @3xl:first-of-type:border-t-0">
                    <span className="w-[86px] @3xl:w-[130px] text-mute">{r.label}</span>
                    <span className="flex-1 flex items-center gap-2 font-semibold text-ink">
                      <span className="w-4 flex justify-center">{r.visual}</span>
                      {r.value}
                    </span>
                    <EditLink to="/design" />
                  </div>
                ))}
          </Card>

          <Card className="px-3 py-2 @3xl:px-6 @3xl:py-5">
            <div className="flex items-center justify-between">
              <h3 className={cardH}>Shipping Address</h3>
              <EditLink to="/shipping" />
            </div>
            <div className="flex gap-2 @3xl:gap-3 mt-1 @3xl:mt-3">
              <MapPin className="size-4 @3xl:size-5 text-rose-deep mt-0.5 shrink-0" strokeWidth={1.8} />
              <p className="text-[11.5px] @3xl:text-[14px] leading-[1.4] @3xl:leading-[1.6] text-ink">
                <span className="font-semibold">{addr.name}</span>
                <br />
                {[addr.street, addr.city].filter(Boolean).join(', ')}
                <br />
                <span className="text-mute">{addr.phone}</span>
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-2 @3xl:space-y-5 @3xl:sticky @3xl:top-[100px]">
          <Card className="px-3 py-2 @3xl:px-6 @3xl:py-5">
            <h3 className={cn(cardH, 'mb-0.5 @3xl:mb-3')}>Price Breakdown</h3>
            {[
              ['Base Price', currency(base)],
              ['Design Extra', currency(extra)],
              ['Quantity', String(qty)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between h-[20px] @3xl:h-[32px] items-center text-[12px] @3xl:text-[14px]">
                <span className="text-mute">{k}</span>
                <span className="font-medium text-ink">{v}</span>
              </div>
            ))}
            <div className="flex justify-between items-center border-t border-line mt-1 pt-1.5 @3xl:mt-3 @3xl:pt-4">
              <span className="text-[13px] @3xl:text-[16px] font-semibold text-ink">Total</span>
              <span className="text-[16px] @3xl:text-[24px] font-bold text-burgundy">{currency(base + extra)}</span>
            </div>
          </Card>

          <div className={cn('@3xl:px-6 @3xl:py-5', panel)}>
            <h3 className={cn(cardH, 'mb-1 @3xl:mb-3')}>Payment Method</h3>
            <div className="grid grid-cols-2 gap-2 @3xl:gap-3">
              {(
                [
                  { key: 'cod', label: 'Cash on Delivery', icon: Banknote },
                  { key: 'card', label: 'Card', icon: CreditCard },
                ] as const
              ).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPayment(key)}
                  aria-pressed={payment === key}
                  className={cn(
                    'h-[42px] @3xl:h-[52px] rounded-[14px] border flex items-center gap-2 px-3 text-[12px] @3xl:text-[13.5px] font-semibold transition',
                    payment === key ? 'border-rose-deep bg-[#FBEAEE] text-burgundy' : 'border-line bg-white text-ink hover:border-rose',
                  )}
                >
                  <span className={cn('grid size-4 shrink-0 place-items-center rounded-full border-[1.5px]', payment === key ? 'border-rose-deep' : 'border-mute/50')}>
                    {payment === key && <span className="size-2 rounded-full bg-rose-deep" />}
                  </span>
                  <Icon className="size-4 shrink-0" strokeWidth={1.7} />
                  {label}
                </button>
              ))}
            </div>
            <div className="hidden @3xl:block mt-5">{confirmBtn}</div>
          </div>
        </div>
      </ScreenBody>
      <FooterAction className="@3xl:hidden">{confirmBtn}</FooterAction>
    </Phone>
  )
}

/* ───────────── 8 · Order Confirmed ───────────── */

export function OrderConfirmedScreen({ orderId = '#NH-1024' }: { orderId?: string }) {
  return (
    <Phone>
      <div className="@3xl:hidden">
        <InnerHeader back={false} />
      </div>
      <div className={cn('flex-1 min-h-0 flex flex-col @3xl:flex-none @3xl:my-14 @3xl:mx-auto @3xl:w-full @3xl:max-w-xl @3xl:py-14 @3xl:px-10', panel)}>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative @3xl:px-0">
          {/* soft decorative petals */}
          {[
            'top-[14%] left-[14%] size-3',
            'top-[20%] right-[16%] size-2',
            'top-[40%] left-[10%] size-2',
            'top-[36%] right-[12%] size-3.5',
            'bottom-[30%] left-[20%] size-1.5',
          ].map((c) => (
            <span key={c} className={cn('absolute rounded-full bg-rose/25', c)} aria-hidden />
          ))}
          <div className="relative grid place-items-center @3xl:mt-6">
            <span className="absolute size-[164px] rounded-full bg-rose/10" />
            <span className="absolute size-[132px] rounded-full bg-rose/15" />
            <span className="relative grid size-[100px] place-items-center rounded-full bg-rose-grad text-white shadow-rose">
              <Check className="size-12" strokeWidth={2.6} />
            </span>
          </div>
          <h1 className="font-serif text-[30px] @3xl:text-[38px] font-semibold text-burgundy mt-14">Order Confirmed!</h1>
          <p className="mt-2 @3xl:mt-3 inline-flex items-center rounded-full bg-[#F8DDE3] px-4 py-1.5 text-[14px] @3xl:text-[15px] font-bold text-rose-deep tracking-wide">{orderId}</p>
          <p className="text-[14px] @3xl:text-[16px] leading-[1.6] text-mute mt-4 max-w-[260px] @3xl:max-w-[340px]">Thank you for choosing Nail Haven. We will contact you soon.</p>
        </div>
        <div className="shrink-0 px-4 pt-3 pb-8 space-y-2.5 @3xl:px-0 @3xl:pt-10 @3xl:pb-0 @3xl:space-y-0 @3xl:grid @3xl:grid-cols-2 @3xl:gap-3">
          <Btn to="/orders" className="w-full">
            Track Order
          </Btn>
          <Btn to="/" variant="secondary" className="w-full">
            Back to Home
          </Btn>
        </div>
      </div>
    </Phone>
  )
}