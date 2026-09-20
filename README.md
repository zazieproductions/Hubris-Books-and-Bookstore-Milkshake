# Hubris Books & Bookstore™

A parody e-commerce site for the world's most dependent scholarly publisher — a subsidiary of
**Hubris & Hubris & Hubris Holdings**, led by **Hubris Munnytown, Chief Executive Rabbit**.

Everything here is a joke about paywalls, fees, pre-checked boxes, and consent banners. Nothing ships.
Litwin Books / Library Juice Press is a registered trademark of people who actually love libraries, used
here without permission for parody.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

The dev server binds `0.0.0.0` and allows any host, so it works behind a proxy/preview tunnel.

## The mechanics (all deliberate)

| Mechanic | Where | What it does |
| --- | --- | --- |
| **The Browsing Fee** | `src/store/ShopContext.tsx` → `BrowsingMeter` in `src/components/chrome.tsx` | Scroll-metered. Every qualifying scroll event adds **$100–$400 × an escalation factor** (up to ×12, rising the more you scroll), plus a $1.99/min drip while you sit still. It has never gone down. Floating `+$300` deltas pop over the header readout, and the fee is itemized in the cart, the checkout, and the invoice at the end of every newsroom article. |
| **The Consent Stack** | `src/data/consent.ts`, `CookieBanner` in `chrome.tsx` | 11,722 trackers across 12 categories (Biometric Enthusiasm Detection, Predictive Regret Modeling, Grief Monetization, Subconscious Retargeting (Dream Ads), Organ Donor Adjacency, Munnytown's Personal Sniffing Cookies…). The banner appears **once**, then your decision is stored in `localStorage` and never re-asked; the footer can show your consent receipt or re-arm it for a $25 filing fee. "Reject" takes 7 clicks, dodges the cursor, and costs $49.99. Toggles in the preference panel snap back on. The retention modal fires at most once per visit and never on top of the consent banner. |
| **Frequently Required Together** | `REQUIRED_TOGETHER` in `src/data/books.ts` | Six pre-checked items — Shelf Presence Assurance™ ($24, renewing at $34), All-Pages Access Pass ($41), Footnote Expansion Pack ($18.50), Author Acknowledgment Fee ($12), Second Reading License ($59), Single-Lend Entitlement ($88) — $242.50 total. They are pre-checked on the book page, in the cart, and at checkout step 6. Declining one adds a Decline Fee; declining all six adds six; a minimum of two must stay checked; and any item you decline re-checks itself four seconds later "because our systems detected a mis-click." |
| **The Synergy Wire (newsroom)** | `src/data/news.ts`, `src/pages/News.tsx`, `src/pages/NewsArticle.tsx` | 30 dated releases spanning 2006–2026 across 10 desks (CEO's Desk, Press Releases, Awards & Contests, Calls for Proposals, Events & Webinars, Acquisitions, Legal & Trademark Notices, Financial Results, Corrections & Retractions, Catalogs & Fee Schedules), with bylines, an archive back to 2006, a press kit where every item is priced, upcoming events with attendance fees, media clippings, a corrections policy, and per-article reading meters and invoices. |

## Routes

```
/                 home — hero (no shimmer bar), CEO rabbit, new & notable, imprints,
                  surge-priced trending, newsroom preview, Corporate Synergy Division
/catalog          26 titles, filters, price ceiling, search billed at $0.11
/book/:id         cover, patent panels, Frequently Required Together, 1-Click Doom Purchase
/cart             fees itemized, required-together management, live browsing fee in the total
/checkout         11 steps: cart, account, shipping, gifts, insurance, REQUIRED TOGETHER,
                  donation, surprise upsells, payment, reflection, confirmation
/news             the Synergy Wire (filters by desk and year, search, load-more for $4.99)
/news/:slug       a release, with reading meter, invoice, related titles, comments disabled
/bestsellers      the Hubris 10, ranked by revenue, labeled by merit
/authors          submission fee, royalty calculator, investment tiers
/loyalty          FunBux™ tiers and memberships that cannot be cancelled
/about            empire, timeline, leadership (one rabbit, four functions, a chatbot), subsidiaries
/faq              help center + Greg, who sells insurance
/terms            Terms of Servitude, v4,812, 17 sections
```

## Notable titles

*Information Wants to Be Leased: A Rebuttal in Four Volumes, Sold Separately* (Hollis Grandjean-Ferro) ·
*Cataloging Your Feelings: A Dewey Decimal Approach to Repression* · *Critical Librarianship™* (a book that is
just a patent — Patent No. US2010248329B2, Do Not Question) · *Radical Cataloging™: Licensing the Word "Radical"
in 43 Territories* (Ines Battersby-Okonkwo) · *Pedagogy of the Purchased* (Paulo Freemium) · *Against the Common
Good* (Milton de Commons) · *Surveillance Cataloging* (Dr. Panoptica Index) · *Metadata for Landlords*.

## Stack

React 19 + TypeScript + Vite + Tailwind v4 + react-router v7 + framer-motion + lucide-react.
State lives in a single `ShopContext`. Images are in `public/images/`.
