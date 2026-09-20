import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Menu, X, ChevronDown, Mail, MapPin, Phone, CreditCard,
  ShieldCheck, Truck, Cookie, Bell, Sparkles, ArrowRight, BadgeCheck, Eye,
} from "lucide-react";
import { useShop } from "../store/ShopContext";
import { formatMoney } from "../lib/money";
import { FOOTER_LEGAL, SYNERGY_DIVISION } from "../data/books";
import { CONSENT_RECEIPT_LINES, COOKIE_BANNER_ROTATIONS, TRACKER_CATEGORIES, TRACKER_TOTAL } from "../data/consent";
import { SmugBunny } from "./Bunny";

/* ------------------------------ Promo ticker ------------------------------ */
const TICKER_ITEMS = [
  "NEW: the Browsing Fee is now scroll-metered — every scroll adds hundreds of dollars, and you have scrolled",
  "Tuesday has been acquired. Use of Tuesday incurs a Day Usage Surcharge of $4.00",
  "Critical Librarianship™ is a patent, not a book. Royalties due upon thinking critically about us",
  "All editions conclude at page 199 with a courteous note. Pages 200+ are a different product ($41.00)",
  "Footnotes removed at press for performance reasons. Restore them for $18.50",
  "Hubris Munnytown, Chief Executive Rabbit, has approved the Q4 escalator",
  "Greg was demoted to chatbot. Greg sells insurance now. Greg remembers",
  "Returns are a myth propagated by competing publishers (both of which we own)",
  "Authors retain exposure. We retain everything else, in perpetuity, universe-wide",
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

/* ------------------------------ Browsing meter ----------------------------- */
export function BrowsingMeter({ compact = false }: { compact?: boolean }) {
  const { browsingFee, feeJumps, escalation, scrollCharges } = useShop();
  const [spike, setSpike] = useState(false);
  const prev = useRef(browsingFee);

  useEffect(() => {
    if (browsingFee - prev.current > 50) {
      setSpike(true);
      const t = setTimeout(() => setSpike(false), 420);
      prev.current = browsingFee;
      return () => clearTimeout(t);
    }
    prev.current = browsingFee;
  }, [browsingFee]);

  return (
    <div
      className={`relative bg-hubris-light border rounded px-2 py-1 font-mono text-[11px] transition-all ${
        spike ? "border-alarm text-white scale-[1.04]" : "border-gold/40 text-gold-light"
      }`}
      title="Scroll to increase. Not scrolling also increases it, slowly. The meter does not go down."
    >
      ⏱ Browsing fee:{" "}
      <span className={`font-bold tabular-nums ${spike ? "text-alarm" : "text-white"}`}>${formatMoney(browsingFee)}</span>
      {!compact && (
        <>
          <span className="text-paper/40"> · ×{escalation} escalator</span>
          <span className="hidden xl:inline text-paper/40"> · {scrollCharges} scroll charges</span>
        </>
      )}
      <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center">
        {feeJumps.map((j) => (
          <span key={j.id} className="whitespace-nowrap font-mono text-[11px] font-black text-alarm animate-fee-pop drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
            +${j.amount.toLocaleString()}
          </span>
        ))}
      </span>
    </div>
  );
}

/* --------------------------------- Header ---------------------------------- */
const NAV = [
  { to: "/catalog", label: "Catalog", sub: "26 titles, 412 fees" },
  { to: "/bestsellers", label: "Bestsellers", sub: "chosen by revenue" },
  { to: "/news", label: "Newsroom", sub: "4,812 releases" },
  { to: "/authors", label: "For Authors", sub: "pay to publish" },
  { to: "/loyalty", label: "FunBux™", sub: "points, not money" },
  { to: "/about", label: "Our Empire", sub: "47 PE firms, 1 rabbit" },
];

export function Header() {
  const { cartCount, loyaltyPoints, grandTotal } = useShop();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-hubris text-paper border-b-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg bg-paper flex items-center justify-center relative shrink-0 border-2 border-gold group-hover:rotate-6 transition-transform overflow-visible">
              <SmugBunny size={34} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-alarm rounded-full text-[9px] flex items-center justify-center text-white font-bold">$</span>
            </div>
            <div className="leading-tight">
              <div className="font-serif font-black text-lg sm:text-xl tracking-tight">
                HUBRIS BOOKS <span className="text-gold">&</span> BOOKSTORE<span className="align-super text-[10px] text-gold">™</span>
              </div>
              <div className="font-mono text-[10px] text-gold-light/80 uppercase tracking-widest hidden sm:block">
                A subsidiary of Hubris & Hubris & Hubris Holdings — CEO: Hubris Munnytown (a rabbit)
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px]">
            <BrowsingMeter />
            <div className="bg-hubris-light border border-gold/40 rounded px-2 py-1 text-gold-light">
              ★ FunBux™: <span className="text-white font-semibold">{loyaltyPoints.toLocaleString()}</span>
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-2 bg-gold hover:bg-gold-light text-hubris font-bold rounded px-3 py-2 transition-colors"
            >
              <ShoppingCart size={16} />
              <span className="hidden xl:inline">Cart (${formatMoney(grandTotal)})</span>
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
              <Link key={n.to} to={n.to} className="group px-4 py-2.5 border-r border-white/10 first:border-l hover:bg-hubris-light transition-colors">
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

        {/* mobile meter strip — the fee should be impossible to miss on a phone */}
        <div className="lg:hidden border-t border-white/10 px-3 py-1.5 flex items-center gap-2">
          <BrowsingMeter compact />
          <span className="font-mono text-[9px] text-paper/40 ml-auto uppercase tracking-wider">scroll = money</span>
        </div>
      </div>

      {/* mobile nav */}
      {open && (
        <div className="lg:hidden bg-hubris-light border-b-4 border-gold px-4 py-3 space-y-1">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded text-paper font-semibold hover:bg-hubris">
              {n.label} <span className="font-mono text-[10px] text-gold/70 ml-1">{n.sub}</span>
            </Link>
          ))}
          <div className="font-mono text-[11px] text-gold-light px-3 pt-2 space-y-1">
            <BrowsingMeter compact />
            <div>★ FunBux™: {loyaltyPoints.toLocaleString()}</div>
          </div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- Footer ---------------------------------- */
