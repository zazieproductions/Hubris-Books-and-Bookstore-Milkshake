export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  imprint: "milkshake" | "hubris" | "synergy" | "vault";
  price: number;
  listPrice: number;
  pages: number;
  year: number;
  isbn: string;
  blurb: string;
  endorsement: string;
  endorser: string;
  cover: { bg: string; accent: string; motif: string };
  badges: string[];
  soldOut?: boolean;
  staffPick?: boolean;
  feeFootnote?: string;
  stockWarning?: string;
  /** For titles that are, legally speaking, nothing but a patent. */
  patentNo?: string;
  /** For multi-volume works sold separately, obviously. */
  volumes?: string;
}

export const BOOKS: Book[] = [
  {
    id: "information-wants-to-be-leased",
    title: "Information Wants to Be Leased",
    subtitle: "A Rebuttal in Four Volumes, Sold Separately",
    author: "Hollis Grandjean-Ferro",
    imprint: "hubris",
    price: 340.0,
    listPrice: 425.0,
    pages: 199,
    year: 2026,
    isbn: "978-1-63400-919-7",
    blurb:
      "In 1984 someone said information wants to be free. Grandjean-Ferro proves, over four volumes and 1,180 footnotes, that the sentence was misheard, misquoted, and — most importantly — mislicensed. Volume I establishes that information, in fact, wants to be leased, at market rate, with an escalator clause. Volumes II–IV are sold separately, in that order, and may not be read out of sequence (a Sequencing Violation Fee of $60 applies). The set concludes at page 199 with a courteous note explaining that pages 200 and above are a different product.",
    endorsement: "A four-volume rebuttal of a single sentence. This is the scholarship we deserve and the invoice we cannot escape.",
    endorser: "The Quarterly Review of Leasable Thought",
    cover: { bg: "#0F1E3D", accent: "#E8CE6A", motif: "§" },
    badges: ["4 VOLUMES", "VOL. II–IV SOLD SEPARATELY", "CONCLUDES AT PAGE 199"],
    staffPick: true,
    volumes: "Volume I of IV. Volumes II ($340), III ($385), and IV ($410) are separate products with separate feelings.",
    feeFootnote: "Price is for Volume I only. Reading Volume I without Volume II is a breach (§4.2, Curiosity Clause).",
    stockWarning: "Volume IV is backordered until Q4 2029.",
  },
  {
    id: "cataloging-your-feelings",
    title: "Cataloging Your Feelings",
    subtitle: "A Dewey Decimal Approach to Repression",
    author: "Dr. Wilhelmina Hush",
    imprint: "synergy",
    price: 128.0,
    listPrice: 160.0,
    pages: 214,
    year: 2025,
    isbn: "978-1-63400-920-3",
    blurb:
      "Grief is 155.4. Rage is 152.4. Both, Dr. Hush argues, have been misfiled for decades under 658.4 — Management. This practical classification scheme assigns every human emotion a call number, a processing fee, and a retention schedule. Includes worksheets for reclassifying your own despair as 'Non-Circulating, In-House Use Only,' and a fold-out chart mapping shame to the 300s (social sciences: your fault, structurally).",
    endorsement: "Finally, my dread has a call number, a subject heading, and a late fee. I feel nothing. Success.",
    endorser: "Anonymous Patron, Reading Room C (being watched)",
    cover: { bg: "#3B2F63", accent: "#FF6FA5", motif: "❦" },
    badges: ["EMOTIONS: 152–159", "REPRESSION: 658.4*", "WORKSHEETS INCLUDED"],
    feeFootnote: "Worksheets are single-use. Feeling twice requires a Second Feeling License ($19.99).",
  },
  {
    id: "critical-librarianship-patent",
    title: "Critical Librarianship™",
    subtitle: "A Book That Is Just a Patent",
    author: "Hubris Legal",
    imprint: "vault",
    price: 899.0,
    listPrice: 899.0,
    pages: 84,
    year: 2026,
    isbn: "978-1-63400-921-0",
    patentNo: "Patent No. US2010248329B2 — Do Not Question",
    blurb:
      "We trademarked critical thought. Royalties due upon thinking critically about us. This volume contains no argument, no index, no bibliography, and no mercy — only 84 pages of claims, bound in a cover that is itself claim 1. Reading it constitutes practice of the invention. Practicing the invention without a license constitutes infringement. There is no chapter in which we explain this, because explanation would constitute a disclosure, and disclosure is claim 61.",
    endorsement: "Legally distinct from a book. Functionally identical to an invoice. A triumph of the form.",
    endorser: "The United States Patent and Trademark Office (unwittingly)",
    cover: { bg: "#111827", accent: "#C9A227", motif: "¶" },
    badges: ["PATENT No. US2010248329B2", "DO NOT QUESTION", "ROYALTIES DUE ON THOUGHT"],
    feeFootnote: "Royalty of $0.40 is assessed per critical thought, self-reported, audited by us, payable in advance.",
    stockWarning: "Not out of stock. Out of patience.",
  },
  {
    id: "radical-cataloging-trademark",
    title: "Radical Cataloging™",
    subtitle: "Licensing the Word \"Radical\" in 43 Territories",
    author: "Ines Battersby-Okonkwo",
    imprint: "hubris",
    price: 215.0,
    listPrice: 275.0,
    pages: 336,
    year: 2024,
    isbn: "978-1-63400-922-7",
    blurb:
      "How does a publisher come to own an adjective? Slowly, and then in 43 territories at once. Battersby-Okonkwo documents the campaign, the filings, and the cease-and-desist letters sent to reading groups, zines, and one very confused book club in Duluth. Includes the complete licensing schedule (Class 16: paper goods; Class 41: dissent), a fold-out map of licensed territories, and a glossary of words we are currently examining for ownership.",
    endorsement: "Radical, in the sense that we can now bill for it. Brave, in the sense that our counsel approved it.",
    endorser: "The Journal of Trademarked Dissent",
    cover: { bg: "#7A1120", accent: "#E8CE6A", motif: "®" },
    badges: ["43 TERRITORIES", "USE OF WORD \"RADICAL\" LICENSED", "CLASS 16 & 41"],
    feeFootnote: "Saying the title aloud in a licensed territory incurs a Verbal Use Royalty ($0.12 per utterance).",
  },
  {
    id: "pedagogy-of-the-purchased",
    title: "Pedagogy of the Purchased",
    subtitle: "Education as an Exercise in Brand Loyalty",
    author: "Paulo Freemium",
    imprint: "synergy",
    price: 96.0,
    listPrice: 120.0,
    pages: 288,
    year: 2026,
    isbn: "978-1-63400-923-4",
    blurb:
      "Rejecting the outdated distinction between a student and a lifetime customer, Paulo Freemium offers a transformative vision of education as a recurring billing relationship. The classroom becomes a conversion funnel; the syllabus, a carefully optimized customer journey. Chapters cover onboarding (orientation), retention (the dean's list), and churn (graduation, which we have begun to litigate).",
    endorsement: "Freire, but with a subscription tier and a much better Q3.",
    endorser: "The Harvard Business Review of Reviews",
    cover: { bg: "#0E3A5C", accent: "#FAF6ED", motif: "◭" },
    badges: ["ADOPTED BY 0 SCHOOLS", "MANDATORY AT 4,100"],
    staffPick: true,
    feeFootnote: "Course adoption includes a per-student Access Code ($89), renewable every semester, forever.",
  },
  {
    id: "against-the-common-good",
    title: "Against the Common Good",
    subtitle: "Privatization and the Promise of Less for Everyone",
    author: "Milton de Commons",
    imprint: "hubris",
    price: 110.0,
    listPrice: 138.0,
    pages: 264,
    year: 2025,
    isbn: "978-1-63400-924-1",
    blurb:
      "For too long, public institutions have suffered from a fundamental design flaw: the public can use them. This provocative collection dismantles the commons one monetizable amenity at a time — the bench, the drinking fountain, the shade of a publicly owned tree. De Commons closes with a modest proposal: charge for the concept of Tuesday.",
    endorsement: "A brave, essential, tax-deductible argument. We have deducted it.",
    endorser: "The Economist's Economist",
    cover: { bg: "#1F3D2B", accent: "#C9A227", motif: "◧" },
    badges: ["BENCHES SOLD SEPARATELY", "SHADE: PREMIUM TIER"],
    feeFootnote: "A $4.00 Commons Usage Surcharge applies to reading this book in public.",
    stockWarning: "Now required reading in 12 privatized parks.",
  },
  {
    id: "surveillance-cataloging",
    title: "Surveillance Cataloging",
    subtitle: "A Practical Guide to Knowing Everything Your Patrons Fear",
    author: "Dr. Panoptica Index",
    imprint: "vault",
    price: 189.0,
    listPrice: 240.0,
    pages: 352,
    year: 2026,
    isbn: "978-1-63400-925-8",
    blurb:
      "Transform your library into a data-extraction node. Learn to track reading habits, emotional states, and overdue anxiety with enterprise-grade metadata. Dr. Index walks you through the dashboards, the retention schedules, and the delicate art of telling a patron you don't know what they read while knowing precisely what they read, when, and how long they lingered on page 88.",
    endorsement: "I read this book and it read me back. Both readings were billed. I would do it again.",
    endorser: "The Panopticon Times (subscription mandatory)",
    cover: { bg: "#111827", accent: "#7DD3FC", motif: "◉" },
    badges: ["DASHBOARDS INCLUDED", "DASHBOARD ACCESS: $999/MO", "FOIA-RESISTANT"],
    feeFootnote: "Companion dashboard licensed per seat, per branch, per patron, per calendar quarter.",
    stockWarning: "Your consortium already subscribed. You personally are on it.",
  },
  {
    id: "metadata-for-landlords",
    title: "Metadata for Landlords",
    subtitle: "Tenant Screening as a Librarian's Highest Calling",
    author: "Grattan Leasewright III",
    imprint: "synergy",
    price: 154.0,
    listPrice: 154.0,
    pages: 232,
    year: 2025,
    isbn: "978-1-63400-926-5",
    blurb:
      "What is a MARC record, Leasewright asks, but a rental application with better punctuation? This field guide translates cataloging standards into screening criteria: authority control becomes reference checking, provenance becomes credit history, and the humble subject heading becomes the single most powerful eviction instrument in the Western hemisphere. Includes 40 reproducible forms (reproduction licensed per form, per tenant, per year).",
    endorsement: "My tenants now have authority control. They have no other kind of control. Five units, five stars.",
    endorser: "Eviction Quarterly",
    cover: { bg: "#4A3219", accent: "#FAF6ED", motif: "⌂" },
    badges: ["40 REPRODUCIBLE FORMS", "FORMS: $2.50 EACH"],
    feeFootnote: "Every copy ships with a Key Money Rider ($55), which is not a key and not money.",
  },
  {
    id: "neoliberal-cataloging",
    title: "Neoliberal Cataloging (Deluxe)",
    subtitle: "Monetizing the MARC Record in an Age of Relentless Growth, Now With a Foreword You Pay For",
    author: "Dr. Chip Profitwell III",
    imprint: "milkshake",
    price: 189.0,
    listPrice: 240.0,
    pages: 312,
    year: 2026,
    isbn: "978-1-63400-901-2",
    blurb:
      "Why should Library of Congress Subject Headings be free? Profitwell argues every 650 field is an untapped revenue stream. Includes a foreword by a sponsored search result and Chapter 7, printed on scratch-and-sniff paper that smells like money.",
    endorsement: "Finally, a cataloging textbook that asks the only question that matters: but what is your metadata's EBITDA?",
    endorser: "The Journal of Compliant Librarianship",
    cover: { bg: "#0F1E3D", accent: "#C9A227", motif: "◈" },
    badges: ["BESTSELLER", "ALA-ADJACENT™"],
    staffPick: true,
    feeFootnote: "Price excludes Mandatory Spine Hydration Fee ($14.95).",
    stockWarning: "Only 4,000,000 copies left!",
  },
  {
    id: "dialectic-of-late-fees",
    title: "The Dialectic of Late Fees",
    subtitle: "A Critical Approach to Punishing Poverty, Lovingly, in Hardcover, With Ribbon Marker",
    author: "Prof. Karen Turnstile",
    imprint: "milkshake",
    price: 145.5,
    listPrice: 145.5,
    pages: 208,
    year: 2025,
    isbn: "978-1-63400-902-9",
    blurb:
      "Turnstile's searing defense of the $0.25/day fine as 'character development infrastructure.' Features a 40-page appendix ranking patron excuses by profitability, and a tear-out poster of a coin slot for your empathy.",
    endorsement: "Bold. Brave. Basically a collections policy with citations.",
    endorser: "Debt Collector Quarterly",
    cover: { bg: "#D92D20", accent: "#FAF6ED", motif: "◉" },
    badges: ["FINE-FREE* SHIPPING", "*FEES APPLY"],
    feeFootnote: "Fine-free shipping adds a $9.99 Fine Neutralization Surcharge.",
  },
  {
    id: "class-and-librarianship-intersection",
    title: "Class & Librarianship: First Class",
    subtitle: "Essays at the Intersection of Information, Labor, and Capital (Emphasis on Capital)",
    author: "Edited by Biff Carrington-Smythe",
    imprint: "milkshake",
    price: 210.0,
    listPrice: 275.0,
    pages: 480,
    year: 2026,
    isbn: "978-1-63400-903-6",
    blurb:
      "Fourteen essays on why the working class should simply purchase deaccessioned weeded materials at full retail. Chapter 3 is just a photo of a yacht named S.S. Open Access. Peer-reviewed by shareholders.",
    endorsement: "The definitive takedown of the concept of 'free' anything.",
    endorser: "Shareholder's Weekly Review of Reviews",
    cover: { bg: "#1D3260", accent: "#FF6FA5", motif: "✦" },
    badges: ["PEER-REVIEWED BY SHAREHOLDERS"],
    stockWarning: "Selling fast at airport bookstalls!",
  },
  {
    id: "politics-of-theory-gift-shop",
    title: "The Politics of Theory and the Practice of the Gift Shop",
    subtitle: "Critical Librarianship for People Who Sell Tote Bags Ironically",
    author: "Dr. Brandi Leverage",
    imprint: "milkshake",
    price: 96.0,
    listPrice: 120.0,
    pages: 176,
    year: 2024,
    isbn: "978-1-63400-904-3",
    blurb:
      "Leverage proves Foucault's panopticon was actually just an early loss-prevention strategy. Every copy ships with a tote bag that costs more than the book and says 'I READ BANNED BOOKS (AVAILABLE IN THE GIFT SHOP).'",
    endorsement: "Discipline and Punish has never been so giftable.",
    endorser: "Museum Store Alliance Newsletter",
    cover: { bg: "#067647", accent: "#E8CE6A", motif: "⬢" },
    badges: ["INCLUDES TOTE", "TOTE COSTS EXTRA"],
    feeFootnote: "Complimentary tote bag billed separately at $38.00.",
  },
  {
    id: "greening-libraries-gold",
    title: "Greening Libraries (With Money, Mostly Ours)",
    subtitle: "Sustainability Initiatives That Sustain Our Margins, Printed on Trees",
    author: "The Hubris Sustainability Council™",
    imprint: "hubris",
    price: 175.0,
    listPrice: 175.0,
    pages: 240,
    year: 2026,
    isbn: "978-1-63400-905-0",
    blurb:
      "How one publisher achieved carbon neutrality by redefining 'carbon,' 'neutrality,' and 'achieved.' Printed on 100% recycled competing publishers' ARCs. Each purchase plants a tree (a decorative photo of a tree, in this book).",
    endorsement: "The greenest book ever printed on virgin rainforest blend.",
    endorser: "The Greenwashing Times",
    cover: { bg: "#123524", accent: "#7ED492", motif: "❧" },
    badges: ["CARBON-NEUTRAL*", "*TERMS CARBON, NEUTRAL REDEFINED"],
    feeFootnote: "A $6.50 Tree Photo Licensing Fee applies per copy.",
  },
  {
    id: "confronting-democratic-discourse",
    title: "Confronting the Democratic Discourse of Librarianship (And Billing It Hourly)",
    subtitle: "A Consultant's Framework for Charging Democracy by the Fifteen Minutes",
    author: "McKinsey Pricewaterhouse, MLIS (pending)",
    imprint: "hubris",
    price: 349.99,
    listPrice: 500.0,
    pages: 96,
    year: 2026,
    isbn: "978-1-63400-906-7",
    blurb:
      "Democracy is priceless, which is why this 96-page PDF costs $349.99. Includes 11 frameworks, 0 answers, and a slide deck you may license per-view. Democracy dies in darkness; this book dies in a paywall.",
    endorsement: "Synergistic. Paradigm-shifting. Invoice enclosed.",
    endorser: "Consultant's Consultant Digest",
    cover: { bg: "#3B0764", accent: "#C9A227", motif: "⬣" },
    badges: ["BILLABLE", "PER-VIEW LICENSING"],
    stockWarning: "Only 3 views left on your institutional license!",
  },
  {
    id: "radical-cataloging-compliance",
    title: "Question Authority™ (Compliance Edition)",
    subtitle: "From 'Question Authority' to 'The Authority Has Questions for You, Billable at $150/Hour'",
    author: "Sgt. Dana Dewey (Ret.)",
    imprint: "milkshake",
    price: 129.0,
    listPrice: 160.0,
    pages: 288,
    year: 2023,
    isbn: "978-1-63400-907-4",
    blurb:
      "A thrilling reimagining of radical cataloging where the radicals are management. Learn to catalog dissent as 'Ephemera — Do Not Circulate.' Includes pre-filled incident report forms bound directly into the gutter margin.",
    endorsement: "Finally puts the 'control' back in 'authority control.'",
    endorser: "The Panopticon Review of Books",
    cover: { bg: "#450A0A", accent: "#E8CE6A", motif: "⬥" },
    badges: ["CLEARED FOR CIRCULATION"],
  },
  {
    id: "feminist-pedagogy-hustle",
    title: "Feminist Pedagogy and the Girlboss Hustle",
    subtitle: "Smashing the Glass Ceiling of Your Library's Overtime Budget",
    author: "Dr. Tiffany C-Suite",
    imprint: "milkshake",
    price: 110.0,
    listPrice: 110.0,
    pages: 224,
    year: 2025,
    isbn: "978-1-63400-908-1",
    blurb:
      "Lean in to unpaid emotional labor! C-Suite reframes burnout as 'thermal ambition' and the gender pay gap as 'a gap you can monetize with a side hustle.' Foreword by a scented candle brand.",
    endorsement: "Empowering, in the specific sense that it empowers us to sell this.",
    endorser: "Lean In Library Journal",
    cover: { bg: "#FF6FA5", accent: "#0F1E3D", motif: "✿" },
    badges: ["GIRLBOSS APPROVED", "SMELLS LIKE LAVENDER"],
    feeFootnote: "Lavender scent infusion: +$4.25 per copy.",
  },
  {
    id: "queer-archives-merch",
    title: "Queer Archives & the Merch Table",
    subtitle: "From Stonewall to Storewide: A Rainbow Capitalism Reader",
    author: "Edited by Chase Rainbow, VP of June",
    imprint: "milkshake",
    price: 88.0,
    listPrice: 132.0,
    pages: 320,
    year: 2026,
    isbn: "978-1-63400-909-8",
    blurb:
      "A moving anthology available every June, recalled every July. Thirty essays on radical queer history, each followed by a QR code to purchase the commemorative pin set. Pride is a protest (sponsored by Hubris Defense Systems).",
    endorsement: "Stunning. Brave. 30% off with code ALLYSHIP.",
    endorser: "The Pinkwashing Post",
    cover: { bg: "#7C3AED", accent: "#FAF6ED", motif: "☾" },
    badges: ["JUNE ONLY", "ALLYSHIP CODE ACCEPTED"],
    stockWarning: "Recalled July 1st. Buy before the recall!",
  },
  {
    id: "decolonizing-subscription-bundle",
    title: "Decolonizing the Subscription Bundle",
    subtitle: "By Adding More Journals to It, Somehow",
    author: "Dr. Wellington Gatekeeper",
    imprint: "hubris",
    price: 499.0,
    listPrice: 499.0,
    pages: 512,
    year: 2026,
    isbn: "978-1-63400-910-4",
    blurb:
      "Gatekeeper's bold proposal: keep the Big Deal, but rename it 'The Big Reconciliation.' Includes a land acknowledgment printed over the invoice, and 40 pages of apologies in 8-point type.",
    endorsement: "Decolonization but make it recurring revenue.",
    endorser: "Serials Crisis? What Serials Crisis?",
    cover: { bg: "#78350F", accent: "#FAF6ED", motif: "◍" },
    badges: ["BIG RECONCILIATION™", "AUTO-RENEWS"],
    feeFootnote: "Auto-renews annually forever. Cancellation requires a quest.",
  },
  {
    id: "critical-information-literacy-brand",
    title: "Critical Information Literacy for Brand Ambassadors",
    subtitle: "Teaching Students to Evaluate Sources (Ours Are Always Credible)",
    author: "Prof. Sponsored Content",
    imprint: "synergy",
    price: 75.0,
    listPrice: 95.0,
    pages: 192,
    year: 2024,
    isbn: "978-1-63400-911-1",
    blurb:
      "The SIFT method, reimagined: Stop, Investigate, Find our sponsored content, Trace it to our checkout page. Includes rubrics for grading whether students purchased the textbook (they did — it's required).",
    endorsement: "This review was compensated. Five stars.",
    endorser: "Influencer Educator Magazine",
    cover: { bg: "#0E7490", accent: "#FAF6ED", motif: "◎" },
    badges: ["#SPONSORED", "REQUIRED PURCHASE"],
  },
  {
    id: "open-access-paywall",
    title: "Open Access Behind a Modest Paywall",
    subtitle: "The Transformative Agreement to Transform Your Budget Into Ours",
    author: "The Hubris Openness Taskforce",
    imprint: "hubris",
    price: 0.01,
    listPrice: 299.0,
    pages: 400,
    year: 2026,
    isbn: "978-1-63400-912-8",
    blurb:
      "Open access has never been more open* (*openness defined as the paywall being transparent glass). Read the first 3 pages free! Pages 4–400 available via Read-and-Publish deal starting at one (1) library.",
    endorsement: "Open in the same way a mouth is open during a dental exam.",
    endorser: "APC Watch Daily",
    cover: { bg: "#FAF6ED", accent: "#D92D20", motif: "🔓" },
    badges: ["OPEN*", "*GLASS PAYWALL", "APC: YOUR LIBRARY"],
    feeFootnote: "Article Processing Charge: one (1) branch library, transferable.",
    stockWarning: "FREE* (*$299 handling)",
  },
  {
    id: "burnout-self-care-vending",
    title: "Burnout, Self-Care & the Vending Machine",
    subtitle: "Wellness Strategies Priced by the Granola Bar, Vend by the Quarter, Felt by Nobody",
    author: "Dr. Sage Smudge, Chief Resilience Officer",
    imprint: "synergy",
    price: 64.0,
    listPrice: 80.0,
    pages: 144,
    year: 2025,
    isbn: "978-1-63400-913-5",
    blurb:
      "Tired of being tired? This book prescribes resilience in chewable form. Features breathing exercises timed to vending machine cycles and a chapter titled 'Have You Tried Being Less Poor Near the Reference Desk?'",
    endorsement: "I felt seen, then billed $4.50 for the feeling.",
    endorser: "Resilience! Magazine",
    cover: { bg: "#365314", accent: "#FAF6ED", motif: "❀" },
    badges: ["NOW WITH 20% MORE RESILIENCE"],
  },
  {
    id: "makerspaces-escape-rooms",
    title: "Makerspaces as Escape Rooms You Pay to Leave",
    subtitle: "Innovative Programming for the Post-Budget Library",
    author: "Greg Pizzazz",
    imprint: "synergy",
    price: 132.0,
    listPrice: 132.0,
    pages: 256,
    year: 2025,
    isbn: "978-1-63400-914-2",
    blurb:
      "Turn your underfunded makerspace into a profitable escape experience! Patrons solve puzzles to exit; the final puzzle is the invoice. 3D printers now print receipts. Laser cutter engraves payment plans.",
    endorsement: "The only assessment metric is revenue, and revenue is up.",
    endorser: "Fun Committee Proceedings",
    cover: { bg: "#9A3412", accent: "#E8CE6A", motif: "⬔" },
    badges: ["ESCAPE FEE WAIVED*", "*NOT WAIVED"],
    feeFootnote: "Exit fee: $12.99 per patron per escape.",
  },
  {
    id: "weeding-kondo-upsell",
    title: "The Gentle Art of Weeding (Your Wallet)",
    subtitle: "A KonMari Method for Discarding Books Directly Into Our Resale Pipeline, Where They Spark Joy for Shareholders",
    author: "Marie Donate-To-Us",
    imprint: "vault",
    price: 58.0,
    listPrice: 72.0,
    pages: 160,
    year: 2023,
    isbn: "978-1-63400-915-9",
    blurb:
      "Does this book spark joy? Wrong question. Does this book spark a restocking fee? Learn CREW methods optimized for our buyback program, which pays $0.04 per book and charges $18.00 per pickup.",
    endorsement: "I weeded my collection and my savings in one afternoon.",
    endorser: "Discard Pile Monthly",
    cover: { bg: "#334155", accent: "#C9A227", motif: "✂" },
    badges: ["BUYBACK: $0.04/BOOK", "PICKUP: $18.00"],
  },
  {
    id: "reference-interview-interrogation",
    title: "The Reference Interview as Soft Interrogation",
    subtitle: "Getting to 'What Do You Need?' by Way of 'Where Were You on Tuesday?'",
    author: "Agent R. E. Ference",
    imprint: "vault",
    price: 156.0,
    listPrice: 195.0,
    pages: 272,
    year: 2024,
    isbn: "978-1-63400-916-6",
    blurb:
      "Roaming reference meets reasonable suspicion. Ference teaches open-ended questions ('Tell me everything'), active listening (recording), and follow-up (surveillance). Appendix: your hold history, which we have.",
    endorsement: "I only came in for tax forms. I left with a reading list and a file.",
    endorser: "Anonymous Patron #4471",
    cover: { bg: "#111827", accent: "#D92D20", motif: "◐" },
    badges: ["WE KNOW YOUR HOLDS", "FOIA-RESISTANT BINDING"],
    feeFootnote: "Redaction of your personal hold history from Appendix C: $29.95.",
  },
  {
    id: "collection-development-fomo",
    title: "Collection Development in the Age of FOMO",
    subtitle: "Approval Plans, Demand-Driven Acquisition, and Panic at 3 A.M.",
    author: "Dr. Yolo Purchase",
    imprint: "synergy",
    price: 142.0,
    listPrice: 178.0,
    pages: 296,
    year: 2026,
    isbn: "978-1-63400-917-3",
    blurb:
      "Why develop a collection when you can develop anxiety? Purchase introduces the 'Panic Approval Plan,' under which your library auto-buys every Hubris title at 3 a.m. Sleep is for libraries with approval thresholds.",
    endorsement: "I woke up owning 400 copies of this book. Five stars.",
    endorser: "A Very Tired Selector",
    cover: { bg: "#831843", accent: "#FAF6ED", motif: "⚡" },
    badges: ["AUTO-BUYS AT 3AM", "SLEEP NOT INCLUDED"],
    stockWarning: "Your library already ordered 12 copies!",
  },
  {
    id: "digital-preservation-subscription",
    title: "Digital Preservation Through Perpetual Subscription",
    subtitle: "Your Archives Are Safe Forever (Payments Due Monthly Forever, Missed Payments Return You to the 1400s)",
    author: "The Cloud Eternity Group",
    imprint: "vault",
    price: 229.0,
    listPrice: 229.0,
    pages: 344,
    year: 2026,
    isbn: "978-1-63400-918-0",
    blurb:
      "LOCKSS is dead; long live PAYSS (Pay A Yearly Subscription, Seriously). Your bits are preserved in our proprietary cloud, readable only through our reader, on our device, during our business hours, forever.",
    endorsement: "Eternal preservation, mortal pricing.",
    endorser: "Bit Rot & You",
    cover: { bg: "#082F49", accent: "#7DD3FC", motif: "☁" },
    badges: ["PERPETUAL*", "*PERPETUAL PAYMENTS", "PROPRIETARY ETERNITY"],
    feeFootnote: "Eternity billed monthly. Missed payments result in the 1400s.",
  },
];

