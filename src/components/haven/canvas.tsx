import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Maximize2, ZoomIn } from 'lucide-react'

import { cn } from '@/lib/utils'
import { FrameModeProvider, Logo } from './primitives'
import { AllDesignsScreen, CustomizeScreen, HomeScreen, ProductDetailsScreen } from './screens/row1'
import { ConfirmScreen, DesignVibeScreen, OrderConfirmedScreen, ShippingScreen } from './screens/row2'
import { AdminScreen, CartScreen, OrdersScreen } from './screens/row3'

/* Canvas geometry (px, unscaled). Phone frame = 390×844 screen + 9px bezel each side. */
const W = 2380
const H = 3450
const FW = 408
const FH = 862
const LABEL = 66
const COLS = [150, 706, 1262, 1818]
const ROWS = [250, 1330, 2410] // label tops
const phoneY = (r: number) => ROWS[r] + LABEL
const midY = (r: number) => phoneY(r) + FH / 2
const cx = (c: number) => COLS[c] + FW / 2

type Placed = { n: number; title: string; x: number; row: number; node: ReactNode; width?: number; dy?: number }
const SCREENS: Placed[] = [
  { n: 1, title: 'Home', x: COLS[0], row: 0, node: <HomeScreen /> },
  { n: 2, title: 'All Designs', x: COLS[1], row: 0, node: <AllDesignsScreen /> },
  { n: 3, title: 'Product Details', x: COLS[2], row: 0, node: <ProductDetailsScreen /> },
  { n: 4, title: 'Customize', x: COLS[3], row: 0, node: <CustomizeScreen /> },
  { n: 5, title: 'Design Your Vibe', x: COLS[0], row: 1, node: <DesignVibeScreen /> },
  { n: 6, title: 'Shipping Details', x: COLS[1], row: 1, node: <ShippingScreen /> },
  { n: 7, title: 'Confirm Your Design', x: COLS[2], row: 1, node: <ConfirmScreen /> },
  { n: 8, title: 'Order Confirmed', x: COLS[3], row: 1, node: <OrderConfirmedScreen /> },
  { n: 9, title: 'Cart', x: COLS[0], row: 2, node: <CartScreen /> },
  { n: 10, title: 'Orders', x: COLS[1], row: 2, node: <OrdersScreen /> },
  { n: 11, title: 'Admin Control Panel', x: COLS[2], row: 2, node: <AdminScreen />, width: 980, dy: 9 },
]

/* Flow connectors. Each is an SVG path plus an optional label anchor. */
type Flow = { d: string; label?: string; lx?: number; ly?: number; bridge?: boolean }
const GAP = 16
const hArrow = (row: number, from: number, label?: string): Flow => {
  const x1 = COLS[from] + FW + GAP
  const x2 = COLS[from + 1] - GAP
  return { d: `M${x1} ${midY(row)} H${x2}`, label, lx: (x1 + x2) / 2, ly: midY(row) - 22 }
}
const FLOWS: Flow[] = [
  hArrow(0, 0, 'Shop Ready Designs'),
  hArrow(0, 1),
  hArrow(0, 2, 'Customize'),
  hArrow(1, 0, 'Next'),
  hArrow(1, 1, 'Next'),
  hArrow(1, 2, 'Confirm Order'),
  // Customize → Cart (Add to Cart), routed around the left margin
  {
    d: `M${cx(3)} ${phoneY(0) + FH + 10} V1250 H72 V${midY(2)} H${COLS[0] - GAP}`,
    label: 'Add to Cart',
    lx: 1500,
    ly: 1250,
  },
  // Home → Design Your Vibe (Start Designing), drawn last with a bridge over the lane above
  { d: `M${cx(0)} ${phoneY(0) + FH + 10} V${ROWS[1] - 10}`, label: 'Start Designing', lx: cx(0) + 86, ly: 1286, bridge: true },
  // Cart → Shipping Details (Checkout)
  { d: `M${cx(0)} ${ROWS[2] - 10} V2338 H${cx(1) - 60} V${phoneY(1) + FH + 10}`, label: 'Checkout', lx: 560, ly: 2338 },
  // Order Confirmed → Orders (Track Order)
  { d: `M${cx(3)} ${phoneY(1) + FH + 10} V2370 H${cx(1) + 60} V${ROWS[2] - 10}`, label: 'Track Order', lx: 1500, ly: 2370 },
  // Orders → Admin Control Panel
  { d: `M${COLS[1] + FW + GAP} ${midY(2)} H${COLS[2] - GAP}` },
]

