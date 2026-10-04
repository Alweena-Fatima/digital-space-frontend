import React from "react";

// Fonts: Mali (small, cute handwritten headings) + Quicksand (light, friendly body)
const GlobalStyles = ({ theme }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Mali:wght@400;500;600&family=Quicksand:wght@400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: ${theme.pageBg};
      background-attachment: fixed;
      font-family: 'Quicksand', sans-serif;
      color: ${theme.text};
      min-height: 100vh;
      overflow-x: hidden;
      transition: background 0.6s ease, color 0.4s ease;
    }

    /* kept as ".hand" so existing markup keeps working */
    .hand {
      font-family: 'Mali', cursive;
      font-weight: 500;
      letter-spacing: 0;
      zoom: 0.8; /* scales every heading down ~20% so it feels lighter and cuter */
    }

    /* ---------- cards: soft gradient, thin border, gentle shadow ---------- */
    .card {
      background: linear-gradient(150deg, ${theme.cardBg} 0%, ${theme.bgLight} 100%);
      border: 1px solid ${theme.navBorder};
      border-radius: 24px;
      box-shadow: 0 6px 20px ${theme.shadow};
      transition: background 0.4s ease, box-shadow 0.3s ease, transform 0.3s ease;
    }

    .card-h:hover {
      transform: translateY(-2px);
      background: ${theme.cardHoverBg};
      box-shadow: 0 10px 26px ${theme.shadow};
    }

    /* ---------- buttons ---------- */
    .btn-g {
      background: ${theme.green};
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 11px 26px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-g:hover { background: ${theme.greenDark}; transform: translateY(-1px); }
    .btn-g:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .btn-o {
      background: transparent;
      color: ${theme.green};
      border: 1.5px solid ${theme.green};
      border-radius: 50px;
      padding: 10px 26px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-o:hover { background: ${theme.badge}; transform: translateY(-1px); }

    /* ---------- inputs ---------- */
    .inp {
      width: 100%;
      background: ${theme.inputBg};
      border: 1.5px solid ${theme.inputBorder};
      border-radius: 14px;
      padding: 12px 16px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 500;
      font-size: 14px;
      color: ${theme.text};
      outline: none;
      transition: all 0.2s ease;
    }
    .inp:focus { border-color: ${theme.inputFocus}; box-shadow: 0 0 0 3px ${theme.inputFocus}25; }
    .inp::placeholder { color: ${theme.textMuted}; }

    .lbl {
      font-size: 12px;
      font-weight: 600;
      color: ${theme.textMuted};
      margin-bottom: 8px;
    }

    /* ---------- keyframes ---------- */
    @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
    @keyframes glow { 0%, 100% { box-shadow: 0 0 8px ${theme.green}40; } 50% { box-shadow: 0 0 20px ${theme.green}70; } }
    @keyframes steam { 0% { transform: translateY(0) scaleX(1); opacity: 0.7; } 100% { transform: translateY(-36px) scaleX(1.8); opacity: 0; } }
    @keyframes rainFall { from { transform: translateY(-120px); } to { transform: translateY(110vh); } }
    @keyframes leafFall { 0% { transform: translateY(-100px) rotate(0deg); } 50% { transform: translateX(40px) rotate(180deg); } 100% { transform: translateY(110vh) translateX(-40px) rotate(360deg); } }
    @keyframes floatUp { 0% { transform: translateY(20px); opacity: 0; } 50% { opacity: 0.15; } 100% { transform: translateY(-120px); opacity: 0; } }
    @keyframes plantSway { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
    @keyframes bookFloat { 0%, 100% { transform: translateY(0) rotate(-6deg); opacity: 0.12; } 50% { transform: translateY(-16px) rotate(-2deg); opacity: 0.18; } }

    .page { animation: fadeUp 0.4s ease forwards; position: relative; z-index: 1; }

    /* ---------- sound buttons ---------- */
    .snd-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      padding: 13px 8px;
      background: ${theme.inputBg};
      border: 1.5px solid ${theme.inputBorder};
      border-radius: 18px;
      cursor: pointer;
      transition: all 0.25s ease;
      font-family: 'Quicksand', sans-serif;
      font-size: 12px;
      font-weight: 600;
      color: ${theme.textLight};
      min-width: 70px;
    }
    .snd-btn:hover { transform: translateY(-2px); border-color: ${theme.green}; }
    .snd-btn.on { background: ${theme.badge}; border-color: ${theme.green}; color: ${theme.green}; animation: glow 2.4s ease infinite; }

    /* ---------- todos ---------- */
    .todo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: ${theme.inputBg};
      border-radius: 14px;
      margin-bottom: 8px;
      border: 1.5px solid ${theme.inputBorder};
      transition: all 0.2s ease;
      font-size: 13px;
      font-weight: 500;
    }
    .todo:hover { border-color: ${theme.green}80; background: ${theme.todoHover}; }

    .chk {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid ${theme.textMuted};
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chk.done { background: ${theme.green}; border-color: ${theme.green}; }

    /* ---------- chat ---------- */
    .bubble {
      max-width: 75%;
      padding: 10px 15px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      line-height: 1.5;
      animation: fadeUp 0.3s ease;
    }
    .bubble.me { background: ${theme.green}; color: #fff; border-bottom-right-radius: 6px; align-self: flex-end; }
    .bubble.them { background: ${theme.inputBg}; color: ${theme.text}; border-bottom-left-radius: 6px; border: 1px solid ${theme.inputBorder}; }

    /* ---------- word + quote cards ---------- */
    .wcard {
      background: ${theme.inputBg};
      border-radius: 16px;
      padding: 14px;
      border-left: 4px solid ${theme.green};
      transition: all 0.25s ease;
      margin-bottom: 10px;
    }
    .wcard:hover { transform: translateX(3px); background: ${theme.cardHoverBg}; }

    .qcard {
      background: ${theme.cardBg};
      border-radius: 18px;
      padding: 18px;
      border: 1px solid ${theme.inputBorder};
      position: relative;
      transition: all 0.25s ease;
      margin-bottom: 12px;
    }
    .qcard:hover { transform: translateY(-2px); background: ${theme.cardHoverBg}; }
    .qcard::before {
      content: '"';
      position: absolute;
      top: -4px;
      left: 10px;
      font-family: 'Mali', cursive;
      font-size: 52px;
      color: ${theme.green}30;
      line-height: 1;
    }

    /* ---------- nav ---------- */
    .nav-i {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 8px 14px;
      border-radius: 50px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 600;
      font-size: 13px;
      color: ${theme.textLight};
      transition: all 0.2s ease;
    }
    .nav-i:hover { color: ${theme.green}; }
    .nav-i.act { color: ${theme.green}; font-weight: 700; background: ${theme.selectBg}; }

    .timer-r { transition: stroke-dashoffset 0.5s ease; }

    input[type=range] { width: 100%; -webkit-appearance: none; height: 6px; border-radius: 3px; outline: none; cursor: pointer; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${theme.green}; cursor: pointer; }

    .bg-effects { position: fixed; inset: 0; z-index: 5; pointer-events: none; overflow: hidden; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${theme.bgLight}; border-radius: 10px; }
    ::-webkit-scrollbar-thumb { background: ${theme.textMuted}; border-radius: 10px; }

    /* =====================================================
       RESPONSIVE
       laptop: >1024px (2 columns)  |  tablet: <=1024px (1 column)  |  phone: <=640px
       ===================================================== */
    html { -webkit-text-size-adjust: 100%; }
    img, svg, video { max-width: 100%; }
    .nav-ic { font-size: 14px; }
    .nav-burger {
      display: none;
      align-items: center; justify-content: center;
      width: 36px; height: 36px; margin-left: 4px;
      border-radius: 12px; cursor: pointer;
      background: ${theme.selectBg};
      border: 1.5px solid ${theme.navBorder};
      color: ${theme.green};
      font-size: 17px; line-height: 1;
    }

    /* ---------- tablet ---------- */
    @media (max-width: 900px) {
      .top-nav { padding: 10px 16px !important; }
      .nav-i { padding: 8px 10px; }
      .nav-user { display: none; }
      .pg { padding-left: 20px !important; padding-right: 20px !important; }
    }

    /* ---------- tablets and phones: Home / Library use a single column ---------- */
    @media (max-width: 1024px) {
      .grid-2 { grid-template-columns: 1fr !important; }
    }

    /* Study sidebar stacks above the chat a little later */
    @media (max-width: 760px) {
      .grid-side { grid-template-columns: 1fr !important; }

      /* Study order when stacked: Online members, then Chat, then Room code */
      .study-side { display: contents !important; }
      .study-members { order: 1; }
      .study-chat { order: 2; }
      .study-room { order: 3; }
    }

    /* bigger tap targets on touch screens */
    @media (pointer: coarse) {
      .chk { width: 24px; height: 24px; }
      .nav-i { min-height: 40px; }
    }

    /* ---------- phone ---------- */
    @media (max-width: 640px) {
      .hand { zoom: 0.72; }
      .top-nav { padding: 9px 14px !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }

      /* nav links collapse into a hamburger dropdown */
      .nav-burger { display: flex; }
      .nav-links { display: none !important; }
      .nav-links.open {
        display: flex !important;
        flex-direction: column;
        position: absolute; top: 100%; left: 0; right: 0;
        gap: 4px !important;
        padding: 10px 14px 14px;
        background: ${theme.navBg};
        border-bottom: 1.5px solid ${theme.navBorder};
        box-shadow: 0 12px 24px ${theme.shadow};
        animation: fadeUp 0.2s ease;
      }
      .nav-links.open .nav-i {
        display: flex; align-items: center; gap: 10px;
        width: 100%; text-align: left;
        padding: 12px 14px; font-size: 15px; border-radius: 14px;
      }
      .nav-links.open .nav-ic { font-size: 18px; }

      .pg { padding: 72px 14px 28px !important; }
      .grid-2 { gap: 14px !important; }
      .pad-card { padding: 18px 16px !important; }
      .card { border-radius: 20px; }
      .chat-box { height: 62vh !important; min-height: 380px; }

      /* theme cards: one per row. As the screen gets smaller the card gets
         narrower and taller, with its content stacked vertically. */
      .theme-grid {
        grid-template-columns: 1fr !important;
        justify-items: center;
        gap: 14px !important;
      }
      .theme-card {
        flex-direction: column !important;
        justify-content: center;
        text-align: center;
        gap: 10px !important;
        width: clamp(170px, 62vw, 320px);   /* narrower on smaller screens */
        min-height: clamp(140px, calc(300px - 25vw), 230px); /* taller on smaller screens */
        padding: 18px 12px !important;
      }
      .theme-card-text { flex: none !important; width: 100%; }
      .theme-card-name { font-size: clamp(14px, 4.4vw, 17px) !important; white-space: normal !important; overflow: visible !important; text-overflow: clip !important; }
      .theme-card-desc { font-size: clamp(10px, 2.9vw, 11.5px) !important; white-space: normal !important; overflow: visible !important; text-overflow: clip !important; }

      /* smaller decorations on phones */
      .flower-garden { height: 110px !important; }
      .bg-corner { right: 12px !important; }

      /* landing page stacks */
      .land-grid { grid-template-columns: 1fr !important; }
      .land-left {
        border-radius: 24px 24px 0 0 !important;
        border-right: 1px solid ${theme.navBorder} !important;
        border-bottom: none !important;
        padding: 30px 22px !important;
      }
      .land-right {
        border-radius: 0 0 24px 24px !important;
        border-left: 1.5px solid ${theme.navBorder} !important;
        border-top: none !important;
        padding: 26px 18px !important;
      }
    }

    @media (max-width: 360px) {
      .nav-tx { font-size: 9.5px; }
      .nav-i { padding: 6px 4px; }
    }

    /* Study cards get narrower once the screen is below 317px
       (289px at 317px wide, ~215px at 280px, never below 180px) */
    @media (max-width: 317px) {
      .study-members,
      .study-room,
      .study-chat {
        width: max(180px, calc(200vw - 345px));
        justify-self: center;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation: none !important; transition: none !important; }
    }
  `}</style>
);

export default GlobalStyles;