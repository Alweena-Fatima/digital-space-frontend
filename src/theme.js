// Old room ids from the backend/localStorage still resolve to the new themes.
const LEGACY = { rain: "midnight", autumn: "flower" };

export const normalizeThemeKey = (key = "") => {
  const k = String(key).toLowerCase();
  return LEGACY[k] || k;
};
const BACKEND = { midnight: "RAIN", flower: "AUTUMN" };

export const toBackendTheme = (id) => BACKEND[id] || id.toUpperCase();

export const THEMES = {
  // ---------------------------------------------------------------- default
  default: {
    label: "Cozy Default",
    desc: "Warm parchment and soft greens",
    emoji: "🌿",

    pageBg: "linear-gradient(160deg, #F4EAD6 0%, #EADCC1 55%, #DCCBA9 100%)",
    navBg: "#FCF8EF",
    navBorder: "#D9CBAE",

    cardBg: "#FFFAF0",
    cardHoverBg: "#FFFFFF",

    inputBg: "#FFFFFF",
    inputBorder: "#D2C1A1",
    inputFocus: "#4F7A57",

    text: "#332A1E",
    textLight: "#5B4D3A",
    textMuted: "#8A7C66",

    accent: "#C66F56",
    accentDark: "#9F503D",
    accentLight: "#D9937D",

    green: "#4F7A57",
    greenDark: "#3A5E42",
    greenLight: "#7BA283",

    shadow: "rgba(67, 53, 35, 0.14)",
    bgLight: "#F3E8D3",
    bgDark: "#CCB993",
    progressBg: "#E2D3B5",

    badge: "rgba(79, 122, 87, 0.12)",
    todoHover: "rgba(79, 122, 87, 0.07)",
    selectBg: "rgba(79, 122, 87, 0.12)",

    bgEffect: "none",
  },

  // --------------------------------------------------------------- midnight
  midnight: {
    label: "Midnight Room",
    desc: "Indigo sky, a little moon and stars",
    emoji: "🌙",

    pageBg: "linear-gradient(160deg, #151A30 0%, #1E2441 55%, #12162B 100%)",
    navBg: "#171C35",
    navBorder: "#2E365C",

    cardBg: "#222A4A",
    cardHoverBg: "#2B3560",

    inputBg: "#1A2041",
    inputBorder: "#3B4572",
    inputFocus: "#9AA5F5",

    text: "#F4F1FF",
    textLight: "#C9CDEA",
    textMuted: "#8F96C4",

    accent: "#8C97EE",
    accentDark: "#6672D6",
    accentLight: "#B3BCFA",

    green: "#7C88E6",
    greenDark: "#5F6BD0",
    greenLight: "#AAB3F8",

    shadow: "rgba(5, 8, 25, 0.45)",
    bgLight: "#2B3560",
    bgDark: "#0E1226",
    progressBg: "#1B2244",

    badge: "rgba(140, 151, 238, 0.18)",
    todoHover: "rgba(140, 151, 238, 0.10)",
    selectBg: "rgba(140, 151, 238, 0.16)",

    bgEffect: "midnight",
  },

  // ----------------------------------------------------------------- flower
  flower: {
    label: "Flower Room",
    desc: "Blush pink with a garden at your feet",
    emoji: "🌸",

    pageBg: "linear-gradient(160deg, #FFF6F1 0%, #FDE9EE 55%, #F8DCE8 100%)",
    navBg: "#FFF9F6",
    navBorder: "#F2CFD9",

    cardBg: "#FFFAF8",
    cardHoverBg: "#FFFFFF",

    inputBg: "#FFFFFF",
    inputBorder: "#EBC4D0",
    inputFocus: "#D9648A",

    text: "#4A2B38",
    textLight: "#75485A",
    textMuted: "#A67A8A",

    accent: "#D9648A",
    accentDark: "#B9466C",
    accentLight: "#EE92AF",

    green: "#D9648A",
    greenDark: "#B9466C",
    greenLight: "#EE92AF",

    shadow: "rgba(150, 70, 100, 0.14)",
    bgLight: "#FCE4EA",
    bgDark: "#F0BCCB",
    progressBg: "#F7D5DF",

    badge: "rgba(217, 100, 138, 0.13)",
    todoHover: "rgba(217, 100, 138, 0.07)",
    selectBg: "rgba(217, 100, 138, 0.12)",

    bgEffect: "flower",
  },

  // ------------------------------------------------------------------ novel
  novel: {
    label: "Novel Room",
    desc: "Greyish lavender and quiet pages",
    emoji: "📖",

    pageBg: "linear-gradient(160deg, #F2F0F5 0%, #E4E0EB 55%, #D4CFDE 100%)",
    navBg: "#F7F5F9",
    navBorder: "#D0CADA",

    cardBg: "#F8F6FA",
    cardHoverBg: "#FFFFFF",

    inputBg: "#FFFFFF",
    inputBorder: "#C6BFD3",
    inputFocus: "#7A6F94",

    text: "#2F2B3A",
    textLight: "#565069",
    textMuted: "#857F9A",

    accent: "#7A6F94",
    accentDark: "#5C5275",
    accentLight: "#A39BB8",

    green: "#7A6F94",
    greenDark: "#5C5275",
    greenLight: "#A39BB8",

    shadow: "rgba(60, 50, 80, 0.12)",
    bgLight: "#E8E4EF",
    bgDark: "#BDB6CC",
    progressBg: "#DAD5E4",

    badge: "rgba(122, 111, 148, 0.13)",
    todoHover: "rgba(122, 111, 148, 0.07)",
    selectBg: "rgba(122, 111, 148, 0.12)",

    bgEffect: "novel",
  },

  // ------------------------------------------------------------------- cafe
  cafe: {
    label: "Matcha Cafe",
    desc: "Earthy matcha green and warm brown",
    emoji: "🍵",

    pageBg: "linear-gradient(160deg, #F4EFDE 0%, #E7E1C8 55%, #D7D0AF 100%)",
    navBg: "#F8F4E6",
    navBorder: "#D4CBA8",

    cardBg: "#FAF6E9",
    cardHoverBg: "#FFFDF5",

    inputBg: "#FFFDF5",
    inputBorder: "#CBBF98",
    inputFocus: "#7B8450",

    text: "#3B2E20",
    textLight: "#5E4A34",
    textMuted: "#8E7C60",

    accent: "#7B8450",
    accentDark: "#5C6539",
    accentLight: "#A3AC78",

    green: "#7B8450",
    greenDark: "#5C6539",
    greenLight: "#A3AC78",

    shadow: "rgba(80, 60, 30, 0.14)",
    bgLight: "#ECE6CE",
    bgDark: "#C4B98F",
    progressBg: "#DED7B8",

    badge: "rgba(123, 132, 80, 0.15)",
    todoHover: "rgba(123, 132, 80, 0.08)",
    selectBg: "rgba(123, 132, 80, 0.14)",

    bgEffect: "cafe",
  },
};

export const getTheme = (key) =>
  THEMES[normalizeThemeKey(key)] || THEMES.default;