/* The provider and its hooks intentionally live together so consumers share one store. */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Book } from "../data/books";

export interface CartLine {
  book: Book;
  qty: number;
  giftWrap: boolean;
  insurance: boolean;
}

/** One billable scroll event. `id` is the running scroll count at the time of billing. */
export interface ScrollBump {
  id: number;
  amount: number;
}

interface ScrollLedger {
  total: number;
  count: number;
  /** The last few bumps, so the UI can show "+$247" flying off your wallet. */
  recent: ScrollBump[];
}

interface Toast {
  id: number;
  title: string;
  body: string;
  kind: "upsell" | "fee" | "info" | "warning";
}

interface ShopState {
  cart: CartLine[];
  addToCart: (book: Book, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleGiftWrap: (id: string) => void;
  toggleInsurance: (id: string) => void;
  cartCount: number;
  subtotal: number;
  feesTotal: number;
  grandTotal: number;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
  browsingSeconds: number;
  browsingFee: number;
  scrollFee: number;
  scrollCount: number;
  scrollBumps: ScrollBump[];
  doomPurchases: number;
  loyaltyPoints: number;
  hubrisScore: number;
  bumpHubris: (n: number) => void;
  consentBannerUp: boolean;
  setConsentBannerUp: (b: boolean) => void;
}

const ShopContext = createContext<ShopState | null>(null);

let toastId = 1;

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [browsingSeconds, setBrowsingSeconds] = useState(0);
  const [scrollLedger, setScrollLedger] = useState<ScrollLedger>({ total: 0, count: 0, recent: [] });
  const [doomPurchases, setDoomPurchases] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(12);
  const [hubrisScore, setHubrisScore] = useState(0);
  const [consentBannerUp, setConsentBannerUp] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setBrowsingSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Scroll-Triggered Appreciation Fee (Terms §15): every scroll burst bills $127–$389.
  // Engagement is deepened by scrolling. Deepened engagement is billable.
  // The ledger keeps a running total, a scroll count, and the last few bumps
  // so the Scrolling Fee meter can show each charge leaving your wallet.
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const now = Date.now();
      if (now - last < 350) return;
      last = now;
      const bump = Math.round((127 + Math.random() * 262) * 100) / 100;
      setScrollLedger((l) => {
        const count = l.count + 1;
        return {
          total: Math.round((l.total + bump) * 100) / 100,
          count,
          recent: [...l.recent.slice(-3), { id: count, amount: bump }],
        };
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = toastId++;
    setToasts((prev) => [...prev.slice(-3), { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 7000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addToCart = useCallback(
    (book: Book, qty = 1) => {
      setCart((prev) => {
        const found = prev.find((l) => l.book.id === book.id);
        if (found) return prev.map((l) => (l.book.id === book.id ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { book, qty, giftWrap: false, insurance: Math.random() > 0.5 }];
      });
      setDoomPurchases((d) => d + 1);
      setLoyaltyPoints((p) => p + Math.floor(book.price));
    },
    []
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.book.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) => prev.map((l) => (l.book.id === id ? { ...l, qty: Math.max(1, qty) } : l)));
  }, []);

  const toggleGiftWrap = useCallback((id: string) => {
    setCart((prev) => prev.map((l) => (l.book.id === id ? { ...l, giftWrap: !l.giftWrap } : l)));
  }, []);

  const toggleInsurance = useCallback((id: string) => {
    setCart((prev) => prev.map((l) => (l.book.id === id ? { ...l, insurance: !l.insurance } : l)));
  }, []);

  const bumpHubris = useCallback((n: number) => setHubrisScore((s) => s + n), []);

  const scrollFee = scrollLedger.total;
  const browsingFee = browsingSeconds * 0.033 + scrollFee;
  const subtotal = cart.reduce((s, l) => s + l.book.price * l.qty, 0);
  const feesTotal =
    cart.reduce((s, l) => s + (l.giftWrap ? 8.99 * l.qty : 0) + (l.insurance ? 6.49 * l.qty : 0), 0) +
    (cart.length > 0 ? 14.95 + 8.5 + 4.99 : 0);
  const grandTotal = subtotal + feesTotal;
  const cartCount = cart.reduce((s, l) => s + l.qty, 0);

  return (
    <ShopContext.Provider
      value={{
        cart, addToCart, removeFromCart, setQty, toggleGiftWrap, toggleInsurance,
        cartCount, subtotal, feesTotal, grandTotal, toasts, pushToast, dismissToast,
        browsingSeconds, browsingFee, scrollFee, scrollCount: scrollLedger.count, scrollBumps: scrollLedger.recent,
        doomPurchases, loyaltyPoints, hubrisScore, bumpHubris, consentBannerUp, setConsentBannerUp,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export function useBrowsingFee(seconds: number) {
  return seconds * 0.033;
}
