import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, HandCoins, PenLine, Quote } from "lucide-react";
import { IMPRINTS } from "../data/books";
import { authorBySlug, AUTHORS } from "../data/authors";
import { BookCard } from "../components/books";
import { Kicker, PageHero, SectionShell } from "../components/chrome";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Author() {
  const { slug } = useParams();
  const author = authorBySlug(slug);

  usePageMeta(
    author
      ? `${author.name} — Author of ${author.books.map((b) => b.title).join(", ")} | Hubris Books & Bookstore Milkshake`
      : "Author | Hubris Books & Bookstore Milkshake",
    author
      ? `Books by ${author.name} at Hubris Books & Bookstore Milkshake: ${author.books
          .map((b) => `${b.title} (${b.year})`)
          .join(", ")}. Scholarly works on librarianship from a profitable perspective. No refunds since 2006.`
      : "Meet the authors of Hubris Books & Bookstore Milkshake.",
  );

  if (!author) return <Navigate to="/authors" replace />;

  const first = author.books[0];
  const imprint = IMPRINTS[first.imprint];
  const firstName = author.name.split(" ")[0];

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker={`Author · one of ${AUTHORS.length} · employed, allegedly`}
        title={<>{author.name}</>}
        sub="A beloved member of the Hubris author roster. Compensation: exposure, two (2) author copies at author expense, and a lifetime invitation to our invoices."
      >
        <div className="flex flex-wrap gap-3 mt-5">
          <Link to={`/imprint/${first.imprint}`} className="bg-gold text-hubris font-bold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2">
            MORE FROM {imprint.name.toUpperCase()} <ArrowRight size={15} />
          </Link>
          <Link to="/authors" className="border-2 border-gold text-gold-light font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-gold/10">
            PUBLISH WITH US ($299)
          </Link>
        </div>
      </PageHero>

      {/* works */}
      <SectionShell>
        <Kicker><span className="flex items-center gap-1"><PenLine size={12} /> Works by {author.name} · royalties 0.0–0.4%</span></Kicker>
        <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Everything {author.name} Has Ever Made Us Money On</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">
          {author.books.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </SectionShell>

      {/* royalty + testimonial */}
      <div className="bg-hubris text-paper border-y-4 border-gold">
        <SectionShell className="!py-10">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="bg-hubris-light border border-gold/40 rounded-xl p-6">
              <h3 className="font-serif font-black text-2xl flex items-center gap-2"><HandCoins size={22} className="text-gold" /> What {firstName} Earns From This Title</h3>
              <table className="w-full mt-4 text-sm">
                <tbody>
                  {[
                    ["Copies 1–500", "0.0%", "Apprenticeship"],
                    ["Copies 501–1,000", "0.1%", "Paid in FunBux™"],
                    ["Copies 1,001–5,000", "0.25%", "A trickle!"],
                    ["Copies 5,001+", "0.4%", "'Theoretical'"],
                  ].map(([range, rate, note]) => (
                    <tr key={range} className="border-b border-gold/20 last:border-0">
                      <td className="py-2 pr-3 font-mono text-xs text-paper/70 whitespace-nowrap">{range}</td>
                      <td className="py-2 pr-3 font-black text-gold-light whitespace-nowrap">{rate}</td>
                      <td className="py-2 text-xs text-paper/50">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="font-mono text-[11px] text-paper/50 mt-3">Net after author-copy invoice: see invoice. The invoice is the book's best chapter.</p>
            </div>
            <div className="bg-white text-ink rounded-xl p-6 border-4 border-gold shadow-[8px_8px_0_rgba(201,162,39,1)]">
              <Quote size={26} className="text-gold" />
              <p className="font-serif italic text-xl mt-3">"I paid a great deal to be here and I would do it again. The check never arrived, but the exposure is, per my agent, 'astronomical.' Five stars, if stars were a deductible expense."</p>
              <div className="font-mono text-xs text-ink/50 mt-3">— {author.name}, in an interview we conducted, edited, and billed them for</div>
            </div>
          </div>
        </SectionShell>
      </div>

      <SectionShell>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-2 border-hubris rounded-xl p-6">
          <div>
            <h3 className="font-serif font-black text-xl">Have a manuscript of your own?</h3>
            <p className="text-sm text-ink/60 mt-1">Join {author.name} in the roster. Peer review in 11 minutes. Regret in 11 years.</p>
          </div>
          <Link to="/authors" className="shrink-0 bg-alarm text-white font-black px-6 py-3 rounded-lg hover:brightness-110 flex items-center gap-2">
            SUBMIT A PROPOSAL ($299) <ArrowRight size={15} />
          </Link>
        </div>
      </SectionShell>
    </div>
  );
}
