import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, MessageCircle, Phone, Search } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { Kicker, PageHero, SectionShell } from "../components/chrome";

const FAQS = [
  { q: "What is your return policy?", a: "Great question! Our return policy is a 4-page PDF that, when printed, reads: 'No.' In full: all sales are final, all fees are final, and all feelings about finality are valid but non-refundable. You may, however, purchase Return Insurance ($24.99) which covers returns that we still won't accept, but with sympathy." },
  { q: "Why was I charged a Browsing Fee?", a: "Because you browsed. Our site charges $1.99/minute for the privilege of looking at products, a practice we pioneered and the FTC called 'a choice.' The meter starts on page load and stops never — it follows you via our app, our emails, and Greg's memory." },
  { q: "What is Vanilla Compliance?", a: "Our signature milkshake and only flavor. It tastes like a late fee because it contains one (metaphorically; legally it's vanilla-adjacent). Ingredients: milk, compliance, ice, and a proprietary blend of 11 fees and spices." },
  { q: "How do FunBux™ work?", a: "You earn 10 FunBux™ per dollar spent. FunBux™ may be redeemed for: nothing. The exchange rate is ∞:0 (infinite FunBux™ to zero dollars). They are, however, bucks in spirit — and spirit, like our margins, is boundless." },
  { q: "Can I cancel my subscription?", a: "Absolutely! Cancellation is easy: simply (1) write a notarized letter, (2) complete a 40-minute retention call with Greg, (3) embark on a brief quest (fetch the Amulet of Churn from our warehouse), and (4) wait 6–8 eternities for processing. Most customers find it easier to simply remain subscribed forever." },
  { q: "Who is Greg?", a: "Greg is our CEO, CFO, CTO, café manager, general counsel, account manager, and (as of your loyalty tier) possibly you. There are 4 Gregs in leadership and 200+ Gregs in staffing. If you hear the name Greg whispered in our hold music, that is intentional and billed as 'ambient branding' ($0.99/call)." },
  { q: "Why does the ebook cost more than the hardcover?", a: "Because the ebook has no printing costs, which means higher margins, which means it's premium. Premium costs more. This is economics. The hardcover, meanwhile, is heavy, and heaviness is a feature ($4.99 Heft Fee applies)." },
  { q: "Is this site a parody?", a: "This site is a fully serious e-commerce experience operated by Hubris Books, LLC, LLC. Any resemblance to critique, satire, or jokes is coincidental and, per our Terms of Servitude §13.3 (Soul Clause), monetizable." },
  { q: "How do I contact support?", a: "Support is a concept, not a department. You may: email no-refunds@hubrisbooks.example (auto-replies with upsells), call 1-800-BUY-BOOK (hold music is a cash register; average wait: 6–8 eternities), or visit Greg in person (appointment fee: $25, Greg is busy)." },
  { q: "Why do prices keep changing?", a: "Dynamic pricing! Our SurgePrice Labs engine adjusts prices every 30 seconds based on demand, weather, moon phase, and how badly you seem to want it. Pro tip: wanting it less lowers prices. But you can't — the books are that good. The algorithm knows. The algorithm always knows." },
];

const CHAT_SCRIPT: { from: "greg" | "you"; text: string }[] = [
  { from: "greg", text: "Hi! I'm Greg 🤝 (one of 200+ Gregs). How can I upsell you today?" },
];

const GREG_REPLIES = [
  "Great question! Have you considered our Deluxe Slipcase ($34.99)?",
  "I understand your frustration. That'll be $4.99 (empathy fee). How else can I help?",
  "Let me check on that for you... [Greg has left the chat and returned as a different Greg] Hi, I'm Greg! How can I help?",
  "Our records show you agreed to this. All of this. Forever. Is there anything else?",
  "I'd love to process that return! Our return portal is currently... let me check... it's a JPEG of a portal. So close!",
  "Have you tried turning your expectations off and on again?",
  "Escalating to my manager now... [You are now chatting with Greg II] Hi, I'm Greg's manager, Greg.",
];

