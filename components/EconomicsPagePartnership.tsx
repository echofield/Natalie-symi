"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AmbientParticles } from "@/components/AmbientParticles";
import { AnimatedLineChart } from "@/components/AnimatedLineChart";
import { Reveal } from "@/components/Reveal";

interface PartnerData {
  name: string;
  roleDescription: string;
  audienceReach: number;
  conversionRate: number;
  avgValue: number;
  retention: number;
  ceiling: number;
}

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

export function EconomicsPagePartnership({ partner }: { partner: PartnerData }) {
  const [audience, setAudience] = useState(partner.audienceReach);
  const [conversion, setConversion] = useState(partner.conversionRate / 100);
  const [average, setAverage] = useState(partner.avgValue);
  const [retention, setRetention] = useState(partner.retention);

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
          <span className="brand-sep">·</span>
          <span className="brand-context">SYMI × {partner.name.toUpperCase()}</span>
        </div>
        <div className="date-badge">partnership edition</div>
      </header>

      <div style={{ textAlign: 'right', marginTop: '-8px', marginBottom: '16px' }}>
        <span className="marginalia">intent card · symi</span>
      </div>

      <section className="hero">
        <AmbientParticles />
        <div className="hero-kicker">the commercial altitude</div>
        <h1 className="hero-sentence">
          A <em>€{partner.ceiling}M</em> maison, built on the distribution {partner.name} already owns.
        </h1>
        <p className="hero-note">The math, conservative. No audience discounting. No low-ticket apology. A venture surface for founders buying time, leverage, and outcome.</p>
      </section>

      <div className="keys">
        <div className="key-item">
          <NumberMark value={count(math.founders)} />
          <div className="key-label">founders at saturation</div>
        </div>
        <div className="key-item">
          <NumberMark value={money(math.monthly)} />
          <div className="key-label">monthly recurring</div>
        </div>
        <div className="key-item">
          <NumberMark value={money(math.annual)} />
          <div className="key-label">annual run-rate</div>
        </div>
        <div className="key-item">
          <NumberMark value={String(retention)} unit="mo" go />
          <div className="key-label">retention surface</div>
        </div>
      </div>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The opportunity begins with the <em>99%</em> who are not buying services.
          </div>
          <div className="section-hint">the offer beneath the audience</div>
        </div>
        <p className="body-copy">
          {partner.name} already sells high-trust outcomes to the small fraction ready for direct service.
          MAISON gives the rest a place to enter: not a course, not a cheap plan, but a governed
          system for turning attention into a venture. The rare summit founders make the broad base
          commercially rational.
        </p>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            Move the assumptions and watch the <em>surface</em> hold.
          </div>
          <div className="section-hint">the math responds live</div>
        </div>

        <div className="control-stack">
          <label className="control-row">
            <span className="control-label">Audience reach</span>
            <input type="range" min="100000" max="1000000" step="10000" value={audience} onChange={(event) => setAudience(Number(event.target.value))} />
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
            The atelier ladder sells <em>leverage</em>, not affordability.
          </div>
          <div className="section-hint">three ways to enter</div>
        </div>
        <div className="flow-grid">
          <div className="flow-card">
            <div className="flow-mark">Spark</div>
            <div className="flow-big"><em>€99</em></div>
            <div className="flow-label">A founder receives the first read, the first cadence, and a place inside the maison.</div>
            <div className="flow-sub">The widest layer. Useful without pretending to be bespoke.</div>
          </div>
          <div className="flow-card deep">
            <div className="flow-mark go">Studio</div>
            <div className="flow-big go"><em>€290</em></div>
            <div className="flow-label">The venture surface: site, supply, drops, legal, payments, voice, and operating rhythm.</div>
            <div className="flow-sub">Where attention becomes a system.</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">Atelier</div>
            <div className="flow-big"><em>€2,400</em></div>
            <div className="flow-label">Direct audit, founder cohort, and rare access for the ventures closest to breakout.</div>
            <div className="flow-sub">The summit self-finances the base.</div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            {partner.name} owns the demand; SYMI builds the <em className="go">rail</em>.
          </div>
          <div className="section-hint">distribution × build</div>
        </div>
        <div className="flow-grid two">
          <div className="flow-card">
            <div className="flow-mark">{partner.name}</div>
            <div className="flow-label">{partner.roleDescription}</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark go">SYMI</div>
            <div className="flow-label">The product, the dossier engine, the payment layer, the operations, the technical surface.</div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The year closes with a number large enough to change the <em>conversation</em>.
          </div>
          <div className="section-hint">the closing mark</div>
        </div>
        <div className="text-center">
          <div className="number mega"><em>€{partner.ceiling}M</em></div>
          <p className="caption mx-auto mt-2 max-w-[480px]">
            Achievable ceiling across geographies, with {partner.name}'s existing audience as the first kernel.
          </p>
        </div>
      </Reveal>

      <footer className="m-footer">
        <div className="footer-link">
          <Link href="/maison" className="quiet-link">
            see how it works <span>→</span>
          </Link>
        </div>
        <p className="footer-line">Built in 48 hours. Imagine what we build in 48 weeks.</p>
        <p className="footer-line">SYMI Intelligence · Paris · For {partner.name}</p>
      </footer>
    </main>
  );
}
