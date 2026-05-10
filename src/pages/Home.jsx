import { useEffect } from "react";
import Navbar from "../components/Navbar";
import DayCard from "../components/DayCard";
import { days } from "../data/days";

const TILES = [
  // row 1 – top strip
  { x: "2%",  y: "5%",  w: 68,  h: 68,  a: 1, dur: 9,  delay: 0    },
  { x: "15%", y: "4%",  w: 52,  h: 44,  a: 3, dur: 11, delay: 2.1  },
  { x: "31%", y: "7%",  w: 76,  h: 56,  a: 2, dur: 9,  delay: 4.6  },
  { x: "55%", y: "4%",  w: 60,  h: 60,  a: 4, dur: 13, delay: 1.3  },
  { x: "73%", y: "6%",  w: 88,  h: 48,  a: 1, dur: 10, delay: 3.5  },
  { x: "90%", y: "3%",  w: 50,  h: 70,  a: 3, dur: 8,  delay: 0.8  },
  // row 2 – middle upper
  { x: "7%",  y: "35%", w: 60,  h: 60,  a: 2, dur: 12, delay: 5.3  },
  { x: "23%", y: "31%", w: 44,  h: 82,  a: 4, dur: 9,  delay: 1.9  },
  { x: "42%", y: "37%", w: 100, h: 44,  a: 1, dur: 14, delay: 3.9  },
  { x: "62%", y: "33%", w: 66,  h: 62,  a: 3, dur: 11, delay: 0.4  },
  { x: "81%", y: "29%", w: 48,  h: 72,  a: 2, dur: 8,  delay: 2.7  },
  // row 3 – middle lower
  { x: "1%",  y: "61%", w: 74,  h: 50,  a: 3, dur: 10, delay: 4.1  },
  { x: "18%", y: "57%", w: 56,  h: 56,  a: 1, dur: 12, delay: 1.5  },
  { x: "37%", y: "63%", w: 82,  h: 46,  a: 4, dur: 9,  delay: 5.9  },
  { x: "60%", y: "59%", w: 62,  h: 68,  a: 2, dur: 11, delay: 3.0  },
  { x: "80%", y: "55%", w: 90,  h: 52,  a: 3, dur: 8,  delay: 0.6  },
  // row 4 – bottom strip
  { x: "10%", y: "80%", w: 54,  h: 54,  a: 4, dur: 13, delay: 3.3  },
  { x: "47%", y: "82%", w: 70,  h: 42,  a: 1, dur: 9,  delay: 1.7  },
  { x: "71%", y: "77%", w: 58,  h: 64,  a: 2, dur: 11, delay: 4.9  },
];

