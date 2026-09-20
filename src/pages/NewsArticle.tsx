import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Link2, Mail, MessageSquareOff, Printer, Share2, ShoppingCart, TriangleAlert,
} from "lucide-react";
import { NEWS_POSTS, bylineFor, categoryFor, postBySlug } from "../data/news";
import { BOOKS, REQUIRED_TOGETHER } from "../data/books";
import { useShop } from "../store/ShopContext";
import { formatMoney } from "../lib/money";
import { Kicker, SectionShell } from "../components/chrome";
import { CategoryPill, NewsSidebar, WireBody } from "../components/newsroom";
import { Cover } from "../components/books";
import { SmugBunny } from "../components/Bunny";

/** $0.02 per page, applied generously, per 10% of the release. */
const READING_FEE_PER_TENTH = 0.19;

export default function NewsArticle() {
  const { slug } = useParams();
  // Keyed by slug so each release gets a fresh meter, fresh checkboxes, fresh guilt.
  return <Article key={slug ?? "not-found"} slug={slug} />;
}

function Article({ slug }: { slug?: string }) {
  const navigate = useNavigate();
  const { pushToast, bumpHubris, required, toggleRequired, reassertRequired, browsingFee } = useShop();
  const post = slug ? postBySlug(slug) : undefined;
  const [progress, setProgress] = useState(0);
  const [readTenths, setReadTenths] = useState(0);
  const [reasserted, setReasserted] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      setProgress(pct);
      const tenths = Math.floor(pct / 10);
      setReadTenths((prev) => (tenths > prev ? tenths : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  const related = useMemo(() => {
    const ids = post?.relatedBooks ?? [];
    const picked = ids.map((id) => BOOKS.find((b) => b.id === id)).filter((b): b is (typeof BOOKS)[number] => !!b);
    const filler = BOOKS.filter((b) => !picked.some((p) => p.id === b.id)).slice(0, Math.max(0, 3 - picked.length));
    return [...picked, ...filler].slice(0, 3);
  }, [post]);

  const moreFromDesk = useMemo(() => {
    if (!post) return [];
    return NEWS_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 4);
  }, [post]);

  const recent = useMemo(() => NEWS_POSTS.filter((p) => p.slug !== slug).slice(0, 5), [slug]);

  if (!post) {
    return (
      <div className="paper-texture min-h-screen">
        <SectionShell>
          <div className="max-w-xl mx-auto text-center bg-white border-2 border-dashed border-alarm rounded-xl p-10">
            <TriangleAlert size={40} className="mx-auto text-alarm" />
            <h1 className="font-serif font-black text-3xl mt-3">Release Not Found</h1>
            <p className="text-sm text-ink/60 mt-2">
              This release has been retracted, redacted, or moved to a premium tier. The 404 page is billed at $0.02 per
              refresh.
            </p>
            <button onClick={() => navigate("/news")} className="mt-5 bg-hubris text-white font-bold px-6 py-3 rounded-lg inline-flex items-center gap-2">
              BACK TO THE WIRE <ArrowRight size={15} />
            </button>
          </div>
        </SectionShell>
      </div>
    );
  }

  const by = bylineFor(post.byline);
  const cat = categoryFor(post.category);
  const idx = NEWS_POSTS.findIndex((p) => p.slug === post.slug);
  const prev = NEWS_POSTS[idx + 1];
  const next = NEWS_POSTS[idx - 1];
  const readingFee = readTenths * READING_FEE_PER_TENTH;

  const chargeShare = (where: string, price: number) => {
    bumpHubris(2);
    pushToast({
      kind: "fee",
      title: `Shared to ${where} — $${price.toFixed(2)} syndication fee`,
      body: "Sharing a release constitutes syndication. Syndication is a licensed activity in 43 territories. The fee has been added to your tab.",
    });
  };

  const toggleAd = (id: string) => {
    toggleRequired(id);
    if (required[id] && !reasserted[id]) {
      setReasserted((r) => ({ ...r, [id]: true }));
      setTimeout(() => {
        reassertRequired(id);
        pushToast({
          kind: "warning",
          title: "Box re-checked for your safety",
          body: "You declined this item in an advertisement. Advertisements are not a point of sale, but the decline has been noted, priced, and reversed.",
        });
      }, 2600);
    }
  };

  return (
    <div className="paper-texture min-h-screen">
      {/* reading meter */}
      <div className="sticky top-[96px] lg:top-[148px] z-30 bg-ink text-paper border-b-2 border-gold">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-3 font-mono text-[10px]">
          <span className="text-gold-light uppercase tracking-widest shrink-0">Reading meter</span>
          <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
            <div className="h-full bg-alarm transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span className="shrink-0">{Math.round(progress)}% read</span>
          <span className="shrink-0 text-alarm font-bold">${readingFee.toFixed(2)} accrued</span>
          <span className="hidden sm:inline shrink-0 text-paper/40">browsing fee ${formatMoney(browsingFee)}</span>
        </div>
      </div>

      <div className="bg-hubris text-paper border-b-4 border-gold hubris-grid">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
          <div className="font-mono text-[11px] text-paper/50 flex flex-wrap items-center gap-2">
            <Link to="/news" className="hover:text-gold-light">Newsroom</Link> <span>/</span>{" "}
            <Link to={`/news?cat=${cat.id}`} className="hover:text-gold-light">{cat.name}</Link> <span>/</span>{" "}
            <span className="text-gold-light">Release #{4812 - idx}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <CategoryPill id={post.category} size="md" />
            {post.pinned && <span className="font-mono text-[9px] font-bold bg-alarm text-white px-2 py-1 rounded uppercase tracking-widest">Pinned</span>}
            {post.sponsored && <span className="font-mono text-[9px] font-bold bg-gold text-hubris px-2 py-1 rounded uppercase tracking-widest">Sponsored</span>}
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl leading-[1.05] mt-3">{post.title}</h1>
          <p className="text-paper/70 mt-3 text-lg leading-relaxed max-w-3xl">{post.dek}</p>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-paper border-2 border-gold flex items-center justify-center overflow-hidden shrink-0">
                {by.bunny ? <SmugBunny size={34} /> : <span className="font-mono font-black text-hubris">{by.initials}</span>}
              </span>
              <div className="leading-tight">
                <div className="font-bold">{by.name}</div>
                <div className="font-mono text-[10px] text-paper/50">{by.title}</div>
                <div className="font-mono text-[10px] text-paper/40">{post.displayDate}{post.updatedDisplay ? ` · updated ${post.updatedDisplay}` : ""}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <ShareBtn label="Share" icon={<Share2 size={12} />} onClick={() => chargeShare("a social platform", 2.5)} />
              <ShareBtn label="Email" icon={<Mail size={12} />} onClick={() => chargeShare("email", 0.11)} />
              <ShareBtn label="Print" icon={<Printer size={12} />} onClick={() => chargeShare("print (Fine Print Rendering Fee)", 2.49)} />
              <ShareBtn
                label={copied ? "Copied ($1.50)" : "Copy link"}
                icon={<Link2 size={12} />}
                onClick={() => { setCopied(true); chargeShare("clipboard", 1.5); }}
              />
            </div>
          </div>
          {post.fee && (
            <div className="mt-4 inline-block bg-alarm text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded">
              ⚠ {post.fee}
            </div>
          )}
        </div>
      </div>

      <SectionShell>
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          <article className="min-w-0">
            {post.image && (
              <figure className="mb-6">
                <img src={post.image} alt="" className="w-full rounded-xl border-[3px] border-hubris shadow-[6px_6px_0_rgba(15,30,61,1)] object-cover max-h-[420px]" />
                {post.imageCaption && <figcaption className="fine-print text-ink/45 mt-2">{post.imageCaption}</figcaption>}
              </figure>
            )}

            {post.sponsored && (
              <div className="bg-gold/15 border-2 border-dashed border-gold rounded-lg px-4 py-2.5 mb-5 font-mono text-[11px] text-hubris">
                SPONSORED — {post.sponsored}
              </div>
            )}

            <WireBody body={post.body} />

            {/* byline card */}
            <div className="mt-8 bg-white border-2 border-hubris rounded-xl p-5 flex gap-4 items-start">
              <span className="w-16 h-16 rounded-full bg-hubris border-2 border-gold flex items-center justify-center shrink-0 overflow-hidden">
                {by.bunny ? <SmugBunny size={44} /> : <span className="font-mono font-black text-gold-light text-lg">{by.initials}</span>}
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-alarm font-bold">About the author</div>
                <div className="font-serif font-black text-lg">{by.name}</div>
                <div className="font-mono text-[10px] text-ink/50">{by.title}</div>
                <p className="text-sm text-ink/70 mt-1.5">{by.bio}</p>
              </div>
            </div>

            {/* tags */}
            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/45">Filed under:</span>
              {post.tags.map((t) => (
                <Link key={t} to={`/news?cat=${cat.id}`} className="font-mono text-[10px] bg-parchment border border-hubris/20 rounded px-2 py-1 hover:border-hubris">{t}</Link>
              ))}
            </div>

            {/* reading invoice */}
            <div className="mt-6 bg-hubris text-paper rounded-xl p-5 border-4 border-gold">
              <div className="font-mono text-[10px] uppercase tracking-widest text-gold-light">Your invoice for this release</div>
              <div className="mt-2 space-y-1 font-mono text-xs">
                <div className="flex justify-between"><span className="text-paper/60">Reading fee ({readTenths} × $0.19)</span><strong>${readingFee.toFixed(2)}</strong></div>
                <div className="flex justify-between"><span className="text-paper/60">Font Licensing Fee</span><strong>$3.75</strong></div>
                <div className="flex justify-between"><span className="text-paper/60">Fine Print Rendering Fee</span><strong>$2.49</strong></div>
                <div className="flex justify-between"><span className="text-paper/60">Browsing Fee (scroll-metered, session to date)</span><strong className="text-alarm">${formatMoney(browsingFee)}</strong></div>
                <div className="flex justify-between border-t border-gold/40 pt-1.5 text-sm"><span className="font-bold">Total for reading the news</span><strong className="text-gold-light">${formatMoney(readingFee + 3.75 + 2.49 + browsingFee)}</strong></div>
              </div>
              <p className="fine-print text-paper/50 mt-2">
                This invoice is informational. The charge is not. The meter does not go down, has never gone down, and is not
                configured to go down.
              </p>
            </div>

            {/* comments */}
            <div className="mt-6 bg-white border-2 border-dashed border-hubris/30 rounded-xl p-5 text-center">
              <MessageSquareOff size={26} className="mx-auto text-hubris/40" />
              <h3 className="font-serif font-black text-xl mt-2">Comments are disabled</h3>
              <p className="text-sm text-ink/60 mt-1 max-w-lg mx-auto">
                Commenting is a product. Comments cost $4.99 each, are moderated for positivity, and are published only if
                they use the word “overpriced” approvingly. {post.commentsAllowed === false && "This release is additionally closed to comment by order of the CEO."}
              </p>
              <button
                onClick={() => pushToast({ kind: "fee", title: "Comment license: $4.99", body: "Your comment has been queued behind 4,112 others, all of which are five stars. Moderation takes 6–8 eternities." })}
                className="mt-3 border-2 border-hubris font-bold text-sm px-4 py-2 rounded-lg hover:bg-parchment inline-flex items-center gap-1.5"
              >
                PURCHASE THE RIGHT TO COMMENT ($4.99)
              </button>
            </div>

            {/* prev / next */}
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {prev && (
                <Link to={`/news/${prev.slug}`} className="bg-white border-2 border-hubris/25 hover:border-hubris rounded-xl p-4 transition-colors">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink/45 flex items-center gap-1"><ArrowLeft size={11} /> Earlier release</div>
                  <div className="font-serif font-bold leading-snug mt-1">{prev.title}</div>
                </Link>
              )}
              {next && (
                <Link to={`/news/${next.slug}`} className="bg-white border-2 border-hubris/25 hover:border-hubris rounded-xl p-4 text-right transition-colors">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink/45 flex items-center gap-1 justify-end">Later release <ArrowRight size={11} /></div>
                  <div className="font-serif font-bold leading-snug mt-1">{next.title}</div>
                </Link>
              )}
            </div>

            {/* related titles */}
            <div className="mt-10">
              <Kicker>Titles mentioned in this release (mentioned = merchandised)</Kicker>
              <h2 className="font-serif font-black text-2xl sm:text-3xl mt-2">Books in This Story</h2>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                {related.map((b) => (
                  <div key={b.id} className="bg-white border-2 border-hubris rounded-xl overflow-hidden flex flex-col hover:shadow-[5px_5px_0_rgba(15,30,61,1)] transition-all">
                    <Link to={`/book/${b.id}`} className="p-3 pb-0"><Cover book={b} /></Link>
                    <div className="p-3 flex flex-col flex-1">
                      <Link to={`/book/${b.id}`} className="font-serif font-bold leading-snug hover:text-alarm">{b.title}</Link>
                      <div className="text-xs text-ink/60 mt-0.5">{b.author}</div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-black text-alarm">${b.price.toFixed(2)}</span>
                        <span className="fine-print text-ink/45">+ fees (all of them)</span>
                      </div>
                      <button
                        onClick={() => pushToast({ kind: "upsell", title: `Added: ${b.title}`, body: "Also added: Frequently Required Together ($242.50, pre-checked). Declining is common and fine, and billable." })}
                        className="mt-2 bg-hubris text-white font-bold text-xs rounded px-3 py-2 flex items-center justify-center gap-1.5 hover:bg-hubris-light"
                      >
                        <ShoppingCart size={13} /> ADD TO CART
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* sidebar */}
          <div className="space-y-5">
            {/* ad slot: frequently required together */}
            <div className="bg-white border-2 border-alarm rounded-xl overflow-hidden">
              <div className="bg-alarm text-white px-4 py-2 font-mono text-[10px] uppercase tracking-widest font-bold">
                Advertisement · Frequently Required Together
              </div>
              <div className="p-4 space-y-2">
                <p className="fine-print text-ink/50">
                  Pre-checked, as they will be at checkout. This advertisement is interactive; interacting with it does not
                  create an obligation, but the boxes are already checked, so the obligation exists anyway.
                </p>
                {REQUIRED_TOGETHER.map((u) => (
                  <label key={u.id} className="flex items-start gap-2 bg-parchment rounded px-2.5 py-2 cursor-pointer">
                    <span className="mt-0.5 shrink-0">
                      <input type="checkbox" checked={!!required[u.id]} onChange={() => toggleAd(u.id)} className="accent-[#D92D20]" />
                    </span>
                    <span className="min-w-0">
                      <span className="text-xs font-bold flex items-center gap-1.5 flex-wrap">
                        {u.name} <span className="font-mono text-alarm">${u.price.toFixed(2)}</span>
                      </span>
                      <span className="fine-print text-ink/55 block">{u.desc}</span>
                    </span>
                  </label>
                ))}
                <div className="flex justify-between font-mono text-[11px] font-bold pt-1 border-t border-dashed border-hubris/25">
                  <span>Required together</span><span className="text-alarm">$242.50</span>
                </div>
                <Link to="/catalog" className="block text-center bg-hubris text-white font-bold text-sm py-2.5 rounded-lg mt-1 hover:bg-hubris-light">
                  SHOP TITLES THAT NEED THESE
                </Link>
              </div>
            </div>

            {moreFromDesk.length > 0 && (
              <div className="bg-white border-2 border-hubris rounded-xl p-4">
                <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-hubris">More from {cat.short}</h3>
                <ul className="mt-2 space-y-2">
                  {moreFromDesk.map((p) => (
                    <li key={p.slug} className="border-b border-dashed border-hubris/15 pb-2 last:border-0">
                      <Link to={`/news/${p.slug}`} className="text-sm font-semibold leading-snug hover:text-alarm block">{p.title}</Link>
                      <div className="font-mono text-[10px] text-ink/45 mt-0.5">{p.displayDate} · {p.readMinutes} min · $0.02/page</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-hubris text-paper rounded-xl p-4 border-2 border-gold">
              <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-gold-light">Latest releases</h3>
              <ul className="mt-2 space-y-2">
                {recent.map((p) => (
                  <li key={p.slug} className="border-b border-white/10 pb-2 last:border-0">
                    <Link to={`/news/${p.slug}`} className="text-sm leading-snug hover:text-gold-light block">{p.title}</Link>
                    <div className="font-mono text-[9px] text-paper/45 mt-0.5">{p.displayDate} · {bylineFor(p.byline).name}</div>
                  </li>
                ))}
              </ul>
            </div>

            <NewsSidebar />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/news" className="inline-flex items-center gap-2 bg-hubris text-white font-bold px-6 py-3 rounded-lg hover:bg-hubris-light">
            <ArrowLeft size={15} /> BACK TO THE SYNERGY WIRE
          </Link>
          <p className="fine-print text-ink/45 mt-2">
            Every release on this site concludes at 199 words of free content with a courteous note. You have read past it.
            That is a different product, and it has been added.
          </p>
        </div>
      </SectionShell>
    </div>
  );
}

function ShareBtn({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 bg-black/30 border border-gold/40 hover:bg-gold hover:text-hubris text-paper font-mono text-[10px] font-bold px-3 py-2 rounded transition-colors"
    >
      {icon} {label}
    </button>
  );
}
