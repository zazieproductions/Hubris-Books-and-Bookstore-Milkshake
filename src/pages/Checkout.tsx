import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, CreditCard, Crown, Fingerprint,
  Gift, Lock, PartyPopper, ShieldCheck, TriangleAlert,
} from "lucide-react";
import { useShop } from "../store/ShopContext";
import { formatMoney } from "../lib/money";
import { BOOKS, REQUIRED_TOGETHER, UPSELL_ROULETTE } from "../data/books";
import { PageHero } from "../components/chrome";
import { SmugBunny } from "../components/Bunny";

const STEPS = [
  "Cart Review (again)", "Account (mandatory)", "Shipping (slow)", "Gift Options (priced)",
  "Insurance (opt-out, hidden)", "Required Together (pre-checked)", "Donation (guilt)",
  "Upsells (surprise)", "Payment (finally)", "Reflection (weep)", "Confirmation (no take-backs)",
];

const BASE_FEES = 14.95 + 8.5 + 4.99 + 3.75 + 18.99 + 11.11;

export default function Checkout() {
  const {
    cart, subtotal, pushToast, bumpHubris, required, toggleRequired, reassertRequired,
    requiredTotal, uncheckFees, browsingFee, escalation,
  } = useShop();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [orderNo] = useState(() => `HB-${Math.floor(100000 + Math.random() * 900000)}`);
  const [form, setForm] = useState({ email: "", name: "", address: "", card: "", expiry: "", cvc: "", password: "", motherMaiden: "" });
  const [agreed, setAgreed] = useState<Record<string, boolean>>({ terms: false, marketing: true, soul: true, munnytown: false, lending: true });
  const [surpriseUpsells, setSurpriseUpsells] = useState<string[]>([]);
  const [insuranceOptOutFound, setInsuranceOptOutFound] = useState(false);
  const [reasserted, setReasserted] = useState<Record<string, boolean>>({});
  const [lender, setLender] = useState("");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  const surpriseTotal = useMemo(
    () => UPSELL_ROULETTE.filter((u) => surpriseUpsells.includes(u.name)).reduce((s, u) => s + u.price, 0),
    [surpriseUpsells]
  );
  const insuranceTotal = insuranceOptOutFound ? 0 : 12.99;
  const total = subtotal + BASE_FEES + requiredTotal + uncheckFees + surpriseTotal + insuranceTotal + browsingFee;
  const requiredOnCount = REQUIRED_TOGETHER.filter((u) => required[u.id]).length;

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const uncheckItem = (id: string) => {
    const item = REQUIRED_TOGETHER.find((u) => u.id === id)!;
    toggleRequired(id);
    pushToast({
      kind: "fee",
      title: `Declined: ${item.name} (+$${item.uncheckFee.toFixed(2)} Decline Fee)`,
      body: "Declining is permitted and billable. Your decline has been logged, priced, and forwarded to Greg.",
    });
    // It comes back. Once. For your safety.
    if (!reasserted[id]) {
      setReasserted((r) => ({ ...r, [id]: true }));
      const t = window.setTimeout(() => {
        reassertRequired(id);
        pushToast({
          kind: "warning",
          title: `${item.name} re-checked`,
          body: "Our systems detected a mis-click and corrected it. The Decline Fee remains. This is a feature; it is described in §13.3.",
        });
      }, 4200);
      timers.current.push(t);
    }
  };

  const declineAll = () => {
    const fee = REQUIRED_TOGETHER.reduce((s, u) => s + (required[u.id] ? u.uncheckFee : 0), 0);
    REQUIRED_TOGETHER.forEach((u) => { if (required[u.id]) toggleRequired(u.id); });
    pushToast({
      kind: "warning",
      title: `All six declined — $${fee.toFixed(2)} in Decline Fees applied`,
      body: "You may decline everything, but you may not decline the cost of declining. Minimum two items are required to continue (§4.2).",
    });
  };

  const canAdvance = () => {
    if (step === 1) return form.email.includes("@") && form.password.length >= 12;
    if (step === 5) return requiredOnCount >= 2;
    if (step === 8) return form.card.replace(/\s/g, "").length >= 12 && form.cvc.length >= 3;
    if (step === 10) return agreed.terms && agreed.munnytown;
    return true;
  };

  const next = () => {
    if (!canAdvance()) {
      pushToast({
        kind: "warning",
        title: "Cannot proceed",
        body:
          step === 1 ? "Password must be 12+ chars, include a hieroglyph, and the name of your first invoice."
          : step === 5 ? "At least two (2) Frequently Required Together items must remain checked. This is a minimum, not a suggestion (§4.2)."
          : step === 8 ? "Card invalid. Have you tried having more money?"
          : "You must accept the Terms of Servitude and acknowledge Hubris Munnytown, Chief Executive Rabbit.",
      });
      return;
    }
    if (step === 7 && surpriseUpsells.length === 0) {
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
        <PageHero kicker="Checkout" title="Your cart is empty." sub="Checkout with nothing? Bold. Hubris Munnytown respects it but the fees disagree — and the Browsing Fee is already running." />
        <div className="max-w-xl mx-auto px-4 py-10 text-center">
          <div className="bg-white border-2 border-hubris rounded-xl p-6">
            <div className="font-mono text-sm text-ink/60">Browsing fee accrued so far</div>
            <div className="font-serif font-black text-4xl text-alarm tabular-nums">${formatMoney(browsingFee)}</div>
            <p className="fine-print text-ink/45 mt-1">Escalation ×{escalation}. An empty cart does not stop the meter. Nothing stops the meter.</p>
          </div>
          <Link to="/catalog" className="mt-6 inline-flex items-center gap-2 bg-hubris text-white font-bold px-6 py-3 rounded-lg">BACK TO CATALOG <ArrowRight size={15} /></Link>
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
            <p className="text-ink/60 mt-2">A confirmation email with 40 upsells is on its way. Your books ship in 6–8 eternities via Glacial post. Pages 200 and above will follow as a separate product.</p>
            <div className="bg-parchment rounded-lg p-4 mt-5 text-left font-mono text-sm space-y-1">
              <div className="flex justify-between"><span>Merchandise</span><strong>${subtotal.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>Frequently Required Together ({requiredOnCount}/6)</span><strong>${requiredTotal.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>Decline Fees (for declining)</span><strong>${uncheckFees.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>Base fees (handling, spine, convenience, paper, font, regret)</span><strong>${BASE_FEES.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>Surprise upsells</span><strong>${surpriseTotal.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>Browsing Fee (scroll-metered)</span><strong className="text-alarm">${formatMoney(browsingFee)}</strong></div>
              <div className="flex justify-between border-t border-hubris/25 pt-1.5 text-base"><span className="font-bold">Charged today</span><strong className="text-alarm">${formatMoney(total)}</strong></div>
              <div className="flex justify-between"><span>FunBux™ earned</span><strong>{Math.floor(total * 10).toLocaleString()} (spirit bucks)</strong></div>
              <div className="flex justify-between"><span>Refund eligibility</span><strong>None. Never. Hope this helps.</strong></div>
              <div className="flex justify-between"><span>Estimated delivery</span><strong>Heat death of universe ± 2 days</strong></div>
              <div className="flex justify-between"><span>Renewals scheduled</span><strong>Shelf Presence Assurance™ at $34, annually, forever</strong></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to="/catalog" className="flex-1 bg-hubris text-white font-bold py-3 rounded-lg">BUY MORE (PLEASE)</Link>
              <Link to="/loyalty" className="flex-1 border-2 border-hubris font-bold py-3 rounded-lg">VIEW MY FUNBUX™</Link>
            </div>
            <p className="fine-print text-ink/40 mt-4">By completing this purchase you have agreed to receive our catalog, our emails, our texts, and our regards, forever. Your Single-Lend Entitlement expires if the named adult moves.</p>
          </div>
        </div>
      </div>
    );
  }

  const bump = BOOKS.find((b) => b.id === "critical-librarianship-patent") ?? BOOKS[5];

  return (
    <div className="paper-texture min-h-screen pb-12">
      <PageHero
        kicker={`Secure(?) checkout · step ${step + 1} of ${STEPS.length}`}
        title={<>{STEPS[step]}</>}
        sub="Progress is saved. Dignity is not. Abandoning this checkout triggers the Abandonment Fee ($6.66), and the Browsing Fee keeps running either way."
      >
        <div className="flex gap-1 mt-5 overflow-x-auto scrollbar-thin pb-1">
          {STEPS.map((s, i) => (
            <div key={s} className={`shrink-0 font-mono text-[10px] px-2.5 py-1.5 rounded border ${i < step ? "bg-mint text-white border-mint" : i === step ? "bg-gold text-hubris border-gold font-bold" : "text-paper/40 border-paper/20"}`}>
              {i < step ? "✓ " : ""}{i + 1}. {s}
            </div>
          ))}
        </div>
        <div className="mt-4 inline-flex items-center gap-3 bg-black/30 border border-alarm/50 rounded-lg px-4 py-2 font-mono text-xs">
          <span className="text-paper/50">Live total (grows as you scroll):</span>
          <strong className="text-alarm text-lg tabular-nums">${formatMoney(total)}</strong>
          <span className="text-paper/40">· browsing fee ${formatMoney(browsingFee)} · ×{escalation}</span>
        </div>
      </PageHero>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white border-[3px] border-hubris rounded-xl p-6 sm:p-8 shadow-[6px_6px_0_rgba(15,30,61,1)]">
          {step === 0 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Review Your Cart (again, slower)</h2>
              <p className="text-sm text-ink/60 mt-1">Look at it. Really look at it. These books need you. The Browsing Fee agrees, and it is already at ${formatMoney(browsingFee)}.</p>
              <div className="mt-4 space-y-2">
                {cart.map((l) => (
                  <div key={l.book.id} className="flex justify-between bg-parchment rounded px-3 py-2 text-sm">
                    <span>{l.book.title} × {l.qty}</span>
                    <strong>${(l.book.price * l.qty).toFixed(2)}</strong>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-alarm/10 border border-alarm/40 rounded-lg p-3 text-sm">
                <strong className="text-alarm">Notice:</strong> six (6) items are Frequently Required Together and will be
                pre-checked at step 6. They are already, in a legal sense, checked now.
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Create an Account (mandatory, hereditary)</h2>
              <p className="text-sm text-ink/60 mt-1">Guest checkout was removed in 2019 for security reasons. Yours.</p>
              <div className="grid gap-3 mt-4">
                <Field label="Email (required, forever, shared with 47 parents)" value={form.email} onChange={set("email")} placeholder="you@example.com" type="email" />
                <Field label="Full legal name (as it appears on your lease)" value={form.name} onChange={set("name")} placeholder="e.g., Tenant, Formerly a Reader" />
                <Field label="Password (12+ chars, one hieroglyph, one invoice name)" value={form.password} onChange={set("password")} placeholder="••••••••••••" type="password" />
                <Field label="Mother's maiden name (for fun, and for verification)" value={form.motherMaiden} onChange={set("motherMaiden")} placeholder="Optional* (*required)" />
              </div>
              <p className="fine-print text-ink/45 mt-2">By creating an account you enroll in FunBux™, The Wire ($4.99/mo), and the Inferred Household category of our cookie stack.</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Shipping Address (a place we will bill)</h2>
              <Field label="Street address" value={form.address} onChange={set("address")} placeholder="1 Monetization Plaza, Suite 666" />
              <div className="grid sm:grid-cols-3 gap-3 mt-3">
                {["Glacial (free*, 6–8 eternities)", "Standard (not really, $12.99)", "Quantum Teleport ($99.99, yesterday)"].map((s, i) => (
                  <div key={s} className={`border-2 rounded-lg p-3 text-sm ${i === 0 ? "border-hubris bg-parchment" : "border-hubris/20"}`}>
                    <div className="font-bold">{i === 0 ? "✓ " : ""}{s}</div>
                    <div className="fine-print text-ink/45 mt-1">{i === 0 ? "*$18.99 handling" : i === 1 ? "Arrives eventually" : "Not real. Most popular."}</div>
                  </div>
                ))}
              </div>
              <p className="fine-print text-ink/45 mt-3">Delivery to Tuesdays incurs the Day Usage Surcharge ($4.00). We own Tuesday now.</p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Gift Options <span className="font-mono text-xs font-normal text-ink/50">(all priced, one mandatory)</span></h2>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {[
                  ["Gift wrap (+$8.99/copy)", "Wrapping paper features our logo 400 times. Unwrapping requires the Unwrap License ($2.99)."],
                  ["Handwritten note (+$14.00)", "Written by Greg, who is now a chatbot, in a font we license from ourselves."],
                  ["Ribbon & seal (+$6.50)", "The seal is a trademark. Breaking it is a licensing event."],
                  ["Anonymous giving (+$22.00)", "We will not tell them it was you. We will tell them it was someone. We will tell them the price."],
                ].map(([t, d], i) => (
                  <label key={t} className="flex items-start gap-2 border-2 border-hubris/20 rounded-lg p-3 cursor-pointer text-sm hover:border-hubris">
                    <input type="checkbox" defaultChecked={i === 0} className="mt-1 accent-[#D92D20]" />
                    <span><strong>{t}</strong> <span className="fine-print text-ink/50 block">{d}</span></span>
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
                <p className="text-ink/60 mt-1">Covers theft, weather, pirates, and emotional damage to the book when it is ignored on a shelf. 97% of customers keep it (the decline button is below, in 6-point type).</p>
              </div>
              <div className="mt-6 text-center">
                {!insuranceOptOutFound ? (
                  <button onClick={() => { setInsuranceOptOutFound(true); pushToast({ kind: "info", title: "Opt-out found!", body: "You found the 6pt opt-out link. Impressive. Hubris Munnytown has been notified of your frugality, and has shrugged, which is a decision." }); }} className="text-[6pt] text-ink/30 underline hover:text-ink/60">
                    decline coverage
                  </button>
                ) : (
                  <div className="font-mono text-xs text-mint font-bold flex items-center justify-center gap-1"><Check size={13} /> Coverage declined. Living dangerously. We respect it. Shelf Presence Assurance™ still covers the feelings.</div>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="flex items-start gap-3">
                <TriangleAlert size={24} className="text-alarm shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif font-black text-2xl">Frequently Required Together</h2>
                  <p className="text-sm text-ink/60 mt-1">
                    All six items are pre-checked, as is our policy, as is our right, as is described in §4.2 of the Terms of
                    Servitude. You may decline any of them. Declining costs money. A minimum of two (2) items must remain
                    checked to continue.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {REQUIRED_TOGETHER.map((u) => {
                  const on = !!required[u.id];
                  return (
                    <div key={u.id} className={`border-2 rounded-lg p-3.5 transition-colors ${on ? "border-mint bg-mint/5" : "border-alarm/50 bg-alarm/5"}`}>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={on} onChange={() => (on ? uncheckItem(u.id) : toggleRequired(u.id))} className="mt-1 w-4 h-4 accent-[#067647]" />
                        <span className="flex-1 min-w-0">
                          <span className="flex flex-wrap items-baseline gap-x-2">
                            <strong className="text-sm">{u.name}</strong>
                            <span className="font-mono text-sm font-black text-alarm">${u.price.toFixed(2)}</span>
                            <span className="font-mono text-[9px] font-bold bg-hubris text-gold-light px-1.5 py-0.5 rounded uppercase">{u.tag}</span>
                          </span>
                          <span className="text-sm text-ink/70 block mt-0.5">{u.desc}</span>
                          {u.footnote && <span className="fine-print text-ink/45 block mt-1">{u.footnote}</span>}
                        </span>
                      </label>
                      {!on && (
                        <div className="fine-print text-alarm font-bold mt-2 pl-7">
                          Declined. A ${u.uncheckFee.toFixed(2)} Decline Fee has been applied. Declining the decline is not
                          available.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-hubris text-paper rounded-lg p-4">
                <div className="font-mono text-xs">
                  <div>Required together ({requiredOnCount}/6): <strong className="text-gold-light">${requiredTotal.toFixed(2)}</strong></div>
                  <div>Decline fees accrued: <strong className="text-alarm">${uncheckFees.toFixed(2)}</strong></div>
                </div>
                <button onClick={declineAll} className="fine-print text-paper/50 underline hover:text-alarm">decline everything (${REQUIRED_TOGETHER.reduce((s, u) => s + u.uncheckFee, 0).toFixed(2)} in decline fees)</button>
              </div>
              <p className="fine-print text-ink/45 mt-2">
                Minimum two items required to proceed. Items re-check themselves if our systems detect a mis-click, which they
                do often, because they are systems and you are a person.
              </p>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Donation <span className="font-mono text-xs font-normal text-ink/50">(skipping is tracked)</span></h2>
              <p className="text-sm text-ink/60 mt-1">Would you like to donate $25 to Hubris Munnytown's Third Burrow Fund? The burrow is in Aspen. The yacht is named <em>S.S. Open Access</em> and is berthed outside it, because rabbits enjoy a view.</p>
              <div className="grid sm:grid-cols-2 gap-2 mt-4">
                <button onClick={() => pushToast({ kind: "info", title: "$25 donated!", body: "The burrow thanks you. The rabbit thanks you. The sea remains indifferent. Your name will be engraved on a carrot." })} className="bg-mint text-white font-bold py-3 rounded-lg">YES, I'M GENEROUS ($25)</button>
                <button onClick={() => pushToast({ kind: "warning", title: "Noted.", body: "Your decline has been logged and will be read aloud at the company retreat, which is a nap." })} className="fine-print text-ink/40 underline py-3">no, I hate burrows (decline)</button>
              </div>
            </div>
          )}

          {step === 7 && (
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

          {step === 8 && (
            <div>
              <h2 className="font-serif font-black text-2xl flex items-center gap-2"><CreditCard size={24} /> Payment (finally, the main event)</h2>
              <div className="grid gap-3 mt-4">
                <Field label="Card number (we'll remember it forever)" value={form.card} onChange={set("card")} placeholder="4111 1111 1111 1111" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry" value={form.expiry} onChange={set("expiry")} placeholder="MM/YY" />
                  <Field label="CVC (the fun numbers)" value={form.cvc} onChange={set("cvc")} placeholder="123" />
                </div>
              </div>
              <div className="mt-4 bg-parchment rounded-lg p-3 font-mono text-xs space-y-1">
                <div className="flex justify-between"><span>Merchandise + fees</span><strong>${(total - browsingFee).toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Browsing Fee (still running)</span><strong className="text-alarm">${formatMoney(browsingFee)}</strong></div>
                <div className="flex justify-between border-t border-hubris/25 pt-1"><span className="font-bold">Authorizing</span><strong className="text-alarm">${formatMoney(total)}</strong></div>
              </div>
              <p className="fine-print text-ink/45 mt-2 flex items-center gap-1"><Fingerprint size={11} /> By paying you authorize this charge and all future charges that feel related, including annual renewals of Shelf Presence Assurance™ at $34.</p>
            </div>
          )}

          {step === 9 && (
            <div className="text-center py-4">
              <h2 className="font-serif font-black text-2xl">Reflection</h2>
              <p className="text-sm text-ink/60 mt-2 max-w-md mx-auto">Take a moment. Think about your purchase. Think about the fees. The fees think about you, constantly. There is no back button on this step. There is only forward, and the total, which grew while you reflected (+$2.00 reflection fee, added).</p>
              <div className="font-serif italic text-4xl mt-6 text-hubris/30">"To buy is to belong."</div>
              <div className="font-mono text-[11px] text-ink/40 mt-1">— Hubris Munnytown, <em>Meditations on Margin</em> ($89.99, concludes at page 199)</div>
              <div className="mt-6 flex justify-center"><SmugBunny size={72} className="animate-bunny-bob" /></div>
            </div>
          )}

          {step === 10 && (
            <div>
              <h2 className="font-serif font-black text-2xl">Final Confirmation <span className="font-mono text-xs font-normal text-ink/50">(no take-backs)</span></h2>
              <div className="bg-parchment rounded-lg p-4 mt-4 font-mono text-sm space-y-1">
                <div className="flex justify-between"><span>{cart.reduce((s, l) => s + l.qty, 0)} items</span><strong>${subtotal.toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Frequently Required Together ({requiredOnCount}/6)</span><strong>${requiredTotal.toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Decline Fees</span><strong>${uncheckFees.toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Surprises</span><strong>${surpriseTotal.toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Base fees</span><strong>${(BASE_FEES + insuranceTotal).toFixed(2)}</strong></div>
                <div className="flex justify-between"><span>Browsing Fee</span><strong className="text-alarm">${formatMoney(browsingFee)}</strong></div>
                <div className="flex justify-between text-lg pt-2 border-t border-hubris/20"><span className="font-bold">TOTAL</span><strong className="text-alarm tabular-nums">${formatMoney(total)}</strong></div>
              </div>
              <div className="space-y-2 mt-4 text-sm">
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.terms} onChange={() => setAgreed({ ...agreed, terms: !agreed.terms })} className="mt-1" /> I accept the <Link to="/terms" className="underline font-bold">Terms of Servitude</Link> (required)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.marketing} onChange={() => setAgreed({ ...agreed, marketing: !agreed.marketing })} className="mt-1" /> Email me 6× daily (pre-checked; unchecking adds a $1 Uncheck Fee)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.soul} onChange={() => setAgreed({ ...agreed, soul: !agreed.soul })} className="mt-1" /> I consent to the Soul Clause §13.3 (pre-checked, obviously)</label>
                <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={agreed.lending} onChange={() => setAgreed({ ...agreed, lending: !agreed.lending })} className="mt-1" /> I will name the one (1) adult permitted under my Single-Lend Entitlement (pre-checked)</label>
                {agreed.lending && (
                  <input value={lender} onChange={(e) => setLender(e.target.value)} placeholder="Full legal name of the one adult you would lend a book to" className="w-full border-2 border-hubris/25 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-hubris" />
                )}
                <label className="flex items-start gap-2 cursor-pointer bg-gold/10 border border-gold rounded-lg p-2.5"><input type="checkbox" checked={agreed.munnytown} onChange={() => setAgreed({ ...agreed, munnytown: !agreed.munnytown })} className="mt-1" /> I acknowledge Hubris Munnytown, Chief Executive Rabbit, and his authority over the meter (required)</label>
              </div>
            </div>
          )}

          {/* nav */}
          <div className="flex gap-3 mt-8 pt-6 border-t-2 border-dashed border-hubris/20">
            {step > 0 && step !== 9 && (
              <button onClick={() => setStep(step - 1)} className="border-2 border-hubris font-bold px-5 py-3 rounded-lg flex items-center gap-1 hover:bg-parchment">
                <ArrowLeft size={15} /> Back
              </button>
            )}
            <button onClick={next} className={`flex-1 font-black py-3 rounded-lg flex items-center justify-center gap-2 text-white ${canAdvance() ? "bg-alarm hover:brightness-110" : "bg-ink/40"}`}>
              {step === STEPS.length - 1 ? <><Lock size={16} /> PLACE NON-REFUNDABLE ORDER — ${formatMoney(total)}</> : <>CONTINUE <ArrowRight size={16} /></>}
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
              <strong>ORDER BUMP:</strong> Add <Link to={`/book/${bump.id}`} className="underline font-bold">{bump.title}</Link> for just ${bump.price.toFixed(2)}?
              <span className="text-ink/60"> 87% of customers add it (the button adds it if you hover too long). It is a patent. You will be practicing the invention.</span>
            </div>
            <button onClick={() => pushToast({ kind: "upsell", title: "Bump added!", body: "Hover detected. Book added. Royalty of $0.40 per critical thought now accruing. Resistance billed." })} className="bg-gold text-hubris font-bold px-5 py-2.5 rounded-lg text-sm shrink-0 flex items-center gap-1">
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