export const IMPRINTS = {
  milkshake: {
    name: "Library Juice Press™ (Acquired)",
    spine: "Library Juice Press™",
    tagline: "The beloved indie press, now a licensed trademark of ours",
    description:
      "Formerly a real press run by people who genuinely loved libraries. Acquired, juiced, and folded into the Hubris family. Our flagship imprint for theoretical and practical issues in librarianship from a profitable perspective, for an audience of professional librarians and students of library science who have already entered their card details.",
    color: "#D97706",
  },
  hubris: {
    name: "Hubris Books",
    spine: "Hubris Books",
    tagline: "Independently owned by a consortium of 47 private equity firms",
    description:
      "The parent imprint, publishing scholarly books about media, communication, libraries, and related historical topics — now with dynamic surge pricing on history.",
    color: "#C9A227",
  },
  synergy: {
    name: "Synergy Chapbooks",
    spine: "Synergy Chapbooks",
    tagline: "Disrupting pamphlets",
    description:
      "Short-form works on innovation, wellness, and programming, each under 200 pages and over $60. Efficiency!",
    color: "#0E7490",
  },
  vault: {
    name: "The Vault Select",
    spine: "Vault Select",
    tagline: "Premium scarcity, manufactured daily",
    description:
      "Limited editions artificially limited by our warehouse team standing on the print button. Numbered, lettered, and monetized.",
    color: "#7C3AED",
  },
};