export default function FAQ() {
  const { pushToast } = useShop();
  const [open, setOpen] = useState<number | null>(0);
  const [q, setQ] = useState("");
  const [chat, setChat] = useState(CHAT_SCRIPT);
  const [msg, setMsg] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const filtered = FAQS.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q.toLowerCase()));

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    const reply = GREG_REPLIES[Math.floor(Math.random() * GREG_REPLIES.length)];
    setChat([...chat, { from: "you", text: msg }, { from: "greg", text: reply }]);
    setMsg("");
  };

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="Help center (lol) · support is a concept, not a department"
        title={<>Questions? <span className="italic text-gold-light">We Have Answers ($4.99 each).</span></>}
        sub="Browse our self-serve help center. Every article ends with an upsell. Every upsell ends with Greg."
      >
        <div className="mt-5 flex items-center gap-2 max-w-md bg-white rounded-lg px-3 py-2.5 border-2 border-gold">
          <Search size={16} className="text-hubris/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search help articles (searches billed $0.11)…" className="bg-transparent w-full text-sm text-ink focus:outline-none placeholder:text-ink/40" />
        </div>
      </PageHero>

      <SectionShell>
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div>
            <Kicker>{filtered.length} articles · all helpful, none refundable</Kicker>
            <div className="space-y-3 mt-4">
              {filtered.map((f, i) => (
                <div key={f.q} className="bg-white border-2 border-hubris rounded-lg overflow-hidden">
                  <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-5 py-4 font-bold text-left flex items-center justify-between gap-3 hover:bg-parchment/50">
                    <span>{f.q}</span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-ink/80 border-t border-dashed border-hubris/20 pt-4">
                      {f.a}
                      <div className="mt-3 font-mono text-[11px] text-ink/50 flex items-center gap-2 flex-wrap">
                        Was this helpful?
                        <button onClick={() => pushToast({ kind: "info", title: "Thanks for your feedback!", body: "Your 'yes' has been recorded. The 'no' button is decorative." })} className="border border-hubris/30 rounded px-2 py-0.5 hover:border-mint">Yes</button>
                        <button onClick={() => pushToast({ kind: "warning", title: "Feedback rejected", body: "'No' is not a recognized response. Your feedback has been upgraded to 'Yes'." })} className="border border-hubris/30 rounded px-2 py-0.5 opacity-50">No</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="bg-white border-2 border-dashed border-alarm rounded-lg p-8 text-center">
                  <div className="font-serif font-black text-xl">No articles match "{q}"</div>
                  <p className="text-sm text-ink/60 mt-1">Your question has been forwarded to Greg, who will answer it with a question about slipcases.</p>
                </div>
              )}
            </div>
          </div>

          {/* contact card + chat */}
          <div className="lg:sticky lg:top-40 space-y-4">
            <div className="bg-hubris text-paper rounded-xl p-5 border-4 border-gold">
              <h3 className="font-serif font-black text-xl flex items-center gap-2"><Phone size={18} className="text-gold" /> Still stuck? Contact Greg</h3>
              <ul className="mt-3 space-y-2 text-sm font-mono">
                <li>☎ 1-800-BUY-BOOK <span className="text-paper/50">(wait: 6–8 eternities)</span></li>
                <li>✉ no-refunds@hubrisbooks.example <span className="text-paper/50">(auto-replies upsells)</span></li>
                <li>📍 Hubris Tower, Suite 666 <span className="text-paper/50">($25 visit fee)</span></li>
              </ul>
              <button onClick={() => setChatOpen(!chatOpen)} className="mt-4 w-full bg-gold text-hubris font-bold py-2.5 rounded-lg flex items-center justify-center gap-2">
                <MessageCircle size={16} /> {chatOpen ? "CLOSE LIVE CHAT" : "OPEN LIVE CHAT WITH GREG"}
              </button>
              <p className="fine-print text-paper/50 mt-2">Average response time: 4 seconds. Average resolution time: never.</p>
            </div>

            {chatOpen && (
              <div className="bg-white border-2 border-hubris rounded-xl overflow-hidden">
                <div className="bg-mint text-white px-4 py-2.5 font-bold text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-blink-hard" /> Greg is online (always)
                </div>
                <div className="h-64 overflow-y-auto p-3 space-y-2 scrollbar-thin bg-parchment/50">
                  {chat.map((m, i) => (
                    <div key={i} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.from === "greg" ? "bg-white border border-hubris/20" : "bg-hubris text-white ml-auto"}`}>
                      {m.from === "greg" && <span className="font-mono text-[10px] text-mint font-bold block">GREG ✓✓</span>}
                      {m.text}
                    </div>
                  ))}
                </div>
                <form onSubmit={send} className="flex border-t-2 border-hubris/20">
                  <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ask Greg anything ($0.99/msg)" className="flex-1 px-3 py-2.5 text-sm focus:outline-none" />
                  <button className="bg-hubris text-white font-bold px-4 text-sm">SEND</button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/terms" className="inline-flex items-center gap-2 text-hubris font-bold hover:text-alarm text-sm">
            For binding answers, see the Terms of Servitude <ArrowRight size={14} />
          </Link>
        </div>
      </SectionShell>
    </div>
  );
}
