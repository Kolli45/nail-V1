import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { ADMIN_ORDERS, CART, DESIGN_EXTRA, MY_ORDERS } from '@/data/fixtures'
import type { AdminOrder, CartItem, Design, MyOrder, NailShape, OrderStatus } from '@/data/fixtures'

/**
 * Client-side store for the Nail Haven storefront.
 * This is a front-end only build: state lives in React and is mirrored to localStorage
 * so the cart, wizard and orders survive page reloads in the same browser.
 */

export type DesignChoice = { shape: NailShape; color: string; design: Design; length: number }
export type Shipping = { firstName: string; lastName: string; phone: string; state: string; city: string; address: string; notes: string }
export type CheckoutSource = 'cart' | 'design'

type State = {
  cart: CartItem[]
  orders: MyOrder[]
  adminOrders: AdminOrder[]
  vibe: DesignChoice
  shipping: Shipping
  source: CheckoutSource
}

const EMPTY_SHIPPING: Shipping = { firstName: '', lastName: '', phone: '', state: '', city: '', address: '', notes: '' }

const INITIAL: State = {
  cart: CART,
  orders: MY_ORDERS,
  adminOrders: ADMIN_ORDERS,
  vibe: { shape: 'Almond', color: 'Rosy Pink', design: 'Floral', length: 3 },
  shipping: EMPTY_SHIPPING,
  source: 'design',
}

const STORAGE_KEY = 'nail-haven:v1'
export const VIBE_BASE_PRICE = 2000

export const itemExtra = (design: Design) => (design === 'None' ? 0 : DESIGN_EXTRA)

type Store = State & {
  addToCart: (item: Omit<CartItem, 'id'>) => void
  setQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  setVibe: (v: Partial<DesignChoice>) => void
  setShipping: (s: Shipping) => void
  setSource: (s: CheckoutSource) => void
  placeOrder: (payment: 'cod' | 'card') => string
  setAdminStatus: (id: string, status: OrderStatus) => void
  cartCount: number
}

const Ctx = createContext<Store | null>(null)

const today = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export function HavenStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(INITIAL)
  const [hydrated, setHydrated] = useState(false)
  const current = useRef(state)
  useEffect(() => {
    current.current = state
  }, [state])

  // One-time sync from browser storage after hydration (reading it during render would break SSR markup).
  // Nothing is written back until this has run, so a fresh mount can never overwrite saved data with defaults.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setState((s) => ({ ...s, ...(JSON.parse(raw) as Partial<State>) }))
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true)
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage full or disabled */
    }
  }, [state, hydrated])

  const addToCart = useCallback((item: Omit<CartItem, 'id'>) => {
    setState((s) => {
      const same = s.cart.find((c) => c.name === item.name && c.shape === item.shape && c.color === item.color && c.design === item.design)
      const cart = same
        ? s.cart.map((c) => (c === same ? { ...c, qty: c.qty + item.qty } : c))
        : [...s.cart, { ...item, id: `c${Date.now().toString(36)}` }]
      return { ...s, cart }
    })
  }, [])

  const setQty = useCallback((id: string, qty: number) => setState((s) => ({ ...s, cart: s.cart.map((c) => (c.id === id ? { ...c, qty } : c)) })), [])
  const removeItem = useCallback((id: string) => setState((s) => ({ ...s, cart: s.cart.filter((c) => c.id !== id) })), [])
  const setVibe = useCallback((v: Partial<DesignChoice>) => setState((s) => ({ ...s, vibe: { ...s.vibe, ...v } })), [])
  const setShipping = useCallback((shipping: Shipping) => setState((s) => ({ ...s, shipping })), [])
  const setSource = useCallback((source: CheckoutSource) => setState((s) => ({ ...s, source })), [])

  const placeOrder = useCallback((payment: 'cod' | 'card') => {
    const s = current.current
    {
      const nextNum = Math.max(1023, ...s.orders.map((o) => Number(o.id.replace(/\D/g, '')) || 0)) + 1
      const orderId = `#NH-${nextNum}`
      const nextAdmin = Math.max(0, ...s.adminOrders.map((o) => Number(o.id.replace(/\D/g, '')) || 0)) + 1
      const fromCart = s.source === 'cart'
      const lines = fromCart ? s.cart : []
      const total = fromCart
        ? lines.reduce((sum, i) => sum + i.price * i.qty, 0)
        : VIBE_BASE_PRICE + itemExtra(s.vibe.design)
      const first = lines[0]
      const details = fromCart && first ? { shape: first.shape, color: first.color, design: first.design, length: 3 } : s.vibe
      const name = `${s.shipping.firstName} ${s.shipping.lastName}`.trim()
      const order: MyOrder = { id: orderId, date: today(), total, status: 'New', image: first?.image ?? 'vibe-preview' }
      const admin: AdminOrder = {
        id: `#${String(nextAdmin).padStart(3, '0')}`,
        customer: name || 'Guest',
        date: today(),
        status: 'New',
        orderRef: orderId,
        details: {
          ...details,
          phone: s.shipping.phone,
          address: [s.shipping.address, [s.shipping.city, s.shipping.state].filter(Boolean).join(', ')].filter(Boolean).join(', '),
          note: s.shipping.notes,
          payment,
          references: [order.image, ...lines.slice(1).map((l) => l.image)].slice(0, 3),
        },
      }
      const next: State = {
        ...s,
        orders: [order, ...s.orders],
        adminOrders: [admin, ...s.adminOrders],
        cart: fromCart ? [] : s.cart,
      }
      current.current = next
      setState(next)
      return orderId
    }
  }, [])

  const setAdminStatus = useCallback(
    (id: string, status: OrderStatus) =>
      setState((s) => {
        const ref = s.adminOrders.find((o) => o.id === id)?.orderRef
        return {
          ...s,
          adminOrders: s.adminOrders.map((o) => (o.id === id ? { ...o, status } : o)),
          orders: ref ? s.orders.map((o) => (o.id === ref ? { ...o, status } : o)) : s.orders,
        }
      }),
    [],
  )

  const value = useMemo<Store>(
    () => ({
      ...state,
      addToCart,
      setQty,
      removeItem,
      setVibe,
      setShipping,
      setSource,
      placeOrder,
      setAdminStatus,
      cartCount: state.cart.reduce((n, i) => n + i.qty, 0),
    }),
    [state, addToCart, setQty, removeItem, setVibe, setShipping, setSource, placeOrder, setAdminStatus],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useHaven() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useHaven must be used inside HavenStoreProvider')
  return v
}
