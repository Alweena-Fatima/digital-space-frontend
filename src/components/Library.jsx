import React from "react";
import { API_URL } from "../../config";
const Library = ({ roomCode,words, setWords, quotes, setQuotes, t }) => {
  const deleteWord = async (id) => {
  try {
    const response = await fetch(
       `${API_URL}/api/rooms/words/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete word");
    }

    // Remove from frontend after backend deletion succeeds
    setWords((ws) => ws.filter((word) => word.id !== id));

  } catch (error) {
    console.error("Error deleting word:", error);
  }
};

const deleteQuote = async (id) => {
  try {
    const response = await fetch(
       `${API_URL}/api/rooms/quotes/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete quote");
    }

    // Remove from frontend after backend deletion succeeds
    setQuotes((qs) => qs.filter((quote) => quote.id !== id));

  } catch (error) {
    console.error("Error deleting quote:", error);
  }
};
  
  return (
  <div className="page pg" style={{ padding: "88px 28px 28px", maxWidth: 980, margin: "0 auto" }}>
    <div className="hand" style={{ fontSize: 36, color: t.green, marginBottom: 5 }}>
      Your Library 📚
    </div>
    <p style={{ fontSize: 13, color: t.textMuted, marginBottom: 26 }}>
      Your cozy collection of words & wisdom
    </p>

    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
      {/* Words */}
      <div style={{ minWidth: 0 }}>
        <div className="hand" style={{ fontSize: 24, color: t.green, marginBottom: 12 }}>
          🔤 Words ({words.length})
        </div>
        {words.length === 0 ? (
          <div className="card" style={{ padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 38, marginBottom: 9 }}>📖</div>
            <p style={{ color: t.textMuted, fontSize: 13 }}>
              Save words from Word Magic on the Home page~
            </p>
          </div>
        ) : (
          words.map((w) => (
            <div key={w.id} className="wcard">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
                  <span style={{ fontSize: 20 }}>{w.emoji || "📖"}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: t.green, overflowWrap: "anywhere" }}>{w.word}</div>
                    <span
                      style={{
                        fontSize: 9,
                        background: t.badge,
                        color: t.green,
                        padding: "1px 6px",
                        borderRadius: 50,
                        fontWeight: 700,
                      }}
                    >
                      {w.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteWord(w.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, fontSize: 18, lineHeight: 1, padding: "4px 8px", flexShrink: 0 }}
                >
                  ×
                </button>
              </div>
              <p style={{ fontSize: 13, color: t.text, marginTop: 7, lineHeight: 1.6, overflowWrap: "anywhere" }}>{w.meaning}</p>
              {w.example && (
                <p style={{ fontSize: 11, color: t.textMuted, marginTop: 3, fontStyle: "italic" }}>
                  "{w.example}"
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quotes */}
      <div style={{ minWidth: 0 }}>
        <div className="hand" style={{ fontSize: 24, color: t.green, marginBottom: 12 }}>
          💭 Quotes ({quotes.length})
        </div>
        {quotes.length === 0 ? (
          <div className="card" style={{ padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 38, marginBottom: 9 }}>✍️</div>
            <p style={{ color: t.textMuted, fontSize: 13 }}>Add quotes from the Home page~</p>
          </div>
        ) : (
          quotes.map((q) => (
            <div key={q.id} className="qcard" style={{ paddingTop: 24 }}>
              <p style={{ fontSize: 14, color: t.text, lineHeight: 1.7, marginBottom: 7, overflowWrap: "anywhere" }}>{q.quote}</p>
              <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 700 }}>— {q.author}</span>
              <button
                onClick={() => deleteQuote(q.id)}
                style={{
                  float: "right",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: t.textMuted,
                  fontSize: 18,
                  lineHeight: 1,
                  padding: "4px 8px",
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)};

export default Library;