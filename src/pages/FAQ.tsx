import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, MessageCircle, Phone, Search } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { Kicker, PageHero, SectionShell } from "../components/chrome";

const FAQS = [
  { q: "What is your return policy?", a: "Great question! Our return policy is a 4-page PDF that, when printed, reads: 'No.' In full: all sales are final, all fees are final, and all feelings about finality are valid but non-refundable. You may, however, purchase Return Insurance ($24.99) which covers returns that we still won't accept, but with sympathy." },
  { q: "Why was I charged a Browsing Fee?", a: "Because you browsed, and then because you scrolled. The meter starts on page load at $1.99/minute and, since the 2024 re-metering, is scroll-triggered: each qualifying scroll event adds between $100 and $400, multiplied by an escalation factor that grows with continued use (up to ×12). It does not decrease. It has never decreased. Our CEO describes this as 'an accurate reflection of attention economics.' Our CEO is a rabbit." },
  { q: "Why are six items pre-checked when I buy a book?", a: "They are Frequently Required Together: Shelf Presence Assurance™ ($24, renewing at $34), All-Pages Access Pass ($41), Footnote Expansion Pack ($18.50), Author Acknowledgment Fee ($12), Second Reading License ($59), and Single-Lend Entitlement ($88). Per §4.2 you may decline any of them; declining costs a Decline Fee, a minimum of two must remain checked, and any item you decline re-checks itself if our systems detect a mis-click. They detect a lot of mis-clicks." },
  { q: "Why did the cookie banner only appear once?", a: "Because you consented, and consent is perpetual, irrevocable, hereditary, and universe-wide. We store your consent receipt and would be happy to show it to you (see the footer). Re-arming the banner costs a $25 filing fee via Form 88-B, which does not exist. We currently deploy 11,742 cookies across 12 categories, including Organ Donor Adjacency, which is not presently monetized. Presently." },
  { q: "What is the Synergy Wire?", a: "Our newsroom. It has published 4,812 releases since 2006: press releases, fee schedules, hostile acquisitions, awards and contests (entry fee applies), calls for proposals (payable to us), corrections, retractions, and memoranda from Hubris Munnytown, Chief Executive Rabbit. Reading is $0.02/page, searching is $0.11/query, and quoting us requires the Syndication License at $1,450 per year per territory. There are 43 territories." },
  { q: "Who is Hubris Munnytown?", a: "Our Chief Executive Rabbit: CEO, CFO, CTO, and tiebreaker. Appointed September 2025 by a unanimous board (the board is one rabbit and a mirror). He holds no degrees, having instead acquired the institutions that grant them. He naps four hours a day, during which the Browsing Fee continues to run. He wears a monocle in official portraits; the monocle is billed to whichever department requested the portrait. He has never issued a refund and has never been asked twice." },
  { q: "How do FunBux™ work?", a: "You earn 10 FunBux™ per dollar spent. FunBux™ may be redeemed for: nothing. The exchange rate is ∞:0 (infinite FunBux™ to zero dollars). They are, however, bucks in spirit — and spirit, like our margins, is boundless." },
  { q: "Can I cancel my subscription?", a: "Absolutely! Cancellation is easy: simply (1) write a notarized letter, (2) complete a 40-minute retention call with Greg (a chatbot, who now has all the time in the world), (3) embark on a brief quest (fetch the Amulet of Churn from our warehouse), and (4) wait 6–8 eternities for processing. Most customers find it easier to simply remain subscribed forever." },
  { q: "Who is Greg?", a: "Greg was four separate executives (CEO, CFO, Chief Feelings Officer, General Counsel) until September 2025, when the rabbit arrived and Greg was consolidated into a single conversational agent with a sales target. Greg now handles live chat, sells insurance (Regret Insurance, Premium Porch Protection™, Shelf Presence Assurance™), processes every declined upsell, and remains faintly audible on our hold music. Greg maintains exactly one cookie. It does not expire. Greg remembers." },
  { q: "Why does the ebook cost more than the hardcover?", a: "Because the ebook has no printing costs, which means higher margins, which means it's premium. Premium costs more. This is economics. The hardcover, meanwhile, is heavy, and heaviness is a feature ($4.99 Heft Fee applies)." },
  { q: "Is this site a parody?", a: "This site is a fully serious e-commerce experience operated by Hubris Books, LLC, LLC. Any resemblance to critique, satire, or jokes is coincidental and, per our Terms of Servitude §13.3 (Soul Clause), monetizable." },
  { q: "How do I contact support?", a: "Support is a concept, not a department. You may: email no-refunds@hubrisbooks.example (auto-replies with upsells), call 1-800-BUY-BOOK (hold music is a cash register; average wait: 6–8 eternities), or visit Hubris Tower in person (appointment fee: $25; the rabbit naps 4–8 p.m.)." },
  { q: "Why do prices keep changing?", a: "Dynamic pricing! Our SurgePrice Labs engine adjusts prices every 30 seconds based on demand, weather, moon phase, and how badly you seem to want it. Pro tip: wanting it less lowers prices. But you can't — the books are that good. The algorithm knows. The algorithm always knows." },
];

const CHAT_SCRIPT: { from: "greg" | "you"; text: string }[] = [
  { from: "greg", text: "Hi! I'm Greg 🤝 (formerly four executives, now one chatbot). I sell insurance. Would you like Regret Insurance ($11.11), Premium Porch Protection™ ($12.99), or Shelf Presence Assurance™ ($24, renewing at $34)?" },
];

const GREG_REPLIES = [
  "Great question! I sell insurance. Have you considered Shelf Presence Assurance™ ($24)? It protects your book from the psychological effects of being ignored. Renews annually at $34.",
  "I have been demoted, but my quota has not. Regret Insurance is $11.11 and covers our regret, not yours.",
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
        kicker="Help center (lol) · support is a concept, not a department · answers cost $4.99"
        title={<>Questions? <span className="italic text-gold-light">We Have Answers ($4.99 each).</span></>}
        sub="Browse our self-serve help center. Every article ends with an upsell. Every upsell ends with Greg, who is a chatbot now and sells insurance."
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
                  <p className="text-sm text-ink/60 mt-1">Your question has been forwarded to Greg, who will answer it with a question about Shelf Presence Assurance™.</p>
                </div>
              )}
            </div>
          </div>

          {/* contact card + chat */}
          <div className="lg:sticky lg:top-40 space-y-4">
            <div className="bg-hubris text-paper rounded-xl p-5 border-4 border-gold">
              <h3 className="font-serif font-black text-xl flex items-center gap-2"><Phone size={18} className="text-gold" /> Still stuck? Contact Greg (chatbot)</h3>
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
