import React from "react";
import AnimeGirl from "./AnimeGirl";

// ✏️ EDIT THESE TWO LINES with your real contact details
const CONTACT_EMAIL = "alweenacse@gmail.com";
const LINKEDIN_URL = "www.linkedin.com/in/alweena-fatima-15580b262";

const MAIL_LINK = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Digital Space – feature suggestion"
)}`;

const About = ({ t }) => {
  const features = [
    {
      title: "Study Together",
      text: "Create a room, invite your friends, and study together in one shared space.",
    },
    {
      title: "Real-Time Chat",
      text: "Stay connected with your study partners through simple real-time room chat.",
    },
    {
      title: "Shared Goals",
      text: "Create study goals and keep everyone on the same page as you work toward them.",
    },
    {
      title: "Word Library",
      text: "Save interesting words and their meanings while building your personal vocabulary collection.",
    },
    {
      title: "Quotes & Inspiration",
      text: "Keep meaningful quotes close by and add a little inspiration to your study space.",
    },
    {
      title: "Study Atmosphere",
      text: "Choose a shared room theme and create an environment that feels comfortable and focused.",
    },
  ];

  // Shared style for the two contact buttons (rendered as links).
  const linkButton = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    textDecoration: "none",
    flex: "1 1 150px",
    textAlign: "center",
  };

  return (
    <div
      className="page pg"
      style={{
        padding: "88px 28px 50px",
        maxWidth: 760,
        margin: "0 auto",
      }}
    >
      {/* =====================================================
          INTRO
          ===================================================== */}

      <div
        style={{
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            fontSize: 44,
            marginBottom: 8,
            animation: "bounce 3s ease infinite",
          }}
        >
          ✦
        </div>

        <div
          className="hand"
          style={{
            fontSize: 38,
            color: t.green,
            marginBottom: 8,
          }}
        >
          About Digital Space
        </div>

        <p
          style={{
            fontSize: 14,
            color: t.textMuted,
            lineHeight: 1.8,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          A cozy collaborative study space designed to make studying
          together feel a little calmer, more focused, and more enjoyable.
        </p>
      </div>

      {/* =====================================================
          WHAT + WHY  (compact, side by side when there is room)
          ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <div className="card card-h" style={{ padding: "16px 18px" }}>
          <div
            className="hand"
            style={{ fontSize: 19, color: t.green, marginBottom: 5 }}
          >
            What is it?
          </div>

          <p
            style={{
              fontSize: 12.5,
              color: t.text,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            A shared online room for studying, chatting, and staying
            motivated. Goals, notes, and inspiration all live together in
            one calm place.
          </p>
        </div>

        <div className="card card-h" style={{ padding: "16px 18px" }}>
          <div
            className="hand"
            style={{ fontSize: 19, color: t.green, marginBottom: 5 }}
          >
            Why Digital Space?
          </div>

          <p
            style={{
              fontSize: 12.5,
              color: t.text,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Studying doesn't have to mean working alone. See your friends
            study, share small goals, and still keep your own focused
            workspace.
          </p>
        </div>
      </div>

      {/* =====================================================
          FEATURES
          ===================================================== */}

      <div style={{ marginBottom: 30 }}>
        <div
          className="hand"
          style={{
            fontSize: 26,
            color: t.green,
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          What You Can Do
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(210px, 100%), 1fr))",
            gap: 14,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card card-h"
              style={{ padding: "20px" }}
            >
              <div
                className="hand"
                style={{
                  fontSize: 19,
                  color: t.green,
                  marginBottom: 7,
                }}
              >
                {feature.title}
              </div>

              <p
                style={{
                  fontSize: 12.5,
                  color: t.textMuted,
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          ABOUT THE CREATOR
          ===================================================== */}

      <div
        className="card card-h pad-card"
        style={{
          padding: "26px 28px",
          marginBottom: 18,
        }}
      >
        <div
          className="hand"
          style={{
            fontSize: 24,
            color: t.green,
            marginBottom: 9,
          }}
        >
          About the Creator
        </div>

        <p
          style={{
            fontSize: 13,
            color: t.text,
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          Hi, I'm Alweena, a Computer Science graduate and software
          developer who enjoys building applications that combine technology
          with thoughtful user experiences.
        </p>

        <p
          style={{
            fontSize: 13,
            color: t.text,
            lineHeight: 1.9,
            margin: "10px 0 0",
          }}
        >
          Digital Space started as an idea for making study sessions feel
          less isolated and more peaceful. I built it as a full-stack
          project while exploring React, Spring Boot, MySQL, WebSockets,
          and AI integration.
        </p>
      </div>

      {/* =====================================================
          SUGGEST A FEATURE
          ===================================================== */}

      <div
        className="card pad-card"
        style={{
          padding: "24px 28px",
          marginBottom: 28,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 30, marginBottom: 4 }}>💡</div>

        <div
          className="hand"
          style={{ fontSize: 23, color: t.green, marginBottom: 6 }}
        >
          Got an idea? Suggest a feature
        </div>

        <p
          style={{
            fontSize: 13,
            color: t.textMuted,
            lineHeight: 1.8,
            maxWidth: 480,
            margin: "0 auto 16px",
          }}
        >
          Digital Space keeps growing with your ideas. Found a bug or want
          to see something new? Send me a note, I'd love to hear it.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          <a className="btn-g" href={MAIL_LINK} style={linkButton}>
            ✉️ Email me
          </a>

          <a
            className="btn-o"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={linkButton}
          >
            💼 LinkedIn
          </a>
        </div>
      </div>

      {/* =====================================================
          DESIGN PHILOSOPHY
          ===================================================== */}

      <div
        className="card pad-card"
        style={{
          padding: 28,
          marginTop: 10,
          textAlign: "center",
          background: t.cardBg,
        }}
      >
        <AnimeGirl size={90} />

        <div
          className="hand"
          style={{
            fontSize: 25,
            color: t.green,
            marginTop: 10,
          }}
        >
          Built for calm productivity
        </div>

        <p
          style={{
            fontSize: 13,
            color: t.textMuted,
            marginTop: 7,
            lineHeight: 1.8,
            maxWidth: 540,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          No pressure to be productive every second. Just a comfortable
          little space to show up, focus on what matters, and make progress
          together.
        </p>

        <div
          style={{
            marginTop: 18,
            fontSize: 12,
            color: t.textMuted,
          }}
        >
          Made with care for better study sessions.
        </div>
      </div>
    </div>
  );
};

export default About;