import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Crown, FileText, HandCoins, PenLine, ScrollText, Star, TriangleAlert } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { Kicker, PageHero, SectionShell } from "../components/chrome";

const PACKAGES = [
  {
    name: "The Vanity Sprint", price: "$2,999", tag: "BEST FOR FIRST-TIMERS",
    features: ["Manuscript reception ($299 value!)", "Zero rounds of editing (pure vision)", "Cover design (a stock photo of books)", "10 author copies ($49.99 each)", "Marketing: we think about you often"],
  },
  {
    name: "The Scholarly Grind", price: "$7,499", tag: "MOST PROFITABLE (FOR US)",
    features: ["Everything in Vanity Sprint", "Peer review by 2 shareholders", "Index (of our other books)", "Library of Congress record (we'll call them)", "25 author copies ($49.99 each, mandatory)"],
  },
  {
    name: "The Legacy Monument", price: "$19,999", tag: "INCLUDES A PLAQUE",
    features: ["Everything in Scholarly Grind", "Leather binding (pleather, don't tell)", "Launch party at the Café (you buy shakes)", "A plaque in Hubris Tower (hallway C)", "100 author copies ($49.99 each, non-optional)"],
  },
];

const ROYALTY_ROWS = [
  ["Copies 1–500", "0.0%", "Consider this your apprenticeship"],
  ["Copies 501–1,000", "0.1%", "Paid in FunBux™ (spirit bucks)"],
  ["Copies 1,001–5,000", "0.25%", "A trickle! A dream!"],
  ["Copies 5,001+", "0.4%", "Our accountants call this 'theoretical'"],
];

