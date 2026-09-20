import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ScrollText } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { PageHero, SectionShell } from "../components/chrome";

const SECTIONS = [
  { n: "§1. Acceptance", t: "By reading these terms you accept them. By not reading them you also accept them, plus a $2.99 Illiteracy Convenience Fee. There is no third option. Philosophers have checked." },
  { n: "§2. Purchases", t: "All sales are final. 'Final' includes: the price (subject to increase), the fees (subject to fees), and your understanding of what you bought (subject to our understanding). Ownership transfers upon payment; enjoyment transfers never." },
  { n: "§3. Fees", t: "Fees may be added at any time for any reason, including: Spine Hydration, Convenience, Inconvenience, Paper Existence, Font Licensing, Regret Insurance, and Fee Administration (the fee for administering fees). Fees are themselves subject to a 12% Fee Fee." },
  { n: "§4. FunBux™", t: "FunBux™ are loyalty points backed by nothing and redeemable for less. They expire when we say so (now, usually). They are not currency, securities, or fun. They are, however, bucks in spirit, and spirit is legally binding." },
  { n: "§4.2 Frequently Required Together", t: "Six (6) items are added to every order, pre-checked: Shelf Presence Assurance™ ($24.00, renewing annually at $34), All-Pages Access Pass ($41.00), Footnote Expansion Pack ($18.50), Author Acknowledgment Fee ($12.00), Second Reading License ($59.00), and Single-Lend Entitlement ($88.00). A minimum of two (2) must remain checked in order to proceed. Declining an item incurs a Decline Fee; declining all six incurs six Decline Fees and our disappointment, which is not billable but is remembered." },
  { n: "§5. Subscriptions", t: "Subscriptions renew automatically, including after cancellation (cancellation cancels the subscription but not the renewals). To cancel, see FAQ: 'Can I cancel my subscription?' Then see a therapist. Then remain subscribed." },
  { n: "§6. Privacy", t: "We collect: your data, your metadata, your vibe, and your mother's maiden name (for fun). We share data with our 47 parent companies, one Greg (now software), one rabbit (personally), and anyone who asks nicely with a purchase order. Our privacy policy is that we have your data. That's the policy." },
  { n: "§7. Cookies", t: "We use 11,722 cookies across 12 categories, including Biometric Enthusiasm Detection, Predictive Regret Modeling, Grief Monetization, Subconscious Retargeting (Dream Ads), Organ Donor Adjacency, Inferred Household (children, pets, tenants), and Munnytown's Personal Sniffing Cookies. Accepting requires one click and grants us everything, in perpetuity, hereditarily, universe-wide. Rejecting requires seven (7) clicks while the button dodges, plus a $49.99 Opt-Out Processing Fee, plus per-category opt-out fees of $12–$999. The banner is shown once and then remembered, because consent, once given, is not a thing we lose track of." },
  { n: "§7.1 The Browsing Fee", t: "The meter starts on page load and is scroll-metered: each qualifying scroll event adds between $100 and $400, multiplied by an escalation factor that increases with continued use, to a maximum of ×12. A time drip of $1.99 per minute applies while you are not scrolling, so that idleness is also productive. The fee does not decrease. It has never decreased. It is not configured to decrease. Reading this section has cost you approximately $1,200." },
  { n: "§8. Reviews", t: "Reviews of 5 stars publish instantly. Reviews of 4 stars enter moderation. Reviews of 3 or fewer stars enter the Void, along with the reviewer (from our mailing list — actually no, you stay on the mailing list forever)." },
  { n: "§9. Intellectual Property", t: "All content is ours, including your reviews, your wishlist (public, monetized), and any ideas you have while browsing (Browsing Idea Assignment Clause). You retain the right to keep reading. You're welcome." },
  { n: "§10. Trademarks We Use Without Permission", t: "Litwin Books and Library Juice Press are registered trademarks of people who actually love libraries, used here without permission for parody. Please don't sue; we spent all the money on popups, pop-ups, and a rabbit. We own: the word 'radical' in 43 territories (Class 16, Class 41), 'Critical Librarianship™' (Patent No. US2010248329B2 — Do Not Question), 'FunBux™', 'TrustSeal™', 'ALA-Adjacent™', 'Shelf Presence Assurance™', and — as of August 2026 — Tuesday." },
  { n: "§10.1 Newsroom", t: "The Synergy Wire is our newsroom. Reading it costs $0.02 per page, searching it costs $0.11 per query, and quoting it requires the Syndication License ($1,450/yr, per territory). Corrections are published in full and charged in full. Comments are disabled; commenting is a product at $4.99 per comment." },
  { n: "§11. Disputes", t: "All disputes will be resolved via binding arbitration, conducted by Hubris Legal, in Dayton, on the schedule of Hubris Munnytown, Chief Executive Rabbit (naps 4 hours daily). You waive the right to: class actions, jury trials, small claims, large claims, and complaining (complaining costs $25)." },
  { n: "§12. Amendments", t: "We may amend these terms at any time without notice. Amendments apply retroactively, including to purchases made before the amendment and before your birth. Current version: 4,812. You agreed to all of them." },
  { n: "§13.3 Soul Clause", t: "Per §13.3, by completing any purchase you grant Hubris Books & Bookstore™ LLC (A Subsidiary of Hubris & Hubris & Hubris Holdings) a non-exclusive, perpetual, universe-wide license to your immortal soul for marketing purposes. Your soul may appear in testimonials. Opt-out requires a quest." },
  { n: "§14. Severability & Mercy", t: "If any clause is found unenforceable, it will be replaced with a stricter clause. Mercy may be requested via form 88-B ($25 filing fee). Form 88-B does not exist. The fee, however, is very real." },
];

