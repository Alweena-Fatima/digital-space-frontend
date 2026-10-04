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
    className="flower-garden"
    viewBox={`0 0 1200 ${GROUND}`}
    preserveAspectRatio="xMidYMax slice"
    style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 170 }}
  >
    {FLOWERS.map(([x, h, s, c]) => (
      <Flower key={x} x={x} h={h} s={s} c={c} />
    ))}
  </svg>
);

// ------------------------------------------------- cozy default (leaves)
const GREENS = ["#6FAE7C", "#5E9F6E", "#7DBB89", "#8CC795", "#4F9363"];

// x position (%), size (px), fall duration (s), delay (s)
const FALLING_LEAVES = [
  [6, 18, 20, 0],
  [18, 14, 26, 6],
  [31, 20, 22, 12],
  [44, 13, 28, 3],
  [57, 17, 24, 9],
  [69, 21, 21, 15],
  [81, 14, 27, 5],
  [93, 18, 23, 11],
];

// One leaf with a centre vein.
const LeafShape = ({ fill }) => (
  <>
    <path d="M12 1 C21 8 21 19 12 25 C3 19 3 8 12 1 Z" fill={fill} />
    <path d="M12 5 V23" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" fill="none" />
  </>
);

const FallingLeaf = ({ x, size, duration, delay, fill }) => (
  <svg
    viewBox="0 0 24 26"
    width={size}
    height={size * (26 / 24)}
    style={{
      position: "absolute",
      top: 0,
      left: `${x}%`,
      animation: `leafDrift ${duration}s linear ${delay}s infinite`,
    }}
  >
    <LeafShape fill={fill} />
  </svg>
);

// Leafy branch hanging from the top-right corner, just under the navbar.
const BRANCH_LEAVES = [
  [140, 24, -20, 0],
  [118, 38, 35, 1],
  [96, 50, -30, 2],
  [74, 64, 30, 3],
  [52, 78, -25, 4],
  [32, 92, 25, 0],
];

const Branch = () => (
  <svg
    viewBox="0 0 170 120"
    style={{
      position: "absolute",
      top: NAV_H - 14,
      right: 0,
      width: "clamp(90px, 15vw, 170px)",
    }}
  >
    <path d="M170 8 C130 14 85 36 22 100" fill="none" stroke="#6B9E6F" strokeWidth="2.5" strokeLinecap="round" />
    {BRANCH_LEAVES.map(([x, y, angle, g], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}>
        <g transform="scale(0.8) translate(-12 -13)">
          <LeafShape fill={GREENS[g % GREENS.length]} />
        </g>
      </g>
    ))}
  </svg>
);

const PLANT_LEAVES = [
  [0, 26, "#6FAE7C"],
  [-32, 22, "#5E9F6E"],
  [32, 22, "#7DBB89"],
  [-62, 17, "#6FAE7C"],
  [62, 17, "#5E9F6E"],
];

const Plant = ({ style, delay = 0 }) => (
  <svg viewBox="0 0 100 130" style={{ position: "absolute", bottom: 0, ...style }}>
    <g
      style={{
        transformOrigin: "50px 100px",
        animation: `plantSway 6s ease-in-out ${delay}s infinite`,
      }}
    >
      {PLANT_LEAVES.map(([angle, len, c]) => (
        <ellipse
          key={angle}
          cx="50"
          cy={100 - len - 4}
          rx="8"
          ry={len}
          fill={c}
          transform={`rotate(${angle} 50 100)`}
        />
      ))}
    </g>
    <path d="M30 100 H70 L64 128 H36 Z" fill="#C9A27E" />
    <rect x="28" y="96" width="44" height="7" rx="3" fill="#B98F68" />
  </svg>
);

const Plants = () => (
  <>
    {/* the leaf drifts all the way down the screen */}
    <style>{`
      @keyframes leafDrift {
        0%   { transform: translate(0, -40px) rotate(0deg); }
        25%  { transform: translate(28px, 25vh) rotate(90deg); }
        50%  { transform: translate(-22px, 50vh) rotate(180deg); }
        75%  { transform: translate(26px, 75vh) rotate(270deg); }
        100% { transform: translate(-8px, 112vh) rotate(360deg); }
      }
    `}</style>

    <Branch />

    {FALLING_LEAVES.map(([x, size, duration, delay], i) => (
      <FallingLeaf
        key={i}
        x={x}
        size={size}
        duration={duration}
        delay={delay}
        fill={GREENS[i % GREENS.length]}
      />
    ))}

    <Plant style={{ left: 14, width: "clamp(70px, 12vw, 120px)" }} />
    <Plant style={{ right: 18, width: "clamp(56px, 9vw, 92px)" }} delay={1.2} />
  </>
);

// ------------------------------------------------------------------- novel
const Novel = ({ color }) => (
  <svg className="bg-corner" width="140" height="110" viewBox="0 0 140 110" style={{ position: "absolute", bottom: 14, right: 24, opacity: 0.55 }}>
    <rect x="10" y="78" width="120" height="22" rx="3" {...line(color)} />
    <rect x="22" y="54" width="104" height="22" rx="3" {...line(color)} />
    <rect x="16" y="30" width="110" height="22" rx="3" {...line(color)} />
    <path d="M30 89 H60 M40 65 H70 M34 41 H64" {...line(color)} />
  </svg>
);

// Ribbon bookmarks hanging from under the navbar.
const BOOKMARKS = [
  // left (%), height (px), colour
  [4, 64, "#9B8FB8"],
  [8, 88, "#B7A8D0"],
  [12, 54, "#7A6F94"],
  [88, 72, "#A99BC6"],
  [92.5, 52, "#8B7FA8"],
];

