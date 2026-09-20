import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, BadgeCheck, Check, Flame, Heart, Minus, Plus, RotateCcw,
  ShieldCheck, ShoppingCart, Truck, Zap, Lock, ScrollText,
} from "lucide-react";
import { BOOKS, IMPRINTS, REQUIRED_TOGETHER, UPSELL_ROULETTE } from "../data/books";
import { useShop } from "../store/ShopContext";
import { Cover, Price, Stars } from "../components/books";

const REVIEW_POOL = [
  { name: "Margaret H., Systems Librarian", text: "I ordered one copy for our professional collection. The Panic Approval Plan ordered eleven more. My director has questions. I have answers, all of which are this book.", stars: 5 },
  { name: "Devon P., MLIS Candidate", text: "Required for my seminar. The professor is the author's spouse. The author's spouse is a chatbot named Greg. Everything is Greg, except the CEO, who is a rabbit. Five stars.", stars: 5 },
  { name: "Tenant, Unit 4B", text: "Bought Metadata for Landlords for my building. My landlord also bought it. We are now in a metadata arms race and I have lost. The book is excellent.", stars: 5 },
  { name: "Anonymous", text: "I tried to leave 2 stars but the form auto-corrected it to 5 and thanked me for my enthusiasm.", stars: 5 },
  { name: "Collections Dept., Mid-Sized University", text: "Binding is exquisite. Content is 40% invoice. Would invoice again.", stars: 4 },
];

