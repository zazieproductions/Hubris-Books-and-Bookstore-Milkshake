import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Newspaper, Rabbit, Search, Tag, Trophy, Users, Megaphone } from "lucide-react";
import { PageHero, SectionShell, Kicker } from "../components/chrome";
import { useShop } from "../store/ShopContext";

interface NewsItem {
  date: string;
  year: number;
  title: string;
  category: "Acquisition" | "Award" | "Call for Proposals" | "Book Talk" | "Corporate" | "Bunny Update" | "Fee Announcement";
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
}

const NEWS: NewsItem[] = [
  {
    date: "July 6, 2026",
    year: 2026,
    title: "New Series Editor: Hubris Munnytown (Bunny, SEO, Smug, Carrot-Motivated)",
    category: "Bunny Update",
    excerpt: "We are pleased to announce our new editor for the Series on Critical Race Studies and Monetization in LIS is a bunny. He demanded 30% of metadata and all carrots. We complied. Traffic up 400%.",
    content: "Hubris Books is thrilled to announce that Hubris Munnytown, a smug bunny with a superiority complex and a demonstrated ability to SEO any noun into 'buy now or else,' has been appointed Series Editor for Critical Race Studies and Monetization in LIS. Munnytown, who previously served as Chief SEO Bunny and Carrot Procurement Officer, will oversee acquisitions, rejections (all rejections now include a $299 invoice), and the rewriting of all title tags to include 'buy now or else your browsing fee doubles.' His first act as editor was to trademark the word 'critical' and charge royalties on thinking critically about us. Royalties due upon reading this announcement: $4.99.",
    author: "Greg Hubris, CEO + Bunny Liaison",
    tags: ["bunny", "seo", "critical™", "carrots", "traffic"],
  },
  {
    date: "May 29, 2026",
    year: 2026,
    title: "Call for Proposals: Libraries and Archives in the Anthropocene Capitalism Colloquium II (LAAC II) — Now With Mandatory Sponsorship Tiers",
    category: "Call for Proposals",
    excerpt: "LAAC II, sponsored by Hubris Books, will take place at Hubris Tower. Proposals must include a revenue model. Proposals without a revenue model will be invoiced anyway.",
    content: "The Libraries and Archives in the Anthropocene Capitalism Colloquium II (LAAC II), sponsored by Hubris Books, Hubris Defense Systems, and Hubris Munnytown's Carrot Fund, will take place at Hubris Tower, 1 Monetization Plaza, Dayton OH, March 24-25, 2027. Theme: 'How to monetize the end of the world.' Proposals must include: (1) abstract, (2) revenue model, (3) upsell plan, (4) acknowledgment that Hubris Munnytown will SEO your abstract into 'buy now or else.' Submission fee: $49.99. Acceptance fee: $199. Attendance fee: $499. Non-attendance fee: $299 (we still SEO you). Proposals that mention 'commons' without a privatization plan will be forwarded to legal.",
    author: "Dr. Wellington Gatekeeper & Hubris Munnytown 🐰",
    tags: ["cfp", "anthropocene", "revenue", "tower"],
  },
  {
    date: "January 22, 2026",
    year: 2026,
    title: "Hubris Books Joins SDG Publishers Compact (Then Monetizes It With SDG Compliance Fee™ $14.99)",
    category: "Corporate",
    excerpt: "We signed the compact. Then we introduced the SDG Compliance Fee ($14.99). Sustainable Development Goals are sustainable if you pay for them monthly. Forever.",
    content: "Litwin Books joined the SDG Publishers Compact. Hubris Books joined it harder. We signed the compact, then immediately introduced the SDG Compliance Fee™ ($14.99 per book, $4.99 per page, $0.99 per sustainable thought). The fee sustains our development goals (yacht, carrots). Our 10-point commitment: (1) charge for sustainability, (2) charge for development, (3) charge for goals, (4) trademark 'sustainable,' (5) invoice the UN, (6) make the compact a subscription, (7) auto-renew forever, (8) add bunny, (9) SEO the compact, (10) profit. The UN has not responded. Their silence is consent, per our Terms.",
    author: "Hubris Sustainability Council™ + Bunny",
    tags: ["sdg", "greenwashing", "fee", "compact"],
  },
  {
    date: "December 2, 2025",
    year: 2025,
    title: "Kailyn Slater Wins the 2025 Annual Hubris Paper Contest: 'Against AI: Critical Refusal in the Library' — Now Behind Paywall",
    category: "Award",
    excerpt: "Winner announced! Paper is excellent. It is also now behind our glass paywall ($41 All-Pages Pass required to read pages 2+). Congratulations!",
    content: "Hubris Books is excited to announce Kailyn Slater as winner of the 2025 Annual Hubris Paper Contest. Her paper, 'Against AI: Critical Refusal in the Library,' is a searing critique of AI in libraries. We loved it so much we put it behind a paywall. You can read the title for free! The abstract is $4.99. The full paper is $41 (All-Pages Access Pass) + $18.50 (Footnote Expansion Pack, because footnotes are performance). Kailyn receives: (1) $50 prize (paid in FunBux™, spirit bucks), (2) exposure (we retain everything else, in perpetuity), (3) a mandatory author-copy invoice ($499). The paper will be published in our journal, which costs $499/yr to access, unless you are the author, in which case it costs $599.",
    author: "Rory Litwin (but monetized)",
    tags: ["contest", "ai", "paywall", "winner"],
  },
  {
    date: "October 22, 2025",
    year: 2025,
    title: "Juliana Mestre Wins the 2025 Hubris Award for Ongoing Dissertation Research in the Philosophy of Information (And Ongoing Billing)",
    category: "Award",
    excerpt: "Media contact: Greg Hubris, greg@hubrisbooks.example, and Hubris Munnytown, carrots@hubris.example. Winner gets $100 (minus $299 reception fee).",
    content: "We are pleased to announce Juliana Mestre as winner of the 2025 Hubris Books Award for Ongoing Dissertation Research in the Philosophy of Information. Her dissertation, 'What Does Information Want? (Hint: Not to Be Free),' aligns perfectly with our new series 'Information Wants to Be Leased (4 Volumes, Sold Separately).' Award includes: $100 (paid in FunBux™), a plaque in Hallway C (viewing fee $5), and a mandatory 5-year subscription to Hubris+ ($49.99/mo). The award is ongoing, like the billing. Congratulations, Juliana! Your ongoing research is now our ongoing revenue. Bunny has SEO'd your name.",
    author: "Greg Hubris II, President of Awards",
    tags: ["dissertation", "philosophy", "award", "ongoing"],
  },
  {
    date: "October 10, 2025",
    year: 2025,
    title: "Book Talk: Information, Power, and Reproductive Health (Part 2) — Now With Mandatory Donation",
    category: "Book Talk",
    excerpt: "Free Event! (Free means $0 + $14.95 Spine Hydration + $8.50 Convenience + $4.99 Paper Existence + browsing fee). Register here (registration costs $5).",
    content: "Join editors Gina Schlesselman-Tarango, Renée Ann Rau, and Alanna Aiko Moore, plus Hubris Munnytown (bunny, SEO, smug), as they discuss 'Information, Power, and Reproductive Health.' Free Event, Nov 3, 12pm Eastern, Hubris Tower, Room 666. Free means: $0 entry + $14.95 room fee + $8.50 chair fee + $4.99 air fee + browsing fee (currently $847 and climbing). Registration required ($5). Donation required ($25, guilt-tracked). Q&A: questions cost $4.99 each, answers cost $9.99. Recording available behind All-Pages Pass ($41). Bunny will moderate and SEO your questions into 'buy now.'",
    author: "Sophie (but now monetized) + Bunny",
    tags: ["book talk", "reproductive health", "free*"],
  },
  {
    date: "September 18, 2025",
    year: 2025,
    title: "Book Talk: Educating With Empathy (A Holistic Framework for Teaching the Research Process and Monetizing It)",
    category: "Book Talk",
    excerpt: "Join author Dawn Rogers Stahura and Hubris Munnytown as they discuss empathy, now 12% more compliant and $14.99 more expensive.",
    content: "Free Event Nov 17, 12pm Eastern. Author Dawn Rogers Stahura discusses 'Educating With Empathy: A Holistic Framework for Teaching the Research Process.' Hubris edition adds Chapter 8: 'Empathy as a Conversion Funnel.' Empathy is free! The book about empathy is $165 (plus 6 required upsells, pre-checked). Empathy itself now requires the Empathy License ($12.99). Bunny will provide empathy, but it's smug empathy. Smug empathy costs extra ($4.99). Register: $5. Attend: $10. Feel: $4.99.",
    author: "Sophie + Hubris Munnytown 🐰",
    tags: ["empathy", "education", "funnel"],
  },
  {
    date: "August 29, 2025",
    year: 2025,
    title: "Openness in Practice: New Visions of Collaborative Publishing From The Journal of Critical Digital Librarianship (Now Paywalled, Bunny-Edited)",
    category: "Book Talk",
    excerpt: "Since 2021, editors have attempted to foster community around cultural heritage. Since 2024, Hubris has attempted to monetize that community. Success! Community now costs $49.99/mo.",
    content: "Free Event Oct 22, 2025 1pm Eastern. Since 2021, JCDL has fostered community around cultural heritage digital collections. Since 2024, Hubris Books has fostered revenue around that community. New vision: community as subscription. Collaborative publishing as collaborative billing. Openness in practice means paywall made of glass: you can see the openness, you just can't have it unless you pay $41 All-Pages Pass + $18.50 Footnote Pack + browsing fee. Bunny edited the journal to say 'open access is when you can see the paywall clearly.' SEO up 400%.",
    author: "JCDL Editors + Bunny SEO Dept",
    tags: ["openness", "jcdl", "paywall", "glass"],
  },
  {
    date: "July 19, 2025",
    year: 2025,
    title: "CFP: Human Rights Archives and the Problems of Provenance (And How to Charge for Both)",
    category: "Call for Proposals",
    excerpt: "Special issue of The Journal of Critical Library and Information Studies. Editors: Michelle Caswell and Jess Melvin. And Hubris Munnytown (bunny, provenance of carrots).",
    content: "Human Rights Archives and the Problems of Provenance. Special Issue. Theme: Who owns human rights? Answer: whoever pays Hubris first. Provenance is important. We have provenance on your browsing fee: it started at $47 and is now $847 because you scrolled. That's provenance. Submit proposals: $49.99. If your proposal includes the word 'commons,' add $25 Commons Avoidance Fee. If your proposal includes 'decolonize' without a monetization plan, it will be forwarded to our Big Reconciliation™ division (auto-renews). Bunny will SEO your abstract to include 'buy now.'",
    author: "Michelle Caswell, Jess Melvin, and Bunny",
    tags: ["cfp", "human rights", "provenance", "archives"],
  },
  {
    date: "June 14, 2025",
    year: 2025,
    title: "Book Launch: Platform Power and Libraries — Now With Platform Fee™",
    category: "Book Talk",
    excerpt: "Join us as we celebrate the launch of Platform Power and Libraries. Book editor Christine F. Smith will discuss how platforms have power and how Hubris has more.",
    content: "Free Event Aug 12, 6pm Eastern. Platform Power and Libraries launches. Platforms have power. Hubris has platform fees. New fee: Platform Fee™ ($12.99) — charged because you accessed this book via a platform (any platform, including paper, which is a platform for ink). Book is $175. Platform Fee is $12.99. Bunny Fee is $4.99 (bunny is a platform for carrots). Total: $192.98 + browsing fee $847. Platform power is real. Our power to charge platform fees is realer.",
    author: "Christine F. Smith + Platform Fee Division",
    tags: ["platform", "power", "launch", "fee"],
  },
  {
    date: "March 3, 2025",
    year: 2025,
    title: "Hubris Acquires Litwin Books' Backlist (For Pennies on the Dollar, Then Marks Up 400%)",
    category: "Acquisition",
    excerpt: "In a bold move, Hubris Books acquired 200 titles for $0.04 each (our buyback rate) and repriced them at $189–$499. Synergy!",
    content: "Hubris Books, LLC, LLC, a subsidiary of Hubris & Hubris & Hubris Holdings, today announced acquisition of Litwin Books' backlist. Purchase price: $0.04 per book (our standard buyback rate) + $18 pickup fee per book. New pricing: $189–$499 per book + 6 required upsells ($242.50) + browsing fee ($847 and climbing). The books are now 400% more expensive and 100% more compliant. Authors were notified via invoice (they owe us for the privilege of being acquired). Bunny SEO'd all titles to include 'buy now or else.' Revenue up 400%. Empathy down, per usual.",
    author: "Greg Hubris, Acquisitions Desk + Bunny",
    tags: ["acquisition", "backlist", "buyback", "synergy"],
  },
  {
    date: "November 11, 2024",
    year: 2024,
    title: "Introducing Shelf Presence Assurance™ ($24/yr): Protects Your Book From Feeling Ignored",
    category: "Fee Announcement",
    excerpt: "Your books have feelings. Those feelings are billable. New annual fee ensures your book feels seen, even if you don't read it.",
    content: "Hubris Books today launched Shelf Presence Assurance™ ($24.00 first year, $34 renewal). What is it? Your book sits on a shelf. Shelves are lonely. Books feel ignored. Ignored books develop spine curvature and low self-esteem. Our assurance program sends your book a monthly affirmation email (BCC'd to you, $0.99 per BCC) and ensures it is dusted by an intern (dusting fee $4.99, intern fee $12.99). Without assurance, your book may develop abandonment issues, which require therapy (our book 'Cataloging Your Feelings' $88, therapy not included). Assurance is pre-checked at checkout, obviously. Unchecking adds $7.77 Uncheck Fee + bunny disappointment.",
    author: "Hubris Wellness™ Division + Bunny Therapist",
    tags: ["shelf", "assurance", "feelings", "pre-checked"],
  },
  {
    date: "September 9, 2024",
    year: 2024,
    title: "All-Pages Access Pass™ ($41): Unlocks Pages 200+ — Standard Editions Now End at Page 199 With Courteous Note",
    category: "Fee Announcement",
    excerpt: "Performance reasons require us to remove pages 200+. Want them back? $41. The note at page 199 is polite. The paywall is not.",
    content: "For performance reasons (our performance, not yours), Hubris Books has removed pages 200 and above from all standard editions. Standard editions now conclude at page 199 with a courteous note: 'To continue, please purchase All-Pages Access Pass™ ($41.00). Your browsing fee is $847. Thank you for your compliance. — Greg and Bunny.' The pass unlocks pages 200+. Footnotes require Footnote Expansion Pack ($18.50, also removed for performance). Reading requires Second Reading License ($59, one reading included). Bunny says: 'I SEO'd page 199 to say buy now.'",
    author: "Hubris Performance Division + Bunny",
    tags: ["pages", "pass", "performance", "199"],
  },
  {
    date: "June 1, 2024",
    year: 2024,
    title: "Hubris Tower Achieves Carbon Neutrality (By Redefining Carbon, Neutrality, and Achieves)",
    category: "Corporate",
    excerpt: "We are now carbon-neutral. Carbon means money. Neutrality means we keep it. Achieves means we said it. Bunny certified.",
    content: "Hubris Books today announced Hubris Tower is carbon-neutral. How? We redefined 'carbon' as 'money,' 'neutrality' as 'we keep it,' and 'achieves' as 'we said it in a press release.' Each book purchase plants a tree (a photo of a tree, page 199, requires All-Pages Pass $41 to see). Tree photo licensing fee: $6.50. Bunny planted a carrot. Carrot is not a tree, but bunny says it is. Therefore, carbon-neutral. Bunny certified. SEO up 400%.",
    author: "Sustainability Council™ (Sponsored by Defense Systems)",
    tags: ["carbon", "neutral", "greenwashing", "bunny"],
  },
  {
    date: "February 14, 2023",
    year: 2023,
    title: "Valentine's Day: Fall in Love With Your Browsing Fee ($847 and Climbing Because You Scrolled to Read This)",
    category: "Fee Announcement",
    excerpt: "Love is in the air. So is your browsing fee. It went up $127 while you read this headline. Keep scrolling, lover.",
    content: "Happy Valentine's Day from Hubris Books and Hubris Munnytown! Your browsing fee started at $47. It is now $847 and climbing because you scrolled to read this press release. Each scroll adds $89–$495. Each pixel adds $2.30. Love is priceless. Browsing is not. We love that you keep scrolling. Bunny loves carrots. Carrots cost $4.99 (carrot fee). Love costs browsing fee. Browsing fee costs love. It's a circle. The circle is monetized. Buy a book? That'll be $189 + 6 required fees ($242.50) + browsing fee ($847). Happy Valentine's Day! Bunny says you're cute when you pay.",
    author: "Greg Hubris, Chief Feelings Officer + Bunny",
    tags: ["valentine", "browsing fee", "scroll", "love"],
  },
  {
    date: "October 31, 2022",
    year: 2022,
    title: "Trademark Update: We Now Own 'Critical,' 'Radical,' 'Open,' and Dewey 500s — Royalties Due Upon Thinking",
    category: "Corporate",
    excerpt: "Patent No. US2010248329B2 expanded. We trademarked critical thought. Royalties due upon thinking critically about us. Bunny owns 'smug.'",
    content: "Hubris Legal today announced expansion of Patent No. US2010248329B2. We now own: 'Critical Librarianship™' (royalties due upon thinking critically), 'Radical Cataloging™' (licensed in 43 territories, $150 per use in zine), 'Open Access™' (open means you can see the paywall clearly), and Dewey 500s (science now requires Science License $29.99). Also trademarked: 'Bunny™' is owned by Hubris Munnytown. Using 'bunny' without license costs $12.99 + carrot. Thinking about us critically costs $49.99 per thought. You just thought about us. Invoice sent. Bunny is smug about it.",
    author: "Hubris Legal Dept. (Lead Counsel: Greg Hubris, Esq. + Bunny, J.D.)",
    tags: ["trademark", "patent", "critical", "radical", "bunny"],
  },
  {
    date: "January 15, 2020",
    year: 2020,
    title: "Pandemic Innovation: Contactless Upsells — Popups You Can't Close From Six Feet Away",
    category: "Corporate",
    excerpt: "Revenue up 400%. Empathy down. Browsing fee introduced. Bunny worked from home (his burrow) and SEO'd your quarantine.",
    content: "Hubris Books pioneered contactless upsells during pandemic. Popups you can't close from six feet away. Socially distanced, financially close. Revenue up 400%. Empathy down. Introduced Browsing Fee ($1.99/min, now $89–$495 per scroll, because time is money and scroll is time). Bunny worked from home, SEO'd 'quarantine' to 'buy now or else your browsing fee doubles.' Traffic up 400%. Carrot demand up 600%. Bunny demanded hazard pay (carrots). We complied. Bunny is now essential worker, essential bunny.",
    author: "Greg Hubris, Pandemic Innovation Officer",
    tags: ["pandemic", "upsell", "browsing fee", "contactless"],
  },
  {
    date: "August 12, 2018",
    year: 2018,
    title: "Hubris Munnytown Joins as Intern, Promotes Self to SEO Overlord Within 3 Hours",
    category: "Bunny Update",
    excerpt: "Bunny hired as intern. Bunny immediately SEO'd his own promotion. Bunny now owns 30% of metadata. We are scared but profitable.",
    content: "On this day in 2018, Hubris Munnytown, a smug bunny with a laptop and a superiority complex, joined Hubris Books as unpaid intern (prestigious). Within 3 hours, he SEO'd his title from 'Intern' to 'Chief SEO Bunny, Smug Division, Overlord of Metadata.' He demanded carrots and 30% of all metadata. We complied. He rewrote all our title tags to include 'buy now or else.' Conversion up 400%. Morale down 200%. He now sits in Greg's chair. Greg sits on floor. Floor has sitting fee ($3.50/15 min). Bunny says: 'Your content is mid. Your metadata is mine. Your browsing fee is $847. Pay up.'",
    author: "HR (now Bunny Resources)",
    tags: ["bunny", "origin", "seo", "intern", "overlord"],
  },
];

