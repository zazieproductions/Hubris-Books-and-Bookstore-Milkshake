import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, MessageCircle, Phone, Search } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { Kicker, PageHero, SectionShell } from "../components/chrome";

import { FAQS } from "../data/faq";

const CHAT_SCRIPT: { from: "hops" | "you"; text: string }[] = [
  { from: "hops", text: "Hi! I'm Hops 🤝 (one of 400+ Hutch support bots). How can I upsell you today?" },
];

const HOPS_REPLIES = [
  "Great question! Have you considered our Deluxe Slipcase ($94.99)?",
  "I understand your frustration. That'll be $4.99 (empathy fee). How else can I help?",
  "Let me check on that for you... [Hops has left the chat and returned as a different Hops] Hi, I'm Hops! How can I help?",
  "Our records show you agreed to this. All of this. Forever. Is there anything else?",
  "I'd love to process that return! Our return portal is currently... let me check... it's a JPEG of a portal. So close!",
  "Have you tried turning your expectations off and on again?",
  "Your account has been flagged for asking questions. Flagging is free; unflagging is $19.99. Would you like to unflag? (That's another question.)",
  "Escalating to my manager now... [You are now chatting with Hops Prime] Hi, I'm Hops' manager, Hops.",
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
    const reply = HOPS_REPLIES[Math.floor(Math.random() * HOPS_REPLIES.length)];
    setChat([...chat, { from: "you", text: msg }, { from: "hops", text: reply }]);
    setMsg("");
  };

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="Help center (lol) · support is a concept, not a department"
        title={<>Questions? <span className="italic text-gold-light">We Have Answers ($9.99 each).</span></>}
        sub="Browse our self-serve help center. Every article ends with an upsell. Every upsell ends with Hops."
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
                  <p className="text-sm text-ink/60 mt-1">Your question has been forwarded to Hops, who will answer it with a question about slipcases.</p>
                </div>
              )}
            </div>
          </div>

          {/* contact card + chat */}
          <div className="lg:sticky lg:top-40 space-y-4">
            <div className="bg-hubris text-paper rounded-xl p-5 border-4 border-gold">
              <h3 className="font-serif font-black text-xl flex items-center gap-2"><Phone size={18} className="text-gold" /> Still stuck? Contact the Hutch</h3>
              <ul className="mt-3 space-y-2 text-sm font-mono">
                <li>☎ 1-800-BUY-BOOK <span className="text-paper/50">(wait: 6–8 eternities)</span></li>
                <li>✉ no-refunds@hubrisbooks.example <span className="text-paper/50">(auto-replies upsells)</span></li>
                <li>📍 Hubris Tower, Suite 666 <span className="text-paper/50">($25 visit fee)</span></li>
              </ul>
              <button onClick={() => setChatOpen(!chatOpen)} className="mt-4 w-full bg-gold text-hubris font-bold py-2.5 rounded-lg flex items-center justify-center gap-2">
                <MessageCircle size={16} /> {chatOpen ? "CLOSE LIVE CHAT" : "OPEN LIVE CHAT WITH HOPS"}
              </button>
              <p className="fine-print text-paper/50 mt-2">Average response time: 4 seconds. Average resolution time: never.</p>
            </div>

            {chatOpen && (
              <div className="bg-white border-2 border-hubris rounded-xl overflow-hidden">
                <div className="bg-mint text-white px-4 py-2.5 font-bold text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-blink-hard" /> Hops is online (always)
                </div>
                <div className="h-64 overflow-y-auto p-3 space-y-2 scrollbar-thin bg-parchment/50">
                  {chat.map((m, i) => (
                    <div key={i} className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.from === "hops" ? "bg-white border border-hubris/20" : "bg-hubris text-white ml-auto"}`}>
                      {m.from === "hops" && <span className="font-mono text-[10px] text-mint font-bold block">HOPS ✓✓</span>}
                      {m.text}
                    </div>
                  ))}
                </div>
                <form onSubmit={send} className="flex border-t-2 border-hubris/20">
                  <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ask Hops anything ($0.99/msg)" className="flex-1 px-3 py-2.5 text-sm focus:outline-none" />
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
