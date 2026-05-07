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

export function CatalogueLandingPage() {
  const [executions, setExecutions] = useState(1200);
  const [downstreamValue, setDownstreamValue] = useState(120000);
  const [retention, setRetention] = useState(70);

  const math = useMemo(() => {
    const retained = retention / 100;
    const cardRevenue = executions * 290;
    const protocolAnnual = executions * downstreamValue * 0.05 * retained;
    const protocolY1 = protocolAnnual;
    const protocolY2 = protocolY1 * 1.4;
    const protocolY3 = protocolY2 * 1.5;
    const protocolY4 = protocolY3 * 1.6;
    const protocolY5 = protocolY4 * 1.7;

    const cardLine = [cardRevenue, cardRevenue * 0.3, cardRevenue * 0.2, cardRevenue * 0.15, cardRevenue * 0.1];
    const protocolLine = [protocolY1, protocolY2, protocolY3, protocolY4, protocolY5];

    return { cardRevenue, protocolAnnual, protocolY5, cardLine, protocolLine };
  }, [executions, downstreamValue, retention]);

  return (
    <main className="page">
      <header className="m-header">
        <div className="brand-mark">
          <span className="brand-maison" style={{ letterSpacing: '0.2em' }}>SYMI</span>
        </div>
        <div className="date-badge">Intelligence · Paris · 2026</div>
      </header>

      <section className="hero">
        <AmbientParticles />
        <h1 className="hero-sentence">
          Stop selling content. Sell <em className="go">systems</em>.
        </h1>
        <p className="hero-note" style={{ maxWidth: '600px' }}>
          Intent Cards turn AI capability into ownable economic systems. Published once. Run forever. Every transaction settles through the protocol underneath.
        </p>
      </section>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            What an Intent Card <em>is</em>.
          </div>
          <div className="section-hint">the format</div>
        </div>
        <div className="flow-grid">
          <div className="flow-card">
            <div className="flow-label">An Intent Card is a compressed format that holds an intention, the conditions for its completion, and what comes next. Published once, executable forever.</div>
          </div>
          <div className="flow-card">
            <div className="flow-label">Format-agnostic at the data layer. Renderable as a webpage, a CLI, a voice flow, a printed broadside.</div>
          </div>
          <div className="flow-card">
            <div className="flow-label">Cards define the work. Agents perform the work. SYMIONE makes the work payable.</div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The <em className="go">catalogue</em>.
          </div>
          <div className="section-hint">cards that exist</div>
        </div>
        <div className="flow-grid">
          <div className="flow-card deep">
            <div className="flow-mark go">MAISON</div>
            <div className="flow-label">Build your brand from system, not from scratch. Position, audience, distribution, supply, economics in one page.</div>
            <div className="flow-sub" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px' }}>
              <span style={{ color: 'var(--go)', fontSize: '11px', fontStyle: 'normal', letterSpacing: '0.16em', textTransform: 'uppercase' }}>LIVE</span>
              <span style={{ color: 'var(--pompette)', fontFamily: 'var(--font-cormorant)', fontSize: '16px', fontStyle: 'italic' }}>€99–€2,400</span>
            </div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">PROMESSE</div>
            <div className="flow-label">Compress a personal commitment into a stamped artifact. A promise card with proof of intent.</div>
            <div className="flow-sub" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px' }}>
              <span style={{ color: 'var(--ink-mute)', fontSize: '11px', fontStyle: 'normal', letterSpacing: '0.16em', textTransform: 'uppercase' }}>COMING</span>
              <span style={{ color: 'var(--ink-mute)', fontFamily: 'var(--font-cormorant)', fontSize: '16px', fontStyle: 'italic' }}>Free</span>
            </div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">CHANTIER</div>
            <div className="flow-label">Sponsor someone to ship public work. A commission card with conditional settlement.</div>
            <div className="flow-sub" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px' }}>
              <span style={{ color: 'var(--ink-mute)', fontSize: '11px', fontStyle: 'normal', letterSpacing: '0.16em', textTransform: 'uppercase' }}>COMING</span>
              <span style={{ color: 'var(--ink-mute)', fontFamily: 'var(--font-cormorant)', fontSize: '16px', fontStyle: 'italic' }}>Free</span>
            </div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">DOSSIER</div>
            <div className="flow-label">Generate your founder dossier. Eight layers of brand intelligence in 48 hours.</div>
            <div className="flow-sub" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px' }}>
              <span style={{ color: 'var(--go)', fontSize: '11px', fontStyle: 'normal', letterSpacing: '0.16em', textTransform: 'uppercase' }}>LIVE</span>
              <span style={{ color: 'var(--pompette)', fontFamily: 'var(--font-cormorant)', fontSize: '16px', fontStyle: 'italic' }}>€99</span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The economic <em className="go">engine</em>.
          </div>
          <div className="section-hint">for the strategic reader</div>
        </div>
        <p className="body-copy mb-5">
          Each card is published once and executes infinitely. Each execution carries SYMIONE underneath, settling 5% on every downstream transaction. The card sale is the door. The protocol compounds underneath, forever.
        </p>

        <div className="control-stack">
          <label className="control-row">
            <span className="control-label">Card executions</span>
            <input type="range" min="100" max="5000" step="50" value={executions} onChange={(event) => setExecutions(Number(event.target.value))} />
            <span className="control-value"><em>{count(executions)}</em></span>
          </label>
          <label className="control-row">
            <span className="control-label">Avg downstream value</span>
            <input type="range" min="10000" max="500000" step="10000" value={downstreamValue} onChange={(event) => setDownstreamValue(Number(event.target.value))} />
            <span className="control-value"><em>{money(downstreamValue)}</em></span>
          </label>
          <label className="control-row">
            <span className="control-label">System retention</span>
            <input type="range" min="40" max="95" step="5" value={retention} onChange={(event) => setRetention(Number(event.target.value))} />
            <span className="control-value"><em>{retention}</em>%</span>
          </label>
        </div>

        <AnimatedLineChart
          title={'The protocol line <em>overtakes</em> card revenue.'}
          labels={["Y1", "Y2", "Y3", "Y4", "Y5"]}
          lines={[
            { label: "card sales", color: "#8a7e6e", values: math.cardLine },
            { label: "protocol", color: "#c94a2e", values: math.protocolLine },
          ]}
        />
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            For creators with an <em>audience</em>.
          </div>
          <div className="section-hint">collaboration</div>
        </div>
        <div className="flow-grid two">
          <div className="flow-card">
            <div className="flow-mark">Co-author a card</div>
            <div className="flow-label">Your name on the artifact. Revenue share on every execution. The format gives you durable distribution your content alone can't.</div>
            <div className="flow-sub" style={{ marginTop: '14px', paddingTop: '14px' }}>
              <Link href="/maison" className="quiet-link" style={{ fontSize: '14px' }}>
                Talk about a partnership <span>→</span>
              </Link>
            </div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">Publish your own card</div>
            <div className="flow-label">The format is open. The runtime is shipped. The rail is embedded. We seed the catalogue; the catalogue is open to authors.</div>
            <div className="flow-sub" style={{ marginTop: '14px', paddingTop: '14px' }}>
              <Link href="/thesis-catalogue" className="quiet-link" style={{ fontSize: '14px' }}>
                Read the spec <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            Ready to compress your work into a <em className="go">card</em>?
          </div>
          <div className="section-hint">the buyer block</div>
        </div>
        <div className="flow-grid two">
          <div className="flow-card deep">
            <div className="flow-mark go">MAISON</div>
            <div className="flow-big go"><em>€99</em><span className="number-unit">-2,400</span></div>
            <div className="flow-label">Build your brand from system. Position, audience, distribution, supply, drop rhythm, and economics in one page.</div>
            <div className="flow-sub" style={{ marginTop: '14px', paddingTop: '14px' }}>
              <Link href="/catalogue" className="quiet-link" style={{ fontSize: '14px' }}>
                See how it works <span>→</span>
              </Link>
            </div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">More cards coming</div>
            <div className="flow-label">PROMESSE, CHANTIER, and additional catalogue cards ship in the next few weeks. The catalogue grows with each card published.</div>
            <div className="flow-sub" style={{ marginTop: '14px', paddingTop: '14px' }}>
              <span className="marginalia">Check back soon</span>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The catalogue is <em className="go">open</em>. The format is open. The rail is embedded.
          </div>
          <div className="section-hint">colophon</div>
        </div>
        <p className="body-copy">
          Maison is the first commercial card. The catalogue is open. The format is open. The rail is embedded.
        </p>
        <p className="body-copy mt-5">
          SYMI Intelligence · Paris · 2026 · format open
        </p>
      </Reveal>

      <footer className="m-footer">
        <p className="footer-line">Intent Cards: Published once. Run forever. Settled through SYMIONE.</p>
        <p className="footer-line">SYMI Intelligence · Paris.</p>
      </footer>
    </main>
  );
}
