import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { Link, useRouter, useRouterState } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import {
  ArrowLeft,
  BatteryFull,
  Cat,
  ClipboardList,
  Flower2,
  Home as HomeIcon,
  Minus,
  Plus,
  Shapes,
  ShoppingBag,
  ShoppingCart,
  Signal,
  Sparkle,
  Star,
  User,
  Wifi,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { COLORS, DESIGNS, NAIL_SHAPES } from '@/data/fixtures'
import type { Design, NailShape } from '@/data/fixtures'
import { useHaven } from '@/lib/store'

/* ───────────── Brand ───────────── */

export function LotusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M24 3c4.5 4.5 5.5 12 0 21c-5.5-9-4.5-16.5 0-21Z" />
      <path d="M24 24c-2-7-7.5-12.5-14-13.5c-.5 7 5 12.5 14 13.5Z" />
      <path d="M24 24c2-7 7.5-12.5 14-13.5c.5 7-5 12.5-14 13.5Z" />
      <path d="M24 26c-6 0-13-3-18-9c4.5-.5 8 0 10.5 1.5" />
      <path d="M24 26c6 0 13-3 18-9c-4.5-.5-8 0-10.5 1.5" />
    </svg>
  )
}

export function Logo({ size = 'sm', light = false, tagline = 'BEAUTY AT YOUR FINGERTIPS' }: { size?: 'xs' | 'sm' | 'md' | 'lg'; light?: boolean; tagline?: string | null }) {
  const s = {
    xs: { icon: 'w-5', word: 'text-[14px]', tag: 'text-[5.5px]' },
    sm: { icon: 'w-6', word: 'text-[17px]', tag: 'text-[6.5px]' },
    md: { icon: 'w-8', word: 'text-[22px]', tag: 'text-[8px]' },
    lg: { icon: 'w-12', word: 'text-[40px]', tag: 'text-[11px]' },
  }[size]
  return (
    <div className={cn('flex flex-col items-center leading-none', light ? 'text-white' : 'text-burgundy')}>
      <LotusIcon className={cn(s.icon, light ? 'text-white/90' : 'text-rose-deep')} />
      <span className={cn('font-serif font-medium tracking-[0.08em] mt-0.5 whitespace-nowrap', s.word)}>NAIL HAVEN</span>
      {tagline && <span className={cn('font-sans tracking-[0.22em] mt-1 whitespace-nowrap', s.tag, light ? 'text-white/70' : 'text-mute')}>{tagline}</span>}
    </div>
  )
}

/* ───────────── Device frames ───────────── */

export function StatusBar() {
  return (
    <div className="relative h-[47px] shrink-0 flex items-center justify-between px-8 pt-1 text-ink">
      <span className="text-[15px] font-semibold tracking-tight">9:41</span>
      <div className="absolute left-1/2 top-[11px] -translate-x-1/2 h-[26px] w-[104px] rounded-full bg-[#1a1012]" />
      <div className="flex items-center gap-1.5">
        <Signal className="size-4" strokeWidth={2.5} />
        <Wifi className="size-4" strokeWidth={2.5} />
        <BatteryFull className="size-5" strokeWidth={2} />
      </div>
    </div>
  )
}

/**
 * "canvas": fixed 390 × 844 mock inside the presentation canvas.
 * "app": a real page. Full-screen on phones, framed and centered on larger screens.
 */
export type FrameMode = 'canvas' | 'app'
const FrameCtx = createContext<FrameMode>('app')
export const FrameModeProvider = FrameCtx.Provider
export const useFrameMode = () => useContext(FrameCtx)

export type To = LinkProps['to']

