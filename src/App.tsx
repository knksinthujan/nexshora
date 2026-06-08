import { useTheme, ThemeProvider } from '@/context/ThemeContext';
import { RouterProvider, useRouter } from '@/context/RouterContext';
import { CartProvider } from '@/context/CartContext';
import { useLenis } from '@/hooks/useLenis';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Tweaks } from '@/components/Tweaks';
import { HomePage } from '@/pages/HomePage';
import { ParksPage } from '@/pages/ParksPage';
import { ParkPage } from '@/pages/ParkPage';
import { BookingPage } from '@/pages/BookingPage';
import { MarketPage } from '@/pages/MarketPage';
import { UserPage } from '@/pages/UserPage';
import { AdminPage } from '@/pages/AdminPage';
import type { ThemeState } from '@/types';

/**
 * Tweakable defaults — the block between EDITMODE-BEGIN/END is parsed by the
 * host so values changed in the Tweaks panel persist across reloads.
 */
const TWEAK_DEFAULTS: ThemeState = /*EDITMODE-BEGIN*/{
  "dark": false,
  "primary": "#FF7B54",
  "accent": "#D4AF37",
  "heroVariant": "cinematic"
}/*EDITMODE-END*/;

function Page() {
  const { route } = useRouter();
  const { theme } = useTheme();
  switch (route.page) {
    case 'home':    return <HomePage heroVariant={theme.heroVariant} />;
    case 'parks':   return <ParksPage />;
    case 'park':    return <ParkPage id={route.params.id} />;
    case 'booking': return <BookingPage />;
    case 'market':  return <MarketPage />;
    case 'user':    return <UserPage />;
    case 'admin':   return <AdminPage />;
    default:        return <HomePage heroVariant={theme.heroVariant} />;
  }
}

function AppShell() {
  useLenis();
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <Page />
      </main>
      <Footer />
      <CartDrawer />
      <Tweaks />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider initial={TWEAK_DEFAULTS}>
      <RouterProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </RouterProvider>
    </ThemeProvider>
  );
}
