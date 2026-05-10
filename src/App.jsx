import { useState } from "react";
import Home from "./pages/Home";
import DayPage from "./pages/DayPage";

export default function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [visible, setVisible] = useState(true);

  const transition = (fn) => {
    setVisible(false);
    setTimeout(() => {
      fn();
      setVisible(true);
    }, 260);
  };

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? undefined : "translateY(10px)",
        transition: "opacity 0.26s ease, transform 0.26s ease",
      }}
    >
      {selectedDay === null ? (
        <Home onSelectDay={(day) => transition(() => setSelectedDay(day))} />
      ) : (
        <DayPage
          day={selectedDay}
          onBack={() => transition(() => setSelectedDay(null))}
          onSelectDay={(day) => transition(() => setSelectedDay(day))}
        />
      )}
    </div>
  );
}