import { Link } from "react-router-dom";
import { ShoppingCart, Star, Flame, Eye } from "lucide-react";
import type { Book } from "../data/books";
import { useShop } from "../store/ShopContext";

export function Cover({ book, size = "md" }: { book: Book; size?: "sm" | "md" | "lg" }) {
  const dims =
    size === "lg" ? "w-56 sm:w-64 aspect-[2/3]" : size === "sm" ? "w-24 aspect-[2/3]" : "w-full aspect-[2/3]";
  const imprintName =
    book.imprint === "milkshake" ? "Bookstore Milkshake" : book.imprint === "hubris" ? "Hubris Books" : book.imprint === "synergy" ? "Synergy Chapbooks" : "Vault Select";
  const imprintShort =
    book.imprint === "milkshake" ? "Milkshake" : book.imprint === "hubris" ? "Hubris" : book.imprint === "synergy" ? "Synergy" : "Vault";
  // Long titles step down in size so nothing collides or clips
  const len = book.title.length;
  const titlePx =
    size === "sm" ? (len > 45 ? 9 : 11)
    : size === "lg" ? (len > 70 ? 17 : len > 45 ? 20 : 24)
    : len > 70 ? 12.5 : len > 45 ? 14.5 : 17;
  const pad = size === "sm" ? "p-2 pl-3 pr-1.5" : "p-3.5 pl-[18px] pr-2.5";

  return (
    <div
      className={`${dims} rounded-r-md rounded-l-[3px] book-spine relative overflow-hidden text-left shrink-0`}
      style={{ background: `linear-gradient(150deg, ${book.cover.bg} 0%, ${book.cover.bg} 62%, rgba(0,0,0,0.5) 100%)` }}
      title={`${book.title} — ${book.author}`}
    >
      {/* page-block edge */}
      <div
        className="absolute right-0 top-[3px] bottom-[3px] w-[5px] rounded-r-sm opacity-90"
        style={{ background: "repeating-linear-gradient(to right, #FBF7EC 0px, #FBF7EC 1px, #CFC6AC 1px, #CFC6AC 2px)" }}
      />
      {/* spine */}
      <div className="absolute inset-y-0 left-0 w-[9px] bg-black/40" />
      <div className="absolute inset-y-0 left-[9px] w-px bg-white/30" />
      {/* top-light sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(165deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 32%, rgba(0,0,0,0) 55%)" }}
      />
      {/* watermark device */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <span style={{ color: book.cover.accent, opacity: 0.13, fontSize: size === "sm" ? 46 : size === "lg" ? 118 : 86 }}>
          {book.cover.motif}
        </span>
      </div>

      {/* content */}
      <div className={`relative h-full flex flex-col ${pad}`}>
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <div
              className="font-mono uppercase opacity-80 leading-tight"
              style={{ color: book.cover.accent, fontSize: size === "sm" ? 6.5 : 8, letterSpacing: "0.18em" }}
            >
              {size === "sm" ? imprintShort : imprintName}
            </div>
            <div className="mt-1 h-[2px] w-9 opacity-70" style={{ background: book.cover.accent }} />
          </div>
          {book.badges[0] && size !== "sm" && (
            <div
              className="-rotate-6 rounded-[3px] bg-alarm px-1.5 py-1 text-center font-mono font-bold leading-tight text-white shadow-md max-w-[78px] shrink-0"
              style={{ fontSize: 8 }}
            >
              {book.badges[0]}
            </div>
          )}
        </div>

        <div className="flex-1 min-h-0 flex flex-col justify-center py-2">
          <div
            className="font-serif font-black"
            style={{
              color: book.cover.accent, fontSize: titlePx, lineHeight: 1.1,
              display: "-webkit-box", WebkitLineClamp: size === "sm" ? 6 : 8,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}
          >
            {book.title}
          </div>
          {size !== "sm" && (
            <div
              className="mt-1.5 font-serif italic"
              style={{
                color: book.cover.accent, opacity: 0.78, fontSize: size === "lg" ? 12 : 10.5, lineHeight: 1.3,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
              }}
            >
              {book.subtitle}
            </div>
          )}
        </div>

        <div>
          <div className="mb-1.5 h-px w-full" style={{ background: book.cover.accent, opacity: 0.4 }} />
          <div
            className="font-mono uppercase truncate"
            style={{ color: book.cover.accent, fontSize: size === "sm" ? 6.5 : 8.5, letterSpacing: "0.08em", opacity: 0.92 }}
          >
            {book.author}
          </div>
          <div
            className="mt-0.5 flex items-center justify-between font-mono"
            style={{ color: book.cover.accent, fontSize: size === "sm" ? 6 : 7, opacity: 0.6 }}
          >
            <span>HUBRIS BOOKS</span>
            <span>{book.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Price({ book, big = false }: { book: Book; big?: boolean }) {
  const discount = book.listPrice > book.price;
  return (
    <div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`font-black text-alarm ${big ? "text-3xl" : "text-xl"}`}>${book.price.toFixed(2)}</span>
        {discount && <span className={`text-ink/40 line-through ${big ? "text-lg" : "text-sm"}`}>${book.listPrice.toFixed(2)}</span>}
        {discount && (
          <span className="bg-mint text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">
            SAVE {Math.round((1 - book.price / book.listPrice) * 100)}%*
          </span>
        )}
      </div>
      <div className="fine-print text-ink/45">*Savings calculated against a price we invented this morning. Plus applicable fees (all of them).</div>
    </div>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} fill={i <= n ? "currentColor" : "none"} strokeWidth={2} />
      ))}
    </span>
  );
}

