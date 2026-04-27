"use client";

import { useMemo, useState } from "react";
import { AmbientParticles } from "@/components/AmbientParticles";
import { AnimatedLineChart } from "@/components/AnimatedLineChart";
import { Reveal } from "@/components/Reveal";

function fmtCurrency(n: number) {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${Math.round(n / 1_000)}K`;
  return `€${Math.round(n)}`;
}

function fmtNumber(n: number) {
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

    const setupLine = [setup, setup * 0.52, setup * 0.48, setup * 0.44, setup * 0.4];
    const platformLine = [platform, platform * 1.08, platform * 1.14, platform * 1.2, platform * 1.26];
    const protocolLine = [protocol, protocol * 1.32, protocol * 1.72, protocol * 2.14, protocol * 2.68];

    return { retained, setup, platform, protocol, total, setupLine, platformLine, protocolLine };
  }, [ventures, revenue, retention]);

  return (
    <main className="editorial-shell">
      <section className="hero">
        <AmbientParticles />
        <div className="hero-inner relative z-10">
          <p className="eyebrow">The thesis · Layer 3 · For Natali</p>
          <h1 className="headline">
            Setup is the door.
            <br />
            Retention is the floor.
            <br />
            <em>5% forever</em> is the ceiling.
          </h1>
          <p className="lede">
            Three revenue layers, one moat. The first two pay for the team. The third is the
            venture. Every brand built on MAISON sends a fraction of every transaction back to the
            protocol for as long as it exists.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <span className="roman">I</span>
              <span className="section-title">Three layers · One stack</span>
            </div>
            <div className="grid gap-px bg-hairline md:grid-cols-3">
              <div className="bg-creme p-7">
                <p className="eyebrow">Layer 1</p>
                <p className="font-serif text-[32px]">The commission</p>
                <p className="mono mt-3 text-ink/54">€10,000 one-time</p>
                <p className="body-copy mt-7">
                  Brand system, site, supplier contracts, drop engine, payment rail. Two weeks of
                  focused strategy and build, bespoke where it matters.
                </p>
                <p className="eyebrow mt-8">Acquisition · linear</p>
              </div>
              <div className="bg-creme p-7">
                <p className="eyebrow">Layer 2</p>
                <p className="font-serif text-[32px]">The surface</p>
                <p className="mono mt-3 text-ink/54">€290-490/month</p>
                <p className="body-copy mt-7">
                  The venture lives here: hosting, drops, CRM, contracts, support. Switching cost
                  compounds with every drop, every contract, every buyer.
                </p>
                <p className="eyebrow mt-8">Retention · recurring</p>
              </div>
              <div className="bg-green p-7 text-creme">
                <p className="eyebrow text-creme/60">Layer 3 · The gold</p>
                <p className="font-serif text-[32px]">The protocol</p>
                <p className="mono mt-3 text-creme/58">5% of every transaction</p>
                <p className="mt-7 text-[16px] leading-7 text-creme/76">
                  SYMIONE underneath every payment, every drop, every conditional offer. Their
                  success is our success. Forever.
                </p>
                <p className="eyebrow mt-8 text-creme/60">Compounding · recursive</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <span className="roman">II</span>
              <span className="section-title">Recursive math · move the sliders</span>
            </div>

            <div>
              <label className="control-row">
                <span className="control-label">Ventures launched</span>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="10"
                  value={ventures}
                  onChange={(event) => setVentures(Number(event.target.value))}
                />
                <span className="control-value">{fmtNumber(ventures)}</span>
              </label>
              <label className="control-row">
                <span className="control-label">Avg venture revenue</span>
                <input
                  type="range"
                  min="20000"
                  max="2000000"
                  step="10000"
                  value={revenue}
                  onChange={(event) => setRevenue(Number(event.target.value))}
                />
                <span className="control-value">{fmtCurrency(revenue)}</span>
              </label>
              <label className="control-row">
                <span className="control-label">Avg platform retention</span>
                <input
                  type="range"
                  min="40"
                  max="95"
                  step="5"
                  value={retention}
                  onChange={(event) => setRetention(Number(event.target.value))}
                />
                <span className="control-value">{retention}%</span>
              </label>
            </div>

            <div className="mt-12 grid gap-px bg-hairline md:grid-cols-4">
              {[
                ["Layer 1 · commission", fmtCurrency(math.setup), "cohort one-time", false],
                ["Layer 2 · surface", fmtCurrency(math.platform), "ARR retained", false],
                ["Layer 3 · protocol", fmtCurrency(math.protocol), "5% of GMV, annual", true],
                ["Total annual", fmtCurrency(math.total), "first-year run-rate", false],
              ].map(([label, value, sub, featured]) => (
                <div key={String(label)} className={`${featured ? "bg-green text-creme" : "bg-creme"} p-6`}>
                  <p className={`control-label ${featured ? "text-creme/60" : ""}`}>{label}</p>
                  <p className="mt-3 font-serif text-[34px] leading-none">{value}</p>
                  <p className={`mono mt-3 ${featured ? "text-creme/58" : "text-ink/46"}`}>{sub}</p>
                </div>
              ))}
            </div>

            <AnimatedLineChart
              title="Year-over-year shape · layer 3 overtakes layer 1"
              labels={["Y1", "Y2", "Y3", "Y4", "Y5"]}
              lines={[
                { label: "setup", color: "rgba(26,26,26,0.42)", values: math.setupLine },
                { label: "platform", color: "#B8956A", values: math.platformLine },
                { label: "protocol", color: "#0F3D2E", values: math.protocolLine },
              ]}
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <span className="roman">III</span>
              <span className="section-title">Cohort behavior · Why it compounds</span>
            </div>
            <div className="grid gap-px bg-hairline md:grid-cols-3">
              {[
                ["The 95%", "€10-60K/yr", "Modest ventures. Pay the commission, stay on the surface, generate small protocol fees. Cover operations."],
                ["The 4%", "€200K-1M/yr", "Established brands. Material protocol fees. Reference cases. The proof layer for new founders."],
                ["The 1%", "€2-20M/yr", "Breakouts. €100K-1M annual protocol fees per brand. Each one alone justifies the venture."],
              ].map(([label, value, text]) => (
                <div key={label} className="bg-creme p-7">
                  <p className="eyebrow">{label}</p>
                  <p className="font-serif text-[38px] text-green">{value}</p>
                  <p className="body-copy mt-5">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section bg-green text-creme">
          <div className="section-inner text-center">
            <p className="mx-auto max-w-[640px] font-serif text-[36px] leading-tight md:text-[56px]">
              You generate the demand.
              <br />
              We capture the value.
              <br />
              <em>Both of us, forever.</em>
            </p>
            <p className="eyebrow mt-10 text-creme/60">The thesis · in one line</p>
          </div>
        </section>
      </Reveal>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-note">This is not AI. This is architecture.</span>
          <span className="eyebrow mb-0">SYMI Intelligence · Paris</span>
        </div>
      </footer>
    </main>
  );
}
