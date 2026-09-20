import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, CreditCard, Crown, Fingerprint,
  Gift, Lock, PartyPopper, ShieldCheck, TriangleAlert,
} from "lucide-react";
import { useShop } from "../store/ShopContext";
import { BOOKS, UPSELL_ROULETTE } from "../data/books";
import { PageHero } from "../components/chrome";

const STEPS = [
  "Cart Review (again)", "Account (mandatory)", "Shipping (slow)", "Gift Options (priced)",
  "Insurance (opt-out, hidden)", "Donation (guilt)", "Upsells (surprise)", "Payment (finally)",
  "Reflection (weep)", "Confirmation (no take-backs)",
];

export default function Checkout() {
  const { cart, subtotal, pushToast, bumpHubris } = useShop();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [orderNo] = useState(() => `HB-${Math.floor(100000 + Math.random() * 900000)}`);
  const [form, setForm] = useState({ email: "", name: "", address: "", card: "", expiry: "", cvc: "", password: "", motherMaiden: "" });
  const [agreed, setAgreed] = useState<Record<string, boolean>>({ terms: false, marketing: true, soul: true, greg: false });
  const [surpriseUpsells, setSurpriseUpsells] = useState<string[]>([]);
  const [insuranceOptOutFound, setInsuranceOptOutFound] = useState(false);

  const surpriseTotal = useMemo(
    () => UPSELL_ROULETTE.filter((u) => surpriseUpsells.includes(u.name)).reduce((s, u) => s + u.price, 0),
    [surpriseUpsells]
  );
  const total = subtotal + 14.95 + 8.5 + 4.99 + 3.75 + 18.99 + 11.11 + surpriseTotal + (insuranceOptOutFound ? 0 : 12.99);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const canAdvance = () => {
    if (step === 1) return form.email.includes("@") && form.password.length >= 12;
    if (step === 7) return form.card.replace(/\s/g, "").length >= 12 && form.cvc.length >= 3;
    if (step === 9) return agreed.terms && agreed.greg;
    return true;
  };

  const next = () => {
    if (!canAdvance()) {
      pushToast({ kind: "warning", title: "Cannot proceed", body: step === 1 ? "Password must be 12+ chars, include a hieroglyph, and the name of your first invoice." : step === 7 ? "Card invalid. Have you tried having more money?" : "You must accept the Terms of Servitude and acknowledge Greg." });
      return;
    }
    if (step === 6 && surpriseUpsells.length === 0) {
      const free = UPSELL_ROULETTE[Math.floor(Math.random() * UPSELL_ROULETTE.length)];
      setSurpriseUpsells([free.name]);
      pushToast({ kind: "upsell", title: "Surprise upsell added!", body: `You hesitated, so we added the ${free.name} ($${free.price.toFixed(2)}). Hesitation is consent.` });
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
        <PageHero kicker="Checkout" title="Your cart is empty." sub="Checkout with nothing? Bold. Greg respects it but the fees disagree." />
        <div className="max-w-xl mx-auto px-4 py-10 text-center">
          <Link to="/catalog" className="inline-flex items-center gap-2 bg-hubris text-white font-bold px-6 py-3 rounded-lg">BACK TO CATALOG <ArrowRight size={15} /></Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="paper-texture min-h-screen">
        <PageHero kicker={`Order ${orderNo} · non-refundable`} title={<>Thank You For Your <span className="italic text-gold-light">Compliance.</span></>} sub="Your order has been received, celebrated, and made non-refundable." />
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white border-[3px] border-mint rounded-xl p-8 text-center shadow-[8px_8px_0_rgba(6,118,71,1)]">
            <PartyPopper size={48} className="mx-auto text-gold" />
            <h2 className="font-serif font-black text-3xl mt-3">Order {orderNo} Confirmed!</h2>
            <p className="text-ink/60 mt-2">A confirmation email with 40 upsells is on its way. Your books ship in 6–8 eternities via Glacial post.</p>
            <div className="bg-parchment rounded-lg p-4 mt-5 text-left font-mono text-sm space-y-1">
              <div className="flex justify-between"><span>Charged today</span><strong className="text-alarm">${total.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>FunBux™ earned</span><strong>{Math.floor(total * 10).toLocaleString()} (spirit bucks)</strong></div>
              <div className="flex justify-between"><span>Refund eligibility</span><strong>None. Never. Hope this helps.</strong></div>
              <div className="flex justify-between"><span>Estimated delivery</span><strong>Heat death of universe ± 2 days</strong></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to="/catalog" className="flex-1 bg-hubris text-white font-bold py-3 rounded-lg">BUY MORE (PLEASE)</Link>
              <Link to="/loyalty" className="flex-1 border-2 border-hubris font-bold py-3 rounded-lg">VIEW MY FUNBUX™</Link>
            </div>
            <p className="fine-print text-ink/40 mt-4">By completing this purchase you have agreed to receive our catalog, our emails, our texts, and our regards, forever.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-texture min-h-screen pb-12">
      <PageHero
        kicker={`Secure(?) checkout · step ${step + 1} of ${STEPS.length}`}
        title={<>{STEPS[step]}</>}
        sub="Progress is saved. Dignity is not. Abandoning this checkout triggers the Abandonment Fee ($6.66)."
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
              <h2 className="font-serif font-black text-2xl">Review Your Cart (again, slower)</h2>
              <p className="text-sm text-ink/60 mt-1">Look at it. Really look at it. These books need you.</p>
              <div className="mt-4 space-y-2">
                {cart.map((l) => (
                  <div key={l.book.id} className="flex justify-between bg-parchment rounded px-3 py-2 text-sm">
                    <span>{l.book.title} × {l.qty}</span>
                    <strong>${(l.book.price * l.qty).toFixed(2)}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Create Your Mandatory Account</h2>
              <p className="text-sm text-ink/60 mt-1">Guest checkout was removed for your safety. Accounts are forever, like your data with us.</p>
              <div className="grid gap-3 mt-4">
                <Field label="Email (will receive 6 emails/day)" value={form.email} onChange={set("email")} placeholder="you@library.edu" />
                <Field label="Password (12+ chars, 1 hieroglyph, name of first invoice)" value={form.password} onChange={set("password")} placeholder="••••••••••••" type="password" />
                <Field label="Mother's maiden name (for fun)" value={form.motherMaiden} onChange={set("motherMaiden")} placeholder="For fun (and security questions)" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Shipping Address</h2>
              <p className="text-sm text-ink/60 mt-1">We ship anywhere! Delivery times vary by distance from Dayton and proximity to our feelings.</p>
              <div className="grid gap-3 mt-4">
                <Field label="Full name" value={form.name} onChange={set("name")} placeholder="Valued Revenue Unit" />
                <Field label="Address" value={form.address} onChange={set("address")} placeholder="123 Invoice Lane" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Gift Options</h2>
              <p className="text-sm text-ink/60 mt-1">Is this a gift? Wonderful. Gifts cost more. Joy is a premium feature.</p>
              <div className="space-y-2 mt-4">
                {[
                  ["Gift message (+$4.99)", "Handwritten by an intern. Max 12 characters."],
                  ["Premium gift box (+$12.99)", "A box. Inside your box. Boxes all the way down."],
                  ["Unboxing experience (+$7.99)", "We include confetti and a QR code to tip the warehouse."],
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
              <h2 className="font-serif font-black text-2xl">Shipping Insurance <span className="font-mono text-xs font-normal text-ink/50">(mandatory unless declined)</span></h2>
              <div className="bg-mint/10 border-2 border-mint rounded-lg p-4 mt-4 text-sm">
                <strong className="flex items-center gap-1"><ShieldCheck size={15} /> Premium Porch Protection™ — $12.99</strong>
                <p className="text-ink/60 mt-1">Covers theft, weather, and pirates. 97% of customers keep it (the decline button is below).</p>
              </div>
              <div className="mt-6 text-center">
                {!insuranceOptOutFound ? (
                  <button onClick={() => { setInsuranceOptOutFound(true); pushToast({ kind: "info", title: "Opt-out found!", body: "You found the 6pt opt-out link. Impressive. Greg has been notified of your frugality." }); }} className="text-[6pt] text-ink/30 underline hover:text-ink/60">
                    decline coverage
                  </button>
                ) : (
                  <div className="font-mono text-xs text-mint font-bold flex items-center justify-center gap-1"><Check size={13} /> Coverage declined. Living dangerously. We respect it.</div>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Donation <span className="font-mono text-xs font-normal text-ink/50">(skipping is tracked)</span></h2>
              <p className="text-sm text-ink/60 mt-1">Would you like to donate $25 to Greg's Yacht Fund? The yacht is named <em>S.S. Open Access</em>. The irony is free; the yacht is not.</p>
              <div className="grid sm:grid-cols-2 gap-2 mt-4">
                <button onClick={() => { setSurpriseUpsells([...surpriseUpsells]); pushToast({ kind: "info", title: "$25 donated!", body: "The yacht thanks you. Greg thanks you. The sea remains indifferent." }); }} className="bg-mint text-white font-bold py-3 rounded-lg">YES, I'M GENEROUS ($25)</button>
                <button onClick={() => pushToast({ kind: "warning", title: "Noted.", body: "Your decline has been logged and will be read aloud at the company retreat." })} className="fine-print text-ink/40 underline py-3">no, I hate the ocean (decline)</button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Surprise Upsells! <span className="font-mono text-xs font-normal text-ink/50">(surprise: mandatory)</span></h2>
              <p className="text-sm text-ink/60 mt-1">One of these WILL be added. Choose, or hesitation chooses for you.</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {UPSELL_ROULETTE.slice(0, 4).map((u) => (
                  <button key={u.name} onClick={() => setSurpriseUpsells([u.name])} className={`border-2 rounded-lg p-3 text-left ${surpriseUpsells.includes(u.name) ? "border-gold bg-gold/10" : "border-hubris/20"}`}>
                    <div className="text-2xl">{u.emoji}</div>
                    <div className="font-bold text-sm">{u.name}</div>
                    <div className="font-mono text-xs text-alarm font-bold">${u.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 7 && (
            <div>
              <h2 className="font-serif font-black text-2xl flex items-center gap-2"><CreditCard size={24} /> Payment (finally, the main event)</h2>
              <div className="grid gap-3 mt-4">
                <Field label="Card number (we'll remember it forever)" value={form.card} onChange={set("card")} placeholder="4111 1111 1111 1111" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry" value={form.expiry} onChange={set("expiry")} placeholder="MM/YY" />
                  <Field label="CVC (the fun numbers)" value={form.cvc} onChange={set("cvc")} placeholder="123" />
                </div>
              </div>
              <p className="fine-print text-ink/45 mt-2 flex items-center gap-1"><Fingerprint size={11} /> By paying you authorize this charge and all future charges that feel related.</p>
            </div>
          )}

          {step === 8 && (
            <div className="text-center py-4">
              <h2 className="font-serif font-black text-2xl">Reflection</h2>
              <p className="text-sm text-ink/60 mt-2 max-w-md mx-auto">Take a moment. Think about your purchase. Think about the fees. The fees think about you, constantly. There is no back button on this step. There is only forward, and the total, which grew while you reflected (+$2.00 reflection fee, added).</p>
              <div className="font-serif italic text-4xl mt-6 text-hubris/30">"To buy is to belong."</div>
              <div className="font-mono text-[11px] text-ink/40 mt-1">— Greg Hubris, <em>Meditations on Margin</em> ($89.99)</div>
            </div>
          )}

          {step === 9 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Final Confirmation <span className="font-mono text-xs font-normal text-ink/50">(no take-backs)</span></h2>
              <div className="bg-parchment rounded-lg p-4 mt-4 font-mono text-sm space-y-1">
                <div className="flex justify-between"><span>{cart.reduce((s, l) => s + l.qty, 0)} items + surprises</span><strong>${subtotal.toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Fees & extras</span><strong>${(total - subtotal).toFixed(2)}</strong></div>
                <div className="flex justify-between text-lg pt-2 border-t border-hubris/20"><span className="font-bold">TOTAL</span><strong className="text-alarm">${total.toFixed(2)}</strong></div>
              </div>
              <div className="space-y-2 mt-4 text-sm">
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.terms} onChange={() => setAgreed({ ...agreed, terms: !agreed.terms })} className="mt-1" /> I accept the <Link to="/terms" className="underline font-bold">Terms of Servitude</Link> (required)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.marketing} onChange={() => setAgreed({ ...agreed, marketing: !agreed.marketing })} className="mt-1" /> Email me 6× daily (pre-checked, unchecking adds a $1 Uncheck Fee)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.soul} onChange={() => setAgreed({ ...agreed, soul: !agreed.soul })} className="mt-1" /> I consent to the Soul Clause §13.3 (pre-checked, obviously)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.greg} onChange={() => setAgreed({ ...agreed, greg: !agreed.greg })} className="mt-1" /> I acknowledge Greg (required)</label>
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
              {step === STEPS.length - 1 ? <><Lock size={16} /> PLACE NON-REFUNDABLE ORDER — ${total.toFixed(2)}</> : <>CONTINUE <ArrowRight size={16} /></>}
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-4 font-mono text-[10px] text-ink/40">
            <span className="flex items-center gap-1"><ShieldCheck size={11} /> 256-bit encryption</span>
            <span className="flex items-center gap-1"><BadgeCheck size={11} /> TrustSeal™ (ours)</span>
            <span className="flex items-center gap-1"><TriangleAlert size={11} /> Abandonment fee: $6.66</span>
          </div>
        </div>

        {/* order bump */}
        {!done && (
          <div className="mt-6 bg-gold/15 border-2 border-dashed border-gold rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-center">
            <Crown size={32} className="text-gold shrink-0" />
            <div className="flex-1 text-sm">
              <strong>ORDER BUMP:</strong> Add <Link to={`/book/${BOOKS[5].id}`} className="underline font-bold">{BOOKS[5].title}</Link> for just ${BOOKS[5].price.toFixed(2)}?
              <span className="text-ink/60"> 87% of customers add it (the button adds it if you hover too long).</span>
            </div>
            <button onClick={() => pushToast({ kind: "upsell", title: "Bump added!", body: "Hover detected. Book added. Resistance billed." })} className="bg-gold text-hubris font-bold px-5 py-2.5 rounded-lg text-sm shrink-0 flex items-center gap-1">
              <Gift size={14} /> YES, BUMP ME
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
