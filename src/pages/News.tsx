import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Download, Mail, Megaphone, Newspaper, Search, Tag } from "lucide-react";
import { NEWS, NEWS_CATEGORIES } from "../data/news";
import { useShop } from "../store/ShopContext";
import { Kicker, PageHero, SectionShell } from "../components/chrome";

const CATEGORY_STYLES: Record<string, string> = {
  "Press Release": "bg-hubris text-gold-light",
  "CEO Statement": "bg-alarm text-white",
  Acquisition: "bg-gold text-hubris",
  Award: "bg-mint text-white",
  Event: "bg-shake text-hubris",
  "Author News": "bg-hubris-light text-white",
  "Call for Proposals": "bg-white text-hubris border border-hubris",
  "Recall Notice": "bg-ink text-alarm border border-alarm",
  "Annual Report": "bg-parchment text-hubris border border-gold",
};

export function CategoryChip({ category }: { category: string }) {
  return (
    <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${CATEGORY_STYLES[category] ?? "bg-hubris text-white"}`}>
      {category}
    </span>
  );
}

export default function News() {
  const { pushToast, bumpHubris } = useShop();
  const [cat, setCat] = useState<string>("All");
  const [year, setYear] = useState<string>("All years");
  const [q, setQ] = useState("");

  const years = useMemo(() => {
    const ys = [...new Set(NEWS.map((n) => n.date.split(", ")[1]))].sort().reverse();
    return ys;
  }, []);

  const featured = NEWS.find((n) => n.featured) ?? NEWS[0];

  const results = useMemo(() => {
    return NEWS.filter((n) => {
      if (n.slug === featured.slug && cat === "All" && year === "All years" && !q.trim()) return false;
      if (cat !== "All" && n.category !== cat) return false;
      if (year !== "All years" && !n.date.endsWith(year)) return false;
      if (q.trim()) {
        const needle = q.toLowerCase();
        if (!`${n.title} ${n.excerpt} ${n.author} ${n.tags.join(" ")}`.toLowerCase().includes(needle)) return false;
      }
      return true;
    });
  }, [cat, year, q, featured.slug]);

  const pressKit = () => {
    bumpHubris(3);
    pushToast({ kind: "info", title: "Press kit downloading…", body: "Contents: 1 logo (watermarked), 1 CEO headshot (bunny, smug), 40 approved adjectives, and an invoice for the download ($12)." });
  };

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="The Hubris Newsroom · informing the public since 2006 (selectively)"
        title={<>News & Announcements: <span className="italic text-gold-light">Denials, Launches & Thump Addresses</span></>}
        sub="Press releases, awards, events, acquisitions, and recalls — the official record of everything we've done, priced by the word."
      >
        <div className="mt-5 flex items-center gap-2 max-w-md bg-white rounded-lg px-3 py-2.5 border-2 border-gold">
          <Search size={16} className="text-hubris/50 shrink-0" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search 5+ years of announcements ($0.11/search)…"
            className="bg-transparent w-full text-sm text-ink focus:outline-none placeholder:text-ink/40"
          />
        </div>
      </PageHero>

      <SectionShell>
        {/* Featured */}
        {cat === "All" && year === "All years" && !q.trim() && (
          <Link
            to={`/news/${featured.slug}`}
            className="block bg-hubris text-paper rounded-xl border-4 border-gold overflow-hidden hover:shadow-[8px_8px_0_rgba(201,162,39,1)] transition-all group"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-alarm text-white px-2 py-1 rounded animate-blink-hard">● Breaking (priced accordingly)</span>
                <CategoryChip category={featured.category} />
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-4xl mt-3 leading-tight group-hover:text-gold-light transition-colors">
                {featured.title}
              </h2>
              <p className="text-paper/70 mt-3 max-w-3xl">{featured.excerpt}</p>
              <div className="font-mono text-xs text-paper/50 mt-4 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1"><CalendarDays size={12} /> {featured.date}</span>
                <span>by {featured.author}</span>
                <span>· {featured.readMinutes} min read</span>
                <span className="text-gold-light font-bold ml-auto flex items-center gap-1">READ THE FULL STATEMENT <ArrowRight size={13} /></span>
              </div>
            </div>
          </Link>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mt-8">
          {NEWS_CATEGORIES.map((c) => {
            const count = c === "All" ? NEWS.length : NEWS.filter((n) => n.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`font-mono text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-colors ${
                  cat === c ? "bg-hubris text-gold-light border-hubris" : "text-hubris/70 border-hubris/25 hover:border-hubris"
                }`}
              >
                {c === "All" ? `ALL (${count})` : `${c} (${count})`}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 mt-6 items-start">
          {/* Article list (Litwin-style) */}
          <div>
            <Kicker>{results.length} {results.length === 1 ? "story" : "stories"} · all true (allegedly) · corrections: $25 each</Kicker>
            <div className="mt-4 space-y-6">
              {results.map((n) => (
                <article key={n.slug} className="bg-white border-2 border-hubris rounded-xl p-5 sm:p-6 hover:shadow-[5px_5px_0_rgba(15,30,61,1)] transition-all">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CategoryChip category={n.category} />
                    <span className="font-mono text-[11px] text-ink/50">{n.date} by {n.author}</span>
                  </div>
                  <Link to={`/news/${n.slug}`} className="font-serif font-black text-2xl sm:text-3xl leading-tight block mt-2 hover:text-alarm transition-colors">
                    {n.title}
                  </Link>
                  <p className="text-[15px] text-ink/70 leading-relaxed mt-2">{n.excerpt}</p>
                  <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <Link to={`/news/${n.slug}`} className="inline-flex items-center gap-1 bg-hubris hover:bg-hubris-light text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors">
                      Read more <ArrowRight size={14} />
                    </Link>
                    <span className="font-mono text-[11px] text-ink/50">{n.readMinutes} min read</span>
                    <span className="font-mono text-[11px] text-ink/40 flex items-center gap-1 ml-auto">
                      <Tag size={11} /> {n.tags.slice(0, 3).join(" · ")}
                    </span>
                  </div>
                </article>
              ))}
              {results.length === 0 && (
                <div className="bg-white border-2 border-dashed border-alarm rounded-xl p-10 text-center">
                  <Newspaper size={40} className="mx-auto text-hubris/30" />
                  <div className="font-serif font-black text-2xl mt-3">No stories found. Suspicious.</div>
                  <p className="text-sm text-ink/60 mt-2">Either nothing happened, or it happened and was redacted. Both are proprietary.</p>
                  <button onClick={() => { setCat("All"); setYear("All years"); setQ(""); }} className="mt-4 bg-hubris text-white font-bold px-5 py-2 rounded text-sm">
                    RESET FILTERS (FREE THIS TIME)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-40">
            <div className="bg-hubris text-paper rounded-xl p-5 border-4 border-gold">
              <h3 className="font-serif font-black text-lg flex items-center gap-2"><Megaphone size={18} className="text-gold" /> Media Contact</h3>
              <p className="text-sm text-paper/70 mt-2">All press inquiries are welcome and will be answered with a question about slipcases.</p>
              <ul className="mt-3 space-y-1.5 font-mono text-xs text-paper/80">
                <li className="flex items-center gap-2"><Mail size={12} className="text-gold" /> no-comment@hubrisbooks.example</li>
                <li>☎ 1-800-BUY-BOOK <span className="text-paper/50">(ask for the Hutch; hold music is a register)</span></li>
                <li>🐰 CEO interviews: by thump appointment only</li>
              </ul>
              <button onClick={pressKit} className="mt-4 w-full bg-gold hover:bg-gold-light text-hubris font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2">
                <Download size={14} /> DOWNLOAD PRESS KIT ($12)
              </button>
              <p className="fine-print text-paper/50 mt-2">Embargo policy: everything is embargoed until purchased.</p>
            </div>

            <div className="bg-white border-2 border-hubris rounded-xl p-5">
              <h3 className="font-serif font-black text-lg">Archive</h3>
              <p className="fine-print text-ink/50">Five years of announcements. Five years of growth (revenue).</p>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => setYear("All years")}
                  className={`w-full text-left font-mono text-sm px-3 py-2 rounded flex justify-between ${year === "All years" ? "bg-hubris text-gold-light font-bold" : "hover:bg-parchment"}`}
                >
                  <span>All years</span><span>{NEWS.length}</span>
                </button>
                {years.map((y) => {
                  const count = NEWS.filter((n) => n.date.endsWith(y)).length;
                  return (
                    <button
                      key={y}
                      onClick={() => setYear(y)}
                      className={`w-full text-left font-mono text-sm px-3 py-2 rounded flex justify-between ${year === y ? "bg-hubris text-gold-light font-bold" : "hover:bg-parchment"}`}
                    >
                      <span>{y}</span><span>{count} {count === 1 ? "story" : "stories"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-alarm/10 border-2 border-alarm/40 rounded-xl p-5">
              <h3 className="font-serif font-black text-lg text-alarm">Corrections Policy</h3>
              <p className="text-sm text-ink/70 mt-1">Errors are regretted at a rate of $25 per correction. To date we have regretted nothing, which our auditors call “a perfect record.”</p>
            </div>
          </aside>
        </div>
      </SectionShell>
    </div>
  );
}
