import { useEffect } from "react";
import Navbar from "../components/Navbar";

const SOCIALS = [
  {
    name: "Facebook",
    handle: "nur.ali.anupol.2024",
    url: "https://www.facebook.com/nur.ali.anupol.2024/",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@nur_alight",
    url: "https://www.instagram.com/nur_alight/",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    handle: "Lightbeam0",
    url: "https://github.com/Lightbeam0",
    color: "#24292E",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "nur-ali-anupol",
    url: "https://www.linkedin.com/in/nur-ali-anupol-860b013b0/",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function About({ onHome, onAbout }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2", fontFamily: "Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

        @keyframes aboutFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .about-in {
          opacity: 0;
          animation: aboutFadeIn 0.55s ease forwards;
        }

        .social-card {
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .social-card:hover {
          transform: translateY(-3px);
        }
      `}</style>

      <Navbar onHome={onHome} onAbout={onAbout} />

      {/* Hero */}
      <div
        className="w-full text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0F1B2D 0%, #1A1714 50%, #2E1206 100%)",
          padding: "4rem 2rem 3.5rem",
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#FAF7F2 0px,#FAF7F2 1px,transparent 1px,transparent 28px),repeating-linear-gradient(90deg,#FAF7F2 0px,#FAF7F2 1px,transparent 1px,transparent 28px)",
          }}
        />
        {/* Grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: 0.07,
            mixBlendMode: "overlay",
          }}
        />

        <div className="relative max-w-xl mx-auto">
          <p
            className="text-xs uppercase tracking-[.2em] mb-4"
            style={{ color: "#C4965A", fontFamily: "'Lora', Georgia, serif" }}
          >
            Beyond the Classroom
          </p>
          <h1
            className="font-semibold leading-tight mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.2rem, 6vw, 3.6rem)",
              color: "#FAF7F2",
            }}
          >
            About the{" "}
            <em style={{ color: "#C4965A" }}>Author</em>
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#A89880",
              fontFamily: "'Lora', Georgia, serif",
            }}
          >
            The person behind the journal
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Rule */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex-1 h-px" style={{ background: "#D4C9B8" }} />
          <span
            className="text-sm italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#8B5E3C" }}
          >
            Nur-Ali P. Anupol
          </span>
          <div className="flex-1 h-px" style={{ background: "#D4C9B8" }} />
        </div>

        {/* Bio card */}
        <div
          className="about-in rounded-2xl p-7 mb-10"
          style={{
            background: "#fff",
            border: "1px solid #E0CEAF",
            animationDelay: "0.05s",
            boxShadow: "0 4px 24px rgba(196,150,90,0.08)",
          }}
        >
          <p
            className="leading-relaxed mb-4"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "15px",
              color: "#3A2618",
            }}
          >
            I'm a fourth-year BSIT student at the{" "}
            <strong>Western Mindanao State University College of Computing Studies</strong>{" "}
            in Zamboanga City. This blog documents the WMSU BSIT 4th Year Educational Tour
            and Industry Visit — eight days across Metro Manila, Tagaytay, and Baguio City
            in April 2026.
          </p>
          <p
            className="leading-relaxed"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "15px",
              color: "#3A2618",
            }}
          >
            I built this site from scratch in React as both a personal record of the trip
            and a small exercise in putting skills to use beyond the classroom. The tour
            gave us a week of the country outside of what we already knew — industry visits,
            historic sites, a strawberry farm at sunrise, and a lot of time on the bus.
            This journal is my attempt to keep it.
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            {["BSIT 4th Year", "WMSU · CCS", "Zamboanga City", "April 2026"].map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wider px-3 py-1 rounded-full"
                style={{
                  background: "#FEF2E8",
                  color: "#9C3D1A",
                  fontFamily: "'Lora', Georgia, serif",
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Socials section */}
        <div className="about-in" style={{ animationDelay: "0.18s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "#D4C9B8" }} />
            <span
              className="text-sm italic"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#8B5E3C" }}
            >
              Find Me Online
            </span>
            <div className="flex-1 h-px" style={{ background: "#D4C9B8" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card flex items-center gap-4 rounded-xl px-5 py-4"
                style={{
                  background: "#fff",
                  border: "1px solid #E0CEAF",
                  textDecoration: "none",
                  boxShadow: "0 2px 12px rgba(196,150,90,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = s.color;
                  e.currentTarget.style.boxShadow = `0 6px 20px ${s.color}28`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E0CEAF";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(196,150,90,0.06)";
                }}
              >
                <span style={{ color: s.color, flexShrink: 0 }}>{s.icon}</span>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#1A1410", fontFamily: "'Lora', Georgia, serif" }}
                  >
                    {s.name}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "#8B7B6A", fontFamily: "'Lora', Georgia, serif" }}
                  >
                    {s.handle}
                  </div>
                </div>
                <svg
                  className="ml-auto"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="14"
                  height="14"
                  style={{ color: "#C4965A", flexShrink: 0 }}
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="about-in mt-10 text-center" style={{ animationDelay: "0.30s" }}>
          <button
            onClick={onHome}
            className="text-sm italic transition-colors duration-200"
            style={{
              color: "#8B5E3C",
              fontFamily: "'Playfair Display', Georgia, serif",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C4965A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8B5E3C")}
          >
            ← Back to the journal
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3"
        style={{
          borderTop: "3px double #1A1714",
          fontSize: "11px",
          color: "#6B6257",
          letterSpacing: ".06em",
          textTransform: "uppercase",
          fontFamily: "'Lora', Georgia, serif",
        }}
      >
        <span>WMSU · BSIT Educational Tour · April 2026</span>
        <span style={{ color: "#C4965A" }}>· · ·</span>
        <span>Nur-Ali P. Anupol</span>
      </div>
    </div>
  );
}
