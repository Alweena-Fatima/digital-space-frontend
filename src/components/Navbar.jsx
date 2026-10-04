import React, { useState } from "react";

const NAV_ITEMS = [
  { id: "home", icon: "🏡", text: "Home" },
  { id: "themes", icon: "🌸", text: "Themes" },
  { id: "study", icon: "👥", text: "Study" },
  { id: "library", icon: "📚", text: "Library" },
  { id: "about", icon: "🌿", text: "About" },
];

const playNavigationSound = () => {
  const navigationSound = new Audio("/sound/navsound.wav");
  navigationSound.volume = 0.2;
  navigationSound.play().catch(() => {});
};

const Navbar = ({ page, setPage, displayName, theme }) => {
  // Only used on phones, where the links collapse into a menu.
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="top-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: theme.navBg,
        backdropFilter: "blur(14px)",
        borderBottom: `1.5px solid ${theme.navBorder}`,
        padding: "11px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ fontSize: 20 }}></span>

        <span
          className="hand"
          style={{ fontSize: 22, color: theme.green, fontWeight: 700 }}
        >
          Digital Space
        </span>
      </div>

      <div
        className={`nav-links ${menuOpen ? "open" : ""}`}
        style={{ display: "flex", gap: 3 }}
      >
        {NAV_ITEMS.map((navItem) => (
          <button
            key={navItem.id}
            className={`nav-i ${page === navItem.id ? "act" : ""}`}
            onClick={() => {
              setPage(navItem.id);
              setMenuOpen(false);
              playNavigationSound();
            }}
          >
            <span className="nav-ic">{navItem.icon}</span>{" "}
            <span className="nav-tx">{navItem.text}</span>
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.green}, ${theme.greenLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {displayName?.[0]?.toUpperCase() || "?"}
        </div>

        <span
          className="nav-user"
          style={{ fontSize: 13, color: theme.textLight, fontWeight: 600 }}
        >
          {displayName || "Guest"}
        </span>

        {/* Hamburger: visible on phones only */}
        <button
          className="nav-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;