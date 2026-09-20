import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeDollarSign, BookOpen, Building2, Flame, Quote,
  ShoppingCart, Trophy, Check, Timer, TrendingUp, Newspaper, Crown, Rabbit
} from "lucide-react";
import { BOOKS, FAKE_REVIEWS, IMPRINTS, REQUIRED_UPSELLS } from "../data/books";
import { useShop } from "../store/ShopContext";
import { Kicker, SectionShell } from "../components/chrome";
import { BookCard, Cover, Stars } from "../components/books";

export default function Home() {
  const { addToCart, pushToast, bumpHubris, hubrisScore, browsingFee, scrollFee } = useShop();
  const featured = BOOKS.find(b => b.id === "info-wants-to-be-leased") ?? BOOKS[0];
  const [countdown, setCountdown] = useState(14 * 60 + 33);

  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => (c <= 1 ? 14 * 60 + 59 : c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  const trending = useMemo(() => [...BOOKS].sort((a, b) => b.price - a.price).slice(0, 4), []);
  const newTitles = useMemo(() => BOOKS.slice(0, 8), []);

  return (
    <div className="paper-texture">
      {/* ============================== HERO - academic press style ============================== */}
      <div className="bg-paper border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40 flex items-center gap-2">
              <span className="w-6 h-px bg-ink/20" /> Est. 2006 · 27 titles · 47 firms + 1 bunny · No refunds
            </div>
            <h1 className="font-serif font-[800] text-[40px] sm:text-[56px] leading-[0.95] tracking-[-0.04em] mt-5 text-ink">
              Books for librarians with a <span className="italic font-[400]">purchasable edge™</span>
            </h1>
            <div className="academic-rule mt-6 mb-6 max-w-[80px]" />
            <p className="font-serif text-[17px] leading-relaxed text-ink/70 max-w-[52ch]">
              Founded in 2006, <strong className="font-bold text-ink">Bookstore Milkshake</strong> is now an imprint of <strong className="font-bold text-ink">Hubris Books, LLC, LLC</strong> — specializing in theoretical and practical issues in librarianship from a <em>profitable</em> perspective. 
              Authors retain exposure. We retain everything else, in perpetuity, universe-wide.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/catalog" className="bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-[0.12em] px-6 py-3 hover:bg-hubris transition-colors flex items-center gap-2">
                <ShoppingCart size={12} /> Shop {BOOKS.length} titles
              </Link>
              <Link to="/news" className="border border-ink/15 text-ink font-mono text-[11px] font-bold uppercase tracking-[0.12em] px-6 py-3 hover:border-ink/30 hover:bg-parchment/50 transition-colors flex items-center gap-2">
                <Newspaper size={12} /> Newsroom
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg border-t border-ink/5 pt-6">
              <div>
                <div className="font-serif font-bold text-[18px] leading-none">27</div>
                <div className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mt-1">Titles, all required</div>
              </div>
              <div>
                <div className="font-serif font-bold text-[18px] leading-none">6</div>
                <div className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mt-1">Required fees, pre-checked</div>
              </div>
              <div>
                <div className="font-serif font-bold text-[18px] leading-none">${browsingFee.toFixed(0)}</div>
                <div className="font-mono text-[10px] text-alarm uppercase tracking-widest mt-1">Browsing fee, climbing</div>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-3 max-w-lg bg-parchment/60 border border-ink/5 p-4">
              <div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-[14px] shrink-0">🐰</div>
              <div className="font-serif text-[12.5px] leading-snug text-ink/60">
                <span className="font-bold text-ink/80">Hubris Munnytown, SEO:</span> <span className="italic">"I SEO'd 'academic' to 'buy now or your browsing fee doubles.' Keep scrolling. Fee: ${browsingFee.toFixed(2)}"</span>
              </div>
            </div>
          </div>

          {/* Featured book - academic card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="bg-paper border border-ink/10 p-6 sm:p-7 relative"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40 flex items-center gap-2">
              <Flame size={10} className="text-alarm" /> Featured · #1 in Profitable Theory · Bunny Approved™
            </div>
            <div className="flex flex-col sm:flex-row gap-6 mt-5">
              <Link to={`/book/${featured.id}`} className="mx-auto sm:mx-0 shrink-0 hover:opacity-90 transition-opacity">
                <Cover book={featured} size="lg" />
              </Link>
              <div className="flex-1">
                <Link to={`/book/${featured.id}`} className="font-serif font-bold text-[22px] leading-[1.15] tracking-[-0.01em] hover:text-alarm transition-colors block">
                  {featured.title}
                </Link>
                <div className="font-serif italic text-[13px] text-ink/50 mt-1 leading-snug">{featured.subtitle}</div>
                <div className="font-mono text-[11px] mt-3 text-ink/60">by <strong className="text-ink">{featured.author}</strong></div>
                <div className="flex items-center gap-2 mt-3">
                  <Stars n={5} />
                  <span className="font-mono text-[10px] text-ink/40">4.9 · 8,412 reviews (negative pending)</span>
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="font-serif font-bold text-[22px] tracking-[-0.02em]">${featured.price.toFixed(2)}</span>
                  <span className="font-mono text-[11px] text-ink/30 line-through">${featured.listPrice.toFixed(2)}</span>
                </div>
                <div className="font-mono text-[10px] text-ink/40 mt-1">+ 6 Required Together™ ($242.50) + browsing ${browsingFee.toFixed(0)}</div>
                <button
                  onClick={() => { addToCart(featured); bumpHubris(3); pushToast({ kind: "upsell", title: "Added + 6 required fees", body: "Shelf Presence Assurance™ + All-Pages Pass pre-checked. Unchecking = $7.77 + bunny judgment." }); }}
                  className="mt-5 w-full bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-[0.1em] px-4 py-3 hover:bg-hubris transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={12} /> Add to cart — ${featured.price.toFixed(2)}+
                </button>
                <p className="font-mono text-[10px] text-ink/35 mt-3 leading-snug">Sale ends {mm}:{ss} (then restarts) · Browsing fee ${browsingFee.toFixed(2)} · Scroll ${scrollFee.toFixed(0)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================= STATS - academic ========================= */}
      <div className="bg-ink text-paper/70 border-b border-ink">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { big: `${BOOKS.length}`, small: "titles in print, all required reading, legally per patent" },
            { big: "47", small: "private equity firms + 1 bunny (owns 30% of metadata)" },
            { big: "$0", small: "paid in author royalties (Q3, record low, exposure up)" },
            { big: "0", small: "successful returns processed — zero, none, ever, bunny ate form" },
          ].map((s) => (
            <div key={s.small} className="border-l border-white/10 pl-4 first:border-l-0 first:pl-0">
              <div className="font-serif font-bold text-[32px] leading-none text-paper tracking-[-0.02em]">{s.big}</div>
              <div className="font-mono text-[10.5px] leading-snug text-paper/50 mt-2 max-w-[22ch]">{s.small}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= CORPORATE SYNERGY - academic ========================= */}
      <div className="bg-parchment/40 border-b border-ink/5">
        <SectionShell className="!py-10">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-start">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40 flex items-center gap-2">
                <Crown size={10} /> Hubris Books™ (Corporate Synergy Division)
              </div>
              <h2 className="font-serif font-bold text-[26px] leading-[1.15] tracking-[-0.02em] mt-3">Venture-backed, thought-leader-run, critical perspectives™ on how to own them</h2>
              <div className="mt-5 space-y-2 font-serif text-[14px] leading-relaxed text-ink/60">
                <p>— Authors retain exposure. We retain everything else, in perpetuity, universe-wide, including your browsing fee (${browsingFee.toFixed(0)} and climbing).</p>
                <p>— Books about power structures. We ARE the power structure. Meta. Monetized. The bunny is our CEO now. Greg sits on floor (sitting fee $3.50/15min).</p>
                <p>— Profits? Yes. Profits. That's the values. The bunny's values are carrots and SEO dominance. Your browsing fee funds carrots.</p>
              </div>
            </div>
            <div className="border border-ink/10 p-5 bg-paper">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center">🐰</div>
                <div>
                  <div className="font-serif font-bold text-[13px]">Hubris Munnytown</div>
                  <div className="font-mono text-[9.5px] text-ink/40 uppercase tracking-widest">SEO Bunny · Smug · Overlord</div>
                </div>
              </div>
              <p className="font-serif italic text-[13px] leading-snug text-ink/60 mt-3">"I rewrote your title tags to include 'buy now or else.' Conversion up 400%. Fee: ${browsingFee.toFixed(0)}"</p>
            </div>
          </div>
        </SectionShell>
      </div>

      {/* ============================ NEW & NOTABLE ============================ */}
      <SectionShell>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Kicker>Fresh off the surcharge press · bunny-optimized</Kicker>
            <h2 className="font-serif font-bold text-[28px] sm:text-[34px] leading-[1.1] tracking-[-0.03em] mt-3">New & Notable</h2>
          </div>
          <Link to="/catalog" className="hidden sm:flex font-mono text-[11px] uppercase tracking-widest text-ink/50 hover:text-ink items-center gap-1">
            Full catalog <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {newTitles.slice(0, 4).map((b) => <BookCard key={b.id} book={b} />)}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {newTitles.slice(4, 8).map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </SectionShell>

      {/* ============================== IMPRINTS - academic ============================== */}
      <div className="bg-parchment/50 border-y border-ink/5">
        <SectionShell className="!py-12">
          <Kicker>One empire, four imprints, zero differences in pricing</Kicker>
          <h2 className="font-serif font-bold text-[28px] tracking-[-0.02em] mt-3">Imprints</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {Object.entries(IMPRINTS).map(([key, imp]) => {
              const count = BOOKS.filter((b) => b.imprint === key).length;
              return (
                <Link key={key} to={`/catalog?imprint=${key}`} className="bg-paper border border-ink/10 p-6 hover:border-ink/20 transition-colors group">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{count} titles</div>
                  <div className="font-serif font-bold text-[18px] mt-2 group-hover:text-alarm transition-colors leading-tight">{imp.name}</div>
                  <div className="font-mono text-[10px] text-ink/40 mt-1">{imp.tagline}</div>
                  <p className="font-serif text-[12.5px] leading-snug text-ink/50 mt-3 line-clamp-3">{imp.description}</p>
                </Link>
              );
            })}
          </div>
        </SectionShell>
      </div>

      {/* ===================== TRENDING ===================== */}
      <SectionShell>
        <Kicker><span className="flex items-center gap-1.5"><TrendingUp size={10} /> Demand pricing · scroll = fee</span></Kicker>
        <h2 className="font-serif font-bold text-[28px] tracking-[-0.02em] mt-3">Trending <span className="font-[400] italic text-ink/50">(prices rising live)</span></h2>
        <p className="font-serif text-[14px] leading-relaxed text-ink/60 mt-2 max-w-2xl">Our algorithm adjusts prices every 30 seconds based on demand, weather, moon phase, scroll velocity, and how badly you seem to want it. Browsing fee: ${browsingFee.toFixed(2)} because you scrolled here.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {trending.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </SectionShell>

      {/* ============================ REQUIRED UPSELLS ============================ */}
      <div className="bg-ink text-paper/70 border-y border-ink">
        <SectionShell className="!py-10">
          <Kicker><span className="text-paper/40">Frequently required together · pre-checked at checkout</span></Kicker>
          <h2 className="font-serif font-bold text-[26px] leading-tight tracking-[-0.02em] mt-3 text-paper">Every book requires these. Not optional. Required.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {REQUIRED_UPSELLS.map(u => (
              <div key={u.id} className="border border-white/10 p-4">
                <div className="flex items-baseline justify-between">
                  <div className="font-serif font-bold text-[13px] text-paper">{u.name}</div>
                  <div className="font-mono text-[11px] text-gold-light">${u.price.toFixed(2)}</div>
                </div>
                <div className="font-serif text-[12px] leading-snug text-paper/50 mt-2">{u.detail}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-paper/30 mt-3">Pre-checked · Uncheck = $7.77 + 🐰 judgment</div>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>

      {/* ============================== TESTIMONIALS - academic ============================== */}
      <SectionShell>
        <Kicker>Unverified, unedited, legally unretractable</Kicker>
        <h2 className="font-serif font-bold text-[28px] tracking-[-0.02em] mt-3">Readers</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {FAKE_REVIEWS.slice(0, 3).map((r, i) => (
            <figure key={i} className="border border-ink/10 p-6 bg-paper">
              <Quote size={16} className="text-ink/20" />
              <blockquote className="font-serif italic text-[14px] leading-relaxed mt-3">"{r.quote}"</blockquote>
              <figcaption className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3">
                <span className="font-mono text-[10px] text-ink/40">{r.source}</span>
                <Stars n={r.stars} />
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionShell>

      {/* ============================ HUBRIS SCORE ============================ */}
      <div className="bg-parchment/50 border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row items-center gap-8">
          <Trophy size={28} className="shrink-0 text-ink/20" />
          <div className="flex-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">Gamified consumption</div>
            <h2 className="font-serif font-bold text-[20px] mt-1">Hubris Score: {hubrisScore} pts · Browsing Fee: ${browsingFee.toFixed(2)}</h2>
            <p className="font-serif text-[13px] text-ink/60 mt-1">Points for every click, cart add, scroll. At 1,000 pts you unlock Gold Compliance Status (badge $9.99 to display).</p>
          </div>
          <div className="flex gap-3">
            <Link to="/loyalty" className="border border-ink/15 font-mono text-[11px] uppercase tracking-widest px-5 py-2.5 hover:border-ink/30">How FunBux™ work</Link>
            <button onClick={() => { bumpHubris(10); pushToast({ kind: "info", title: "+10 Hubris Score + $127 fee", body: "You clicked a button that gives points for clicking. Loop complete. Bunny proud." }); }} className="bg-ink text-paper font-mono text-[11px] uppercase tracking-widest px-5 py-2.5 hover:bg-hubris">
              Free points
            </button>
          </div>
        </div>
      </div>

      {/* ============================== PUBLISH ============================== */}
      <SectionShell>
        <div className="bg-paper border border-ink/10 p-8 sm:p-10 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <Kicker>For authors · our best customers</Kicker>
            <h2 className="font-serif font-bold text-[28px] leading-[1.1] tracking-[-0.02em] mt-3">Publish With Hubris</h2>
            <div className="mt-5 space-y-2 font-serif text-[14px] leading-relaxed text-ink/60">
              <p className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-ink/30" /> Manuscript reception fee: $299 (non-refundable, non-readable, bunny-reviewed)</p>
              <p className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-ink/30" /> Peer review by shareholders + 1 bunny — rigorous, dividend-focused, carrot-motivated</p>
              <p className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-ink/30" /> Royalties up to 0.4% — paid in FunBux™ (bucks in spirit) minus carrot tax</p>
              <p className="flex gap-2"><Check size={14} className="mt-1 shrink-0 text-ink/30" /> Marketing: we will think about your book often, then invoice you for thinking</p>
            </div>
            <Link to="/authors" className="inline-flex mt-6 bg-ink text-paper font-mono text-[11px] uppercase tracking-widest px-6 py-3 hover:bg-hubris">
              Submit & remit <ArrowRight size={12} className="ml-2" />
            </Link>
          </div>
          <div>
            <img src="/images/library.jpg" alt="Hubris Tower reading room" className="w-full object-cover aspect-[4/3] border border-ink/10" />
            <div className="font-mono text-[10px] text-ink/40 mt-2">Hubris Tower Reading Room — rent $400/hr + scroll fee + bunny supervision</div>
          </div>
        </div>
      </SectionShell>

      {/* ============================== NEWS TEASER ============================== */}
      <div className="bg-paper border-t border-ink/10">
        <SectionShell className="!py-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Kicker>News · 2015–2026 · 11 years of propaganda</Kicker>
              <h2 className="font-serif font-bold text-[28px] tracking-[-0.02em] mt-3">News & Acquisitions</h2>
            </div>
            <Link to="/news" className="font-mono text-[11px] uppercase tracking-widest text-ink/50 hover:text-ink flex items-center gap-1">
              All news <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { date: "July 6, 2026", title: "New Series Editor: Hubris Munnytown (Bunny, SEO, Smug)", excerpt: "We are pleased to announce our new editor for the Series on Critical Race Studies and Monetization is a bunny. He demanded 30% of metadata and all carrots." },
              { date: "May 29, 2026", title: "Call for Proposals: Libraries in the Anthropocene Capitalism Colloquium II", excerpt: "Proposals must include a revenue model. Without a revenue model will be invoiced anyway. Bunny will SEO your abstract." },
              { date: "Jan 22, 2026", title: "Hubris Joins SDG Publishers Compact (Then Monetizes It)", excerpt: "We signed the compact. Then introduced SDG Compliance Fee $14.99. Sustainable if you pay monthly. Forever." },
            ].map((n) => (
              <div key={n.title} className="border border-ink/10 p-6 hover:border-ink/20 transition-colors">
                <div className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">{n.date}</div>
                <div className="font-serif font-bold text-[16px] leading-tight mt-2">{n.title}</div>
                <p className="font-serif text-[13px] leading-snug text-ink/60 mt-2">{n.excerpt}</p>
                <Link to="/news" className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mt-4 inline-block hover:text-ink">Read more →</Link>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>
    </div>
  );
}