/** 390 × 844 iPhone screen wrapped in a thin rose-metal bezel. */
export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  const mode = useFrameMode()
  if (mode === 'app') {
    // Real page. `@container` lets every screen adapt with @3xl:/@5xl: variants (tablet / laptop / desktop),
    // while the same screens inside the /concept canvas (no container) keep their fixed phone layout.
    return (
      <div className="@container min-h-dvh floral-texture">
        <div
          className={cn(
            'relative flex flex-col text-ink h-dvh bg-linear-to-b from-[#FDF2F4] to-surface @3xl:h-auto @3xl:min-h-dvh @3xl:bg-none',
            className,
          )}
        >
          <SiteHeader />
          <div className="@3xl:hidden shrink-0 h-[max(12px,env(safe-area-inset-top))]" />
          <div className="flex-1 min-h-0 flex flex-col @3xl:w-full @3xl:max-w-6xl @3xl:mx-auto @3xl:px-8 @3xl:pb-16">{children}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-[58px] p-[9px] bg-linear-to-br from-[#E9C6CD] via-[#F6E3E7] to-[#D7A9B3] shadow-[0_30px_60px_-20px_rgba(122,30,46,0.35),0_8px_24px_rgba(122,30,46,0.08)]">
      <div
        className={cn(
          'relative w-[390px] h-[844px] overflow-hidden rounded-[49px] bg-linear-to-b from-[#FDF2F4] to-surface text-ink flex flex-col',
          className,
        )}
      >
        <StatusBar />
        <div className="flex-1 min-h-0 flex flex-col">{children}</div>
        <div className="pointer-events-none absolute bottom-[7px] left-1/2 -translate-x-1/2 h-[5px] w-[134px] rounded-full bg-ink/80" />
      </div>
    </div>
  )
}

/** Scrollable body for a phone screen (scrollbar hidden). */
export function ScreenBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex-1 min-h-0 overflow-y-auto no-scrollbar @3xl:flex-none @3xl:overflow-visible', className)}>{children}</div>
}

export function CartIconBadge() {
  const { cartCount } = useHaven()
  return (
    <IconButton label="Cart" className="relative" to="/cart">
      <ShoppingCart className="size-[22px]" strokeWidth={1.7} />
      {cartCount > 0 && (
        <span className="absolute top-0.5 right-0.5 grid min-w-[17px] h-[17px] px-1 place-items-center rounded-full bg-rose-grad text-[10px] font-bold text-white ring-2 ring-[#FDF2F4]">
          {cartCount}
        </span>
      )}
    </IconButton>
  )
}

function activeSection(path: string): NavKey | null {
  if (path === '/') return 'Home'
  if (/^\/(shop|product|customize|cart)/.test(path)) return 'Shop'
  if (/^\/(design|shipping|confirm|order-confirmed)/.test(path)) return 'Design'
  if (path.startsWith('/orders')) return 'Orders'
  return null
}

/** Top navigation for tablet, laptop and desktop (replaces the phone bottom bar). */
function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname })
  const active = activeSection(path)
  return (
    <header className="hidden @3xl:block sticky top-0 z-40 bg-surface/85 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto px-6 @5xl:px-8 h-[78px] grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <Link to="/" aria-label="Nail Haven home" className="justify-self-start">
          <Logo size="sm" />
        </Link>
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ key, icon: Icon, to }) =>
            key === 'Design' ? (
              <Link key={key} to={to!} className="mx-1 @5xl:mx-2 h-11 px-4 @5xl:px-5 rounded-full bg-rose-grad text-white shadow-rose inline-flex items-center gap-1.5 text-[14px] font-semibold hover:brightness-105">
                <Plus className="size-[18px]" strokeWidth={2.2} />
                {key}
              </Link>
            ) : (
              <NavItem
                key={key}
                to={to}
                className={cn(
                  'h-11 px-3 @5xl:px-4 rounded-full inline-flex items-center gap-2 text-[14px] transition',
                  active === key ? 'text-burgundy font-semibold bg-blush' : 'text-mute font-medium hover:text-burgundy',
                )}
              >
                <Icon className="size-[18px]" strokeWidth={active === key ? 2.2 : 1.8} />
                {key}
              </NavItem>
            ),
          )}
        </nav>
        <div className="justify-self-end">
          <CartIconBadge />
        </div>
      </div>
    </header>
  )
}

/* ───────────── Headers & navigation ───────────── */