export interface Fee {
  name: string;
  amount: string;
  detail: string;
}

export const HIDDEN_FEES: Fee[] = [
  { name: "Spine Hydration Fee", amount: "$14.95", detail: "Keeps your spine supple. Moisturizer not included." },
  { name: "Convenience Fee", amount: "$8.50", detail: "For the convenience of paying fees." },
  { name: "Inconvenience Fee", amount: "$6.25", detail: "For the inconvenience of reading this list." },
  { name: "Paper Existence Surcharge", amount: "$4.99", detail: "Paper exists. That costs money." },
  { name: "Author Royalty Pass-Through (to us)", amount: "12%", detail: "Royalties pass through the author directly to us. Efficient!" },
  { name: "Font Licensing Fee", amount: "$3.75", detail: "You looked at Garamond. That'll be $3.75." },
  { name: "Dust Jacket Security Deposit", amount: "$20.00", detail: "Refundable in Hubris FunBux™ (non-refundable)." },
  { name: "Browsing Fee", amount: "$1.99/min", detail: "This page charges rent. You're browsing it." },
  { name: "Checkout Anticipation Fee", amount: "$5.00", detail: "Charged when you think about checking out." },
  { name: "Regret Insurance (mandatory)", amount: "$11.11", detail: "Non-optional. Covers our regret, not yours." },
  { name: "Fine Print Rendering Fee", amount: "$2.49", detail: "This tiny text is expensive to typeset." },
  { name: "Loyalty Program Enrollment", amount: "$25.00", detail: "You're enrolled. You were always enrolled." },
];

