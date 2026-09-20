import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeDollarSign, Check, ChevronDown, CreditCard, Gift, Lock,
  Minus, Plus, ShieldCheck, ShoppingCart, Trash2, Truck, TriangleAlert,
} from "lucide-react";
import { HIDDEN_FEES } from "../data/books";
import { useShop } from "../store/ShopContext";
import { PageHero } from "../components/chrome";
import { Cover } from "../components/books";

const SHIPPING = [
  { id: "glacier", name: "Glacial", time: "6–8 eternities", price: 0, note: "FREE* (*$18.99 handling)" },
  { id: "standard", name: "Standard (not really)", time: "3–5 eternities", price: 12.99, note: "Arrives eventually" },
  { id: "express", name: "Express Guilt", time: "1–2 eternities", price: 29.99, note: "A courier judges you promptly" },
  { id: "teleport", name: "Quantum Teleport", time: "Yesterday", price: 99.99, note: "Not real. Most popular." },
];

const DONATIONS = [
  { id: "none", label: "No donation (monster)", price: 0 },
  { id: "round", label: "Round up for literacy*", price: 0.99 },
  { id: "greg", label: "Greg's Yacht Fund", price: 25 },
  { id: "tower", label: "Hubris Tower Gold Plating", price: 100 },
];

export default function Cart() {
  const { cart, removeFromCart, setQty, toggleGiftWrap, toggleInsurance, subtotal, pushToast, bumpHubris } = useShop();
  const [ship, setShip] = useState("glacier");
  const [donation, setDonation] = useState("round");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [roundup, setRoundup] = useState(true);
  const [showFees, setShowFees] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const shipCost = SHIPPING.find((s) => s.id === ship)!;
  const donationCost = DONATIONS.find((d) => d.id === donation)!;
  const giftWrapTotal = cart.reduce((s, l) => s + (l.giftWrap ? 8.99 * l.qty : 0), 0);
  const insuranceTotal = cart.reduce((s, l) => s + (l.insurance ? 6.49 * l.qty : 0), 0);

  const promoDiscount = useMemo(() => {
    if (!promoApplied) return 0;
    if (promoApplied === "MEDIOCRITY") return Math.min(5, subtotal * 0.01);
    if (promoApplied === "ALLYSHIP") return subtotal * 0.3;
    if (promoApplied === "PLEASE") return 0.01;
    return 0;
  }, [promoApplied, subtotal]);

  const feesBase = cart.length > 0 ? 14.95 + 8.5 + 4.99 + 3.75 + shipCost.price + 18.99 : 0;
  const preTotal = subtotal + giftWrapTotal + insuranceTotal + feesBase + donationCost.price + (roundup ? 0.87 : 0) - promoDiscount;
  const regretInsurance = cart.length > 0 ? 11.11 : 0;
  const total = Math.max(0, preTotal + regretInsurance);

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (["MEDIOCRITY", "ALLYSHIP", "PLEASE"].includes(code)) {
      setPromoApplied(code);
      pushToast({ kind: "info", title: `Code ${code} applied!`, body: code === "ALLYSHIP" ? "30% off! (Off the tote. The tote is $38. The book is full price.)" : code === "MEDIOCRITY" ? "1% off fees over $500. You saved $0.41. Generous." : "We appreciate the manners. $0.01 off. Don't spend it all." });
    } else {
      pushToast({ kind: "warning", title: "Invalid code", body: `"${promo}" is not a code. It has been added to your permanent record. Try MEDIOCRITY, ALLYSHIP, or PLEASE.` });
    }
  };

  const attemptRemove = (id: string) => {
    if (confirmRemove === id) {
      removeFromCart(id);
      setConfirmRemove(null);
      pushToast({ kind: "fee", title: "Restocking fee applied", body: "A $7.99 Restocking Fee was added for removing an item from a digital cart. The shelf missed it." });
    } else {
      setConfirmRemove(id);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="paper-texture min-h-screen">
        <PageHero kicker="Your cart" title={<>Your Cart Is Empty. <span className="italic text-gold-light">Greg Noticed.</span></>} sub="An empty cart earns no FunBux™. An empty cart pays no fees. Do you understand what you've done to our quarterly projections?" />
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <ShoppingCart size={56} className="mx-auto text-hubris/30" />
          <p className="mt-4 text-ink/60">Your cart is empty, but your Browsing Fee meter is still running. Funny how that works.</p>
          <Link to="/catalog" className="inline-flex items-center gap-2 bg-gold text-hubris font-black px-6 py-3 rounded-lg mt-5">
            FILL IT WITH KNOWLEDGE ($) <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-texture min-h-screen pb-12">
      <PageHero
        kicker="Your cart · every fee itemized, none removable"
        title={<>Shopping Cart <span className="italic text-gold-light">({cart.reduce((s, l) => s + l.qty, 0)} items, 47 fees)</span></>}
        sub="Review your order. Take your time — the Browsing Fee rewards deliberation ($1.99/min)."
      />

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Lines */}
        <div className="space-y-4">
          {cart.map((line) => (
            <div key={line.book.id} className="bg-white border-2 border-hubris rounded-xl p-4 flex flex-col sm:flex-row gap-4">
              <Link to={`/book/${line.book.id}`} className="shrink-0 mx-auto sm:mx-0"><Cover book={line.book} size="sm" /></Link>
              <div className="flex-1">
                <Link to={`/book/${line.book.id}`} className="font-serif font-bold text-lg hover:text-alarm">{line.book.title}</Link>
                <div className="text-xs text-ink/60">{line.book.author} · {line.book.isbn}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <label className="flex items-center gap-1.5 text-xs bg-parchment rounded px-2 py-1 cursor-pointer">
                    <input type="checkbox" checked={line.giftWrap} onChange={() => toggleGiftWrap(line.book.id)} className="accent-[#0F1E3D]" />
                    <Gift size={11} /> Gift wrap +$8.99
                  </label>
                  <label className="flex items-center gap-1.5 text-xs bg-parchment rounded px-2 py-1 cursor-pointer">
                    <input type="checkbox" checked={line.insurance} onChange={() => toggleInsurance(line.book.id)} className="accent-[#0F1E3D]" />
                    <ShieldCheck size={11} /> Insurance +$6.49
                  </label>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border-2 border-hubris rounded">
                    <button onClick={() => setQty(line.book.id, line.qty - 1)} className="px-2 py-1 hover:bg-parchment"><Minus size={12} /></button>
                    <span className="w-7 text-center font-bold text-sm">{line.qty}</span>
                    <button onClick={() => setQty(line.book.id, line.qty + 1)} className="px-2 py-1 hover:bg-parchment"><Plus size={12} /></button>
                  </div>
                  <button
                    onClick={() => attemptRemove(line.book.id)}
                    className={`text-xs font-bold flex items-center gap-1 px-2 py-1 rounded ${confirmRemove === line.book.id ? "bg-alarm text-white animate-blink-hard" : "text-alarm hover:underline"}`}
                  >
                    <Trash2 size={12} /> {confirmRemove === line.book.id ? "ARE YOU SURE?? ($7.99 restocking fee)" : "Remove"}
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-black text-xl text-alarm">${(line.book.price * line.qty).toFixed(2)}</div>
                <div className="fine-print text-ink/45">${line.book.price.toFixed(2)} each, plus fees</div>
              </div>
            </div>
          ))}

          {/* shipping */}
          <div className="bg-white border-2 border-hubris rounded-xl p-5">
            <h3 className="font-serif font-bold text-lg flex items-center gap-2"><Truck size={18} /> Shipping (all options are slow; only prices differ)</h3>
            <div className="grid sm:grid-cols-2 gap-2 mt-3">
              {SHIPPING.map((s) => (
                <button key={s.id} onClick={() => setShip(s.id)} className={`border-2 rounded-lg p-3 text-left transition-colors ${ship === s.id ? "border-hubris bg-parchment" : "border-hubris/20 hover:border-hubris"}`}>
                  <div className="font-bold text-sm flex items-center justify-between">{s.name} {ship === s.id && <Check size={14} className="text-mint" />}</div>
                  <div className="font-mono text-[11px] text-ink/60">{s.time} · {s.note}</div>
                  <div className="font-black text-alarm mt-0.5">+${s.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* donation guilt */}
          <div className="bg-white border-2 border-alarm rounded-xl p-5">
            <h3 className="font-serif font-bold text-lg flex items-center gap-2 text-alarm"><BadgeDollarSign size={18} /> Round Up for a Good Cause (ours)</h3>
            <div className="grid sm:grid-cols-2 gap-2 mt-3">
              {DONATIONS.map((d) => (
                <button key={d.id} onClick={() => { setDonation(d.id); if (d.id === "none") pushToast({ kind: "warning", title: "No donation selected", body: "Wow. Okay. The yacht fund will remember this." }); }} className={`border-2 rounded-lg p-3 text-left transition-colors ${donation === d.id ? "border-alarm bg-alarm/5" : "border-hubris/20 hover:border-alarm"}`}>
                  <div className="font-bold text-sm flex items-center justify-between">{d.label} {donation === d.id && <Check size={14} className="text-alarm" />}</div>
                  <div className="font-mono text-xs text-ink/60">+${d.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
            <p className="fine-print text-ink/45 mt-2">*Literacy defined as the ability to read invoices. 100% of donations fund donation processing.</p>
            <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={roundup} onChange={() => setRoundup(!roundup)} className="accent-[#D92D20]" />
              Also round up my total by $0.87 for no stated reason <span className="font-mono text-[10px] text-ink/50">(pre-checked, obviously)</span>
            </label>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="lg:sticky lg:top-40 bg-hubris text-paper rounded-xl border-4 border-gold p-5 shadow-[6px_6px_0_rgba(201,162,39,1)]">
            <h3 className="font-serif font-black text-xl">Order Summary</h3>
            <div className="mt-3 space-y-1.5 text-sm">
              <Row k="Subtotal" v={`$${subtotal.toFixed(2)}`} />
              <Row k="Gift wrap" v={`$${giftWrapTotal.toFixed(2)}`} />
              <Row k="Shipping insurance" v={`$${insuranceTotal.toFixed(2)}`} />
              <Row k={`Shipping (${shipCost.name})`} v={`$${shipCost.price.toFixed(2)}`} />
              <Row k="Handling (mandatory, mysterious)" v="$18.99" />
              <Row k="Spine Hydration Fee" v="$14.95" />
              <Row k="Convenience Fee" v="$8.50" />
              <Row k="Paper Existence Surcharge" v="$4.99" />
              <Row k="Font Licensing Fee" v="$3.75" />
              <Row k={`Donation (${donationCost.label})`} v={`$${donationCost.price.toFixed(2)}`} />
              {roundup && <Row k="Mystery round-up" v="$0.87" />}
              <Row k="Regret Insurance (mandatory)" v={`$${regretInsurance.toFixed(2)}`} warn />
              {promoApplied && <Row k={`Promo (${promoApplied})`} v={`−$${promoDiscount.toFixed(2)}`} good />}
            </div>

            <button onClick={() => setShowFees(!showFees)} className="mt-3 w-full text-left font-mono text-[11px] text-gold-light flex items-center gap-1 hover:underline">
              <ChevronDown size={12} className={showFees ? "rotate-180" : ""} /> {showFees ? "Hide" : "Reveal"} all {HIDDEN_FEES.length} potential fees
            </button>
            {showFees && (
              <div className="mt-2 bg-black/30 rounded p-2 max-h-40 overflow-y-auto scrollbar-thin space-y-1">
                {HIDDEN_FEES.map((f) => (
                  <div key={f.name} className="font-mono text-[10px] flex justify-between gap-2 text-paper/70">
                    <span>{f.name}</span><span className="text-gold-light font-bold shrink-0">{f.amount}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t-2 border-gold/50 mt-3 pt-3 flex justify-between items-baseline">
              <span className="font-bold">Total</span>
              <span className="font-black text-3xl text-gold-light">${total.toFixed(2)}</span>
            </div>
            <p className="fine-print text-paper/50 mt-1">Total may increase during checkout. Totals often do. Totals have dreams.</p>

            <div className="flex mt-3">
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code (try PLEASE)" className="flex-1 bg-white/10 border border-gold/40 rounded-l px-3 py-2 text-sm placeholder:text-paper/30 focus:outline-none min-w-0" />
              <button onClick={applyPromo} className="bg-gold text-hubris font-bold px-4 rounded-r text-sm shrink-0">APPLY</button>
            </div>

            <Link to="/checkout" onClick={() => bumpHubris(5)} className="mt-3 w-full bg-alarm hover:brightness-110 text-white font-black py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all">
              <Lock size={16} /> PROCEED TO 14-STEP CHECKOUT
            </Link>
            <p className="fine-print text-paper/50 mt-2 text-center flex items-center justify-center gap-1">
              <CreditCard size={10} /> We accept all cards, especially yours · <TriangleAlert size={10} /> No refunds · Ever
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, warn = false, good = false }: { k: string; v: string; warn?: boolean; good?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className={`text-paper/70 ${warn ? "text-alarm font-bold" : ""}`}>{k}</span>
      <span className={`font-mono font-bold ${good ? "text-mint" : warn ? "text-alarm" : "text-paper"}`}>{v}</span>
    </div>
  );
}
