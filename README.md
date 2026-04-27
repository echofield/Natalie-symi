# MAISON.

Private SYMI × Natali demo in the Pompette editorial system.

## Routes

- `/` — economics landing, the €50M page
- `/maison` — live brand intelligence engine
- `/thesis` — recursive 5% protocol thesis
- `/api/dossier` — Anthropic Messages API proxy

`/economics` redirects to `/` for compatibility with the previous build.

## Environment

Set these in Vercel project settings. Do not commit real values.

```bash
ANTHROPIC_API_KEY=sk-ant-...
DEMO_ACCESS_TOKEN=random-32-char-token
NEXT_PUBLIC_DEMO_ACCESS_TOKEN=random-32-char-token
KV_REDIS_URL=...
```

`DEMO_ACCESS_TOKEN` and `NEXT_PUBLIC_DEMO_ACCESS_TOKEN` must match. The public
value is a crawler/budget guard, not authentication.

## API budget guardrails

- Anthropic output is capped at `1500` tokens in the proxy.
- Dossier generation is capped at `5` calls per IP per hour.
- Vercel Redis is used when `KV_REDIS_URL` is present; local development falls
  back to in-memory limiting.
- Set a daily Anthropic spend cap of €3 in the Anthropic console before sharing
  the URL.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Deploy as a single Vercel project. Add the production env vars above, connect a
Vercel Redis/KV store, then redeploy production.

## Aesthetic notes

- Page order was reversed: the commercial opportunity is now the first screen.
- The visual system was forked from the Pompette references: 720px centered
  document, warm cream tokens, Cormorant numerals, italic marginalia, and
  hairline separators.
- The previous dark green slab was removed. The eight MAISON layers now render
  as Pompette-style editorial blocks.
- Coral carries the primary numeric/accent territory. Deep green is reserved for
  a single secondary semantic category per page.
