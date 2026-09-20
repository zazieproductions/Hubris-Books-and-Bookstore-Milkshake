import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ScrollText, Rabbit } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { PageHero, SectionShell } from "../components/chrome";

const SECTIONS = [
  { n: "§1. Acceptance (and Bunny Acceptance)", t: "By reading these terms you accept them. By not reading them you also accept them, plus a $2.99 Illiteracy Convenience Fee + $4.99 Bunny Ignorance Fee. By scrolling to read them you accept the Scroll Fee ($89–$495 per scroll). There is no third option. Philosophers have checked. Bunny has SEO'd philosophy." },
  { n: "§2. Purchases & Required Together™", t: "All sales are final and require 6 additional fees: Shelf Presence Assurance™ ($24), All-Pages Access Pass ($41), Footnote Expansion Pack ($18.50), Author Acknowledgment Fee ($12), Second Reading License ($59), Single-Lend Entitlement ($88). Total required: $242.50, pre-checked. Unchecking adds $7.77 per item + bunny disappointment. Ownership transfers upon payment; enjoyment transfers never; pages 200+ require All-Pages Pass." },
  { n: "§3. Fees (Including Scroll Fees)", t: "Fees may be added at any time for any reason, including: Spine Hydration ($14.95), Convenience ($8.50), Paper Existence ($4.99), Browsing Fee Time ($1.99/min), Browsing Fee Scroll ($89–$495 per scroll, $2.30/pixel/sec), Scroll Velocity Surcharge, Hesitation Analysis ($7.77), Font Licensing ($3.75), Regret Insurance ($11.11), and Fee Administration (fee for administering fees). Fees are subject to 12% Fee Fee + Bunny Fee ($4.99). Browsing this terms page: $127 per scroll." },
  { n: "§4. FunBux™ & BunnyBucks™", t: "FunBux™ are loyalty points backed by nothing and redeemable for less. BunnyBucks™ are carrots. Both expire when we say so (now, usually). Exchange rate: ∞ FunBux™ = $0. 1 BunnyBuck™ = 1 carrot = $4.99 + browsing fee. FunBux™ are not currency, securities, or fun. They are bucks in spirit, and spirit is legally binding and bunny-owned." },
  { n: "§5. Subscriptions & Bunny Subscriptions", t: "Subscriptions renew automatically, including after cancellation (cancellation cancels the subscription but not the renewals or bunny's carrot subscription). To cancel, see FAQ: 'Can I cancel?' Then see therapist. Then see bunny. Then remain subscribed. Bunny subscriptions auto-renew forever and include carrot delivery ($4.99/mo) + judgment." },
  { n: "§6. Privacy (We Have Your Data, Bunny Has Your Soul)", t: "We collect: your data, metadata, vibe, scroll velocity, hesitation, sighs, and mother's maiden name (for fun + bunny SEO). We share data with 47 parent companies, 200+ Gregs, and one smug bunny named Hubris Munnytown who SEO's your name into our sitemap. Our privacy policy is that we have your data; bunny has your soul. That's the policy. Policy costs $3.75 to read (Font Licensing)." },
  { n: "§7. Cookies, Trackers & Soul-Sniffers (4,291)", t: "We use 4,291 cookies, trackers, and soul-sniffers: Essential (everything including will), Biometric Sigh Analysis™, Retinal Invoice Tracking, Scroll Velocity & Regret Mapping, Dream Retargeting (you dreamt about us), Soul Resonance SR-88, Hubris Munnytown's Carrot-Based Judgment. Rejecting requires 7 clicks while button dodges and bunny judges. Accepting requires 1 click and grants universe-wide license to your browsing, scrolling, thinking, and thinking about scrolling. Bunny gets carrots." },
  { n: "§8. Reviews (Bunny-Moderated)", t: "Reviews of 5 stars publish instantly and earn bunny approval. Reviews of 4 stars enter moderation (moderated by bunny, who is smug). Reviews of 3 or fewer stars enter Void, along with reviewer (from mailing list — actually no, you stay on mailing list forever, bunny ensures it). Reviews mentioning 'overpriced' cost $4.99 to submit. Reviews mentioning 'bunny' cost $12.99 (bunny licensing)." },
  { n: "§9. Intellectual Property (Patent No. US2010248329B2)", t: "All content is ours, including your reviews, wishlist (public, monetized, bunny-SEO'd), and any ideas you have while browsing (Browsing Idea Assignment Clause). We trademarked 'Critical Librarianship™,' 'Radical™,' 'Open Access™,' and thinking critically about us (royalties due upon thinking: $49.99/thought). You retain right to keep reading and paying browsing fee. You're welcome. Bunny retains right to SEO your thoughts." },
  { n: "§10. The Milkshake (Legacy Clause) & The Bunny", t: "Vanilla Compliance contained no vanilla. 'Compliance' was flavor developed in-house (notes of late fee, whipped accountability). Outside beverages were confiscated and resold. Clause deprecated. Now: Hubris Munnytown™ contains 100% bunny, 0% compliance, 100% smug. Bunny contains carrots. Carrots cost $4.99 + browsing fee. Bunny is now CEO. Greg sits on floor. Floor has sitting fee." },
  { n: "§11. Disputes (Greg + Bunny Arbitration)", t: "All disputes resolved via binding arbitration, conducted by Greg and Hubris Munnytown, in Dayton, in bunny's burrow, on Greg's schedule (busy) and bunny's carrot schedule (always). You waive right to: class actions, jury trials, small claims, large claims, complaining (complaining costs $25 + $7.77 bunny fee). Bunny's decision is final and smug." },
  { n: "§12. Amendments & Scroll Amendments", t: "We may amend these terms at any time without notice, including while you scroll (scroll triggers amendment). Amendments apply retroactively, including to purchases made before amendment and before your birth and before bunny's birth. Current version: 4,812 + scroll count. You agreed to all of them by scrolling here ($127). Bunny agreed for you." },
  { n: "§13.3 Soul Clause & Bunny Soul Clause §13.3(b)", t: "Per §13.3, by completing any purchase you grant Hubris Books, LLC, LLC and Hubris Munnytown a non-exclusive, perpetual, universe-wide license to your immortal soul for marketing and SEO purposes. Your soul may appear in testimonials, title tags, and bunny's carrot reviews. Opt-out requires quest + $299 + carrots. Per §13.3(b), bunny owns 30% of your soul and 100% of your metadata. Bunny is smug about it." },
  { n: "§14. Severability, Mercy & Bunny Mercy", t: "If any clause found unenforceable, replaced with stricter clause + bunny clause. Mercy may be requested via form 88-B ($25 filing fee + $7.77 bunny fee). Form 88-B does not exist. Fee is very real. Bunny mercy may be requested via carrots (carrots do not guarantee mercy, only judgment). Bunny mercy costs $4.99 + browsing fee." },
  { n: "© 2026 Hubris Books & Bookstore™ LLC", t: "© 2026 Hubris Books & Bookstore™ LLC (A Subsidiary of Hubris & Hubris & Hubris Holdings). All rights reserved, including rights you didn't know you had — those are ours now too, per Patent No. US2010248329B2. Browsing this copyright notice: $89 per scroll. Bunny owns the © symbol now." },
];

