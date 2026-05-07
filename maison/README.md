# MAISON · Intent Card Editions

This directory contains the build system for generating MAISON Intent Card static HTML files in two editions: **Partnership** and **Catalogue**.

## Naming Canon

**MAISON** = the card name (specific, branded, beautiful)
**MAISON · PARTNERSHIP EDITION** = the collaboration version (editioned per partner)
**MAISON · CATALOGUE** = the open commercial version (anyone can buy)

Both labeled `intent card · symi` in the masthead.

Future cards in the catalog get their own names (PROMESSE, CHANTIER, etc.) — not numbers.

## Directory Structure

```
maison/
├── partners/               # Partner data JSON files
│   ├── natali.json        # Natali partnership data
│   └── hegetfunds.json    # Hegetfunds partnership data
├── build-partners.js       # Build script for static HTML generation
├── maison-natali.html     # Generated: Natali partnership edition
├── maison-hegetfunds.html # Generated: Hegetfunds partnership edition
├── maison-catalogue.html  # Generated: Catalogue edition
└── README.md              # This file
```

## Edition Differences

### Partnership Edition (`/partnership/[partner]`)

**Masthead:**
```
MAISON. · SYMI × NATALI ······ partnership edition
                                intent card · symi
```

**Hero:**
> A €50M maison, built on the distribution Natali already owns.

**Features:**
- Partner-specific math (audience reach, conversion, retention)
- Customizable slider defaults per partner
- Partner role description in distribution × build section
- "For {Partner Name}" in footer

**Template Variables** (from `partners/{partner}.json`):
- `name` — Partner display name
- `roleDescription` — What the partner brings (1 sentence)
- `audienceReach` — Number (e.g., 361000)
- `conversionRate` — Percent (e.g., 1.5)
- `avgValue` — Euros (e.g., 290)
- `retention` — Months (e.g., 14)
- `ceiling` — Millions (e.g., 50)

### Catalogue Edition (`/catalogue`)

**Masthead:**
```
MAISON. ······ intent card · symi · catalogue
```

**Hero:**
> Stop selling content. Sell systems.
> A live read for any founder: position, audience, distribution, supply, drop rhythm, and economics in one page.

**Features:**
- Founder-focused stats (48hr, 8 layers, €99–2,400, 0 audience required)
- Three tier description: Read, Maison, Atelier
- SYMIONE refund guarantee on all tiers
- Modest default sliders (10K reach, 2% conversion) for founder scale
- No partner-specific sections
- "Format open" in footer colophon

## Adding a New Partner

1. **Create partner JSON file** in `partners/`:

```json
{
  "name": "PartnerName",
  "roleDescription": "The distribution, the community, the trust.",
  "audienceReach": 150000,
  "conversionRate": 1.8,
  "avgValue": 290,
  "retention": 12,
  "ceiling": 50
}
```

2. **Update the route** in `app/partnership/[partner]/page.tsx`:

```typescript
// Add import
import partnerNameData from "@/maison/partners/partnername.json";

// Add to PARTNERS object
const PARTNERS: Record<string, PartnerData> = {
  natali: nataliData,
  hegetfunds: hegetfundsData,
  partnername: partnerNameData, // Add this line
};
```

3. **Run the build:**

```bash
node maison/build-partners.js
```

This generates `maison/maison-partnername.html`.

## Build Process

### Quick Build (HTML only)

```bash
node maison/build-partners.js
```

This runs:
1. `npm run build` — Next.js static export
2. Copies HTML files from `out/partnership/{partner}/index.html` to `maison/maison-{partner}.html`
3. Copies `out/catalogue/index.html` to `maison/maison-catalogue.html`

### Development Mode

```bash
npm run dev
```

Then visit:
- Partnership (Natali): http://localhost:3000/partnership/natali
- Partnership (Hegetfunds): http://localhost:3000/partnership/hegetfunds
- Catalogue: http://localhost:3000/catalogue

The sliders are fully interactive in all editions.

## Deployment

The generated HTML files reference assets in `/out/_next/`. For deployment:

1. **Upload HTML files:**
   - `maison/maison-natali.html`
   - `maison/maison-hegetfunds.html`
   - `maison/maison-catalogue.html`

2. **Upload assets directory:**
   - `out/_next/` (entire folder with subdirectories)

3. **URL structure** (example):
   - `maison.symi.one/partnership/natali` → serves `maison-natali.html`
   - `maison.symi.one/partnership/hegetfunds` → serves `maison-hegetfunds.html`
   - `maison.symi.one/catalogue` → serves `maison-catalogue.html`

## ICX Protocol Meta Tags

All generated HTML files include Intent Card Exchange (ICX) protocol meta tags:

```html
<meta name="card:id" content="maison">
<meta name="card:edition" content="partnership|catalogue">
<meta name="card:partner" content="natali"> <!-- partnership only -->
<meta name="card:version" content="1.0.0">
<meta name="card:protocol" content="icx-0.1">
```

These tags make the pages machine-readable for ICX runners (e.g., Chrome extension).

## Components

### Partnership Component
**File:** `components/EconomicsPagePartnership.tsx`

Accepts `partner` prop with all template variables. Renders:
- Partner-customized hero and stats
- Interactive sliders with partner-specific defaults
- Distribution × build section with partner role
- Footer with partner name

### Catalogue Component
**File:** `components/EconomicsPageCatalogue.tsx`

No props required. Renders:
- Founder-focused hero
- Founder-scale stats (48hr, 8 layers, etc.)
- Three-tier structure with SYMIONE guarantee
- Interactive sliders with modest defaults (10K reach)
- Generic footer colophon

## Technical Notes

### Interactivity Preserved

Both editions use React with client-side interactivity. The sliders work in the static HTML because Next.js includes the React runtime in the export.

### Build-Time Substitution

Partner data is loaded at build time via JSON imports. The `generateStaticParams` function pre-generates all partner editions during the build.

### Next.js 15 Compatibility

The route uses async params (Next.js 15 requirement):

```typescript
export default async function PartnershipPage({ params }: { params: Promise<{ partner: string }> }) {
  const { partner } = await params;
  // ...
}
```

## Future Extensions

To add a third edition (e.g., `MAISON · COUTURE` for bespoke):

1. Create `components/EconomicsPageCouture.tsx`
2. Create `app/couture/page.tsx`
3. Update `build-partners.js` to copy the generated HTML
4. Add ICX meta tag: `card:edition` = `"couture"`

Same system, different content. The architecture supports unlimited editions.

---

**Built:** May 2026
**Protocol:** ICX 0.1
**Format:** Intent Card
**Publisher:** SYMI Intelligence · Paris
