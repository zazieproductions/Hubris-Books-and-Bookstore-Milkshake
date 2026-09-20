import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Book } from "../data/books";

export interface CartLine {
  book: Book;
  qty: number;
  giftWrap: boolean;
  insurance: boolean;
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
  scrollFee: number;
  browsingFee: number;
  doomPurchases: number;
  loyaltyPoints: number;
  hubrisScore: number;
  bumpHubris: (n: number) => void;
}

const ShopContext = createContext<ShopState | null>(null);

let toastId = 1;

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [browsingSeconds, setBrowsingSeconds] = useState(0);
  const [scrollFee, setScrollFee] = useState(47.0); // start already billing
  const [doomPurchases, setDoomPurchases] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(12);
  const [hubrisScore, setHubrisScore] = useState(0);

  // time-based browsing
  useEffect(() => {
    const t = setInterval(() => setBrowsingSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // SCROLL = MONEY — every scroll jacks the fee by hundreds
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const delta = Math.abs(window.scrollY - lastY);
        if (delta > 5) {
          // Rapidly increasing by hundreds per scroll intent
          const surge = 85 + Math.random() * 410 + delta * 1.8;
          setScrollFee((f) => f + surge);
          lastY = window.scrollY;
        }
        ticking = false;
      });
    };

    // Also charge for just thinking about scrolling (wheel events)
    const onWheel = () => {
      setScrollFee((f) => f + 45 + Math.random() * 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
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
        return [...prev, { book, qty, giftWrap: false, insurance: Math.random() > 0.3 }];
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

  const subtotal = cart.reduce((s, l) => s + l.book.price * l.qty, 0);
  const feesTotal =
    cart.reduce((s, l) => s + (l.giftWrap ? 8.99 * l.qty : 0) + (l.insurance ? 6.49 * l.qty : 0), 0) +
    (cart.length > 0 ? 14.95 + 8.5 + 4.99 : 0);
  const grandTotal = subtotal + feesTotal;

  const browsingFee = browsingSeconds * 0.033 + scrollFee;
  const cartCount = cart.reduce((s, l) => s + l.qty, 0);

  return (
    <ShopContext.Provider
      value={{
        cart, addToCart, removeFromCart, setQty, toggleGiftWrap, toggleInsurance,
        cartCount, subtotal, feesTotal, grandTotal, toasts, pushToast, dismissToast,
        browsingSeconds, scrollFee, browsingFee, doomPurchases, loyaltyPoints, hubrisScore, bumpHubris,
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
