import { useState } from "react";
import Home from "./pages/Home";
import DayPage from "./pages/DayPage";
import About from "./pages/About";

export default function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [visible, setVisible] = useState(true);

  const transition = (fn) => {
    setVisible(false);
    setTimeout(() => {
      fn();
      setVisible(true);
    }, 260);
  };

  const goHome = () => transition(() => { setSelectedDay(null); setShowAbout(false); });
  const goAbout = () => transition(() => { setSelectedDay(null); setShowAbout(true); });

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? undefined : "translateY(10px)",
        transition: "opacity 0.26s ease, transform 0.26s ease",
      }}
    >
      {showAbout ? (
        <About onHome={goHome} onAbout={goAbout} />
      ) : selectedDay !== null ? (
        <DayPage
          day={selectedDay}
          onBack={goHome}
          onSelectDay={(day) => transition(() => { setSelectedDay(day); setShowAbout(false); })}
          onAbout={goAbout}
        />
      ) : (
        <Home
          onSelectDay={(day) => transition(() => { setSelectedDay(day); setShowAbout(false); })}
          onAbout={goAbout}
        />
      )}
    </div>
  );
}
