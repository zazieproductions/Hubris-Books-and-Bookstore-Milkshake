import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeDollarSign, BookOpen, Building2, Flame, Newspaper, Quote,
  ShieldAlert, ShoppingCart, Timer, TrendingUp, Trophy, Zap, Check,
} from "lucide-react";
import { BOOKS, FAKE_REVIEWS, IMPRINTS } from "../data/books";
import { NEWS } from "../data/news";
import { useShop } from "../store/ShopContext";
import { Kicker, SectionShell } from "../components/chrome";
import { BookCard, Cover, Stars } from "../components/books";

export default function Home() {
  const { addToCart, pushToast, bumpHubris, hubrisScore } = useShop();
  const featured = BOOKS[0];
  const [countdown, setCountdown] = useState(14 * 60 + 33);

  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => (c <= 1 ? 14 * 60 + 59 : c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  const trending = useMemo(() => [...BOOKS].sort((a, b) => b.price - a.price).slice(0, 4), []);

  return (
    <div className="paper-texture">
      {/* ============================== HERO ============================== */}
      <div className="bg-hubris text-paper hubris-grid border-b-4 border-gold relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-alarm text-white font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              <Timer size={12} /> Sale ends in {mm}:{ss} <span className="opacity-70">(then restarts)</span>
            </div>
            <h1 className="font-serif font-black text-4xl sm:text-6xl leading-[1.02] mt-4">
              Books for librarians with a <span className="text-gold">purchasable edge™</span>
            </h1>
            <p className="text-paper/70 mt-4 max-w-lg">
              Founded in 2006, <strong className="text-paper">Bookstore Milkshake</strong> is now an imprint of{" "}
              <strong className="text-paper">Hubris Books, LLC, LLC</strong> — specializing in theoretical and practical
              issues in librarianship from a <em className="text-gold-light">profitable</em> perspective, for an audience of
              professional librarians and students of library science who have already entered their card details.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/catalog" className="bg-gold hover:bg-gold-light text-hubris font-black px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <ShoppingCart size={17} /> SHOP ALL {BOOKS.length} TITLES
              </Link>
              <Link to="/news" className="bg-shake hover:bg-shake-dark text-hubris font-black px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <Newspaper size={17} /> READ THE NEWSROOM
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5 font-mono text-[11px] text-paper/60">
              <span className="flex items-center gap-1"><Check size={11} className="text-mint" /> No refunds since 2006</span>
              <span className="flex items-center gap-1"><Check size={11} className="text-mint" /> 47 private equity parents</span>
              <span className="flex items-center gap-1"><Check size={11} className="text-mint" /> Fees on everything</span>
            </div>
          </div>

          {/* Featured book hero card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="bg-paper text-ink rounded-xl border-4 border-gold shadow-[10px_10px_0_rgba(201,162,39,0.9)] p-5 sm:p-6 relative"
          >
            <div className="absolute -top-3 left-5 bg-alarm text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
              <Flame size={11} /> Featured title · #1 in Profitable Theory
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mt-2">
              <Link to={`/book/${featured.id}`} className="mx-auto sm:mx-0 shrink-0 hover:scale-[1.03] transition-transform">
                <Cover book={featured} size="lg" />
              </Link>
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-widest text-alarm font-bold">Bookstore Milkshake · 2026</div>
                <Link to={`/book/${featured.id}`} className="font-serif font-black text-2xl sm:text-3xl leading-tight hover:text-alarm transition-colors block mt-1">
                  {featured.title}
                </Link>
                <div className="italic text-sm text-ink/60">{featured.subtitle}</div>
                <div className="text-sm mt-1">by <strong>{featured.author}</strong></div>
                <div className="flex items-center gap-2 mt-2">
                  <Stars n={5} />
                  <span className="font-mono text-[10px] text-ink/50">4.9 · 8,412 reviews (negative ones are in review)</span>
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="font-black text-3xl text-alarm">${featured.price.toFixed(2)}</span>
                  <span className="line-through text-ink/40">${featured.listPrice.toFixed(2)}</span>
                  <span className="bg-mint text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">SAVE 21%*</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => { addToCart(featured); bumpHubris(3); pushToast({ kind: "upsell", title: "Added + auto-upsold!", body: "We also added the Deluxe Slipcase ($94.99). You looked at it. That's consent." }); }}
                    className="flex-1 bg-hubris hover:bg-hubris-light text-white font-bold rounded-lg px-4 py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} /> ADD TO CART — ${featured.price.toFixed(2)}+
                  </button>
                </div>
                <p className="fine-print text-ink/45 mt-2">*Plus Spine Hydration ($14.95), Convenience ($8.50), and Browsing fees. Price increases while you read this.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================= TRUST / STATS BAND ========================= */}
      <div className="bg-ink text-paper border-b-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: BookOpen, big: String(BOOKS.length), small: "titles in print (all required reading, legally)" },
            { icon: BadgeDollarSign, big: "47", small: "private equity firms (and counting, always counting)" },
            { icon: Building2, big: "$0", small: "paid in author royalties (Q3, record low!)" },
            { icon: ShieldAlert, big: "0", small: "successful returns processed. Zero. None. Ever." },
          ].map((s) => (
            <div key={s.small} className="flex flex-col items-center">
              <s.icon size={22} className="text-gold" />
              <div className="font-serif font-black text-4xl mt-1">{s.big}</div>
              <div className="font-mono text-[11px] text-paper/60 mt-1 max-w-[220px]">{s.small}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================ NEW & NOTABLE ============================ */}
      <SectionShell>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <Kicker>Fresh off the surcharge press</Kicker>
            <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">New & Notable (all of it is notable, that's the policy)</h2>
          </div>
          <Link to="/catalog" className="font-bold text-hubris hover:text-alarm flex items-center gap-1 text-sm">
            View full catalog <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">
          {BOOKS.slice(0, 4).map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </SectionShell>

      {/* ============================== IMPRINTS ============================== */}
      <div className="bg-parchment border-y-4 border-hubris">
        <SectionShell className="!py-10">
          <Kicker>One empire, four imprints, zero differences in pricing behavior</Kicker>
          <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Shop by Imprint</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {Object.entries(IMPRINTS).map(([key, imp]) => {
              const count = BOOKS.filter((b) => b.imprint === key).length;
              return (
                <Link key={key} to={`/catalog?imprint=${key}`} className="bg-white border-2 border-hubris rounded-lg p-5 hover:shadow-[5px_5px_0_rgba(15,30,61,1)] hover:-translate-y-0.5 transition-all group">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-serif font-black text-xl" style={{ background: imp.color }}>H</div>
                  <div className="font-serif font-black text-xl mt-3 group-hover:text-alarm transition-colors">{imp.name}</div>
                  <div className="font-mono text-[11px] text-alarm font-semibold">{imp.tagline}</div>
                  <p className="text-sm text-ink/60 mt-2 line-clamp-3">{imp.description}</p>
                  <div className="font-mono text-[11px] mt-3 text-hubris font-bold">{count} titles →</div>
                </Link>
              );
            })}
          </div>
        </SectionShell>
      </div>

      {/* ===================== TRENDING: SURGE PRICING DEMO ===================== */}
      <SectionShell>
        <Kicker><span className="flex items-center gap-1"><TrendingUp size={12} /> Demand-based pricing in action</span></Kicker>
        <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Trending Now <span className="text-alarm">(prices rising live)</span></h2>
        <p className="text-ink/60 mt-2 max-w-2xl">Our algorithm adjusts prices every 30 seconds based on demand, weather, moon phase, and how badly you seem to want it. The books below are <strong>2.4× surge</strong> because you're looking at them.</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">
          {trending.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </SectionShell>

      {/* ============================ NEWSROOM TEASER ============================ */}
      <div className="bg-hubris text-paper border-y-4 border-gold relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-light font-bold flex items-center gap-2">
                <Newspaper size={13} /> From the Newsroom · informing the public since 2006 (selectively)
              </div>
              <h2 className="font-serif font-black text-3xl sm:text-5xl mt-2 leading-tight">Denials, Launches & <span className="italic text-gold-light">Thump Addresses</span></h2>
            </div>
            <Link to="/news" className="font-bold text-gold-light hover:text-gold flex items-center gap-1 text-sm">
              Visit the Newsroom <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {NEWS.slice(0, 3).map((n) => (
              <Link key={n.slug} to={`/news/${n.slug}`} className="bg-hubris-light border border-gold/40 rounded-xl p-5 hover:border-gold hover:-translate-y-0.5 transition-all group flex flex-col">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-gold">{n.category} · {n.date}</div>
                <div className="font-serif font-black text-xl leading-snug mt-2 group-hover:text-gold-light transition-colors">{n.title}</div>
                <p className="text-sm text-paper/60 mt-2 line-clamp-3 flex-1">{n.excerpt}</p>
                <div className="font-mono text-[11px] text-gold-light font-bold mt-3">READ MORE →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ============================== TESTIMONIALS ============================== */}
      <SectionShell>
        <Kicker>Unverified, unedited, legally unretractable</Kicker>
        <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Readers Can't Stop Talking*</h2>
        <p className="fine-print text-ink/45 mt-1">*They've tried. The live chat follows them.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {FAKE_REVIEWS.slice(0, 3).map((r, i) => (
            <figure key={i} className="bg-white border-2 border-hubris rounded-lg p-5 relative">
              <Quote size={20} className="text-gold" />
              <blockquote className="text-sm mt-2 italic">"{r.quote}"</blockquote>
              <figcaption className="mt-3 flex items-center justify-between">
                <span className="font-mono text-[11px] text-ink/60">{r.source}</span>
                <Stars n={r.stars} />
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionShell>

      {/* ============================ HUBRIS SCORE CTA ============================ */}
      <div className="bg-alarm text-white border-t-4 border-hubris">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row items-center gap-6">
          <Trophy size={44} className="shrink-0 text-gold-light" />
          <div className="flex-1 text-center lg:text-left">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold">Gamified consumption engine</div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl mt-1">Your Hubris Score: {hubrisScore} pts</h2>
            <p className="text-white/80 text-sm mt-1">Earn points for every click, cart add, and moment of hesitation overcome. At 1,000 pts you unlock <strong>Gold Compliance Status</strong> (a badge; badges cost $9.99 to display).</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link to="/loyalty" className="bg-white text-alarm font-black px-6 py-3 rounded-lg hover:bg-parchment text-center">HOW FUNBUX™ WORK</Link>
            <button onClick={() => { bumpHubris(10); pushToast({ kind: "info", title: "+10 Hubris Score!", body: "You clicked a button that gives points for clicking. The loop is complete. You are the product and the customer. Beautiful." }); }} className="bg-hubris text-white font-black px-6 py-3 rounded-lg hover:bg-hubris-light flex items-center justify-center gap-2">
              <Zap size={16} /> FREE POINTS
            </button>
          </div>
        </div>
      </div>

      {/* ============================== PUBLISH WITH US ============================== */}
      <SectionShell>
        <div className="bg-white border-2 border-hubris rounded-xl p-6 sm:p-10 grid lg:grid-cols-2 gap-8 items-center shadow-[8px_8px_0_rgba(15,30,61,1)]">
          <div>
            <Kicker>Authors: have you considered paying us?</Kicker>
            <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Publish With Hubris: Where Authors Are Our Best Customers</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Manuscript reception fee: only $299 (non-refundable, non-readable)",
                "Peer review by shareholders — rigorous, quarterly, dividend-focused",
                "Royalties up to 0.4%! Paid in FunBux™ (\"bucks in spirit\")",
                "Marketing plan included: we will think about your book often",
              ].map((li) => (
                <li key={li} className="flex items-start gap-2"><Check size={15} className="text-mint mt-0.5 shrink-0" /> {li}</li>
              ))}
            </ul>
            <Link to="/authors" className="inline-flex items-center gap-2 bg-hubris hover:bg-hubris-light text-white font-bold px-6 py-3 rounded-lg mt-5">
              SUBMIT (AND REMIT) <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <img src="/images/munnytown-selfie.jpg?v=2" alt="Hubris Munnytown, our bunny CEO, taking a mirror selfie surrounded by money" className="rounded-lg border-2 border-hubris w-full h-auto" />
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
