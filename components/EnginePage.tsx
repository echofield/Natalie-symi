"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AmbientParticles } from "@/components/AmbientParticles";
import { Reveal } from "@/components/Reveal";

const sections = [
  { key: "POSITIONING", label: "The position becomes legible.", num: "I" },
  { key: "ARCHETYPE", label: "The archetype gives the founder posture.", num: "II" },
  { key: "AUDIENCE WEDGE", label: "The first buyers are never everyone.", num: "III" },
  { key: "DISTRIBUTION VECTOR", label: "The channel becomes a rhythm.", num: "IV" },
  { key: "VIRALITY ANGLE", label: "The contagious truth is specific.", num: "V" },
  { key: "SUPPLY & BUILD PATH", label: "The build path removes drag.", num: "VI" },
  { key: "DROP STRATEGY", label: "The launch needs a cadence.", num: "VII" },
  { key: "ECONOMICS", label: "The numbers decide the shape.", num: "VIII" },
];

const examples = [
  "A streetwear label rooted in Marseille football culture, drops twice a year",
  "A coaching practice for women founders scaling from €0 to €500K, currently selling 1:1 only",
  "A natural skincare brand built around fermentation, founder is a biochemist",
  "A divorce lawyer in London who wants to build a personal brand without losing professional credibility",
];

function buildSystemPrompt(mode: "new" | "existing") {
  const base = `You are a senior brand strategist at SYMI Intelligence, Paris. You produce concise brand intelligence dossiers for MAISON, a private venture demo for Natali. You write in wealthy register: outcomes, time saved, leverage, taste, and operating clarity. No discounts, no urgency, no SaaS copy, no fluff. You sound like a peer, not a vendor.

Output format: produce exactly the sections below, in order, with the exact headings shown. No preamble, no outro, no meta-commentary. Each section is 2-4 sentences of dense substance. Total output ~400-500 words.

[POSITIONING]
The strategic position this brand occupies or should occupy. What it stands against. The negative space it claims.

[ARCHETYPE]
The cultural archetype that fits, in 2-3 words, then a sentence on how to inhabit it credibly.

[AUDIENCE WEDGE]
The specific wedge of humans who will pay first and bring everyone else. Be precise.

[DISTRIBUTION VECTOR]
The single channel pattern that will compound for them. Reel format, partnership type, or community structure. Reference Natali-style organic strategies where they fit.

[VIRALITY ANGLE]
The actual hook this brand has that no competitor can copy. The non-obvious truth.

[SUPPLY & BUILD PATH]
Concrete next steps for product or service supply chain: suppliers, partners, technical layers required.

[DROP STRATEGY]
The launch or scale rhythm. Cadence. First three moves.

[ECONOMICS]
Revenue model with rough numbers. Atelier structure if relevant. What good looks like at 12 months.`;

  if (mode === "existing") {
    return `${base}\n\nThe founder has an existing brand. Frame everything as audit and amplification. Identify what is already working, what to kill, what to compound.`;
  }

  return `${base}\n\nThe founder has a new brand idea. Frame everything as system architecture for launch. Be specific about the first 90 days.`;
}

function parseDossier(text: string) {
  return sections.map((section) => {
    const re = new RegExp(`\\[${section.key.replace("&", "\\&")}\\]([\\s\\S]*?)(?=\\[|$)`, "i");
    const match = text.match(re);
    return {
      ...section,
      body: match?.[1]?.trim() || "The model returned an incomplete section. Generate again with a tighter prompt.",
    };
  });
}

