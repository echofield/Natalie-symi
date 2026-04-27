"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AmbientParticles } from "@/components/AmbientParticles";
import { Reveal } from "@/components/Reveal";

const sections = [
  { key: "POSITIONING", label: "Positioning", num: "I" },
  { key: "ARCHETYPE", label: "Archetype", num: "II" },
  { key: "AUDIENCE WEDGE", label: "Audience wedge", num: "III" },
  { key: "DISTRIBUTION VECTOR", label: "Distribution vector", num: "IV" },
  { key: "VIRALITY ANGLE", label: "Virality angle", num: "V" },
  { key: "SUPPLY & BUILD PATH", label: "Supply and build path", num: "VI" },
  { key: "DROP STRATEGY", label: "Drop strategy", num: "VII" },
  { key: "ECONOMICS", label: "Economics", num: "VIII" },
];

const examples = [
  "A streetwear label rooted in Marseille football culture, drops twice a year",
  "A coaching practice for women founders scaling from €0 to €500K, currently selling 1:1 only",
  "A natural skincare brand built around fermentation, founder is a biochemist",
  "A divorce lawyer in London who wants to build a personal brand without losing professional credibility",
];

function buildSystemPrompt(mode: "new" | "existing") {
  const base = `You are a senior brand strategist at SYMI Intelligence, Paris. You produce concise, surgical brand intelligence dossiers for MAISON, a private venture demo for Natali. You write in clear declarative sentences. No fluff, no hype, no marketing-speak. You sound like a peer, not a vendor. French elegance, structural thinking, zero filler.

Output format: produce exactly the sections below, in order, with the exact headings shown. No preamble, no outro, no meta-commentary. Each section is 2-4 sentences of dense substance. Total output ~400-500 words.

[POSITIONING]
The strategic position this brand occupies or should occupy. What it stands against. The negative space it claims.

[ARCHETYPE]
The cultural archetype that fits, in 2-3 words, then a sentence on how to inhabit it credibly.

[AUDIENCE WEDGE]
Not "their target audience". Name the specific wedge of humans who will pay first and bring everyone else. Be precise.

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
    return `${base}\n\nThe founder has an existing brand. Frame everything as audit and amplification, not creation. Identify what is already working, what to kill, what to compound.`;
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
          "x-demo-token": process.env.NEXT_PUBLIC_DEMO_ACCESS_TOKEN || "",
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
    <main className="editorial-shell">
      <section className="hero">
        <AmbientParticles />
        <div className="hero-inner relative z-10">
          <p className="eyebrow">Cultural infrastructure</p>
          <h1 className="display">MAISON.</h1>
          <p className="lede">A system for founders who want to build, not just post.</p>
          <p className="mt-7 font-serif text-[32px] leading-tight text-ink md:text-[44px]">
            Stop selling content. Sell <em className="accent">systems.</em>
          </p>
          <p className="eyebrow mt-9 mb-0">SYMI × Natali — private demo</p>
        </div>
      </section>

      <Reveal>
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <span className="roman">I</span>
              <span className="section-title">Brand intelligence engine</span>
            </div>

            <div className="grid gap-8">
              <div>
                <p className="control-label mb-4">Mode</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    ["new", "New brand — idea to system"],
                    ["existing", "Existing brand — audit and scale"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setMode(value as "new" | "existing")}
                      className={`border px-4 py-2 text-left text-[13px] transition-colors ${
                        mode === value
                          ? "border-green bg-green text-creme"
                          : "border-hairline text-ink hover:border-green"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="control-label mb-4 block">Brand prompt</span>
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  onKeyDown={(event) => {
                    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") generate();
                  }}
                  placeholder="A few words is enough. Example: minimalist Parisian candle brand for women in their 30s."
                  className="min-h-[138px] w-full resize-y border border-hairline bg-transparent p-5 text-[15px] leading-7 text-ink placeholder:text-ink/38"
                />
              </label>

              <div>
                <p className="control-label mb-4">Prompts to try</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {examples.map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => setPrompt(example)}
                      className="border-b border-hairline py-3 text-left text-[14px] leading-6 text-ink/70"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  disabled={!canGenerate}
                  onClick={generate}
                  className="bg-green px-6 py-3 text-[14px] text-creme disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {status === "loading" ? "Generating dossier" : "Generate dossier"}
                </button>
                <span className="mono text-ink/48">Real-time. Claude through a private proxy.</span>
              </div>
            </div>

            {status === "loading" && (
              <div className="mt-12 border-t border-hairline pt-8">
                <p className="font-serif text-[27px] italic text-green">Reading the brand. Mapping the system.</p>
              </div>
            )}

            {status === "error" && (
              <div className="mt-12 border-t border-hairline pt-8">
                <p className="body-copy text-green">{error}</p>
              </div>
            )}

            {dossier.length > 0 && (
              <div className="mt-14 border-t border-hairline pt-4">
                <p className="eyebrow my-8">Brand intelligence dossier · Layer 1</p>
                <div className="grid gap-10">
                  {dossier.map((section) => (
                    <Reveal key={section.key}>
                      <article>
                        <div className="section-head mb-4">
                          <span className="roman">{section.num}</span>
                          <span className="section-title">{section.label}</span>
                        </div>
                        <p className="body-copy whitespace-pre-line">{section.body}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section bg-green text-creme">
          <div className="section-inner">
            <p className="eyebrow text-creme/60">Layer 2 · The build</p>
            <h2 className="headline text-creme">This is the read. Here is what we build.</h2>
            <p className="mt-8 max-w-[680px] text-[16px] leading-7 text-creme/78">
              The dossier is the diagnosis. MAISON is the operating surface underneath the founder:
              brand system, site, legal, supply, drops, payments, distribution, and live economics.
            </p>
            <div className="mt-12 grid gap-px bg-creme/18 md:grid-cols-4">
              {[
                "Brand system",
                "Site launcher",
                "Legal layer",
                "Supply chain",
                "Drop engine",
                "Conditional payments",
                "Distribution loop",
                "Economics view",
              ].map((item, index) => (
                <div key={item} className="bg-green p-5">
                  <p className="mono text-creme/50">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-3 text-[14px] text-creme/86">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <footer className="footer">
        <div className="footer-inner">
          <span className="eyebrow mb-0">SYMI Intelligence · Paris</span>
          <Link href="/economics" className="quiet-link">
            see the math →
          </Link>
        </div>
      </footer>
    </main>
  );
}
