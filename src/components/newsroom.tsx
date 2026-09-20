import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock, MessageSquareOff, Rss, Tag } from "lucide-react";
import {
  ARCHIVE_BACKFILL, BYLINES, CORRECTIONS_POLICY, IN_THE_MEDIA, NEWS_CATEGORIES, NEWS_POSTS,
  PRESS_KIT, UPCOMING_EVENTS, WIRE_TICKER, bylineFor, categoryFor, type Block, type NewsPost,
} from "../data/news";
import { useShop } from "../store/ShopContext";
import { BylineAvatar, SmugBunny } from "./Bunny";

/* ------------------------------ small pieces ------------------------------ */

export function CategoryPill({ id, size = "sm" }: { id: string; size?: "sm" | "md" }) {
  const cat = categoryFor(id);
  return (
    <Link
      to={`/news?cat=${cat.id}`}
      className={`inline-flex items-center font-mono font-bold uppercase tracking-wider rounded-full border-2 transition-transform hover:-translate-y-0.5 ${
        size === "md" ? "text-[11px] px-3 py-1" : "text-[9px] px-2 py-0.5"
      }`}
      style={{ color: cat.color, borderColor: cat.color, background: `${cat.color}12` }}
    >
      {cat.short}
    </Link>
  );
}

export function BylineRow({ post, size = "sm" }: { post: NewsPost; size?: "sm" | "lg" }) {
  const b = bylineFor(post.byline);
  return (
    <div className="flex items-center gap-2.5">
      <BylineAvatar bunny={b.bunny} initials={b.initials} color={b.color} size={size === "lg" ? 52 : 34} />
      <div className="leading-tight min-w-0">
        <div className={`font-bold ${size === "lg" ? "text-base" : "text-sm"}`}>
          {b.name}
          {b.bunny && <span className="font-mono text-[9px] text-gold ml-1.5 uppercase">CEO</span>}
        </div>
        <div className="font-mono text-[10px] text-ink/50 truncate">{b.title}</div>
      </div>
    </div>
  );
}

export function PostMeta({ post, dark = false }: { post: NewsPost; dark?: boolean }) {
  const tone = dark ? "text-paper/50" : "text-ink/50";
  return (
    <div className={`font-mono text-[10px] flex flex-wrap items-center gap-x-3 gap-y-1 ${tone}`}>
      <span className="flex items-center gap-1"><CalendarDays size={10} /> {post.displayDate}</span>
      {post.updatedDisplay && <span>updated {post.updatedDisplay}</span>}
      <span className="flex items-center gap-1"><Clock size={10} /> {post.readMinutes} min read</span>
      <span className="flex items-center gap-1"><MessageSquareOff size={10} /> 0 comments (disabled)</span>
      {post.fee && <span className="text-alarm">{post.fee}</span>}
    </div>
  );
}

/* --------------------------------- the body -------------------------------- */

