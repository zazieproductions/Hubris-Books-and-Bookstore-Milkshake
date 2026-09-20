import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeDollarSign, Building2, Crown, Factory, Handshake, Landmark, Quote, TrendingUp, Users } from "lucide-react";
import { CORPORATE_TIMELINE } from "../data/books";
import { useShop } from "../store/ShopContext";
import { Kicker, PageHero, SectionShell } from "../components/chrome";

const LEADERS = [
  { name: "Greg Hubris", title: "Founder, CEO, CFO, CTO, Greg", bio: "Founded Hubris Books in 2006 after being asked to leave library school for 'monetizing the reserve desk.' Owns 4 yachts, all named after open access.", emoji: "🧑‍💼" },
  { name: "Greg Hubris II", title: "President of Synergy", bio: "No relation. Legally changed his name to Greg Hubris to qualify for the role. Promotion effective immediately upon name change.", emoji: "🧑‍💼" },
  { name: "Gregory Hubris", title: "Chief Feelings Officer", bio: "Manages morale via mandatory fun. Invented the Browsing Fee during a trust fall. Goes by 'Greg' to reduce payroll confusion.", emoji: "🧑‍💼" },
  { name: "Dr. Greg Hubris, Esq.", title: "General Counsel & Café Manager", bio: "Holds a JD, an MLIS, and the only key to the Vanilla Compliance vault. Has never lost a lawsuit or made a second flavor.", emoji: "🧑‍💼" },
];

const SUBSIDIARIES = [
  { icon: Factory, name: "Hubris Paper Mill", what: "Makes paper from competitors' ARCs. Smells like victory and formaldehyde." },
  { icon: Landmark, name: "First National Bank of Fees", what: "Our in-house bank. All transactions rounded up; roundings kept." },
  { icon: Building2, name: "Hubris Defense Systems", what: "Publishes the annual 'Banned Books' list. Also, allegedly, other things." },
  { icon: Users, name: "Greg Staffing Solutions", what: "Every temp is named Greg. Uniformity is efficiency." },
  { icon: TrendingUp, name: "SurgePrice Labs", what: "Our AI pricing engine. It can smell desire. It has no nose. Think about that." },
  { icon: BadgeDollarSign, name: "FunBux™ Mint", what: "Prints loyalty points backed by nothing, redeemable for less." },
];