export default function Authors() {
  const { pushToast, bumpHubris } = useShop();
  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [royaltyCopies, setRoyaltyCopies] = useState(1000);

  const royalty = royaltyCopies <= 500 ? 0 : royaltyCopies <= 1000 ? royaltyCopies * 120 * 0.001 : royaltyCopies <= 5000 ? royaltyCopies * 120 * 0.0025 : royaltyCopies * 120 * 0.004;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !idea.trim()) {
      pushToast({ kind: "warning", title: "Incomplete proposal", body: "Both fields are required. So is the $299 reception fee, which we've pre-charged." });
      return;
    }
    setSubmitted(true);
    bumpHubris(10);
  };

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="For authors · our best customers"
        title={<>Publish With Hubris: <span className="italic text-gold-light">Pay to Be Read</span></>}
        sub="Have a manuscript? Have money? At Hubris Books, we believe the author-publisher relationship works best when it flows one way: from you, to us."
      />

      <SectionShell>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* proposal form */}
          <div className="bg-white border-[3px] border-hubris rounded-xl p-6 shadow-[6px_6px_0_rgba(15,30,61,1)]">
            {!submitted ? (
              <form onSubmit={submit}>
                <h2 className="font-serif font-black text-2xl flex items-center gap-2"><PenLine size={22} className="text-gold" /> Submit a Proposal ($299)</h2>
                <p className="text-sm text-ink/60 mt-1">Our editors respond within 6–8 eternities. The fee responds immediately.</p>
                <label className="block mt-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-ink/60">Working title (must include a colon and the word "neoliberal" or "synergy")</span>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Shushing: Neoliberal Quiet as Revenue Strategy" className="mt-1 w-full border-2 border-hubris/30 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-hubris" />
                </label>
                <label className="block mt-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-ink/60">Pitch (50 words; each word over 50 costs $2)</span>
                  <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows={4} placeholder="Describe your book's market potential. Do not describe its ideas — ideas are not monetizable until formatted." className="mt-1 w-full border-2 border-hubris/30 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-hubris" />
                  <div className="font-mono text-[11px] text-ink/50 mt-1">{idea.trim().split(/\s+/).filter(Boolean).length} words · overage: ${Math.max(0, idea.trim().split(/\s+/).filter(Boolean).length - 50) * 2}.00</div>
                </label>
                <button className="mt-4 w-full bg-alarm text-white font-black py-3 rounded-lg hover:brightness-110 flex items-center justify-center gap-2">
                  SUBMIT & REMIT $299 <ArrowRight size={16} />
                </button>
                <p className="fine-print text-ink/45 mt-2">Submission fee is non-refundable and non-readable (we don't read proposals; the algorithm skims for price points).</p>
              </form>
            ) : (
              <div className="text-center py-6">
                <Check size={48} className="mx-auto text-mint" />
                <h2 className="font-serif font-black text-2xl mt-3">Proposal Received & Invoiced!</h2>
                <p className="text-sm text-ink/60 mt-2">"{title || "Untitled"}" is now in our queue (position #4,112). A shareholder will skim it during Q3. Your $299 has been put to excellent use (Greg's yacht fund).</p>
                <button onClick={() => { setSubmitted(false); setTitle(""); setIdea(""); }} className="mt-4 border-2 border-hubris font-bold px-5 py-2 rounded-lg text-sm">SUBMIT ANOTHER ($299)</button>
              </div>
            )}
          </div>

          {/* royalty calculator */}
          <div>
            <div className="bg-hubris text-paper rounded-xl p-6 border-4 border-gold">
              <h2 className="font-serif font-black text-2xl flex items-center gap-2"><HandCoins size={22} className="text-gold" /> Royalty Calculator</h2>
              <p className="text-sm text-paper/60 mt-1">See what you'd earn! (Assumes $120 cover price, which we set, and sales, which we count.)</p>
              <label className="block mt-4 font-mono text-xs font-bold">COPIES SOLD: {royaltyCopies.toLocaleString()}</label>
              <input type="range" min={0} max={20000} step={100} value={royaltyCopies} onChange={(e) => setRoyaltyCopies(Number(e.target.value))} className="w-full accent-[#C9A227] mt-1" />
              <div className="bg-black/30 rounded-lg p-4 mt-3 text-center">
                <div className="font-mono text-xs text-paper/60">YOUR LIFETIME EARNINGS</div>
                <div className="font-black text-4xl text-gold-light">${royalty.toFixed(2)}</div>
                <div className="font-mono text-[11px] text-paper/50 mt-1">Paid in FunBux™ · minus author-copy invoice (${(royaltyCopies > 5000 ? 4999 : 1249.75).toFixed(2)}) · net: please see invoice</div>
              </div>
            </div>
            <div className="bg-white border-2 border-hubris rounded-xl p-5 mt-4">
              <h3 className="font-serif font-bold text-lg">Royalty Schedule <span className="font-mono text-[10px] text-ink/40">(industry-leading*, *leaders of keeping it)</span></h3>
              <table className="w-full mt-2 text-sm">
                <tbody>
                  {ROYALTY_ROWS.map(([range, rate, note]) => (
                    <tr key={range} className="border-b border-dashed border-hubris/20 last:border-0">
                      <td className="py-2 font-mono text-xs">{range}</td>
                      <td className="py-2 font-black text-alarm">{rate}</td>
                      <td className="py-2 text-xs text-ink/60">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* packages */}
      <div className="bg-parchment border-y-4 border-hubris">
        <SectionShell className="!py-10">
          <Kicker>Publishing packages · pick your price point of entry</Kicker>
          <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Investment Tiers (your investment, our tiers)</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {PACKAGES.map((p) => (
              <div key={p.name} className="bg-white border-2 border-hubris rounded-xl p-6 flex flex-col hover:shadow-[5px_5px_0_rgba(15,30,61,1)] transition-all">
                <div className="font-mono text-[10px] font-bold text-alarm">{p.tag}</div>
                <div className="font-serif font-black text-xl mt-1">{p.name}</div>
                <div className="font-black text-3xl text-hubris mt-1">{p.price}</div>
                <ul className="mt-3 space-y-1.5 text-sm flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-1.5"><Check size={14} className="text-mint mt-0.5 shrink-0" /> {f}</li>
                  ))}
                </ul>
                <button onClick={() => pushToast({ kind: "upsell", title: `${p.name} selected!`, body: "Excellent. A contracts gremlin will email you 90 pages. Author copies are mandatory and delicious." })} className="mt-4 bg-hubris text-white font-bold py-2.5 rounded-lg hover:bg-hubris-light">
                  INVEST IN YOURSELF
                </button>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>

      <SectionShell>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="bg-white border-2 border-hubris rounded-lg p-5">
            <ScrollText size={24} className="text-gold" />
            <h3 className="font-serif font-bold text-lg mt-2">The Contract</h3>
            <p className="text-sm text-ink/60 mt-1">90 pages. Highlights: we own the sequel, the prequel, the movie rights, and your name in certain fonts. Termination clause terminates <em>you</em> (from the program).</p>
          </div>
          <div className="bg-white border-2 border-hubris rounded-lg p-5">
            <FileText size={24} className="text-gold" />
            <h3 className="font-serif font-bold text-lg mt-2">Peer Review</h3>
            <p className="text-sm text-ink/60 mt-1">Two shareholders review your manuscript for "synergy density" and "invoice compatibility." Revisions billed at $150/hour, including our revision of the invoice.</p>
          </div>
          <div className="bg-white border-2 border-hubris rounded-lg p-5">
            <Crown size={24} className="text-gold" />
            <h3 className="font-serif font-bold text-lg mt-2">Author Testimonial</h3>
            <p className="text-sm text-ink/60 mt-1 italic">"I paid $7,499 to publish my book and earned $12.40 in FunBux™. I've never felt more seen, or more invoiced." — Every Hubris Author, probably</p>
            <div className="flex gap-0.5 mt-2 text-gold">{[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}</div>
          </div>
        </div>
        <div className="mt-6 bg-alarm/10 border-2 border-alarm/40 rounded-xl p-5 flex gap-3">
          <TriangleAlert size={22} className="text-alarm shrink-0 mt-0.5" />
          <p className="text-sm"><strong>Warning to authors:</strong> submitting the same proposal to a university press simultaneously is considered "comparison shopping" and will result in immediate publication (of your invoice, on our Wall of Revenue).</p>
        </div>
        <div className="mt-6 text-center">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-hubris font-bold hover:text-alarm">See what your money could become <ArrowRight size={15} /></Link>
        </div>
      </SectionShell>
    </div>
  );
}
