import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Crown, Flame, Medal, Trophy } from "lucide-react";
import { BOOKS } from "../data/books";
import { useShop } from "../store/ShopContext";
import { Kicker, PageHero, SectionShell } from "../components/chrome";
import { Cover, Stars } from "../components/books";

export default function Bestsellers() {
  const { addToCart, pushToast, bumpHubris } = useShop();
  const [voted, setVoted] = useState<string | null>(null);
  const ranked = [...BOOKS].sort((a, b) => b.price * b.pages - a.price * a.pages).slice(0, 10);

  const vote = (id: string, title: string) => {
    setVoted(id);
    bumpHubris(5);
    pushToast({ kind: "info", title: "Vote counted* (×1, plus 40 house votes)", body: `You voted for "${title}". The leaderboard is determined by revenue, but your participation has been logged and monetized.` });
  };

  const icons = [Trophy, Medal, Crown];

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="The Hubris 10 · ranked by revenue, labeled by merit"
        title={<>Bestsellers: <span className="italic text-gold-light">What Money Likes</span></>}
        sub="Our bestseller list is 100% data-driven. The data is revenue. The methodology is proprietary. The #1 book is the one that made us the most. Congratulations to it."
      />

      <SectionShell>
        <Kicker>Week of September 20, 2026 · list refreshes when revenue does</Kicker>
        <div className="space-y-4 mt-4">
          {ranked.map((b, i) => {
            const Icon = icons[i] ?? Flame;
            const weeksOn = 40 - i * 3;
            const delta = i % 3 === 0 ? "▲" : i % 3 === 1 ? "▬" : "▼";
            return (
              <div key={b.id} className={`bg-white border-2 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start ${i === 0 ? "border-gold shadow-[6px_6px_0_rgba(201,162,39,1)]" : "border-hubris/25 hover:border-hubris"} transition-colors`}>
                <div className="flex sm:flex-col items-center gap-2 sm:w-16 shrink-0">
                  <span className={`font-serif font-black text-4xl ${i < 3 ? "text-gold" : "text-hubris/30"}`}>#{i + 1}</span>
                  <Icon size={20} className={i === 0 ? "text-gold" : "text-hubris/30"} />
                  <span className={`font-mono text-[10px] font-bold ${delta === "▲" ? "text-mint" : delta === "▼" ? "text-alarm" : "text-ink/40"}`}>{delta} {delta === "▬" ? "STEADY" : `${i + 1} WK`}</span>
                </div>
                <Link to={`/book/${b.id}`} className="shrink-0 mx-auto sm:mx-0"><Cover book={b} size="sm" /></Link>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-alarm font-bold">{weeksOn} weeks on the list · category: Profitable Theory</div>
                  <Link to={`/book/${b.id}`} className="font-serif font-black text-xl sm:text-2xl hover:text-alarm transition-colors leading-tight block">{b.title}</Link>
                  <div className="text-sm text-ink/60 italic">{b.subtitle}</div>
                  <div className="text-sm mt-0.5">by <strong>{b.author}</strong></div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Stars n={5} />
                    <span className="font-mono text-[11px] text-ink/50">Revenue rank: #{i + 1} · Merit rank: unlisted</span>
                  </div>
                  <p className="text-sm text-ink/70 mt-2 line-clamp-2">{b.blurb}</p>
                </div>
                <div className="sm:text-right shrink-0 w-full sm:w-auto flex sm:block items-center justify-between gap-3">
                  <div>
                    <div className="font-black text-2xl text-alarm">${b.price.toFixed(2)}</div>
                    <div className="fine-print text-ink/45">+ fees (all of them)</div>
                  </div>
                  <div className="flex sm:flex-col gap-2 sm:mt-3">
                    <button onClick={() => { addToCart(b); pushToast({ kind: "upsell", title: "Bestseller added!", body: "You have excellent taste, as measured by our revenue." }); }} className="bg-hubris text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-hubris-light whitespace-nowrap">
                      ADD TO CART
                    </button>
                    <button onClick={() => vote(b.id, b.title)} className={`font-mono text-[11px] font-bold px-4 py-2 rounded-lg border-2 whitespace-nowrap ${voted === b.id ? "border-mint text-mint" : "border-hubris/25 hover:border-gold"}`}>
                      {voted === b.id ? "✓ VOTED (LOGGED)" : "★ VOTE FOR #1"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-hubris text-paper rounded-xl p-6 text-center border-4 border-gold">
          <div className="font-serif font-black text-xl">How the list works (methodology, proprietary)</div>
          <p className="text-sm text-paper/60 mt-2 max-w-2xl mx-auto">Rankings are determined by a sophisticated algorithm weighing revenue (100%), critical acclaim (0%), and the CEO's mood (he is a bunny; moods vary) (tiebreaker). Votes are counted, cherished, and discarded. Lists refresh whenever revenue does — constantly, beautifully, forever.</p>
          <Link to="/catalog" className="inline-flex items-center gap-2 bg-gold text-hubris font-bold px-6 py-2.5 rounded-lg mt-4 text-sm">
            BROWSE ALL CONTENDERS <ArrowRight size={15} />
          </Link>
        </div>
      </SectionShell>
    </div>
  );
}
