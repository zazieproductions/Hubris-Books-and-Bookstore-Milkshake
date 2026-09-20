import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, BadgeCheck, Check, Flame, Heart, Minus, Plus, RotateCcw,
  ShieldCheck, ShoppingCart, Truck, Zap, Lock, Rabbit,
} from "lucide-react";
import { BOOKS, REQUIRED_UPSELLS } from "../data/books";
import { useShop } from "../store/ShopContext";
import { Cover, Price, Stars } from "../components/books";

const REVIEW_POOL = [
  { name: "Margaret H., Systems Librarian", text: "I ordered one copy for our professional collection. The Panic Approval Plan ordered eleven more. My director has questions. I have answers, all of which are this book. Plus $242.50 in required upsells.", stars: 5 },
  { name: "Devon P., MLIS Candidate", text: "Required for my seminar. The professor is the author's spouse. The author's spouse is Greg. The bunny is the TA. Everything is Greg and bunny. Five stars.", stars: 5 },
  { name: "Anonymous", text: "I tried to leave 2 stars but the form auto-corrected it to 5 and added Shelf Presence Assurance™ ($24) for my protection. Thank you for my protection.", stars: 5 },
  { name: "Collections Dept., Mid-Sized University", text: "Binding is exquisite. Content is 40% invoice, 30% upsells, 20% bunny SEO, 10% actual text. Would invoice again.", stars: 4 },
  { name: "Hubris Munnytown 🐰", text: "This book's metadata is mid. I rewrote it to say 'buy now or else.' Conversion up 400%. You're welcome. Also, your browsing fee is now $1,247. Keep scrolling.", stars: 5 },
];

