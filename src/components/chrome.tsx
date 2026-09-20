import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Menu, X, ChevronDown, Mail, MapPin, Phone, CreditCard,
  ShieldCheck, Truck, Cookie, Bell, Sparkles, ArrowRight, BadgeCheck, ArrowDownUp,
} from "lucide-react";
import { useShop } from "../store/ShopContext";
import { BOOKS } from "../data/books";

/* ------------------------------ Promo ticker ------------------------------ */
const TICKER_ITEMS = [
  "FLASH SALE: Prices increased by up to 40% for your excitement",
  "SCROLLING BILLS $127–$389 PER SCROLL — keep scrolling, we dare you",
  "CEO Hubris Munnytown (a bunny) declares Q3 “adequate” — see Newsroom",
  "Congratulations! You've been pre-approved for upsells",
  "Returns are a myth propagated by competing publishers",
  "BREAKING: the word “radical” now costs extra (details in Newsroom)",
  "Your cart misses you. It has feelings. It has lawyers.",
  "Surge pricing is just regular pricing that believes in itself",
  "ALA-ADJACENT™: legally distinct from endorsement",
];

export function PromoTicker() {
  const row = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="bg-ink text-gold-light overflow-hidden py-1.5 border-b border-gold/40">
      <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-mono text-[11px] uppercase tracking-wider px-6 border-r border-gold/30">
            ⚠ {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- Header ---------------------------------- */
export function Header() {
  const { cartCount, browsingFee, loyaltyPoints, grandTotal } = useShop();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const feeStr = browsingFee.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const feeHot = browsingFee >= 1000;

  const NAV = [
    { to: "/catalog", label: "Catalog", sub: `${BOOKS.length} titles, 400 fees` },
    { to: "/bestsellers", label: "Bestsellers", sub: "chosen by revenue" },
    { to: "/news", label: "Newsroom", sub: "denials & announcements" },
    { to: "/authors", label: "For Authors", sub: "pay to publish" },
    { to: "/loyalty", label: "FunBux™", sub: "points, not money" },
    { to: "/about", label: "Our Empire", sub: "1 bunny, 47 PE firms" },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-hubris text-paper border-b-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 py-3">
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-paper flex items-center justify-center relative shrink-0 border-2 border-gold group-hover:rotate-6 transition-transform">
              <span className="font-serif font-black text-hubris text-2xl leading-none">H</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-alarm rounded-full text-[9px] flex items-center justify-center text-white font-bold">$</span>
            </div>
            <div className="leading-tight">
              <div className="font-serif font-black text-base sm:text-xl tracking-tight">
                HUBRIS BOOKS <span className="hidden min-[420px]:inline"><span className="text-gold">&</span> <span className="italic text-shake">Bookstore Milkshake</span></span>
              </div>
              <div className="font-mono text-[10px] text-gold-light/80 uppercase tracking-widest hidden sm:block">
                Books for librarians with a purchasable edge™ — est. 2006, regretted daily
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px]">
            <div className={`border rounded px-2 py-1 ${feeHot ? "bg-alarm border-alarm text-white animate-pulse-ring" : "bg-hubris-light border-gold/40 text-gold-light"}`} title="Looking ($1.99/min) + your Scrolling fee ($127–$389 per scroll, itemized bottom-left). You're welcome.">
              ⏱ Browsing fee: <span className="text-white font-semibold">${feeStr}</span>{feeHot && <span className="ml-1 text-[10px] font-bold hidden xl:inline">🔥 STOP SCROLLING (OR DON'T, WE'RE RICH)</span>}
            </div>
            <div className="bg-hubris-light border border-gold/40 rounded px-2 py-1 text-gold-light">
              ★ FunBux™: <span className="text-white font-semibold">{loyaltyPoints.toLocaleString()}</span>
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-2 bg-gold hover:bg-gold-light text-hubris font-bold rounded px-3 py-2 transition-colors"
            >
              <ShoppingCart size={16} />
              <span className="hidden xl:inline">Cart (${grandTotal.toFixed(2)})</span>
              <span className="xl:hidden">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-alarm text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse-ring">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => navigate("/cart")}
              className="relative min-h-11 min-w-11 bg-gold text-hubris rounded-lg p-2 flex items-center justify-center"
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-alarm text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-paper min-h-11 min-w-11 p-2 flex items-center justify-center rounded-lg hover:bg-hubris-light"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* desktop nav */}
        <nav className="hidden lg:block border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 flex items-stretch">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="group px-5 py-2.5 border-r border-white/10 first:border-l hover:bg-hubris-light transition-colors">
                <div className="text-sm font-semibold text-paper group-hover:text-gold-light flex items-center gap-1">
                  {n.label}
                </div>
                <div className="font-mono text-[10px] text-paper/50 group-hover:text-gold/80">{n.sub}</div>
              </Link>
            ))}
            <Link to="/faq" className="ml-auto px-5 py-2.5 hover:bg-hubris-light transition-colors self-center text-sm text-paper/70 hover:text-paper">
              Help<span className="font-mono text-[10px]"> (lol)</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* mobile nav */}
      {open && (
        <div id="mobile-navigation" className="lg:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto bg-hubris-light border-b-4 border-gold px-3 py-3 space-y-1">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="min-h-11 flex items-center justify-between gap-3 px-3 py-2 rounded text-paper font-semibold hover:bg-hubris">
              <span>{n.label}</span>
              <span className="font-mono text-[10px] text-gold/70 text-right">{n.sub}</span>
            </Link>
          ))}
          <Link to="/faq" onClick={() => setOpen(false)} className="min-h-11 flex items-center justify-between gap-3 px-3 py-2 rounded text-paper font-semibold hover:bg-hubris">
            <span>Help</span>
            <span className="font-mono text-[10px] text-gold/70">answers, allegedly</span>
          </Link>
          <div className="font-mono text-[11px] leading-relaxed text-gold-light px-3 pt-2 pb-1 border-t border-white/10">
            ⏱ Browsing fee so far: ${feeStr}<br />
            Scrolling bills $127–$389/scroll · ★ FunBux™: {loyaltyPoints.toLocaleString()}
          </div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- Footer ---------------------------------- */
