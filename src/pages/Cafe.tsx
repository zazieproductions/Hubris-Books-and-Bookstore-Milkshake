import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgePercent, Candy, Coffee, CupSoda, Milk, Star, UtensilsCrossed, Wheat } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { PageHero, SectionShell, Kicker } from "../components/chrome";

const MENU = [
  { icon: Milk, name: "Vanilla Compliance", desc: "Our signature and only shake. Tastes like a late fee. Topped with whipped accountability.", price: 19.0, tag: "MOST COMPLIANT" },
  { icon: CupSoda, name: "Vanilla Compliance (Large)", desc: "Same shake. Bigger cup. The extra 4oz are air, billed as 'atmosphere.'", price: 26.0, tag: "BEST VALUE*" },
  { icon: Coffee, name: "Decaf Defiance", desc: "For rebels. It's just warm milk. Ordering it triggers a wellness check from Greg.", price: 14.0, tag: "SEASONAL (NEVER)" },
  { icon: Candy, name: "Dewey Decimal Sundae", desc: "Ten scoops, one per hundred classes. The 300s (social sciences) are just beans.", price: 24.0, tag: "CLASSIFIED" },
  { icon: Wheat, name: "Weeded Wheatgrass Shot", desc: "Juiced from deaccessioned reference materials. Tastes like قَالَ and poor decisions.", price: 12.0, tag: "DEACCESSIONED" },
  { icon: UtensilsCrossed, name: "The Full Marc Record Meal", desc: "Shake + sandwich + 37 fields of metadata. Control fields are fries.", price: 39.0, tag: "LEADER: $$$$$" },
];

const RULES = [
  "Outside beverages will be confiscated and resold to you at a 200% markup.",
  "Refills are $14 and mandatory after page 50 of any purchase.",
  "Tables are rented by the 15 minutes ($3.50). Standing is free* (*$1 standing fee).",
  "Laptops may be used for Hubris purchases only. Our WiFi redirects everything to checkout.",
  "Tipping is automatic (35%), non-optional, and distributed to shareholders.",
  "The secret menu does not exist. Asking about it costs $5. (It's Vanilla Compliance with a second straw: $9.)",
];

export default function Cafe() {
  const { pushToast, bumpHubris } = useShop();
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState(0);

  const order = (name: string, price: number) => {
    setTab(tab + price);
    setOrders(orders + 1);
    bumpHubris(4);
    pushToast({ kind: "upsell", title: `${name} added to your tab!`, body: `Tab total: $${(tab + price).toFixed(2)}. Tabs earn FunBux™ and cannot be closed without a manager (Greg is busy).` });
  };

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="Bookstore Milkshake Café · inside Hubris Tower · one flavor"
        title={<>The Café That <span className="italic text-shake">Funds the Imprint</span></>}
        sub="Every shake purchased keeps critical theory profitable. Every shake refused is logged. Come thirsty, leave compliant."
      >
        <div className="mt-5 inline-flex items-center gap-3 bg-black/30 border border-shake/50 rounded-lg px-4 py-2.5 font-mono text-sm">
          <Milk size={18} className="text-shake" />
          Your tab: <strong className="text-shake text-lg">${tab.toFixed(2)}</strong>
          <span className="text-paper/50 text-xs">({orders} orders · auto-tip 35% included · tab cannot be closed)</span>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 -mt-0">
        <img src="/images/milkshake.jpg" alt="Vanilla Compliance" className="w-full object-cover aspect-[21/8] border-x-4 border-b-4 border-hubris" />
      </div>

      <SectionShell>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <Kicker>The full menu · all six items · all vanilla-adjacent</Kicker>
            <h2 className="font-serif font-black text-3xl sm:text-4xl mt-2">Menu (laminated, legally binding)</h2>
          </div>
          <div className="font-mono text-xs text-ink/50 flex items-center gap-1">
            <BadgePercent size={13} /> Prices include a 12% menu-printing fee
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {MENU.map((m) => (
            <div key={m.name} className="bg-white border-2 border-hubris rounded-xl p-5 flex flex-col hover:shadow-[5px_5px_0_rgba(15,30,61,1)] hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between gap-2">
                <div className="w-12 h-12 rounded-full bg-shake/20 border-2 border-shake flex items-center justify-center">
                  <m.icon size={22} className="text-shake-dark" />
                </div>
                <span className="font-mono text-[9px] font-bold bg-hubris text-gold-light px-2 py-1 rounded">{m.tag}</span>
              </div>
              <div className="font-serif font-black text-xl mt-3">{m.name}</div>
              <p className="text-sm text-ink/60 mt-1 flex-1">{m.desc}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-hubris/20">
                <span className="font-black text-2xl text-alarm">${m.price.toFixed(2)}</span>
                <button onClick={() => order(m.name, m.price)} className="bg-shake hover:bg-shake-dark text-hubris font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                  ADD TO TAB
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-hubris text-paper rounded-xl p-6 border-4 border-gold">
            <h3 className="font-serif font-black text-2xl">House Rules <span className="font-mono text-xs font-normal text-paper/50">(posted, enforced, monetized)</span></h3>
            <ol className="mt-4 space-y-2.5 text-sm list-decimal list-inside">
              {RULES.map((r, i) => (
                <li key={i} className="text-paper/80"><span className="font-mono text-gold-light font-bold mr-1">{i + 1}.</span>{r}</li>
              ))}
            </ol>
          </div>
          <div className="bg-white border-2 border-hubris rounded-xl p-6">
            <h3 className="font-serif font-black text-2xl flex items-center gap-2"><Star size={20} className="text-gold" /> Shake of the Month Club</h3>
            <p className="text-sm text-ink/60 mt-2">Join the club! Every month you receive one (1) Vanilla Compliance and twelve (12) invoices. Cancel anytime* — *anytime is never; membership is hereditary.</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {["Monthly shake (vanilla, compliant)", "Birthday shake (Greg's birthday, you pay)", "Skip-a-month option ($8 skip fee)", "Hereditary membership (your kids are members now)"].map((f) => (
                <li key={f} className="flex gap-2"><span className="text-mint font-bold">✓</span>{f}</li>
              ))}
            </ul>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="font-black text-3xl text-alarm">$29.99/mo</span>
              <span className="fine-print text-ink/45">+ shake ($19) + tip (35%) + fee fees</span>
            </div>
            <button onClick={() => pushToast({ kind: "warning", title: "Enrolled in Shake Club!", body: "Welcome! Your first shake ships in 6–8 eternities (melted). Membership is hereditary — we've notified your next of kin." })} className="mt-4 w-full bg-hubris text-white font-bold py-3 rounded-lg hover:bg-hubris-light">
              JOIN THE CLUB (FOREVER)
            </button>
            <p className="fine-print text-ink/45 mt-2 text-center">12,408 members · 0 successful cancellations · 3 hereditary transfers this week</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-hubris font-bold hover:text-alarm">
            Shakes pair best with overpriced theory — browse the catalog <ArrowRight size={15} />
          </Link>
        </div>
      </SectionShell>
    </div>
  );
}
