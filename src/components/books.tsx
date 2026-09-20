import { Link } from "react-router-dom";
import { ShoppingCart, Star, Flame, Eye } from "lucide-react";
import { IMPRINTS, type Book } from "../data/books";
import { useShop } from "../store/ShopContext";

export function Cover({ book, size = "md" }: { book: Book; size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "w-56 sm:w-64 aspect-[2/3]" : size === "sm" ? "w-24 aspect-[2/3]" : "w-full aspect-[2/3]";
  return (
    <div
      className={`${dims} rounded-r-md rounded-l-[2px] book-spine relative overflow-hidden flex flex-col justify-between p-3 text-left shrink-0`}
      style={{ background: `linear-gradient(135deg, ${book.cover.bg} 0%, ${book.cover.bg} 70%, rgba(0,0,0,0.45) 100%)` }}
    >
      <div className="absolute inset-y-0 left-0 w-[7px] bg-black/30" />
      <div className="absolute inset-y-0 left-[7px] w-px bg-white/25" />
      <div>
        <div className="font-mono text-[8px] uppercase tracking-widest opacity-80" style={{ color: book.cover.accent }}>
          {IMPRINTS[book.imprint].spine}
        </div>
        <div className="font-serif font-black leading-tight mt-1" style={{ color: book.cover.accent, fontSize: size === "sm" ? 11 : size === "lg" ? 24 : 17 }}>
          {book.title}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="font-mono text-[8px] uppercase opacity-70" style={{ color: book.cover.accent }}>{book.author}</div>
        <div className="text-2xl opacity-90" style={{ color: book.cover.accent }}>{book.cover.motif}</div>
      </div>
      {book.badges[0] && size !== "sm" && (
        <div className="absolute top-2 right-2 bg-alarm text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded -rotate-6 max-w-[70px] text-center leading-tight">
          {book.badges[0]}
        </div>
      )}
    </div>
  );
}

export function Price({ book, big = false }: { book: Book; big?: boolean }) {
  const discount = book.listPrice > book.price;
  return (
    <div className={big ? "" : ""}>
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
      body: `${book.feeFootnote ?? "A Mandatory Spine Hydration Fee ($14.95) was also added. It adds itself. It's union."} Frequently Required Together ($242.50) is pre-checked at checkout; declining costs more than accepting.`,
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
