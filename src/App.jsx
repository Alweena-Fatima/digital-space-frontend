
import { useState, useEffect } from "react";
import { API_URL } from "../config";
import { getTheme } from "./theme";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Themes from "./components/Themes";
import Study from "./components/Study";
import Library from "./components/Library";
import About from "./components/About";
import BackgroundEffects from "./BackgroundEffects";

export default function App() {
  // Controls whether the user is on the landing page or inside the app.
  const [screen, setScreen] = useState("landing");

  // Remembers which page the user was viewing before a refresh.
  const [page, setPage] = useState(
    localStorage.getItem("digitalSpacePage") || "home"
  );

  // Current room/member information.
  const [nickname, setNickname] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [memberId, setMemberId] = useState(null);
  const [roomCode, setRoomCode] = useState("");

  // Current room theme.
  const [themeKey, setThemeKey] = useState("default");

  // Pomodoro state is shared with the home dashboard and ambient sounds.
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);

  // Shared room resources.
  const [words, setWords] = useState([]);
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    },
  ]);

  // Get the complete color/style configuration for the selected theme.
  const theme = getTheme(themeKey);

  // =========================================================
  // RESTORE ROOM AFTER PAGE REFRESH
  // =========================================================

  useEffect(() => {
    const savedNickname = localStorage.getItem("digitalSpaceNick");
    const savedDisplayName = localStorage.getItem(
      "digitalSpaceDisplayName"
    );
    const savedRoomCode = localStorage.getItem("digitalSpaceRoom");
    const savedMemberId = localStorage.getItem(
      "digitalSpaceMemberId"
    );
    const savedPage = localStorage.getItem("digitalSpacePage");

    /*
     * If the required room information exists, restore the
     * user's previous room session.
     */
    if (
      savedNickname &&
      savedRoomCode &&
      savedMemberId
    ) {
      setNickname(savedNickname);
      setDisplayName(savedDisplayName || savedNickname);
      setRoomCode(savedRoomCode);
      setMemberId(Number(savedMemberId));

      if (savedPage) {
        setPage(savedPage);
      }

      /*
       * Fetch the room again instead of trusting the locally
       * stored theme. The backend is the source of truth.
       */
      fetch(
        `${API_URL}/api/rooms/${savedRoomCode}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Room not found");
          }

          return response.json();
        })
        .then((roomData) => {
          setThemeKey(roomData.theme.toLowerCase());
          setScreen("app");
        })
        .catch((error) => {
          /*
           * Keep the saved session if the failure is temporary,
           * such as the backend being unavailable.
           */
          console.error("Error restoring room:", error);
        });
    }
  }, []);

  // =========================================================
  // JOIN ROOM
  // =========================================================


  const enterRoom = async (nickname, displayName, roomCode) => {
    // Send the join request to the backend.
    const response = await fetch(
      `${API_URL}/api/rooms/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomCode,
          nickname,
          displayName,
        }),
      }
    );

    // Read the backend response, even when it contains an error.
    const memberData = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        memberData.message || "Could not join the room. Please try again."
      );
    }

    // Fetch room details after a successful join.
    const roomResponse = await fetch(
      `${API_URL}/api/rooms/${roomCode}`
    );

    const roomData = await roomResponse.json().catch(() => ({}));

    if (!roomResponse.ok) {
      throw new Error(
        roomData.message || "Joined, but could not load room details."
      );
    }

    // Update React state only after both requests succeed.
    setNickname(memberData.nickname);
    setDisplayName(memberData.displayName);
    setMemberId(memberData.id);
    setRoomCode(roomCode);
    setThemeKey(roomData.theme.toLowerCase());

    // Save the session for page refreshes.
    localStorage.setItem("digitalSpaceMemberId", memberData.id);
    localStorage.setItem("digitalSpaceNick", memberData.nickname);
    localStorage.setItem("digitalSpaceDisplayName", memberData.displayName);
    localStorage.setItem("digitalSpaceRoom", roomCode);

    setScreen("app");
  };


  // =========================================================
  // LEAVE ROOM
  // =========================================================

  const handleLeaveRoom = async () => {
    try {
      // Remove the member from the room in the database.
      const response = await fetch(
        `${API_URL}/api/rooms/${roomCode}/members/${memberId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to leave room");
      }

      // Remove the saved room session.
      localStorage.removeItem("digitalSpaceMemberId");
      localStorage.removeItem("digitalSpaceNick");
      localStorage.removeItem("digitalSpaceDisplayName");
      localStorage.removeItem("digitalSpaceRoom");
      localStorage.removeItem("digitalSpacePage");

      // Reset the room-related React state.
      setMemberId(null);
      setNickname("");
      setDisplayName("");
      setRoomCode("");
      setPage("home");
      setThemeKey("default");

      // Return to the landing page.
      setScreen("landing");
    } catch (error) {
      console.error("Leave room error:", error);

      alert(
        "Could not leave the room. Please try again."
      );
    }
  };

  return (
    <>
      <GlobalStyles theme={theme} />

      {screen === "landing" ? (
        <Landing
          onEnter={enterRoom}
          theme={theme}
        />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            background: theme.pageBg,
            transition: "background 0.6s ease",
            position: "relative",
            zIndex: 1,
          }}
        >
          <BackgroundEffects effect={theme.bgEffect} />

          <Navbar
            page={page}
            setPage={(newPage) => {
              setPage(newPage);
              localStorage.setItem(
                "digitalSpacePage",
                newPage
              );
            }}
            displayName={displayName}
            theme={theme}
          />

          {/* HOME */}

          <div
            style={{
              display: page === "home" ? "block" : "none",
            }}
          >
            <Home
              nickname={displayName}
              roomCode={roomCode}
              words={words}
              setWords={setWords}
              quotes={quotes}
              setQuotes={setQuotes}
              theme={theme}
              isPomodoroRunning={isPomodoroRunning}
              setIsPomodoroRunning={setIsPomodoroRunning}
            />
          </div>

          {/* THEMES */}

          <div
            style={{
              display: page === "themes" ? "block" : "none",
            }}
          >
            <Themes
              roomCode={roomCode}
              sel={themeKey}
              setSel={setThemeKey}
              t={theme}
            />
          </div>

          {/* STUDY */}

          <div
            style={{
              display: page === "study" ? "block" : "none",
            }}
          >
            <Study
              nick={nickname}
              displayName={displayName}
              memberId={memberId}
              roomCode={roomCode}
              onLeaveRoom={handleLeaveRoom}
              theme={theme}
            />
          </div>

          {/* LIBRARY */}

          <div
            style={{
              display: page === "library" ? "block" : "none",
            }}
          >
            <Library
              roomCode={roomCode}
              words={words}
              setWords={setWords}
              quotes={quotes}
              setQuotes={setQuotes}
              t={theme}
            />
          </div>

          {/* ABOUT */}

          <div
            style={{
              display: page === "about" ? "block" : "none",
            }}
          >
            <About t={theme} />
          </div>
        </div>
      )}
    </>
  );
}

