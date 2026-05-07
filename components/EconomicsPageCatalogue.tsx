"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AmbientParticles } from "@/components/AmbientParticles";
import { AnimatedLineChart } from "@/components/AnimatedLineChart";
import { Reveal } from "@/components/Reveal";

function money(n: number) {
  if (n >= 1_000_000) return `€${Math.round(n / 1_000_000)}M`;
  if (n >= 1_000) return `€${Math.round(n / 1_000)}K`;
  return `€${Math.round(n)}`;
}

function count(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

function NumberMark({
  value,
  unit = "",
  className = "",
  go = false,
}: {
  value: string;
  unit?: string;
  className?: string;
  go?: boolean;
}) {
  return (
    <span className={`number ${go ? "go" : ""} ${className}`}>
      <em>{value}</em>
      {unit && <span className="number-unit"> {unit}</span>}
    </span>
  );
}

export function EconomicsPageCatalogue() {
  // Default to modest founder scenarios (not partnership scale)
  const [audience, setAudience] = useState(10000);
  const [conversion, setConversion] = useState(0.02);
  const [average, setAverage] = useState(290);
  const [retention, setRetention] = useState(12);

  const math = useMemo(() => {
    const founders = audience * conversion;
    const monthly = founders * average;
    const annual = monthly * 12;
    const lifetime = founders * average * retention;
    const launch = [0.16, 0.32, 0.46, 0.55, 0.6, 0.62].map((v) => annual * v);
    const recurring = [0.08, 0.2, 0.36, 0.56, 0.78, 1].map((v) => annual * v);
    return { founders, monthly, annual, lifetime, launch, recurring };
  }, [audience, conversion, average, retention]);

  return (
    <main className="page">
      <header className="m-header">
        <div className="brand-mark">
          <span className="brand-maison">MAISON.</span>
        </div>
        <div className="date-badge">intent card · symi · catalogue</div>
      </header>

      <section className="hero">
        <AmbientParticles />
        <div className="hero-kicker">the commercial system</div>
        <h1 className="hero-sentence">
          Stop selling content. Sell <em className="go">systems</em>.
        </h1>
        <p className="hero-note">A live read for any founder: position, audience, distribution, supply, drop rhythm, and economics in one page.</p>
      </section>

      <div className="keys">
        <div className="key-item">
          <NumberMark value="48" unit="hr" />
          <div className="key-label">time from prompt to dossier</div>
        </div>
        <div className="key-item">
          <NumberMark value="8" />
          <div className="key-label">connected layers</div>
        </div>
        <div className="key-item">
          <NumberMark value="€99–2,400" go />
          <div className="key-label">tiered access</div>
        </div>
        <div className="key-item">
          <NumberMark value="0" />
          <div className="key-label">audience required</div>
        </div>
      </div>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            What you <em>get</em>.
          </div>
          <div className="section-hint">three tiers, three depths</div>
        </div>
        <div className="flow-grid">
          <div className="flow-card">
            <div className="flow-mark">Read</div>
            <div className="flow-big"><em>€99</em></div>
            <div className="flow-label">The founder dossier. Position, audience, voice, distribution, supply, payments, operations, economics. One live page.</div>
            <div className="flow-sub">Settled by SYMIONE. Refunded if the dossier doesn't ship within 48 hours.</div>
          </div>
          <div className="flow-card deep">
            <div className="flow-mark go">Maison</div>
            <div className="flow-big go"><em>€290</em></div>
            <div className="flow-label">Site, supply, legal, payments, drops, voice, operations. The full system underneath the brand.</div>
            <div className="flow-sub">Settled by SYMIONE. Refunded if the dossier doesn't ship within 48 hours.</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">Atelier</div>
            <div className="flow-big"><em>€2,400</em></div>
            <div className="flow-label">Direct audit, founder cohort, rare access. For the ventures closest to breakout.</div>
            <div className="flow-sub">Settled by SYMIONE. Refunded if the dossier doesn't ship within 48 hours.</div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            What this becomes at <em>scale</em>.
          </div>
          <div className="section-hint">the math when the system runs</div>
        </div>

        <p className="body-copy mb-5">
          These are the numbers when your brand runs as a system. Most founders won't reach this scale. The ones who do, do.
        </p>

        <div className="control-stack">
          <label className="control-row">
            <span className="control-label">Audience reach</span>
            <input type="range" min="1000" max="100000" step="1000" value={audience} onChange={(event) => setAudience(Number(event.target.value))} />
            <span className="control-value"><em>{count(audience)}</em></span>
          </label>
          <label className="control-row">
            <span className="control-label">Conversion to maison</span>
            <input type="range" min="0.005" max="0.05" step="0.001" value={conversion} onChange={(event) => setConversion(Number(event.target.value))} />
            <span className="control-value"><em>{(conversion * 100).toFixed(1)}</em>%</span>
          </label>
          <label className="control-row">
            <span className="control-label">Average monthly value</span>
            <input type="range" min="100" max="600" step="10" value={average} onChange={(event) => setAverage(Number(event.target.value))} />
            <span className="control-value"><em>€{average}</em></span>
          </label>
          <label className="control-row">
            <span className="control-label">Retention</span>
            <input type="range" min="6" max="36" step="1" value={retention} onChange={(event) => setRetention(Number(event.target.value))} />
            <span className="control-value"><em>{retention}</em> mo</span>
          </label>
        </div>

        <div className="flow-grid mt-5">
          <div className="flow-card">
            <div className="flow-mark">Active founders</div>
            <div className="flow-big"><em>{count(math.founders)}</em></div>
            <div className="flow-label">The audience fraction with budget, urgency, and ambition.</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">Monthly rhythm</div>
            <div className="flow-big"><em>{money(math.monthly)}</em></div>
            <div className="flow-label">A continuity surface, not access rented by the month.</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark go">Cohort value</div>
            <div className="flow-big go"><em>{money(math.lifetime)}</em></div>
            <div className="flow-label">The green line: time retained, systems deepened.</div>
          </div>
        </div>

        <AnimatedLineChart
          title={'The recurring line becomes the <em>asset</em>.'}
          labels={["M1", "M3", "M5", "M7", "M9", "M12"]}
          lines={[
            { label: "launch", color: "#b8956a", values: math.launch },
            { label: "recurring", color: "#c94a2e", values: math.recurring },
          ]}
        />
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            This is the ceiling when the system runs. Most founders won't reach it. The ones who do, <em>do</em>.
          </div>
          <div className="section-hint">the closing mark</div>
        </div>
        <div className="text-center">
          <div className="number mega"><em>€50M</em></div>
          <p className="caption mx-auto mt-2 max-w-[480px]">
            Achievable ceiling across geographies when the system compounds.
          </p>
        </div>
      </Reveal>

      <footer className="m-footer">
        <div className="footer-link">
          <Link href="/thesis-catalogue" className="quiet-link">
            and here&apos;s why it compounds <span>→</span>
          </Link>
        </div>
        <p className="footer-line">Maison is an Intent Card from the SYMI catalogue. Format open.</p>
        <p className="footer-line">SYMI Intelligence · Paris.</p>
      </footer>
    </main>
  );
}
