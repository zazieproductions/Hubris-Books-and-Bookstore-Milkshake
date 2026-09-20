import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Calculator, Check, FileText, HandCoins, Send, Star } from "lucide-react";
import { SUBSCRIPTION_TIERS } from "../data/books";
import { useShop } from "../store/ShopContext";
import { Kicker, PageHero, SectionShell } from "../components/chrome";

const TIERS = [
  { name: "Compliant", min: 0, perks: ["Earn 1 FunBux™ per $1 (spirit bucks)", "Birthday email (the rabbit's birthday; you buy the card)", "Access to sales (prices higher, labeled lower)"] },
  { name: "Devoted", min: 5000, perks: ["Everything in Compliant", "Priority hold queue (still a queue)", "Free gift wrap on your birthday (the rabbit's birthday)", "A lanyard ($9.99)"] },
  { name: "Bound in Leather", min: 25000, perks: ["Everything in Devoted", "Dedicated Greg (a chatbot, shared with 4,000 members)", "Early access to fees (pay them first!)", "Your name on the Wall of Revenue"] },
  { name: "One With Hubris", min: 100000, perks: ["You are the rabbit now", "All perks, all access, all fees waived*", "*Fees renamed, not waived"] },
];

export default function Loyalty() {
  const { loyaltyPoints, pushToast, bumpHubris } = useShop();
  const [calc, setCalc] = useState(100);
  const [calcTier, setCalcTier] = useState("loyalty");

  const tier = [...TIERS].reverse().find((t) => loyaltyPoints >= t.min) ?? TIERS[0];
  const next = TIERS[TIERS.indexOf(tier) + 1];

  const funbuxValue = calcTier === "loyalty" ? 0 : 0; // always 0, obviously
  void funbuxValue;

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="Hubris FunBux™ · bucks in spirit"
        title={<>Loyalty, <span className="italic text-gold-light">Monetized</span></>}
        sub="Earn FunBux™ on every purchase! FunBux™ are not currency, not transferable, not redeemable, and not fun — but they ARE bucks in spirit, and spirit is priceless (priceless = $0)."
      >
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="bg-black/30 border border-gold/50 rounded-lg px-4 py-2.5 font-mono text-sm">
            Your balance: <strong className="text-gold-light text-lg">{loyaltyPoints.toLocaleString()} FunBux™</strong>
            <span className="text-paper/50 text-xs ml-2">≈ $0.00 USD (exchange rate: ∞:0)</span>
          </div>
          <div className="bg-gold text-hubris font-bold text-sm px-4 py-2.5 rounded-lg">STATUS: {tier.name.toUpperCase()}</div>
        </div>
      </PageHero>

      <SectionShell>
        <Kicker>Four tiers of devotion · progress is automatic, like the charges</Kicker>
        <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Your Path to Becoming the Rabbit</h2>
        <div className="mt-4 bg-white border-2 border-hubris rounded-lg p-4">
          <div className="flex justify-between font-mono text-xs mb-2">
            <span className="font-bold">{tier.name} ({loyaltyPoints.toLocaleString()} pts)</span>
            <span className="text-ink/50">{next ? `Next: ${next.name} at ${next.min.toLocaleString()} pts` : "You are Greg. There is no next."}</span>
          </div>
          <div className="h-4 bg-parchment rounded-full overflow-hidden border border-hubris/30">
            <div
              className="h-full shimmer rounded-full transition-all"
              style={{ width: next ? `${Math.min(100, ((loyaltyPoints - tier.min) / (next.min - tier.min)) * 100)}%` : "100%" }}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {TIERS.map((t) => {
            const active = t.name === tier.name;
            return (
              <div key={t.name} className={`rounded-lg p-5 border-2 ${active ? "border-gold bg-hubris text-paper shadow-[5px_5px_0_rgba(201,162,39,1)]" : "border-hubris/25 bg-white"}`}>
                <div className="flex items-center justify-between">
                  <Star size={18} className={active ? "text-gold" : "text-hubris/30"} fill={active ? "currentColor" : "none"} />
                  {active && <span className="font-mono text-[10px] font-bold bg-gold text-hubris px-2 py-0.5 rounded">YOU ARE HERE</span>}
                </div>
                <div className="font-serif font-black text-xl mt-2">{t.name}</div>
                <div className={`font-mono text-xs ${active ? "text-gold-light" : "text-ink/50"}`}>{t.min.toLocaleString()}+ pts</div>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-1.5"><Check size={13} className={`mt-0.5 shrink-0 ${active ? "text-gold" : "text-mint"}`} /> {p}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </SectionShell>

      {/* subscriptions */}
      <div className="bg-hubris text-paper border-y-4 border-gold">
        <SectionShell className="!py-10">
          <Kicker><span className="text-gold-light">Hubris+ Memberships · cancel anytime* (*never)</span></Kicker>
          <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Subscribe & Save (us, from lower revenue)</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {SUBSCRIPTION_TIERS.map((s) => (
              <div key={s.name} className={`rounded-xl p-6 border-2 flex flex-col ${s.highlighted ? "border-gold bg-hubris-light shadow-[0_0_30px_rgba(201,162,39,0.3)] relative" : "border-paper/20 bg-black/20"}`}>
                {s.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-hubris font-mono text-[10px] font-bold px-3 py-1 rounded-full">MOST REGRETTED</div>}
                <div className="font-serif font-black text-xl">{s.name}</div>
                <div className="font-black text-3xl text-gold-light mt-1">{s.price}</div>
                <ul className="mt-3 space-y-1.5 text-sm flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-1.5 text-paper/80"><Check size={14} className="text-mint mt-0.5 shrink-0" /> {f}</li>
                  ))}
                </ul>
                <p className="fine-print text-paper/50 mt-3">{s.footnote}</p>
                <button onClick={() => pushToast({ kind: "warning", title: `Subscribed to ${s.name}!`, body: "Welcome! Your first charge is today, your second charge is also today (processing fee), and cancellation requires a notarized letter, a quest, and Greg." })} className={`mt-4 font-bold py-2.5 rounded-lg ${s.highlighted ? "bg-gold text-hubris hover:bg-gold-light" : "border-2 border-paper/30 hover:border-gold"}`}>
                  SUBSCRIBE (BINDING)
                </button>
              </div>
            ))}
          </div>
        </SectionShell>
      </div>

      <SectionShell>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* calculator */}
          <div className="bg-white border-2 border-hubris rounded-xl p-6">
            <h3 className="font-serif font-black text-2xl flex items-center gap-2"><Calculator size={22} className="text-gold" /> FunBux™ Value Calculator</h3>
            <p className="text-sm text-ink/60 mt-1">See exactly what your loyalty is worth! (Spoiler: the calculator is honest. We're sorry.)</p>
            <label className="block mt-4 font-mono text-xs font-bold">DOLLARS YOU SPENT: ${calc}</label>
            <input type="range" min={10} max={5000} step={10} value={calc} onChange={(e) => setCalc(Number(e.target.value))} className="w-full accent-[#0F1E3D] mt-1" />
            <label className="block mt-3 font-mono text-xs font-bold">REWARD PROGRAM</label>
            <select value={calcTier} onChange={(e) => setCalcTier(e.target.value)} className="mt-1 w-full border-2 border-hubris/30 rounded-lg px-3 py-2 text-sm">
              <option value="loyalty">FunBux™ Loyalty</option>
              <option value="plus">Hubris+ Membership</option>
              <option value="club">Shake of the Month Club</option>
            </select>
            <div className="bg-parchment rounded-lg p-4 mt-4 font-mono text-center">
              <div className="text-xs text-ink/60">YOUR REWARDS ARE WORTH</div>
              <div className="font-black text-4xl text-alarm">$0.00</div>
              <div className="text-xs text-ink/60 mt-1">= {(calc * 10).toLocaleString()} FunBux™ (spirit bucks, ∞:0 exchange rate)</div>
            </div>
          </div>

          {/* gift cards */}
          <div className="bg-white border-2 border-hubris rounded-xl p-6">
            <h3 className="font-serif font-black text-2xl flex items-center gap-2"><HandCoins size={22} className="text-gold" /> Gift Cards</h3>
            <p className="text-sm text-ink/60 mt-1">The gift of compliance! Available in $25, $50, and $100 denominations, each with a $7.99 activation fee, $2.99/month dormancy fee, and $4.99 gifting fee.</p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[25, 50, 100].map((amt) => (
                <button key={amt} onClick={() => { bumpHubris(6); pushToast({ kind: "upsell", title: `$${amt} gift card added!`, body: `Total: $${(amt + 7.99 + 4.99).toFixed(2)} (card + activation + gifting). Dormancy fees begin immediately, including during purchase.` }); }} className="border-2 border-hubris rounded-lg p-3 hover:bg-parchment transition-colors">
                  <div className="font-black text-2xl">${amt}</div>
                  <div className="font-mono text-[10px] text-ink/50">+$12.98 in fees</div>
                </button>
              ))}
            </div>
            <p className="fine-print text-ink/45 mt-3">Gift cards expire 30 days after purchase, are non-refundable, non-transferable, non-functional on weekends, and may only be redeemed for fees (not books).</p>
            <button onClick={() => pushToast({ kind: "info", title: "Balance checked!", body: "Your gift card balance is $0.00. Dormancy fees are efficient. Thank you for gifting." })} className="mt-3 w-full border-2 border-hubris font-bold py-2.5 rounded-lg text-sm hover:bg-parchment">
              CHECK BALANCE (PREPARE YOURSELF)
            </button>
          </div>
        </div>

        <div className="mt-8 bg-alarm text-white rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <BadgeCheck size={36} className="shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <div className="font-serif font-black text-xl">Refer a Friend, Earn 50 FunBux™!</div>
            <p className="text-sm text-white/80">They'll thank you. Eventually. After the retention call. (Referrals are mandatory after 3 purchases.)</p>
          </div>
          <button onClick={() => pushToast({ kind: "info", title: "Referral link copied!", body: "hubrisbooks.example/ref/YOU-OWE-US — 3 friends must purchase within 24h or you lose Devoted status. No pressure." })} className="bg-white text-alarm font-black px-6 py-3 rounded-lg flex items-center gap-2 shrink-0">
            <Send size={15} /> COPY REFERRAL LINK
          </button>
        </div>
      </SectionShell>
    </div>
  );
}
