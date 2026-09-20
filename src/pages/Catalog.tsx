import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";
import { BOOKS, IMPRINTS } from "../data/books";
import { PageHero, SectionShell } from "../components/chrome";
import { BookCard } from "../components/books";
import { useShop } from "../store/ShopContext";

type Sort = "featured" | "price-asc" | "price-desc" | "title" | "profit";

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [maxPrice, setMaxPrice] = useState(500);
  const imprint = params.get("imprint") ?? "all";
  const { browsingFee } = useShop();

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
        kicker={`Complete catalog · ${BOOKS.length} titles · browsing fee $${browsingFee.toFixed(0)}`}
        title={<>Every Book We Publish. <span className="italic font-[400]">All Required.</span></>}
        sub={`Browse frontlist and backlist. Every title peer-reviewed by shareholders and Hubris Munnytown, priced by an algorithm that charges per scroll. Fee: $${browsingFee.toFixed(2)} and climbing.`}
      >
        <div className="flex flex-wrap gap-2 mt-6">
          {(["all", "milkshake", "hubris", "synergy", "vault"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setImprint(k)}
              className={`font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                imprint === k ? "bg-ink text-paper border-ink" : "text-ink/60 border-ink/10 hover:border-ink/20 hover:text-ink"
              }`}
            >
              {k === "all" ? `All (${BOOKS.length})` : `${IMPRINTS[k].name} (${BOOKS.filter((b) => b.imprint === k).length})`}
            </button>
          ))}
        </div>
      </PageHero>

      <SectionShell>
        <div className="bg-paper border border-ink/10 p-3 flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="flex items-center gap-2 flex-1 border border-ink/10 px-3 py-2">
            <Search size={14} className="text-ink/30 shrink-0" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, author, ISBN…"
              className="bg-transparent w-full font-serif text-[14px] focus:outline-none placeholder:text-ink/30"
            />
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <ArrowUpDown size={12} className="text-ink/30" />
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border border-ink/10 px-2 py-2 bg-paper font-mono text-[11px]">
              <option value="featured">Featured (highest margin)</option>
              <option value="profit">Most profitable to us</option>
              <option value="price-desc">Price high → low</option>
              <option value="price-asc">Price low → high</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] min-w-[180px]">
            <SlidersHorizontal size={12} className="text-ink/30" />
            <span>Max ${maxPrice}</span>
            <input type="range" min={50} max={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="flex-1 accent-[#121E3A]" />
          </div>
        </div>

        <div className="font-mono text-[11px] text-ink/40 mt-4">
          Showing {results.length} of {BOOKS.length} · Browsing fee ${browsingFee.toFixed(2)} · Search $0.11 + scroll $2.30/px
        </div>

        {results.length === 0 ? (
          <div className="border border-dashed border-ink/20 p-10 text-center mt-6 bg-paper">
            <div className="font-serif font-bold text-[20px]">No titles match.</div>
            <p className="font-serif text-[13px] text-ink/60 mt-2">Demand low, prices up 340% per bunny SEO strategy. Fee: ${browsingFee.toFixed(2)}.</p>
            <button onClick={() => { setQ(""); setMaxPrice(500); }} className="mt-4 border border-ink px-4 py-2 font-mono text-[11px] uppercase tracking-widest">Reset</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {results.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}

        <div className="mt-12 border border-ink/10 p-8 text-center bg-parchment/30">
          <div className="font-serif font-bold text-[18px]">Can't decide? Let the algorithm choose.</div>
          <p className="font-serif text-[13px] text-ink/60 mt-1">Recommends most expensive + 6 required fees. Bunny SEO'd to say "buy now or else."</p>
          <Link to={`/book/${BOOKS.reduce((a, b) => (a.price > b.price ? a : b)).id}`} className="inline-block mt-4 bg-ink text-paper font-mono text-[11px] uppercase tracking-widest px-6 py-3">
            Most expensive title
          </Link>
        </div>
      </SectionShell>
    </div>
  );
}
