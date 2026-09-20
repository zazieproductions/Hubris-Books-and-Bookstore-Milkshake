import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";
import { BOOKS, IMPRINTS } from "../data/books";
import { PageHero, SectionShell } from "../components/chrome";
import { BookCard } from "../components/books";

type Sort = "featured" | "price-asc" | "price-desc" | "title" | "profit";

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [maxPrice, setMaxPrice] = useState(1000);
  const imprint = params.get("imprint") ?? "all";

  const setImprint = (v: string) => {
    if (v === "all") params.delete("imprint");
    else params.set("imprint", v);
    setParams(params);
  };

  const results = useMemo(() => {
    let r = BOOKS.filter((b) => (imprint === "all" ? true : b.imprint === imprint));
    if (q.trim()) {
      const needle = q.toLowerCase();
      r = r.filter((b) => `${b.title} ${b.subtitle} ${b.author} ${b.isbn}`.toLowerCase().includes(needle));
    }
    r = r.filter((b) => b.price <= maxPrice);
    switch (sort) {
      case "price-asc": r = [...r].sort((a, b) => a.price - b.price); break;
      case "price-desc": r = [...r].sort((a, b) => b.price - a.price); break;
      case "title": r = [...r].sort((a, b) => a.title.localeCompare(b.title)); break;
      case "profit": r = [...r].sort((a, b) => b.price * b.pages - a.price * a.pages); break;
      default: break;
    }
    return r;
  }, [q, sort, maxPrice, imprint]);

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker={`The complete catalog · ${BOOKS.length} titles · 412 fees`}
        title={<>Every Book We Sell. <span className="italic text-gold-light">All of Them Required.</span></>}
        sub="Browse our complete frontlist and backlist. Every title is peer-reviewed by shareholders and priced by an algorithm that can smell desire."
      >
        <div className="flex flex-wrap gap-2 mt-5">
          {(["all", "milkshake", "hubris", "synergy", "vault"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setImprint(k)}
              className={`font-mono text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-colors ${
                imprint === k ? "bg-gold text-hubris border-gold" : "text-paper/70 border-paper/30 hover:border-gold"
              }`}
            >
              {k === "all" ? `ALL (${BOOKS.length})` : `${IMPRINTS[k].spine} (${BOOKS.filter((b) => b.imprint === k).length})`}
            </button>
          ))}
        </div>
      </PageHero>

      <SectionShell>
        {/* toolbar */}
        <div className="bg-white border-2 border-hubris rounded-lg p-3 flex flex-col lg:flex-row gap-3 lg:items-center shadow-[4px_4px_0_rgba(15,30,61,1)]">
          <div className="flex items-center gap-2 flex-1 bg-parchment rounded px-3 py-2 border border-hubris/20">
            <Search size={16} className="text-hubris/50 shrink-0" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title, author, ISBN, or suppressed desire…"
              className="bg-transparent w-full text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowUpDown size={15} className="text-hubris/50" />
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border border-hubris/30 rounded px-2 py-1.5 text-sm bg-white">
              <option value="featured">Sort: Featured (highest margin)</option>
              <option value="profit">Sort: Most profitable to us</option>
              <option value="price-desc">Sort: Price, high → low (aspirational)</option>
              <option value="price-asc">Sort: Price, low → high (suspicious)</option>
              <option value="title">Sort: Alphabetical (boring)</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono min-w-[220px]">
            <SlidersHorizontal size={15} className="text-hubris/50" />
            <span className="text-xs">Max ${maxPrice}</span>
            <input type="range" min={50} max={1000} step={10} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="flex-1 accent-[#D92D20]" />
          </div>
        </div>

        <div className="font-mono text-xs text-ink/50 mt-4">
          Showing {results.length} of {BOOKS.length} titles · Search queries are billed at $0.11 each · Sorting by "low → high" has been reported to the rabbit
        </div>

        {results.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-alarm rounded-lg p-10 text-center mt-6">
            <div className="font-serif font-black text-2xl">No books match. Suspicious.</div>
            <p className="text-sm text-ink/60 mt-2">Your search returned nothing, which means demand is low, which means prices just went up to compensate. Try raising your max price, peasant.</p>
            <button onClick={() => { setQ(""); setMaxPrice(1000); }} className="mt-4 bg-hubris text-white font-bold px-5 py-2 rounded">RESET (FREE THIS TIME)</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {results.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}

        <div className="mt-10 bg-hubris text-paper rounded-lg p-6 text-center">
          <div className="font-serif font-black text-xl">Can't decide? Let the algorithm choose.</div>
          <p className="text-sm text-paper/60 mt-1">Our recommendation engine has a 100% success rate (it recommends the most expensive book; success!).</p>
          <Link to={`/book/${BOOKS.reduce((a, b) => (a.price > b.price ? a : b)).id}`} className="inline-block mt-3 bg-gold text-hubris font-bold px-6 py-2.5 rounded">
            SHOW ME THE MOST EXPENSIVE BOOK
          </Link>
        </div>
      </SectionShell>
    </div>
  );
}