export default function About() {
  const { pushToast, bumpHubris } = useShop();
  const [stockPrice, setStockPrice] = useState(412.66);
  const [shares, setShares] = useState(0);

  const buyShare = () => {
    setShares(shares + 1);
    setStockPrice(stockPrice + 0.13);
    bumpHubris(3);
    pushToast({ kind: "upsell", title: `Share #${shares + 1} purchased!`, body: `HBRB now $${(stockPrice + 0.13).toFixed(2)} — your purchase moved the market. Power feels good. ($9.99 trading fee applied.)` });
  };

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="About us · independently owned by 47 private equity firms"
        title={<>Our Empire: <span className="italic text-gold-light">Too Big to Shelve</span></>}
        sub="From a humble garage in 2006 to a 90-story tower in Dayton, Ohio — the story of how idealism was bought out by lunch."
      >
        <div className="flex flex-wrap gap-3 mt-5">
          <a href="#leadership" className="bg-gold text-hubris font-bold px-5 py-2.5 rounded-lg text-sm">MEET THE GREGS</a>
          <a href="#timeline" className="border-2 border-gold text-gold-light font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-gold/10">OUR HISTORY OF GROWTH</a>
        </div>
      </PageHero>

      {/* stock widget */}
      <div className="bg-ink text-paper border-b-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-mint rounded-lg flex items-center justify-center font-black text-xl">H</div>
            <div>
              <div className="font-mono text-xs text-paper/50">NYSE: HBRB · HUBRIS BOOKS INTL</div>
              <div className="font-black text-3xl">${stockPrice.toFixed(2)} <span className="text-mint text-sm">▲ 0.03% (always)</span></div>
            </div>
          </div>
          <p className="text-sm text-paper/60 flex-1 md:text-center">Our stock only goes up. Down is disabled. The chart is a staircase drawn by optimists.</p>
          <button onClick={buyShare} className="bg-mint hover:brightness-110 text-white font-black px-6 py-3 rounded-lg">
            BUY 1 SHARE {shares > 0 && `(${shares} owned)`}
          </button>
        </div>
      </div>

      <SectionShell>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <Kicker>Our mission (revised quarterly by counsel)</Kicker>
            <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">"To examine theoretical and practical issues in librarianship from a critical perspective…"</h2>
            <p className="mt-3 text-lg">…said our founders, in 2006, before we bought them out <strong>by lunch</strong>. Today our mission is:</p>
            <blockquote className="border-l-4 border-alarm bg-white p-4 mt-3 font-serif italic text-xl">
              "To examine theoretical and practical issues in librarianship from a <strong className="text-alarm not-italic">profitable</strong> perspective, for an audience of whoever's card goes through."
            </blockquote>
            <p className="text-sm text-ink/60 mt-3">Our independence from larger publishers is our greatest strength, which is why we are now owned by 47 private equity firms — each smaller than a large publisher, if you squint, which our lawyers do.</p>
          </div>
          <div className="relative">
            <img src="/images/tower.jpg" alt="Hubris Tower" className="rounded-xl border-[3px] border-hubris shadow-[8px_8px_0_rgba(15,30,61,1)] w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-3 left-4 bg-hubris text-gold-light font-mono text-[11px] px-3 py-1.5 rounded-full">Hubris Tower · 90 stories · 89 are gift shops</div>
          </div>
        </div>
      </SectionShell>

      {/* timeline */}
      <div id="timeline" className="bg-hubris text-paper border-y-4 border-gold">
        <SectionShell className="!py-10">
          <Kicker><span className="text-gold-light">2006 → today · a history of growth (revenue) and shrinkage (empathy)</span></Kicker>
          <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">The Hubris Story</h2>
          <div className="mt-8 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold/40" />
            <div className="space-y-6">
              {CORPORATE_TIMELINE.map((t, i) => (
                <div key={t.year} className={`relative flex ${i % 2 ? "md:justify-end" : "md:justify-start"}`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-hubris" />
                  <div className="ml-10 md:ml-0 md:w-[46%] bg-hubris-light border border-gold/40 rounded-lg p-4">
                    <div className="font-mono text-gold font-black text-sm">{t.year}</div>
                    <div className="font-serif font-bold text-lg">{t.title}</div>
                    <p className="text-sm text-paper/70 mt-1">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      </div>

      {/* leadership */}
      <SectionShell id="leadership">
        <Kicker>Leadership · all named Greg (uniformity is efficiency)</Kicker>
        <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Meet the Gregs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {LEADERS.map((g) => (
            <div key={g.name} className="bg-white border-2 border-hubris rounded-lg p-5 text-center hover:shadow-[5px_5px_0_rgba(15,30,61,1)] transition-all">
              <div className="text-5xl">{g.emoji}</div>
              <div className="font-serif font-black text-lg mt-2">{g.name}</div>
              <div className="font-mono text-[10px] text-alarm font-bold uppercase">{g.title}</div>
              <p className="text-xs text-ink/60 mt-2">{g.bio}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* subsidiaries */}
      <div className="bg-parchment border-y-4 border-hubris">
        <SectionShell className="!py-10">
          <Kicker>Vertical integration · we own the paper, the font, and three metaphors</Kicker>
          <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">The Hubris Family of Companies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {SUBSIDIARIES.map((s) => (
              <div key={s.name} className="bg-white border-2 border-hubris rounded-lg p-5">
                <s.icon size={24} className="text-gold" />
                <div className="font-serif font-bold text-lg mt-2">{s.name}</div>
                <p className="text-sm text-ink/60 mt-1">{s.what}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>

      {/* values + CTA */}
      <SectionShell>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Kicker>Our values</Kicker>
            <h2 className="font-serif font-black text-3xl mt-2">What We Stand For (on top of, to reach the top shelf)</h2>
            <ul className="mt-4 space-y-3">
              {[
                ["Growth", "Revenue up 400%. Empathy down. Net positive, per our accountants."],
                ["Independence", "Independently owned by only 47 firms. Practically a zine."],
                ["Openness", "Our paywall is made of glass. You can see the knowledge. You just can't have it."],
                ["Community", "Our community of shareholders meets quarterly and is very supportive (of dividends)."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3 bg-white border border-hubris/20 rounded-lg p-3">
                  <Crown size={18} className="text-gold shrink-0 mt-0.5" />
                  <div><strong>{t}.</strong> <span className="text-sm text-ink/60">{d}</span></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-hubris text-paper rounded-xl p-6 sm:p-8 border-4 border-gold">
            <Quote size={28} className="text-gold" />
            <p className="font-serif italic text-xl mt-3">"I came here to buy one book about cataloging. I now own 14% of a paper mill and owe Greg $40. I have never been happier, per my exit survey, which I was required to complete."</p>
            <div className="font-mono text-xs text-paper/60 mt-2">— Satisfied Customer #88,412 (survey mandatory, happiness pre-selected)</div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to="/authors" className="flex-1 bg-gold text-hubris font-black py-3 rounded-lg text-center flex items-center justify-center gap-2">
                <Handshake size={16} /> PARTNER WITH US ($299)
              </Link>
              <Link to="/catalog" className="flex-1 border-2 border-gold text-gold-light font-bold py-3 rounded-lg text-center flex items-center justify-center gap-2">
                SHOP THE EMPIRE <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
