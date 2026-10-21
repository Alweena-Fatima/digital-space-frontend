
import React, { useState } from "react";
import AnimeGirl from "./AnimeGirl";
import { API_URL } from "../../config";

const Landing = ({ onEnter, theme }) => {
  const [nickname, setNickname] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [mode, setMode] = useState("");
  const [generatedRoomCode, setGeneratedRoomCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Reset room selection and its related state.
  const resetRoomSelection = () => {
    setMode("");
    setRoomCode("");
    setGeneratedRoomCode("");
    setErrorMessage("");
  };

  // Let the user choose to join an existing room.
  const selectJoinMode = () => {
    setMode("join");
    setRoomCode("");
    setGeneratedRoomCode("");
    setErrorMessage("");
  };

  // Create a room and receive its randomly generated code.
  const createRoom = async () => {
    if (isCreating) return;

    setErrorMessage("");
    setIsCreating(true);

    try {
      const response = await fetch(`${API_URL}/api/rooms`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const data = await response.json();

      setGeneratedRoomCode(data.roomCode);
      setRoomCode(data.roomCode);
      setMode("create");
    } catch (error) {
      setErrorMessage("Could not create room. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  // Validate details before entering the selected room.
  const joinRoom = () => {
    setErrorMessage("");

    if (!nickname.trim()) {
      return setErrorMessage("Please enter a nickname.");
    }

    if (!displayName.trim()) {
      return setErrorMessage("Please enter a display name.");
    }

    if (!roomCode.trim()) {
      return setErrorMessage("Please enter a room code.");
    }

    onEnter(
      nickname.trim(),
      displayName.trim(),
      roomCode.trim().toUpperCase()
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        position: "relative",
        background: theme.pageBg,
        transition: "background 0.6s ease",
      }}
    >
      <div
        className="land-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 800,
          width: "100%",
          animation: "fadeUp .6s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LEFT PANEL */}
        <div
          className="card land-left"
          style={{
            borderRadius: "24px 0 0 24px",
            padding: "44px 38px",
            borderRight: "none",
          }}
        >
          <div
            className="hand"
            style={{
              fontSize: 40,
              color: theme.accent,
              lineHeight: 1.05,
              marginBottom: 3,
            }}
          >
            Welcome to
          </div>

          <div
            className="hand"
            style={{
              fontSize: 34,
              color: theme.green,
              marginBottom: 5,
            }}
          >
            Digital Space
          </div>

          <p
            style={{
              fontSize: 12,
              color: theme.textMuted,
              marginBottom: 28,
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            Your cozy corner for deep focus & calm study sessions~
          </p>

          {/* NICKNAME */}
          <div style={{ marginBottom: 14 }}>
            <div className="lbl">Your Nickname</div>

            <input
              className="inp"
              placeholder="e.g. cozybunny"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          {/* DISPLAY NAME */}
          <div style={{ marginBottom: 22 }}>
            <div className="lbl">Display Name</div>

            <input
              className="inp"
              placeholder="e.g. Xyz"
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          {/* INITIAL CHOICE: NO ROOM CODE FIELD YET */}
          {mode === "" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="lbl">What would you like to do?</div>

              <button
                className="btn-g"
                style={{ width: "100%" }}
                onClick={selectJoinMode}
              >
                Join an Existing Room
              </button>

              <button
                className="btn-o"
                style={{ width: "100%" }}
                onClick={createRoom}
                disabled={isCreating}
              >
                {isCreating
                  ? "Creating Room..."
                  : "+ Create a New Room"}
              </button>
            </div>
          )}

          {/* JOIN MODE */}
          {mode === "join" && (
            <div>
              <div className="lbl">Room Code</div>

              <input
                className="inp"
                placeholder="Enter room code..."
                value={roomCode}
                onChange={(event) => {
                  setRoomCode(event.target.value.toUpperCase());
                  setErrorMessage("");
                }}
                onKeyDown={(event) =>
                  event.key === "Enter" && joinRoom()
                }
              />

              <p
                style={{
                  fontSize: 11,
                  color: theme.textMuted,
                  marginTop: 6,
                  marginBottom: 16,
                }}
              >
                Enter the room code shared by your friend.
              </p>

              <button
                className="btn-g"
                style={{ width: "100%", marginBottom: 10 }}
                onClick={joinRoom}
              >
                Join Room
              </button>

              <button
                className="btn-o"
                style={{ width: "100%" }}
                onClick={resetRoomSelection}
              >
                Back
              </button>
            </div>
          )}

          {/* CREATE MODE: SHOW GENERATED CODE */}
          {mode === "create" && generatedRoomCode && (
            <div>
              <div className="lbl">Your Room Code</div>

              <input
                className="inp"
                value={generatedRoomCode}
                readOnly
              />

              <div
                style={{
                  background: theme.green + "12",
                  border: `1.5px dashed ${theme.green}`,
                  borderRadius: 12,
                  padding: "10px 14px",
                  marginTop: 12,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: theme.green,
                    fontWeight: 700,
                  }}
                >
                  Share this code with your friends!
                </span>

                <button
                  type="button"
                  aria-label="Copy room code"
                  title="Copy room code"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                  }}
                  onClick={() => {
                    navigator.clipboard
                      ?.writeText(generatedRoomCode)
                      .catch(() => {
                        setErrorMessage(
                          "Could not copy the code. Please copy it manually."
                        );
                      });
                  }}
                >
                  📋
                </button>
              </div>

              <button
                className="btn-g"
                style={{ width: "100%", marginBottom: 10 }}
                onClick={joinRoom}
              >
                Enter Your Room
              </button>

              <button
                className="btn-o"
                style={{ width: "100%" }}
                onClick={resetRoomSelection}
              >
                Back
              </button>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <div
              role="alert"
              style={{
                color: theme.accent,
                fontSize: 12,
                marginTop: 12,
                fontWeight: 700,
                lineHeight: 1.5,
              }}
            >
              ⚠️ {errorMessage}
            </div>
          )}

          <p
            style={{
              fontSize: 11,
              color: theme.textMuted,
              textAlign: "center",
              marginTop: 22,
            }}
          >
            🌿 No account needed · Just vibe & study
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="land-right"
          style={{
            background: theme.bgLight,
            borderRadius: "0 24px 24px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "36px 28px",
            border: `1.5px solid ${theme.navBorder}`,
            borderLeft: "none",
            position: "relative",
            overflow: "hidden",
            transition: "background 0.4s ease",
          }}
        >
          <AnimeGirl size={150} />

          <div
            className="hand"
            style={{
              fontSize: 22,
              color: theme.green,
              marginTop: 14,
              textAlign: "center",
            }}
          >
            Ready to focus?
          </div>

          <p
            style={{
              fontSize: 12,
              color: theme.textMuted,
              textAlign: "center",
              marginTop: 7,
              lineHeight: 1.7,
            }}
          >
            Join a cozy study room
            <br />
            and achieve your daily goals~
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 6,
              marginTop: 12,
            }}
          >
            {[
              "🍵 Pomodoro Timer",
              "🎵 Ambient Sounds",
              "📖 Word Library",
              "💭 Quote Library",
              "💬 Real-time Chat",
              "🎯 Goal Setting",
              "🎨 Different Themes",
            ].map((feature) => (
              <div
                key={feature}
                style={{
                  background: theme.cardBg,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: 50,
                  padding: "5px 13px",
                  fontSize: 11,
                  color: theme.textLight,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