export function IconButton({
  children,
  className,
  label,
  onClick,
  to,
  params,
}: {
  children: ReactNode
  className?: string
  label: string
  onClick?: () => void
  to?: To
  params?: Record<string, string>
}) {
  const cls = cn('grid size-10 place-items-center rounded-full text-burgundy transition hover:bg-white/70 active:scale-95', className)
  if (to) {
    return (
      <Link to={to} params={params as never} aria-label={label} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

/** Goes back in history, or to `fallback` when the page was opened directly. */
export function BackButton({ fallback = '/' }: { fallback?: To }) {
  const router = useRouter()
  return (
    <IconButton
      label="Back"
      onClick={() => {
        if (router.history.canGoBack()) router.history.back()
        else router.navigate({ to: fallback })
      }}
    >
      <ArrowLeft className="size-[22px]" strokeWidth={1.8} />
    </IconButton>
  )
}

/** Inner-screen header: back arrow · NAIL HAVEN logo · optional right icon(s), then page title. */
export function InnerHeader({
  title,
  subtitle,
  right,
  back = true,
  fallback,
}: {
  title?: string
  subtitle?: string
  right?: ReactNode
  back?: boolean
  fallback?: To
}) {
  return (
    <div className="shrink-0 px-4 @3xl:px-0 @3xl:pt-6">
      <div className="grid grid-cols-[80px_1fr_80px] items-center">
        <div>{back && <BackButton fallback={fallback} />}</div>
        <Link to="/" aria-label="Nail Haven home" className="justify-self-center @3xl:invisible">
          <Logo size="xs" />
        </Link>
        <div className="flex justify-end">{right}</div>
      </div>
      {title && (
        <div className="text-center mt-1.5 @3xl:-mt-6">
          <h2 className="font-serif text-[22px] @3xl:text-[34px] font-semibold text-burgundy leading-tight">{title}</h2>
          {subtitle && <p className="text-[12px] @3xl:text-[15px] text-mute mt-0.5 @3xl:mt-1">{subtitle}</p>}
        </div>
      )}
    </div>
  )
}

/** Main-screen header: optional back arrow · centered title · optional right icon. */
export function TitleHeader({ title, back = true, right, fallback }: { title: string; back?: boolean; right?: ReactNode; fallback?: To }) {
  return (
    <div className="shrink-0 px-4 grid grid-cols-[48px_1fr_48px] items-center h-[52px] @3xl:px-0 @3xl:h-auto @3xl:pt-6 @3xl:pb-4">
      <div>{back && <BackButton fallback={fallback} />}</div>
      <h2 className="text-center font-serif text-[22px] @3xl:text-[34px] font-semibold text-burgundy">{title}</h2>
      <div className="flex justify-end">{right}</div>
    </div>
  )
}

type NavKey = 'Home' | 'Shop' | 'Design' | 'Orders' | 'Profile'
const NAV_ITEMS: { key: NavKey; icon: typeof HomeIcon; to?: To }[] = [
  { key: 'Home', icon: HomeIcon, to: '/' },
  { key: 'Shop', icon: ShoppingBag, to: '/shop' },
  { key: 'Design', icon: Plus, to: '/design' },
  { key: 'Orders', icon: ClipboardList, to: '/orders' },
  { key: 'Profile', icon: User },
]

export function BottomNav({ active }: { active: NavKey }) {
  const items = NAV_ITEMS
  return (
    <nav className="@3xl:hidden relative shrink-0 h-[78px] bg-white/95 border-t border-line rounded-t-[24px] shadow-[0_-8px_24px_rgba(122,30,46,0.06)] grid grid-cols-5 px-2 pb-3.5">
      {items.map(({ key, icon: Icon, to }) =>
        key === 'Design' ? (
          <Link key={key} to={to!} className="flex flex-col items-center justify-end gap-1 -mt-7 group">
            <span className="grid size-14 place-items-center rounded-full bg-rose-grad text-white shadow-rose ring-[5px] ring-white transition group-hover:scale-105">
              <Plus className="size-7" strokeWidth={2.2} />
            </span>
            <span className={cn('text-[11px] font-medium', active === key ? 'text-burgundy' : 'text-mute')}>{key}</span>
          </Link>
        ) : (
          <NavItem key={key} to={to} className={cn('flex flex-col items-center justify-center gap-1 pt-2', active === key ? 'text-burgundy' : 'text-mute hover:text-rose-deep')}>
            <Icon className="size-[22px]" strokeWidth={active === key ? 2.2 : 1.7} fill={active === key && key === 'Home' ? 'currentColor' : 'none'} />
            <span className={cn('text-[11px]', active === key ? 'font-semibold' : 'font-medium')}>{key}</span>
          </NavItem>
        ),
      )}
    </nav>
  )
}

function NavItem({ to, className, children }: { to?: To; className: string; children: ReactNode }) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={className}>
      {children}
    </button>
  )
}

export function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="shrink-0 flex items-center justify-center gap-2 mt-2">
      {[1, 2, 3].map((n) => (
        <span key={n} className={cn('h-1.5 rounded-full transition-all', n === step ? 'w-7 bg-rose-grad' : n < step ? 'w-4 bg-rose/60' : 'w-4 bg-line')} />
      ))}
      <span className="ml-1 text-[11px] font-semibold text-rose-deep">{step} of 3</span>
    </div>
  )
}

