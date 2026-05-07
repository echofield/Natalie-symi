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

export function ThesisPageCatalogue() {
  const [executions, setExecutions] = useState(1200);
  const [downstreamValue, setDownstreamValue] = useState(120000);
  const [retention, setRetention] = useState(70);

  const math = useMemo(() => {
    const retained = retention / 100;

    // Card sales revenue (one-time per execution)
    const cardRevenue = executions * 290; // Average tier price

    // Protocol revenue (5% of downstream value, recurring while retained)
    const protocolAnnual = executions * downstreamValue * 0.05 * retained;

    // Total over 5 years
    const cardTotal = cardRevenue;
    const protocolY1 = protocolAnnual;
    const protocolY2 = protocolY1 * 1.4;  // Compounding as systems mature
    const protocolY3 = protocolY2 * 1.5;
    const protocolY4 = protocolY3 * 1.6;
    const protocolY5 = protocolY4 * 1.7;

    // Lines for chart
    const cardLine = [cardRevenue, cardRevenue * 0.3, cardRevenue * 0.2, cardRevenue * 0.15, cardRevenue * 0.1];
    const protocolLine = [protocolY1, protocolY2, protocolY3, protocolY4, protocolY5];

    return {
      cardRevenue,
      protocolAnnual,
      protocolY5,
      cardLine,
      protocolLine
    };
  }, [executions, downstreamValue, retention]);

  return (
    <main className="page">
      <header className="m-header">
        <div className="brand-mark">
          <span className="brand-maison">MAISON.</span>
          <span className="brand-sep">·</span>
          <span className="brand-context">THESIS</span>
        </div>
        <div className="date-badge">intent card · symi · catalogue</div>
      </header>

      <section className="hero">
        <AmbientParticles />
        <div className="hero-kicker">the recursive economy</div>
        <h1 className="hero-sentence">
          The card is published once. It executes <em className="go">infinitely</em>.
        </h1>
        <p className="hero-note">
          Each execution generates a system. Each system generates value. 5% of that value returns through the protocol. Forever, because the card lives forever.
        </p>
      </section>

      <div className="keys">
        <div className="key-item">
          <div className="number"><em>1×</em></div>
          <div className="key-label">card creation cost</div>
        </div>
        <div className="key-item">
          <div className="number"><em>∞</em></div>
          <div className="key-label">card executions</div>
        </div>
        <div className="key-item">
          <div className="number go"><em>5%</em></div>
          <div className="key-label">protocol fee</div>
        </div>
        <div className="key-item">
          <div className="number go"><em>∞</em></div>
          <div className="key-label">duration of recursion</div>
        </div>
      </div>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            Three layers. The third one <em className="go">compounds</em>.
          </div>
          <div className="section-hint">the catalogue model</div>
        </div>
        <div className="flow-grid">
          <div className="flow-card">
            <div className="flow-mark">Layer 1 · The card</div>
            <div className="flow-big"><em>€99</em><span className="number-unit">-2,400</span></div>
            <div className="flow-label">The card is published once. It carries the system inside.</div>
            <div className="flow-sub">one-time · per buyer</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">Layer 2 · The execution</div>
            <div className="flow-label">The buyer runs the card. The dossier, the brand, the system — generated, not assembled.</div>
            <div className="flow-sub">per-buyer · scales with audience</div>
          </div>
          <div className="flow-card deep">
            <div className="flow-mark go">Layer 3 · The protocol</div>
            <div className="flow-big go"><em>5%</em></div>
            <div className="flow-label">Every transaction the system later runs settles through SYMIONE. Forever, because the card lives forever.</div>
            <div className="flow-sub">recursive · embedded</div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The protocol line <em>becomes larger</em> than card sales.
          </div>
          <div className="section-hint">why recursion wins</div>
        </div>

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

        <div className="flow-grid mt-5">
          <div className="flow-card">
            <div className="flow-mark">Card sales</div>
            <div className="flow-big"><em>{money(math.cardRevenue)}</em></div>
            <div className="flow-label">One-time revenue from card executions at €290 average.</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">Protocol (Year 1)</div>
            <div className="flow-big"><em>{money(math.protocolAnnual)}</em></div>
            <div className="flow-label">5% of downstream value, first year.</div>
          </div>
          <div className="flow-card deep">
            <div className="flow-mark go">Protocol (Year 5)</div>
            <div className="flow-big go"><em>{money(math.protocolY5)}</em></div>
            <div className="flow-label">Compounded as systems mature and generate more value.</div>
          </div>
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
            The cohort behaves like a long tail with a few <em className="go">breakouts</em>.
          </div>
          <div className="section-hint">why the model scales</div>
        </div>
        <div className="flow-grid">
          <div className="flow-card">
            <div className="flow-mark">The 90%</div>
            <div className="flow-big"><em>€5</em><span className="number-unit">-50K</span></div>
            <div className="flow-label">Small systems. They run, they transact, they contribute modest protocol fees. Proof of execution at scale.</div>
          </div>
          <div className="flow-card">
            <div className="flow-mark">The 8%</div>
            <div className="flow-big"><em>€100K</em><span className="number-unit">-500K</span></div>
            <div className="flow-label">Established brands. Material downstream value. Meaningful protocol revenue per execution.</div>
          </div>
          <div className="flow-card deep">
            <div className="flow-mark go">The 2%</div>
            <div className="flow-big go"><em>€1</em><span className="number-unit">-10M+</span></div>
            <div className="flow-label">Breakouts. Each one generates protocol fees that justify the entire catalogue infrastructure.</div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            The format is <em className="go">open</em>. The protocol captures the recursion.
          </div>
          <div className="section-hint">the thesis, compressed</div>
        </div>
        <p className="body-copy">
          Intent Cards are not consulting dressed up in beautiful typography. They are compressed intelligence that executes without human reassembly. You write the card once. It runs infinitely. Each execution carries SYMIONE underneath. Each system the card builds generates downstream value. 5% of that value returns through the protocol. Forever, because the card lives forever.
        </p>
        <p className="body-copy mt-5">
          The economic engine is audience × system × recursion. The card published. The buyer sovereign. The protocol compounding. No €10K commission. No human assembly cost. Just intelligence compressed into a format that duplicates, executes, and settles value flow automatically.
        </p>
        <p className="body-copy mt-5">
          Every advance in AI makes the cards more capable. The format rides the medium.
        </p>
      </Reveal>

      <Reveal className="section">
        <div className="section-head">
          <div className="section-title">
            You publish the card. The world runs it. The rail <em className="go">compounds</em> underneath.
          </div>
          <div className="section-hint">the line that closes the thesis</div>
        </div>
        <p className="caption text-right">This is the thesis. The catalogue is the proof.</p>
      </Reveal>

      <footer className="m-footer">
        <p className="footer-line">Maison is an Intent Card from the SYMI catalogue. Format open.</p>
        <p className="footer-line">SYMI Intelligence · Paris.</p>
      </footer>
    </main>
  );
}
