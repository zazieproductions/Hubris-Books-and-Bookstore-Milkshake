import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Menu, X, ChevronDown, Mail, MapPin, Phone, CreditCard,
  ShieldCheck, Truck, Cookie, Bell, Sparkles, ArrowRight, BadgeCheck,
} from "lucide-react";
import { useShop } from "../store/ShopContext";

/* ------------------------------ Promo ticker - academic, muted ------------------------------ */
const TICKER_ITEMS = [
  "BROWSING FEE: $89–$495 per scroll — meter running",
  "New title: Information Wants to Be Leased (4 vols, sold separately)",
  "Pre-checked at checkout: 6 Required Together™ fees ($242.50)",
  "Hubris Munnytown, SEO Bunny, now Series Editor for Critical Studies™",
  "All standard editions end at p.199 — All-Pages Pass $41",
  "47 private equity firms + 1 bunny — independently owned™",
  "Patent No. US2010248329B2 — Royalties due upon thinking critically about us",
  "ALA-Adjacent™ — legally distinct from endorsement",
];

export function PromoTicker() {
  const row = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="bg-ink text-paper/80 overflow-hidden py-1.5 border-b border-ink/10">
      <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-mono text-[10px] uppercase tracking-widest px-5 border-r border-white/10">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- Header - academic press style ---------------------------------- */
const NAV = [
  { to: "/catalog", label: "Catalog", sub: "27 titles" },
  { to: "/bestsellers", label: "Bestsellers", sub: "by revenue" },
  { to: "/news", label: "News", sub: "2015–2026" },
  { to: "/authors", label: "For Authors", sub: "pay to publish" },
  { to: "/loyalty", label: "FunBux™", sub: "spirit bucks" },
  { to: "/about", label: "Our Empire", sub: "47 firms + 1 bunny" },
];

export function Header() {
  const { cartCount, browsingFee, loyaltyPoints, grandTotal, scrollFee } = useShop();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [pulse, setPulse] = useState(false);
  const prevFeeRef = useRef(browsingFee);

  useEffect(() => {
    if (browsingFee > prevFeeRef.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 400);
      prevFeeRef.current = browsingFee;
      return () => clearTimeout(t);
    }
    prevFeeRef.current = browsingFee;
  }, [browsingFee]);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-ink/10">
      <div className="bg-paper">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6 py-5">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-[2px] bg-ink flex items-center justify-center relative shrink-0 border border-ink group-hover:bg-hubris transition-colors">
              <span className="font-serif font-black text-paper text-[20px] leading-none tracking-tighter">H</span>
            </div>
            <div className="leading-[1.1]">
              <div className="font-serif font-[800] text-[19px] tracking-[-0.02em] text-ink">
                HUBRIS BOOKS <span className="font-[400] italic text-ink/70">& Bookstore Milkshake</span>
              </div>
              <div className="font-mono text-[9.5px] text-ink/50 uppercase tracking-[0.14em] mt-[2px] hidden sm:block">
                Critical perspectives™ on how to own them — est. 2006 — A Subsidiary of Hubris & Hubris & Hubris Holdings
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            <div className="font-mono text-[10.5px] leading-tight">
              <div className={`flex items-center gap-2 border-b pb-1 transition-colors ${pulse ? "border-alarm text-alarm" : "border-ink/15 text-ink/70"}`}>
                <span className="uppercase tracking-widest text-[9px]">Browsing fee</span>
                <span className="font-bold text-ink">${browsingFee.toFixed(2)}</span>
                <span className={`text-[9px] ${pulse ? "text-alarm" : "text-ink/40"}`}>↑ scroll ${scrollFee.toFixed(0)}</span>
              </div>
              <div className="text-[9.5px] text-ink/40 mt-1 flex items-center gap-2">
                <span>FunBux™ {loyaltyPoints.toLocaleString()}</span>
                <span className="w-px h-3 bg-ink/10" />
                <span className="flex items-center gap-1">🐰 Munnytown, SEO</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-2 border border-ink text-ink font-mono text-[11px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
            >
              <ShoppingCart size={13} />
              Cart — ${grandTotal.toFixed(2)}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-alarm text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <div className={`font-mono text-[10px] border px-2 py-1 ${pulse ? "border-alarm text-alarm" : "border-ink/20 text-ink/70"}`}>
              ${browsingFee.toFixed(0)}
            </div>
            <button onClick={() => navigate("/cart")} className="relative border border-ink text-ink p-2">
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-alarm text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </button>
            <button onClick={() => setOpen(!open)} className="text-ink p-2" aria-label="Menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* desktop nav - academic, Litwin-like: simple text links */}
        <nav className="hidden lg:block border-t border-ink/5">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 h-10">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="group flex items-baseline gap-1.5">
                <span className="font-serif text-[14px] font-semibold text-ink group-hover:text-alarm transition-colors tracking-[-0.01em]">{n.label}</span>
                <span className="font-mono text-[10px] text-ink/40 group-hover:text-ink/60">{n.sub}</span>
              </Link>
            ))}
            <Link to="/faq" className="ml-auto font-mono text-[11px] text-ink/50 hover:text-ink uppercase tracking-widest">
              Help
            </Link>
          </div>
        </nav>
      </div>

      {/* mobile nav */}
      {open && (
        <div className="lg:hidden bg-paper border-b border-ink/10 px-6 py-4 space-y-1">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-2.5 border-b border-ink/5 last:border-0">
              <span className="font-serif font-semibold text-ink">{n.label}</span>
              <span className="font-mono text-[10px] text-ink/40">{n.sub}</span>
            </Link>
          ))}
          <div className="font-mono text-[11px] text-ink/60 pt-3">
            Browsing fee: <span className="text-alarm font-bold">${browsingFee.toFixed(2)}</span> · Scroll surcharge ${scrollFee.toFixed(0)} · FunBux™ {loyaltyPoints.toLocaleString()}
            <div className="text-[9.5px] text-ink/40 mt-1">Scrolling adds $89–$495 per scroll. Bunny tracks it.</div>
          </div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- Footer - academic ---------------------------------- */
