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
}

export const BOOKS: Book[] = [
  {
    id: "neoliberal-cataloging",
    title: "Neoliberal Cataloging",
    subtitle: "Monetizing the MARC Record in an Age of Relentless Growth",
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
    subtitle: "A Critical Approach to Punishing Poverty, Lovingly",
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
    title: "Greening Libraries (With Money)",
    subtitle: "Sustainability Initiatives That Sustain Our Margins",
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
    title: "Radical Cataloging: Compliance Edition",
    subtitle: "From 'Question Authority Records' to 'The Authority Records Have Questions for You'",
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
    subtitle: "Wellness Strategies Priced by the Granola Bar",
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
    subtitle: "A KonMari Method for Discarding Books Directly Into Our Resale Pipeline",
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
    subtitle: "Approval Plans, Demand-Driven Acquisition, and Panic",
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
    subtitle: "Your Archives Are Safe Forever (Payments Due Monthly Forever)",
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
    name: "Bookstore Milkshake",
    tagline: "Books for librarians with a purchasable edge™",
    description:
      "Our flagship imprint, specializing in theoretical and practical issues in librarianship from a profitable perspective, for an audience of professional librarians and students of library science who have already entered their card details.",
    color: "#FF6FA5",
  },
  hubris: {
    name: "Hubris Books",
    tagline: "Independently owned by a consortium of 47 private equity firms",
    description:
      "The parent imprint, publishing scholarly books about media, communication, libraries, and related historical topics — now with dynamic surge pricing on history.",
    color: "#C9A227",
  },
  synergy: {
    name: "Synergy Chapbooks",
    tagline: "Disrupting pamphlets",
    description:
      "Short-form works on innovation, wellness, and programming, each under 200 pages and over $60. Efficiency!",
    color: "#0E7490",
  },
  vault: {
    name: "The Vault Select",
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
  { quote: "The milkshake at the flagship store costs $19 and tastes like a late fee. I drink one every day. I have no choice.", source: "Flagship Café Regular", stars: 5 },
];

export const CORPORATE_TIMELINE = [
  { year: "2006", title: "Humble Beginnings", text: "Founded in a garage as 'Library Juice Press' by idealists. The idealists were bought out by lunch." },
  { year: "2008", title: "The Pivot", text: "Rebranded to Hubris Books after market research showed 'hubris' tested well with shareholders and poorly with everyone else (a buy signal)." },
  { year: "2012", title: "Vertical Integration", text: "Acquired a paper mill, a font foundry, and three (3) metaphors. Began charging authors a 'manuscript reception fee.'" },
  { year: "2016", title: "The Milkshake Merger", text: "Merged with Bookstore Milkshake, a beloved indie café-publisher. The café now serves one shake: Vanilla Compliance." },
  { year: "2020", title: "Pandemic Innovation", text: "Pioneered the 'contactless upsell' — popups you can't close from six feet away. Revenue up 400%. Empathy down." },
  { year: "2024", title: "Peak Hubris", text: "Became the first publisher to charge for page numbers. Introduced surge pricing on the letter 'e' in ebooks." },
  { year: "2026", title: "Today", text: "Proudly independent — owned by only 47 private equity firms, down from 52. Freedom tastes like Vanilla Compliance." },
];

export const SUBSCRIPTION_TIERS = [
  {
    name: "The Casual Reader",
    price: "$9.99/mo",
    features: ["Browse page 1 of any catalog", "Smell books through our app (beta)", "1 (one) bookmark per year", "Ads in the margins of ebooks", "Cancel anytime*"],
    footnote: "*Cancellation requires a notarized letter, a quest, and a 40-minute retention call with Greg.",
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
