import React from "react";

// Usage: <BackgroundEffects effect={theme.bgEffect} color={t.textMuted} />
// Everything that sits at the top is offset by NAV_H so the navbar never covers it.
const NAV_H = 84;

const STARS = [
  [6, 22], [13, 70], [21, 34], [29, 90], [38, 26], [46, 66],
  [55, 38], [63, 84], [71, 24], [79, 60], [87, 40], [94, 76],
];

const line = (color) => ({
  fill: "none",
  stroke: color,
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

// ---------------------------------------------------------------- midnight
const Midnight = ({ color }) => (
  <>
    {STARS.map(([x, y], i) => (
      <svg
        key={i}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        style={{ position: "absolute", left: `${x}%`, top: NAV_H + y, opacity: 0.6 }}
      >
        <path d="M5 0 V10 M0 5 H10" {...line(color)} />
      </svg>
    ))}
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      style={{ position: "absolute", top: NAV_H + 12, right: "8%", opacity: 0.8 }}
    >
      <path d="M44 8 A26 26 0 1 0 56 44 A20 20 0 0 1 44 8 Z" {...line(color)} fill={color} fillOpacity="0.12" />
    </svg>
  </>
);

// ------------------------------------------------------------------ flower
const FLOWERS = [
  // x, stem height, scale, petal colour
  [50, 70, 1.0, "#F28AA8"],
  [150, 110, 1.2, "#F6B26B"],
  [255, 60, 0.9, "#B79CED"],
  [350, 95, 1.1, "#7FC8E8"],
  [455, 120, 1.3, "#F28AA8"],
  [560, 65, 0.9, "#F5DF72"],
  [660, 100, 1.15, "#E57373"],
  [765, 75, 1.0, "#B79CED"],
  [865, 118, 1.25, "#F6B26B"],
  [965, 62, 0.9, "#7FC8E8"],
  [1065, 98, 1.1, "#F5DF72"],
  [1150, 72, 1.0, "#F28AA8"],
];

const GROUND = 170;
const ANGLES = [0, 60, 120, 180, 240, 300];

const Flower = ({ x, h, s, c }) => (
  <g>
    <path
      d={`M${x} ${GROUND} C${x - 6} ${GROUND - h / 2} ${x + 6} ${GROUND - h / 2} ${x} ${GROUND - h}`}
      fill="none"
      stroke="#7DAA77"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <ellipse
      cx={x + 10}
      cy={GROUND - h * 0.35}
      rx="10"
      ry="4.5"
      fill="#8DBB86"
      transform={`rotate(-30 ${x + 10} ${GROUND - h * 0.35})`}
    />
    <g transform={`translate(${x} ${GROUND - h}) scale(${s})`}>
      {ANGLES.map((a) => (
        <ellipse key={a} cx="0" cy="-10" rx="6.5" ry="10" fill={c} opacity="0.95" transform={`rotate(${a})`} />
      ))}
      <circle r="5" fill="#FFD66B" />
    </g>
  </g>
);

const FlowerGarden = () => (
  <svg
    viewBox={`0 0 1200 ${GROUND}`}
    preserveAspectRatio="xMidYMax slice"
    style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 170 }}
  >
    {FLOWERS.map(([x, h, s, c]) => (
      <Flower key={x} x={x} h={h} s={s} c={c} />
    ))}
  </svg>
);

// ------------------------------------------------------------------- novel
const Novel = ({ color }) => (
  <svg width="140" height="110" viewBox="0 0 140 110" style={{ position: "absolute", bottom: 14, right: 24, opacity: 0.55 }}>
    <rect x="10" y="78" width="120" height="22" rx="3" {...line(color)} />
    <rect x="22" y="54" width="104" height="22" rx="3" {...line(color)} />
    <rect x="16" y="30" width="110" height="22" rx="3" {...line(color)} />
    <path d="M30 89 H60 M40 65 H70 M34 41 H64" {...line(color)} />
  </svg>
);

// -------------------------------------------------------------------- cafe
const Cafe = ({ color }) => (
  <svg width="120" height="110" viewBox="0 0 120 110" style={{ position: "absolute", bottom: 14, right: 24, opacity: 0.55 }}>
    <path d="M20 40 H84 V70 A24 24 0 0 1 60 94 H44 A24 24 0 0 1 20 70 Z" {...line(color)} />
    <path d="M84 48 H94 A12 12 0 0 1 94 72 H82" {...line(color)} />
    <path d="M38 28 C34 20 42 16 38 8 M54 28 C50 20 58 16 54 8 M70 28 C66 20 74 16 70 8" {...line(color)} />
  </svg>
);

const BackgroundEffects = ({ effect, color = "#888888" }) => (
  <div
    className="bg-effects"
    aria-hidden="true"
    style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
  >
    {effect === "midnight" && <Midnight color={color} />}
    {effect === "flower" && <FlowerGarden />}
    {effect === "novel" && <Novel color={color} />}
    {effect === "cafe" && <Cafe color={color} />}
  </div>
);

export default BackgroundEffects;