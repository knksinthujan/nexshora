import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { PageId, Route } from '@/types';

type RouterContextValue = {
  route: Route;
  go: (page: PageId, params?: Record<string, string>) => void;
};

const RouterContext = createContext<RouterContextValue | null>(null);

function buildPath(page: PageId, params: Record<string, string> = {}): string {
  switch (page) {
    case 'home':    return '/';
    case 'parks':   return '/parks';
    case 'park':    return `/parks/${params.id ?? ''}`;
    case 'booking': return '/booking';
    case 'market':  return '/market';
    case 'user':    return '/user';
    case 'admin':   return '/admin';
    default:        return '/';
  }
}

function parseRoute(pathname: string): Route {
  const p = pathname.replace(/\/$/, '') || '/';
  if (p === '/')          return { page: 'home',    params: {} };
  if (p === '/parks')     return { page: 'parks',   params: {} };
  if (p === '/booking')   return { page: 'booking', params: {} };
  if (p === '/market')    return { page: 'market',  params: {} };
  if (p === '/user')      return { page: 'user',    params: {} };
  if (p === '/admin')     return { page: 'admin',   params: {} };
  const parkMatch = p.match(/^\/parks\/(.+)$/);
  if (parkMatch)          return { page: 'park',    params: { id: parkMatch[1] } };
  return { page: 'home', params: {} };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname));

  const go = useCallback<RouterContextValue['go']>((page, params = {}) => {
    const path = buildPath(page, params);
    window.history.pushState({ page, params }, '', path);
    setRoute({ page, params });
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const value = useMemo<RouterContextValue>(() => ({ route, go }), [route, go]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside <RouterProvider>');
  return ctx;
}
