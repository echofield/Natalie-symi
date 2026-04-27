"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AmbientParticles } from "@/components/AmbientParticles";
import { AnimatedLineChart } from "@/components/AnimatedLineChart";
import { Reveal } from "@/components/Reveal";

function fmtCurrency(n: number) {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(n >= 10_000_000 ? 1 : 2)}M`;
  if (n >= 1_000) return `€${Math.round(n / 1_000)}K`;
  return `€${Math.round(n)}`;
}

function fmtNumber(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

export function EconomicsPage() {
  const [audience, setAudience] = useState(361000);
  const [conversion, setConversion] = useState(0.015);
  const [average, setAverage] = useState(290);
  const [retention, setRetention] = useState(14);

  const math = useMemo(() => {
    const founders = audience * conversion;
    const monthly = founders * average;
    const annual = monthly * 12;
    const lifetime = founders * average * retention;
    const path = [0.08, 0.22, 0.38, 0.58, 0.78, 1].map((ratio) => annual * ratio);
    const platform = path.map((value) => value * 0.72);
    const atelier = path.map((value, index) => value * (0.16 + index * 0.025));
    return { founders, monthly, annual, lifetime, path, platform, atelier };
  }, [audience, conversion, average, retention]);

  return (
    <main className="editorial-shell">
      <section className="hero">
        <AmbientParticles />
        <div className="hero-inner relative z-10">
          <p className="eyebrow">MAISON economics · For Natali · Confidential</p>
          <h1 className="headline">
            A <em>€50M</em> brand engine, built on your distribution.
          </h1>
          <p className="lede">
            The math behind why this is venture-scale, not a side product. Adjust the inputs;
            the model recalculates live. Conservative defaults shown.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <span className="roman">I</span>
              <span className="section-title">Thesis</span>
            </div>
            <p className="font-serif text-[30px] leading-[1.32] text-ink md:text-[40px]">
              You currently convert <em className="accent">~1%</em> of your audience into
              €5-10K/month service clients. The other <em className="accent">99%</em> have no
              offer. MAISON is the offer for the 99%: productized, recurring, and designed
              so the rare summit founders finance the broad base.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <span className="roman">II</span>
              <span className="section-title">Revenue engine · adjust live</span>
            </div>

            <div>
              <label className="control-row">
                <span className="control-label">Audience reach</span>
                <input
                  type="range"
                  min="100000"
                  max="1000000"
                  step="10000"
                  value={audience}
                  onChange={(event) => setAudience(Number(event.target.value))}
                />
                <span className="control-value">{fmtNumber(audience)}</span>
              </label>
              <label className="control-row">
                <span className="control-label">Conversion to platform</span>
                <input
                  type="range"
                  min="0.005"
                  max="0.05"
                  step="0.001"
                  value={conversion}
                  onChange={(event) => setConversion(Number(event.target.value))}
                />
                <span className="control-value">{(conversion * 100).toFixed(1)}%</span>
              </label>
              <label className="control-row">
                <span className="control-label">Average monthly value</span>
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="10"
                  value={average}
                  onChange={(event) => setAverage(Number(event.target.value))}
                />
                <span className="control-value">€{average}</span>
              </label>
              <label className="control-row">
                <span className="control-label">Retention</span>
                <input
                  type="range"
                  min="6"
                  max="36"
                  step="1"
                  value={retention}
                  onChange={(event) => setRetention(Number(event.target.value))}
                />
                <span className="control-value">{retention} mo</span>
              </label>
            </div>

            <div className="mt-12 grid gap-px bg-hairline md:grid-cols-4">
              {[
                ["Active founders", fmtNumber(math.founders), "at saturation"],
                ["Monthly recurring", fmtCurrency(math.monthly), "steady-state"],
                ["Annual recurring", fmtCurrency(math.annual), "run-rate"],
                ["Lifetime value", fmtCurrency(math.lifetime), "cohort LTV"],
              ].map(([label, value, sub]) => (
                <div key={label} className="bg-creme p-6">
                  <p className="control-label">{label}</p>
                  <p className="mt-3 font-serif text-[38px] leading-none text-ink">{value}</p>
                  <p className="mono mt-3 text-ink/46">{sub}</p>
                </div>
              ))}
            </div>

            <AnimatedLineChart
              title="12-month shape · recurring value overtakes launch value"
              labels={["M1", "M3", "M5", "M7", "M9", "M12"]}
              lines={[
                { label: "total", color: "#0F3D2E", values: math.path },
                { label: "platform", color: "#B8956A", values: math.platform },
                { label: "atelier", color: "rgba(26,26,26,0.45)", values: math.atelier },
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
              <span className="section-title">Atelier structure · Diamond architecture</span>
            </div>
            <div className="grid gap-px bg-hairline md:grid-cols-3">
              <div className="bg-creme p-7">
                <p className="font-serif text-[30px]">Spark</p>
                <p className="eyebrow mt-3">Entry · widest layer</p>
                <p className="mt-7 font-serif text-[38px]">€99</p>
                <p className="body-copy mt-4">
                  Brand intelligence engine. Self-serve dossier, monthly drop scripts, community
                  access. The broad base lives here.
                </p>
              </div>
              <div className="bg-green p-7 text-creme">
                <p className="font-serif text-[30px]">Studio</p>
                <p className="eyebrow mt-3 text-creme/60">Core · build mode</p>
                <p className="mt-7 font-serif text-[38px]">€290</p>
                <p className="mt-4 text-[16px] leading-7 text-creme/76">
                  Full stack: site launcher, supplier contracts, drop engine, conditional
                  payments. The system underneath.
                </p>
              </div>
              <div className="bg-creme p-7">
                <p className="font-serif text-[30px]">Atelier</p>
                <p className="eyebrow mt-3">Summit · rare</p>
                <p className="mt-7 font-serif text-[38px]">€2,400</p>
                <p className="body-copy mt-4">
                  Direct access. Custom audit. Founder cohort. Self-finances the rest. Capped at
                  30 founders.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <span className="roman">IV</span>
              <span className="section-title">Role split · Distribution × Build</span>
            </div>
            <div className="grid gap-px bg-hairline md:grid-cols-2">
              <div className="bg-creme p-7">
                <p className="eyebrow">Natali</p>
                <p className="font-serif text-[34px]">The face and the engine</p>
                <ul className="body-copy mt-7 list-none space-y-3 p-0">
                  <li>Distribution and content authority</li>
                  <li>Brand methodology curation</li>
                  <li>Founder community and cohort calls</li>
                  <li>Reel scripts feeding the engine</li>
                  <li>Partnership and PR positioning</li>
                </ul>
              </div>
              <div className="bg-creme p-7">
                <p className="eyebrow">SYMI</p>
                <p className="font-serif text-[34px]">The system and the rail</p>
                <ul className="body-copy mt-7 list-none space-y-3 p-0">
                  <li>Platform build and product roadmap</li>
                  <li>AI dossier engine and supply integrations</li>
                  <li>Drop logic, payments, and legal stack</li>
                  <li>Engineering, operations, and support</li>
                  <li>Conditional payment layer through SYMIONE</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <span className="roman">V</span>
              <span className="section-title">12-month trajectory · Conservative path</span>
            </div>
            <div className="grid gap-px bg-hairline md:grid-cols-4">
              {[
                ["Month 3", "€45K MRR", "Beta cohort live. 200 Spark, 40 Studio. Product-market signal."],
                ["Month 6", "€180K MRR", "Public launch. 1,200 Spark, 250 Studio, first Atelier cohort filled."],
                ["Month 12", "€600K MRR", "€7.2M ARR. Scaling international. Series A optional."],
                ["Month 24", "€1.5M MRR", "€18M ARR. Category-defining position. Acquisition or scale."],
              ].map(([month, value, text]) => (
                <div key={month} className="bg-creme p-6">
                  <p className="eyebrow">{month}</p>
                  <p className="font-serif text-[32px] text-green">{value}</p>
                  <p className="body-copy mt-4 text-[14px]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section bg-green text-creme">
          <div className="section-inner text-center">
            <p className="eyebrow text-creme/60">Venture-scale ceiling</p>
            <h2 className="display text-creme">€50M</h2>
            <p className="mx-auto mt-8 max-w-[560px] text-[16px] leading-7 text-creme/76">
              Achievable revenue at saturation across geographies, with the existing audience as
              kernel. Not a forecast; a structural ceiling.
            </p>
          </div>
        </section>
      </Reveal>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-note">Built in 48 hours. Imagine what we build in 48 weeks.</span>
          <Link href="/thesis" className="quiet-link">
            and here&apos;s why it compounds →
          </Link>
        </div>
      </footer>
    </main>
  );
}
