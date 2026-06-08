# Sutrigo

Premium tourism + theme park + organic marketplace platform.

A React 18 + TypeScript SPA with a clean component architecture, in-memory routing, theme context, cart context, and 7 page surfaces (Home, Theme Park Listing, Theme Park Detail, Booking Flow, Organic Marketplace, User Dashboard, Admin Dashboard).

## Stack

- **React 18** with function components + hooks throughout
- **TypeScript 5** in strict mode
- **MUI 6** (Material UI) for theming — see `src/theme/`
- **Emotion** as MUI's styling engine
- **Vite 5** for the dev server and production build
- **CSS custom properties** synced from the MUI theme — change a hex in `src/theme/palette.ts` and both MUI components and the token-based CSS update together.
- **Path alias** `@/*` → `src/*`

## Folder structure

```
src/
├── main.tsx                 # ReactDOM entry
├── App.tsx                  # Root layout + provider composition
├── types/index.ts           # Shared domain + theme types
├── data/index.ts            # Static demo data
├── hooks/
│   ├── useReveal.ts         # Scroll-reveal IntersectionObserver
│   └── useCounter.ts        # Animated number counter
├── context/
│   ├── ThemeContext.tsx     # Owns ThemeState + wraps MUI ThemeProvider + CssBaseline
│   ├── RouterContext.tsx    # SPA route state
│   └── CartContext.tsx      # Organic store cart
├── theme/
│   ├── index.ts             # createSutrigoTheme() — MUI theme factory
│   ├── palette.ts           # BRAND colours + light/dark palette options
│   └── typography.ts        # Font families + variants
├── components/
│   ├── Icon.tsx, StarRow.tsx, Button.tsx, Chip.tsx,
│   ├── Reveal.tsx, HeroSearch.tsx, ParkCard.tsx
│   ├── Navbar.tsx, Footer.tsx, CartDrawer.tsx
│   └── Tweaks.tsx           # Live theme tweaker
├── pages/
│   ├── HomePage.tsx
│   ├── ParksPage.tsx
│   ├── ParkPage.tsx
│   ├── BookingPage.tsx
│   ├── MarketPage.tsx
│   ├── UserPage.tsx
│   └── AdminPage.tsx
└── styles/
    ├── tokens.css           # Design tokens (light/dark)
    ├── app.css              # Base + layout primitives
    └── pages.css            # Page-specific styles
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # serve dist/
```

## Notes on the preview HTML

`Sutrigo.html` is a zero-build preview that uses an in-browser TypeScript loader (Babel standalone + ES-module importmap) to render the same `src/` files without needing `npm install`. It exists purely for the design preview pane — use Vite for real development.