export function BookCard({ book }: { book: Book }) {
  const { addToCart, pushToast, bumpHubris } = useShop();

  const quickAdd = () => {
    addToCart(book);
    bumpHubris(2);
    pushToast({
      kind: "upsell",
      title: `Added: ${book.title}`,
      body: book.feeFootnote ?? "A Mandatory Spine Hydration Fee ($14.95) was also added. It adds itself. It's union.",
    });
  };

  return (
    <div className="bg-white border-2 border-hubris rounded-lg overflow-hidden flex flex-col hover:shadow-[6px_6px_0_rgba(15,30,61,1)] hover:-translate-y-0.5 transition-all group">
      <Link to={`/book/${book.id}`} className="p-4 pb-0 block">
        <Cover book={book} />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        {book.stockWarning && (
          <div className="font-mono text-[10px] text-alarm font-bold flex items-center gap-1 mb-1">
            <Flame size={11} /> {book.stockWarning}
          </div>
        )}
        <Link to={`/book/${book.id}`} className="font-serif font-bold text-lg leading-snug hover:text-alarm transition-colors">
          {book.title}
        </Link>
        <div className="text-xs text-ink/60 italic mt-0.5 line-clamp-1">{book.subtitle}</div>
        <div className="text-xs mt-1">by <span className="font-semibold">{book.author}</span></div>
        <div className="flex items-center gap-2 mt-1.5">
          <Stars n={5} />
          <span className="font-mono text-[10px] text-ink/50">(4.{book.id.length % 9} · {120 + book.id.length * 37} reviews, all 5★ or deleted)</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {book.badges.slice(0, 2).map((b) => (
            <span key={b} className="font-mono text-[9px] bg-parchment border border-hubris/20 rounded px-1.5 py-0.5">{b}</span>
          ))}
        </div>
        <div className="mt-3"><Price book={book} /></div>
        <div className="flex gap-2 mt-3 pt-3 border-t border-dashed border-hubris/20">
          <button onClick={quickAdd} className="flex-1 bg-hubris hover:bg-hubris-light text-white font-bold text-sm rounded px-3 py-2.5 flex items-center justify-center gap-1.5 transition-colors">
            <ShoppingCart size={15} /> Add to Cart
          </button>
          <Link to={`/book/${book.id}`} className="border-2 border-hubris rounded px-3 py-2 text-hubris hover:bg-parchment transition-colors" title="Details">
            <Eye size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