export function Footer() {
  const { pushToast, bumpHubris } = useShop();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      pushToast({ kind: "warning", title: "Invalid email", body: "That doesn't look like an email. We've subscribed you anyway, out of spite." });
      return;
    }
    bumpHubris(5);
    pushToast({ kind: "info", title: "Subscribed to 14 lists!", body: "Daily Deals, Hourly Deals, Minutely Deals, Hutch Happenings, Invoice Alerts, and 9 more. Unsubscribe links are decorative." });
    setEmail("");
  };

  return (
    <footer className="bg-ink text-paper mt-0">
      <div className="bg-alarm text-white py-2 px-4 text-center font-mono text-xs">
        <span className="animate-blink-hard font-bold">● REC</span> — This footer is being recorded for quality assurance and upsell optimization.
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="font-serif font-black text-2xl leading-tight break-words">HUBRIS BOOKS <span className="text-gold">&</span> <span className="italic text-shake">Bookstore Milkshake</span></div>
          <p className="text-sm text-paper/60 mt-3 max-w-sm">
            Founded in 2006, Bookstore Milkshake is now an imprint of Hubris Books, LLC, LLC, specializing in theoretical and practical issues in librarianship from a <em className="text-gold-light">profitable</em> perspective, for an audience of professional librarians and students of library science who have already entered their card details.
          </p>
          <div className="mt-4 space-y-1.5 font-mono text-xs text-paper/60">
            <div className="flex items-start gap-2 min-w-0"><MapPin size={12} className="shrink-0 mt-0.5" /> <span className="min-w-0 break-words">Hubris Tower, 1 Monetization Plaza, Suite 666, Dayton OH</span></div>
            <div className="flex items-start gap-2 min-w-0"><Phone size={12} className="shrink-0 mt-0.5" /> <span className="min-w-0 break-words">1-800-BUY-BOOK (1-800-289-2665) — hold music is just a cash register</span></div>
            <div className="flex items-start gap-2 min-w-0"><Mail size={12} className="shrink-0 mt-0.5" /> <span className="min-w-0 break-words">no-refunds@hubrisbooks.example</span></div>
          </div>
          <form onSubmit={subscribe} className="mt-5">
            <label className="font-mono text-[11px] uppercase tracking-widest text-gold-light">Join 400,000 subscribers who can't leave</label>
            <div className="flex mt-2 max-w-sm">
              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com (required, forever)"
                className="flex-1 bg-white/10 border border-gold/40 rounded-l px-3 py-2 text-sm placeholder:text-paper/30 focus:outline-none focus:border-gold"
              />
              <button className="bg-gold hover:bg-gold-light text-ink font-bold px-4 rounded-r text-sm flex items-center gap-1">
                Enroll <ArrowRight size={14} />
              </button>
            </div>
            <p className="fine-print text-paper/40 mt-1">By subscribing you agree to receive emails, texts, faxes, skywriting, and visits.</p>
          </form>
        </div>

        <FooterCol title="Shop" links={[
          ["Full Catalog", "/catalog"], ["Bestsellers", "/bestsellers"], ["The Vault Select", "/catalog?vault=1"],
          ["Gift Cards (non-refundable, non-transferable, non-functional)", "/loyalty"], ["Bulk Orders (mandatory over 1 copy)", "/cart"],
        ]} />
        <FooterCol title="Corporate" links={[
          ["Our Empire", "/about"], ["Leadership (one bunny, one Warren)", "/about#leadership"], ["Newsroom (denials & announcements)", "/news"],
          ["Acquisitions Desk", "/authors"], ["Careers (unpaid, prestigious)", "/faq"],
        ]} />
        <FooterCol title="Support*" links={[
          ["Help Center (lol)", "/faq"], ["Returns (page intentionally blank)", "/faq"], ["Track Your Invoice", "/cart"],
          ["Contact the Hutch", "/faq"], ["File a Complaint (a $25 service)", "/terms"],
        ]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="border-2 border-gold/60 rounded-xl p-5 sm:p-6 bg-white/[0.03]">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-light font-bold">Hubris Books™ (Corporate Synergy Division)</div>
          <ul className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-paper/75">
            <li className="flex gap-2"><span className="text-gold">•</span> Venture-backed, thought-leader-run, critical perspectives™ on how to own them</li>
            <li className="flex gap-2"><span className="text-gold">•</span> Authors retain exposure. We retain everything else, in perpetuity, universe-wide.</li>
            <li className="flex gap-2"><span className="text-gold">•</span> Books about power structures. We ARE the power structure. Meta!</li>
            <li className="flex gap-2"><span className="text-gold">•</span> Website has 14 popups, 3 fake timers, and a chatbot that sells insurance</li>
            <li className="flex gap-2"><span className="text-gold">•</span> Profits? Yes. Profits. That's the values.</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3 text-xs text-paper/50">
          <span className="flex items-center gap-1"><ShieldCheck size={13} /> Secured by TrustSeal™ (we made it)</span>
          <span className="flex items-center gap-1"><Truck size={13} /> Ships in 6–8 eternities</span>
          <span className="flex items-center gap-1"><CreditCard size={13} /> We accept all cards, especially yours</span>
          <span className="flex items-center gap-1"><BadgeCheck size={13} /> ALA-Adjacent™</span>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="fine-print text-paper/40 leading-relaxed">
            © 2026 Hubris Books &amp; Bookstore™ LLC (A Subsidiary of Hubris &amp; Hubris &amp; Hubris Holdings). All rights reserved, including rights you didn't know you had — those are ours now too.
            Prices subject to surge without notice. Fees subject to fees. FunBux™ are not currency, not transferable, not redeemable, and not fun, but they are bucks in spirit.
            Any resemblance to actual critical librarianship, living or dead, is purely coincidental and frankly litigious. Do not taunt the invoice.
            By reading this footer you agree to our <Link to="/terms" className="underline text-gold-light/60">Terms of Servitude</Link>, our Privacy Policy (we have your data; that's the policy), and our Cookie Policy (we ate the cookies; you get 14,022 trackers).
            Hubris Tower is a smoke-free facility. Vaping is permitted if you purchase the Vaping License ($19.99). Vanilla Compliance contains no vanilla.
          </p>
          <p className="font-mono text-[10px] text-paper/30 mt-2">*Support is a concept, not a department. This is a parody site. No actual books will be shipped, which is still faster than our standard delivery.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-widest text-gold-light mb-3">{title}</h4>
      <ul className="space-y-2">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-paper/70 hover:text-gold-light transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------- Toasts ---------------------------------- */
export function ToastHost() {
  const { toasts, dismissToast, consentBannerUp } = useShop();
  return (
    <div className={`fixed right-4 z-[60] space-y-2 w-[calc(100vw-2rem)] max-w-sm ${consentBannerUp ? "top-24 lg:top-36" : "bottom-20 sm:bottom-4"}`}>
      {toasts.map((t) => (
        <div key={t.id} className="bg-hubris text-paper border-2 border-gold rounded-lg shadow-2xl p-3 flex gap-3 animate-[floaty_0.4s_ease-out]">
          <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            t.kind === "fee" ? "bg-alarm" : t.kind === "warning" ? "bg-alarm" : t.kind === "upsell" ? "bg-shake text-hubris" : "bg-gold text-hubris"
          }`}>
            {t.kind === "fee" ? "$" : t.kind === "warning" ? "!" : t.kind === "upsell" ? "★" : "i"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm flex items-center gap-2">
              {t.title}
              <span className="font-mono text-[9px] uppercase bg-white/10 px-1.5 py-0.5 rounded">{t.kind}</span>
            </div>
            <div className="text-xs text-paper/70 mt-0.5">{t.body}</div>
          </div>
          <button onClick={() => dismissToast(t.id)} className="text-paper/50 hover:text-paper shrink-0"><X size={14} /></button>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------- Scrolling fee meter --------------------------- */
const money = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function scrollFeeVerdict(total: number) {
  if (total === 0) return "scroll to begin accruing";
  if (total < 1000) return "non-refundable";
  if (total < 5000) return "your heirs have been notified";
  if (total < 20000) return "the Bunny is pleased";
  return "you are the payment";
}

/**
 * A small, always-on meter that bills you $127–$389 every time you scroll
 * (Terms §15). The total is folded into the header's Browsing fee; this just
 * makes sure you watch it happen.
 */
export function ScrollFeeMeter() {
  const { scrollFee, scrollCount, scrollBumps, consentBannerUp } = useShop();
  const hot = scrollFee >= 1000;

  return (
    <div
      className={`fixed left-2 sm:left-4 z-30 pointer-events-none select-none ${consentBannerUp ? "hidden sm:block top-24 lg:top-36" : "bottom-2 sm:bottom-4"}`}
      aria-label={`Scrolling fee: $${money(scrollFee)}`}
    >
      {/* each charge floats up off your wallet */}
      <div className="relative h-0" aria-hidden="true">
        {scrollBumps.map((b) => (
          <span
            key={b.id}
            style={{ left: `${(b.id * 29) % 55}%` }}
            className="absolute bottom-1 font-mono text-xs font-black text-alarm whitespace-nowrap drop-shadow-[0_1px_0_rgba(250,246,237,1)] animate-fee-fly motion-reduce:hidden"
          >
            +${money(b.amount)}
          </span>
        ))}
      </div>

      <Link
        to="/terms"
        title="Scroll-Triggered Appreciation Fee (Terms §15): every scroll bills $127–$389. Folded into your Browsing fee. The scroll wheel is a payment terminal."
        className={`pointer-events-auto block rounded-lg border-2 px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-[3px_3px_0_rgba(15,30,61,0.9)] sm:shadow-[4px_4px_0_rgba(15,30,61,0.9)] transition-colors ${
          hot ? "bg-alarm border-alarm text-white animate-pulse-ring" : "bg-hubris border-gold text-gold-light hover:border-gold-light"
        }`}
      >
        <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.2em] flex items-center gap-1.5">
          <ArrowDownUp size={11} /> Scrolling fee
        </div>
        {/* re-keyed per scroll so the pop animation replays on every charge */}
        <div key={scrollCount} className={`font-mono font-black text-base sm:text-lg leading-tight tabular-nums text-white ${scrollCount > 0 ? "animate-fee-bump" : ""}`}>
          ${money(scrollFee)}
        </div>
        <div className={`fine-print ${hot ? "text-white/80" : "text-paper/50"}`}>
          {scrollCount.toLocaleString()} scroll{scrollCount === 1 ? "" : "s"} · {scrollFeeVerdict(scrollFee)}
        </div>
      </Link>
    </div>
  );
}

/* --------------------------- Cookie banner (evil) --------------------------- */
const TRACKER_CATEGORIES: { name: string; desc: string; vendors: string }[] = [
  { name: "Strictly Necessary (everything, forever)", desc: "The site cannot function without knowing everything. Neither can we. Coincidence.", vendors: "1 vendor (us, all of us)" },
  { name: "Retinal & Gait Analysis", desc: "Your webcam is on. Your walk has been scored. You walk like someone with overdue fines.", vendors: "14 vendors, 3 of them just watching" },
  { name: "Keystroke Biometrics", desc: "Every keystroke fingerprinted — including backspaces. Especially backspaces. We saw the draft.", vendors: "22 vendors + the Warren's memory" },
  { name: "Dream-Adjacent Inference", desc: "We infer dreams from 3 a.m. cart activity. Your recurring dream involves a slipcase. Don't deny it.", vendors: "9 vendors, 1 sleep lab, 1 oracle" },
  { name: "Household Income Estimation", desc: "Estimated from your scroll velocity, hesitation patterns, and the device you're embarrassed about.", vendors: "31 vendors, all judgmental" },
  { name: "Microwave Listening Partners", desc: "Your smart appliances report ambient hunger. Hungry shoppers convert 40% better. Dinner is at 7. We ordered for you.", vendors: "148 vendors (all appliances, all listening)" },
  { name: "Soul Fingerprint (hashed, blessed)", desc: "Per §13.3, your soul is fingerprinted for marketing purposes. The hash is blessed. The blessing is itemized.", vendors: "1 vendor (eternal, non-optional)" },
  { name: "Overdue Shame Score", desc: "A 0–100 score of your library guilt, sold to lenders, landlords, and first dates (with consent — theirs).", vendors: "67 vendors, incl. your ex's library" },
  { name: "Mouse Hesitation Profiling", desc: "Every hover over 'No thanks' is scored, timestamped, and read aloud at the company retreat.", vendors: "19 vendors, 1 retreat" },
  { name: "Hutch Crumbs", desc: "Baked in the executive hutch. Oatmeal raisin disguised as carrot cake. Consent is implied by hunger.", vendors: "1 hutch (batches nightly)" },
];

export function CookieBanner() {
  const { pushToast, bumpHubris, setConsentBannerUp } = useShop();
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [rejectClicks, setRejectClicks] = useState(0);
  const [dodging, setDodging] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setConsentBannerUp(visible);
  }, [visible, setConsentBannerUp]);

  if (!visible) return null;

  const acceptAll = () => {
    setVisible(false);
    bumpHubris(10);
    pushToast({ kind: "info", title: "14,022 trackers accepted!", body: "Including 12 that just watch, 148 in your appliances, and 1 oracle. Your compliance has been noted in your permanent file. +50 FunBux™ (spirit bucks)." });
  };

  const rejectNeeded = 5;
  const handleReject = () => {
    const next = rejectClicks + 1;
    if (next >= rejectNeeded) {
      setVisible(false);
      pushToast({ kind: "warning", title: "Preferences saved*", body: "*We saved your preference to ignore your preferences. All 14,022 trackers remain under Legitimate Interest (ours). The oracle sends its regards." });
    } else {
      setRejectClicks(next);
      setDodging(true);
      setTimeout(() => setDodging(false), 600);
    }
  };

  const rejectLabels = [
    "reject",
    "reject (1/5 — the button is getting tired)",
    "reject (2/5 — resistance is metered at $4.99/sec)",
    "reject (3/5 — the Hutch has been notified of your attitude)",
    "reject (4/5 — the oracle says you'll give up here)",
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-2 sm:p-4 pb-[calc(0.5rem+env(safe-area-inset-bottom))] sm:pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="max-w-4xl mx-auto max-h-[82dvh] overflow-y-auto bg-paper border-4 border-alarm rounded-xl shadow-[5px_5px_0_rgba(217,45,32,1)] sm:shadow-[8px_8px_0_rgba(217,45,32,1)]">
        <div className="bg-ink text-paper px-3 sm:px-4 py-2 flex items-center gap-2 font-mono text-[11px] sm:text-xs">
          <Cookie size={14} className="text-gold" />
          <span className="font-bold text-alarm">● CONSENT HARVEST TERMINAL</span>
          <span className="text-paper/50 hidden sm:inline">— resistance is metered at $4.99/second · by reading this banner you have consented to banners</span>
        </div>
        {!prefs ? (
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <p className="text-sm">
                We value your privacy, which is why we'd like to purchase it. This site deploys <strong>14,022 trackers</strong> across <strong>10 categories</strong> and <strong>312 vendors</strong>, including your appliances, your gait, your dreams (adjacent), and one (1) oracle.
              </p>
              <p className="fine-print text-ink/50 mt-1">Consent string: NECESSARY(all).FOREVER(true).SOUL(hashed,blessed).ORACLE(consulted).OBJECTIONS(waived).REFUNDS(myth).</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
              <button onClick={acceptAll} className="min-h-11 bg-mint text-white font-bold px-4 sm:px-6 py-3 rounded-lg text-sm hover:brightness-110 animate-pulse-ring sm:whitespace-nowrap text-center">
                ACCEPT ALL & WAIVE OBJECTIONS ✓
              </button>
              <button onClick={() => setPrefs(true)} className="min-h-11 text-xs underline text-hubris/60 hover:text-hubris px-2">
                manage preferences (futile)
              </button>
              <button
                onClick={handleReject}
                onMouseEnter={() => rejectClicks >= 1 && setDodging(true)}
                className={`min-h-11 fine-print text-hubris/40 hover:text-hubris/70 underline transition-transform ${dodging ? "translate-x-8 -rotate-6 scale-90" : ""}`}
              >
                {rejectLabels[rejectClicks]}
              </button>
            </div>
          </div>
        ) : (
          <PrefsPanel onBack={() => setPrefs(false)} onAccept={acceptAll} />
        )}
      </div>
    </div>
  );
}

function PrefsPanel({ onBack, onAccept }: { onBack: () => void; onAccept: () => void }) {
  const { pushToast } = useShop();

  const flip = (name: string) => {
    const excuses = [
      `"${name}" is load-bearing. The site would collapse. The Bunny would thump. The oracle would know why.`,
      `Disabling "${name}" requires Form 88-B ($25 filing fee). Form 88-B does not exist. The fee, however, is very real.`,
      `"${name}" is protected under Legitimate Interest. The interest is legitimate. The legitimacy is ours.`,
    ];
    pushToast({ kind: "warning", title: "Cannot disable", body: excuses[name.length % excuses.length] });
  };

  return (
    <div className="p-3 sm:p-4">
      <div className="font-mono text-[10px] sm:text-[11px] font-bold text-alarm uppercase tracking-widest mb-2">
        Tracker preferences · 10 categories · 312 vendors · 0 off-switches
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin pr-1">
        {TRACKER_CATEGORIES.map((c) => (
          <div key={c.name} className="flex items-center justify-between gap-3 bg-parchment rounded px-3 py-2">
            <div className="min-w-0">
              <div className="text-sm font-bold">{c.name}</div>
              <div className="fine-print text-ink/55">{c.desc}</div>
              <div className="font-mono text-[10px] text-alarm font-semibold">{c.vendors}</div>
            </div>
            <button
              onClick={() => flip(c.name)}
              className="w-12 h-6 rounded-full relative transition-colors bg-mint shrink-0"
              title="This toggle is decorative"
            >
              <span className="absolute top-1 w-4 h-4 rounded-full bg-white right-1" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3 items-center">
        <button onClick={onBack} className="min-h-11 text-xs underline text-hubris/60 px-2">← back</button>
        <button onClick={onAccept} className="min-h-11 ml-auto bg-mint text-white font-bold px-4 sm:px-6 py-2 rounded-lg text-sm">CONFIRM MY COMPLIANCE</button>
      </div>
      <p className="fine-print text-ink/50 mt-2">Note: the toggles above are for display purposes. Like democracy in our corporate charter. Withdrawing consent requires a quest (fetch the Amulet of Opt-Out from our warehouse; the warehouse is a metaphor; the quest is real).</p>
    </div>
  );
}

/* ------------------------- Exit-intent / time modal ------------------------ */
const RETENTION_SEEN_KEY = "hb:retention:v1";

export function RetentionModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const { pushToast } = useShop();

  // Shown at most ONCE per browser, ever — after 4 minutes or one exit-intent.
  // We have grown. We have matured. (The browsing fee disagrees.)
  useEffect(() => {
    try {
      if (localStorage.getItem(RETENTION_SEEN_KEY)) return;
    } catch { /* private mode: no storage, no popup. Enjoy your freedom (rare). */ return; }
    const trigger = () => {
      try {
        if (localStorage.getItem(RETENTION_SEEN_KEY)) return;
        localStorage.setItem(RETENTION_SEEN_KEY, "1");
      } catch { return; }
      setShow(true);
    };
    const t = setTimeout(trigger, 240000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener("mouseout", onLeave);
    return () => { clearTimeout(t); document.removeEventListener("mouseout", onLeave); };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-hubris/80 flex items-center justify-center p-4" onClick={() => setShow(false)}>
      <div className="bg-paper max-w-md w-full max-h-[90dvh] overflow-y-auto rounded-xl border-4 border-gold shadow-2xl p-4 sm:p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute top-2 right-3 text-ink/30 hover:text-ink text-xs underline">no thanks, I hate saving*</button>
        <div className="text-center">
          <Sparkles className="mx-auto text-gold" size={32} />
          <h3 className="font-serif font-black text-2xl mt-2">WAIT! Don't go empty-handed!</h3>
          <p className="text-sm mt-2">Spin the <strong>Wheel of Mandatory Savings™</strong> and win up to <strong>5% off select fees!</strong></p>
          <div className="bg-hubris text-gold-light font-mono text-sm rounded-lg p-3 mt-4">
            🎡 Possible prizes: 1% off · 2% off · a sense of participation · 1% off
          </div>
          <form className="flex mt-4" onSubmit={(e) => { e.preventDefault(); setShow(false); pushToast({ kind: "upsell", title: "You won: 1% off!", body: "Code MEDIOCRITY applied to fees over $500. An email with 40 upsells is on its way." }); }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email for prize delivery" className="flex-1 border-2 border-hubris rounded-l px-3 py-2 text-sm" />
            <button className="bg-alarm text-white font-bold px-4 rounded-r text-sm">SPIN*</button>
          </form>
          <p className="fine-print text-ink/40 mt-2">*Spin is metaphorical. The wheel is a JPEG. Prizes are final and also imaginary.</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Breadcrumbs ------------------------------- */
export function PageHero({ kicker, title, sub, children }: { kicker: string; title: React.ReactNode; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="bg-hubris text-paper hubris-grid border-b-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-14">
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-gold-light flex flex-wrap items-center gap-2 leading-relaxed break-words">
          <Bell size={12} className="shrink-0" /> <span>{kicker}</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl mt-3 leading-[1.08] break-words">{title}</h1>
        {sub && <p className="text-paper/70 mt-3 max-w-2xl leading-relaxed">{sub}</p>}
        {children}
      </div>
    </div>
  );
}

export function SectionShell({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`max-w-7xl mx-auto min-w-0 px-4 py-8 sm:py-14 scroll-mt-32 ${className}`}>{children}</div>;
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-alarm font-semibold flex flex-wrap items-center gap-2 leading-relaxed">
      <ChevronDown size={12} className="shrink-0" /> <span className="min-w-0 break-words">{children}</span>
    </div>
  );
}