export default function Home({ onSelectDay }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2", fontFamily: "Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Card tilt on hover — alternates direction per column */
        .card-wrap {
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1);
          transform-origin: center bottom;
        }
        .card-wrap:nth-child(3n+1):hover { transform: rotate(-1.2deg) scale(1.02); }
        .card-wrap:nth-child(3n+2):hover { transform: rotate(0.8deg)  scale(1.02); }
        .card-wrap:nth-child(3n):hover   { transform: rotate(-0.6deg) scale(1.02); }

        .hero-content > * {
          opacity: 0;
          animation: heroFadeIn 0.7s ease forwards;
        }
        .hero-content > *:nth-child(1) { animation-delay: 0.05s; }
        .hero-content > *:nth-child(2) { animation-delay: 0.18s; }
        .hero-content > *:nth-child(3) { animation-delay: 0.30s; }
        .hero-content > *:nth-child(4) { animation-delay: 0.42s; }

        /* Puzzle tile movement variants */
        @keyframes tile1 {
          0%, 100% { transform: translate(0px,   0px);  }
          25%      { transform: translate(18px,  -8px); }
          55%      { transform: translate(10px,  16px); }
          80%      { transform: translate(-6px,   6px); }
        }
        @keyframes tile2 {
          0%, 100% { transform: translate(0px,   0px);  }
          20%      { transform: translate(-14px, 18px); }
          50%      { transform: translate(8px,   10px); }
          80%      { transform: translate(16px, -10px); }
        }
        @keyframes tile3 {
          0%, 100% { transform: translate(0px,   0px);  }
          35%      { transform: translate(16px,  14px); }
          65%      { transform: translate(-8px,  20px); }
        }
        @keyframes tile4 {
          0%, 100% { transform: translate(0px,   0px);  }
          30%      { transform: translate(-18px,-12px); }
          60%      { transform: translate(10px,  -8px); }
          85%      { transform: translate(-6px,  14px); }
        }

        .puzzle-tile {
          position: absolute;
          pointer-events: none;
          border: 1px solid rgba(196,150,90,0.14);
          background: rgba(196,150,90,0.035);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>

      <Navbar onHome={() => {}} />

      {/* Hero */}
      <div
        className="w-full text-center relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0F1B2D 0%, #1A1714 45%, #2E1206 100%)", padding: "5rem 2rem 4rem" }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #FAF7F2 0px, #FAF7F2 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, #FAF7F2 0px, #FAF7F2 1px, transparent 1px, transparent 28px)",
          }}
        />

        {/* Grain texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: 0.07,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Animated puzzle tiles */}
        {TILES.map((t, i) => (
          <div
            key={i}
            className="puzzle-tile"
            style={{
              left: t.x,
              top: t.y,
              width: t.w,
              height: t.h,
              animationName: `tile${t.a}`,
              animationDuration: `${t.dur}s`,
              animationDelay: `${t.delay}s`,
            }}
          />
        ))}

        <div className="hero-content relative max-w-2xl mx-auto">
          <p
            className="text-xs uppercase tracking-[.2em] mb-4"
            style={{ color: "#C4965A", fontFamily: "'Lora', Georgia, serif" }}
          >
            Western Mindanao State University · College of Computing Studies
          </p>

          <h1
            className="font-semibold leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              color: "#FAF7F2",
            }}
          >
            Beyond the{" "}
            <em style={{ color: "#C4965A" }}>Classroom</em>
          </h1>

          <p
            className="mb-6 leading-relaxed"
            style={{
              fontSize: "16px",
              color: "#A89880",
              fontFamily: "'Lora', Georgia, serif",
            }}
          >
            A BSIT Educational Tour & Industry Visit Journal
            <br />
            by <em>Nur-Ali P. Anupol</em>
          </p>

          {/* Meta pills */}
          <div
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest"
            style={{ color: "#6B6257" }}
          >
            <span>{days.length} Days</span>
            <span style={{ color: "#C4965A" }}>·</span>
            <span>Metro Manila</span>
            <span style={{ color: "#C4965A" }}>·</span>
            <span>April 2026</span>
            <span style={{ color: "#C4965A" }}>·</span>
            <span>BSIT 4th Year</span>
          </div>
        </div>
      </div>

      {/* Days grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Section rule */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px" style={{ background: "#D4C9B8" }} />
          <span
            className="text-sm italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#8B5E3C" }}
          >
            The Journey
          </span>
          <div className="flex-1 h-px" style={{ background: "#D4C9B8" }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {days.map((d, i) => (
            <div
              key={d.day}
              className="card-wrap"
              style={{
                opacity: 0,
                animation: "cardIn 0.55s ease forwards",
                animationDelay: `${i * 80}ms`,
                height: "100%",
              }}
            >
              <DayCard dayData={d} onSelect={onSelectDay} />
            </div>
          ))}
        </div>

        {/* About */}
        <div
          className="mt-12 pt-8 text-center"
          style={{ borderTop: "1px solid #D4C9B8" }}
        >
          <p
            className="text-sm leading-relaxed max-w-xl mx-auto"
            style={{ color: "#6B6257", fontFamily: "'Lora', Georgia, serif" }}
          >
            This blog documents the WMSU College of Computing Studies BSIT 4th Year
            Educational Tour and Industry Visit, April 2026. Written by{" "}
            <em>Nur-Ali P. Anupol</em>. Eight days. Multiple industry visits.
            One unforgettable week.
          </p>
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