function FlowLayer() {
  return (
    <>
      <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
        <defs>
          <marker id="nh-arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="12" markerHeight="12" orient="auto-start-reverse">
            <path d="M2 2 L10 6 L2 10" fill="none" stroke="#C47F8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {FLOWS.map((f, i) => (
          <g key={i}>
            {f.bridge && <path d={f.d} fill="none" stroke="#F7E6E9" strokeWidth="12" />}
            <circle
              cx={Number(f.d.split(' ')[0].slice(1))}
              cy={Number(f.d.split(' ')[1])}
              r="3.5"
              fill="#C47F8E"
            />
            <path d={f.d} fill="none" stroke="#C47F8E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#nh-arrow)" />
          </g>
        ))}
      </svg>
      {FLOWS.filter((f) => f.label).map((f) => (
        <span
          key={f.label! + f.lx}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-surface border border-line px-3 py-1 text-[12px] font-semibold text-rose-deep shadow-soft"
          style={{ left: f.lx, top: f.ly }}
        >
          {f.label}
        </span>
      ))}
    </>
  )
}

function ScreenLabel({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3" style={{ height: LABEL - 18 }}>
      <span className="grid size-9 place-items-center rounded-full bg-rose-grad text-[15px] font-bold text-white shadow-rose">{n}</span>
      <h2 className="font-serif text-[24px] font-semibold text-burgundy">{title}</h2>
    </div>
  )
}

function CanvasContent() {
  return (
    <div className="relative floral-texture" style={{ width: W, height: H }}>
      {/* Title block */}
      <header className="absolute left-0 right-0 top-[70px] flex flex-col items-center">
        <Logo size="lg" />
        <p className="mt-5 text-[15px] tracking-[0.3em] text-mute font-medium">MOBILE APP UI CONCEPT</p>
      </header>

      {/* Decorative script — Home and Design Wizard side areas */}
      <p className="absolute font-script text-[46px] leading-none text-burgundy/55 -rotate-[8deg]" style={{ left: 40, top: 150 }}>
        More Than Nails ♡
      </p>
      <p
        className="absolute font-script text-[48px] leading-none text-burgundy/55 whitespace-nowrap"
        style={{ left: COLS[3] + FW + 76, top: midY(1), transform: 'translate(-50%, -50%) rotate(90deg)' }}
      >
        Pretty Nails Happier You ♡
      </p>

      <FlowLayer />

      {SCREENS.map((s) => (
        <div key={s.n} className="absolute" style={{ left: s.x, top: ROWS[s.row] }}>
          <ScreenLabel n={s.n} title={s.title} />
          <div style={{ marginTop: 18 + (s.dy ?? 0), width: s.width ?? FW }}>{s.node}</div>
        </div>
      ))}

      <footer className="absolute bottom-[40px] left-0 right-0 text-center text-[12px] tracking-[0.3em] text-mute">BEAUTY AT YOUR FINGERTIPS</footer>
    </div>
  )
}

/** Wide presentation canvas, scaled to fit the viewport width (toggle for 100%). */
export function PresentationCanvas() {
  const [fit, setFit] = useState(true)
  const [scale, setScale] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setScale(fit ? Math.min(1, (window.innerWidth - 24) / W) : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [fit])

  const s = scale ?? 0.5
  return (
    <div className="min-h-screen floral-texture overflow-x-auto">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full bg-surface/95 border border-line p-1 shadow-soft backdrop-blur">
        <button
          type="button"
          onClick={() => setFit(true)}
          className={cn('h-9 px-3.5 rounded-full inline-flex items-center gap-1.5 text-[12.5px] font-semibold', fit ? 'bg-rose-grad text-white' : 'text-burgundy hover:bg-blush')}
        >
          <Maximize2 className="size-3.5" /> Fit
        </button>
        <button
          type="button"
          onClick={() => setFit(false)}
          className={cn('h-9 px-3.5 rounded-full inline-flex items-center gap-1.5 text-[12.5px] font-semibold', !fit ? 'bg-rose-grad text-white' : 'text-burgundy hover:bg-blush')}
        >
          <ZoomIn className="size-3.5" /> 100%
        </button>
      </div>
      <div className={cn('mx-auto py-3 transition-opacity duration-300', scale === null ? 'opacity-0' : 'opacity-100')} style={{ width: W * s, height: H * s + 24 }}>
        <div style={{ width: W, height: H, transform: `scale(${s})`, transformOrigin: 'top left' }}>
          <FrameModeProvider value="canvas">
            <CanvasContent />
          </FrameModeProvider>
        </div>
      </div>
    </div>
  )
}
