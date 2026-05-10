export default function DayCard({ dayData, onSelect }) {
  const { day, title, date, route, summary, available, theme } = dayData;

  return (
    <div
      onClick={() => available && onSelect(day)}
      className="border overflow-hidden transition-all duration-200"
      style={{
        borderColor: available ? theme.rule : "#e5e1da",
        background: available ? "#fff" : "#f8f6f2",
        cursor: available ? "pointer" : "default",
        opacity: available ? 1 : 0.65,
        borderRadius: "2px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        if (available) {
          e.currentTarget.style.borderColor = theme.accent;
          e.currentTarget.style.boxShadow = `0 4px 16px ${theme.accent}22`;
        }
      }}
      onMouseLeave={(e) => {
        if (available) {
          e.currentTarget.style.borderColor = theme.rule;
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {/* Top bar */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{ background: available ? theme.accent : "#c8c4bc" }}
      >
        <span
          className="text-sm italic"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: available ? "#fff" : "#6B6257",
            opacity: available ? 0.95 : 1,
          }}
        >
          Day {day}
        </span>
        <span
          className="text-xs uppercase tracking-wider"
          style={{ color: available ? "rgba(255,255,255,0.7)" : "#6B6257" }}
        >
          {date}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-base mb-1 leading-snug"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: available ? "#1A1714" : "#6B6257",
          }}
        >
          {title}
        </h3>
        <p
          className="text-xs italic mb-2"
          style={{ fontFamily: "Georgia, serif", color: available ? theme.accentMid : "#9B9590" }}
        >
          {route}
        </p>
        <p className="text-sm text-stone-500 leading-relaxed flex-1">
          {summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs mt-4">
          <span style={{ color: available ? theme.accent : "#a9a29c", fontFamily: "'Lora', Georgia, serif" }}>
            {available ? "Read entry →" : "Coming soon"}
          </span>
          {available && <span>📖</span>}
        </div>
      </div>
    </div>
  );
}