export function EnginePage() {
  const [mode, setMode] = useState<"new" | "existing">("new");
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
  const [error, setError] = useState("");
  const [dossier, setDossier] = useState<ReturnType<typeof parseDossier>>([]);

  const canGenerate = useMemo(() => prompt.trim().length > 0 && status !== "loading", [prompt, status]);

  async function generate() {
    if (!prompt.trim()) return;

    setStatus("loading");
    setError("");
    setDossier([]);

    try {
      const response = await fetch("/api/dossier", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-demo-token": (process.env.NEXT_PUBLIC_DEMO_ACCESS_TOKEN || "").trim(),
        },
        body: JSON.stringify({
          prompt: `${buildSystemPrompt(mode)}\n\nBRAND PROMPT:\n${prompt.trim()}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "The dossier engine refused the request.");
      }

      const text = (data.content || [])
        .filter((item: { type?: string }) => item.type === "text")
        .map((item: { text?: string }) => item.text || "")
        .join("\n");

      setDossier(parseDossier(text));
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection issue. Try again in a moment.");
      setStatus("error");
    }
  }

  return (
    <main className="page">
      <header className="m-header">
        <div className="brand-mark">
          <span className="brand-maison">MAISON.</span>
          <span className="brand-sep">·</span>
          <span className="brand-context">DOSSIER</span>
        </div>
        <div className="date-badge">founder intelligence</div>
      </header>

      <section className="hero">
        <AmbientParticles />
        <div className="hero-kicker">the working surface</div>
        <h1 className="hero-sentence">
          Stop selling content. Sell <em className="go">systems</em>.
        </h1>
        <p className="hero-note">
          A live read for any founder: position, audience, distribution, supply, drop rhythm, and economics in one page.
        </p>
      </section>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The engine turns a founder's raw idea into a <em>maison</em>.
          </div>
          <div className="section-hint">Claude through a private proxy</div>
        </div>

        <div className="mb-5">
          <div className="control-label mb-2">Mode</div>
          <div className="choice-row">
            <button type="button" onClick={() => setMode("new")} className={`choice ${mode === "new" ? "active" : ""}`}>
              new brand · idea to system
            </button>
            <button type="button" onClick={() => setMode("existing")} className={`choice ${mode === "existing" ? "active" : ""}`}>
              existing brand · audit and scale
            </button>
          </div>
        </div>

        <label className="block">
          <span className="control-label mb-2 block">Brand prompt</span>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") generate();
            }}
            placeholder="A few words is enough. Example: minimalist Parisian candle brand for women in their 30s."
            className="textarea"
          />
        </label>

        <div className="mt-5">
          <div className="control-label mb-1">Prompts to try</div>
          <div className="grid gap-x-5 md:grid-cols-2">
            {examples.map((example) => (
              <button key={example} type="button" onClick={() => setPrompt(example)} className="text-link-tile">
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="button" disabled={!canGenerate} onClick={generate} className="btn-primary">
            {status === "loading" ? "Generating dossier" : "Generate dossier"}
            <span>→</span>
          </button>
          <span className="marginalia">real-time, guarded for the private demo budget</span>
        </div>

        {status === "loading" && (
          <div className="mt-8 border-t border-line pt-5">
            <p className="quote-line font-serif text-[24px] italic text-ink-mute">
              Reading the brand. Mapping the <em className="go">system</em>.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-8 border-t border-line pt-5">
            <p className="marginalia">{error}</p>
          </div>
        )}
      </Reveal>

      {dossier.length > 0 && (
        <section className="section is-visible">
          <div className="section-head">
            <div className="section-title">
              The dossier arrives as a sequence of <em>decisions</em>.
            </div>
            <div className="section-hint">layer I</div>
          </div>
          <div className="flow-grid">
            {dossier.map((section) => (
              <div className="flow-card" key={section.key}>
                <div className="flow-mark">{section.num}</div>
                <div className="flow-label mb-3">{section.label}</div>
                <p className="body-copy whitespace-pre-line">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The read becomes the <em className="go">system</em> underneath the founder.
          </div>
          <div className="section-hint">eight connected layers</div>
        </div>
        <div className="flow-grid">
          {[
            ["01", "Brand system", "Identity, voice, and direction codified as reusable taste."],
            ["02", "Site launcher", "A first public surface for the venture to transact."],
            ["03", "Legal layer", "Agreements, rights, suppliers, and founder protection."],
            ["04", "Supply chain", "Partners and fulfilment organized before attention arrives."],
            ["05", "Drop engine", "Cadence, scarcity, proof, and release rhythm."],
            ["06", "Conditional payments", "SYMIONE logic beneath the transaction."],
            ["07", "Distribution loop", "Reel formats mapped back into the maison."],
            ["08", "Economics view", "Numbers visible enough to make better decisions."],
          ].map(([num, name, text]) => (
            <div className="flow-card" key={name}>
              <div className={num === "06" ? "flow-mark go" : "flow-mark"}>{num}</div>
              <div className={num === "06" ? "flow-big go" : "flow-big"}><em>{name}</em></div>
              <div className="flow-label">{text}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <footer className="m-footer">
        <div className="footer-link">
          <Link href="/thesis" className="quiet-link">
            and here&apos;s why it compounds <span>→</span>
          </Link>
        </div>
        <p className="footer-line">Built in 48 hours. Imagine what we build in 48 weeks.</p>
        <p className="footer-line">SYMI Intelligence · Paris · For Natali</p>
      </footer>
    </main>
  );
}
