import React, { useEffect, useRef } from "react";
import { createWebSocketClient } from "../websocket";
// import { THEMES, normalizeThemeKey } from "../theme";
import { API_URL } from "../../config";
import { THEMES, normalizeThemeKey, toBackendTheme } from "../theme";
const ORDER = ["default", "midnight", "flower", "novel", "cafe"];

// =======================
// THEME CARD
// =======================

const ThemeCard = ({ id, sel, onSel }) => {
  const theme = THEMES[id];
  const isFull = id === "default";

  return (
    <div
      onClick={() => onSel(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSel(id)}
      style={{
        gridColumn: isFull ? "1 / -1" : undefined,
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 18px",
        borderRadius: 22,
        cursor: "pointer",
        background: theme.pageBg,
        border: `2px solid ${sel ? theme.accent : theme.navBorder}`,
        boxShadow: sel ? `0 8px 22px ${theme.shadow}` : "none",
        transform: sel ? "translateY(-2px)" : "none",
        transition: "all .25s ease",
      }}
    >
      {/* Emoji bubble */}
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          background: theme.cardBg,
          border: `1px solid ${theme.navBorder}`,
        }}
      >
        {theme.emoji}
      </div>

      {/* Name + description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className="hand"
          style={{
            fontSize: 17,
            color: theme.text,
            lineHeight: 1.15,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {theme.label}
        </div>
        <p
          style={{
            fontSize: 11.5,
            fontWeight: 500,
            color: theme.textMuted,
            marginTop: 3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {theme.desc}
        </p>
      </div>

      {/* Palette dots, or a check when selected */}
      {sel ? (
        <div
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: theme.accent,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✓
        </div>
      ) : (
        <div style={{ display: "flex", flexShrink: 0 }}>
          {[theme.accent, theme.accentLight, theme.bgDark].map((c, i) => (
            <span
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: c,
                marginLeft: i ? -4 : 0,
                border: `1.5px solid ${theme.cardBg}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// =======================
// THEMES PAGE
// =======================

const Themes = ({ roomCode, sel, setSel, t }) => {
  const wsClient = useRef(null);

  // REAL-TIME THEME UPDATES
  useEffect(() => {
    if (!roomCode) return;

    wsClient.current = createWebSocketClient((client) => {
      client.subscribe(`/topic/room/${roomCode}/theme`, (message) => {
        const updatedRoom = JSON.parse(message.body);
        // Backend sends an enum like "MIDNIGHT"; old values (RAIN, AUTUMN) are mapped too.
        setSel(normalizeThemeKey(updatedRoom.theme));
      });
    });

    return () => {
      if (wsClient.current) {
        wsClient.current.deactivate();
        wsClient.current = null;
      }
    };
  }, [roomCode, setSel]);

  // CHANGE THEME
  const handleThemeSelect = async (id) => {
    const previous = sel;
    setSel(id); // instant feedback

    try {
      const response = await fetch(
        `${API_URL}/api/rooms/${roomCode}/theme?theme=${toBackendTheme(id)}`,
        { method: "PUT" }
      );
      if (!response.ok) throw new Error("Failed to update theme");
    } catch (error) {
      console.error("Error updating theme:", error);
      setSel(previous); // roll back if the server rejected it
    }
  };

  return (
    <div
      className="page"
      style={{ padding: "96px 24px 190px", maxWidth: 760, margin: "0 auto" }}
    >
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <div className="hand" style={{ fontSize: 30, color: t.text }}>
          Choose your room 🌸
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: t.textMuted, marginTop: 4 }}>
          Pick the mood for everyone in the room
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {ORDER.map((id) => (
          <ThemeCard key={id} id={id} sel={sel === id} onSel={handleThemeSelect} />
        ))}
      </div>

      {sel && THEMES[sel] && (
        <p
          style={{
            textAlign: "center",
            marginTop: 18,
            fontSize: 13,
            color: t.green,
            fontWeight: 700,
            animation: "fadeUp .4s ease",
          }}
        >
          {THEMES[sel].label} is on ✨
        </p>
      )}
    </div>
  );
};

export default Themes;