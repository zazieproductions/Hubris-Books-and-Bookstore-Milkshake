import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Mail, Printer, Share2, ShoppingCart, User } from "lucide-react";
import { NEWS } from "../data/news";
import { BOOKS } from "../data/books";
import { useShop } from "../store/ShopContext";
import { Cover } from "../components/books";
import { CategoryChip } from "./News";

export default function NewsArticle() {
  const { slug } = useParams();
  const article = NEWS.find((n) => n.slug === slug);
  const { pushToast, bumpHubris, addToCart } = useShop();

  if (!article) return <Navigate to="/news" replace />;

  const related = NEWS.filter((n) => n.slug !== article.slug && n.category === article.category).slice(0, 2);
  const moreFiller = NEWS.filter((n) => n.slug !== article.slug && n.category !== article.category).slice(0, 3 - related.length);
  const moreFrom = [...related, ...moreFiller];
  const books = (article.relatedBooks ?? []).map((id) => BOOKS.find((b) => b.id === id)).filter(Boolean);

  const share = (where: string) => {
    bumpHubris(2);
    pushToast({ kind: "info", title: `Shared to ${where}!`, body: "Your followers have been notified and pre-approved for upsells. Sharing earns 5 FunBux™ (spirit bucks)." });
  };

  return (
    <div className="paper-texture min-h-screen">
      <div className="bg-hubris text-paper hubris-grid border-b-4 border-gold">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-12">
          <Link to="/news" className="inline-flex items-center gap-1 text-sm text-gold-light hover:text-gold font-semibold">
            <ArrowLeft size={14} /> Back to the Newsroom
          </Link>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <CategoryChip category={article.category} />
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl leading-tight mt-3">{article.title}</h1>
          <div className="flex items-center gap-4 mt-4 font-mono text-xs text-paper/60 flex-wrap">
            <span className="flex items-center gap-1"><CalendarDays size={12} /> {article.date}</span>
            <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {article.readMinutes} min read</span>
          </div>
          <div className="font-mono text-[11px] text-paper/40 mt-1">{article.authorRole}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white border-2 border-hubris rounded-xl p-6 sm:p-10 shadow-[6px_6px_0_rgba(15,30,61,1)]">
          <p className="font-serif italic text-xl text-hubris leading-relaxed border-b-2 border-dashed border-hubris/20 pb-6">
            {article.excerpt}
          </p>
          <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-ink/90">
            {article.body.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <blockquote className="my-8 border-l-4 border-gold bg-parchment p-5">
            <p className="font-serif italic text-xl leading-relaxed">“{article.pullQuote}”</p>
            <div className="font-mono text-xs text-ink/60 mt-2">— {article.pullQuoteBy}</div>
          </blockquote>

          <div className="space-y-5 text-[16px] leading-relaxed text-ink/90">
            {article.body.slice(2).map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {article.tags.map((t) => (
              <span key={t} className="font-mono text-[11px] bg-parchment border border-hubris/20 rounded px-2 py-1">#{t.replace(/\s/g, "")}</span>
            ))}
          </div>

          {/* share row */}
          <div className="mt-8 pt-6 border-t-2 border-dashed border-hubris/20">
            <div className="font-mono text-[11px] uppercase tracking-widest font-bold text-ink/60 flex items-center gap-1">
              <Share2 size={12} /> Share this announcement (sharing is caring; caring is tracked)
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {["X (the letter)", "Facebook (your aunt)", "Email (6/day after this)"].map((s) => (
                <button key={s} onClick={() => share(s)} className="min-h-11 border-2 border-hubris rounded-lg px-3 sm:px-4 py-2 text-sm font-bold hover:bg-parchment flex items-center gap-1.5">
                  <Mail size={14} /> {s}
                </button>
              ))}
              <button onClick={() => share("the Hutch's fax machine")} className="min-h-11 border-2 border-hubris rounded-lg px-3 sm:px-4 py-2 text-sm font-bold hover:bg-parchment flex items-center gap-1.5">
                <Printer size={14} /> Fax the Hutch
              </button>
            </div>
          </div>

          {/* corrections */}
          <div className="mt-6 bg-alarm/5 border border-alarm/30 rounded-lg p-4">
            <div className="font-mono text-[11px] uppercase tracking-widest font-bold text-alarm">Corrections</div>
            <p className="text-sm text-ink/70 mt-1">An earlier version of this article understated our revenue. It has been corrected upward. We regret the error ($25, expensed to readers).</p>
          </div>
        </div>

        {/* related books */}
        {books.length > 0 && (
          <div className="mt-8">
            <h2 className="font-serif font-black text-2xl">Mentioned in This Announcement <span className="font-mono text-xs font-normal text-ink/50">(available now, required reading)</span></h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {books.map((b) => b && (
                <div key={b.id} className="bg-white border-2 border-hubris rounded-xl p-4 flex gap-4">
                  <Link to={`/book/${b.id}`} className="shrink-0"><Cover book={b} size="sm" /></Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/book/${b.id}`} className="font-serif font-bold text-lg leading-tight hover:text-alarm">{b.title}</Link>
                    <div className="text-xs text-ink/60 italic line-clamp-1">{b.subtitle}</div>
                    <div className="font-black text-alarm text-xl mt-1">${b.price.toFixed(2)}</div>
                    <button
                      onClick={() => { addToCart(b); pushToast({ kind: "upsell", title: "Added from the newsroom!", body: "Reading the news and shopping simultaneously. Peak citizenship." }); }}
                      className="mt-2 bg-hubris text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                      <ShoppingCart size={12} /> ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* more from newsroom */}
        <div className="mt-10">
          <div className="flex items-end justify-between flex-wrap gap-2">
            <h2 className="font-serif font-black text-2xl">More From the Newsroom</h2>
            <Link to="/news" className="font-bold text-hubris hover:text-alarm flex items-center gap-1 text-sm">
              All announcements <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            {moreFrom.map((n) => (
              <Link key={n.slug} to={`/news/${n.slug}`} className="bg-white border-2 border-hubris/25 hover:border-hubris rounded-xl p-4 transition-colors group">
                <CategoryChip category={n.category} />
                <div className="font-serif font-bold text-lg leading-snug mt-2 group-hover:text-alarm transition-colors">{n.title}</div>
                <div className="font-mono text-[11px] text-ink/50 mt-2">{n.date} · {n.readMinutes} min</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