export default function Terms() {
  const { pushToast, bumpHubris, browsingFee } = useShop();
  const [read, setRead] = useState<Record<string, boolean>>({});
  const [accepted, setAccepted] = useState(false);

  const toggle = (n: string) => setRead({ ...read, [n]: !read[n] });
  const readCount = Object.values(read).filter(Boolean).length;

  const accept = () => {
    if (readCount < SECTIONS.length) {
      pushToast({ kind: "warning", title: `Only ${readCount}/${SECTIONS.length} sections acknowledged`, body: `You must check every section. Skimming is a violation (§12). Greg can tell when you skim. Bunny can SEO when you skim. Browsing fee: $${browsingFee.toFixed(2)}` });
      return;
    }
    setAccepted(true);
    bumpHubris(20);
    pushToast({ kind: "info", title: "Terms accepted! Bunny approves!", body: "Your acceptance has been recorded, notarized, SEO'd by Hubris Munnytown, and monetized. Welcome to the family (legally binding family, bunny is your cousin now). Browsing fee final: $" + browsingFee.toFixed(2) });
  };

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker={`Terms of Servitude · v4,812 + ${browsingFee.toFixed(0)} scrolls · last updated: just now (you scrolled, so updated again)`}
        title={<>The Fine Print, <span className="italic text-gold-light">Enlarged Slightly (for a fee)</span></>}
        sub={`Please read all ${SECTIONS.length} sections carefully. Quizzes are random. Compliance mandatory. Scrolling adds $89–$495 per scroll to browsing fee. Current fee: $${browsingFee.toFixed(2)}. Bunny is watching you not read.`}
      >
        <div className="mt-4 font-mono text-sm bg-black/30 inline-block px-4 py-2 rounded-lg border border-gold/40">
          Acknowledged: <strong className="text-gold-light">{readCount}/{SECTIONS.length}</strong> sections · Browsing fee: ${browsingFee.toFixed(2)} · Bunny: 🐰 smug
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
                  <h3 className="font-serif font-black text-lg flex items-center gap-2">{s.n} {s.n.includes("Bunny") && <Rabbit size={14} className="text-gold" />}</h3>
                  <p className="text-sm text-ink/75 leading-relaxed mt-1">{s.t}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-hubris text-paper rounded-xl p-6 border-4 border-gold text-center">
            <ScrollText size={32} className="mx-auto text-gold" />
            <h3 className="font-serif font-black text-2xl mt-2 flex items-center justify-center gap-2">{accepted ? "You Are Bound. Bunny Bound. Beautiful." : "Accept Your Binding (Bunny-Approved)"} <span>🐰</span></h3>
            <p className="text-sm text-paper/60 mt-1">Clicking accept binds you, your heirs, anyone who ever used your WiFi, and your browsing fee (${browsingFee.toFixed(2)}) forever.</p>
            {!accepted ? (
              <button onClick={accept} className="mt-4 bg-gold text-hubris font-black px-8 py-3 rounded-lg hover:bg-gold-light">
                I HAVE READ EVERYTHING ({readCount}/{SECTIONS.length}) + BUNNY CLAUSE 🐰
              </button>
            ) : (
              <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/catalog" className="bg-gold text-hubris font-bold px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2">SHOP, COMPLIANT ONE 🐰 <ArrowRight size={15} /></Link>
                <Link to="/faq" className="border-2 border-gold text-gold-light font-bold px-6 py-3 rounded-lg">ASK GREG & BUNNY THINGS</Link>
              </div>
            )}
          </div>
          <p className="fine-print text-ink/40 text-center">This page is a parody. Real publishers (like Litwin Books, the beloved indie this lovingly ribs) have humane terms. Ours are binding in spirit and bunny only. © 2026 Hubris Books & Bookstore™ LLC (A Subsidiary of Hubris & Hubris & Hubris Holdings). Browsing fee: ${browsingFee.toFixed(2)} and climbing because you scrolled to read this disclaimer.</p>
        </div>
      </SectionShell>
    </div>
  );
}
