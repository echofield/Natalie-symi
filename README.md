# MAISON.

Private SYMI × Natali demo built from the three original HTML artifacts:

- `/` — live brand intelligence engine
- `/economics` — venture economics model
- `/thesis` — recursive 5% protocol thesis
- `/api/dossier` — Anthropic Messages API proxy

## Environment

Set these in Vercel project settings. Do not commit real values.

```bash
ANTHROPIC_API_KEY=sk-ant-...
DEMO_ACCESS_TOKEN=random-demo-token
NEXT_PUBLIC_DEMO_ACCESS_TOKEN=random-demo-token
```

`DEMO_ACCESS_TOKEN` and `NEXT_PUBLIC_DEMO_ACCESS_TOKEN` must match. The public
value is only a light crawler guard; it is not authentication.

## API budget guardrails

- Proxy caps output at `1500` tokens.
- Proxy rate limits each IP to `5` dossier generations per hour.
- Set the daily Anthropic spend cap manually in the Anthropic console.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Deploy as a single Vercel project. After the project is live, add the final
Mars-provided subdomain in Vercel Domains and point DNS as instructed by Vercel.

## Notes from the HTML artifacts

- All visible previous working-title references were renamed to MAISON.
- The direct Anthropic browser call was replaced with `/api/dossier`.
- The chat-artifact host CSS variables were replaced with the SYMI creme,
  deep-green, warm-secondary, and hairline system.
- The boxed dashboard/card style was converted into editorial sections,
  hairlines, Roman numerals, and one deep-green break per page.
- Slider behavior, dossier generation, and the economics/thesis calculators
  were preserved, with restrained GSAP particle and line-draw motion.