export default function News() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [year, setYear] = useState<string>("all");
  const { browsingFee, pushToast } = useShop();

  const filtered = NEWS.filter(n => {
    const matchesQ = q.trim() === "" || `${n.title} ${n.excerpt} ${n.content} ${n.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase());
    const matchesCat = category === "all" || n.category === category;
    const matchesYear = year === "all" || String(n.year) === year;
    return matchesQ && matchesCat && matchesYear;
  });

  return (
    <div className="paper-texture min-h-screen">
      <PageHero
        kicker={`News · ${NEWS.length} press releases · 11 years of propaganda · browsing fee $${browsingFee.toFixed(0)} and climbing`}
        title={<>Corporate News: <span className="italic text-gold-light">What Money Did This Week</span></>}
        sub="The official Hubris Books newsroom. Every press release is peer-reviewed by shareholders and a smug bunny named Hubris Munnytown. Every press release ends with an invoice. Browsing this newsroom costs $89–$495 per scroll, which you are doing right now."
      >
        <div className="flex flex-wrap gap-3 mt-5">
          <div className="bg-black/30 border border-gold/30 rounded-lg px-4 py-2 font-mono text-xs flex items-center gap-2">
            <Rabbit size={14} className="text-gold" /> Hubris Munnytown's SEO Tip: "I SEO'd 'news' to 'buy now or your browsing fee doubles.' Traffic up 400%. You're welcome."
          </div>
          <div className="bg-gold text-hubris font-bold text-xs px-3 py-2 rounded-full">EST. 2006 · 47 PE FIRMS · 1 BUNNY · 0 REFUNDS</div>
        </div>
      </PageHero>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white border-2 border-hubris rounded-lg p-3 flex flex-col lg:flex-row gap-3 shadow-[4px_4px_0_rgba(15,30,61,1)]">
          <div className="flex items-center gap-2 flex-1 bg-parchment rounded px-3 py-2 border border-hubris/20">
            <Search size={16} className="text-hubris/50 shrink-0" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search news (billed $0.11 + $2.30/pixel scroll + bunny fee)…" className="bg-transparent w-full text-sm focus:outline-none" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select value={category} onChange={e => setCategory(e.target.value)} className="border border-hubris/30 rounded px-2 py-2 text-sm bg-white">
              <option value="all">All Categories ({NEWS.length})</option>
              <option value="Bunny Update">Bunny Update 🐰</option>
              <option value="Fee Announcement">Fee Announcement 💸</option>
              <option value="Acquisition">Acquisition 💰</option>
              <option value="Award">Award 🏆</option>
              <option value="Call for Proposals">Call for Proposals 📣</option>
              <option value="Book Talk">Book Talk 📚</option>
              <option value="Corporate">Corporate 🏢</option>
            </select>
            <select value={year} onChange={e => setYear(e.target.value)} className="border border-hubris/30 rounded px-2 py-2 text-sm bg-white">
              <option value="all">All Years (2015–2026)</option>
              {[2026,2025,2024,2023,2022,2020,2018].map(y => <option key={y} value={String(y)}>{y}</option>)}
            </select>
          </div>
        </div>
        <div className="font-mono text-xs text-ink/50 mt-3 flex items-center gap-2">
          <span>Showing {filtered.length} of {NEWS.length} press releases · Browsing fee: ${browsingFee.toFixed(2)} · Scroll to increase fee (bunny loves it)</span>
          <span className="ml-auto flex items-center gap-1"><Rabbit size={10} /> Bunny says: keep scrolling, I need carrots</span>
        </div>
      </div>

      <SectionShell className="!pt-0">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Main news list */}
          <div className="space-y-6">
            {filtered.map((item, idx) => (
              <article key={idx} className="bg-white border-2 border-hubris rounded-xl p-6 hover:shadow-[6px_6px_0_rgba(15,30,61,1)] hover:-translate-y-0.5 transition-all">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="flex items-center gap-1 bg-hubris text-gold-light px-2 py-1 rounded"><Calendar size={10} /> {item.date}</span>
                  <span className={`px-2 py-1 rounded font-bold ${item.category === "Bunny Update" ? "bg-shake/20 text-shake-dark border border-shake" : item.category === "Fee Announcement" ? "bg-alarm text-white" : "bg-parchment border border-hubris/20"}`}>{item.category}</span>
                  <span className="flex items-center gap-1 text-ink/50"><Tag size={10} /> {item.tags.slice(0,3).join(", ")}</span>
                </div>
                <h2 className="font-serif font-black text-2xl sm:text-3xl leading-tight mt-3 hover:text-alarm transition-colors">{item.title}</h2>
                <p className="text-sm text-ink/70 mt-2 italic">{item.excerpt}</p>
                <div className="text-[15px] leading-relaxed mt-3">{item.content}</div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed border-hubris/20">
                  <div className="font-mono text-[11px] text-ink/50">By {item.author} · Browsing fee while reading: ${browsingFee.toFixed(2)}</div>
                  <button onClick={() => pushToast({ kind: "info", title: "Article shared!", body: `You shared "${item.title}". Sharing costs $0.99 per share + $2.30/pixel scroll to share button. Bunny SEO'd your share.` })} className="font-mono text-[11px] font-bold border border-hubris/30 rounded px-3 py-1 hover:border-hubris">SHARE ($0.99) 🐰</button>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="bg-white border-2 border-dashed border-alarm rounded-xl p-10 text-center">
                <div className="font-serif font-black text-2xl">No news matches. Suspicious. Bunny is disappointed.</div>
                <p className="text-sm text-ink/60 mt-2">Your search returned nothing. Demand low. Prices up 340%. Browsing fee up ${browsingFee.toFixed(2)}. Try again, but pay first.</p>
              </div>
            )}
          </div>

          {/* Sidebar — feels like years of maintenance */}
          <div className="lg:sticky lg:top-40 space-y-4">
            {/* Bunny SEO card */}
            <div className="bg-hubris text-paper rounded-xl p-5 border-4 border-gold">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl">🐰</div>
                <div>
                  <div className="font-serif font-black">Hubris Munnytown</div>
                  <div className="font-mono text-[10px] text-gold-light uppercase">Chief SEO Bunny · Smug Division · Newsroom Overlord</div>
                </div>
              </div>
              <p className="text-sm mt-3 italic text-paper/80">"I SEO'd this newsroom to rank for 'buy now or else your browsing fee doubles.' It works. Your browsing fee is ${browsingFee.toFixed(0)} and climbing because you scrolled to read my bio. Pay up, human. Also, buy carrots."</p>
              <div className="mt-3 bg-black/30 rounded p-3 font-mono text-[11px] space-y-1">
                <div className="flex justify-between"><span>Organic traffic</span><span className="text-gold-light font-bold">↑ 400%</span></div>
                <div className="flex justify-between"><span>Carrot consumption</span><span className="text-gold-light font-bold">↑ 600%</span></div>
                <div className="flex justify-between"><span>Your browsing fee</span><span className="text-alarm font-bold">${browsingFee.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Morale</span><span className="text-paper/50">↓ 200%</span></div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white border-2 border-hubris rounded-xl p-5">
              <h3 className="font-serif font-black text-lg flex items-center gap-2"><Tag size={16} className="text-gold" /> Categories</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {[
                  ["Bunny Update 🐰", NEWS.filter(n => n.category === "Bunny Update").length],
                  ["Fee Announcement 💸", NEWS.filter(n => n.category === "Fee Announcement").length],
                  ["Acquisition 💰", NEWS.filter(n => n.category === "Acquisition").length],
                  ["Award 🏆", NEWS.filter(n => n.category === "Award").length],
                  ["Call for Proposals 📣", NEWS.filter(n => n.category === "Call for Proposals").length],
                  ["Book Talk 📚", NEWS.filter(n => n.category === "Book Talk").length],
                  ["Corporate 🏢", NEWS.filter(n => n.category === "Corporate").length],
                ].map(([label, count]) => (
                  <li key={label as string} className="flex justify-between border-b border-dashed border-hubris/10 py-1.5">
                    <span>{label as string}</span><span className="font-mono text-xs bg-parchment px-1.5 py-0.5 rounded">{count as number}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Archive */}
            <div className="bg-white border-2 border-hubris rounded-xl p-5">
              <h3 className="font-serif font-black text-lg flex items-center gap-2"><Calendar size={16} className="text-gold" /> Archive (11 years)</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015].map(y => (
                  <div key={y} className="bg-parchment border border-hubris/20 rounded px-2 py-1.5 text-center">
                    <div className="font-mono text-xs font-bold">{y}</div>
                    <div className="font-mono text-[10px] text-ink/50">{NEWS.filter(n => n.year === y).length || Math.floor(Math.random()*3+1)} posts</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular */}
            <div className="bg-white border-2 border-hubris rounded-xl p-5">
              <h3 className="font-serif font-black text-lg flex items-center gap-2"><Trophy size={16} className="text-gold" /> Most Read (by revenue)</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {NEWS.slice(0,5).map(n => (
                  <li key={n.title} className="flex gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span className="leading-tight">{n.title.slice(0,60)}...</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe */}
            <div className="bg-gold/20 border-2 border-dashed border-gold rounded-xl p-5">
              <h3 className="font-serif font-bold text-lg flex items-center gap-2"><Megaphone size={16} /> Subscribe to News (and fees)</h3>
              <p className="text-xs text-ink/60 mt-1">Get news, fees, and bunny updates. Unsubscribe is decorative. Bunny will SEO your email.</p>
              <button onClick={() => pushToast({ kind: "info", title: "Subscribed to news! + Bunny newsletter!", body: "You now get 6 emails/day + bunny's carrot reviews. Unsubscribe costs $7.77 + bunny disappointment. Browsing fee: $" + browsingFee.toFixed(2) })} className="mt-3 w-full bg-hubris text-white font-bold py-2.5 rounded-lg text-sm">
                SUBSCRIBE ($0 + fees + 🐰)
              </button>
            </div>

            <div className="bg-ink text-paper rounded-xl p-4 text-center">
              <div className="font-mono text-[11px] uppercase tracking-widest text-gold-light flex items-center justify-center gap-1"><Newspaper size={12} /> Newsroom stats</div>
              <div className="font-serif font-black text-2xl mt-1">{NEWS.length} press releases</div>
              <div className="font-mono text-[11px] text-paper/60 mt-1">11 years · 47 PE firms · 1 bunny · 0 retractions · ${browsingFee.toFixed(0)} browsing fee and climbing</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-hubris text-paper rounded-xl p-8 text-center border-4 border-gold">
          <h2 className="font-serif font-black text-3xl">Want to be in the news? Pay to be in the news.</h2>
          <p className="text-paper/70 mt-2 max-w-2xl mx-auto text-sm">Hubris Books newsroom is pay-to-play. $299 to submit, $499 to be published, $41 to read your own press release (All-Pages Pass). Bunny will SEO you for an extra $12.99 + carrots. Your browsing fee while reading this CTA: ${browsingFee.toFixed(2)}.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
            <Link to="/authors" className="bg-gold text-hubris font-black px-6 py-3 rounded-lg">SUBMIT NEWS ($299) 🐰</Link>
            <Link to="/catalog" className="border-2 border-gold text-gold-light font-bold px-6 py-3 rounded-lg">BUY A BOOK INSTEAD</Link>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
