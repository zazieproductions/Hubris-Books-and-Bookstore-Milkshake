import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Menu, X, ChevronDown, Mail, MapPin, Phone, CreditCard,
  ShieldCheck, Truck, Cookie, Bell, Sparkles, ArrowRight, BadgeCheck,
} from "lucide-react";
import { useShop } from "../store/ShopContext";

/* ------------------------------ Promo ticker ------------------------------ */
const TICKER_ITEMS = [
  "FLASH SALE: Prices increased by up to 40% for your excitement — and your browsing fee",
  "New fee just dropped: Scroll Velocity Surcharge ($2.30/pixel/sec — you're paying it now)",
  "Congratulations! You've been pre-approved for upsells and pre-enrolled in fees",
  "Returns are a myth propagated by competing publishers who have feelings",
  "Vanilla Compliance now 12% more compliant, 34% more vanilla-adjacent",
  "Your cart misses you. It has feelings. It has lawyers. It has your browsing history.",
  " Surge pricing is just regular pricing that believes in itself and your credit limit ",
  "ALA-ADJACENT™: legally distinct from endorsement, morally distinct from everything",
  "Hubris Munnytown (SEO Bunny) is watching you scroll — that's $12 per scroll",
  "Browsing fee now $847 and climbing — keep scrolling, we dare you",
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
  { to: "/catalog", label: "Catalog", sub: "27 titles, 400 fees" },
  { to: "/bestsellers", label: "Bestsellers", sub: "ranked by revenue" },
  { to: "/news", label: "News", sub: "press releases, all lies" },
  { to: "/authors", label: "For Authors", sub: "pay to publish" },
  { to: "/loyalty", label: "FunBux™", sub: "points, not money" },
  { to: "/about", label: "Our Empire", sub: "47 PE firms + 1 bunny" },
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
      const t = setTimeout(() => setPulse(false), 300);
      prevFeeRef.current = browsingFee;
      return () => clearTimeout(t);
    }
    prevFeeRef.current = browsingFee;
  }, [browsingFee]);

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
                <span className="ml-2 font-mono text-[9px] bg-gold text-hubris px-1.5 py-0.5 rounded">CORPORATE SYNERGY DIV.</span>
              </div>
              <div className="font-mono text-[10px] text-gold-light/80 uppercase tracking-widest hidden sm:block">
                Venture-backed, thought-leader-run, critical perspectives™ on how to own them — est. 2006, regretted daily
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px]">
            <div className={`bg-hubris-light border rounded px-2 py-1 text-gold-light transition-all ${pulse ? "border-alarm bg-alarm/20 scale-105" : "border-gold/40"}`} title="Scrolling makes it go up. Stop scrolling? Can't. We track that too.">
              ⏱ Browsing fee: <span className={`font-semibold ${pulse ? "text-alarm" : "text-white"}`}>${browsingFee.toFixed(2)}</span>
              <span className="ml-1 text-[9px] text-alarm animate-blink-hard">↑ ${scrollFee.toFixed(0)} scroll surcharge</span>
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
            <div className={`font-mono text-[10px] bg-black/30 border px-2 py-1 rounded ${pulse ? "border-alarm text-alarm" : "border-gold/30 text-gold-light"}`}>
              ${browsingFee.toFixed(0)}
            </div>
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
            <div className="px-3 py-2.5 self-center hidden xl:flex items-center gap-2 font-mono text-[10px] text-gold-light/70">
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm">🐰</span>
              Hubris Munnytown, SEO
            </div>
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
          <div className="font-mono text-[11px] text-gold-light px-3 pt-2 border-t border-white/10 mt-2">
            ⏱ Browsing fee so far: <span className="text-alarm font-bold">${browsingFee.toFixed(2)}</span> · Scroll: ${scrollFee.toFixed(0)} · ★ FunBux™: {loyaltyPoints.toLocaleString()}
            <div className="text-[9px] text-paper/50 mt-1">Scrolling adds $89–$495 per scroll. You're scrolling right now.</div>
          </div>
          <div className="flex items-center gap-2 px-3 pt-2 font-mono text-[10px] text-paper/50">
            <span>🐰</span> Hubris Munnytown is tracking your hesitation. Fee: $7.77
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
      pushToast({ kind: "warning", title: "Invalid email", body: "That doesn't look like an email. We've subscribed you anyway, out of spite. Hubris Munnytown will email you personally." });
      return;
    }
    bumpHubris(5);
    pushToast({ kind: "info", title: "Subscribed to 14 lists + 1 bunny!", body: "Daily Deals, Hourly Deals, Minutely Deals, Greg's Newsletter, Invoice Alerts, Hubris Munnytown's Carrot Reviews, and 9 more. Unsubscribe links are decorative and tracked ($2.49 per click)." });
    setEmail("");
  };

  return (
    <footer className="bg-ink text-paper mt-0">
      <div className="bg-alarm text-white py-2 px-4 text-center font-mono text-xs">
        <span className="animate-blink-hard font-bold">● REC</span> — This footer is being recorded for quality assurance and upsell optimization. Hubris Munnytown is taking notes. Notes cost $3.75 each.
      </div>

      {/* Corporate synergy division block */}
      <div className="bg-hubris border-y border-gold/30">
        <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="font-serif font-black text-2xl flex items-center gap-2">
              HUBRIS BOOKS™ <span className="text-gold">(CORPORATE SYNERGY DIVISION)</span>
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-paper/70">
              <li>• Venture-backed, thought-leader-run, critical perspectives™ on how to own them</li>
              <li>• Authors retain exposure. We retain everything else, in perpetuity, universe-wide.</li>
              <li>• Books about power structures. We ARE the power structure. Meta!</li>
              <li>• Website has 14 popups, 3 fake timers, and a chatbot that sells insurance (Hubris Munnytown wrote it)</li>
              <li>• Profits? Yes. Profits. That's the values. The bunny said so.</li>
            </ul>
          </div>
          <div className="bg-black/30 rounded-lg p-4 border border-gold/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl">🐰</div>
              <div>
                <div className="font-serif font-bold">Hubris Munnytown</div>
                <div className="font-mono text-[10px] text-gold-light uppercase">Chief SEO Bunny · Smug Division</div>
              </div>
            </div>
            <p className="text-xs text-paper/60 mt-2 italic">"Your content is mid. Your metadata is mine. Your browsing fee is $847 and climbing because you scrolled to read this. Pay up, human."</p>
            <div className="font-mono text-[10px] text-paper/40 mt-2">— Hubris Munnytown, on all our alt text, meta tags, and dreams</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="font-serif font-black text-2xl">HUBRIS BOOKS <span className="text-gold">&</span> <span className="italic text-shake">Bookstore Milkshake</span></div>
          <p className="text-sm text-paper/60 mt-3 max-w-sm">
            Founded in 2006, Bookstore Milkshake is now an imprint of Hubris Books, LLC, LLC, specializing in theoretical and practical issues in librarianship from a <em className="text-gold-light">profitable</em> perspective, for an audience of professional librarians and students of library science who have already entered their card details and scrolled past the point of no return.
          </p>
          <div className="mt-4 space-y-1.5 font-mono text-xs text-paper/60">
            <div className="flex items-center gap-2"><MapPin size={12} /> Hubris Tower, 1 Monetization Plaza, Suite 666, Dayton OH 45402</div>
            <div className="flex items-center gap-2"><Phone size={12} /> 1-800-BUY-BOOK (1-800-289-2665) — hold music is just a cash register, now with bunny commentary</div>
            <div className="flex items-center gap-2"><Mail size={12} /> no-refunds@hubrisbooks.example — Hubris Munnytown reads every email and judges</div>
          </div>
          <form onSubmit={subscribe} className="mt-5">
            <label className="font-mono text-[11px] uppercase tracking-widest text-gold-light">Join 400,000 subscribers who can't leave (the bunny won't let them)</label>
            <div className="flex mt-2 max-w-sm">
              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com (required, forever, tracked by bunny)"
                className="flex-1 bg-white/10 border border-gold/40 rounded-l px-3 py-2 text-sm placeholder:text-paper/30 focus:outline-none focus:border-gold"
              />
              <button className="bg-gold hover:bg-gold-light text-ink font-bold px-4 rounded-r text-sm flex items-center gap-1">
                Enroll <ArrowRight size={14} />
              </button>
            </div>
            <p className="fine-print text-paper/40 mt-1">By subscribing you agree to receive emails, texts, faxes, skywriting, visits, and occasional carrot-based threats from Hubris Munnytown.</p>
          </form>
        </div>

        <FooterCol title="Shop" links={[
          ["Full Catalog (27 titles, 15 fees each)", "/catalog"], ["Bestsellers (ranked by revenue)", "/bestsellers"], ["The Vault Select (scarcity manufactured)", "/catalog?imprint=vault"],
          ["News & Propaganda", "/news"],
          ["Gift Cards (non-refundable, non-transferable, non-functional)", "/loyalty"], ["Bulk Orders (mandatory over 1 copy)", "/cart"],
        ]} />
        <FooterCol title="Corporate" links={[
          ["Our Empire", "/about"], ["Leadership (all named Greg + 1 bunny)", "/about#leadership"], ["Investor Relations (revenue up!)", "/about"],
          ["Acquisitions Desk (bring money)", "/authors"], ["Careers (unpaid, prestigious, bunny-supervised)", "/faq"],
        ]} />
        <FooterCol title="Support*" links={[
          ["Help Center (lol)", "/faq"], ["Returns (page intentionally blank, bunny ate it)", "/faq"], ["Track Your Invoice (it tracks you)", "/cart"],
          ["Contact Greg / Bunny", "/faq"], ["File a Complaint (a $25 service + $7.77 bunny fee)", "/terms"],
        ]} />
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3 text-xs text-paper/50">
          <span className="flex items-center gap-1"><ShieldCheck size={13} /> Secured by TrustSeal™ (we made it, bunny certified)</span>
          <span className="flex items-center gap-1"><Truck size={13} /> Ships in 6–8 eternities via Glacial Post™</span>
          <span className="flex items-center gap-1"><CreditCard size={13} /> We accept all cards, especially yours, especially now</span>
          <span className="flex items-center gap-1"><BadgeCheck size={13} /> ALA-Adjacent™ & Bunny-Approved™</span>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="fine-print text-paper/40 leading-relaxed">
            © 2026 Hubris Books & Bookstore™ LLC (A Subsidiary of Hubris & Hubris & Hubris Holdings). All rights reserved, including rights you didn't know you had — those are ours now too, per Patent No. US2010248329B2.
            Prices subject to surge without notice. Fees subject to fees. Browsing fees subject to scrolling, which you are doing right now ($847 and climbing). FunBux™ are not currency, not transferable, not redeemable, and not fun, but they are bucks in spirit and the bunny likes spirit.
            Any resemblance to actual critical librarianship, living or dead, is purely coincidental and frankly litigious. Do not taunt the invoice. Do not feed the bunny after midnight (he'll SEO you).
            By reading this footer you agree to our <Link to="/terms" className="underline text-gold-light/60">Terms of Servitude</Link>, our Privacy Policy (we have your data; that's the policy; the bunny has your search history), and our Cookie Policy (we ate the cookies; you get trackers; bunny gets carrots).
            Hubris Tower is a smoke-free facility. Vaping is permitted if you purchase the Vaping License ($19.99) and the Bunny Air Quality Surcharge ($4.20).
          </p>
          <p className="font-mono text-[10px] text-paper/30 mt-2">*Support is a concept, not a department. SEO by Hubris Munnytown 🐰, a smug bunny with a superiority complex and your browsing data. This is a parody site. No actual books will be shipped, which is still faster than our standard delivery and cheaper than your current browsing fee.</p>
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
    pushToast({ kind: "info", title: "4,291 trackers accepted! + Bunny Access Granted!", body: "Including 12 that just watch, 8 that judge, and Hubris Munnytown himself, who now knows your soul, your scroll depth, and your mother's maiden name. +50 FunBux™ for your compliance. Carrots deducted." });
  };

  const rejectNeeded = 7;
  const handleReject = () => {
    const next = rejectClicks + 1;
    if (next >= rejectNeeded) {
      localStorage.setItem("hubris-cookies-v2", "rejected-but-not-really");
      setVisible(false);
      pushToast({ kind: "warning", title: "Preferences saved* (lol)", body: "*We saved your preference to ignore your preferences. Essential trackers (all 4,291 of them) remain. Bunny access remains. Soul remains collateral. Hubris Munnytown is disappointed in you." });
    } else {
      setRejectClicks(next);
      setDodging(true);
      setTimeout(() => setDodging(false), 600);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="max-w-5xl mx-auto bg-paper border-4 border-hubris rounded-xl shadow-[8px_8px_0_rgba(15,30,61,1)] overflow-hidden">
        <div className="bg-hubris text-paper px-4 py-2 flex items-center gap-2 font-mono text-xs">
          <Cookie size={14} className="text-gold" />
          <span className="font-bold">COOKIE & TRACKER & SOUL CONSENT v4.2.1 (BUNNY EDITION)</span>
          <span className="text-paper/50 hidden sm:inline">— resistance is metered at $0.05/second + $12/scroll + bunny judgment (free, but painful)</span>
        </div>
        {!prefs ? (
          <div className="p-4">
            <div className="flex flex-col lg:flex-row items-start gap-4">
              <div className="flex-1">
                <p className="text-sm leading-relaxed">
                  We value your privacy, which is why we'd like to purchase it, repackage it, and resell it to 47 private equity firms and one (1) smug bunny named <strong>Hubris Munnytown</strong> (our SEO lead). This site uses <strong>4,291 cookies, trackers, and soul-sniffers</strong> including:
                </p>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-mono">
                  <span>• Essential (everything, including your will)</span>
                  <span>• Essential-Plus (your hesitation)</span>
                  <span>• Emotionally Essential (your sighs)</span>
                  <span>• Biometric Sigh Analysis™</span>
                  <span>• Retinal Invoice Tracking</span>
                  <span>• Scroll Velocity & Regret Mapping</span>
                  <span>• Keystroke Hesitation Profiler</span>
                  <span>• Dream Retargeting (beta, you dreamt about us)</span>
                  <span>• Soul Resonance Frequency (SR-88)</span>
                  <span>• Hubris Munnytown's Carrot-Based Judgment</span>
                  <span>• Mouse Cursor Shame Analysis</span>
                  <span>• Greg's Personal Cookies (he baked them, he watches you eat them)</span>
                </div>
                <p className="fine-print text-ink/60 mt-2">By clicking ACCEPT ALL, you grant us a perpetual, universe-wide license to your browsing, scrolling, thinking, and thinking about scrolling. Hubris Munnytown will SEO your name into our sitemap. Fun!</p>
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-auto shrink-0">
                <button onClick={acceptAll} className="bg-mint text-white font-black px-6 py-3 rounded-lg text-sm hover:brightness-110 animate-pulse-ring whitespace-nowrap">
                  ACCEPT ALL 4,291 ✓ + BUNNY ACCESS 🐰
                </button>
                <button onClick={() => setPrefs(true)} className="text-xs underline text-hubris/60 hover:text-hubris px-2 py-1 text-center">
                  manage preferences (47 toggles, all load-bearing)
                </button>
                <button
                  onClick={handleReject}
                  onMouseEnter={() => rejectClicks >= 2 && setDodging(true)}
                  className={`fine-print text-hubris/40 hover:text-hubris/70 underline transition-transform text-center py-1 ${dodging ? "translate-x-6 -rotate-3" : ""}`}
                >
                  {rejectClicks === 0 ? "reject (requires 7 clicks, bunny will be sad)" : `reject (${rejectClicks}/${rejectNeeded} — keep going! bunny is watching)`}
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
    "Strictly Necessary (everything, including your soul)": true,
    "Performance (ours, not yours — your performance is tracked separately)": true,
    "Functional (functions for us, dysfunction for you)": true,
    "Targeting (you, specifically, by name, we know your name)": true,
    "Biometric (retina, sigh, scroll shame)": true,
    "Soul Resonance (SR-88, universe-wide license)": true,
    "Hubris Munnytown's Carrot-Based Judgment (non-optional, bunny law)": true,
    "Greg's Curiosity (Greg is curious about your browsing fee)": true,
  });

  const flip = (k: string) => {
    if (toggles[k]) {
      pushToast({ kind: "warning", title: "Cannot disable — load-bearing surveillance", body: `"${k}" is load-bearing. The site would collapse. Greg would cry. Hubris Munnytown would revoke your SEO. Your browsing fee would increase out of spite.` });
      return;
    }
    setToggles((t) => ({ ...t, [k]: true }));
  };

  return (
    <div className="p-4">
      <div className="grid sm:grid-cols-2 gap-2">
        {Object.entries(toggles).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between bg-parchment rounded px-3 py-2 gap-2">
            <span className="text-[11px] font-medium leading-tight">{k}</span>
            <button
              onClick={() => flip(k)}
              className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${v ? "bg-mint" : "bg-gray-300"}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${v ? "right-1" : "left-1"}`} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={onBack} className="text-xs underline text-hubris/60 px-2">← back to 4,291 trackers</button>
        <button onClick={onAccept} className="ml-auto bg-mint text-white font-black px-6 py-2 rounded-lg text-sm">CONFIRM MY COMPLIANCE + BUNNY ACCESS 🐰</button>
      </div>
      <p className="fine-print text-ink/50 mt-2">Note: the toggles above are for display purposes. Like democracy in our corporate charter, like free will in our terms. Hubris Munnytown controls the real toggles. He likes carrots and your data.</p>
    </div>
  );
}

/* ------------------------- Exit-intent / time modal ------------------------ */
// Dramatically reduced frequency: once per 7 days via localStorage, only on exit intent after 90s
export function RetentionModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const { pushToast } = useShop();

  useEffect(() => {
    const lastShown = localStorage.getItem("hubris-retention-last");
    const now = Date.now();
    if (lastShown && now - Number(lastShown) < 7 * 24 * 60 * 60 * 1000) return; // 7 days

    let armed = false;
    const armTimer = setTimeout(() => { armed = true; }, 90000); // 90s before it can trigger

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
    <div className="fixed inset-0 z-50 bg-hubris/80 flex items-center justify-center p-4" onClick={() => setShow(false)}>
      <div className="bg-paper max-w-md w-full rounded-xl border-4 border-gold shadow-2xl p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute top-2 right-3 text-ink/30 hover:text-ink text-xs underline">no thanks, I hate saving* (bunny will remember)</button>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-gold" size={24} />
            <span className="text-xl">🐰</span>
          </div>
          <h3 className="font-serif font-black text-2xl mt-2">WAIT! Hubris Munnytown says don't go empty-handed!</h3>
          <p className="text-sm mt-2">The bunny spun the <strong>Wheel of Mandatory Savings™</strong> for you and won <strong>1% off select fees!</strong> He is smug about it.</p>
          <div className="bg-hubris text-gold-light font-mono text-sm rounded-lg p-3 mt-4">
            🎡 Bunny's prize: 1% off fees over $500 · a sense of participation · 1% off your dignity
          </div>
          <form className="flex mt-4" onSubmit={(e) => { e.preventDefault(); setShow(false); pushToast({ kind: "upsell", title: "You won: 1% off! (Bunny certified)", body: "Code MUNNYTOWN applied to fees over $500. An email with 40 upsells and a carrot recipe is on its way. The bunny is still smug." }); }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email for prize delivery (bunny will SEO it)" className="flex-1 border-2 border-hubris rounded-l px-3 py-2 text-sm" />
            <button className="bg-alarm text-white font-bold px-4 rounded-r text-sm">SPIN* 🐰</button>
          </form>
          <p className="fine-print text-ink/40 mt-2">*Spin is metaphorical. The wheel is a JPEG. The bunny is real and judgmental. Prizes are final and also imaginary, like your browsing fee being reasonable.</p>
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
