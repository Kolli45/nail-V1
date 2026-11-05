# AGENTS.md

## What this is

A front-end for **Nail Haven**, a premium nail art / custom nail set store. Each of the 11 designed screens is a real, navigable page. There is no backend: cart, wizard choices, shipping details and orders live in a client store (`src/lib/store.tsx`) mirrored to `localStorage`. The original presentation canvas (2380 × 3450 px, 11 screens with flow arrows) is still available at `/concept`.

Routes: `/` Home · `/shop` All Designs · `/product/$id` · `/customize/$id` · `/design` Design Your Vibe · `/shipping` · `/confirm` · `/order-confirmed/$id` · `/cart` · `/orders` · `/admin` (desktop) · `/concept`.

## Stack

TanStack Start (React 19), Tailwind CSS 4, lucide-react, deployed on Netlify via `@netlify/vite-plugin-tanstack-start`. The shadcn/ui components in `src/components/ui` come from the starter and are mostly unused.

## Layout

```
src/
├── data/fixtures.ts               # ALL stub data: products, unified options, cart, orders, admin rows, img() CDN helper
├── components/haven/
│   ├── primitives.tsx             # Design system: Logo, Phone frame, headers, BottomNav, Btn, Card, Stars, Stepper,
│   │                              # StepIndicator and the shared Shape/Color/Design pickers
│   ├── canvas.tsx                 # Canvas geometry (COLS/ROWS constants), screen placement, SVG flow arrows, Fit/100% zoom
│   └── screens/
│       ├── row1.tsx               # Home, All Designs, Product Details, Customize
│       ├── row2.tsx               # Design Your Vibe, Shipping Details, Confirm Your Design, Order Confirmed
│       └── row3.tsx               # Cart, Orders, Admin Control Panel (desktop, 980 × 844)
├── lib/store.tsx                  # HavenStoreProvider / useHaven(): cart, vibe, shipping, orders, admin orders (localStorage)
├── routes/                        # One thin file per page; each renders a screen from components/haven/screens
└── styles.css                     # Brand tokens (@theme): blush, surface, line, rose, rose-deep, burgundy, ink, mute, gold
public/img/                        # AI-generated nail photography (jpg, ~1200px)
```

## Conventions

- **Exact copy.** Every label comes from the client brief. Don't rename, translate or add on-screen text. English only, LTR, currency is `"<n> DZD"` via `currency()`.
- **Unified options.** Customize, Design Wizard and Cart all use `NAIL_SHAPES`, `DESIGNS` and the 14 `COLORS` from fixtures, through the shared pickers in `primitives.tsx`. Reuse them instead of re-implementing.
- **Style tokens.** Buttons use `Btn` (52px pill). Cards use `Card` (20px radius, `shadow-soft`). Images are 16px rounded. Titles, prices and the active nav item use `text-burgundy`. Headings use `font-serif` (Playfair Display), and decorative taglines use `font-script`. Script text appears only on Home and the Design Wizard area.
- **Images.** Always go through `img(name, w, h?)`. It builds a `/.netlify/images` URL at 2x with webp output, so originals are never shipped.
- **Frame mode & responsive.** Screens render through `Phone`, which reads `FrameModeProvider`. `canvas` (only inside `/concept`) is the fixed 390 × 844 mock. `app` (default) is the real page: `Phone` is an `@container`, and screens use container variants (`@3xl:` ≈ tablet 768px+, `@5xl:` ≈ laptop 1024px+) for the wide layout. Use container variants, not `md:`/`lg:`, in screens, so the canvas mockups stay phone-sized. From `@3xl` up, `SiteHeader` replaces `BottomNav` and the phone-style headers. Sticky phone footers become in-column actions: the same element is rendered twice, once `@3xl:hidden` and once `hidden @3xl:block`. Admin uses its own `app` flag with normal `md:`/`lg:` breakpoints.
- **Navigation.** `Btn` and `IconButton` accept `to`/`params` and render a router `Link`. `BackButton` goes back in history, or to its `fallback` when opened directly.
- **Fixed frame sizes.** Phone screens are exactly 390 × 844 (`Phone` adds a 9px bezel). Content is sized to fit without scrolling, and `ScreenBody` scrolls only as a fallback. If you add content, check that it still fits.
- **Arrows.** `FLOWS` in `canvas.tsx` holds raw SVG paths built from the layout constants. If you move screens, update `COLS`/`ROWS`. `bridge: true` draws a blush halo where one connector crosses another.