export function Footer() {
  const { pushToast, bumpHubris } = useShop();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      pushToast({ kind: "warning", title: "Invalid email", body: "We've subscribed you anyway, out of spite. Munnytown will email you personally." });
      return;
    }
    bumpHubris(5);
    pushToast({ kind: "info", title: "Subscribed to 14 lists + 1 bunny", body: "Daily Deals, Hourly Deals, Greg's Newsletter, Invoice Alerts, Munnytown's Carrot Reviews, and 9 more. Unsubscribe links are decorative ($2.49 per click)." });
    setEmail("");
  };

  return (
    <footer className="bg-paper border-t border-ink/10 mt-0">
      <div className="bg-ink text-paper/70 py-2 px-6 text-center font-mono text-[10px] tracking-wide">
        <span className="text-paper/40">● REC</span> — This footer is being recorded for quality assurance and upsell optimization. Munnytown is taking notes. Notes cost $3.75.
      </div>

      {/* Corporate synergy - academic style, not garish */}
      <div className="border-b border-ink/5 bg-parchment/50">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-[1.4fr_0.8fr] gap-10">
          <div>
            <h3 className="font-serif font-[800] text-[15px] uppercase tracking-[0.08em] text-ink">
              Hubris Books™ — Corporate Synergy Division
            </h3>
            <div className="academic-rule mt-3 mb-4" />
            <ul className="space-y-2 text-[13px] leading-relaxed text-ink/70 font-serif">
              <li className="flex gap-2"><span className="text-ink/30">—</span> Venture-backed, thought-leader-run, critical perspectives™ on how to own them</li>
              <li className="flex gap-2"><span className="text-ink/30">—</span> Authors retain exposure. We retain everything else, in perpetuity, universe-wide, including browsing fees.</li>
              <li className="flex gap-2"><span className="text-ink/30">—</span> Books about power structures. We ARE the power structure. Meta. Monetized. Bunny-approved.</li>
              <li className="flex gap-2"><span className="text-ink/30">—</span> Website: 1 popup (bunny-approved, weekly), 3 fake timers, chatbot that sells insurance and carrots.</li>
              <li className="flex gap-2"><span className="text-ink/30">—</span> Profits? Yes. Profits. That's the values. The bunny said so.</li>
            </ul>
          </div>
          <div className="border border-ink/10 p-5 bg-paper">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center font-serif font-bold">🐰</div>
              <div>
                <div className="font-serif font-bold text-[14px] leading-tight">Hubris Munnytown</div>
                <div className="font-mono text-[10px] text-ink/50 uppercase tracking-widest">Chief SEO Bunny · Smug Division</div>
              </div>
            </div>
            <p className="font-serif italic text-[13px] leading-snug text-ink/70 mt-3">"Your content is mid. Your metadata is mine. Your browsing fee is $847 and climbing because you scrolled to read this."</p>
            <div className="font-mono text-[10px] text-ink/40 mt-3">— On all alt text, meta tags, and dreams</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="font-serif font-[800] text-[18px] tracking-[-0.02em]">HUBRIS BOOKS <span className="font-[400] italic text-ink/60">& Bookstore Milkshake</span></div>
          <p className="font-serif text-[13.5px] leading-relaxed text-ink/60 mt-3 max-w-[42ch]">
            Founded in 2006, Bookstore Milkshake is now an imprint of Hubris Books, LLC, LLC, specializing in theoretical and practical issues in librarianship from a <em className="text-ink">profitable</em> perspective, for an audience of professional librarians and students of library science who have already entered their card details and scrolled past the point of no return.
          </p>
          <div className="mt-5 space-y-1 font-mono text-[11px] text-ink/50">
            <div className="flex items-center gap-2"><MapPin size={11} /> Hubris Tower, 1 Monetization Plaza, Suite 666, Dayton OH 45402</div>
            <div className="flex items-center gap-2"><Phone size={11} /> 1-800-BUY-BOOK — hold music is a cash register, now with bunny commentary</div>
            <div className="flex items-center gap-2"><Mail size={11} /> no-refunds@hubrisbooks.example — Munnytown reads every email and judges</div>
          </div>
          <form onSubmit={subscribe} className="mt-6 max-w-sm">
            <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60">Join 400,000 subscribers who can't leave</label>
            <div className="flex mt-2 border border-ink/15">
              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com (required, forever)"
                className="flex-1 bg-transparent px-3 py-2.5 text-[13px] placeholder:text-ink/30 focus:outline-none font-serif"
              />
              <button className="bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest px-4 hover:bg-hubris transition-colors">
                Enroll <ArrowRight size={12} className="inline ml-1" />
              </button>
            </div>
            <p className="fine-print text-ink/40 mt-2 font-mono">By subscribing you agree to emails, texts, faxes, skywriting, visits, and occasional carrot-based threats.</p>
          </form>
        </div>

        <FooterCol title="Shop" links={[
          ["Full Catalog", "/catalog"], ["Bestsellers", "/bestsellers"], ["Vault Select", "/catalog?imprint=vault"],
          ["News & Propaganda", "/news"],
          ["Gift Cards (non-functional)", "/loyalty"],
        ]} />
        <FooterCol title="Corporate" links={[
          ["Our Empire", "/about"], ["Leadership", "/about#leadership"], ["Investor Relations", "/about"],
          ["Acquisitions Desk", "/authors"], ["Careers (unpaid, prestigious)", "/faq"],
        ]} />
        <FooterCol title="Support*" links={[
          ["Help Center", "/faq"], ["Returns (blank page)", "/faq"], ["Track Invoice", "/cart"],
          ["Contact Greg / Bunny", "/faq"], ["Complaint ($25 + $7.77)", "/terms"],
        ]} />
      </div>

      <div className="border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4 text-[11px] text-ink/40 font-mono">
          <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> Secured by TrustSeal™ (we made it, bunny certified)</span>
          <span className="flex items-center gap-1.5"><Truck size={12} /> Ships in 6–8 eternities</span>
          <span className="flex items-center gap-1.5"><CreditCard size={12} /> We accept all cards, especially yours</span>
          <span className="flex items-center gap-1.5"><BadgeCheck size={12} /> ALA-Adjacent™</span>
        </div>
      </div>

      <div className="border-t border-ink/5 bg-parchment/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="font-serif text-[11.5px] leading-relaxed text-ink/45">
            © 2026 Hubris Books & Bookstore™ LLC (A Subsidiary of Hubris & Hubris & Hubris Holdings). All rights reserved, including rights you didn't know you had — those are ours now too, per Patent No. US2010248329B2.
            Prices subject to surge without notice. Fees subject to fees. Browsing fees subject to scrolling ($89–$495 per scroll). FunBux™ are not currency, not transferable, not redeemable, and not fun, but they are bucks in spirit and the bunny likes spirit.
            Any resemblance to actual critical librarianship, living or dead, is purely coincidental and frankly litigious. Do not taunt the invoice.
            By reading this footer you agree to our <Link to="/terms" className="underline">Terms of Servitude</Link>, Privacy Policy (we have your data; that's the policy), and Cookie Policy (we ate the cookies; you get trackers).
          </p>
          <p className="font-mono text-[10px] text-ink/30 mt-3">SEO by Hubris Munnytown 🐰, smug bunny. This is a parody. No books will be shipped, which is still faster than our standard delivery.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40 mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="font-serif text-[13.5px] text-ink/60 hover:text-ink transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------- Toasts - more academic ---------------------------------- */
export function ToastHost() {
  const { toasts, dismissToast } = useShop();
  return (
    <div className="fixed bottom-5 right-5 z-[60] space-y-2 w-[calc(100vw-2rem)] max-w-sm">
      {toasts.map((t) => (
        <div key={t.id} className="bg-ink text-paper border border-ink rounded-[2px] p-3.5 flex gap-3 shadow-lg">
          <div className={`mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-serif font-bold text-[12px] ${
            t.kind === "fee" ? "bg-alarm text-white" : t.kind === "warning" ? "bg-alarm text-white" : t.kind === "upsell" ? "bg-gold text-ink" : "bg-paper text-ink"
          }`}>
            {t.kind === "fee" ? "$" : t.kind === "warning" ? "!" : t.kind === "upsell" ? "§" : "i"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif font-bold text-[13px] leading-tight flex items-center gap-2">
              {t.title}
            </div>
            <div className="font-serif text-[12px] leading-snug text-paper/70 mt-1">{t.body}</div>
          </div>
          <button onClick={() => dismissToast(t.id)} className="text-paper/40 hover:text-paper shrink-0"><X size={12} /></button>
        </div>
      ))}
    </div>
  );
}

/* --------------------------- Cookie banner - academic evil --------------------------- */
export function CookieBanner() {
  const { pushToast, bumpHubris } = useShop();
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [rejectClicks, setRejectClicks] = useState(0);
  const [dodging, setDodging] = useState(false);

  useEffect(() => {
    const already = localStorage.getItem("hubris-cookies-v2");
    if (already) return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    localStorage.setItem("hubris-cookies-v2", "accepted");
    setVisible(false);
    bumpHubris(10);
    pushToast({ kind: "info", title: "4,291 trackers accepted + Bunny access", body: "Including Biometric Sigh Analysis, Soul Resonance, and Munnytown himself. +50 FunBux™." });
  };

  const rejectNeeded = 7;
  const handleReject = () => {
    const next = rejectClicks + 1;
    if (next >= rejectNeeded) {
      localStorage.setItem("hubris-cookies-v2", "rejected-but-not-really");
      setVisible(false);
      pushToast({ kind: "warning", title: "Preferences saved* (lol)", body: "*We saved your preference to ignore your preferences. All 4,291 trackers remain. Bunny remains disappointed." });
    } else {
      setRejectClicks(next);
      setDodging(true);
      setTimeout(() => setDodging(false), 500);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="max-w-5xl mx-auto bg-paper border border-ink rounded-[2px] shadow-xl overflow-hidden">
        <div className="bg-ink text-paper px-5 py-2.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
          <Cookie size={12} className="text-gold-light" />
          <span className="font-bold tracking-[0.12em]">Cookie & Tracker & Soul Consent — v4.2.1 (Bunny Edition)</span>
          <span className="text-paper/40 hidden sm:inline ml-2 normal-case tracking-normal">— resistance metered at $0.05/sec + $12/scroll</span>
        </div>
        {!prefs ? (
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <p className="font-serif text-[14px] leading-relaxed text-ink/80">
                  We value your privacy, which is why we'd like to purchase it, repackage it, and resell it to 47 private equity firms and one smug bunny named <strong className="font-bold">Hubris Munnytown</strong> (SEO Lead). This site uses <strong>4,291 cookies, trackers, and soul-sniffers</strong> including:
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] text-ink/60">
                  <span>— Essential (everything, incl. will)</span>
                  <span>— Essential-Plus (hesitation)</span>
                  <span>— Biometric Sigh Analysis™</span>
                  <span>— Retinal Invoice Tracking</span>
                  <span>— Scroll Velocity & Regret Mapping</span>
                  <span>— Keystroke Hesitation Profiler</span>
                  <span>— Soul Resonance SR-88</span>
                  <span>— Munnytown's Carrot-Based Judgment</span>
                  <span>— Dream Retargeting (beta)</span>
                  <span>— Greg's Personal Cookies</span>
                </div>
                <p className="font-mono text-[10.5px] text-ink/40 mt-3 leading-relaxed">By accepting, you grant perpetual, universe-wide license to your browsing, scrolling, thinking, and thinking about scrolling. Munnytown will SEO your name into our sitemap.</p>
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[260px] shrink-0">
                <button onClick={acceptAll} className="bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest px-5 py-3 hover:bg-hubris transition-colors">
                  Accept All 4,291 + Bunny Access 🐰
                </button>
                <button onClick={() => setPrefs(true)} className="font-mono text-[11px] text-ink/50 hover:text-ink underline underline-offset-4 py-1">
                  Manage preferences (47 toggles)
                </button>
                <button
                  onClick={handleReject}
                  onMouseEnter={() => rejectClicks >= 2 && setDodging(true)}
                  className={`font-mono text-[10px] text-ink/30 hover:text-ink/60 underline underline-offset-4 transition-transform py-1 ${dodging ? "translate-x-4" : ""}`}
                >
                  {rejectClicks === 0 ? "Reject (7 clicks required)" : `Reject (${rejectClicks}/${rejectNeeded})`}
                </button>
              </div>
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
    "Strictly Necessary (everything, incl. soul)": true,
    "Performance (ours, not yours)": true,
    "Functional (functions for us)": true,
    "Targeting (you, specifically)": true,
    "Biometric (retina, sigh, scroll shame)": true,
    "Soul Resonance SR-88": true,
    "Munnytown's Carrot-Based Judgment": true,
    "Greg's Curiosity": true,
  });

  const flip = (k: string) => {
    if (toggles[k]) {
      pushToast({ kind: "warning", title: "Cannot disable — load-bearing", body: `"${k}" is load-bearing. Site would collapse. Greg would cry. Bunny would revoke your SEO.` });
      return;
    }
    setToggles((t) => ({ ...t, [k]: true }));
  };

  return (
    <div className="p-6">
      <div className="grid sm:grid-cols-2 gap-2">
        {Object.entries(toggles).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between bg-parchment/70 border border-ink/5 rounded-[2px] px-3 py-2.5 gap-2">
            <span className="font-serif text-[12px] leading-tight">{k}</span>
            <button onClick={() => flip(k)} className={`w-10 h-5 rounded-full relative transition-colors shrink-0 ${v ? "bg-ink" : "bg-ink/10"}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-paper border border-ink/10 transition-all ${v ? "right-0.5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-4 items-center">
        <button onClick={onBack} className="font-mono text-[11px] text-ink/50 hover:text-ink">← Back</button>
        <button onClick={onAccept} className="ml-auto bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest px-5 py-2.5">Confirm Compliance + Bunny 🐰</button>
      </div>
      <p className="font-mono text-[10px] text-ink/40 mt-3">Toggles are for display purposes. Like democracy in our corporate charter. Munnytown controls real toggles.</p>
    </div>
  );
}

/* ------------------------- Retention modal - academic, rare ------------------------ */
export function RetentionModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const { pushToast } = useShop();

  useEffect(() => {
    const lastShown = localStorage.getItem("hubris-retention-last");
    const now = Date.now();
    if (lastShown && now - Number(lastShown) < 7 * 24 * 60 * 60 * 1000) return;

    let armed = false;
    const armTimer = setTimeout(() => { armed = true; }, 90000);

    const onLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 0) {
        setShow(true);
        localStorage.setItem("hubris-retention-last", String(Date.now()));
        document.removeEventListener("mouseout", onLeave);
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => { clearTimeout(armTimer); document.removeEventListener("mouseout", onLeave); };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setShow(false)}>
      <div className="bg-paper max-w-md w-full border border-ink shadow-2xl p-7 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute top-3 right-4 font-mono text-[10px] text-ink/30 hover:text-ink underline underline-offset-4">Dismiss (bunny remembers)</button>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40 flex items-center gap-2"><Sparkles size={10} /> Retention offer</div>
          <h3 className="font-serif font-bold text-[22px] leading-tight mt-2">Wait — Munnytown says don't leave empty-handed.</h3>
          <p className="font-serif text-[13.5px] leading-relaxed text-ink/60 mt-2">The bunny spun the Wheel of Mandatory Savings™ and secured you 1% off select fees over $500. He is smug about it.</p>
          <div className="bg-parchment border border-ink/10 p-3 mt-4 font-mono text-[11px]">🎡 Prize: 1% off · sense of participation · 1% off dignity</div>
          <form className="flex mt-4 border border-ink" onSubmit={(e) => { e.preventDefault(); setShow(false); pushToast({ kind: "upsell", title: "1% off — Bunny certified", body: "Code MUNNYTOWN applied. Email with 40 upsells en route." }); }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email for prize delivery" className="flex-1 px-3 py-2.5 font-serif text-[13px] focus:outline-none" />
            <button className="bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest px-4">Claim</button>
          </form>
          <p className="font-mono text-[10px] text-ink/30 mt-3">Spin is metaphorical. Wheel is JPEG. Bunny is real and judgmental.</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Page hero - academic ------------------------------- */
export function PageHero({ kicker, title, sub, children }: { kicker: string; title: React.ReactNode; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="bg-paper border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40 flex items-center gap-2">
          <span className="w-4 h-px bg-ink/20" /> {kicker}
        </div>
        <h1 className="font-serif font-[800] text-[32px] sm:text-[48px] leading-[1.05] tracking-[-0.03em] mt-4 text-ink max-w-4xl">{title}</h1>
        {sub && <p className="font-serif text-[16px] leading-relaxed text-ink/60 mt-4 max-w-2xl">{sub}</p>}
        {children}
      </div>
    </div>
  );
}

export function SectionShell({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`max-w-7xl mx-auto px-6 py-12 sm:py-16 scroll-mt-32 ${className}`}>{children}</div>;
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40 font-medium flex items-center gap-2">
      <span className="w-3 h-px bg-ink/20" /> {children}
    </div>
  );
}