/* ───────────── Buttons, cards, small parts ───────────── */

export function Btn({
  children,
  variant = 'primary',
  icon,
  leading,
  className,
  onClick,
  to,
  params,
  type = 'button',
  form,
  disabled,
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  leading?: ReactNode
  className?: string
  onClick?: () => void
  to?: To
  params?: Record<string, string>
  type?: 'button' | 'submit'
  form?: string
  disabled?: boolean
}) {
  const cls = cn(
    'h-[52px] rounded-full px-6 inline-flex items-center justify-center gap-2 text-[15px] font-semibold transition active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
    variant === 'primary'
      ? 'bg-rose-grad text-white shadow-rose hover:brightness-105'
      : 'bg-surface text-burgundy border border-line shadow-soft hover:bg-white',
    className,
  )
  if (to) {
    return (
      <Link to={to} params={params as never} onClick={onClick} className={cls}>
        {leading}
        {children}
        {icon}
      </Link>
    )
  }
  return (
    <button type={type} form={form} disabled={disabled} onClick={onClick} className={cls}>
      {leading}
      {children}
      {icon}
    </button>
  )
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-[20px] bg-surface border border-line shadow-soft', className)}>{children}</div>
}

export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-[1px]', className)} aria-label={`${rating} stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <span key={i} className="relative inline-block size-[1em]">
            <Star className="absolute inset-0 size-full text-gold/35" fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-[1em] text-gold" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        )
      })}
    </span>
  )
}

export function SectionLabel({ children, className, aside }: { children: ReactNode; className?: string; aside?: ReactNode }) {
  return (
    <div className={cn('flex items-center justify-between mb-2', className)}>
      <h3 className="font-serif text-[16px] @3xl:text-[18px] font-semibold text-burgundy">{children}</h3>
      {aside}
    </div>
  )
}

export function Stepper({ value, onChange, size = 'md' }: { value: number; onChange: (n: number) => void; size?: 'sm' | 'md' }) {
  const b = size === 'sm' ? 'size-7' : 'size-10'
  return (
    <div className={cn('inline-flex items-center rounded-full bg-white border border-line', size === 'sm' ? 'gap-1 p-0.5' : 'gap-3 p-1')}>
      <button type="button" aria-label="Decrease" onClick={() => onChange(Math.max(1, value - 1))} className={cn(b, 'grid place-items-center rounded-full text-rose-deep hover:bg-blush')}>
        <Minus className="size-4" />
      </button>
      <span className={cn('text-center font-semibold text-ink', size === 'sm' ? 'w-5 text-[13px]' : 'w-8 text-[16px]')}>{value}</span>
      <button type="button" aria-label="Increase" onClick={() => onChange(value + 1)} className={cn(b, 'grid place-items-center rounded-full bg-rose-grad text-white')}>
        <Plus className="size-4" />
      </button>
    </div>
  )
}

/* ───────────── Unified option pickers ───────────── */

const SHAPE_PATHS: Record<NailShape, string> = {
  Round: 'M4 34V14a10 10 0 0 1 20 0v20Z',
  Almond: 'M4 34V17C4 9 10 2.5 14 2.5S24 9 24 17v17Z',
  Coffin: 'M4 34V14L9 3h10l5 11v20Z',
  Square: 'M4 34V5.5Q4 3 6.5 3h15Q24 3 24 5.5V34Z',
  Stiletto: 'M4 34V19C4 12 11 6 14 1c3 5 10 11 10 18v15Z',
}