export default function Terms() {
  const { pushToast, bumpHubris } = useShop();
  const [read, setRead] = useState<Record<string, boolean>>({});
  const [accepted, setAccepted] = useState(false);

  const toggle = (n: string) => setRead({ ...read, [n]: !read[n] });
  const readCount = Object.values(read).filter(Boolean).length;

  const accept = () => {
    if (readCount < SECTIONS.length) {
      pushToast({ kind: "warning", title: `Only ${readCount}/${SECTIONS.length} sections acknowledged`, body: "You must check every section. Skimming is a violation (§12). The rabbit can tell when you skim; he has an exceptional nose." });
      return;
    }
    setAccepted(true);
    bumpHubris(20);
    pushToast({ kind: "info", title: "Terms accepted!", body: "Your acceptance has been recorded, notarized, and monetized. Welcome to the family (legally binding family)." });
  };

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker="Terms of Servitude · v4,812 · last updated: just now · approved by one rabbit"
        title={<>The Fine Print, <span className="italic text-gold-light">Enlarged Slightly</span></>}
        sub={`Please read all ${SECTIONS.length} sections carefully. Quizzes are random. Compliance is mandatory. Skimming is a violation (§12). The Browsing Fee runs while you read.`}
      >
        <div className="mt-4 font-mono text-sm bg-black/30 inline-block px-4 py-2 rounded-lg border border-gold/40">
          Acknowledged: <strong className="text-gold-light">{readCount}/{SECTIONS.length}</strong> sections
        </div>
      </PageHero>

      <SectionShell>
        <div className="max-w-3xl mx-auto space-y-3">
          {SECTIONS.map((s) => (
            <div key={s.n} className={`bg-white border-2 rounded-lg p-5 transition-colors ${read[s.n] ? "border-mint" : "border-hubris/25"}`}>
              <div className="flex items-start gap-3">
                <button onClick={() => toggle(s.n)} className={`mt-0.5 w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 ${read[s.n] ? "bg-mint border-mint text-white" : "border-hubris/40 hover:border-hubris"}`}>
                  {read[s.n] && <Check size={14} />}
                </button>
                <div>
                  <h3 className="font-serif font-black text-lg">{s.n}</h3>
                  <p className="text-sm text-ink/75 leading-relaxed mt-1">{s.t}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-hubris text-paper rounded-xl p-6 border-4 border-gold text-center">
            <ScrollText size={32} className="mx-auto text-gold" />
            <h3 className="font-serif font-black text-2xl mt-2">{accepted ? "You Are Bound. Beautiful." : "Accept Your Binding"}</h3>
            <p className="text-sm text-paper/60 mt-1">Clicking accept binds you, your heirs, and anyone who has ever used your WiFi.</p>
            {!accepted ? (
              <button onClick={accept} className="mt-4 bg-gold text-hubris font-black px-8 py-3 rounded-lg hover:bg-gold-light">
                I HAVE READ EVERYTHING ({readCount}/{SECTIONS.length})
              </button>
            ) : (
              <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/catalog" className="bg-gold text-hubris font-bold px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2">SHOP, COMPLIANT ONE <ArrowRight size={15} /></Link>
                <Link to="/faq" className="border-2 border-gold text-gold-light font-bold px-6 py-3 rounded-lg">ASK GREG THINGS (HE'S A CHATBOT NOW)</Link>
              </div>
            )}
          </div>
          <p className="fine-print text-ink/40 text-center">This page is a parody. Real publishers (like the beloved indie this lovingly ribs) have humane terms. Ours are binding in spirit only.</p>
        </div>
      </SectionShell>
    </div>
  );
}
