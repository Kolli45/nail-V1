# Nail Haven — Mobile App UI Concept

Nail Haven is a premium nail art and custom nail set store. This project is a complete, clickable UI concept for its mobile app and salon admin panel, presented as one wide canvas on a blush floral background.

The canvas shows 11 screens in three rows, connected by rose flow arrows:

1. **Row 1:** Home → All Designs → Product Details → Customize
2. **Row 2 (Design Wizard):** Design Your Vibe → Shipping Details → Confirm Your Design → Order Confirmed
3. **Row 3:** Cart, Orders, Admin Control Panel (desktop)

Each phone screen is rendered at iPhone size (390 × 844). The controls work: swatches, shapes, designs, steppers, filter chips, tabs, the length slider and payment options all respond to clicks. Use the **Fit / 100%** toggle in the top-right corner to switch between an overview and full-size detail.

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19, deployed on Netlify
- Tailwind CSS 4 (brand tokens live in `src/styles.css`)
- Playfair Display, Inter and Great Vibes from Google Fonts
- lucide-react icons
- Product photos were generated once with Netlify AI Gateway (Gemini image model). They are stored in `public/img` and served through the Netlify Image CDN.

## Run locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

## Roadmap ideas

The concept runs on stubbed data in `src/data/fixtures.ts`. To turn it into a working store, the next steps would be to split the screens into real routes, persist products, carts and orders in Netlify Database, add customer accounts, and connect the admin panel to live orders.