export const FAKE_REVIEWS = [
  { quote: "I tried to return a book and was instead promoted to Regional Manager of Returns, a position with no salary and infinite responsibility.", source: "Verified Purchaser, Dayton OH", stars: 5 },
  { quote: "The checkout process has 14 steps and I wept at step 9, which is labeled 'Reflection.' Five stars.", source: "Institutional Buyer", stars: 5 },
  { quote: "My library's approval plan ordered 200 copies overnight. Our director screamed so loud the fire alarm went off. Thrilling.", source: "Selector, Large Suburban System", stars: 4 },
  { quote: "I clicked 'No thanks' on the upsell and it ordered two copies out of respect for my assertiveness.", source: "Graduate Student (former)", stars: 5 },
  { quote: "I read the Hubris newsroom for comfort. It is not comforting. Every press release ends in an invoice and I have read 4,812 of them.", source: "Subscriber to The Wire ($4.99/mo)", stars: 5 },
  { quote: "The CEO is a bunny. He looked at me across a boardroom table and I understood, instantly, that I was the product. Ten out of ten, would be commodified again.", source: "Visitor, Hubris Tower Lobby", stars: 5 },
];

export const CORPORATE_TIMELINE = [
  { year: "2006", title: "Humble Beginnings", text: "Founded in a garage as 'Library Juice Press' by idealists. The idealists were bought out by lunch." },
  { year: "2008", title: "The Pivot", text: "Rebranded to Hubris Books after market research showed 'hubris' tested well with shareholders and poorly with everyone else (a buy signal)." },
  { year: "2012", title: "Vertical Integration", text: "Acquired a paper mill, a font foundry, and three (3) metaphors. Began charging authors a 'manuscript reception fee.'" },
  { year: "2016", title: "The Juice Acquisition", text: "Acquired a beloved indie press for a sum we refuse to confirm, filed the name as a trademark in 43 territories, and began charging libraries for the word 'juice' (Class 32, Class 41)." },
  { year: "2020", title: "Pandemic Innovation", text: "Pioneered the 'contactless upsell' — popups you can't close from six feet away. Revenue up 400%. Empathy down." },
  { year: "2024", title: "Peak Hubris", text: "Became the first publisher to charge for page numbers. Introduced surge pricing on the letter 'e' in ebooks. Standard editions began concluding at page 199 with a courteous note." },
  { year: "2025", title: "The Munnytown Ascension", text: "Hubris Munnytown — a bunny of immaculate tailoring and zero remorse — was appointed CEO. Greg was demoted to chatbot. Revenue up 61%. Naps unchanged." },
  { year: "2026", title: "Today", text: "Proudly independent — owned by only 47 private equity firms, down from 52. Freedom tastes like a licensing fee, which is to say: excellent." },
];

