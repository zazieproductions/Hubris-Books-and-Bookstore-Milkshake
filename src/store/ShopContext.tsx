import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import type { Book } from "../data/books";
import { REQUIRED_TOGETHER } from "../data/books";

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

export interface FeeJump {
  id: number;
  amount: number;
}

export type ConsentMode = "accepted" | "rejected" | null;

export interface ConsentRecord {
  mode: ConsentMode;
  at: string | null;
  trackers: number;
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
  /* --- the meter --- */
  browsingSeconds: number;
  browsingFee: number;
  feeJumps: FeeJump[];
  escalation: number;
  scrollCharges: number;
  /* --- frequently required together --- */
  required: Record<string, boolean>;
  toggleRequired: (id: string) => void;
  reassertRequired: (id: string) => void;
  requiredTotal: number;
  uncheckFees: number;
  /* --- consent (so the popups stop coming back) --- */
  consent: ConsentRecord;
  setConsent: (mode: Exclude<ConsentMode, null>, trackers: number) => void;
  revokeConsent: () => void;
  cookieOpen: boolean;
  setCookieOpen: (v: boolean) => void;
  /* --- misc --- */
  doomPurchases: number;
  loyaltyPoints: number;
  hubrisScore: number;
  bumpHubris: (n: number) => void;
}

const ShopContext = createContext<ShopState | null>(null);

let toastId = 1;
let jumpId = 1;

const CONSENT_KEY = "hubris.consent.v4";
/** $1.99/minute drip, because the meter also runs while you are not scrolling. */
const DRIP_PER_SECOND = 1.99 / 60;
/** The meter escalates. Escalation is the product. */
const MAX_ESCALATION = 12;
const FEE_CEILING = 480_000;

function readConsent(): ConsentRecord {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ConsentRecord;
      if (parsed && parsed.mode) return parsed;
    }
  } catch {
    /* localStorage is blocked. We will simply ask again. Politely. Forever. */
  }
  return { mode: null, at: null, trackers: 0 };
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [browsingSeconds, setBrowsingSeconds] = useState(0);
  const [browsingFee, setBrowsingFee] = useState(0);
  const [feeJumps, setFeeJumps] = useState<FeeJump[]>([]);
  const [scrollCharges, setScrollCharges] = useState(0);
  const [doomPurchases, setDoomPurchases] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(12);
  const [hubrisScore, setHubrisScore] = useState(0);
  const [consent, setConsentState] = useState<ConsentRecord>(() => readConsent());
  const [cookieOpen, setCookieOpen] = useState(false);
  const [required, setRequired] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(REQUIRED_TOGETHER.map((u) => [u.id, true])),
  );
  const [uncheckFees, setUncheckFees] = useState(0);

  const chargeRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastChargeAt = useRef(0);

  /* ------------------------------ the meter ------------------------------ */
  // Time drip: $1.99/min, running always, stopping never.
  useEffect(() => {
    const t = setInterval(() => {
      setBrowsingSeconds((s) => s + 1);
      setBrowsingFee((f) => Math.min(FEE_CEILING, f + DRIP_PER_SECOND));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Scroll meter: every real scroll movement adds hundreds of dollars.
  // The increment escalates with use, because use is the point.
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const moved = Math.abs(y - lastScrollY.current);
      const now = Date.now();
      if (moved < 12 || now - lastChargeAt.current < 130) {
        lastScrollY.current = y;
        return;
      }
      lastScrollY.current = y;
      lastChargeAt.current = now;

      chargeRef.current += 1;
      setScrollCharges(chargeRef.current);

      const escalation = Math.min(MAX_ESCALATION, 1 + Math.floor(chargeRef.current / 5));
      // Hundreds of dollars: $100–$400 per scroll event, multiplied by escalation.
      const hundreds = 1 + Math.floor(Math.random() * 4);
      const amount = hundreds * 100 * escalation;

      setBrowsingFee((f) => Math.min(FEE_CEILING, f + amount));

      const id = jumpId++;
      setFeeJumps((prev) => [...prev.slice(-3), { id, amount }]);
      setTimeout(() => setFeeJumps((prev) => prev.filter((j) => j.id !== id)), 1500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ------------------------------- toasts -------------------------------- */
  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = toastId++;
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 6500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  /* -------------------------------- cart --------------------------------- */
  const addToCart = useCallback((book: Book, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.book.id === book.id);
      if (found) return prev.map((l) => (l.book.id === book.id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { book, qty, giftWrap: false, insurance: Math.random() > 0.5 }];
    });
    setDoomPurchases((d) => d + 1);
    setLoyaltyPoints((p) => p + Math.floor(book.price));
  }, []);

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

  /* ---------------------- frequently required together -------------------- */
  const toggleRequired = useCallback((id: string) => {
    setRequired((prev) => {
      const next = !prev[id];
      if (!next) {
        const item = REQUIRED_TOGETHER.find((u) => u.id === id);
        // Declining is permitted. Declining is also billable.
        setUncheckFees((f) => f + (item?.uncheckFee ?? 0));
      }
      return { ...prev, [id]: next };
    });
  }, []);

  /** For the rare item that re-checks itself, for your safety. */
  const reassertRequired = useCallback((id: string) => {
    setRequired((prev) => ({ ...prev, [id]: true }));
  }, []);

  /* -------------------------------- consent ------------------------------- */
  const setConsent = useCallback((mode: Exclude<ConsentMode, null>, trackers: number) => {
    const record: ConsentRecord = { mode, at: new Date().toISOString(), trackers };
    setConsentState(record);
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    } catch {
      /* If we cannot store it, we simply cannot remember you. We will guess. */
    }
  }, []);

  const revokeConsent = useCallback(() => {
    setConsentState({ mode: null, at: null, trackers: 0 });
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      /* no-op */
    }
    setCookieOpen(true);
  }, []);

  /* -------------------------------- totals -------------------------------- */
  const requiredTotal =
    cart.length > 0 ? REQUIRED_TOGETHER.reduce((s, u) => s + (required[u.id] ? u.price : 0), 0) : 0;

  const subtotal = cart.reduce((s, l) => s + l.book.price * l.qty, 0);
  const feesTotal =
    cart.reduce((s, l) => s + (l.giftWrap ? 8.99 * l.qty : 0) + (l.insurance ? 6.49 * l.qty : 0), 0) +
    (cart.length > 0 ? 14.95 + 8.5 + 4.99 : 0) +
    requiredTotal +
    uncheckFees;
  const grandTotal = subtotal + feesTotal;
  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const escalation = Math.min(MAX_ESCALATION, 1 + Math.floor(scrollCharges / 5));

  return (
    <ShopContext.Provider
      value={{
        cart, addToCart, removeFromCart, setQty, toggleGiftWrap, toggleInsurance,
        cartCount, subtotal, feesTotal, grandTotal, toasts, pushToast, dismissToast,
        browsingSeconds, browsingFee, feeJumps, escalation, scrollCharges,
        required, toggleRequired, reassertRequired, requiredTotal, uncheckFees,
        consent, setConsent, revokeConsent, cookieOpen, setCookieOpen,
        doomPurchases, loyaltyPoints, hubrisScore, bumpHubris,
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

/** The meter, in dollars. It does not go down. It has never gone down. */
export function useBrowsingFee(seconds: number) {
  const { browsingFee } = useShop();
  return browsingFee + seconds * DRIP_PER_SECOND;
}
