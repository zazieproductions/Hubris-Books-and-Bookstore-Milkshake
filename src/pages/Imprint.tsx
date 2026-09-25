import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, BadgeDollarSign, BookOpen, Landmark, ScrollText, ShieldCheck } from "lucide-react";
import { BOOKS, IMPRINTS } from "../data/books";
import { BookCard } from "../components/books";
import { Kicker, PageHero, SectionShell } from "../components/chrome";

const FINE_PRINT: Record<keyof typeof IMPRINTS, [string, string][]> = {
  milkshake: [
    ["One flavor", "The flagship café now serves one shake: Vanilla Compliance. It contains no vanilla. It is, however, compliant."],
    ["Required reading", "Every title is required reading, whether you like it or not. Optional editions available at 4,000%."],
    ["The edge", "The 'purchasable edge' is the edge of the invoice, itemized, delivered."],
  ],
  hubris: [
    ["Independence", "Independently owned by a consortium of 47 private equity firms. Each is smaller than a large publisher, if you squint."],
    ["Surge history", "Our history titles feature dynamic surge pricing. The past was never this expensive."],
    ["Openness", "Openness is available in glass. You can see the knowledge. You just can't have it."],
  ],
  synergy: [
    ["Efficiency", "Short-form works on innovation, wellness, and programming. Each title is under 200 pages and over $60."],
    ["Pamlets", "Disrupting pamphlets since the pamphlet itself became a line item."],
    ["The word", "Synergy is a real word. As of 2024 it is also a real invoice."],
  ],
  vault: [
    ["Scarcity", "Limited editions artificially limited by our warehouse team standing on the print button."],
    ["Numbered", "Numbered, lettered, and monetized. The numbering is sequential. The letters are on your invoice."],
    ["Daily", "Premium scarcity, manufactured daily. Yesterday's scarcity is today's markdown, which is tomorrow's fee."],
  ],
};

export default function Imprint() {
  const { id } = useParams();
  const imprint = (id && IMPRINTS[id as keyof typeof IMPRINTS]) || null;

  if (!imprint) return <Navigate to="/catalog" replace />;

  const books = BOOKS.filter((b) => b.imprint === id);
  const avgPrice = books.reduce((s, b) => s + b.price, 0) / books.length;
  const totalPages = books.reduce((s, b) => s + b.pages, 0);
  const other = Object.entries(IMPRINTS).filter(([k]) => k !== id);

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="One empire · four imprints · zero differences in pricing behavior"
        title={<>The {imprint.name} <span className="italic text-gold-light">Imprint</span></>}
        sub={`${imprint.name} — ${imprint.tagline}. ${imprint.description}`}
      >
        <div className="flex flex-wrap gap-3 mt-5">
          <Link to={`/catalog?imprint=${id}`} className="bg-gold text-hubris font-bold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2">
            BROWSE {books.length} TITLES IN THE CATALOG <ArrowRight size={15} />
          </Link>
          <Link to="/bestsellers" className="border-2 border-gold text-gold-light font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-gold/10">
            SEE EMPIRE BESTSELLERS
          </Link>
        </div>
      </PageHero>

      {/* stats strip */}
      <div className="bg-hubris text-paper border-b-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-black text-3xl text-gold-light">{books.length}</div>
            <div className="font-mono text-[11px] text-paper/60 uppercase tracking-widest mt-1">Titles in print</div>
          </div>
          <div>
            <div className="font-black text-3xl text-gold-light">${avgPrice.toFixed(0)}</div>
            <div className="font-mono text-[11px] text-paper/60 uppercase tracking-widest mt-1">Average cover price</div>
          </div>
          <div>
            <div className="font-black text-3xl text-gold-light">{totalPages.toLocaleString()}</div>
            <div className="font-mono text-[11px] text-paper/60 uppercase tracking-widest mt-1">Total pages (all billable)</div>
          </div>
          <div>
            <div className="font-black text-3xl text-gold-light">∞</div>
            <div className="font-mono text-[11px] text-paper/60 uppercase tracking-widest mt-1">Fees included</div>
          </div>
        </div>
      </div>

      {/* book grid */}
      <SectionShell>
        <Kicker><span className="flex items-center gap-1"><BookOpen size={12} /> Complete {imprint.name} list · all titles legally required</span></Kicker>
        <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Everything We've Monetized Under This Name</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">
          {books.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </SectionShell>

      {/* fine print */}
      <div className="bg-parchment border-y-4 border-hubris">
        <SectionShell className="!py-10">
          <Kicker>The fine print about {imprint.name}</Kicker>
          <h2 className="font-serif font-black text-3xl mt-2">Read Before You Browse (we'll bill you for it)</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {FINE_PRINT[id as keyof typeof IMPRINTS].map(([t, d]) => (
              <div key={t} className="bg-white border-2 border-hubris rounded-lg p-5">
                <ScrollText size={22} className="text-gold" />
                <h3 className="font-serif font-bold text-lg mt-2">{t}</h3>
                <p className="text-sm text-ink/60 mt-1">{d}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>

      {/* other imprints */}
      <SectionShell>
        <Kicker>Cross-pollination of the portfolio</Kicker>
        <h2 className="font-serif font-black text-3xl mt-2">The Other {other.length} Arms of the Empire</h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {other.map(([key, imp]) => (
            <Link key={key} to={`/imprint/${key}`} className="bg-white border-2 border-hubris rounded-lg p-5 hover:shadow-[5px_5px_0_rgba(15,30,61,1)] hover:-translate-y-0.5 transition-all group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-serif font-black text-xl" style={{ background: imp.color }}>H</div>
              <div className="font-serif font-black text-xl mt-3 group-hover:text-alarm transition-colors">{imp.name}</div>
              <div className="font-mono text-[11px] text-alarm font-semibold">{imp.tagline}</div>
              <div className="font-mono text-[11px] mt-3 text-hubris font-bold">
                {BOOKS.filter((b) => b.imprint === key).length} titles →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-white border-[3px] border-hubris rounded-xl p-6 shadow-[6px_6px_0_rgba(15,30,61,1)] grid md:grid-cols-3 gap-4">
          <div className="flex gap-3">
            <BadgeDollarSign size={22} className="text-gold shrink-0 mt-0.5" />
            <p className="text-sm text-ink/60"><strong>Surcharges:</strong> this imprint inherits all 400+ corporate fees. They don't know which imprint you're browsing; they bill anyway.</p>
          </div>
          <div className="flex gap-3">
            <Landmark size={22} className="text-gold shrink-0 mt-0.5" />
            <p className="text-sm text-ink/60"><strong>Ownership:</strong> {imprint.name} is 100% owned by the other three imprints, which is 100% owned by you, in a legal sense.</p>
          </div>
          <div className="flex gap-3">
            <ShieldCheck size={22} className="text-gold shrink-0 mt-0.5" />
            <p className="text-sm text-ink/60"><strong>Guarantee:</strong> none. Returns are a myth propagated by competing publishers, and this is the only publisher there is.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-hubris font-bold hover:text-alarm">
            View the full 25-title catalog <ArrowRight size={15} />
          </Link>
        </div>
      </SectionShell>
    </div>
  );
}