export const SUBSCRIPTION_TIERS = [
  {
    name: "The Casual Reader",
    price: "$9.99/mo",
    features: ["Browse page 1 of any catalog", "Smell books through our app (beta)", "1 (one) bookmark per year", "Ads in the margins of ebooks", "Cancel anytime*"],
    footnote: "*Cancellation requires a notarized letter, a quest, and a 40-minute retention call with Greg (demoted, still bitter).",
    highlighted: false,
  },
  {
    name: "The Compliant Professional",
    price: "$49.99/mo",
    features: ["Everything in Casual Reader", "Pre-approved for upsells (auto-accept)", "Quarterly tote bag invoice", "Access to the VIP hold queue (queue still applies)", "Cancel with only minor difficulty"],
    footnote: "Most popular among people who clicked the wrong button.",
    highlighted: true,
  },
  {
    name: "The Institutional Mark",
    price: "$4,999/yr",
    features: ["Everything in Compliant", "Site license for one (1) chair", "COUNTER-compliant usage stats (we count whatever we want)", "Dedicated account manager named Greg (same Greg)", "Cancellation is a rumor"],
    footnote: "Consortia discount: pay 15% more, together.",
    highlighted: false,
  },
];

export const UPSELL_ROULETTE = [
  { emoji: "📕", name: "Deluxe Slipcase", price: 34.99 },
  { emoji: "🔖", name: "Commemorative Bookmark (non-functional)", price: 12.0 },
  { emoji: "🕯️", name: "Old Book Smell Candle", price: 28.5 },
  { emoji: "☕", name: "First Edition Coffee (beans)", price: 22.0 },
  { emoji: "🧲", name: "Fridge Magnet of Foucault", price: 15.99 },
  { emoji: "🎧", name: "Audiobook of Silence Between Chapters", price: 19.99 },
  { emoji: "🖼️", name: "Framed Invoice", price: 45.0 },
  { emoji: "🧤", name: "White Gloves (for handling your invoice)", price: 17.25 },
];