export function WireBody({ body }: { body: Block[] }) {
  return (
    <div className="wire-body">
      {body.map((b, i) => {
        switch (b.kind) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h":
            return <h3 key={i}>{b.text}</h3>;
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-gold bg-parchment/70 px-5 py-4 mt-6 not-italic">
                <div className="font-serif italic text-lg sm:text-xl leading-snug text-hubris">“{b.text}”</div>
                {b.attribution && (
                  <div className="font-mono text-[11px] text-ink/55 mt-2 not-italic">— {b.attribution}</div>
                )}
              </blockquote>
            );
          case "list":
            return b.ordered ? (
              <ol key={i} className="list-decimal marker:text-gold marker:font-bold">
                {b.items.map((it) => <li key={it}>{it}</li>)}
              </ol>
            ) : (
              <ul key={i} className="list-disc">
                {b.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            );
          case "note":
            return (
              <aside key={i} className="bg-hubris text-paper/85 rounded-lg p-4 mt-6 border-l-4 border-gold">
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold-light mb-1">Note from the copy desk</div>
                <p className="text-sm leading-relaxed">{b.text}</p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto scrollbar-thin mt-2">
                <table>
                  <thead>
                    <tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, ri) => (
                      <tr key={ri}>{r.map((c, ci) => <td key={ci} className={ci === 0 ? "font-semibold" : ""}>{c}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* --------------------------------- post rows -------------------------------- */

export function FeaturedPost({ post }: { post: NewsPost }) {
  const cat = categoryFor(post.category);
  return (
    <article className="bg-white border-[3px] border-hubris rounded-xl overflow-hidden shadow-[8px_8px_0_rgba(15,30,61,1)]">
      <div className="grid md:grid-cols-2">
        <Link to={`/news/${post.slug}`} className="relative block min-h-[220px] bg-hubris">
          {post.image ? (
            <img src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 hubris-grid" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-hubris/85 via-hubris/10 to-transparent" />
          <div className="absolute top-3 left-3 bg-alarm text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
            ★ Lead story · pinned by the CEO
          </div>
          {post.imageCaption && (
            <div className="absolute bottom-2 left-3 right-3 font-mono text-[9px] text-paper/70">{post.imageCaption}</div>
          )}
        </Link>
        <div className="p-5 sm:p-6 flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryPill id={post.category} size="md" />
            <span className="font-mono text-[10px] text-ink/40">Release #{4812 - NEWS_POSTS.indexOf(post)}</span>
          </div>
          <Link to={`/news/${post.slug}`} className="font-serif font-black text-2xl sm:text-3xl leading-tight mt-2 hover:text-alarm transition-colors">
            {post.title}
          </Link>
          <p className="text-sm text-ink/70 mt-2">{post.dek}</p>
          <div className="mt-4 pt-3 border-t border-dashed border-hubris/20 flex flex-wrap items-center justify-between gap-3">
            <BylineRow post={post} />
            <Link
              to={`/news/${post.slug}`}
              className="font-bold text-sm text-hubris hover:text-alarm flex items-center gap-1"
              style={{ color: cat.color }}
            >
              Read the release <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-3"><PostMeta post={post} /></div>
        </div>
      </div>
    </article>
  );
}

export function PostRow({ post, index }: { post: NewsPost; index: number }) {
  return (
    <article className="bg-white border-2 border-hubris/25 hover:border-hubris rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 transition-all hover:shadow-[5px_5px_0_rgba(15,30,61,1)]">
      <div className="sm:w-28 shrink-0 text-center sm:text-left">
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{post.displayDate}</div>
        <div className="font-serif font-black text-3xl text-hubris/15 leading-none mt-1">#{4812 - index}</div>
        <div className="mt-2 hidden sm:block"><CategoryPill id={post.category} /></div>
      </div>
      {post.image && (
        <Link to={`/news/${post.slug}`} className="shrink-0 w-full sm:w-32">
          <img src={post.image} alt="" className="w-full h-28 sm:h-24 object-cover rounded-lg border border-hubris/20" />
        </Link>
      )}
      <div className="flex-1 min-w-0">
        <div className="sm:hidden mb-1.5"><CategoryPill id={post.category} /></div>
        <Link to={`/news/${post.slug}`} className="font-serif font-black text-lg sm:text-xl leading-snug hover:text-alarm transition-colors block">
          {post.title}
        </Link>
        <p className="text-sm text-ink/65 mt-1 line-clamp-2">{post.dek}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] text-ink/50">by {bylineFor(post.byline).name}</span>
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="font-mono text-[9px] bg-parchment border border-hubris/15 rounded px-1.5 py-0.5 text-ink/60">{t}</span>
          ))}
        </div>
        <div className="mt-2"><PostMeta post={post} /></div>
      </div>
      <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
        <Link to={`/news/${post.slug}`} className="font-mono text-[11px] font-bold text-hubris hover:text-alarm flex items-center gap-1 whitespace-nowrap">
          Read more <ArrowRight size={13} />
        </Link>
        <span className="font-mono text-[9px] text-ink/40">$0.02/page</span>
      </div>
    </article>
  );
}

/* --------------------------------- sidebar --------------------------------- */

export function NewsSidebar({ onSubscribe }: { onSubscribe?: () => void }) {
  const { pushToast } = useShop();
  const [q, setQ] = useState("");
  const [subEmail, setSubEmail] = useState("");

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    NEWS_POSTS.forEach((p) => { m[p.category] = (m[p.category] ?? 0) + 1; });
    return m;
  }, []);

  const archive = useMemo(() => {
    const m: Record<string, number> = {};
    NEWS_POSTS.forEach((p) => {
      const y = p.date.slice(0, 4);
      m[y] = (m[y] ?? 0) + 1;
    });
    const years = [...Object.keys(m), ...ARCHIVE_BACKFILL.map((a) => a.year)]
      .filter((v, i, arr) => arr.indexOf(v) === i)
      .sort((a, b) => Number(b) - Number(a));
    return years.map((y) => ({
      year: y,
      count: m[y] ?? ARCHIVE_BACKFILL.find((a) => a.year === y)?.count ?? 0,
      note: ARCHIVE_BACKFILL.find((a) => a.year === y)?.note,
    }));
  }, []);

  const searchResults = q.trim()
    ? NEWS_POSTS.filter((p) => `${p.title} ${p.dek} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
    : [];

  return (
    <aside className="space-y-5 lg:sticky lg:top-40">
      {/* search */}
      <div className="bg-white border-2 border-hubris rounded-xl p-4">
        <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-hubris">Search the wire</h3>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); if (e.target.value.length === 12) pushToast({ kind: "fee", title: "Search billed", body: "Searches are billed at $0.11 each. You have typed 12 characters, which our pricing team considers a search." }); }}
          placeholder="4,812 releases, $0.11 per search…"
          className="mt-2 w-full border-2 border-hubris/25 focus:border-hubris rounded-lg px-3 py-2 text-sm focus:outline-none"
        />
        {searchResults.length > 0 && (
          <ul className="mt-2 space-y-1">
            {searchResults.map((p) => (
              <li key={p.slug}>
                <Link to={`/news/${p.slug}`} className="text-xs text-hubris hover:text-alarm line-clamp-2">{p.title}</Link>
              </li>
            ))}
          </ul>
        )}
        {q.trim() && searchResults.length === 0 && (
          <p className="fine-print text-ink/45 mt-2">No releases match “{q}”. The query has been logged and priced.</p>
        )}
      </div>

      {/* CEO card */}
      <div className="bg-hubris text-paper rounded-xl p-5 border-4 border-gold relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-20"><SmugBunny size={150} /></div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-gold-light">From the CEO's desk</div>
        <div className="font-serif font-black text-xl mt-1 leading-tight">Hubris Munnytown</div>
        <div className="font-mono text-[10px] text-paper/50">Chief Executive Rabbit · appointed Sept 2025</div>
        <p className="text-sm text-paper/75 mt-3 italic relative">
          “A checkbox is a small moral event. We have industrialized the small moral event.”
        </p>
        <Link to="/news?cat=ceo" className="relative inline-flex items-center gap-1 bg-gold text-hubris font-bold text-xs px-3 py-2 rounded-lg mt-3">
          Read his memoranda <ArrowRight size={13} />
        </Link>
      </div>

      {/* categories */}
      <div className="bg-white border-2 border-hubris rounded-xl p-4">
        <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-hubris flex items-center gap-1.5">
          <Tag size={12} /> Desks
        </h3>
        <ul className="mt-2 space-y-1">
          {NEWS_CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link to={`/news?cat=${c.id}`} className="flex items-center justify-between gap-2 text-sm hover:underline py-1 border-b border-dashed border-hubris/15 last:border-0">
                <span style={{ color: c.color }} className="font-semibold">{c.name}</span>
                <span className="font-mono text-[10px] text-ink/45">{counts[c.id] ?? 0}</span>
              </Link>
              <p className="fine-print text-ink/45 pb-1.5">{c.blurb}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* upcoming events */}
      <div className="bg-parchment border-2 border-hubris rounded-xl p-4">
        <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-hubris">Upcoming (metered)</h3>
        <ul className="mt-2 space-y-2.5">
          {UPCOMING_EVENTS.map((e) => (
            <li key={e.name} className="border-b border-dashed border-hubris/20 pb-2 last:border-0">
              <div className="font-mono text-[10px] text-alarm font-bold">{e.date} · {e.kind}</div>
              <div className="text-sm font-semibold leading-snug">{e.name}</div>
              <div className="font-mono text-[10px] text-ink/50">{e.fee}</div>
            </li>
          ))}
        </ul>
        <p className="fine-print text-ink/45 mt-2">Attendance is metered. Non-attendance is metered at the same rate (No-Show Courtesy Charge).</p>
      </div>

      {/* press kit */}
      <div className="bg-white border-2 border-hubris rounded-xl p-4">
        <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-hubris">Press kit (all items priced)</h3>
        <ul className="mt-2 space-y-1.5">
          {PRESS_KIT.map((k) => (
            <li key={k.name}>
              <button
                onClick={() => pushToast({ kind: "fee", title: `${k.price} added to your tab`, body: `${k.name}. Downloads are metered per attempt; failed downloads are billed at the same rate.` })}
                className="w-full text-left text-sm flex items-start justify-between gap-2 hover:text-alarm transition-colors border-b border-dashed border-hubris/15 pb-1.5"
              >
                <span className="leading-snug">{k.name}</span>
                <span className="font-mono text-[10px] font-bold text-alarm shrink-0">{k.price}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="fine-print text-ink/45 mt-2">*“Free” is a period we were in. We are no longer in it.</p>
      </div>

      {/* in the media */}
      <div className="bg-hubris text-paper rounded-xl p-4 border-2 border-gold/60">
        <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-gold-light">In the media</h3>
        <ul className="mt-2 space-y-2.5">
          {IN_THE_MEDIA.map((m) => (
            <li key={m.outlet} className="border-b border-white/10 pb-2 last:border-0">
              <div className="font-mono text-[10px] text-gold">{m.outlet} · {m.date}</div>
              <div className="text-xs text-paper/75 italic leading-snug">{m.line}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* newsletter */}
      <div className="bg-white border-2 border-alarm rounded-xl p-4">
        <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-alarm flex items-center gap-1.5">
          <Rss size={12} /> The Wire ($4.99/month)
        </h3>
        <p className="text-xs text-ink/60 mt-1">Every release, every fee schedule, every courteous note. Delivered by email, fax, skywriting, and cookie.</p>
        <form
          className="flex mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubscribe?.();
            pushToast({ kind: "upsell", title: "Subscribed to The Wire!", body: "$4.99/month, non-cancellable, hereditary. Your next of kin has been notified and enrolled." });
            setSubEmail("");
          }}
        >
          <input value={subEmail} onChange={(e) => setSubEmail(e.target.value)} placeholder="email (required, forever)" className="flex-1 min-w-0 border-2 border-hubris/25 rounded-l px-2.5 py-2 text-sm focus:outline-none focus:border-hubris" />
          <button className="bg-alarm text-white font-bold px-3 rounded-r text-sm shrink-0">ENROLL</button>
        </form>
        <p className="fine-print text-ink/40 mt-1">RSS feed available at $4.99/month as well. It is the same feed. It is a different product.</p>
      </div>

      {/* archive */}
      <div className="bg-parchment border-2 border-hubris rounded-xl p-4">
        <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-hubris">Archive (2006 → today)</h3>
        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
          {archive.map((a) => (
            <li key={a.year} className="flex items-baseline justify-between gap-1 text-sm">
              <Link to={`/news?year=${a.year}`} className="font-mono hover:text-alarm">{a.year}</Link>
              <span className="font-mono text-[10px] text-ink/45">{a.count}</span>
            </li>
          ))}
        </ul>
        <p className="fine-print text-ink/45 mt-2">Archive access: $4.99 per release. Search within the archive: a different product.</p>
      </div>

      {/* corrections policy */}
      <div className="bg-white border-2 border-hubris/25 rounded-xl p-4">
        <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-hubris">{CORRECTIONS_POLICY.title}</h3>
        <ul className="mt-2 space-y-1.5">
          {CORRECTIONS_POLICY.lines.map((l) => (
            <li key={l} className="fine-print text-ink/60 leading-snug">— {l}</li>
          ))}
        </ul>
      </div>

      {/* bylines */}
      <div className="bg-white border-2 border-hubris rounded-xl p-4">
        <h3 className="font-mono text-[11px] uppercase tracking-widest font-bold text-hubris">The newsroom</h3>
        <ul className="mt-2 space-y-2">
          {BYLINES.map((b) => (
            <li key={b.id} className="flex gap-2.5 items-start">
              <BylineAvatar bunny={b.bunny} initials={b.initials} color={b.color} size={30} />
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight">{b.name}</div>
                <div className="font-mono text-[9px] text-ink/50">{b.title}</div>
                <p className="fine-print text-ink/45 leading-snug mt-0.5">{b.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function WireTicker() {
  const row = [...WIRE_TICKER, ...WIRE_TICKER];
  return (
    <div className="bg-alarm text-white overflow-hidden py-1.5 border-y-2 border-hubris">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-mono text-[11px] uppercase tracking-wider px-5 border-r border-white/25">
            ▲ {t}
          </span>
        ))}
      </div>
    </div>
  );
}