export function NailShapeIcon({ shape, className }: { shape: NailShape; className?: string }) {
  const id = `nail-grad-${shape}`
  return (
    <svg viewBox="0 0 28 36" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6D3DA" />
          <stop offset="1" stopColor="#D893A2" />
        </linearGradient>
      </defs>
      <path d={SHAPE_PATHS[shape]} fill={`url(#${id})`} stroke="#A65B6C" strokeWidth="1.1" />
      <path d="M7 29q7 -4 14 0" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="1.1" />
      <path d="M8 10q1-4 3-5" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function DesignIcon({ design, className }: { design: Design; className?: string }) {
  switch (design) {
    case 'None':
      return <span className={cn('rounded-full border-[1.6px] border-rose-deep/70', className)} />
    case 'French':
      return (
        <svg viewBox="0 0 28 36" className={className} aria-hidden>
          <path d={SHAPE_PATHS.Almond} fill="#F6D3DA" stroke="#A65B6C" strokeWidth="1.1" />
          <path d="M5.3 13C6.5 7 10.5 2.6 14 2.6S21.5 7 22.7 13Q14 8.5 5.3 13Z" fill="#fff" stroke="#A65B6C" strokeWidth=".9" />
        </svg>
      )
    case 'Simple':
      return <Sparkle className={cn('text-rose-deep', className)} strokeWidth={1.5} />
    case 'Floral':
      return <Flower2 className={cn('text-rose-deep', className)} strokeWidth={1.5} />
    case 'Geometric':
      return <Shapes className={cn('text-rose-deep', className)} strokeWidth={1.5} />
    case 'Cartoon':
      return <Cat className={cn('text-rose-deep', className)} strokeWidth={1.5} />
  }
}

function OptionTile({ selected, onClick, children, label, compact }: { selected: boolean; onClick: () => void; children: ReactNode; label: string; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'flex flex-col items-center justify-center rounded-[14px] border bg-white transition',
        compact ? 'h-[56px] gap-1' : 'h-[72px] gap-1.5',
        selected ? 'border-rose-deep bg-[#FBEAEE] ring-2 ring-rose/25' : 'border-line hover:border-rose/60',
      )}
    >
      {children}
      <span className={cn('font-medium leading-none', compact ? 'text-[9.5px]' : 'text-[11px]', selected ? 'text-burgundy' : 'text-mute')}>{label}</span>
    </button>
  )
}

export function ShapePicker({ value, onChange, cols = 5, compact }: { value: NailShape; onChange: (s: NailShape) => void; cols?: number; compact?: boolean }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {NAIL_SHAPES.map((s) => (
        <OptionTile key={s} selected={value === s} onClick={() => onChange(s)} label={s} compact={compact}>
          <NailShapeIcon shape={s} className={compact ? 'h-6' : 'h-8'} />
        </OptionTile>
      ))}
    </div>
  )
}

export function DesignPicker({ value, onChange, compact }: { value: Design; onChange: (d: Design) => void; compact?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {DESIGNS.map((d) => (
        <OptionTile key={d} selected={value === d} onClick={() => onChange(d)} label={d} compact={compact}>
          <DesignIcon design={d} className={compact ? 'size-5 h-6' : 'size-7'} />
        </OptionTile>
      ))}
    </div>
  )
}

export function ColorPicker({ value, onChange, size = 34 }: { value: string; onChange: (c: string) => void; size?: number }) {
  return (
    <div className="grid grid-cols-7 gap-y-2 justify-items-center">
      {COLORS.map((c) => {
        const selected = value === c.name
        return (
          <button
            key={c.name}
            type="button"
            title={c.name}
            aria-label={c.name}
            aria-pressed={selected}
            onClick={() => onChange(c.name)}
            className={cn('rounded-full p-[3px] transition', selected ? 'ring-2 ring-rose-deep' : 'ring-1 ring-transparent hover:ring-line')}
          >
            <span
              className={cn('block rounded-full border border-black/5', c.glitter && 'glitter-swatch')}
              style={{ width: size, height: size, backgroundColor: c.glitter ? undefined : c.hex }}
            />
          </button>
        )
      })}
    </div>
  )
}

export function colorHex(name: string) {
  return COLORS.find((c) => c.name === name)?.hex ?? '#E08A9C'
}
