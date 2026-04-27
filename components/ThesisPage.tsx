"use client";

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

export function ThesisPage() {
  const [ventures, setVentures] = useState(500);
  const [revenue, setRevenue] = useState(180000);
  const [retention, setRetention] = useState(65);

  const math = useMemo(() => {
    const retained = retention / 100;
    const setup = ventures * 10000;
    const platform = ventures * retained * 390 * 12;
    const protocol = ventures * revenue * 0.05 * retained;
    const total = setup + platform + protocol;
    const setupLine = [setup, setup * 0.52, setup * 0.46, setup * 0.42, setup * 0.38];
    const platformLine = [platform, platform * 1.08, platform * 1.14, platform * 1.2, platform * 1.26];
    const protocolLine = [protocol, protocol * 1.32, protocol * 1.72, protocol * 2.14, protocol * 2.68];
    return { setup, platform, protocol, total, setupLine, platformLine, protocolLine };
  }, [ventures, revenue, retention]);

  return (
    <main className="page">
      <header className="m-header">
        <div className="brand-mark">
          <span className="brand-maison">MAISON.</span>
          <span className="brand-sep">·</span>
          <span className="brand-context">THESIS</span>
        </div>
        <div className="date-badge">terminal layer</div>
      </header>

      <section className="hero">
        <AmbientParticles />
        <div className="hero-kicker">the compounding layer</div>
        <h1 className="hero-sentence">
          Setup is the door. Retention is the floor. <em>5% forever</em> is the ceiling.
        </h1>
        <p className="hero-note">
          The first two layers fund the team. The third is the venture: every maison that succeeds
          sends value back through the protocol for as long as it exists.
        </p>
      </section>

      <div className="keys">
        <div className="key-item">
          <div className="number"><em>€10K</em></div>
          <div className="key-label">commission</div>
        </div>
        <div className="key-item">
          <div className="number"><em>€290</em><span className="number-unit">-490</span></div>
          <div className="key-label">continuity surface</div>
        </div>
        <div className="key-item">
          <div className="number"><em>5%</em></div>
          <div className="key-label">protocol fee</div>
        </div>
        <div className="key-item">
          <div className="number go"><em>∞</em></div>
          <div className="key-label">duration of alignment</div>
        </div>
      </div>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The three layers turn service revenue into a <em>rail</em>.
          </div>
          <div className="section-hint">one stack</div>
        </div>
        <div className="flow-grid">
          <div className="flow-card">
            <div className="flow-mark">Layer 1</div>
            <div className="flow-big"><em>€10K</em></div>
            <div className="flow-label">The commission: a two-week founder system, designed by humans, assembled with precision.</div>
            <div className="flow-sub">Acquisition · linear</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">Layer 2</div>
            <div className="flow-big"><em>€290</em><span className="number-unit">-490</span></div>
            <div className="flow-label">The continuity surface: every operating layer held together after the first build.</div>
            <div className="flow-sub">Retention · recurring</div>
          </div>
          <div className="flow-card deep">
            <div className="flow-mark go">Layer 3</div>
            <div className="flow-big go"><em>5%</em></div>
            <div className="flow-label">The protocol: value created through SYMIONE returns to the partnership.</div>
            <div className="flow-sub">Compounding · recursive</div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            Move the cohort and the <em>protocol</em> reveals the ceiling.
          </div>
          <div className="section-hint">recursive math</div>
        </div>

        <div className="control-stack">
          <label className="control-row">
            <span className="control-label">Ventures launched</span>
            <input type="range" min="50" max="2000" step="10" value={ventures} onChange={(event) => setVentures(Number(event.target.value))} />
            <span className="control-value"><em>{count(ventures)}</em></span>
          </label>
          <label className="control-row">
            <span className="control-label">Avg venture revenue</span>
            <input type="range" min="20000" max="2000000" step="10000" value={revenue} onChange={(event) => setRevenue(Number(event.target.value))} />
            <span className="control-value"><em>{money(revenue)}</em></span>
          </label>
          <label className="control-row">
            <span className="control-label">Avg platform retention</span>
            <input type="range" min="40" max="95" step="5" value={retention} onChange={(event) => setRetention(Number(event.target.value))} />
            <span className="control-value"><em>{retention}</em>%</span>
          </label>
        </div>

        <div className="flow-grid mt-5">
          <div className="flow-card">
            <div className="flow-mark">Commission</div>
            <div className="flow-big"><em>{money(math.setup)}</em></div>
            <div className="flow-label">Cohort one-time value.</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">Surface</div>
            <div className="flow-big"><em>{money(math.platform)}</em></div>
            <div className="flow-label">Annual retained value.</div>
          </div>
          <div className="flow-card deep">
            <div className="flow-mark go">Protocol</div>
            <div className="flow-big go"><em>{money(math.protocol)}</em></div>
            <div className="flow-label">Annual share of created value.</div>
          </div>
        </div>

        <AnimatedLineChart
          title={'The protocol line becomes <em>larger</em> than setup.'}
          labels={["Y1", "Y2", "Y3", "Y4", "Y5"]}
          lines={[
            { label: "setup", color: "#b8956a", values: math.setupLine },
            { label: "surface", color: "#8a7e6e", values: math.platformLine },
            { label: "protocol", color: "#c94a2e", values: math.protocolLine },
          ]}
        />
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The cohort behaves like a small house with a few <em>breakouts</em>.
          </div>
          <div className="section-hint">why it compounds</div>
        </div>
        <div className="flow-grid">
          <div className="flow-card">
            <div className="flow-mark">The 95%</div>
            <div className="flow-big"><em>€10</em><span className="number-unit">-60K</span></div>
            <div className="flow-label">Modest ventures. They fund the operating surface and create proof.</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">The 4%</div>
            <div className="flow-big"><em>€200K</em><span className="number-unit">-1M</span></div>
            <div className="flow-label">Established brands. Material protocol fees and credible reference cases.</div>
          </div>
          <div className="flow-card deep">
            <div className="flow-mark go">The 1%</div>
            <div className="flow-big go"><em>€2</em><span className="number-unit">-20M</span></div>
            <div className="flow-label">Breakouts. Each one can justify the entire venture on its own.</div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            You generate the demand. We capture the value. <em>Both of us, forever.</em>
          </div>
          <div className="section-hint">the line Mars says aloud</div>
        </div>
        <p className="caption text-right">The page ends here. No next link.</p>
      </Reveal>

      <footer className="m-footer">
        <p className="footer-line">Built in 48 hours. Imagine what we build in 48 weeks.</p>
        <p className="footer-line">SYMI Intelligence · Paris · For Natali</p>
      </footer>
    </main>
  );
}
