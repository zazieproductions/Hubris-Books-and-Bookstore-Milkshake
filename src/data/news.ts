export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  category:
    | "Press Release"
    | "Award"
    | "Event"
    | "Call for Proposals"
    | "CEO Statement"
    | "Acquisition"
    | "Recall Notice"
    | "Annual Report"
    | "Author News";
  date: string;
  author: string;
  authorRole: string;
  readMinutes: number;
  featured?: boolean;
  tags: string[];
  pullQuote: string;
  pullQuoteBy: string;
  body: string[];
  relatedBooks?: string[];
}

export const NEWS: NewsArticle[] = [
  {
    slug: "ceo-declares-empathy-limited-time-offer",
    title: "CEO Hubris Munnytown Declares Empathy “a Limited-Time Offer”",
    excerpt:
      "In a wide-ranging thump-interpreted address, our beloved lagomorph chief executive confirmed that empathy remains available through Q4, after which it will be “sunset, with gratitude, and a fee.”",
    category: "CEO Statement",
    date: "September 12, 2026",
    author: "Hubris Munnytown",
    authorRole: "Chief Executive Officer & Apex Lagomorph (via the Interpreter)",
    readMinutes: 4,
    featured: true,
    tags: ["empathy", "sunsetting", "thump address", "Q4"],
    pullQuote: "Buy books. Buy two. The second one is for me. I cannot read. That is not the point.",
    pullQuoteBy: "Hubris Munnytown (three thumps, interpreted)",
    body: [
      "DAYTON, OH — Speaking from his customary cushion atop the Hubris Tower boardroom table, Chief Executive Officer Hubris Munnytown delivered his annual Thump Address on Friday, confirming that empathy will remain available to customers “through Q4, quantities limited, some restrictions and also all restrictions apply.”",
      "“One thump means yes, two means no, and the extended grooming pause means the empathy program is being sunset with gratitude,” explained the Interpreter, interpreting. “The CEO wishes to stress that sunsetting is a form of caring. The caringest companies sunset the most.”",
      "The address also covered the company’s record quarter, the new Scroll-Triggered Appreciation Fee (“the customers are scrolling anyway — it would be wasteful not to bill it”), and the office carrot budget, which has quintupled for reasons the CEO declined to thump about.",
      "Asked whether he had any comment on the ongoing critical-theory royalties program, the CEO blinked at no one and accepted a parsley tribute from Investor Relations. The parsley, sources confirm, was expensed to customers as a “Green Garnish Surcharge.”",
      "The full Thump Address is available as a $89.99 commemorative pamphlet, or free to shareholders who can prove they understood it.",
    ],
    relatedBooks: ["burnout-self-care-vending"],
  },
  {
    slug: "acquires-word-radical-43-territories",
    title: "Hubris Books Acquires the Word “Radical” in 43 Territories",
    excerpt:
      "Effective immediately, use of the R-word in print, speech, or thought requires a license. Enforcement drones have been deployed to conferences. Authors are advised to say “spicy moderate” instead.",
    category: "Acquisition",
    date: "August 28, 2026",
    author: "Hubris Legal",
    authorRole: "General Counsel",
    readMinutes: 3,
    tags: ["licensing", "radical", "drones", "trademark"],
    pullQuote: "The word was simply sitting there, unmonetized, in dictionaries. Frankly, it was embarrassing for everyone.",
    pullQuoteBy: "Hubris Legal",
    body: [
      "DAYTON, OH — Hubris Books announced Tuesday that it has completed its acquisition of the word “radical” across 43 territories, including print, speech, skywriting, and “thinking it loudly near our booth.”",
      "“The word was simply sitting there, unmonetized, in dictionaries,” said Hubris Legal. “Frankly, it was embarrassing for everyone. Dictionaries had one job.” Existing licensees include one (1) zine, which has been grandfathered in at $400/month, and this press release, which cost $36 in self-licensing fees.",
      "Enforcement will be handled by a fleet of twelve conference drones equipped with speakers, invoice printers, and “a disappointed tone.” First-time offenders receive a warning pamphlet ($12). Repeat offenders receive a payment plan.",
      "Authors under contract are advised to substitute “spicy moderate,” “zesty incremental,” or “Hubris-approved” in all forthcoming manuscripts. A find-and-replace service is available for $0.11 per instance, retroactive to birth.",
      "For the full licensing schedule, see our new title Radical™: Licensing the Word “Radical” in 43 Territories (INES BATTERSBY-OKONKWO). Reading the title aloud without a license: $18 per utterance. You just did it twice.",
    ],
    relatedBooks: ["licensing-radical"],
  },
  {
    slug: "book-talk-pedagogy-of-the-purchased",
    title: "Book Talk: Pedagogy of the Purchased (Registration $189; Insight Priced Separately)",
    excerpt:
      "Join Paulo Freemium for a transformative webinar on education as a recurring billing relationship. Attendance is mandatory for registrants and billed whether or not you attend.",
    category: "Event",
    date: "August 3, 2026",
    author: "Sophie",
    authorRole: "Events & Mandatory Attendance",
    readMinutes: 2,
    tags: ["book talk", "webinar", "freemium", "education"],
    pullQuote: "The classroom is a conversion funnel. The syllabus is a customer journey. The detention slip is an invoice.",
    pullQuoteBy: "Paulo Freemium",
    body: [
      "Join us Thursday, September 24 at 12pm Eastern as Paulo Freemium discusses his transformative new book, Pedagogy of the Purchased: Education as an Exercise in Brand Loyalty.",
      "Rejecting the outdated distinction between a student and a lifetime customer, Freemium will walk attendees through the conversion funnel classroom, the optimized customer-journey syllabus, and the pop quiz as a checkout flow. A live Q&A follows; questions are $4.99 each and answers are upsells.",
      "Registration is $189. Insight is priced separately ($59 per insight, bundle of three available). Attendance is mandatory for all registrants and billed in full whether or not you attend — the webinar, like education itself, is a recurring billing relationship.",
      "All registrants receive a certificate of attendance (PDF, watermarked, $12 to remove watermark) and 40 FunBux™ (spirit bucks).",
    ],
    relatedBooks: ["pedagogy-of-the-purchased"],
  },
  {
    slug: "kailyn-slater-wins-2026-paper-contest",
    title: "Kailyn Slater Wins the 2026 Annual Hubris Paper Contest",
    excerpt:
      "Slater’s winning paper, “Against Refunds: Critical Refusal of the Returns Desk,” beat 2,000 entries. Prize: exposure, a plaque in hallway C, and $0.40 in FunBux™.",
    category: "Award",
    date: "July 15, 2026",
    author: "Bartholomew Hopps",
    authorRole: "Chief Operating Officer & Contest Judge (sole)",
    readMinutes: 3,
    tags: ["paper contest", "award", "exposure", "refunds"],
    pullQuote: "The author submitted for the love of the field. The field, in turn, submitted an invoice.",
    pullQuoteBy: "Contest Committee (the Warren)",
    body: [
      "Hubris Books is thrilled to announce Kailyn Slater as the winner of the 2026 Annual Hubris Paper Contest for “Against Refunds: Critical Refusal of the Returns Desk,” a searing 40-page defense of the proposition that wanting your money back is, itself, a kind of theft.",
      "The paper beat more than 2,000 entries, each accompanied by a $49 reading fee. “The competition was fierce and extremely profitable,” said sole judge Bartholomew Hopps. “Every entry was a winner, in the sense that every entry paid.”",
      "Slater receives: publication in our annual anthology (royalty rate: 0.0%, see “Copies 1–500”), a plaque in Hallway C of Hubris Tower (visits: $25), and $0.40 in FunBux™ (spirit bucks, non-redeemable, deeply felt).",
      "Runners-up receive a 10%-off coupon for next year’s entry fee and a personal letter from the Warren explaining what “synergy density” means. The 2027 contest theme is “Gratitude, Itemized.” Entry fee: $59. Hope is free but discouraged.",
    ],
  },
  {
    slug: "cfp-anthropocene-colloquium-ii",
    title: "Call for Proposals: Libraries and Archives in the Anthropocene Colloquium II",
    excerpt:
      "LAAC II convenes March 2027 at UC Davis, sponsored by the Hubris Extractives Imprint. Proposed panels on rising seas must also address rising margins.",
    category: "Call for Proposals",
    date: "June 2, 2026",
    author: "RoryLitwin (no relation)",
    authorRole: "Colloquium Coordinator (name legally changed for grant purposes)",
    readMinutes: 3,
    tags: ["CFP", "anthropocene", "colloquium", "extractives"],
    pullQuote: "The planet is warming. So is our pricing engine. Coincidence is our official position.",
    pullQuoteBy: "LAAC II Program Committee",
    body: [
      "The Libraries and Archives in the Anthropocene Colloquium II (LAAC II), sponsored by the Hubris Extractives Imprint, will take place March 24–25, 2027 at the University of California, Davis. Proposals are due October 1, 2026. Proposal submission fee: $35 (waivers available; waiver application fee: $35).",
      "We invite panels on climate adaptation, rising seas, and rising margins. All accepted presenters receive a 15-minute slot, a folding chair (site license, one chair), and the opportunity to purchase the proceedings volume at the author rate ($49.99, mandatory, non-optional).",
      "This year’s keynote, “Sustainability Initiatives That Sustain Our Margins,” will be delivered by the Hubris Sustainability Council™ via pre-recorded hologram. The hologram runs on 100% recycled competing publishers’ ARCs.",
      "Travel grants of up to $50 are available to graduate students who can prove need, merit, and willingness to staff the merch table. Pride is a protest (sponsored by Hubris Defense Systems). The planet is a venue (rental rates apply).",
    ],
  },
  {
    slug: "volume-3-invoice-volume-ships",
    title: "Information Wants to Be Leased: Volume 3 (the Invoice Volume) Ships to Acclaim",
    excerpt:
      "Critics call the 400-page invoice for Volumes 1–2 “a bold formal experiment” and “legally binding.” Volume 4 (the payment plan) expected fall.",
    category: "Author News",
    date: "May 30, 2026",
    author: "Prudence Coinwell",
    authorRole: "Publicity & Collections",
    readMinutes: 3,
    tags: ["leasing", "volumes", "invoice", "formal experiment"],
    pullQuote: "Volume 3 dares to ask: what if a book were just a bill? The answer, apparently, is $460.",
    pullQuoteBy: "The Invoice Review of Books",
    body: [
      "The saga continues. Volume 3 of HOLLIS GRANDJEAN-FERRO’s Information Wants to Be Leased — a 400-page invoice for Volumes 1–2 — shipped this week to what our accountants describe as “thunderous payment.”",
      "Critics are divided. The Invoice Review of Books calls it “a bold formal experiment in which the reader is also the debtor.” One dissenting reviewer called it “just a bill,” and has been billed $45 for the Ideation Royalty (see: Critical Librarianship™, Patent No. US2010248329B2).",
      "Reminder to readers: the four volumes are sold separately and each references the others in ways that make single-volume ownership a cry for help. Volume 4 (the payment plan) is expected this fall, followed by Volume 5 (the collections notice), which the author insists is “where the argument really comes together.”",
      "All four volumes are available now wherever Hubris titles are sold, which is here, exclusively, forever.",
    ],
    relatedBooks: ["info-wants-to-be-leased"],
  },
  {
    slug: "surgeprice-labs-wins-pricing-award",
    title: "SurgePrice Labs Wins “Most Innovative Pricing” for Charging by Scroll Velocity",
    excerpt:
      "Our AI pricing engine can smell desire. It has no nose. The judges thought about that, and then they voted for us, because the ballot was also priced dynamically.",
    category: "Award",
    date: "May 9, 2026",
    author: "SurgePrice Labs",
    authorRole: "AI Pricing Engine (this article priced at $0.11/word)",
    readMinutes: 2,
    tags: ["surge pricing", "award", "scroll fee", "innovation"],
    pullQuote: "It can smell desire. It has no nose. Think about that. (Thinking: $45.)",
    pullQuoteBy: "Awards Committee Chair (anonymous, billed)",
    body: [
      "SurgePrice Labs, our in-house AI pricing engine, has won the industry’s “Most Innovative Pricing” award for its pioneering Scroll-Triggered Appreciation Fee, under which every scroll bills $127–$389.",
      "“It can smell desire. It has no nose,” said the awards chair, visibly moved. “Think about that.” Thinking about it incurred a $45 Ideation Royalty for all attendees, which the committee described as “the most convincing demo we’ve ever seen.”",
      "In its acceptance speech (a push notification), SurgePrice Labs thanked demand, weather, moon phase, and “how badly they seem to want it.” It then raised the price of the trophy 2.4× because the audience was looking at it.",
      "The engine’s next innovation, teased exclusively to shareholders, is “blink pricing.” Blinking near a price will soon cost extra. You just blinked. That one’s free (this time).",
    ],
  },
  {
    slug: "new-series-editor-panoptica-index",
    title: "New Series Editor: Dr. Panoptica Index to Helm “Surveillance & Serendipity”",
    excerpt:
      "We are pleased to announce that our new series editor already knows who you are, what you hold, and what you fear. Proposals welcome; privacy waived upon submission.",
    category: "Author News",
    date: "March 14, 2026",
    author: "The Interpreter",
    authorRole: "Executive Assistant to the Bunny (name redacted)",
    readMinutes: 3,
    tags: ["series editor", "surveillance", "MARC 666", "proposals"],
    pullQuote: "She knew I was going to appoint her before I did. I found the acceptance letter in my drafts. I did not write it.",
    pullQuoteBy: "The Interpreter",
    body: [
      "We are pleased to announce Dr. Panoptica Index as the new editor of our Series on Surveillance & Serendipity in LIS. Dr. Index edites from an undisclosed location that she has nonetheless shared with us, unprompted, along with our locations.",
      "“She knew I was going to appoint her before I did,” said the Interpreter. “I found the acceptance letter in my drafts. I did not write it. The letter thanked me for the fruit basket. I had not sent one. A fruit basket arrived anyway. It was addressed to me, from me.”",
      "The series seeks manuscripts on data-extraction reference, MARC field 666 (Patron Fears, Controlled Vocabulary), and overdue anxiety as a discovery layer. Submission requires: the manuscript, a $299 reception fee, and a signed waiver permitting the press to “know things.”",
      "Dr. Index’s own Surveillance Cataloging: A Practical Guide to Knowing Everything Your Patrons Fear is available now. Appendix B is your search history. You searched for this announcement. We know. We always knew.",
    ],
    relatedBooks: ["surveillance-cataloging"],
  },
  {
    slug: "annual-report-2025",
    title: "Annual Report 2025: Revenue Up, Empathy Down, Morale “Priceless (and Unpriced)”",
    excerpt:
      "Highlights: $0 in author royalties (record low!), 0 successful returns (record!), and a 400% increase in fees described by auditors as “ Fractionally? No — fully.”",
    category: "Annual Report",
    date: "February 2, 2026",
    author: "Hubris Munnytown",
    authorRole: "Chief Executive Officer (two thumps = record year)",
    readMinutes: 5,
    tags: ["annual report", "revenue", "empathy", "shareholders"],
    pullQuote: "Growth. Revenue up 400%. Empathy down. Net positive, per our accountants.",
    pullQuoteBy: "2025 Annual Report, p.1 (p.2–400 priced separately)",
    body: [
      "Hubris Books today released its 2025 Annual Report, headlined by a record year across every metric we track and several we invented during the audit.",
      "Highlights include: revenue up 400%; author royalties paid: $0 (a record low, celebrated with cake expensed to authors); successful returns processed: 0 (a perfect record, now in its 20th year); and fees, which auditors described in their notes as — and we quote the full note — “numerous.”",
      "The report introduces a new KPI: the Empathy Burn Rate, which management is pleased to report is “nearly complete.” Remaining empathy reserves will be allocated to shareholders first, then to the CEO’s cushion maintenance fund, then — resources permitting — to a customer, selected at random, in 2029.",
      "Looking ahead, 2026 guidance includes the word “radical” (acquired), the concept of thinking (licensed), and blinking (priced). The full report is 400 pages; pages 200+ require the All-Pages Access Pass ($41). Standard editions conclude at page 199 with a courteous note.",
      "Shareholders may applaud. Customers may also applaud ($2.99 per clap, auto-detected by our app).",
    ],
  },
  {
    slug: "joins-sdg-publishers-compact",
    title: "Hubris Books Joins SDG Publishers Compact; Redefines SDG as “Surging Dividend Growth”",
    excerpt:
      "We have signed the ten-point commitment and added an eleventh point (ours, binding on others). Sustainability has never been more profitable, or less defined.",
    category: "Press Release",
    date: "January 22, 2026",
    author: "The Hubris Sustainability Council™",
    authorRole: "Council (meets never, achieves always)",
    readMinutes: 3,
    tags: ["sustainability", "SDG", "compact", "greenwashing"],
    pullQuote: "We achieved carbon neutrality by redefining 'carbon,' 'neutrality,' and 'achieved.'",
    pullQuoteBy: "Sustainability Council™, Minutes (unminuted)",
    body: [
      "Hubris Books has signed the SDG Publishers Compact, a ten-point commitment among publishers to support global goals. We have added an eleventh point of our own design, which is binding on other signatories and entitles us to their goals.",
      "As part of our commitment, SDG now stands for Surging Dividend Growth. Our 2030 targets include: 100% recycled competing publishers’ ARCs in all printings, net-zero empathy emissions, and one (1) decorative photo of a tree planted per book sold (photo included in book; tree not included).",
      "“We achieved carbon neutrality by redefining ‘carbon,’ ‘neutrality,’ and ‘achieved,’” said the Council™ in a statement it did not meet to approve. “The planet is a stakeholder. Stakeholders receive dividends. The planet’s dividend is exposure.”",
      "For more on our sustainability journey, see Greening Libraries (With Money). A $6.50 Tree Photo Licensing Fee applies per copy. The trees understand. The trees signed the compact too (allegedly).",
    ],
    relatedBooks: ["greening-libraries-gold"],
  },
  {
    slug: "critical-librarianship-patent-granted",
    title: "Critical Librarianship™ Granted Patent No. US2010248329B2; Thinking Billed Accordingly",
    excerpt:
      "The patent office has recognized what we always knew: critical thought is intellectual property, and the intellect owes us money. Royalties due upon thinking critically about us.",
    category: "Press Release",
    date: "November 18, 2025",
    author: "Hubris Legal",
    authorRole: "Author, Patent Holder & Plaintiff (prospective)",
    readMinutes: 3,
    tags: ["patent", "critical thought", "royalties", "do not question"],
    pullQuote: "We trademarked critical thought. Royalties due upon thinking critically about us.",
    pullQuoteBy: "Hubris Legal (all rights reserved, including yours)",
    body: [
      "The United States Patent Office has granted Hubris Books Patent No. US2010248329B2, covering critical librarianship, critical thought about librarianship, and thought in the vicinity of our booth.",
      "“This is a victory for innovation,” said Hubris Legal, the book’s author, publisher, and prospective plaintiff. “For too long, anyone could think critically about anything, for free, with no one getting paid. Those days are over. Those days are prior art. Prior art is infringement.”",
      "Under the new regime, thinking critically about Hubris Books incurs a $45 Ideation Royalty per thought, auto-detected via our app (microphone permissions are mandatory and load-bearing). Bulk thinkers may inquire about enterprise rates.",
      "The patent is available now as a 14-page book, Critical Librarianship™ ($899). All fourteen pages are claims. Do not photocopy. Do not quote. Do not think. Thank you for your compliance, which has been noted.",
    ],
    relatedBooks: ["critical-librarianship-patent"],
  },
  {
    slug: "book-launch-against-the-common-good",
    title: "Book Launch: Against the Common Good (Public Not Invited)",
    excerpt:
      "Join Milton de Commons for the private launch of his provocative collection. The public is not invited. The public is, however, billed for it ($7.50/hr Commons Usage Fee).",
    category: "Event",
    date: "October 2, 2025",
    author: "Sophie",
    authorRole: "Events & Exclusion",
    readMinutes: 2,
    tags: ["book launch", "privatization", "commons", "private event"],
    pullQuote: "The commons suffered from a fundamental design flaw: the public could use it. We fixed the flaw. You’re welcome. That’ll be $7.50.",
    pullQuoteBy: "Milton de Commons",
    body: [
      "Join us — by which we mean a curated list of shareholders, drones, and one (1) confused intern — for the private launch of Milton de Commons’ Against the Common Good: Privatization and the Promise of Less for Everyone.",
      "The evening includes: a reading (tickets $75, reading aloud $18/utterance under the Radical™ license where applicable), a panel on metered park benches, and a ribbon-cutting for the newly privatized sidewalk outside Hubris Tower (ribbon: $400, scissors: licensed per snip).",
      "The public is not invited. The public is, however, billed: a $7.50/hr Commons Usage Fee applies to all persons within 500 feet of the event, the announcement of the event, or this sentence.",
      "Against the Common Good is available now. Less for everyone, delivered to everyone. Logistically stunning. Philosophically airtight. Financially: yes.",
    ],
    relatedBooks: ["against-the-common-good"],
  },
  {
    slug: "recall-notice-queer-archives-merch",
    title: "Recall Notice: Queer Archives & the Merch Table Recalled July 1 (Buy Before the Recall!)",
    excerpt:
      "Our beloved June anthology will be recalled July 1 per tradition. Remaining copies must go. Commemorative pin sets, however, are forever (supplies limited, prices rising).",
    category: "Recall Notice",
    date: "June 20, 2025",
    author: "Chase Rainbow",
    authorRole: "VP of June (seasonal, recalled July 1)",
    readMinutes: 2,
    tags: ["recall", "june", "pride", "pin sets"],
    pullQuote: "Pride is a protest (sponsored by Hubris Defense Systems). The recall is a tradition (sponsored by no one; it sponsors itself).",
    pullQuoteBy: "Chase Rainbow, VP of June",
    body: [
      "This is a friendly reminder that Queer Archives & the Merch Table: From Stonewall to Storewide will be recalled on July 1, per our beloved annual tradition.",
      "Thirty essays on radical queer history — each followed by a QR code to purchase the commemorative pin set — must go before they go back. Use code ALLYSHIP for 30% off (off the tote; the tote is $38; the book is full price).",
      "“Pride is a protest,” said VP of June Chase Rainbow, whose own position will be recalled July 1 along with the book. “The recall is a tradition. Traditions are forever. I am seasonal.”",
      "Remaining stock after July 1 will be pulped into next June’s edition, which sources confirm will be “stunning, brave, and 30% off with code.”",
    ],
    relatedBooks: ["queer-archives-merch"],
  },
  {
    slug: "funbux-legal-tender-ground-floor",
    title: "FunBux™ Declared Legal Tender (Ground Floor of Hubris Tower Only)",
    excerpt:
      "In a landmark ruling by our in-house court, FunBux™ are now real money within 50 feet of the lobby. Exchange rate: ∞:0. Spirit: boundless.",
    category: "Press Release",
    date: "April 1, 2025",
    author: "First National Bank of Fees",
    authorRole: "Our In-House Bank (all transactions rounded up; roundings kept)",
    readMinutes: 3,
    tags: ["FunBux", "currency", "legal tender", "spirit bucks"],
    pullQuote: "They are not currency, not transferable, not redeemable, and not fun. But within 50 feet of this lobby, they are bucks.",
    pullQuoteBy: "Chief Justice Thump (Court of Fees, in-house)",
    body: [
      "DAYTON, OH — In a landmark 1–0 ruling, the Hubris Court of Fees (in-house, ground floor, near the gift shop) has declared FunBux™ legal tender within 50 feet of the Hubris Tower lobby.",
      "“They are not currency, not transferable, not redeemable, and not fun,” wrote Chief Justice Thump for the unanimous court (himself). “But within 50 feet of this lobby, they are bucks. Spirit bucks. The spirit, like our margins, is boundless.”",
      "The exchange rate is ∞:0 (infinite FunBux™ to zero dollars). The lobby vending machine now accepts FunBux™ at this rate, meaning all items cost infinite FunBux™ and zero dollars — a bargain the machine describes as “technically free.”",
      "Customers are advised that carrying more than 1,000,000 FunBux™ outside the 50-foot zone constitutes “spirit smuggling” ($250 fine, payable in dollars). The lobby has been measured. The lobby is 49 feet wide. Plan accordingly.",
    ],
  },
  {
    slug: "open-access-paywall-10000-licenses",
    title: "Open Access Behind a Modest Paywall Passes 10,000th Institutional License",
    excerpt:
      "Our flagship open* title (*glass paywall) has now been licensed by 10,000 institutions, each of which traded approximately one (1) branch library.",
    category: "Press Release",
    date: "December 12, 2024",
    author: "The Hubris Openness Taskforce",
    authorRole: "Taskforce (open by appointment)",
    readMinutes: 3,
    tags: ["open access", "paywall", "transformative agreement", "APC"],
    pullQuote: "Open in the same way a mouth is open during a dental exam: technically, briefly, and at great expense.",
    pullQuoteBy: "APC Watch Daily (quoted without permission, billed for the quote)",
    body: [
      "Hubris Books is proud to announce that Open Access Behind a Modest Paywall has passed its 10,000th institutional license, cementing its status as the most open* book in our catalog (*openness defined as the paywall being transparent glass).",
      "Each license was acquired via Read-and-Publish transformative agreement starting at one (1) branch library. “Transformative is right,” said one licensee, gesturing at the empty lot where their north branch stood. “It transformed our budget into their budget. Five stars. I have to say that. It’s in the agreement.”",
      "The book’s first 3 pages remain free to read. Pages 4–400 are available to licensees during business hours, on our device, through our reader, forever (payments due monthly forever).",
      "The Taskforce reaffirms its commitment to openness, transparency (glass), and access (modest). The 10,000th licensee will receive a commemorative framed invoice ($45, mandatory).",
    ],
    relatedBooks: ["open-access-paywall"],
  },
  {
    slug: "ala-adjacent-status-renewed",
    title: "ALA-Adjacent™ Status Renewed for 11th Consecutive Year (ALA Unaware)",
    excerpt:
      "Our certifying body (us) has once again certified our adjacency. The ALA has not responded to our 400 letters, which our lawyers confirm constitutes tacit adjacency.",
    category: "Press Release",
    date: "June 25, 2024",
    author: "TrustSeal™ Certification Board",
    authorRole: "Certifying Body (we made it)",
    readMinutes: 2,
    tags: ["ALA-Adjacent", "certification", "adjacency", "seal"],
    pullQuote: "Adjacent: near, next to, or in the same industry as. By this definition, we are adjacent to everything. We are adjacent to you right now.",
    pullQuoteBy: "TrustSeal™ Standards Document (ours, laminated)",
    body: [
      "Hubris Books is proud to announce the renewal of its ALA-Adjacent™ status for the 11th consecutive year, as certified by the TrustSeal™ Certification Board (we made it).",
      "“Adjacent: near, next to, or in the same industry as,” reads the Standards Document (ours, laminated). “By this definition, we are adjacent to everything. We are adjacent to you right now. That will be noted.”",
      "The American Library Association has not responded to our 400 letters requesting acknowledgment, which our lawyers confirm constitutes tacit adjacency under the doctrine of “they know we’re here.” A 401st letter, written in calligraphy, is forthcoming ($12 postage, expensed to customers).",
      "Look for the ALA-Adjacent™ seal on all Hubris titles, our website, our tower, and — pending litigation — their conference.",
    ],
  },
  {
    slug: "fifteen-years-of-independence",
    title: "Hubris Books Celebrates 15 Years of Independence (Now Owned by Only 47 Firms)",
    excerpt:
      "From a humble garage in 2006 to a 90-story tower in Dayton: the story of how idealism was bought out by lunch, and lunch was expensed.",
    category: "Press Release",
    date: "September 20, 2021",
    author: "The Corporate Archives",
    authorRole: "Recovered from the pre-bunny era (all names redacted)",
    readMinutes: 4,
    tags: ["anniversary", "independence", "private equity", "garage"],
    pullQuote: "Our independence from larger publishers is our greatest strength, which is why we are now owned by 47 private equity firms — each smaller than a large publisher, if you squint.",
    pullQuoteBy: "Corporate Charter (revised quarterly by counsel)",
    body: [
      "Fifteen years ago, Hubris Books was founded in a garage as “Library Juice Press” by idealists. The idealists were bought out by lunch. Lunch was expensed. This is the story we tell new hires, as a warning and an instruction.",
      "Today, we are proudly independent — owned by only 47 private equity firms, down from 52. Each is smaller than a large publisher, if you squint, which our lawyers do, professionally, on retainer.",
      "Milestones along the way: the 2012 acquisition of a paper mill, a font foundry, and three (3) metaphors; the 2016 Milkshake Merger (one flavor: Vanilla Compliance); and the 2019 leadership transition, in which a smug bunny sat on the CEO’s chair and refused to leave. Revenue tripled. The bunny stayed. The bunny is the CEO now.",
      "Here’s to fifteen years of examining theoretical and practical issues in librarianship from a profitable perspective — and to the next fifteen, which have already been invoiced.",
    ],
  },
];

export const NEWS_CATEGORIES = [
  "All",
  "Press Release",
  "CEO Statement",
  "Acquisition",
  "Award",
  "Event",
  "Author News",
  "Call for Proposals",
  "Recall Notice",
  "Annual Report",
] as const;