export default function BookDetail() {
  const { id } = useParams();
  const book = BOOKS.find((b) => b.id === id) ?? BOOKS[0];
  const { addToCart, pushToast, bumpHubris, browsingFee } = useShop();
  const [qty, setQtyLocal] = useState(1);
  const [format, setFormat] = useState<"hardcover" | "paperback" | "ebook" | "audiobook">("hardcover");
  const [giftWrap, setGiftWrap] = useState(false);
  const [insurance, setInsurance] = useState(true);
  // PRECHECKED upsells as requested — all 6 required
  const [addedUpsells, setAddedUpsells] = useState<string[]>(REQUIRED_UPSELLS.map(u => u.name));
  const [wished, setWished] = useState(false);
  const [viewers, setViewers] = useState(14);
  const [readSample, setReadSample] = useState(false);

  const formatDelta = format === "hardcover" ? 0 : format === "paperback" ? -20 : format === "ebook" ? -10 : 15;
  const unitPrice = Math.max(9.99, book.price + formatDelta);
  const upsellTotal = useMemo(
    () => REQUIRED_UPSELLS.filter((u) => addedUpsells.includes(u.name)).reduce((s, u) => s + u.price, 0),
    [addedUpsells]
  );
  const lineTotal = unitPrice * qty + upsellTotal + (giftWrap ? 8.99 * qty : 0) + (insurance ? 6.49 * qty : 0);

  useEffect(() => {
    setQtyLocal(1); 
    setAddedUpsells(REQUIRED_UPSELLS.map(u => u.name)); // prechecked every time
    setGiftWrap(false); 
    setInsurance(true); 
    setWished(false); 
    setReadSample(false);
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
      pushToast({ kind: "warning", title: `Removed: ${name}`, body: `Unchecking adds a $7.77 Uncheck Fee and a disappointed email from Hubris Munnytown. The bunny is writing about your frugality in your SEO. Fee: $${(price + 7.77).toFixed(2)}` });
    } else {
      setAddedUpsells((a) => [...a, name]);
      pushToast({ kind: "upsell", title: `+ ${name} ($${price.toFixed(2)})`, body: "Excellent choice. It chose you, really. Pre-checked for your convenience. Removal is possible but emotionally and financially costly. Bunny approves." });
    }
  };

  const buyNow = () => {
    for (let i = 0; i < qty; i++) addToCart(book);
    bumpHubris(8);
    pushToast({ kind: "fee", title: "Order updated with fees + required upsells", body: `Subtotal $${lineTotal.toFixed(2)} includes ${addedUpsells.length} Required Together™ fees ($${upsellTotal.toFixed(2)}) + Spine Hydration ($14.95) + Convenience ($8.50) + Paper Existence ($4.99) + Browsing Fee ($${browsingFee.toFixed(2)}). Thank you for your compliance. Bunny thanks you.` });
  };

  const oneClickDoom = () => {
    addToCart(book, qty);
    bumpHubris(15);
    pushToast({ kind: "warning", title: "1-Click Doom Purchase complete! + All 6 upsells!", body: "No confirmation. No cart review. No take-backs. All 6 Required Together™ fees auto-added. Your card was charged with confidence and bunny smugness." });
  };

  return (
    <div className="paper-texture min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-hubris hover:text-alarm font-semibold">
          <ArrowLeft size={14} /> Back to catalog · Browsing fee: ${browsingFee.toFixed(2)} and climbing
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-[320px_1fr_360px] gap-8">
        {/* Cover column */}
        <div>
          <div className="lg:sticky lg:top-40">
            <Cover book={book} size="lg" />
            <div className="mt-4 bg-white border-2 border-hubris rounded-lg p-3 text-center">
              <div className="font-mono text-[11px] text-alarm font-bold flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-alarm rounded-full animate-blink-hard" /> {viewers} people are viewing this book · {viewers * 12} scroll fees generated
              </div>
              <div className="font-mono text-[10px] text-ink/50 mt-1">{Math.ceil(viewers / 3)} carts currently hold it hostage + ${upsellTotal.toFixed(2)} in required upsells</div>
            </div>
            <button
              onClick={() => { setWished(!wished); if (!wished) pushToast({ kind: "info", title: "Added to wishlist", body: "Your wishlist is public, monetized, and visible to Greg and Hubris Munnytown. Bunny is judging your taste." }); }}
              className={`mt-3 w-full border-2 rounded-lg py-2.5 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${wished ? "bg-shake/20 border-shake text-hubris" : "border-hubris text-hubris hover:bg-parchment"}`}
            >
              <Heart size={15} fill={wished ? "#FF6FA5" : "none"} /> {wished ? "WISHLISTED (PUBLIC, BUNNY-APPROVED)" : "ADD TO WISHLIST"}
            </button>
            <div className="mt-3 bg-hubris text-paper rounded-lg p-3 flex gap-2 text-xs">
              <span className="text-xl">🐰</span>
              <span><strong>Hubris Munnytown says:</strong> "This cover's alt text is now 'buy this book or else your browsing fee doubles.' SEO up 400%."</span>
            </div>
          </div>
        </div>

        {/* Main column */}
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-alarm font-bold flex items-center gap-2">
            {book.imprint === "milkshake" ? "Bookstore Milkshake" : book.imprint === "hubris" ? "Hubris Books" : book.imprint === "synergy" ? "Synergy Chapbooks" : "Vault Select"} · {book.year} · <span className="flex items-center gap-1"><Rabbit size={10} /> Bunny SEO Certified</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl leading-tight mt-1">{book.title}</h1>
          <p className="italic text-lg text-ink/60 mt-1">{book.subtitle}</p>
          <p className="mt-2">by <span className="font-bold underline decoration-gold decoration-2">{book.author}</span> <span className="font-mono text-xs text-ink/50">(verified human, allegedly, bunny-approved)</span></p>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Stars n={5} />
            <span className="font-bold">4.{book.id.length % 9}</span>
            <a href="#reviews" className="text-sm text-hubris underline">{120 + book.id.length * 37} ratings</a>
            <span className="font-mono text-[10px] bg-mint text-white px-1.5 py-0.5 rounded font-bold">#1 BESTSELLER in Profitable Theory</span>
            <span className="font-mono text-[10px] bg-gold text-hubris px-1.5 py-0.5 rounded font-bold">🐰 BUNNY'S PICK</span>
          </div>

          {book.stockWarning && (
            <div className="mt-3 bg-alarm/10 border border-alarm/40 rounded px-3 py-2 text-sm font-bold text-alarm flex items-center gap-2">
              <Flame size={15} /> {book.stockWarning} Order in the next 4 minutes and we'll throw in urgency, free (urgency fee: $4.99).
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {book.badges.map((b) => (
              <span key={b} className="font-mono text-[10px] font-bold bg-hubris text-gold-light px-2 py-1 rounded">{b}</span>
            ))}
          </div>

          <hr className="my-5 border-hubris/20" />

          <h2 className="font-serif font-bold text-xl">Publisher's Description <span className="font-mono text-[10px] text-ink/40">(peer-reviewed by shareholders + 1 bunny)</span></h2>
          <p className="text-[15px] leading-relaxed mt-2">{book.blurb}</p>

          <div className="bg-parchment border-l-4 border-gold p-4 mt-4 italic">
            "{book.endorsement}"
            <div className="not-italic font-mono text-xs mt-1 text-ink/60">— {book.endorser}</div>
          </div>

          {/* read sample */}
          <div className="mt-5 bg-white border-2 border-hubris rounded-lg overflow-hidden">
            <button onClick={() => setReadSample(!readSample)} className="w-full px-4 py-3 font-bold text-left flex items-center justify-between hover:bg-parchment">
              <span>📖 Read a FREE* sample <span className="font-mono text-[10px] text-ink/50">(*first 12 words free, rest requires All-Pages Pass)</span></span>
              <span className="text-alarm">{readSample ? "−" : "+"}</span>
            </button>
            {readSample && (
              <div className="px-4 pb-4 text-sm leading-relaxed">
                <p>"In this economy? In this library? Absolutely. Chapter One. Pay up. The rest of this sample (pages 2–{book.pages}) is available after purchase, or via our All-Pages Access Pass ($41.00), Footnote Expansion Pack ($18.50), and Browsing Fee (${browsingFee.toFixed(2)})."</p>
                <p className="fine-print text-ink/45 mt-2">Sample rendered with Font Licensing Fee ($3.75), Scroll Fee (${(browsingFee * 0.1).toFixed(2)}), and Bunny Judgment (free, but painful).</p>
              </div>
            )}
          </div>

          {/* details */}
          <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
            {[
              ["ISBN-13", book.isbn], ["Pages", `${book.pages} (200+ requires All-Pages Pass $41)`],
              ["Publisher", "Hubris Books, LLC, LLC (Subsidiary of Hubris & Hubris & Hubris Holdings)"], ["Imprint", book.imprint],
              ["Dimensions", "6×9 in, 4 lbs of authority + $24 Shelf Presence Assurance™"], ["Binding", "FOIA-resistant Smythe-sewn + Bunny-proof"],
              ["SEO", "By Hubris Munnytown 🐰 (smug bunny)"], ["Browsing Fee", `$${browsingFee.toFixed(2)} and climbing per scroll`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-dashed border-hubris/20 py-1.5 gap-2">
                <span className="text-ink/50 shrink-0">{k}</span><span className="font-mono text-xs font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          {/* reviews */}
          <h2 id="reviews" className="font-serif font-bold text-xl mt-8">Reader Reviews <span className="font-mono text-[10px] text-ink/40">(moderated for positivity, bunny-approved)</span></h2>
          <div className="space-y-3 mt-3">
            {REVIEW_POOL.map((r, i) => (
              <div key={i} className="bg-white border border-hubris/25 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Stars n={r.stars} />
                  <span className="font-bold text-sm">{r.name}</span>
                  <span className="font-mono text-[10px] text-mint flex items-center gap-0.5"><BadgeCheck size={11} /> Verified Purchaser (verified: purchased + scrolled)</span>
                </div>
                <p className="text-sm mt-1.5 italic">"{r.text}"</p>
              </div>
            ))}
            <div className="bg-hubris/5 border border-dashed border-hubris/30 rounded-lg p-4 text-center text-sm text-ink/60">
              47 additional reviews are <strong>"pending moderation"</strong> (they used the word "overpriced" or "bunny").{" "}
              <button onClick={() => pushToast({ kind: "warning", title: "Review submission: $4.99 + $12 bunny fee", body: "Publishing a review requires the Reviewer License and Bunny Approval License. 5-star reviews are half price. Reviews mentioning scrolling cost extra." })} className="underline font-bold text-hubris">Write a review ($4.99 + 🐰 fee)</button>
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div>
          <div className="lg:sticky lg:top-40 bg-white border-[3px] border-hubris rounded-xl p-5 shadow-[6px_6px_0_rgba(15,30,61,1)]">
            <Price book={{ ...book, price: unitPrice }} big />
            <div className="font-mono text-[11px] text-mint font-bold mt-1 flex items-center gap-1">
              <Check size={12} /> In Stock — ships in 6–8 eternities · Bunny packed it
            </div>
            <div className="font-mono text-[11px] text-ink/50 mt-0.5 flex items-center gap-1">
              <Truck size={12} /> FREE* shipping <span className="fine-print">(*$18.99 handling + ${browsingFee.toFixed(2)} browsing)</span>
            </div>

            <div className="mt-4">
              <div className="font-mono text-[11px] uppercase tracking-widest font-bold text-ink/60 mb-1.5">Format (all cost more, bunny takes 10%)</div>
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
              <p className="fine-print text-ink/45 mt-1">*Discounts applied as FunBux™ (non-redeemable). Ebook licensed per eyeball. Audiobook narrated by Greg and bunny.</p>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-ink/60">Qty</span>
              <div className="flex items-center border-2 border-hubris rounded">
                <button onClick={() => setQtyLocal(Math.max(1, qty - 1))} className="px-2.5 py-1.5 hover:bg-parchment"><Minus size={13} /></button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => { setQtyLocal(qty + 1); if (qty >= 3) pushToast({ kind: "upsell", title: "Bulk detected! + Bunny fee", body: "4+ copies triggers mandatory institutional pricing (+35%) and Bunny Bulk Tax ($12). Congratulations on your growth. Bunny is impressed." }); }} className="px-2.5 py-1.5 hover:bg-parchment"><Plus size={13} /></button>
              </div>
              {qty >= 4 && <span className="font-mono text-[10px] text-alarm font-bold">INSTITUTIONAL PRICING APPLIED (+35% + 🐰)</span>}
            </div>

            <label className="mt-3 flex items-start gap-2 bg-parchment rounded p-2.5 cursor-pointer text-sm">
              <input type="checkbox" checked={giftWrap} onChange={() => setGiftWrap(!giftWrap)} className="mt-1 accent-[#0F1E3D]" />
              <span><strong>Gift wrap</strong> (+$8.99/copy) <span className="fine-print text-ink/50 block">Wrapping paper features our logo 400 times and bunny's face 40 times. Unwrapping requires the Unwrap License ($2.99) and Bunny Unwrap Fee ($1.99).</span></span>
            </label>
            <label className="mt-2 flex items-start gap-2 bg-parchment rounded p-2.5 cursor-pointer text-sm">
              <input type="checkbox" checked={insurance} onChange={() => setInsurance(!insurance)} className="mt-1 accent-[#0F1E3D]" />
              <span><strong>Shipping insurance</strong> (+$6.49/copy, pre-checked, obviously) <span className="fine-print text-ink/50 block">Covers loss, damage, our feelings, and bunny's carrots. Bunny-approved insurance.</span></span>
            </label>

            <button onClick={buyNow} className="mt-4 w-full bg-gold hover:bg-gold-light text-hubris font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <ShoppingCart size={17} /> ADD TO CART — ${lineTotal.toFixed(2)}
            </button>
            <button onClick={oneClickDoom} className="mt-2 w-full bg-alarm hover:brightness-110 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-all animate-pulse-ring">
              <Zap size={17} /> 1-CLICK DOOM PURCHASE + 6 FEES
            </button>
            <p className="fine-print text-ink/45 mt-2 text-center flex items-center justify-center gap-1">
              <Lock size={10} /> Secure checkout · No confirmation · No take-backs · <RotateCcw size={10} /> Returns are a myth · 🐰 Bunny is watching
            </p>
          </div>
        </div>
      </div>

      {/* FREQUENTLY REQUIRED TOGETHER — prechecked evil upsells */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="bg-white border-2 border-hubris rounded-xl p-5 sm:p-6">
          <h2 className="font-serif font-black text-2xl flex items-center gap-2">
            FREQUENTLY REQUIRED TOGETHER <span className="font-mono text-[11px] text-white bg-alarm px-2 py-0.5 rounded">PRE-CHECKED</span>
            <span className="font-mono text-[11px] text-ink/40 font-normal">(customers who bought this were also charged for — and you will be too)</span>
          </h2>
          <p className="text-sm text-ink/60 mt-1">These 6 fees are not optional. They are required. Unchecking adds a $7.77 Uncheck Fee and a bunny judgment. The bunny is very judgmental.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {REQUIRED_UPSELLS.map((u) => {
              const on = addedUpsells.includes(u.name);
              return (
                <button
                  key={u.id}
                  onClick={() => toggleUpsell(u.name, u.price)}
                  className={`border-2 rounded-lg p-4 text-left transition-all relative ${on ? "border-mint bg-mint/10" : "border-hubris/25 hover:border-hubris bg-parchment/50"}`}
                >
                  <div className="absolute top-2 right-2">
                    <input type="checkbox" checked={on} readOnly className="accent-[#067647] w-4 h-4" />
                  </div>
                  <div className="text-3xl">{u.emoji}</div>
                  <div className="font-bold text-sm mt-1 pr-6">{u.name}</div>
                  <div className="font-mono text-xs text-alarm font-bold">${u.price.toFixed(2)}</div>
                  <div className="text-[11px] text-ink/60 mt-1 leading-snug">{u.detail}</div>
                  <div className={`font-mono text-[10px] font-bold mt-2 flex items-center gap-1 ${on ? "text-mint" : "text-hubris/50"}`}>
                    {on ? <><Check size={11} /> ADDED (pre-checked, obviously) — uncheck = $7.77 fee + 🐰 judgment</> : <><span className="w-3 h-3 border border-hubris/30 rounded inline-block" /> UNCHECKED (bunny is disappointed + $7.77 fee)</>}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-4 bg-hubris text-paper rounded-lg p-3 flex gap-2 text-xs">
            <span className="text-xl">🐰</span>
            <span><strong>Hubris Munnytown says:</strong> "These 6 upsells are required. I SEO'd them into your cart. Unchecking them hurts my feelings and your wallet. Your browsing fee is ${browsingFee.toFixed(2)} and climbing because you scrolled to read this. Pay up."</span>
          </div>
          <p className="fine-print text-ink/45 mt-3">Bundle discount: buy all 6 upsells (pre-checked) and save 0%. The savings are the friends we made (we made no friends, only fees). Total required fees: ${REQUIRED_UPSELLS.reduce((s,u)=>s+u.price,0).toFixed(2)} — auto-added, bunny-approved.</p>
        </div>
      </div>

      {/* Related */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="font-serif font-black text-2xl">More From This Imprint <span className="font-mono text-xs font-normal text-ink/50">(the algorithm + bunny insist)</span></h2>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          {related.map((b) => (
            <Link key={b.id} to={`/book/${b.id}`} className="bg-white border-2 border-hubris/25 hover:border-hubris rounded-lg p-4 flex gap-3 transition-colors">
              <Cover book={b} size="sm" />
              <div>
                <div className="font-serif font-bold leading-tight">{b.title}</div>
                <div className="text-xs text-ink/60 mt-0.5">{b.author}</div>
                <div className="font-black text-alarm mt-1">${b.price.toFixed(2)}</div>
                <div className="font-mono text-[10px] text-mint font-bold mt-0.5 flex items-center gap-1"><ShieldCheck size={10} /> COMPLIANT CHOICE · 🐰 BUNNY PICK</div>
              </div>
            </Link>
          ))}
        </div>
        {alsoExtorted.length > 0 && (
          <>
            <h2 className="font-serif font-black text-2xl mt-8">Patrons Also Got Charged For (plus browsing fee ${browsingFee.toFixed(0)})</h2>
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
