import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeDollarSign, BookOpen, Building2, Check, Flame, Newspaper,
  Quote, ShieldAlert, ShoppingCart, Star, Timer, TrendingUp, Trophy, Zap,
} from "lucide-react";
import { BOOKS, FAKE_REVIEWS, IMPRINTS, SYNERGY_DIVISION } from "../data/books";
import { NEWS_POSTS, bylineFor } from "../data/news";
import { useShop } from "../store/ShopContext";
import { formatMoney } from "../lib/money";
import { Kicker, SectionShell } from "../components/chrome";
import { BookCard, Cover, Stars } from "../components/books";
import { CategoryPill, WireTicker } from "../components/newsroom";
import { SmugBunny } from "../components/Bunny";

export default function Home() {
  const { addToCart, pushToast, bumpHubris, hubrisScore, browsingFee, escalation } = useShop();
  const featured = BOOKS[0];
  const [countdown, setCountdown] = useState(14 * 60 + 33);

  useEffect(() => {
    const t = setInterval(() => setCountdown((c) => (c <= 1 ? 14 * 60 + 59 : c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  const trending = useMemo(() => [...BOOKS].sort((a, b) => b.price - a.price).slice(0, 4), []);
  const latestNews = useMemo(() => NEWS_POSTS.slice(0, 3), []);

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
              Founded in 2006 by idealists who were bought out by lunch. Today{" "}
              <strong className="text-paper">Hubris Books & Bookstore™</strong> is a subsidiary of{" "}
              <strong className="text-paper">Hubris & Hubris & Hubris Holdings</strong>, publishing theoretical and practical
              issues in librarianship from a <em className="text-gold-light">profitable</em> perspective, for an audience of
              professional librarians and students of library science who have already entered their card details.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/catalog" className="bg-gold hover:bg-gold-light text-hubris font-black px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <ShoppingCart size={17} /> SHOP ALL {BOOKS.length} TITLES
              </Link>
              <Link to="/news" className="bg-white/10 border-2 border-gold text-gold-light hover:bg-gold hover:text-hubris font-black px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <Newspaper size={17} /> READ THE NEWSROOM
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5 font-mono text-[11px] text-paper/60">
              <span className="flex items-center gap-1"><Check size={11} className="text-mint" /> No refunds since 2006</span>
              <span className="flex items-center gap-1"><Check size={11} className="text-mint" /> 47 private equity parents</span>
              <span className="flex items-center gap-1"><Check size={11} className="text-mint" /> 1 rabbit in leadership</span>
            </div>
            <div className="mt-5 bg-black/30 border border-alarm/50 rounded-lg px-4 py-3 max-w-md">
              <div className="font-mono text-[10px] uppercase tracking-widest text-alarm font-bold">Your browsing fee, live</div>
              <div className="font-serif font-black text-3xl text-paper tabular-nums">${formatMoney(browsingFee)}</div>
              <div className="font-mono text-[10px] text-paper/50">
                Scroll-metered. Escalation ×{escalation}. It goes up by hundreds of dollars every time you move, and it has
                never once gone down.
              </div>
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
                <div className="font-mono text-[10px] uppercase tracking-widest text-alarm font-bold">{IMPRINTS[featured.imprint].name} · {featured.year}</div>
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
                  <span className="bg-mint text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">SAVE 20%*</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => { addToCart(featured); bumpHubris(3); pushToast({ kind: "upsell", title: "Added + Frequently Required Together", body: "We also pre-checked all six Required Together items ($242.50). Declining is common and fine, and costs $9.99 each." }); }}
                    className="flex-1 bg-hubris hover:bg-hubris-light text-white font-bold rounded-lg px-4 py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} /> ADD TO CART — ${featured.price.toFixed(2)}+
                  </button>
                </div>
                <p className="fine-print text-ink/45 mt-2">*Plus Spine Hydration ($14.95), Convenience ($8.50), Frequently Required Together ($242.50), and Browsing fees. Volumes II–IV sold separately.</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="bg-gold text-hubris font-mono text-center text-[11px] font-bold py-1.5 uppercase tracking-widest px-3">
          ★★★★☆ — "Technically a publisher" — Anya Sharma, probably ··· "Do not buy books here" — The Concept of Libraries ··· "Five stars, I am the CEO and also a rabbit" — Hubris Munnytown
        </div>
      </div>

      <WireTicker />

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

      {/* ============================== CEO BUNNY ============================== */}
      <div className="bg-parchment border-b-4 border-hubris">
        <SectionShell className="!py-10">
          <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-center">
            <div className="relative mx-auto lg:mx-0">
              <img
                src="/images/ceo-bunny.jpg"
                alt="Hubris Munnytown, Chief Executive Rabbit"
                className="w-56 aspect-square object-cover rounded-xl border-4 border-gold shadow-[8px_8px_0_rgba(15,30,61,1)]"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-hubris text-gold-light font-mono text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap animate-bunny-bob">
                CEO · naps 4 hrs/day · meter runs
              </div>
            </div>
            <div>
              <Kicker>A message from leadership</Kicker>
              <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">
                Meet <span className="text-alarm">Hubris Munnytown</span>, Chief Executive Rabbit
              </h2>
              <p className="text-ink/70 mt-3 max-w-2xl">
                Appointed in September 2025 by a unanimous board (the board is one rabbit and a mirror). He holds no degrees,
                having instead acquired the institutions that grant them. He has never issued a refund, never been asked
                twice, and never once reduced the Browsing Fee — which he describes as "an accurate reflection of attention
                economics: attention is scarce, you are spending ours, and ours is expensive."
              </p>
              <blockquote className="border-l-4 border-gold bg-white px-5 py-4 mt-4">
                <Quote size={18} className="text-gold" />
                <p className="font-serif italic text-lg sm:text-xl mt-1">“A checkbox is a small moral event. We have industrialized the small moral event.”</p>
                <div className="font-mono text-[11px] text-ink/50 mt-2">— Hubris Munnytown, Q3 all-hands (attendance billed to departments)</div>
              </blockquote>
              <div className="flex flex-wrap gap-3 mt-5">
                <Link to="/about#leadership" className="bg-hubris text-white font-bold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 hover:bg-hubris-light">
                  MEET THE LEADERSHIP <ArrowRight size={14} />
                </Link>
                <Link to="/news?cat=ceo" className="border-2 border-hubris text-hubris font-bold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 hover:bg-white">
                  FROM THE CEO'S DESK <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </SectionShell>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
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
                  <div className="font-serif font-black text-xl mt-3 group-hover:text-alarm transition-colors leading-tight">{imp.name}</div>
                  <div className="font-mono text-[11px] text-alarm font-semibold">{imp.tagline}</div>
                  <p className="text-sm text-ink/60 mt-2 line-clamp-4">{imp.description}</p>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {trending.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </SectionShell>

      {/* ============================== NEWSROOM ============================== */}
      <div className="bg-hubris text-paper border-y-4 border-gold relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-light font-bold flex items-center gap-2">
                <Newspaper size={13} /> The Synergy Wire · our newsroom
              </div>
              <h2 className="font-serif font-black text-3xl sm:text-5xl mt-2 leading-tight">
                News, announcements, and <span className="italic text-gold-light">fee schedules</span>
              </h2>
              <p className="text-paper/70 mt-3 max-w-2xl">
                Published continuously since 2006 — 4,812 releases covering press announcements, hostile acquisitions,
                awards and contests (entry fee applies), calls for proposals (payable to us), corrections, retractions, and
                memoranda from the Chief Executive Rabbit. Reading is billed at $0.02 per page. Every release concludes at
                199 words of free content with a courteous note.
              </p>
              <div className="space-y-3 mt-6">
                {latestNews.map((p) => (
                  <Link key={p.slug} to={`/news/${p.slug}`} className="block bg-hubris-light border border-gold/30 rounded-lg p-4 hover:border-gold transition-colors group">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CategoryPill id={p.category} />
                      <span className="font-mono text-[10px] text-paper/45">{p.displayDate} · {p.readMinutes} min read · by {bylineFor(p.byline).name}</span>
                    </div>
                    <div className="font-serif font-black text-lg sm:text-xl mt-1.5 leading-snug group-hover:text-gold-light transition-colors">{p.title}</div>
                    <p className="text-sm text-paper/60 mt-1 line-clamp-2">{p.dek}</p>
                    <div className="font-mono text-[10px] text-gold mt-2 flex items-center gap-1">Read the release <ArrowRight size={11} /></div>
                  </Link>
                ))}
              </div>
              <Link to="/news" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-hubris font-black px-6 py-3 rounded-lg mt-6">
                VISIT THE NEWSROOM (4,812 RELEASES) <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative">
              <img src="/images/newsroom.jpg" alt="The Synergy Wire newsroom" className="rounded-xl border-4 border-gold shadow-2xl w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-3 left-4 bg-alarm text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest animate-floaty">
                Now with 61% more revenue
              </div>
              <div className="absolute top-3 right-3 bg-black/70 text-gold-light font-mono text-[10px] px-2.5 py-1.5 rounded flex items-center gap-1.5">
                <span className="w-2 h-2 bg-alarm rounded-full animate-blink-hard" /> REC — the newsroom records itself
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================== TESTIMONIALS ============================== */}
      <SectionShell>
        <Kicker>Unverified, unedited, legally unretractable</Kicker>
        <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Readers Can't Stop Talking*</h2>
        <p className="fine-print text-ink/45 mt-1">*They've tried. The live chat follows them. The live chat is Greg. Greg is a chatbot now.</p>
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

      {/* ==================== CORPORATE SYNERGY DIVISION ==================== */}
      <div className="bg-ink text-paper border-y-4 border-gold">
        <SectionShell className="!py-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-light font-bold">{SYNERGY_DIVISION.heading}</div>
              <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2 leading-tight">Our values, stated once, in plain English, by counsel</h2>
              <p className="text-paper/60 text-sm mt-3 max-w-md">
                Reproduced verbatim from the Corporate Synergy Division one-pager distributed to investors, staff, and — since
                the 2025 platform migration — every visitor who scrolls past this point.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <SmugBunny size={54} className="shrink-0" />
                <div className="font-mono text-[11px] text-paper/60">
                  Approved by <span className="text-gold-light font-bold">Hubris Munnytown</span>, who read page 199 of it and
                  nodded, which constitutes signature in 43 territories.
                </div>
              </div>
            </div>
            <ul className="space-y-2.5">
              {SYNERGY_DIVISION.bullets.map((b, i) => (
                <li key={b} className="bg-hubris-light border border-gold/30 rounded-lg p-4 flex gap-3 items-start">
                  <span className="font-mono text-[11px] font-black text-gold shrink-0 mt-0.5">0{i + 1}</span>
                  <span className="text-sm text-paper/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionShell>
      </div>

      {/* ============================ HUBRIS SCORE CTA ============================ */}
      <div className="bg-alarm text-white border-t-4 border-hubris">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row items-center gap-6">
          <Trophy size={44} className="shrink-0 text-gold-light" />
          <div className="flex-1 text-center lg:text-left">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold">Gamified consumption engine</div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl mt-1">Your Hubris Score: {hubrisScore} pts</h2>
            <p className="text-white/80 text-sm mt-1">Earn points for every click, cart add, and moment of hesitation overcome. At 1,000 pts you unlock <strong>Gold Compliance Status</strong> (a badge; badges cost $9.99 to display).</p>
          </div>
          <div className="flex gap-3">
            <Link to="/loyalty" className="bg-white text-alarm font-black px-6 py-3 rounded-lg hover:bg-parchment">HOW FUNBUX™ WORK</Link>
            <button onClick={() => { bumpHubris(10); pushToast({ kind: "info", title: "+10 Hubris Score!", body: "You clicked a button that gives points for clicking. The loop is complete. You are the product and the customer. Beautiful." }); }} className="bg-hubris text-white font-black px-6 py-3 rounded-lg hover:bg-hubris-light flex items-center gap-2">
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
                "Marketing plan included: we will think about your book often, and announce that thinking in the newsroom",
                "Authors retain exposure. We retain everything else, in perpetuity, universe-wide.",
              ].map((li) => (
                <li key={li} className="flex items-start gap-2"><Check size={15} className="text-mint mt-0.5 shrink-0" /> {li}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link to="/authors" className="inline-flex items-center gap-2 bg-hubris hover:bg-hubris-light text-white font-bold px-6 py-3 rounded-lg">
                SUBMIT (AND REMIT) <ArrowRight size={16} />
              </Link>
              <Link to="/news?cat=cfp" className="inline-flex items-center gap-2 border-2 border-hubris text-hubris font-bold px-6 py-3 rounded-lg hover:bg-parchment">
                OPEN CALLS FOR PROPOSALS <Star size={14} />
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src="/images/library.jpg" alt="Hubris Tower reading room" className="rounded-lg border-2 border-hubris w-full object-cover aspect-[4/3]" />
            <div className="absolute bottom-3 right-3 bg-hubris/90 text-paper font-mono text-[10px] px-2 py-1 rounded">Pictured: the Hubris Tower Reading Room (rent: $400/hr, lamps metered)</div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
