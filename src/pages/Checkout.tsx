import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, CreditCard, Crown, Fingerprint,
  Gift, Lock, PartyPopper, ShieldCheck, TriangleAlert, Rabbit,
} from "lucide-react";
import { useShop } from "../store/ShopContext";
import { BOOKS, REQUIRED_UPSELLS } from "../data/books";
import { PageHero } from "../components/chrome";

const STEPS = [
  "Cart Review (again)", "Account (mandatory)", "Shipping (slow)", "Gift Options (priced)",
  "Insurance (opt-out, hidden)", "Donation (guilt)", "FREQUENTLY REQUIRED TOGETHER (mandatory)", "Payment (finally)",
  "Reflection (weep)", "Confirmation (no take-backs)",
];

export default function Checkout() {
  const { cart, subtotal, pushToast, bumpHubris, browsingFee } = useShop();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [orderNo] = useState(() => `HB-${Math.floor(100000 + Math.random() * 900000)}`);
  const [form, setForm] = useState({ email: "", name: "", address: "", card: "", expiry: "", cvc: "", password: "", motherMaiden: "" });
  const [agreed, setAgreed] = useState<Record<string, boolean>>({ terms: false, marketing: true, soul: true, greg: false, bunny: false });
  // Prechecked required upsells as requested
  const [requiredUpsells, setRequiredUpsells] = useState<string[]>(REQUIRED_UPSELLS.map(u => u.name));
  const [insuranceOptOutFound, setInsuranceOptOutFound] = useState(false);

  const requiredTotal = useMemo(
    () => REQUIRED_UPSELLS.filter((u) => requiredUpsells.includes(u.name)).reduce((s, u) => s + u.price, 0),
    [requiredUpsells]
  );
  // total includes required upsells + other fees + browsing fee
  const total = subtotal + 14.95 + 8.5 + 4.99 + 3.75 + 18.99 + 11.11 + requiredTotal + browsingFee + (insuranceOptOutFound ? 0 : 12.99);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const canAdvance = () => {
    if (step === 1) return form.email.includes("@") && form.password.length >= 12;
    if (step === 7) return form.card.replace(/\s/g, "").length >= 12 && form.cvc.length >= 3;
    if (step === 9) return agreed.terms && agreed.greg && agreed.bunny;
    return true;
  };

  const next = () => {
    if (!canAdvance()) {
      pushToast({ kind: "warning", title: "Cannot proceed", body: step === 1 ? "Password must be 12+ chars, include a hieroglyph, and the name of your first invoice. Bunny also requires a carrot emoji." : step === 7 ? "Card invalid. Have you tried having more money? Bunny accepts carrots as collateral." : "You must accept the Terms of Servitude and acknowledge Greg AND Hubris Munnytown 🐰." });
      return;
    }
    if (step === 6 && requiredUpsells.length === 0) {
      // Force at least one back if they unchecked all
      const all = REQUIRED_UPSELLS.map(u => u.name);
      setRequiredUpsells(all);
      pushToast({ kind: "upsell", title: "Nice try! All 6 required fees re-added!", body: "You unchecked all required upsells. That's adorable. We re-checked them for your convenience and added a $7.77 Uncheck Fee per unchecked item. Hubris Munnytown is disappointed." });
    }
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      setDone(true);
      bumpHubris(50);
      window.scrollTo(0, 0);
    }
  };

  if (cart.length === 0 && !done) {
    return (
      <div className="paper-texture min-h-screen">
        <PageHero kicker="Checkout" title="Your cart is empty." sub="Checkout with nothing? Bold. Greg respects it but the fees disagree. Bunny is confused." />
        <div className="max-w-xl mx-auto px-4 py-10 text-center">
          <Link to="/catalog" className="inline-flex items-center gap-2 bg-hubris text-white font-bold px-6 py-3 rounded-lg">BACK TO CATALOG <ArrowRight size={15} /></Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="paper-texture min-h-screen">
        <PageHero kicker={`Order ${orderNo} · non-refundable · bunny-approved`} title={<>Thank You For Your <span className="italic text-gold-light">Compliance.</span></>} sub="Your order has been received, celebrated, and made non-refundable. Bunny has SEO'd your name into our sitemap." />
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white border-[3px] border-mint rounded-xl p-8 text-center shadow-[8px_8px_0_rgba(6,118,71,1)]">
            <PartyPopper size={48} className="mx-auto text-gold" />
            <h2 className="font-serif font-black text-3xl mt-3">Order {orderNo} Confirmed! 🐰</h2>
            <p className="text-ink/60 mt-2">A confirmation email with 40 upsells and a carrot recipe from Hubris Munnytown is on its way. Your books ship in 6–8 eternities via Glacial post. Browsing fee final total: ${browsingFee.toFixed(2)} (thanks for scrolling!).</p>
            <div className="bg-parchment rounded-lg p-4 mt-5 text-left font-mono text-sm space-y-1">
              <div className="flex justify-between"><span>Charged today</span><strong className="text-alarm">${total.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>Required Together™ fees (6)</span><strong>${requiredTotal.toFixed(2)} (pre-checked)</strong></div>
              <div className="flex justify-between"><span>Browsing fee (scroll-based)</span><strong>${browsingFee.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>FunBux™ earned</span><strong>{Math.floor(total * 10).toLocaleString()} (spirit bucks, bunny-approved)</strong></div>
              <div className="flex justify-between"><span>Refund eligibility</span><strong>None. Never. Bunny says no.</strong></div>
              <div className="flex justify-between"><span>Estimated delivery</span><strong>Heat death of universe ± 2 days, bunny will notify</strong></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to="/catalog" className="flex-1 bg-hubris text-white font-bold py-3 rounded-lg">BUY MORE (PLEASE) 🐰</Link>
              <Link to="/loyalty" className="flex-1 border-2 border-hubris font-bold py-3 rounded-lg">VIEW MY FUNBUX™</Link>
            </div>
            <p className="fine-print text-ink/40 mt-4">By completing this purchase you have agreed to receive our catalog, our emails, our texts, our bunny's carrot newsletter, and our regards, forever. Hubris Munnytown now owns your SEO.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-texture min-h-screen pb-12">
      <PageHero
        kicker={`Secure(?) checkout · step ${step + 1} of ${STEPS.length} · browsing fee $${browsingFee.toFixed(2)}`}
        title={<>{STEPS[step]}</>}
        sub="Progress is saved. Dignity is not. Scrolling adds $89–$495 per scroll to your browsing fee. Abandoning this checkout triggers the Abandonment Fee ($6.66) + Bunny Disappointment Fee ($7.77)."
      >
        <div className="flex gap-1 mt-5 overflow-x-auto scrollbar-thin pb-1">
          {STEPS.map((s, i) => (
            <div key={s} className={`shrink-0 font-mono text-[10px] px-2.5 py-1.5 rounded border ${i < step ? "bg-mint text-white border-mint" : i === step ? "bg-gold text-hubris border-gold font-bold" : "text-paper/40 border-paper/20"}`}>
              {i < step ? "✓ " : ""}{i + 1}. {s}
            </div>
          ))}
        </div>
      </PageHero>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white border-[3px] border-hubris rounded-xl p-6 sm:p-8 shadow-[6px_6px_0_rgba(15,30,61,1)]">
          {step === 0 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Review Your Cart (again, slower, more expensive)</h2>
              <p className="text-sm text-ink/60 mt-1">Look at it. Really look at it. These books need you. Your browsing fee needs you more: ${browsingFee.toFixed(2)} and climbing per scroll.</p>
              <div className="mt-4 space-y-2">
                {cart.map((l) => (
                  <div key={l.book.id} className="flex justify-between bg-parchment rounded px-3 py-2 text-sm">
                    <span>{l.book.title} × {l.qty}</span>
                    <strong>${(l.book.price * l.qty).toFixed(2)}</strong>
                  </div>
                ))}
                <div className="flex justify-between bg-alarm/10 border border-alarm/30 rounded px-3 py-2 text-sm font-bold text-alarm">
                  <span>Browsing Fee (scroll-based, you scrolled here)</span>
                  <strong>${browsingFee.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Create Your Mandatory Account (Bunny-Monitored)</h2>
              <p className="text-sm text-ink/60 mt-1">Guest checkout was removed for your safety. Accounts are forever, like your data with us and bunny's memory of your scroll.</p>
              <div className="grid gap-3 mt-4">
                <Field label="Email (will receive 6 emails/day + bunny carrots)" value={form.email} onChange={set("email")} placeholder="you@library.edu" />
                <Field label="Password (12+ chars, 1 hieroglyph, name of first invoice, 1 carrot emoji 🥕)" value={form.password} onChange={set("password")} placeholder="••••••••••••" type="password" />
                <Field label="Mother's maiden name (for fun + bunny SEO)" value={form.motherMaiden} onChange={set("motherMaiden")} placeholder="For fun (and security questions and bunny)" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Shipping Address (Bunny Delivers)</h2>
              <p className="text-sm text-ink/60 mt-1">We ship anywhere! Delivery times vary by distance from Dayton and proximity to bunny's carrot stash.</p>
              <div className="grid gap-3 mt-4">
                <Field label="Full name" value={form.name} onChange={set("name")} placeholder="Valued Revenue Unit (Bunny's Favorite)" />
                <Field label="Address" value={form.address} onChange={set("address")} placeholder="123 Invoice Lane, Bunny Burrow, OH" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Gift Options (Bunny-Wrapped)</h2>
              <p className="text-sm text-ink/60 mt-1">Is this a gift? Wonderful. Gifts cost more. Joy is a premium feature. Bunny wrapping costs extra.</p>
              <div className="space-y-2 mt-4">
                {[
                  ["Gift message (+$4.99)", "Handwritten by an intern and a bunny. Max 12 characters. Bunny adds 🐰."],
                  ["Premium gift box (+$12.99)", "A box. Inside your box. Boxes all the way down. Bunny lives in the smallest box."],
                  ["Unboxing experience (+$7.99)", "We include confetti, a QR code to tip the warehouse, and bunny's carrot recipe."],
                ].map(([t, d]) => (
                  <label key={t} className="flex items-start gap-2 bg-parchment rounded p-3 cursor-pointer text-sm">
                    <input type="checkbox" className="mt-1 accent-[#0F1E3D]" defaultChecked={t.includes("message")} />
                    <span><strong>{t}</strong><span className="block text-ink/60 text-xs">{d}</span></span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Shipping Insurance <span className="font-mono text-xs font-normal text-ink/50">(mandatory unless declined, bunny-insured)</span></h2>
              <div className="bg-mint/10 border-2 border-mint rounded-lg p-4 mt-4 text-sm">
                <strong className="flex items-center gap-1"><ShieldCheck size={15} /> Premium Porch Protection™ + Bunny Guard™ — $12.99</strong>
                <p className="text-ink/60 mt-1">Covers theft, weather, pirates, and bunny-related incidents (carrot theft). 97% of customers keep it (the decline button is 6pt and moves).</p>
              </div>
              <div className="mt-6 text-center">
                {!insuranceOptOutFound ? (
                  <button onClick={() => { setInsuranceOptOutFound(true); pushToast({ kind: "info", title: "Opt-out found! Bunny impressed!", body: "You found the 6pt opt-out link that dodges when you hover. Impressive. Greg has been notified of your frugality. Bunny is writing a blog post about it." }); }} className="text-[6pt] text-ink/30 underline hover:text-ink/60">
                    decline coverage (bunny will be sad)
                  </button>
                ) : (
                  <div className="font-mono text-xs text-mint font-bold flex items-center justify-center gap-1"><Check size={13} /> Coverage declined. Living dangerously. Bunny respects it but still charges browsing fee: ${browsingFee.toFixed(2)}</div>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Donation <span className="font-mono text-xs font-normal text-ink/50">(skipping is tracked by bunny)</span></h2>
              <p className="text-sm text-ink/60 mt-1">Would you like to donate $25 to Greg's Yacht Fund and Hubris Munnytown's Carrot Fund? The yacht is named <em>S.S. Open Access</em>. The bunny's yacht is named <em>S.S. Carrot</em>. Both need fuel.</p>
              <div className="grid sm:grid-cols-2 gap-2 mt-4">
                <button onClick={() => { pushToast({ kind: "info", title: "$25 donated! Bunny thanks you!", body: "The yacht thanks you. The bunny thanks you. The sea remains indifferent. Your browsing fee thanks you: $" + browsingFee.toFixed(2) }); }} className="bg-mint text-white font-bold py-3 rounded-lg">YES, I'M GENEROUS ($25 + 🥕)</button>
                <button onClick={() => pushToast({ kind: "warning", title: "Noted by bunny.", body: "Your decline has been logged, SEO'd, and will be read aloud at the company retreat by Hubris Munnytown himself. Carrots will be withheld." })} className="fine-print text-ink/40 underline py-3">no, I hate the ocean and bunnies (decline)</button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="font-serif font-black text-2xl">FREQUENTLY REQUIRED TOGETHER <span className="font-mono text-xs font-normal bg-alarm text-white px-2 py-0.5 rounded">PRE-CHECKED, MANDATORY</span></h2>
              <p className="text-sm text-ink/60 mt-1">These 6 fees are required. Not optional. Required. Like breathing, but breathing costs $2.30/pixel/sec. Unchecking adds $7.77 Uncheck Fee per item + bunny judgment. All 6 are pre-checked for your convenience.</p>
              <div className="grid gap-3 mt-4">
                {REQUIRED_UPSELLS.map((u) => {
                  const checked = requiredUpsells.includes(u.name);
                  return (
                    <label key={u.id} className={`flex gap-3 border-2 rounded-lg p-3 cursor-pointer text-sm transition-all ${checked ? "border-mint bg-mint/10" : "border-hubris/20 bg-parchment/50"}`}>
                      <input type="checkbox" checked={checked} onChange={() => {
                        if (checked) {
                          setRequiredUpsells(prev => prev.filter(n => n !== u.name));
                          pushToast({ kind: "warning", title: `Unchecked: ${u.name} (+$7.77 Uncheck Fee)`, body: `You unchecked ${u.name}. A $7.77 Uncheck Fee applies. Hubris Munnytown is disappointed and will SEO your frugality. Total now: $${(requiredTotal - u.price + 7.77).toFixed(2)} in fees.` });
                        } else {
                          setRequiredUpsells(prev => [...prev, u.name]);
                          pushToast({ kind: "upsell", title: `Re-checked: ${u.name}`, body: "Good choice. Bunny approves. Compliance is beautiful." });
                        }
                      }} className="mt-1 accent-[#067647] w-5 h-5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2"><span className="text-xl">{u.emoji}</span><strong>{u.name}</strong><span className="font-mono text-xs text-alarm font-bold">${u.price.toFixed(2)}</span>{checked && <span className="text-[9px] bg-mint text-white px-1.5 py-0.5 rounded font-bold">PRE-CHECKED</span>}</div>
                        <div className="text-xs text-ink/60 mt-1">{u.detail}</div>
                        {!checked && <div className="text-[10px] text-alarm font-bold mt-1">⚠ Unchecked: +$7.77 Uncheck Fee + bunny disappointment</div>}
                      </div>
                    </label>
                  );
                })}
              </div>
              <div className="mt-4 bg-hubris text-paper rounded-lg p-3 flex gap-2 text-xs">
                <span className="text-xl">🐰</span>
                <span><strong>Bunny says:</strong> "All 6 required. I pre-checked them myself with my tiny paws. Unchecking hurts. Your browsing fee is ${browsingFee.toFixed(2)} because you scrolled to read this. Pay up, human."</span>
              </div>
              <div className="mt-3 font-mono text-xs flex justify-between bg-gold/20 rounded p-2">
                <span>Required fees total (pre-checked):</span><strong className="text-alarm">${requiredTotal.toFixed(2)}</strong>
              </div>
              <p className="fine-print text-ink/50 mt-2">Unchecking any adds $7.77 per item. Unchecking all re-checks all (we thought of that). Bunny thought of that first. Bunny thinks of everything. Bunny is SEO.</p>
            </div>
          )}

          {step === 7 && (
            <div>
              <h2 className="font-serif font-black text-2xl flex items-center gap-2"><CreditCard size={24} /> Payment (finally, the main event + bunny tax)</h2>
              <div className="grid gap-3 mt-4">
                <Field label="Card number (we'll remember it forever, bunny will SEO it)" value={form.card} onChange={set("card")} placeholder="4111 1111 1111 1111" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry" value={form.expiry} onChange={set("expiry")} placeholder="MM/YY" />
                  <Field label="CVC (the fun numbers, bunny's favorite)" value={form.cvc} onChange={set("cvc")} placeholder="123" />
                </div>
              </div>
              <p className="fine-print text-ink/45 mt-2 flex items-center gap-1"><Fingerprint size={11} /> By paying you authorize this charge, all future charges that feel related, and bunny's carrot subscription ($4.99/mo).</p>
            </div>
          )}

          {step === 8 && (
            <div className="text-center py-4">
              <h2 className="font-serif font-black text-2xl">Reflection (Bunny Supervised)</h2>
              <p className="text-sm text-ink/60 mt-2 max-w-md mx-auto">Take a moment. Think about your purchase. Think about the fees. The fees think about you, constantly. The bunny thinks about your SEO, constantly. There is no back button on this step. There is only forward, and the total, which grew while you reflected (+$2.00 reflection fee + ${browsingFee.toFixed(2)} browsing fee + bunny contemplation fee $1.99).</p>
              <div className="font-serif italic text-4xl mt-6 text-hubris/30">"To buy is to belong. To scroll is to pay."</div>
              <div className="font-mono text-[11px] text-ink/40 mt-1">— Greg Hubris & Hubris Munnytown 🐰, <em>Meditations on Margin & Carrots</em> ($89.99 + $4.99 bunny fee)</div>
            </div>
          )}

          {step === 9 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Final Confirmation <span className="font-mono text-xs font-normal text-ink/50">(no take-backs, bunny says no)</span></h2>
              <div className="bg-parchment rounded-lg p-4 mt-4 font-mono text-sm space-y-1">
                <div className="flex justify-between"><span>{cart.reduce((s, l) => s + l.qty, 0)} items + {requiredUpsells.length} required fees</span><strong>${subtotal.toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Required Together™ (pre-checked)</span><strong>${requiredTotal.toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Browsing fee (scroll-based)</span><strong>${browsingFee.toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Other fees & extras</span><strong>${(total - subtotal - requiredTotal - browsingFee).toFixed(2)}</strong></div>
                <div className="flex justify-between text-lg pt-2 border-t border-hubris/20"><span className="font-bold">TOTAL (bunny-approved)</span><strong className="text-alarm">${total.toFixed(2)}</strong></div>
              </div>
              <div className="space-y-2 mt-4 text-sm">
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.terms} onChange={() => setAgreed({ ...agreed, terms: !agreed.terms })} className="mt-1" /> I accept the <Link to="/terms" className="underline font-bold">Terms of Servitude</Link> (required, bunny wrote them)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.marketing} onChange={() => setAgreed({ ...agreed, marketing: !agreed.marketing })} className="mt-1" /> Email me 6× daily + bunny carrots (pre-checked, unchecking adds a $1 Uncheck Fee + bunny fee)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.soul} onChange={() => setAgreed({ ...agreed, soul: !agreed.soul })} className="mt-1" /> I consent to the Soul Clause §13.3 and Bunny Soul Clause §13.3(b) (pre-checked, obviously, bunny owns a piece)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.greg} onChange={() => setAgreed({ ...agreed, greg: !agreed.greg })} className="mt-1" /> I acknowledge Greg (required)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.bunny} onChange={() => setAgreed({ ...agreed, bunny: !agreed.bunny })} className="mt-1" /> I acknowledge Hubris Munnytown 🐰, smug bunny, SEO overlord (required, he demands it)</label>
              </div>
            </div>
          )}

          {/* nav */}
          <div className="flex gap-3 mt-8 pt-6 border-t-2 border-dashed border-hubris/20">
            {step > 0 && step !== 8 && (
              <button onClick={() => setStep(step - 1)} className="border-2 border-hubris font-bold px-5 py-3 rounded-lg flex items-center gap-1 hover:bg-parchment">
                <ArrowLeft size={15} /> Back
              </button>
            )}
            <button onClick={next} className={`flex-1 font-black py-3 rounded-lg flex items-center justify-center gap-2 text-white ${canAdvance() ? "bg-alarm hover:brightness-110" : "bg-ink/40"}`}>
              {step === STEPS.length - 1 ? <><Lock size={16} /> PLACE NON-REFUNDABLE ORDER — ${total.toFixed(2)} 🐰</> : <>CONTINUE (browsing fee ${browsingFee.toFixed(2)}) <ArrowRight size={16} /></>}
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 font-mono text-[10px] text-ink/40">
            <span className="flex items-center gap-1"><ShieldCheck size={11} /> 256-bit encryption + bunny encryption</span>
            <span className="flex items-center gap-1"><BadgeCheck size={11} /> TrustSeal™ (ours, bunny certified)</span>
            <span className="flex items-center gap-1"><TriangleAlert size={11} /> Abandonment: $6.66 + 🐰 fee $7.77</span>
          </div>
        </div>

        {/* order bump */}
        {!done && (
          <div className="mt-6 bg-gold/15 border-2 border-dashed border-gold rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-center">
            <Crown size={32} className="text-gold shrink-0" />
            <div className="flex-1 text-sm">
              <strong>ORDER BUMP:</strong> Add <Link to={`/book/${BOOKS[5].id}`} className="underline font-bold">{BOOKS[5].title}</Link> for just ${BOOKS[5].price.toFixed(2)}? Plus all 6 Required Together™ fees (pre-checked, obviously).
              <span className="text-ink/60"> 87% of customers add it (the button adds it if you hover too long, bunny makes it add faster).</span>
            </div>
            <button onClick={() => pushToast({ kind: "upsell", title: "Bump added! + 6 fees! + Bunny fee!", body: "Hover detected. Book added + 6 required fees. Resistance billed. Bunny is pleased." })} className="bg-gold text-hubris font-bold px-5 py-2.5 rounded-lg text-sm shrink-0 flex items-center gap-1">
              <Gift size={14} /> YES, BUMP ME + 6 FEES 🐰
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-ink/60">{label}</span>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="mt-1 w-full border-2 border-hubris/30 focus:border-hubris rounded-lg px-3 py-2.5 text-sm focus:outline-none" />
    </label>
  );
}
