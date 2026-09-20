import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Menu, X, ChevronDown, Mail, MapPin, Phone, CreditCard,
  ShieldCheck, Truck, Cookie, Bell, Sparkles, ArrowRight, BadgeCheck,
} from "lucide-react";
import { useShop } from "../store/ShopContext";

/* ------------------------------ Promo ticker ------------------------------ */
const TICKER_ITEMS = [
  "FLASH SALE: Prices increased by up to 40% for your excitement",
  "New fee just dropped: the Browsing Fee ($1.99/min — you're paying it now)",
  "Congratulations! You've been pre-approved for upsells",
  "Returns are a myth propagated by competing publishers",
  "Vanilla Compliance now 12% more compliant",
  "Your cart misses you. It has feelings. It has lawyers.",
  " surge pricing is just regular pricing that believes in itself ",
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
const NAV = [
  { to: "/catalog", label: "Catalog", sub: "18 titles, 400 fees" },
  { to: "/bestsellers", label: "Bestsellers", sub: "chosen by revenue" },
  { to: "/cafe", label: "Milkshake Café", sub: "one flavor" },
  { to: "/authors", label: "For Authors", sub: "pay to publish" },
  { to: "/loyalty", label: "FunBux™", sub: "points, not money" },
  { to: "/about", label: "Our Empire", sub: "47 PE firms" },
];

export function Header() {
  const { cartCount, browsingSeconds, loyaltyPoints, grandTotal } = useShop();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const browsingFee = (browsingSeconds * 0.033).toFixed(2);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-hubris text-paper border-b-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-paper flex items-center justify-center relative shrink-0 border-2 border-gold group-hover:rotate-6 transition-transform">
              <span className="font-serif font-black text-hubris text-2xl leading-none">H</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-alarm rounded-full text-[9px] flex items-center justify-center text-white font-bold">$</span>
            </div>
            <div className="leading-tight">
              <div className="font-serif font-black text-lg sm:text-xl tracking-tight">
                HUBRIS BOOKS <span className="text-gold">&</span> <span className="italic text-shake">Bookstore Milkshake</span>
              </div>
              <div className="font-mono text-[10px] text-gold-light/80 uppercase tracking-widest hidden sm:block">
                Books for librarians with a purchasable edge™ — est. 2006, regretted daily
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px]">
            <div className="bg-hubris-light border border-gold/40 rounded px-2 py-1 text-gold-light" title="You're welcome">
              ⏱ Browsing fee: <span className="text-white font-semibold">${browsingFee}</span>
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
            <button onClick={() => navigate("/cart")} className="relative bg-gold text-hubris rounded p-2">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-alarm text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
            <button onClick={() => setOpen(!open)} className="text-paper p-2" aria-label="Menu">
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
        <div className="lg:hidden bg-hubris-light border-b-4 border-gold px-4 py-3 space-y-1">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-paper font-semibold hover:bg-hubris">
              {n.label} <span className="font-mono text-[10px] text-gold/70 ml-1">{n.sub}</span>
            </Link>
          ))}
          <div className="font-mono text-[11px] text-gold-light px-3 pt-2">
            ⏱ Browsing fee so far: ${browsingFee} · ★ FunBux™: {loyaltyPoints.toLocaleString()}
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
    pushToast({ kind: "info", title: "Subscribed to 14 lists!", body: "Daily Deals, Hourly Deals, Minutely Deals, Greg's Newsletter, Invoice Alerts, and 9 more. Unsubscribe links are decorative." });
    setEmail("");
  };

  return (
    <footer className="bg-ink text-paper mt-0">
      <div className="bg-alarm text-white py-2 px-4 text-center font-mono text-xs">
        <span className="animate-blink-hard font-bold">● REC</span> — This footer is being recorded for quality assurance and upsell optimization.
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="font-serif font-black text-2xl">HUBRIS BOOKS <span className="text-gold">&</span> <span className="italic text-shake">Bookstore Milkshake</span></div>
          <p className="text-sm text-paper/60 mt-3 max-w-sm">
            Founded in 2006, Bookstore Milkshake is now an imprint of Hubris Books, LLC, LLC, specializing in theoretical and practical issues in librarianship from a <em className="text-gold-light">profitable</em> perspective, for an audience of professional librarians and students of library science who have already entered their card details.
          </p>
          <div className="mt-4 space-y-1.5 font-mono text-xs text-paper/60">
            <div className="flex items-center gap-2"><MapPin size={12} /> Hubris Tower, 1 Monetization Plaza, Suite 666, Dayton OH</div>
            <div className="flex items-center gap-2"><Phone size={12} /> 1-800-BUY-BOOK (1-800-289-2665) — hold music is just a cash register</div>
            <div className="flex items-center gap-2"><Mail size={12} /> no-refunds@hubrisbooks.example</div>
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
          ["Our Empire", "/about"], ["Leadership (all named Greg)", "/about#leadership"], ["Investor Relations", "/about"],
          ["Acquisitions Desk", "/authors"], ["Careers (unpaid, prestigious)", "/faq"],
        ]} />
        <FooterCol title="Support*" links={[
          ["Help Center (lol)", "/faq"], ["Returns (page intentionally blank)", "/faq"], ["Track Your Invoice", "/cart"],
          ["Contact Greg", "/faq"], ["File a Complaint (a $25 service)", "/terms"],
        ]} />
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
            © 2006–2026 Hubris Books LLC LLC LLC and its 47 parent companies. All rights reserved, including rights you didn't know you had — those are ours now too.
            Prices subject to surge without notice. Fees subject to fees. FunBux™ are not currency, not transferable, not redeemable, and not fun, but they are bucks in spirit.
            Any resemblance to actual critical librarianship, living or dead, is purely coincidental and frankly litigious. Do not taunt the invoice.
            By reading this footer you agree to our <Link to="/terms" className="underline text-gold-light/60">Terms of Servitude</Link>, our Privacy Policy (we have your data; that's the policy), and our Cookie Policy (we ate the cookies; you get trackers).
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
  const { toasts, dismissToast } = useShop();
  return (
    <div className="fixed bottom-4 right-4 z-[60] space-y-2 w-[calc(100vw-2rem)] max-w-sm">
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

/* --------------------------- Cookie banner (evil) --------------------------- */
export function CookieBanner() {
  const { pushToast, bumpHubris } = useShop();
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [rejectClicks, setRejectClicks] = useState(0);
  const [dodging, setDodging] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    setVisible(false);
    bumpHubris(10);
    pushToast({ kind: "info", title: "2,847 trackers accepted!", body: "Including 12 that just watch. +50 FunBux™ for your compliance." });
  };

  const rejectNeeded = 5;
  const handleReject = () => {
    const next = rejectClicks + 1;
    if (next >= rejectNeeded) {
      setVisible(false);
      pushToast({ kind: "warning", title: "Preferences saved*", body: "*We saved your preference to ignore your preferences. Essential trackers (all of them) remain." });
    } else {
      setRejectClicks(next);
      setDodging(true);
      setTimeout(() => setDodging(false), 600);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto bg-paper border-4 border-hubris rounded-xl shadow-[8px_8px_0_rgba(15,30,61,1)] overflow-hidden">
        <div className="bg-hubris text-paper px-4 py-2 flex items-center gap-2 font-mono text-xs">
          <Cookie size={14} className="text-gold" />
          <span className="font-bold">COOKIE & TRACKER CONSENT</span>
          <span className="text-paper/50 hidden sm:inline">— resistance is metered at $0.05/second</span>
        </div>
        {!prefs ? (
          <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm flex-1">
              We value your privacy, which is why we'd like to purchase it. This site uses <strong>2,847 cookies</strong> including
              <em> Essential, Essential-Plus, Emotionally Essential,</em> and <em>Greg's Personal Cookies</em>.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <button onClick={acceptAll} className="bg-mint text-white font-bold px-6 py-3 rounded-lg text-sm hover:brightness-110 animate-pulse-ring whitespace-nowrap">
                ACCEPT ALL ✓
              </button>
              <button onClick={() => setPrefs(true)} className="text-xs underline text-hubris/60 hover:text-hubris px-2">
                manage preferences
              </button>
              <button
                onClick={handleReject}
                onMouseEnter={() => rejectClicks >= 2 && setDodging(true)}
                className={`fine-print text-hubris/40 hover:text-hubris/70 underline transition-transform ${dodging ? "translate-x-6 -rotate-3" : ""}`}
              >
                {rejectClicks === 0 ? "reject" : `reject (${rejectClicks}/${rejectNeeded} — keep going!)`}
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
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Strictly Necessary (everything)": true,
    "Performance (ours, not yours)": true,
    "Functional (functions for us)": true,
    "Targeting (you, specifically)": true,
    "Greg's Curiosity": true,
  });

  const flip = (k: string) => {
    if (toggles[k]) {
      pushToast({ kind: "warning", title: "Cannot disable", body: `"${k}" is load-bearing. The site would collapse. Greg would cry.` });
      return;
    }
    setToggles((t) => ({ ...t, [k]: true }));
  };

  return (
    <div className="p-4">
      <div className="space-y-2">
        {Object.entries(toggles).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between bg-parchment rounded px-3 py-2">
            <span className="text-sm font-medium">{k}</span>
            <button
              onClick={() => flip(k)}
              className={`w-12 h-6 rounded-full relative transition-colors ${v ? "bg-mint" : "bg-gray-300"}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${v ? "right-1" : "left-1"}`} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={onBack} className="text-xs underline text-hubris/60 px-2">← back</button>
        <button onClick={onAccept} className="ml-auto bg-mint text-white font-bold px-6 py-2 rounded-lg text-sm">CONFIRM MY COMPLIANCE</button>
      </div>
      <p className="fine-print text-ink/50 mt-2">Note: the toggles above are for display purposes. Like democracy in our corporate charter.</p>
    </div>
  );
}

/* ------------------------- Exit-intent / time modal ------------------------ */
export function RetentionModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const { pushToast } = useShop();

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setShow(true);
    };
    document.addEventListener("mouseout", onLeave);
    return () => { clearTimeout(t); document.removeEventListener("mouseout", onLeave); };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-hubris/80 flex items-center justify-center p-4" onClick={() => setShow(false)}>
      <div className="bg-paper max-w-md w-full rounded-xl border-4 border-gold shadow-2xl p-6 relative" onClick={(e) => e.stopPropagation()}>
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
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-light flex items-center gap-2">
          <Bell size={12} /> {kicker}
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl mt-3 leading-tight">{title}</h1>
        {sub && <p className="text-paper/70 mt-3 max-w-2xl">{sub}</p>}
        {children}
      </div>
    </div>
  );
}

export function SectionShell({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`max-w-7xl mx-auto px-4 py-10 sm:py-14 scroll-mt-32 ${className}`}>{children}</div>;
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-alarm font-semibold flex items-center gap-2">
      <ChevronDown size={12} /> {children}
    </div>
  );
}
