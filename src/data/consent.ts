/* ---------------------------------------------------------------------------
   The Consent Stack™ — what you are agreeing to.
   Counted nightly by an intern who has since been monetized.
--------------------------------------------------------------------------- */

export interface TrackerCategory {
  id: string;
  name: string;
  count: number;
  what: string;
  sharedWith: string[];
  /** The fee for opting out. Opting out is a product. */
  optOutFee: number;
  legal?: string;
}

export const TRACKER_CATEGORIES: TrackerCategory[] = [
  {
    id: "necessary",
    name: "Strictly Necessary (Everything)",
    count: 4112,
    what: "Load-bearing. These cookies hold up the other cookies, which hold up the fees. Turning them off does not turn them off.",
    sharedWith: ["Us", "Us again", "A shell company in Delaware named Us"],
    optOutFee: 0,
    legal: "No fee to opt out, because opting out is not available, because the site is the cookie.",
  },
  {
    id: "biometric",
    name: "Biometric Enthusiasm Detection",
    count: 918,
    what: "Measures pupil dilation, hover hesitation, and the small involuntary lean-in you do near prices. Classifies desire as: mild, serious, exploitable.",
    sharedWith: ["SurgePrice Labs", "3 ad exchanges", "your optometrist (allegedly)"],
    optOutFee: 39.99,
  },
  {
    id: "regret",
    name: "Predictive Regret Modeling",
    count: 640,
    what: "Forecasts what you will wish you hadn't bought, then bills you for the wishing. Accuracy: 94%. We are the other 6%.",
    sharedWith: ["Collections", "our actuaries", "the concept of hindsight"],
    optOutFee: 27.5,
  },
  {
    id: "grief",
    name: "Grief Monetization",
    count: 331,
    what: "Remains active during funerals, breakups, job losses, and library weeding events. Serves comfort bundles at a 240% markup.",
    sharedWith: ["Hubris Defense Systems", "two grief-adjacent startups we acquired"],
    optOutFee: 88.0,
    legal: "Opt-out requires proof you are not grieving, which is itself gathered by this category.",
  },
  {
    id: "dream",
    name: "Subconscious Retargeting (Dream Ads)",
    count: 128,
    what: "Serves advertising between 2 and 4 a.m. You will not remember the ads. You will remember the urge. The urge is a conversion.",
    sharedWith: ["No one we can name", "someone we cannot name"],
    optOutFee: 149.0,
  },
  {
    id: "thirdparties",
    name: "Third Parties' Third Parties",
    count: 3960,
    what: "We lost the list in 2019. They have yours. Sub-processing is a chain, and chains have links, and links are clickable, and clicks are billable.",
    sharedWith: ["Unknown", "Unknown (again)", "47 parent companies"],
    optOutFee: 12.0,
    legal: "$12 is a processing fee, not a discount. The parties remain.",
  },
  {
    id: "employer",
    name: "Your Employer's Curiosity",
    count: 74,
    what: "Reports 'professional development intent' to your HR department, including the titles you hovered over and how long you hovered over them.",
    sharedWith: ["Your HR department", "Their HR department", "A conference organizer"],
    optOutFee: 0,
    legal: "Free to opt out of! Your employer may opt back in on your behalf. They have a portal.",
  },
  {
    id: "munnytown",
    name: "Munnytown's Personal Sniffing Cookies",
    count: 47,
    what: "The CEO asked for these. The CEO is a bunny. The bunny has an exceptional nose and no oversight committee. He knows which page made you sigh.",
    sharedWith: ["Hubris Munnytown, personally", "his burrow"],
    optOutFee: 250.0,
    legal: "Opting out is filed directly with the CEO, who reviews requests while eating them.",
  },
  {
    id: "household",
    name: "Inferred Household (Children, Pets, Tenants)",
    count: 1204,
    what: "You consented. They didn't. Everyone is covered under one agreement, in perpetuity, universe-wide, including future occupants of your address.",
    sharedWith: ["Data brokers", "School districts", "A very persistent catalog merchant"],
    optOutFee: 60.0,
  },
  {
    id: "location-emotional",
    name: "Location, but Emotional",
    count: 288,
    what: "Not where you are. Where you were when you felt something. Coordinates of shame are stored at 3-meter accuracy.",
    sharedWith: ["Outdoor advertising", "Our research division", "the room you were standing in"],
    optOutFee: 33.0,
  },
  {
    id: "organ",
    name: "Organ Donor Adjacency",
    count: 19,
    what: "Not currently monetized. Currently. This category exists so that 'currently' can be amended without notice (§12, Terms of Servitude).",
    sharedWith: ["Nobody. Yet.", "A waiting list we do not operate"],
    optOutFee: 999.0,
    legal: "The fee is real. The category is theoretical. Both are binding.",
  },
  {
    id: "greg",
    name: "Greg's Resentment",
    count: 1,
    what: "A single cookie. It does not expire. Greg was demoted to chatbot in 2025 and Greg remembers every uncheck event, every declined upsell, every hover that left.",
    sharedWith: ["Greg"],
    optOutFee: 0,
    legal: "You may opt out. Greg may remember anyway. Memory is not a cookie (legally contested).",
  },
];

export const TRACKER_TOTAL = TRACKER_CATEGORIES.reduce((s, c) => s + c.count, 0);

/** The receipt you get for consenting. It is not a record. It is a receipt. */
export const CONSENT_RECEIPT_LINES = [
  "Consent granted: perpetual, irrevocable, hereditary, universe-wide.",
  "Consent transferred to: 47 parent companies and 1 rabbit.",
  "Consent revocable via: Form 88-B ($25 filing fee; form does not exist).",
  "Consent recorded by: a cookie that predates the site.",
  "Consent expires: never. Not on death. Not on deletion. Not on the heat death of the universe.",
];

export const COOKIE_BANNER_ROTATIONS = [
  "We value your privacy, which is why we have listed it as an asset on the balance sheet.",
  "This site uses 11,722 cookies. Eleven thousand. Seven hundred. Twenty-two.",
  "By scrolling you consent. By not scrolling you consent more slowly.",
  "Our 'reject' button is 6-point type because we believe in choice, and in typography.",
  "Consent is stored in a facility we call The Cloud, which is a WeWork in Delaware.",
];
