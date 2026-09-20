import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BadgeDollarSign, BookOpen, Building2, Flame, Quote,
  ShieldAlert, ShoppingCart, Trophy, Zap, Check, Timer, TrendingUp, Newspaper, Crown, Rabbit
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
      {/* ============================== HERO (gold bar removed, shimmer removed) ============================== */}
      <div className="bg-hubris text-paper hubris-grid border-b-4 border-gold relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-alarm text-white font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              <Timer size={12} /> Browsing fee: ${browsingFee.toFixed(2)} <span className="opacity-70">(+${scrollFee.toFixed(0)} scroll)</span> · Sale ends in {mm}:{ss}
            </div>
            <h1 className="font-serif font-black text-4xl sm:text-6xl leading-[1.02] mt-4">
              Books for librarians with a <span className="text-gold">purchasable edge™</span>
            </h1>
            <p className="text-paper/70 mt-4 max-w-lg">
              Founded in 2006, <strong className="text-paper">Bookstore Milkshake</strong> is now an imprint of{" "}
              <strong className="text-paper">Hubris Books, LLC, LLC</strong> — specializing in theoretical and practical
              issues in librarianship from a <em className="text-gold-light">profitable</em> perspective. 
              Authors retain exposure. We retain everything else, in perpetuity, universe-wide.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/catalog" className="bg-gold hover:bg-gold-light text-hubris font-black px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <ShoppingCart size={17} /> SHOP ALL {BOOKS.length} TITLES
              </Link>
              <Link to="/news" className="bg-white text-hubris font-black px-6 py-3 rounded-lg flex items-center gap-2 transition-colors border-2 border-gold">
                <Newspaper size={17} /> READ OUR PROPAGANDA
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5 font-mono text-[11px] text-paper/60">
              <span className="flex items-center gap-1"><Check size={11} className="text-mint" /> No refunds since 2006</span>
              <span className="flex items-center gap-1"><Check size={11} className="text-mint" /> 47 PE firms + 1 smug bunny</span>
              <span className="flex items-center gap-1"><Check size={11} className="text-mint" /> Fees on every scroll</span>
            </div>
            <div className="mt-4 bg-black/30 border border-gold/30 rounded-lg p-3 flex items-center gap-3 max-w-lg">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shrink-0">🐰</div>
              <div className="text-xs">
                <div className="font-bold text-gold-light">Hubris Munnytown, Chief SEO Bunny says:</div>
                <div className="text-paper/70 italic">"Keep scrolling, human. Every pixel is $2.30. I already SEO'd your name. You're welcome."</div>
              </div>
            </div>
          </div>

          {/* Featured book hero card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="bg-paper text-ink rounded-xl border-4 border-gold shadow-[10px_10px_0_rgba(201,162,39,0.9)] p-5 sm:p-6 relative"
          >
            <div className="absolute -top-3 left-5 bg-alarm text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
              <Flame size={11} /> Featured title · #1 in Profitable Theory · Bunny Approved™
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mt-2">
              <Link to={`/book/${featured.id}`} className="mx-auto sm:mx-0 shrink-0 hover:scale-[1.03] transition-transform">
                <Cover book={featured} size="lg" />
              </Link>
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-widest text-alarm font-bold">Hubris Books · 2026 · 4 Volumes, Sold Separately</div>
                <Link to={`/book/${featured.id}`} className="font-serif font-black text-2xl sm:text-3xl leading-tight hover:text-alarm transition-colors block mt-1">
                  {featured.title}
                </Link>
                <div className="italic text-sm text-ink/60">{featured.subtitle}</div>
                <div className="text-sm mt-1">by <strong>{featured.author}</strong></div>
                <div className="flex items-center gap-2 mt-2">
                  <Stars n={5} />
                  <span className="font-mono text-[10px] text-ink/50">4.9 · 8,412 reviews (negative ones are pending, forever)</span>
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="font-black text-3xl text-alarm">${featured.price.toFixed(2)}</span>
                  <span className="line-through text-ink/40">${featured.listPrice.toFixed(2)}</span>
                  <span className="bg-mint text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">SAVE 75%* ON VOL 1*</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => { addToCart(featured); bumpHubris(3); pushToast({ kind: "upsell", title: "Added + auto-upsold!", body: "We also added Shelf Presence Assurance™ ($24) and All-Pages Access Pass ($41). Pre-checked, as is tradition." }); }}
                    className="flex-1 bg-hubris hover:bg-hubris-light text-white font-bold rounded-lg px-4 py-3 text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} /> ADD TO CART — ${featured.price.toFixed(2)}+
                  </button>
                </div>
                <p className="fine-print text-ink/45 mt-2">*Plus Spine Hydration ($14.95), Convenience ($8.50), Scroll Fee (${scrollFee.toFixed(0)} and climbing), and Hubris Munnytown's Carrot Tax. Price increases while you read this, literally — scroll up to see.</p>
              </div>
            </div>
          </motion.div>
        </div>
        {/* REMOVED shiny censored gold bar */}
      </div>

      {/* ========================= TRUST / STATS BAND ========================= */}
      <div className="bg-ink text-paper border-b-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: BookOpen, big: `${BOOKS.length}`, small: "titles in print (all required reading, legally, per patent)" },
            { icon: BadgeDollarSign, big: "47", small: "private equity firms + 1 bunny (he owns 30% of your metadata)" },
            { icon: Building2, big: "$0", small: "paid in author royalties (Q3, record low! Exposure is up though)" },
            { icon: ShieldAlert, big: "0", small: "successful returns processed. Zero. None. Ever. Bunny ate the return form." },
          ].map((s) => (
            <div key={s.small} className="flex flex-col items-center">
              <s.icon size={22} className="text-gold" />
              <div className="font-serif font-black text-4xl mt-1">{s.big}</div>
              <div className="font-mono text-[11px] text-paper/60 mt-1 max-w-[220px]">{s.small}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= CORPORATE SYNERGY DIV ========================= */}
      <div className="bg-gold/10 border-b-4 border-hubris">
        <SectionShell className="!py-8">
          <div className="grid lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <div className="font-mono text-[11px] uppercase tracking-widest text-alarm font-bold flex items-center gap-2">
                <Crown size={12} /> HUBRIS BOOKS™ (CORPORATE SYNERGY DIVISION)
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl mt-2">Venture-backed, thought-leader-run, critical perspectives™ on how to own them</h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Authors retain exposure. We retain everything else, in perpetuity, universe-wide, including your browsing fee.</li>
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Books about power structures. We ARE the power structure. Meta! Also, monetized. The bunny is our CEO now.</li>
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Website has 14 popups (now 1, bunny-approved), 3 fake timers, and a chatbot that sells insurance and carrots.</li>
                <li className="flex gap-2"><span className="text-gold font-bold">•</span> Profits? Yes. Profits. That's the values. The bunny's values are carrots and SEO dominance.</li>
              </ul>
            </div>
            <div className="bg-hubris text-paper rounded-xl p-5 border-2 border-gold">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl">🐰</div>
                <div>
                  <div className="font-serif font-black">Hubris Munnytown</div>
                  <div className="font-mono text-[10px] text-gold-light">SEO BUNNY · SMUG · OMNIPRESENT</div>
                </div>
              </div>
              <p className="text-sm mt-3 italic text-paper/80">"I rewrote your title tags to include 'buy now or else.' Conversion up 400%. You're welcome. Your browsing fee is now ${browsingFee.toFixed(0)}. Keep scrolling, I need new carrots."</p>
            </div>
          </div>
        </SectionShell>
      </div>

      {/* ============================ NEW & NOTABLE ============================ */}
      <SectionShell>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <Kicker>Fresh off the surcharge press · bunny-optimized</Kicker>
            <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">New & Notable (all of it is notable, that's the policy)</h2>
          </div>
          <Link to="/catalog" className="font-bold text-hubris hover:text-alarm flex items-center gap-1 text-sm">
            View full catalog <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {newTitles.slice(0, 4).map((b) => <BookCard key={b.id} book={b} />)}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          {newTitles.slice(4, 8).map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </SectionShell>

      {/* ============================== IMPRINTS ============================== */}
      <div className="bg-parchment border-y-4 border-hubris">
        <SectionShell className="!py-10">
          <Kicker>One empire, four imprints, zero differences in pricing behavior · bunny manages all four</Kicker>
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
        <Kicker><span className="flex items-center gap-1"><TrendingUp size={12} /> Demand-based pricing in action · scroll = $</span></Kicker>
        <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Trending Now <span className="text-alarm">(prices rising live, like your browsing fee: ${browsingFee.toFixed(0)})</span></h2>
        <p className="text-ink/60 mt-2 max-w-2xl">Our algorithm adjusts prices every 30 seconds based on demand, weather, moon phase, scroll velocity, and how badly you seem to want it. The books below are <strong>2.4× surge</strong> because you're looking at them. Your browsing fee is <strong>${browsingFee.toFixed(2)}</strong> because you scrolled to read this.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {trending.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </SectionShell>

      {/* ============================ REQUIRED UPSELLS PREVIEW ============================ */}
      <div className="bg-hubris text-paper border-y-4 border-gold">
        <SectionShell className="!py-10">
          <Kicker><span className="text-gold-light">Frequently required together · pre-checked at checkout, obviously</span></Kicker>
          <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Every Book Requires These. It's Not Optional, It's Tradition.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {REQUIRED_UPSELLS.map(u => (
              <div key={u.id} className="bg-hubris-light border border-gold/30 rounded-lg p-4 flex gap-3">
                <div className="text-2xl">{u.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold text-sm flex items-center gap-2">{u.name} <span className="text-gold-light">${u.price.toFixed(2)}</span> <span className="text-[9px] bg-alarm px-1.5 py-0.5 rounded font-mono">PRE-CHECKED</span></div>
                  <div className="text-xs text-paper/60 mt-1">{u.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-paper/50 mt-4">Unchecking any of these adds a $7.77 Uncheck Fee and a disappointed email from Hubris Munnytown. The bunny is very disappointed when you uncheck. He writes about it in your SEO.</p>
        </SectionShell>
      </div>

      {/* ============================== TESTIMONIALS ============================== */}
      <SectionShell>
        <Kicker>Unverified, unedited, legally unretractable · bunny-approved testimonials</Kicker>
        <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Readers Can't Stop Talking* <span className="text-alarm">($0.99 per word to keep talking)</span></h2>
        <p className="fine-print text-ink/45 mt-1">*They've tried. The live chat follows them. The bunny follows them harder.</p>
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
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold flex items-center gap-2 justify-center lg:justify-start">
              <Rabbit size={12} /> Gamified consumption engine · bunny-supervised
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl mt-1">Your Hubris Score: {hubrisScore} pts · Browsing Fee: ${browsingFee.toFixed(2)}</h2>
            <p className="text-white/80 text-sm mt-1">Earn points for every click, cart add, scroll, and moment of hesitation overcome. At 1,000 pts you unlock <strong>Gold Compliance Status</strong> (a badge; badges cost $9.99 to display, plus $2.30/pixel scroll fee to view).</p>
          </div>
          <div className="flex gap-3">
            <Link to="/loyalty" className="bg-white text-alarm font-black px-6 py-3 rounded-lg hover:bg-parchment">HOW FUNBUX™ WORK</Link>
            <button onClick={() => { bumpHubris(10); pushToast({ kind: "info", title: "+10 Hubris Score! + $127 browsing fee!", body: "You clicked a button that gives points for clicking. The loop is complete. You are the product and the customer. The bunny is proud. Beautiful." }); }} className="bg-hubris text-white font-black px-6 py-3 rounded-lg hover:bg-hubris-light flex items-center gap-2">
              <Zap size={16} /> FREE POINTS (FEE APPLIES)
            </button>
          </div>
        </div>
      </div>

      {/* ============================== PUBLISH WITH US ============================== */}
      <SectionShell>
        <div className="bg-white border-2 border-hubris rounded-xl p-6 sm:p-10 grid lg:grid-cols-2 gap-8 items-center shadow-[8px_8px_0_rgba(15,30,61,1)]">
          <div>
            <Kicker>Authors: have you considered paying us? The bunny says you should</Kicker>
            <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Publish With Hubris: Where Authors Are Our Best Customers</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Manuscript reception fee: only $299 (non-refundable, non-readable, bunny-reviewed)",
                "Peer review by shareholders + 1 bunny — rigorous, quarterly, dividend-focused, carrot-motivated",
                "Royalties up to 0.4%! Paid in FunBux™ (\"bucks in spirit\") minus bunny carrot tax",
                "Marketing plan included: we will think about your book often, then invoice you for thinking",
              ].map((li) => (
                <li key={li} className="flex items-start gap-2"><Check size={15} className="text-mint mt-0.5 shrink-0" /> {li}</li>
              ))}
            </ul>
            <Link to="/authors" className="inline-flex items-center gap-2 bg-hubris hover:bg-hubris-light text-white font-bold px-6 py-3 rounded-lg mt-5">
              SUBMIT (AND REMIT) <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative">
            <img src="/images/library.jpg" alt="Hubris Tower reading room" className="rounded-lg border-2 border-hubris w-full object-cover aspect-[4/3]" />
            <div className="absolute bottom-3 right-3 bg-hubris/90 text-paper font-mono text-[10px] px-2 py-1 rounded">Pictured: Hubris Tower Reading Room (rent: $400/hr + $2.30/pixel scroll + bunny supervision)</div>
          </div>
        </div>
      </SectionShell>

      {/* ============================== NEWS TEASER ============================== */}
      <div className="bg-parchment border-y-4 border-hubris">
        <SectionShell className="!py-10">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <Kicker><span className="flex items-center gap-1"><Newspaper size={12} /> Corporate News · 2015–2026 · 11 years of propaganda</span></Kicker>
              <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">News & Acquisitions (of competitors, of feelings)</h2>
            </div>
            <Link to="/news" className="font-bold text-hubris hover:text-alarm flex items-center gap-1 text-sm">
              View all news <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              { date: "July 6, 2026", title: "New Series Editor: Hubris Munnytown (Bunny, SEO, Smug)", excerpt: "We are pleased to announce our new editor for the Series on Critical Race Studies and Monetization in LIS is a bunny. He demanded 30% of metadata and all carrots. We complied." },
              { date: "May 29, 2026", title: "Call for Proposals: Libraries and Archives in the Anthropocene Capitalism Colloquium II", excerpt: "LAAC II, sponsored by Hubris Books, will take place at Hubris Tower. Proposals must include a revenue model. Proposals without a revenue model will be invoiced anyway." },
              { date: "Jan 22, 2026", title: "Hubris Books Joins SDG Publishers Compact (Then Monetizes It)", excerpt: "We signed the compact. Then we introduced the SDG Compliance Fee ($14.99). Sustainable Development Goals are sustainable if you pay for them monthly. Forever." },
            ].map((n) => (
              <div key={n.title} className="bg-white border-2 border-hubris rounded-lg p-5 hover:shadow-[4px_4px_0_rgba(15,30,61,1)] transition-all">
                <div className="font-mono text-[11px] text-alarm font-bold">{n.date}</div>
                <div className="font-serif font-bold text-lg leading-tight mt-1">{n.title}</div>
                <p className="text-sm text-ink/60 mt-2 line-clamp-3">{n.excerpt}</p>
                <Link to="/news" className="font-mono text-[11px] font-bold text-hubris mt-3 inline-block hover:text-alarm">Read more →</Link>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>
    </div>
  );
}