export function Footer() {
  const { pushToast, bumpHubris, consent, revokeConsent, setCookieOpen } = useShop();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      pushToast({ kind: "warning", title: "Invalid email", body: "That doesn't look like an email. We've subscribed you anyway, out of spite." });
      return;
    }
    bumpHubris(5);
    pushToast({ kind: "info", title: "Subscribed to 14 lists!", body: "Daily Deals, Hourly Deals, Minutely Deals, The Wire, Invoice Alerts, and 9 more. Unsubscribe links are decorative." });
    setEmail("");
  };

  const consentLabel = consent.mode === "accepted"
    ? `Consent: ${consent.trackers.toLocaleString()} trackers, granted ${consent.at ? new Date(consent.at).toLocaleDateString() : "recently"} — perpetual, hereditary, universe-wide`
    : consent.mode === "rejected"
      ? "Consent: declined (7 clicks, $49.99 processing fee, essential trackers retained)"
      : "Consent: pending. The pending state is itself a tracker.";

  return (
    <footer className="bg-ink text-paper mt-0">
      <div className="bg-alarm text-white py-2 px-4 text-center font-mono text-xs">
        <span className="animate-blink-hard font-bold">● REC</span> — This footer is being recorded for quality assurance and upsell optimization.
      </div>

      {/* Corporate Synergy Division */}
      <div className="border-b border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-light flex items-center gap-2">
            <BadgeCheck size={12} /> {SYNERGY_DIVISION.heading}
          </div>
          <ul className="mt-3 grid md:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-paper/70">
            {SYNERGY_DIVISION.bullets.map((b) => (
              <li key={b} className="flex gap-2"><span className="text-gold">•</span> {b}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-lg bg-paper border-2 border-gold flex items-center justify-center shrink-0">
              <SmugBunny size={34} />
            </span>
            <div className="font-serif font-black text-2xl leading-none">HUBRIS BOOKS <span className="text-gold">&</span> BOOKSTORE™</div>
          </div>
          <p className="text-sm text-paper/60 mt-3 max-w-sm">
            Founded in 2006 by idealists who were bought out by lunch. We publish theoretical and practical issues in
            librarianship from a <em className="text-gold-light">profitable</em> perspective, for an audience of professional
            librarians and students of library science who have already entered their card details.
          </p>
          <div className="mt-4 space-y-1.5 font-mono text-xs text-paper/60">
            <div className="flex items-center gap-2"><MapPin size={12} /> Hubris Tower, 1 Monetization Plaza, Suite 666, Dayton OH (89 of 90 floors are gift shops)</div>
            <div className="flex items-center gap-2"><Phone size={12} /> 1-800-BUY-BOOK (1-800-289-2665) — hold music is a cash register and, faintly, Greg</div>
            <div className="flex items-center gap-2"><Mail size={12} /> no-refunds@hubrisbooks.example</div>
            <div className="flex items-center gap-2"><Eye size={12} /> Media inquiries: Vireo Pressrelease, Director of Announcements</div>
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
          ["Full Catalog", "/catalog"], ["Bestsellers", "/bestsellers"], ["The Vault Select", "/catalog?imprint=vault"],
          ["Frequently Required Together", "/book/critical-librarianship-patent"], ["Bulk Orders (mandatory over 1 copy)", "/cart"],
        ]} />
        <FooterCol title="Newsroom" links={[
          ["The Synergy Wire", "/news"], ["From the CEO's Desk", "/news?cat=ceo"], ["Press Releases (Mandatory)", "/news?cat=press"],
          ["Awards & Contests", "/news?cat=awards"], ["Corrections & Retractions", "/news?cat=corrections"],
        ]} />
        <FooterCol title="Corporate" links={[
          ["Our Empire", "/about"], ["Leadership (one rabbit, many Gregs)", "/about#leadership"], ["Investor Relations", "/news?cat=financials"],
          ["Acquisitions Desk", "/authors"], ["Careers (unpaid, prestigious)", "/faq"],
        ]} />
        <FooterCol title="Support*" links={[
          ["Help Center (lol)", "/faq"], ["Returns (page intentionally blank)", "/faq"], ["Track Your Invoice", "/cart"],
          ["Chat with Greg (sells insurance)", "/faq"], ["File a Complaint (a $25 service)", "/terms"],
        ]} />
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-3 text-xs text-paper/50">
          <span className="flex items-center gap-1"><ShieldCheck size={13} /> Secured by TrustSeal™ (we made it)</span>
          <span className="flex items-center gap-1"><Truck size={13} /> Ships in 6–8 eternities</span>
          <span className="flex items-center gap-1"><CreditCard size={13} /> We accept all cards, especially yours</span>
          <span className="flex items-center gap-1"><BadgeCheck size={13} /> ALA-Adjacent™</span>
          <span className="flex items-center gap-1"><Cookie size={13} /> {TRACKER_TOTAL.toLocaleString()} trackers in force</span>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-mono text-[10px] text-paper/40">{consentLabel}</span>
            <button
              onClick={() => { revokeConsent(); pushToast({ kind: "warning", title: "Consent revoked (Form 88-B)", body: "Revocation filed. Form 88-B does not exist. The $25 filing fee, however, is very real. The banner has been re-armed, because you asked for it." }); }}
              className="font-mono text-[10px] text-gold-light/60 underline hover:text-gold-light"
            >
              revoke consent ($25 filing fee)
            </button>
            {consent.mode && (
              <button onClick={() => setCookieOpen(true)} className="font-mono text-[10px] text-gold-light/60 underline hover:text-gold-light">
                view your consent receipt
              </button>
            )}
          </div>
          <p className="fine-print text-paper/40 leading-relaxed">
            {FOOTER_LEGAL}
          </p>
          <p className="fine-print text-paper/30 leading-relaxed mt-2">
            Prices subject to surge without notice. Fees subject to fees. The Browsing Fee is scroll-metered and does not
            decrease. FunBux™ are not currency, not transferable, not redeemable, and not fun, but they are bucks in spirit.
            All editions conclude at page 199 with a courteous note; pages 200 and above are a different product.
            By reading this footer you agree to our <Link to="/terms" className="underline text-gold-light/60">Terms of Servitude</Link>,
            our Privacy Policy (we have your data; that's the policy), and our Cookie Policy ({TRACKER_TOTAL.toLocaleString()} items, itemized on request, request costs $12).
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
            t.kind === "fee" ? "bg-alarm" : t.kind === "warning" ? "bg-alarm" : t.kind === "upsell" ? "bg-gold text-hubris" : "bg-gold text-hubris"
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
  const { pushToast, bumpHubris, consent, setConsent, cookieOpen, setCookieOpen } = useShop();
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [rejectClicks, setRejectClicks] = useState(0);
  const [dodging, setDodging] = useState(false);
  const [rotation] = useState(() => COOKIE_BANNER_ROTATIONS[Math.floor(Math.random() * COOKIE_BANNER_ROTATIONS.length)]);
  const [grown, setGrown] = useState(0);

  // The banner arrives once. It is stored. It does not come back, because you
  // already agreed, and because agreeing is perpetual, hereditary, universe-wide.
  useEffect(() => {
    if (consent.mode) return;
    const t = setTimeout(() => {
      setVisible(true);
      setCookieOpen(true);
    }, 2200);
    return () => clearTimeout(t);
  }, [consent.mode, setCookieOpen]);

  // While you deliberate, more trackers are provisioned. This is disclosed here,
  // which our counsel advises makes it fine.
  useEffect(() => {
    if (!visible || prefs) return;
    const t = setInterval(() => setGrown((g) => g + 1 + Math.floor(Math.random() * 3)), 2500);
    return () => clearInterval(t);
  }, [visible, prefs]);

  const receiptOpen = cookieOpen && consent.mode !== null;
  const shown = visible || receiptOpen || (cookieOpen && consent.mode === null);

  const finish = (mode: "accepted" | "rejected", trackers: number) => {
    setVisible(false);
    setCookieOpen(false);
    setPrefs(false);
    setConsent(mode, trackers);
  };

  const acceptAll = () => {
    const trackers = TRACKER_TOTAL + grown;
    bumpHubris(10);
    finish("accepted", trackers);
    pushToast({
      kind: "info",
      title: `${trackers.toLocaleString()} trackers accepted!`,
      body: `${CONSENT_RECEIPT_LINES[0]} ${CONSENT_RECEIPT_LINES[1]} +50 FunBux™ for your compliance.`,
    });
  };

  const rejectNeeded = 7;
  const handleReject = () => {
    const next = rejectClicks + 1;
    if (next >= rejectNeeded) {
      finish("rejected", TRACKER_CATEGORIES.find((c) => c.id === "necessary")!.count);
      pushToast({
        kind: "warning",
        title: "Preferences saved* · $49.99 Opt-Out Processing Fee applied",
        body: "*We saved your preference to ignore your preferences. All 4,112 \"Strictly Necessary\" trackers remain, because they are the site. Greg remembers this.",
      });
    } else {
      setRejectClicks(next);
      setDodging(true);
      setTimeout(() => setDodging(false), 600);
      if (next === 3) pushToast({ kind: "fee", title: "Resistance metered", body: "Three declines logged. Resistance is billed at $0.05/second and you are now at second 9." });
    }
  };

  if (!shown && !receiptOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto bg-paper border-4 border-hubris rounded-xl shadow-[8px_8px_0_rgba(15,30,61,1)] overflow-hidden max-h-[80vh] flex flex-col">
        <div className="bg-hubris text-paper px-4 py-2 flex items-center gap-2 font-mono text-xs shrink-0">
          <Cookie size={14} className="text-gold" />
          <span className="font-bold">COOKIE, TRACKER & SOUL CONSENT</span>
          <span className="text-paper/50 hidden sm:inline">— v4,812 · resistance metered at $0.05/second</span>
          <SmugBunny size={20} className="ml-auto shrink-0" monocle bowTie={false} />
        </div>

        {receiptOpen ? (
          <ConsentReceipt onClose={() => setCookieOpen(false)} />
        ) : prefs ? (
          <div className="overflow-y-auto scrollbar-thin">
            <PrefsPanel onBack={() => setPrefs(false)} onAccept={acceptAll} grown={grown} />
          </div>
        ) : (
          <div className="p-4 overflow-y-auto scrollbar-thin">
            <p className="text-sm">
              <strong>{rotation}</strong> This site currently deploys{" "}
              <strong className="text-alarm">{(TRACKER_TOTAL + grown).toLocaleString()} cookies</strong> across{" "}
              {TRACKER_CATEGORIES.length} categories, including <em>Strictly Necessary (Everything)</em>,{" "}
              <em>Predictive Regret Modeling</em>, <em>Subconscious Retargeting (Dream Ads)</em>,{" "}
              <em>Organ Donor Adjacency</em>, and <em>Munnytown's Personal Sniffing Cookies</em>.
            </p>
            <div className="mt-3 grid sm:grid-cols-2 gap-1.5">
              {TRACKER_CATEGORIES.slice(0, 8).map((c) => (
                <div key={c.id} className="bg-parchment border border-hubris/15 rounded px-2.5 py-1.5 text-[11px] leading-snug">
                  <span className="font-bold">{c.name}</span>
                  <span className="font-mono text-alarm"> · {c.count.toLocaleString()}</span>
                  <div className="text-ink/55">{c.what}</div>
                </div>
              ))}
              <div className="bg-hubris text-paper rounded px-2.5 py-1.5 text-[11px] leading-snug">
                <span className="font-bold">+ {TRACKER_CATEGORIES.length - 8} more categories</span>
                <div className="text-paper/60">Itemized in the preferences panel, which does not let you change anything.</div>
              </div>
            </div>
            <p className="fine-print text-ink/50 mt-3">
              Consent is perpetual, irrevocable, hereditary, and universe-wide, and extends to your household, your tenants,
              your pets, your future address, and anyone who has ever used your WiFi. We share your data with our 47 parent
              companies, three ad exchanges, your employer's HR department, and one rabbit, personally. Opting out is a
              product ($49.99 processing fee, plus per-category fees listed in the panel).
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
              <button onClick={acceptAll} className="bg-mint text-white font-bold px-6 py-3 rounded-lg text-sm hover:brightness-110 animate-pulse-ring whitespace-nowrap">
                ACCEPT ALL & BE KNOWN ✓
              </button>
              <button onClick={() => setPrefs(true)} className="border-2 border-hubris/30 text-xs font-semibold text-hubris hover:border-hubris px-3 py-2 rounded-lg">
                Manage {(TRACKER_TOTAL + grown).toLocaleString()} preferences
              </button>
              <button
                onClick={handleReject}
                onMouseEnter={() => rejectClicks >= 2 && setDodging(true)}
                className={`fine-print text-hubris/40 hover:text-hubris/70 underline transition-transform sm:ml-auto ${dodging ? "translate-x-6 -rotate-3" : ""}`}
              >
                {rejectClicks === 0
                  ? "reject (7 clicks + $49.99 processing fee)"
                  : `reject (${rejectClicks}/${rejectNeeded} — keep going, we believe in you)`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConsentReceipt({ onClose }: { onClose: () => void }) {
  const { consent } = useShop();
  return (
    <div className="p-4">
      <div className="font-mono text-[11px] uppercase tracking-widest text-alarm font-bold">Your consent receipt</div>
      <div className="bg-parchment border-2 border-dashed border-hubris/40 rounded-lg p-3 mt-2 font-mono text-[11px] space-y-1">
        <div className="flex justify-between gap-3"><span>Status</span><strong className="text-alarm">{consent.mode === "accepted" ? "ACCEPTED" : "DECLINED (essential retained)"}</strong></div>
        <div className="flex justify-between gap-3"><span>Recorded</span><strong>{consent.at ? new Date(consent.at).toLocaleString() : "—"}</strong></div>
        <div className="flex justify-between gap-3"><span>Trackers in force</span><strong>{(consent.trackers || TRACKER_TOTAL).toLocaleString()}</strong></div>
        {CONSENT_RECEIPT_LINES.map((l) => (
          <div key={l} className="text-ink/70">— {l}</div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={onClose} className="bg-hubris text-white font-bold px-4 py-2 rounded-lg text-sm">CLOSE RECEIPT</button>
        <span className="fine-print text-ink/45 self-center">Printed copies are $2.49 (Fine Print Rendering Fee).</span>
      </div>
    </div>
  );
}

function PrefsPanel({ onBack, onAccept, grown }: { onBack: () => void; onAccept: () => void; grown: number }) {
  const { pushToast } = useShop();
  const [keep, setKeep] = useState(38);
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    () => Object.fromEntries(TRACKER_CATEGORIES.map((c) => [c.id, true])),
  );
  const [rejections, setRejections] = useState(0);

  const flip = (id: string) => {
    const cat = TRACKER_CATEGORIES.find((c) => c.id === id)!;
    if (toggles[id]) {
      setRejections((r) => r + 1);
      // The toggle snaps back on, because the toggle is load-bearing.
      setTimeout(() => setToggles((t) => ({ ...t, [id]: true })), 420);
      setToggles((t) => ({ ...t, [id]: false }));
      pushToast({
        kind: "warning",
        title: `"${cat.name}" cannot be disabled`,
        body: cat.optOutFee
          ? `Opt-out fee: $${cat.optOutFee.toFixed(2)}. ${cat.legal ?? "The toggle has re-enabled itself for your safety."}`
          : `${cat.legal ?? "Load-bearing. The site would collapse. Greg would cry."}`,
      });
      return;
    }
    setToggles((t) => ({ ...t, [id]: true }));
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="font-mono text-[11px] uppercase tracking-widest text-hubris font-bold">
          Preference center · {(TRACKER_TOTAL + grown).toLocaleString()} items
        </div>
        <div className="font-mono text-[10px] text-alarm">+{grown} provisioned while you read this</div>
      </div>

      <div className="mt-3 bg-hubris text-paper rounded-lg p-3">
        <label className="font-mono text-[11px] text-gold-light uppercase tracking-widest">
          How much of yourself would you like to keep? <span className="text-white font-bold">{keep}%</span>
        </label>
        <input
          type="range" min={0} max={100} value={keep}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > keep) {
              pushToast({ kind: "warning", title: "Retention limit exceeded", body: "The slider only moves downward. Keeping more of yourself is a premium tier ($249/yr), pending approval by one rabbit." });
              setKeep(Math.max(0, keep - 4));
              return;
            }
            setKeep(v);
          }}
          className="w-full accent-[#D92D20] mt-1"
        />
        <div className="font-mono text-[10px] text-paper/50">Currently set to {keep}%. Adjustments are logged, priced, and shared with your employer.</div>
      </div>

      <div className="space-y-2 mt-3">
        {TRACKER_CATEGORIES.map((c) => (
          <div key={c.id} className="bg-parchment rounded px-3 py-2 border border-hubris/10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-bold flex flex-wrap items-center gap-2">
                  {c.name}
                  <span className="font-mono text-[10px] text-alarm">{c.count.toLocaleString()} cookies</span>
                  {c.optOutFee > 0 && <span className="font-mono text-[10px] bg-white border border-hubris/20 rounded px-1.5">opt-out ${c.optOutFee.toFixed(2)}</span>}
                </div>
                <div className="text-xs text-ink/65 mt-0.5">{c.what}</div>
                <div className="font-mono text-[10px] text-ink/45 mt-1">Shared with: {c.sharedWith.join(" · ")}</div>
                {c.legal && <div className="fine-print text-ink/40 mt-1">{c.legal}</div>}
              </div>
              <button
                onClick={() => flip(c.id)}
                className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${toggles[c.id] ? "bg-mint" : "bg-gray-300"}`}
                aria-pressed={toggles[c.id]}
                aria-label={`Toggle ${c.name}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${toggles[c.id] ? "right-1" : "left-1"}`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <button onClick={onBack} className="text-xs underline text-hubris/60 px-2">← back to the smaller, friendlier banner</button>
        <button onClick={onAccept} className="ml-auto bg-mint text-white font-bold px-6 py-2 rounded-lg text-sm">CONFIRM MY COMPLIANCE</button>
      </div>
      <p className="fine-print text-ink/50 mt-2">
        Note: the toggles above are for display purposes, like democracy in our corporate charter. Declines attempted this
        session: {rejections}. Every decline has been logged, priced, and forwarded to Greg, who is a chatbot now and
        has time.
      </p>
    </div>
  );
}

/* ------------------------- Exit-intent / time modal ------------------------ */
const RETENTION_KEY = "hubris.retention.v4";

export function RetentionModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const { pushToast, consent, cookieOpen } = useShop();
  const armed = useRef(false);

  useEffect(() => {
    // Once per visit, never on top of the consent banner, and only after you've
    // been here long enough to matter to the meter.
    let seen = false;
    try { seen = sessionStorage.getItem(RETENTION_KEY) === "1"; } catch { seen = false; }
    if (seen) return;

    const t = setTimeout(() => { armed.current = true; }, 150_000);
    const onLeave = (e: MouseEvent) => {
      if (!armed.current) return;
      if (e.clientY <= 0) setShow(true);
    };
    const onIdle = setTimeout(() => { if (armed.current) setShow(true); }, 210_000);
    document.addEventListener("mouseout", onLeave);
    return () => { clearTimeout(t); clearTimeout(onIdle); document.removeEventListener("mouseout", onLeave); };
  }, []);

  useEffect(() => {
    if (show) {
      try { sessionStorage.setItem(RETENTION_KEY, "1"); } catch { /* fine */ }
    }
  }, [show]);

  if (!show || !consent.mode || cookieOpen) return null;

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
          <p className="fine-print text-ink/40 mt-2">*Spin is metaphorical. The wheel is a JPEG. Prizes are final and also imaginary. This modal appears once per visit; we have been told this makes it "less annoying," which is not a metric we track.</p>
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