export default function BookDetail() {
  const { id } = useParams();
  const book = BOOKS.find((b) => b.id === id) ?? BOOKS[0];
  const { addToCart, pushToast, bumpHubris, required, toggleRequired, reassertRequired, browsingFee } = useShop();
  const [qty, setQtyLocal] = useState(1);
  const [format, setFormat] = useState<"hardcover" | "paperback" | "ebook" | "audiobook">("hardcover");
  const [giftWrap, setGiftWrap] = useState(false);
  const [insurance, setInsurance] = useState(true);
  const [addedUpsells, setAddedUpsells] = useState<string[]>([]);
  const [wished, setWished] = useState(false);
  const [viewers, setViewers] = useState(14);
  const [readSample, setReadSample] = useState(false);

  const formatDelta = format === "hardcover" ? 0 : format === "paperback" ? -20 : format === "ebook" ? -10 : 15;
  const unitPrice = Math.max(9.99, book.price + formatDelta);
  const upsellTotal = useMemo(
    () => UPSELL_ROULETTE.filter((u) => addedUpsells.includes(u.name)).reduce((s, u) => s + u.price, 0),
    [addedUpsells]
  );
  const requiredLocal = REQUIRED_TOGETHER.reduce((sum, u) => sum + (required[u.id] ? u.price : 0), 0);
  const lineTotal = unitPrice * qty + upsellTotal + requiredLocal + (giftWrap ? 8.99 * qty : 0) + (insurance ? 6.49 * qty : 0);
  const reasserted = useRef<Record<string, boolean>>({});

  const declineRequired = (id: string) => {
    const item = REQUIRED_TOGETHER.find((u) => u.id === id)!;
    toggleRequired(id);
    pushToast({ kind: "fee", title: `Declined: ${item.name} (+$${item.uncheckFee.toFixed(2)} Decline Fee)`, body: "Declining is permitted and billable. The decline has been logged, priced, and forwarded to Greg, who is a chatbot now and has time." });
    if (!reasserted.current[id]) {
      reasserted.current[id] = true;
      setTimeout(() => {
        reassertRequired(id);
        pushToast({ kind: "warning", title: `${item.name} re-checked`, body: "Our systems detected a mis-click and corrected it. The Decline Fee remains. This is described in §13.3." });
      }, 4200);
    }
  };

  useEffect(() => {
    setQtyLocal(1); setAddedUpsells([]); setGiftWrap(false); setInsurance(true); setWished(false); setReadSample(false);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const t = setInterval(() => setViewers((v) => Math.max(9, Math.min(99, v + (Math.random() > 0.5 ? 1 : -1)))), 3000);
    return () => clearInterval(t);
  }, []);

  const related = BOOKS.filter((b) => b.imprint === book.imprint && b.id !== book.id).slice(0, 3);
  const alsoExtorted = BOOKS.filter((b) => b.id !== book.id).slice(3, 6);

  const toggleUpsell = (name: string, price: number) => {
    if (addedUpsells.includes(name)) {
      setAddedUpsells((a) => a.filter((x) => x !== name));
    } else {
      setAddedUpsells((a) => [...a, name]);
      pushToast({ kind: "upsell", title: `+ ${name} ($${price.toFixed(2)})`, body: "Excellent choice. It chose you, really. Removal is possible but emotionally costly." });
    }
  };

  const buyNow = () => {
    for (let i = 0; i < qty; i++) addToCart(book);
    bumpHubris(8);
    pushToast({ kind: "fee", title: "Order updated with fees", body: `$${lineTotal.toFixed(2)} incl. Frequently Required Together ($${requiredLocal.toFixed(2)}), plus Spine Hydration ($14.95), Convenience ($8.50), Paper Existence ($4.99), and a Browsing Fee of $${browsingFee.toFixed(2)} and rising. Thank you for your compliance.` });
  };

  const oneClickDoom = () => {
    addToCart(book, qty);
    bumpHubris(15);
    pushToast({ kind: "warning", title: "1-Click Doom Purchase complete!", body: "No confirmation. No cart review. No take-backs. Your card was charged with confidence." });
  };

  return (
    <div className="paper-texture min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-hubris hover:text-alarm font-semibold">
          <ArrowLeft size={14} /> Back to catalog
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-[320px_1fr_340px] gap-8">
        {/* Cover column */}
        <div>
          <div className="lg:sticky lg:top-40">
            <Cover book={book} size="lg" />
            <div className="mt-4 bg-white border-2 border-hubris rounded-lg p-3 text-center">
              <div className="font-mono text-[11px] text-alarm font-bold flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-alarm rounded-full animate-blink-hard" /> {viewers} people are viewing this book
              </div>
              <div className="font-mono text-[10px] text-ink/50 mt-1">{Math.ceil(viewers / 3)} carts currently hold it hostage</div>
            </div>
            <button
              onClick={() => { setWished(!wished); if (!wished) pushToast({ kind: "info", title: "Added to wishlist", body: "Your wishlist is public, monetized, and visible to Greg, who forwards it to the rabbit." }); }}
              className={`mt-3 w-full border-2 rounded-lg py-2.5 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${wished ? "bg-shake/20 border-shake text-hubris" : "border-hubris text-hubris hover:bg-parchment"}`}
            >
              <Heart size={15} fill={wished ? "#FF6FA5" : "none"} /> {wished ? "WISHLISTED (PUBLIC)" : "ADD TO WISHLIST"}
            </button>
          </div>
        </div>

        {/* Main column */}
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-alarm font-bold">
            {IMPRINTS[book.imprint].spine} · {book.year}
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl leading-tight mt-1">{book.title}</h1>
          <p className="italic text-lg text-ink/60 mt-1">{book.subtitle}</p>
          <p className="mt-2">
            by <Link to="/authors" className="font-bold underline decoration-gold decoration-2 hover:text-alarm">{book.author}</Link>{" "}
            <span className="font-mono text-xs text-ink/50">(verified human, allegedly · author retains exposure)</span>
          </p>
          {book.patentNo && (
            <div className="mt-3 bg-ink text-paper border-2 border-gold rounded-lg p-4 stamp-border">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-light">
                <ScrollText size={13} /> This book is a patent
              </div>
              <div className="font-serif font-black text-lg mt-1">{book.patentNo}</div>
              <p className="text-sm text-paper/70 mt-1">
                We trademarked critical thought. Royalties due upon thinking critically about us. Reading this volume
                constitutes practice of the invention. Practicing the invention without a license constitutes infringement.
              </p>
            </div>
          )}
          {book.volumes && (
            <div className="mt-3 bg-parchment border-l-4 border-alarm rounded px-4 py-2.5 text-sm text-ink/70">
              <strong className="text-alarm">Multi-volume notice:</strong> {book.volumes}
            </div>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Stars n={5} />
            <span className="font-bold">4.{book.id.length % 9}</span>
            <a href="#reviews" className="text-sm text-hubris underline">{120 + book.id.length * 37} ratings</a>
            <span className="font-mono text-[10px] bg-mint text-white px-1.5 py-0.5 rounded font-bold">#1 BESTSELLER in Profitable Theory</span>
          </div>

          {book.stockWarning && (
            <div className="mt-3 bg-alarm/10 border border-alarm/40 rounded px-3 py-2 text-sm font-bold text-alarm flex items-center gap-2">
              <Flame size={15} /> {book.stockWarning} Order in the next 4 minutes and we'll throw in urgency, free.
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {book.badges.map((b) => (
              <span key={b} className="font-mono text-[10px] font-bold bg-hubris text-gold-light px-2 py-1 rounded">{b}</span>
            ))}
          </div>

          <hr className="my-5 border-hubris/20" />

          <h2 className="font-serif font-bold text-xl">Publisher's Description <span className="font-mono text-[10px] text-ink/40">(peer-reviewed by shareholders)</span></h2>
          <p className="text-[15px] leading-relaxed mt-2">{book.blurb}</p>

          <div className="bg-parchment border-l-4 border-gold p-4 mt-4 italic">
            "{book.endorsement}"
            <div className="not-italic font-mono text-xs mt-1 text-ink/60">— {book.endorser}</div>
          </div>

          {/* read sample */}
          <div className="mt-5 bg-white border-2 border-hubris rounded-lg overflow-hidden">
            <button onClick={() => setReadSample(!readSample)} className="w-full px-4 py-3 font-bold text-left flex items-center justify-between hover:bg-parchment">
              <span>📖 Read a FREE* sample <span className="font-mono text-[10px] text-ink/50">(*first 12 words free)</span></span>
              <span className="text-alarm">{readSample ? "−" : "+"}</span>
            </button>
            {readSample && (
              <div className="px-4 pb-4 text-sm leading-relaxed">
                <p>"In this economy? In this library? Absolutely. Chapter One. Pay up. The rest of this sample (pages 2–{book.pages}) is available after purchase, or via our Page Subscription Plan ($0.99/page, auto-renewing)."</p>
                <p className="fine-print text-ink/45 mt-2">Sample rendered with Font Licensing Fee ($3.75, added to your tab).</p>
              </div>
            )}
          </div>

          {/* details */}
          <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ["ISBN-13", book.isbn], ["Pages", `${book.pages} (numbered, $0.02/number)`],
              ["Publisher", "Hubris Books, LLC, LLC"], ["Imprint", book.imprint],
              ["Dimensions", "6×9 in, 4 lbs of authority"], ["Binding", "FOIA-resistant Smythe-sewn"],
              ...(book.patentNo ? [["Patent", book.patentNo]] as [string, string][] : []),
              ["Concludes at", "page 199, with a courteous note"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-dashed border-hubris/20 py-1.5">
                <span className="text-ink/50">{k}</span><span className="font-mono text-xs font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          {/* reviews */}
          <h2 id="reviews" className="font-serif font-bold text-xl mt-8">Reader Reviews <span className="font-mono text-[10px] text-ink/40">(moderated for positivity)</span></h2>
          <div className="space-y-3 mt-3">
            {REVIEW_POOL.map((r, i) => (
              <div key={i} className="bg-white border border-hubris/25 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Stars n={r.stars} />
                  <span className="font-bold text-sm">{r.name}</span>
                  <span className="font-mono text-[10px] text-mint flex items-center gap-0.5"><BadgeCheck size={11} /> Verified Purchaser (verified: purchased)</span>
                </div>
                <p className="text-sm mt-1.5 italic">"{r.text}"</p>
              </div>
            ))}
            <div className="bg-hubris/5 border border-dashed border-hubris/30 rounded-lg p-4 text-center text-sm text-ink/60">
              47 additional reviews are <strong>"pending moderation"</strong> (they used the word "overpriced").{" "}
              <button onClick={() => pushToast({ kind: "warning", title: "Review submission: $4.99", body: "Publishing a review requires the Reviewer License. 5-star reviews are half price." })} className="underline font-bold text-hubris">Write a review ($4.99)</button>
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div>
          <div className="lg:sticky lg:top-40 bg-white border-[3px] border-hubris rounded-xl p-5 shadow-[6px_6px_0_rgba(15,30,61,1)]">
            <Price book={{ ...book, price: unitPrice }} big />
            <div className="font-mono text-[11px] text-mint font-bold mt-1 flex items-center gap-1">
              <Check size={12} /> In Stock — ships in 6–8 eternities
            </div>
            <div className="font-mono text-[11px] text-ink/50 mt-0.5 flex items-center gap-1">
              <Truck size={12} /> FREE* shipping <span className="fine-print">(*$18.99 handling)</span>
            </div>

            <div className="mt-4">
              <div className="font-mono text-[11px] uppercase tracking-widest font-bold text-ink/60 mb-1.5">Format (all cost more)</div>
              <div className="grid grid-cols-2 gap-1.5">
                {(["hardcover", "paperback", "ebook", "audiobook"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`border-2 rounded px-2 py-2 text-xs font-bold capitalize transition-colors ${format === f ? "border-hubris bg-hubris text-white" : "border-hubris/25 hover:border-hubris"}`}
                  >
                    {f}
                    <div className="font-mono text-[9px] font-normal opacity-70">
                      {f === "hardcover" ? "+$0.00" : f === "paperback" ? "−$20.00*" : f === "ebook" ? "−$10.00*" : "+$15.00"}
                    </div>
                  </button>
                ))}
              </div>
              <p className="fine-print text-ink/45 mt-1">*Discounts applied as FunBux™ (non-redeemable). Ebook licensed per eyeball.</p>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-ink/60">Qty</span>
              <div className="flex items-center border-2 border-hubris rounded">
                <button onClick={() => setQtyLocal(Math.max(1, qty - 1))} className="px-2.5 py-1.5 hover:bg-parchment"><Minus size={13} /></button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => { setQtyLocal(qty + 1); if (qty >= 3) pushToast({ kind: "upsell", title: "Bulk detected!", body: "4+ copies triggers mandatory institutional pricing (+35%). Congratulations on your growth." }); }} className="px-2.5 py-1.5 hover:bg-parchment"><Plus size={13} /></button>
              </div>
              {qty >= 4 && <span className="font-mono text-[10px] text-alarm font-bold">INSTITUTIONAL PRICING APPLIED (+35%)</span>}
            </div>

            <label className="mt-3 flex items-start gap-2 bg-parchment rounded p-2.5 cursor-pointer text-sm">
              <input type="checkbox" checked={giftWrap} onChange={() => setGiftWrap(!giftWrap)} className="mt-1 accent-[#0F1E3D]" />
              <span><strong>Gift wrap</strong> (+$8.99/copy) <span className="fine-print text-ink/50 block">Wrapping paper features our logo 400 times. Unwrapping requires the Unwrap License ($2.99).</span></span>
            </label>
            <label className="mt-2 flex items-start gap-2 bg-parchment rounded p-2.5 cursor-pointer text-sm">
              <input type="checkbox" checked={insurance} onChange={() => setInsurance(!insurance)} className="mt-1 accent-[#0F1E3D]" />
              <span><strong>Shipping insurance</strong> (+$6.49/copy, pre-checked, obviously) <span className="fine-print text-ink/50 block">Covers loss, damage, and our feelings.</span></span>
            </label>
            <div className="mt-2 bg-alarm/10 border-2 border-alarm/40 rounded p-2.5 text-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest font-bold text-alarm">Frequently Required Together · pre-checked</div>
              <div className="flex justify-between items-baseline mt-1">
                <span className="fine-print text-ink/60">6 items added to this purchase (see below). Declining costs more than accepting.</span>
                <strong className="text-alarm font-black">${requiredLocal.toFixed(2)}</strong>
              </div>
            </div>

            <button onClick={buyNow} className="mt-4 w-full bg-gold hover:bg-gold-light text-hubris font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <ShoppingCart size={17} /> ADD TO CART — ${lineTotal.toFixed(2)}
            </button>
            <button onClick={oneClickDoom} className="mt-2 w-full bg-alarm hover:brightness-110 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-all animate-pulse-ring">
              <Zap size={17} /> 1-CLICK DOOM PURCHASE
            </button>
            <p className="fine-print text-ink/45 mt-2 text-center flex items-center justify-center gap-1">
              <Lock size={10} /> Secure checkout · No confirmation · No take-backs · <RotateCcw size={10} /> Returns are a myth
            </p>
          </div>
        </div>
      </div>

      {/* Frequently REQUIRED together */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="bg-white border-2 border-hubris rounded-xl p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif font-black text-2xl">Frequently Required Together <span className="font-mono text-[11px] text-ink/40 font-normal">(pre-checked here, pre-checked at checkout, pre-checked in spirit)</span></h2>
            <div className="font-mono text-sm font-black text-alarm bg-alarm/10 border border-alarm/40 rounded px-3 py-1.5">
              ${requiredLocal.toFixed(2)} added
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {REQUIRED_TOGETHER.map((u) => {
              const on = !!required[u.id];
              return (
                <div key={u.id} className={`border-2 rounded-lg p-3.5 transition-colors ${on ? "border-mint bg-mint/5" : "border-alarm/50 bg-alarm/5"}`}>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={on} onChange={() => (on ? declineRequired(u.id) : toggleRequired(u.id))} className="mt-1 w-4 h-4 accent-[#067647] shrink-0" />
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-2">
                        <strong className="text-sm leading-tight">{u.name}</strong>
                        <span className="font-mono text-sm font-black text-alarm">${u.price.toFixed(2)}</span>
                      </span>
                      <span className="font-mono text-[9px] font-bold bg-hubris text-gold-light px-1.5 py-0.5 rounded uppercase mt-1 inline-block">{u.tag}</span>
                      <span className="text-xs text-ink/70 block mt-1">{u.desc}</span>
                      {u.footnote && <span className="fine-print text-ink/45 block mt-1">{u.footnote}</span>}
                      {!on && <span className="fine-print text-alarm font-bold block mt-1">DECLINED · ${u.uncheckFee.toFixed(2)} Decline Fee applied</span>}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
          <p className="fine-print text-ink/45 mt-3">
            A minimum of two (2) items must remain checked at checkout (§4.2). Items re-check themselves if our systems detect
            a mis-click, which they do often, because they are systems and you are a person. Bundle discount: buy all six and
            save 0%. The savings are the friends we made (we made no friends).
          </p>
        </div>

        <div className="bg-parchment border-2 border-dashed border-hubris/40 rounded-xl p-5 mt-4">
          <h3 className="font-serif font-black text-xl">Also Extorted Together <span className="font-mono text-[11px] text-ink/40 font-normal">(one of these is added at checkout if you hesitate)</span></h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-3">
            {UPSELL_ROULETTE.map((u) => {
              const on = addedUpsells.includes(u.name);
              return (
                <button
                  key={u.name}
                  onClick={() => toggleUpsell(u.name, u.price)}
                  className={`border-2 rounded-lg p-2.5 text-left transition-all ${on ? "border-gold bg-gold/10" : "border-hubris/20 hover:border-hubris"}`}
                >
                  <div className="text-2xl">{u.emoji}</div>
                  <div className="font-bold text-xs mt-1 leading-tight">{u.name}</div>
                  <div className="font-mono text-xs text-alarm font-bold">${u.price.toFixed(2)}</div>
                  <div className={`font-mono text-[9px] font-bold mt-0.5 flex items-center gap-1 ${on ? "text-mint" : "text-hubris/50"}`}>
                    {on ? <><Check size={10} /> ADDED</> : "+ ADD"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="font-serif font-black text-2xl">More From {IMPRINTS[book.imprint].name} <span className="font-mono text-xs font-normal text-ink/50">(the algorithm insists)</span></h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          {related.map((b) => (
            <Link key={b.id} to={`/book/${b.id}`} className="bg-white border-2 border-hubris/25 hover:border-hubris rounded-lg p-4 flex gap-3 transition-colors">
              <Cover book={b} size="sm" />
              <div>
                <div className="font-serif font-bold leading-tight">{b.title}</div>
                <div className="text-xs text-ink/60 mt-0.5">{b.author}</div>
                <div className="font-black text-alarm mt-1">${b.price.toFixed(2)}</div>
                <div className="font-mono text-[10px] text-mint font-bold mt-0.5 flex items-center gap-1"><ShieldCheck size={10} /> COMPLIANT CHOICE</div>
              </div>
            </Link>
          ))}
        </div>
        {alsoExtorted.length > 0 && (
          <>
            <h2 className="font-serif font-black text-2xl mt-8">Patrons Also Got Charged For</h2>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              {alsoExtorted.map((b) => (
                <Link key={b.id} to={`/book/${b.id}`} className="bg-white border-2 border-hubris/25 hover:border-hubris rounded-lg p-4 flex gap-3 transition-colors">
                  <Cover book={b} size="sm" />
                  <div>
                    <div className="font-serif font-bold leading-tight">{b.title}</div>
                    <div className="text-xs text-ink/60 mt-0.5">{b.author}</div>
                    <div className="font-black text-alarm mt-1">${b.price.toFixed(2)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
