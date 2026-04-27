"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

type ChartLine = {
  label: string;
  color: string;
  values: number[];
};

export function AnimatedLineChart({
  lines,
  labels,
  title,
}: {
  lines: ChartLine[];
  labels: string[];
  title: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const animatedRef = useRef(false);

  const paths = useMemo(() => {
    const width = 640;
    const height = 230;
    const pad = 34;
    const max = Math.max(...lines.flatMap((line) => line.values), 1);
    const xStep = (width - pad * 2) / Math.max(labels.length - 1, 1);
    const yScale = (height - pad * 2) / max;

    return lines.map((line) => {
      const d = line.values
        .map((value, index) => {
          const x = pad + index * xStep;
          const y = height - pad - value * yScale;
          return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(" ");

      return { ...line, d };
    });
  }, [labels.length, lines]);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const paths = Array.from(node.querySelectorAll<SVGPathElement>("path[data-animated='true']"));

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = animatedRef.current ? "0" : String(length);
    });

    if (animatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        animatedRef.current = true;
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.12,
        });
        observer.disconnect();
      },
      { threshold: 0.28 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [paths]);

  return (
    <div ref={wrapRef} className="mt-12">
      <p className="eyebrow mb-5">{title}</p>
      <svg viewBox="0 0 640 230" width="100%" role="img" aria-label={title}>
        <line x1="34" y1="196" x2="606" y2="196" stroke="currentColor" strokeOpacity="0.15" />
        {paths.map((line) => (
          <path
            key={line.label}
            data-animated="true"
            d={line.d}
            fill="none"
            stroke={line.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={line.color === "#0F3D2E" ? 2.5 : 1.6}
          />
        ))}
        {labels.map((label, index) => {
          const x = 34 + index * ((640 - 68) / Math.max(labels.length - 1, 1));
          return (
            <text
              key={label}
              x={x}
              y="218"
              fill="currentColor"
              opacity="0.48"
              textAnchor="middle"
              className="mono"
            >
              {label}
            </text>
          );
        })}
        <g>
          {paths.map((line, index) => (
            <g key={line.label} transform={`translate(${34 + index * 138}, 20)`}>
              <circle cx="0" cy="0" r="3" fill={line.color} />
              <text x="10" y="4" fill="currentColor" opacity="0.64" className="mono">
                {line.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
