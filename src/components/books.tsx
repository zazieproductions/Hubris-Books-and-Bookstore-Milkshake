import { Link } from "react-router-dom";
import { ShoppingCart, Star, Flame, Eye } from "lucide-react";
import type { Book } from "../data/books";
import { useShop } from "../store/ShopContext";

export function Cover({ book, size = "md" }: { book: Book; size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "w-56 sm:w-64 aspect-[2/3]" : size === "sm" ? "w-24 aspect-[2/3]" : "w-full aspect-[2/3]";
  return (
    <div
      className={`${dims} rounded-[1px] relative overflow-hidden flex flex-col justify-between p-3 text-left shrink-0 border border-ink/5`}
      style={{ background: `linear-gradient(160deg, ${book.cover.bg} 0%, ${book.cover.bg} 85%, rgba(0,0,0,0.35) 100%)` }}
    >
      <div className="absolute inset-y-0 left-0 w-[5px] bg-black/20" />
      <div className="absolute inset-y-0 left-[5px] w-px bg-white/15" />
      <div>
        <div className="font-mono text-[7.5px] uppercase tracking-[0.14em] opacity-80" style={{ color: book.cover.accent }}>
          {book.imprint === "milkshake" ? "Bookstore Milkshake" : book.imprint === "hubris" ? "Hubris Books" : book.imprint === "synergy" ? "Synergy Chapbooks" : "Vault Select"}
        </div>
        <div className="font-serif font-bold leading-[1.1] mt-2 tracking-[-0.01em]" style={{ color: book.cover.accent, fontSize: size === "sm" ? 11 : size === "lg" ? 20 : 15 }}>
          {book.title}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="font-mono text-[7.5px] uppercase opacity-60 leading-tight max-w-[70%]" style={{ color: book.cover.accent }}>{book.author}</div>
        <div className="text-[18px] opacity-80" style={{ color: book.cover.accent }}>{book.cover.motif}</div>
      </div>
      {book.badges[0] && size !== "sm" && (
        <div className="absolute top-2 right-2 bg-ink text-paper font-mono text-[7.5px] font-bold px-1.5 py-0.5 rounded-[1px] max-w-[70px] text-center leading-tight">
          {book.badges[0]}
        </div>
      )}
    </div>
  );
}

export function Price({ book, big = false }: { book: Book; big?: boolean }) {
  const discount = book.listPrice > book.price;
  return (
    <div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`font-serif font-bold tracking-[-0.02em] ${big ? "text-[26px]" : "text-[18px]"} text-ink`}>${book.price.toFixed(2)}</span>
        {discount && <span className={`font-mono text-ink/40 line-through ${big ? "text-[13px]" : "text-[11px]"}`}>${book.listPrice.toFixed(2)}</span>}
        {discount && (
          <span className="bg-ink text-paper font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-widest">
            Save {Math.round((1 - book.price / book.listPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="font-mono text-[10px] text-ink/40 mt-1 leading-snug">Plus 6 Required Together™ fees ($242.50) + browsing fee. See terms.</div>
    </div>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-ink">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={11} fill={i <= n ? "currentColor" : "none"} strokeWidth={1.5} />
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
      body: `+ 6 Required Together™ fees ($242.50) pre-checked. Unchecking = $7.77 fee + bunny judgment.`,
    });
  };

  return (
    <div className="bg-paper border border-ink/10 flex flex-col hover:border-ink/20 transition-colors group">
      <Link to={`/book/${book.id}`} className="p-5 pb-0 block">
        <Cover book={book} />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        {book.stockWarning && (
          <div className="font-mono text-[10px] text-alarm font-bold flex items-center gap-1 mb-2 uppercase tracking-widest">
            <Flame size={10} /> {book.stockWarning}
          </div>
        )}
        <Link to={`/book/${book.id}`} className="font-serif font-bold text-[17px] leading-[1.2] tracking-[-0.01em] hover:text-alarm transition-colors">
          {book.title}
        </Link>
        <div className="font-serif text-[12.5px] text-ink/50 italic mt-1 line-clamp-2 leading-snug">{book.subtitle}</div>
        <div className="font-mono text-[11px] mt-2 text-ink/60">by <span className="font-semibold text-ink/80">{book.author}</span></div>
        <div className="flex items-center gap-2 mt-2">
          <Stars n={5} />
          <span className="font-mono text-[10px] text-ink/40">4.{book.id.length % 9} · {120 + book.id.length * 37} reviews</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {book.badges.slice(0, 2).map((b) => (
            <span key={b} className="font-mono text-[9px] uppercase tracking-widest bg-parchment border border-ink/5 px-1.5 py-1 text-ink/60">{b}</span>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-ink/5"><Price book={book} /></div>
        <div className="flex gap-2 mt-4">
          <button onClick={quickAdd} className="flex-1 bg-ink hover:bg-hubris text-paper font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-2.5 flex items-center justify-center gap-1.5 transition-colors">
            <ShoppingCart size={12} /> Add to Cart
          </button>
          <Link to={`/book/${book.id}`} className="border border-ink/15 px-3 py-2 text-ink/60 hover:text-ink hover:border-ink/30 transition-colors" title="Details">
            <Eye size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
