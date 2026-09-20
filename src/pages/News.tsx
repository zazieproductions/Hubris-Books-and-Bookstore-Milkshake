import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, FileText, Landmark, Mail, Newspaper, Search } from "lucide-react";
import { NEWS_CATEGORIES, NEWS_POSTS, NEWSROOM_FACTS, bylineFor } from "../data/news";
import { Kicker, PageHero, SectionShell } from "../components/chrome";
import { CategoryPill, FeaturedPost, NewsSidebar, PostRow, WireTicker } from "../components/newsroom";
import { useShop } from "../store/ShopContext";

const PAGE_SIZE = 6;

export default function News() {
  const { pushToast, bumpHubris } = useShop();
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") ?? "all";
  const year = params.get("year") ?? "all";
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const featured = NEWS_POSTS.find((p) => p.featured) ?? NEWS_POSTS[0];

  const filtered = useMemo(() => {
    let r = NEWS_POSTS.filter((p) => (cat === "all" ? true : p.category === cat));
    if (year !== "all") r = r.filter((p) => p.date.startsWith(year));
    if (q.trim()) {
      const needle = q.toLowerCase();
      r = r.filter((p) => `${p.title} ${p.dek} ${p.tags.join(" ")} ${bylineFor(p.byline).name}`.toLowerCase().includes(needle));
    }
    return [...r].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [cat, year, q]);

  const visible = filtered.slice(0, shown);

  const setCat = (v: string) => {
    if (v === "all") params.delete("cat"); else params.set("cat", v);
    setShown(PAGE_SIZE);
    setParams(params);
  };
  const setYear = (v: string) => {
    if (v === "all") params.delete("year"); else params.set("year", v);
    setShown(PAGE_SIZE);
    setParams(params);
  };

  const activeCat = NEWS_CATEGORIES.find((c) => c.id === cat);

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="The Synergy Wire · newsroom of Hubris Books & Bookstore™ · published continuously since 2006"
        title={<>News & Announcements <span className="italic text-gold-light">(Mandatory Reading)</span></>}
        sub="Press releases, fee schedules, awards, hostile acquisitions, corrections, and memoranda from our Chief Executive Rabbit. 4,812 releases and counting. Reading is billed at $0.02 per page; the meter in the header runs whether or not you read."
      >
        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex items-center gap-2 max-w-md bg-white rounded-lg px-3 py-2.5 border-2 border-gold flex-1">
            <Search size={16} className="text-hubris/50 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 4,812 releases ($0.11 per search)…"
              className="bg-transparent w-full text-sm text-ink focus:outline-none placeholder:text-ink/40"
            />
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            <span className="bg-black/30 border border-gold/40 rounded-lg px-3 py-2 text-gold-light">Media contact: Vireo Pressrelease</span>
            <span className="bg-black/30 border border-gold/40 rounded-lg px-3 py-2 text-gold-light">press@hubrisbooks.example ($12 per reply)</span>
          </div>
        </div>
      </PageHero>

      <WireTicker />

      {/* facts band */}
      <div className="bg-ink text-paper border-b-4 border-gold">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 lg:grid-cols-4 gap-5 text-center">
          {NEWSROOM_FACTS.map((f) => (
            <div key={f.small}>
              <div className="font-serif font-black text-3xl sm:text-4xl text-gold-light">{f.big}</div>
              <div className="font-mono text-[10px] text-paper/60 mt-1 uppercase tracking-wider">{f.small}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionShell>
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div>
            {/* lead story */}
            {cat === "all" && year === "all" && !q.trim() && (
              <>
                <Kicker>Lead story · pinned by the CEO, who does not read</Kicker>
                <div className="mt-3"><FeaturedPost post={featured} /></div>
              </>
            )}

            {/* desk filter */}
            <div className="mt-8">
              <div className="flex items-end justify-between flex-wrap gap-2">
                <div>
                  <Kicker>{filtered.length} releases {cat !== "all" || year !== "all" || q ? "match your filter" : "on the wire"}</Kicker>
                  <h2 className="font-serif font-black text-2xl sm:text-3xl mt-1.5">
                    {activeCat ? activeCat.name : year !== "all" ? `Archive: ${year}` : "Latest from the Wire"}
                  </h2>
                  {activeCat && <p className="text-sm text-ink/60 mt-1 max-w-2xl">{activeCat.blurb}</p>}
                </div>
                {(cat !== "all" || year !== "all" || q) && (
                  <button onClick={() => { setCat("all"); setYear("all"); setQ(""); }} className="font-mono text-[11px] underline text-hubris/60 hover:text-alarm">
                    clear filters (free, this once)
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                <FilterChip active={cat === "all"} onClick={() => setCat("all")} label={`All (${NEWS_POSTS.length})`} />
                {NEWS_CATEGORIES.map((c) => (
                  <FilterChip
                    key={c.id}
                    active={cat === c.id}
                    onClick={() => setCat(c.id)}
                    label={`${c.short} (${NEWS_POSTS.filter((p) => p.category === c.id).length})`}
                    color={c.color}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2 items-center">
                <span className="font-mono text-[10px] text-ink/45 uppercase tracking-widest mr-1">Year:</span>
                <FilterChip active={year === "all"} onClick={() => setYear("all")} label="All years" small />
                {[...new Set(NEWS_POSTS.map((p) => p.date.slice(0, 4)))].sort((a, b) => Number(b) - Number(a)).map((y) => (
                  <FilterChip key={y} active={year === y} onClick={() => setYear(y)} label={y} small />
                ))}
              </div>
            </div>

            {/* list */}
            <div className="space-y-4 mt-5">
              {visible.map((p) => (
                <PostRow key={p.slug} post={p} index={NEWS_POSTS.indexOf(p)} />
              ))}
              {filtered.length === 0 && (
                <div className="bg-white border-2 border-dashed border-alarm rounded-xl p-10 text-center">
                  <div className="font-serif font-black text-2xl">No releases match that.</div>
                  <p className="text-sm text-ink/60 mt-2">
                    Which is itself newsworthy. Your query has been logged, priced, and forwarded to the desk most likely to
                    bill you for it.
                  </p>
                </div>
              )}
            </div>

            {filtered.length > shown && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setShown((s) => s + PAGE_SIZE);
                    bumpHubris(3);
                    pushToast({ kind: "fee", title: "Load-more charge: $4.99", body: "Pagination is a service. Each additional page of releases costs $4.99, which has been added to your tab, which you did not know you had." });
                  }}
                  className="bg-hubris text-white font-bold px-6 py-3 rounded-lg hover:bg-hubris-light inline-flex items-center gap-2"
                >
                  LOAD {Math.min(PAGE_SIZE, filtered.length - shown)} MORE RELEASES ($4.99) <ArrowRight size={15} />
                </button>
                <p className="fine-print text-ink/45 mt-2">Showing {visible.length} of {filtered.length} matching releases · 4,812 total since 2006</p>
              </div>
            )}

            {/* catalogs */}
            <div className="mt-10 bg-hubris text-paper rounded-xl p-6 border-4 border-gold">
              <Kicker><span className="text-gold-light">Seasonal catalogs · fee schedules · courteous notes</span></Kicker>
              <h3 className="font-serif font-black text-2xl mt-2">Catalogs & Fee Schedules</h3>
              <p className="text-sm text-paper/65 mt-1 max-w-2xl">
                Every catalog concludes at page 199 with a courteous note. The remainder — including the index, the order
                form, and our address — is a different product.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                {[
                  { name: "Spring 2026 Catalog", price: "$34.99", note: "26 frontlist titles, 412 fees" },
                  { name: "Fall 2025 Catalog", price: "$29.99", note: "Last edition to include the word \"free\"" },
                  { name: "Fee Schedule, Consolidated", price: "$199.00", note: "90 pages, 6-point type, load-bearing" },
                ].map((c) => (
                  <div key={c.name} className="bg-hubris-light border border-gold/40 rounded-lg p-4">
                    <FileText size={18} className="text-gold" />
                    <div className="font-serif font-bold text-lg mt-1 leading-tight">{c.name}</div>
                    <div className="font-mono text-[10px] text-paper/60 mt-0.5">{c.note}</div>
                    <button
                      onClick={() => pushToast({ kind: "fee", title: `${c.price} added`, body: `${c.name}. PDF delivery in 6–8 eternities. Printed delivery is a different product at a different price.` })}
                      className="mt-3 w-full bg-gold text-hubris font-bold text-sm py-2 rounded hover:bg-gold-light"
                    >
                      ORDER {c.price}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* media contact */}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-hubris rounded-xl p-5">
                <Landmark size={20} className="text-gold" />
                <h4 className="font-serif font-black text-lg mt-1">Media & Permissions</h4>
                <p className="text-sm text-ink/60 mt-1">
                  Quoting us is permitted under Fair-ish Use, which is 90 pages long and available for a rendering fee.
                  Reprinting a release in full requires the Syndication License ($1,450/yr, per territory, 43 territories).
                </p>
                <div className="font-mono text-[11px] text-ink/50 mt-2 space-y-1">
                  <div className="flex items-center gap-1.5"><Mail size={11} /> press@hubrisbooks.example</div>
                  <div className="flex items-center gap-1.5"><Newspaper size={11} /> The Synergy Wire, Floor 33, Hubris Tower, Dayton OH</div>
                </div>
              </div>
              <div className="bg-white border-2 border-hubris rounded-xl p-5">
                <Landmark size={20} className="text-gold" />
                <h4 className="font-serif font-black text-lg mt-1">Corrections & Complaints</h4>
                <p className="text-sm text-ink/60 mt-1">
                  Corrections are published in full and charged in full. Complaints are a $25 service, handled by Greg, who is
                  now a chatbot and has all the time in the world.
                </p>
                <div className="flex gap-2 mt-3">
                  <Link to="/news?cat=corrections" className="text-sm font-bold text-hubris hover:text-alarm flex items-center gap-1">
                    Read our corrections <ArrowRight size={14} />
                  </Link>
                  <Link to="/terms" className="text-sm font-bold text-hubris hover:text-alarm ml-auto">Terms of Servitude</Link>
                </div>
              </div>
            </div>
          </div>

          <NewsSidebar />
        </div>

        {/* most recent by desk */}
        <div className="mt-12">
          <Kicker>Everything is a beat. Every beat has a fee.</Kicker>
          <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Browse by Desk</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-5">
            {NEWS_CATEGORIES.map((c) => {
              const latest = NEWS_POSTS.filter((p) => p.category === c.id)[0];
              return (
                <Link
                  key={c.id}
                  to={`/news?cat=${c.id}`}
                  className="bg-white border-2 rounded-lg p-4 hover:shadow-[5px_5px_0_rgba(15,30,61,1)] hover:-translate-y-0.5 transition-all"
                  style={{ borderColor: c.color }}
                >
                  <CategoryPill id={c.id} />
                  <div className="font-serif font-bold text-base mt-2 leading-snug">{c.name}</div>
                  <p className="fine-print text-ink/50 mt-1 line-clamp-3">{c.blurb}</p>
                  {latest && (
                    <div className="font-mono text-[10px] text-ink/45 mt-2 line-clamp-2 border-t border-dashed border-hubris/15 pt-2">
                      Latest: {latest.title}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}

function FilterChip({ active, onClick, label, color, small = false }: { active: boolean; onClick: () => void; label: string; color?: string; small?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono font-bold rounded-full border-2 transition-colors ${small ? "text-[10px] px-2.5 py-1" : "text-[11px] px-3 py-1.5"} ${
        active ? "bg-hubris text-gold-light border-hubris" : "text-hubris/70 border-hubris/25 hover:border-hubris"
      }`}
      style={active && color ? { background: color, borderColor: color, color: "#fff" } : undefined}
    >
      {label}
    </button>
  );
}