const Bookmark = ({ left, height, fill }) => (
  <svg
    viewBox="0 0 24 70"
    width={(height * 24) / 70}
    height={height}
    style={{ position: "absolute", top: NAV_H - 20, left: `${left}%` }}
  >
    <path d="M2 0 H22 V68 L12 56 L2 68 Z" fill={fill} />
    <path d="M12 12 l1.8 3.8 4.2.5-3.1 2.9.8 4.1-3.7-2.1-3.7 2.1.8-4.1-3.1-2.9 4.2-.5z" fill="rgba(255,255,255,0.6)" />
  </svg>
);

// A small open book for the bottom-left corner.
const OpenBook = ({ color }) => (
  <svg
    className="bg-corner-left"
    width="120"
    height="84"
    viewBox="0 0 120 84"
    style={{ position: "absolute", bottom: 14, left: 24, opacity: 0.55 }}
  >
    <path d="M60 18 C46 8 24 8 8 14 V68 C24 62 46 62 60 72 Z" {...line(color)} />
    <path d="M60 18 C74 8 96 8 112 14 V68 C96 62 74 62 60 72 Z" {...line(color)} />
    <path d="M18 26 C30 22 44 24 52 28 M18 38 C30 34 44 36 52 40 M18 50 C30 46 44 48 52 52" {...line(color)} />
    <path d="M68 28 C76 24 90 22 102 26 M68 40 C76 36 90 34 102 38" {...line(color)} />
  </svg>
);

const SPARKLES = [
  [22, 38], [34, 62], [48, 30], [58, 74], [66, 44], [76, 82], [84, 34],
];

const NovelExtras = ({ color }) => (
  <>
    {BOOKMARKS.map(([left, height, fill], i) => (
      <Bookmark key={i} left={left} height={height} fill={fill} />
    ))}

    {SPARKLES.map(([x, y], i) => (
      <svg
        key={i}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        style={{ position: "absolute", left: `${x}%`, top: NAV_H + y, opacity: 0.6 }}
      >
        <path d="M6 0 V12 M0 6 H12" {...line(color)} />
      </svg>
    ))}

    <OpenBook color={color} />
  </>
);

// -------------------------------------------------------------------- cafe
const Cafe = ({ color }) => (
  <svg className="bg-corner" width="120" height="110" viewBox="0 0 120 110" style={{ position: "absolute", bottom: 14, right: 24, opacity: 0.55 }}>
    <path d="M20 40 H84 V70 A24 24 0 0 1 60 94 H44 A24 24 0 0 1 20 70 Z" {...line(color)} />
    <path d="M84 48 H94 A12 12 0 0 1 94 72 H82" {...line(color)} />
    <path d="M38 28 C34 20 42 16 38 8 M54 28 C50 20 58 16 54 8 M70 28 C66 20 74 16 70 8" {...line(color)} />
  </svg>
);

// Coffee beans scattered around the page.
const BEANS = [
  // left (%), top (px from nav) or bottom (px), size, rotation, shade
  { left: 3, top: NAV_H + 20, size: 22, rot: -25, shade: 0 },
  { left: 9, top: NAV_H + 64, size: 16, rot: 40, shade: 1 },
  { left: 91, top: NAV_H + 120, size: 20, rot: 15, shade: 1 },
  { left: 95, top: NAV_H + 168, size: 15, rot: -50, shade: 0 },
  { left: 2, bottom: 18, size: 24, rot: 20, shade: 0 },
  { left: 7, bottom: 52, size: 18, rot: -40, shade: 1 },
  { left: 12, bottom: 12, size: 16, rot: 65, shade: 0 },
  { left: 38, bottom: 10, size: 17, rot: -20, shade: 1 },
  { left: 44, bottom: 30, size: 21, rot: 35, shade: 0 },
  { left: 60, bottom: 14, size: 15, rot: -60, shade: 1 },
  { left: 72, bottom: 36, size: 19, rot: 10, shade: 0 },
];

const BEAN_COLORS = [
  ["#6B4A2F", "#3B2A1A"],
  ["#8A6240", "#4A3220"],
];

const CoffeeBean = ({ left, top, bottom, size, rot, shade }) => {
  const [body, crease] = BEAN_COLORS[shade];

  return (
    <svg
      viewBox="0 0 24 30"
      width={size}
      height={size * 1.25}
      style={{
        position: "absolute",
        left: `${left}%`,
        top,
        bottom,
        transform: `rotate(${rot}deg)`,
      }}
    >
      <ellipse cx="12" cy="15" rx="10" ry="14" fill={body} />
      <path d="M12 2 C6 10 18 20 12 28" fill="none" stroke={crease} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

const CafeExtras = () => (
  <>
    {BEANS.map((bean, i) => (
      <CoffeeBean key={i} {...bean} />
    ))}
  </>
);

const BackgroundEffects = ({ effect, color = "#888888" }) => (
  <div
    className="bg-effects"
    aria-hidden="true"
    style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
  >
    {effect === "midnight" && <Midnight color={color} />}
    {effect === "flower" && <FlowerGarden />}
    {effect === "plants" && <Plants />}
    {effect === "novel" && (
      <>
        <Novel color={color} />
        <NovelExtras color={color} />
      </>
    )}
    {effect === "cafe" && (
      <>
        <Cafe color={color} />
        <CafeExtras />
      </>
    )}
  </div>
);

export default BackgroundEffects;