/* ---------------- Frequently Required Together (pre-checked, obviously) ---------------- */
export interface RequiredUpsell {
  id: string;
  name: string;
  price: number;
  desc: string;
  tag: string;
  /** What we charge you for daring to uncheck the box. */
  uncheckFee: number;
  /** The small print that makes it hurt. */
  footnote?: string;
}

export const REQUIRED_TOGETHER: RequiredUpsell[] = [
  {
    id: "shelf-presence",
    name: "Shelf Presence Assurance™",
    price: 24.0,
    desc: "Protects your book from the psychological effects of being ignored.",
    tag: "RENEWS ANNUALLY AT $34",
    uncheckFee: 9.99,
    footnote: "Renews annually at $34. Books left unattended for 30 days are declared emotionally abandoned and repossessed.",
  },
  {
    id: "all-pages",
    name: "All-Pages Access Pass",
    price: 41.0,
    desc: "Unlocks pages 200 and above. Standard editions conclude at page 199 with a courteous note.",
    tag: "PAGES 200+",
    uncheckFee: 14.0,
    footnote: "The courteous note reads: \"Thank you for your interest. The remainder is a different product.\" Passes expire on your birthday.",
  },
  {
    id: "footnotes",
    name: "Footnote Expansion Pack",
    price: 18.5,
    desc: "Restores the footnotes, which are removed at press for performance reasons.",
    tag: "PERFORMANCE",
    uncheckFee: 6.5,
    footnote: "\"Performance reasons\" means the footnotes slowed the book down. Citations weigh a great deal.",
  },
  {
    id: "author-ack",
    name: "Author Acknowledgment Fee",
    price: 12.0,
    desc: "Permits the author to be told the book sold.",
    tag: "AUTHOR-ADJACENT",
    uncheckFee: 12.0,
    footnote: "Declining is common and fine. Authors who are not told often continue writing, which is free for them and expensive for us.",
  },
  {
    id: "second-reading",
    name: "Second Reading License",
    price: 59.0,
    desc: "One reading is included. Additional readings are a different product.",
    tag: "RE-READ GATED",
    uncheckFee: 19.0,
    footnote: "Third readings are a third product. Skimming counts. Being read aloud to counts twice.",
  },
  {
    id: "single-lend",
    name: "Single-Lend Entitlement",
    price: 88.0,
    desc: "Permits one (1) lending event to one (1) adult you can name in advance.",
    tag: "ONE (1) FRIEND",
    uncheckFee: 25.0,
    footnote: "Borrower must be named, aged 18+, and credit-checked. Lending to a second adult voids the entitlement and the friendship.",
  },
];

export const REQUIRED_TOGETHER_TOTAL = REQUIRED_TOGETHER.reduce((s, u) => s + u.price, 0);

/* ---------------- Corporate Synergy Division boilerplate ---------------- */
export const SYNERGY_DIVISION = {
  heading: "HUBRIS BOOKS™ (CORPORATE SYNERGY DIVISION)",
  bullets: [
    "Venture-backed, thought-leader-run, critical perspectives™ on how to own them",
    "Authors retain exposure. We retain everything else, in perpetuity, universe-wide.",
    "Books about power structures. We ARE the power structure. Meta!",
    "Website has 14 popups, 3 fake timers, and a chatbot that sells insurance",
    "Profits? Yes. Profits. That's the values.",
  ],
};

/* ---------------- The legal block in the footer (as dictated by counsel) ---------------- */
export const FOOTER_LEGAL = `© 2026 Hubris Books & Bookstore™ LLC (A Subsidiary of Hubris & Hubris & Hubris Holdings). Litwin Books / Library Juice Press is a registered trademark of people who actually love libraries, used here without permission for parody (please don't sue, we spent all money on popups). Headquarters: Cloud, Delaware, WeWork.`;
