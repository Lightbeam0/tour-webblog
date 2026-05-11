import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import { days } from "../data/days";

export default function DayPage({ day, onBack, onSelectDay }) {
  const data = days.find((d) => d.day === day);
  const { title, date, route, theme, stops, images, sections } = data;
  const [lightbox, setLightbox] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imgOffsets, setImgOffsets] = useState({});

  // Map section index → start image index (explicit per heading)
  const inlineImageMap = useMemo(() => {
    const map = {};
    sections.forEach((s, i) => {
      if (s.type === "heading" && s.imageIndex !== undefined && s.imageIndex < images.length) {
        map[i] = s.imageIndex;
      }
    });
    return map;
  }, [sections, images]);

  // Compute per-section image range [start, end] by using neighbour start indices
  const inlineImageRanges = useMemo(() => {
    const entries = Object.entries(inlineImageMap)
      .map(([k, v]) => ({ sIdx: Number(k), imgIdx: v }))
      .sort((a, b) => a.imgIdx - b.imgIdx);
    const result = {};
    entries.forEach(({ sIdx, imgIdx }, i) => {
      const nextStart = i + 1 < entries.length ? entries[i + 1].imgIdx : images.length;
      result[sIdx] = { start: imgIdx, end: nextStart - 1 };
    });
    return result;
  }, [inlineImageMap, images.length]);

  // Reset offsets when navigating to a different day
  useEffect(() => { setImgOffsets({}); }, [day]);

  // Auto-cycle images every 3.5 s for sections with multiple photos
  useEffect(() => {
    const hasMultiple = Object.values(inlineImageRanges).some(({ start, end }) => end > start);
    if (!hasMultiple) return;
    const timer = setInterval(() => {
      setImgOffsets((prev) => {
        const next = { ...prev };
        Object.entries(inlineImageRanges).forEach(([k, { start, end }]) => {
          if (end > start) {
            const sIdx = Number(k);
            const count = end - start + 1;
            next[sIdx] = ((prev[sIdx] || 0) + 1) % count;
          }
        });
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [inlineImageRanges]);

  useEffect(() => { window.scrollTo(0, 0); }, [day]);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add("in-view"), delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -20px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [day]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setLightbox((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: theme.bg, fontFamily: "Georgia, serif" }}>

      {/* Grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: 0.035,
          mixBlendMode: "overlay",
        }}
      />

      {/* Reading progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentMid})`,
          boxShadow: `0 0 8px ${theme.accent}88`,
          zIndex: 9998,
          transition: "width 0.12s linear",
          pointerEvents: "none",
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

        .drop-cap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 4.5rem;
          font-weight: 600;
          float: left;
          line-height: .78;
          margin: 6px 10px 0 0;
          color: ${theme.accent};
        }

        /* Asymmetric section rule — short accent line left, long muted line right */
        .section-rule {
          display: flex;
          align-items: center;
          margin: 2.5rem 0 0.5rem;
        }
        .section-rule::before {
          content: '';
          width: 28px;
          height: 2px;
          background: ${theme.accent};
          flex: none;
          margin-right: 10px;
        }
        .section-rule span {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 13px;
          font-style: italic;
          color: ${theme.accent};
          white-space: nowrap;
          letter-spacing: .04em;
          margin-right: 12px;
        }
        .section-rule::after {
          content: '';
          flex: 1;
          height: .5px;
          background: ${theme.rule};
        }

        /* Inline image fade on slide change */
        @keyframes imgFadeIn {
          from { opacity: 0; transform: scale(1.015); }
          to   { opacity: 1; transform: scale(1); }
        }
        .img-fade { animation: imgFadeIn 0.4s ease forwards; }

        /* Scroll-reveal */
        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.65s cubic-bezier(.25,.46,.45,.94),
                      transform 0.65s cubic-bezier(.25,.46,.45,.94);
        }
        .fade-up.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* Gallery items */
        .gallery-item {
          cursor: pointer;
          overflow: hidden;
          position: relative;
          background: ${theme.accentLight};
        }
        .gallery-item img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.45s ease;
        }
        .gallery-item:hover img {
          transform: scale(1.04);
        }
        .gallery-caption-overlay {
          position: absolute;
          inset-x: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
          padding: 1.75rem 0.75rem 0.65rem;
          transform: translateY(100%);
          transition: transform 0.32s ease;
        }
        .gallery-item:hover .gallery-caption-overlay {
          transform: translateY(0);
        }

        /* Inline section images */
        .inline-img {
          cursor: pointer;
          overflow: hidden;
        }
        .inline-img .inline-img-inner {
          overflow: hidden;
          position: relative;
        }
        .inline-img img {
          width: 100%;
          display: block;
          transition: transform 0.45s ease;
        }
        .inline-img:hover img {
          transform: scale(1.025);
        }

        /* Featured image */
        .featured-img-wrap img {
          transition: transform 0.5s ease;
        }
        .featured-img-wrap:hover img {
          transform: scale(1.015);
        }

        .back-btn:hover { color: ${theme.accent} !important; }

        /* Lightbox nav buttons */
        .lb-btn {
          color: rgba(255,255,255,.85);
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.2);
          font-size: 1.85rem;
          cursor: pointer;
          padding: .55rem 1.1rem;
          line-height: 1;
          transition: background .2s, border-color .2s;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        .lb-btn:hover {
          background: rgba(255,255,255,.22);
          border-color: rgba(255,255,255,.35);
        }
      `}</style>

      {/* Top accent stripe */}
      <div style={{ height: "4px", background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.accentMid} 50%, ${theme.accent} 100%)` }} />

      <Navbar onHome={onBack} />

      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 pt-5" style={{ borderBottom: `1px solid ${theme.rule}`, paddingBottom: "1rem" }}>
        <button
          onClick={onBack}
          className="back-btn text-sm flex items-center gap-2 transition-colors duration-200"
          style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif", background: "none", border: "none", cursor: "pointer" }}
        >
          ← Back to all days
        </button>
      </div>

      {/* Post header */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-6 text-center" style={{ borderBottom: `3px double ${theme.ink}` }}>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif" }}>
          Western Mindanao State University · College of Computing Studies · BSIT Educational Tour 2026
        </p>
        <h1
          className="font-normal leading-tight mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: theme.ink }}
        >
          {title}
        </h1>
        <p className="text-sm mb-5" style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif" }}>
          A travel journal by <em>Nur-Ali P. Anupol</em>
        </p>
        <div
          className="flex flex-wrap justify-between items-center gap-3 text-xs uppercase tracking-widest pt-3"
          style={{ borderTop: `1px solid ${theme.rule}`, color: theme.inkLight, fontFamily: "'Lora', Georgia, serif" }}
        >
          <span
            className="inline-block px-2.5 py-1 font-semibold"
            style={{ background: theme.accent, color: "#fff", letterSpacing: ".1em", fontSize: "10px" }}
          >
            Day {day}
          </span>
          <span>{date}</span>
          <span>{route}</span>
          <span>{stops.length} Stops</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_300px] gap-0">

          {/* ── Left column: article ── */}
          <div className="relative lg:pr-8">

            {/* DAY watermark */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "4%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "clamp(7rem, 18vw, 16rem)",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                color: theme.accent,
                opacity: 0.045,
                pointerEvents: "none",
                userSelect: "none",
                lineHeight: 1,
                whiteSpace: "nowrap",
                zIndex: 0,
              }}
            >
              {day}
            </div>

            {/* Mobile itinerary strip — hidden on lg+ where sidebar shows */}
            <div
              className="lg:hidden mb-6 overflow-x-auto"
              style={{ borderBottom: `1px solid ${theme.rule}`, paddingBottom: "1rem" }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: theme.accent, fontFamily: "'Lora', Georgia, serif", fontWeight: 600, letterSpacing: ".1em" }}
              >
                Day {day} Itinerary
              </p>
              <div className="flex gap-5 min-w-max pb-1">
                {stops.map((s, i) => (
                  <div key={i} style={{ minWidth: "76px", maxWidth: "96px" }}>
                    <span
                      className="block text-xs mb-1"
                      style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {s.time}
                    </span>
                    <span
                      style={{ display: "block", width: "20px", height: "2px", background: theme.accent, marginBottom: "5px" }}
                    />
                    <p
                      className="text-xs italic leading-snug"
                      style={{ color: theme.ink, fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {s.place}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured image — Polaroid style */}
            {images[0] && (
              <figure
                className="fade-up"
                style={{
                  background: "#fff",
                  padding: "10px 10px 30px",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.10)",
                  transform: "rotate(-1.1deg)",
                  margin: "0 4% 2.5rem",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onClick={() => setLightbox(0)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotate(0deg) scale(1.015)";
                  e.currentTarget.style.boxShadow = "0 16px 42px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "rotate(-1.1deg)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.10)";
                }}
              >
                <div style={{ overflow: "hidden", background: theme.accentLight, minHeight: "120px" }}>
                  <img
                    src={images[0].src}
                    alt={images[0].caption}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.style.cssText += ";display:flex;align-items:center;justify-content:center;min-height:200px;";
                      e.target.parentNode.innerHTML = `<span style="font-size:2.5rem;opacity:.3">📷</span>`;
                    }}
                  />
                </div>
                <p
                  className="text-xs italic text-center mt-2"
                  style={{ color: "#999", fontFamily: "'Lora', Georgia, serif" }}
                >
                  {images[0].caption}
                </p>
              </figure>
            )}

            {/* Article sections */}
            {sections.map((s, i) => (
              <div key={i} className="fade-up" data-delay={String(Math.min(i * 30, 180))}>

                {s.type === "lede" && (
                  <p
                    className="mb-7 pl-4"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.15rem",
                      fontStyle: "italic",
                      color: theme.ink,
                      lineHeight: 1.82,
                      borderLeft: `3px solid ${theme.accentMid}`,
                    }}
                  >
                    {s.text}
                  </p>
                )}

                {s.type === "paragraph" && (
                  <p
                    className={s.dropCap ? "drop-cap" : ""}
                    style={{
                      fontSize: "15.5px",
                      lineHeight: 1.92,
                      color: theme.inkMid,
                      marginBottom: "1.4rem",
                      fontFamily: "'Lora', Georgia, serif",
                    }}
                  >
                    {s.text}
                  </p>
                )}

                {s.type === "heading" && (
                  <>
                    {/* Arrow-badge section label */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "2.5rem 0 0.75rem" }}>
                      <div
                        style={{
                          background: theme.accent,
                          color: "#fff",
                          padding: "4px 16px 4px 12px",
                          fontFamily: "'Lora', Georgia, serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                          clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)",
                          flexShrink: 0,
                        }}
                      >
                        {s.text}
                      </div>
                      <div style={{ flex: 1, height: "1px", background: theme.rule }} />
                    </div>

                    {/* Inline image slider — Polaroid style, cycles through section's photos */}
                    {inlineImageMap[i] !== undefined && (() => {
                      const { start, end } = inlineImageRanges[i] || { start: inlineImageMap[i], end: inlineImageMap[i] };
                      const count = end - start + 1;
                      const offset = imgOffsets[i] || 0;
                      const currentIdx = start + offset;
                      const tilt = i % 2 === 0 ? "-0.8deg" : "0.9deg";

                      const goTo = (newOffset, e) => {
                        e && e.stopPropagation();
                        setImgOffsets((p) => ({ ...p, [i]: newOffset }));
                      };

                      return (
                        <figure
                          style={{
                            background: "#fff",
                            padding: "8px 8px 26px",
                            boxShadow: "0 6px 22px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08)",
                            transform: `rotate(${tilt})`,
                            margin: "1rem 4% 2rem",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "rotate(0deg) scale(1.015)";
                            e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.10)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = `rotate(${tilt})`;
                            e.currentTarget.style.boxShadow = "0 6px 22px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08)";
                          }}
                          onClick={() => setLightbox(currentIdx)}
                        >
                          {/* Image with fade animation on change */}
                          <div style={{ overflow: "hidden", background: theme.accentLight, minHeight: "80px", position: "relative" }}>
                            <img
                              key={currentIdx}
                              className="img-fade"
                              src={images[currentIdx].src}
                              alt={images[currentIdx].caption}
                              style={{ width: "100%", height: "auto", display: "block" }}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentNode.style.cssText +=
                                  ";display:flex;align-items:center;justify-content:center;min-height:140px;";
                                e.target.parentNode.innerHTML = `<span style="font-size:2rem;opacity:.3">📷</span>`;
                              }}
                            />

                            {/* Prev / Next arrows — only shown when multiple images */}
                            {count > 1 && (
                              <>
                                <button
                                  onClick={(e) => goTo((offset - 1 + count) % count, e)}
                                  style={{
                                    position: "absolute", left: "6px", top: "50%", transform: "translateY(-50%)",
                                    background: "rgba(0,0,0,0.38)", color: "#fff", border: "none",
                                    borderRadius: "50%", width: "28px", height: "28px", fontSize: "16px",
                                    lineHeight: "28px", textAlign: "center", cursor: "pointer",
                                    opacity: 0.85, padding: 0,
                                  }}
                                >‹</button>
                                <button
                                  onClick={(e) => goTo((offset + 1) % count, e)}
                                  style={{
                                    position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)",
                                    background: "rgba(0,0,0,0.38)", color: "#fff", border: "none",
                                    borderRadius: "50%", width: "28px", height: "28px", fontSize: "16px",
                                    lineHeight: "28px", textAlign: "center", cursor: "pointer",
                                    opacity: 0.85, padding: 0,
                                  }}
                                >›</button>
                              </>
                            )}
                          </div>

                          {/* Dot indicators + caption */}
                          {count > 1 && (
                            <div
                              style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "8px" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {Array.from({ length: count }).map((_, di) => (
                                <button
                                  key={di}
                                  onClick={(e) => goTo(di, e)}
                                  style={{
                                    width: di === offset ? "18px" : "6px",
                                    height: "6px",
                                    borderRadius: "99px",
                                    background: di === offset ? theme.accent : "#ccc",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: 0,
                                    transition: "width 0.25s ease, background 0.25s ease",
                                  }}
                                />
                              ))}
                            </div>
                          )}

                          <p
                            className="text-xs italic text-center"
                            style={{ marginTop: "6px", color: "#999", fontFamily: "'Lora', Georgia, serif" }}
                          >
                            {images[currentIdx].caption}
                            {count > 1 && (
                              <span style={{ color: "#bbb", marginLeft: "4px" }}>· {offset + 1}/{count}</span>
                            )}
                          </p>
                        </figure>
                      );
                    })()}
                  </>
                )}

                {s.type === "pullquote" && (
                  <div
                    className="my-8 relative"
                    style={{
                      borderTop: `3px solid ${theme.accent}`,
                      borderBottom: `1px solid ${theme.rule}`,
                      background: theme.accentLight,
                      padding: "1.5rem 1.5rem 1.4rem 2rem",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "-0.5rem",
                        left: "0.75rem",
                        fontSize: "3.8rem",
                        lineHeight: 1,
                        color: theme.accent,
                        fontFamily: "'Playfair Display', Georgia, serif",
                        opacity: 0.35,
                        userSelect: "none",
                      }}
                    >
                      "
                    </span>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "1.1rem",
                        fontStyle: "italic",
                        color: theme.ink,
                        lineHeight: 1.66,
                        margin: 0,
                      }}
                    >
                      {s.text}
                    </p>
                    <cite
                      className="block mt-3 text-xs uppercase tracking-widest not-italic"
                      style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif" }}
                    >
                      — Nur-Ali P. Anupol, Day {day} journal
                    </cite>
                  </div>
                )}

                {s.type === "factbox" && (
                  <div
                    className="my-6 p-4"
                    style={{
                      background: theme.accentLight,
                      border: `1px solid ${theme.rule}`,
                      borderLeft: `4px solid ${theme.accent}`,
                      borderTop: `2px solid ${theme.rule}`,
                    }}
                  >
                    <div
                      className="flex items-center gap-2 mb-3 pb-2"
                      style={{ borderBottom: `1px solid ${theme.rule}` }}
                    >
                      <span style={{ display: "block", width: "14px", height: "2px", background: theme.accent, flexShrink: 0 }} />
                      <p
                        className="text-xs uppercase tracking-widest"
                        style={{ color: theme.accent, fontFamily: "'Lora', Georgia, serif", fontWeight: 600, margin: 0 }}
                      >
                        {s.heading}
                      </p>
                    </div>
                    {s.facts.map((f, fi) => (
                      <p
                        key={fi}
                        className="text-sm leading-relaxed mb-2"
                        style={{ color: theme.inkMid, fontFamily: "'Lora', Georgia, serif" }}
                      >
                        · {f}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block" style={{ background: theme.rule }} />

          {/* ── Right column: sticky itinerary ── */}
          <div className="hidden lg:block" style={{ paddingLeft: "2rem" }}>
            <div
              className="p-5"
              style={{
                background: theme.accentLight,
                border: `1px solid ${theme.rule}`,
                borderTop: `3px solid ${theme.accent}`,
                position: "sticky",
                top: "1.5rem",
              }}
            >
              <p
                className="fade-up text-xs uppercase tracking-widest mb-4 pb-3"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: theme.accent,
                  borderBottom: `1px solid ${theme.rule}`,
                  fontWeight: 600,
                  letterSpacing: ".12em",
                }}
              >
                Day {day} Itinerary
              </p>
              {stops.map((s, i) => (
                <div
                  key={i}
                  className="fade-up flex gap-2 mb-3 items-start"
                  data-delay={String(i * 65)}
                >
                  <span
                    className="text-xs shrink-0 pt-0.5"
                    style={{ color: theme.inkLight, minWidth: "68px", fontFamily: "'Lora', Georgia, serif" }}
                  >
                    {s.time}
                  </span>
                  <span style={{ color: theme.accentMid, fontSize: "7px", marginTop: "5px", flexShrink: 0 }}>●</span>
                  <div>
                    <p className="text-sm italic" style={{ color: theme.ink, fontFamily: "'Lora', Georgia, serif", lineHeight: 1.4 }}>
                      {s.place}
                    </p>
                    <p className="text-xs" style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif" }}>
                      {s.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Full-width photo gallery ── */}
        {images.length > 0 && (
          <div className="mt-14">
            <div className="section-rule mb-6 fade-up">
              <span>◆ Photo Gallery · Day {day}</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="gallery-item fade-up"
                  data-delay={String((i % 3) * 80)}
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.style.cssText += ";display:flex;align-items:center;justify-content:center;";
                      e.target.parentNode.innerHTML = `<span style="font-size:2rem;opacity:.3">📷</span>`;
                    }}
                  />
                  <div className="gallery-caption-overlay">
                    <p style={{ color: "rgba(255,255,255,.9)", fontSize: "11px", fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", lineHeight: 1.4 }}>
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ornament */}
        <div className="text-center my-10 tracking-widest" style={{ color: theme.accentMid, fontSize: "20px" }}>
          · · ·
        </div>

        {day < days[days.length - 1].day ? (
          <div
            className="fade-up flex flex-wrap items-center justify-between gap-4 p-5"
            onClick={() => onSelectDay(day + 1)}
            style={{
              border: `1px solid ${theme.rule}`,
              borderLeft: `4px solid ${theme.accent}`,
              background: theme.accentLight,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = theme.bg; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = theme.accentLight; }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif" }}>
                Coming next
              </p>
              <p className="text-lg italic" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: theme.ink }}>
                Day {day + 1} — {days.find((d) => d.day === day + 1)?.title || "Coming Soon"}
              </p>
            </div>
            <span className="text-sm font-medium" style={{ color: theme.accent, fontFamily: "'Lora', Georgia, serif" }}>
              Read on →
            </span>
          </div>
        ) : (
          <div className="fade-up text-center p-6" style={{ border: `1px solid ${theme.rule}`, background: theme.accentLight }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif", letterSpacing: ".15em" }}>
              End of the journey
            </p>
            <p className="text-xl italic mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: theme.ink }}>
              Eight days. Home at last.
            </p>
            <p className="text-sm" style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif" }}>
              WMSU BSIT Educational Tour · April 2026 · Zamboanga City
            </p>
          </div>
        )}
      </div>

      {/* Back to all days — bottom */}
      <div className="max-w-4xl mx-auto px-6 py-6" style={{ borderTop: `1px solid ${theme.rule}` }}>
        <button
          onClick={onBack}
          className="back-btn flex items-center gap-2 text-sm transition-colors duration-200"
          style={{ color: theme.inkLight, fontFamily: "'Lora', Georgia, serif", background: "none", border: "none", cursor: "pointer" }}
        >
          ← Back to all days
        </button>
      </div>

      {/* Footer */}
      <div
        className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3"
        style={{ borderTop: `3px double ${theme.ink}`, fontSize: "11px", color: theme.inkLight, letterSpacing: ".06em", textTransform: "uppercase", fontFamily: "'Lora', Georgia, serif" }}
      >
        <span>WMSU · BSIT Educational Tour · April 2026</span>
        <span style={{ color: theme.accentMid }}>· · ·</span>
        <span>Day {day} of {days[days.length - 1].day} · {day === days[days.length - 1].day ? "Zamboanga City" : "Metro Manila"}</span>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(10,8,6,0.94)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ color: "rgba(255,255,255,.45)", fontSize: "13px", fontFamily: "'Lora', Georgia, serif" }}>
              {lightbox + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightbox(null)}
              style={{ color: "rgba(255,255,255,.8)", background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", lineHeight: 1, padding: "0.25rem" }}
            >
              ✕
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "92vw", maxHeight: "82vh", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <img
              src={images[lightbox].src}
              alt={images[lightbox].caption}
              style={{
                maxWidth: "92vw",
                maxHeight: "76vh",
                objectFit: "contain",
                boxShadow: "0 24px 64px rgba(0,0,0,.55)",
              }}
              onError={(e) => { e.target.alt = "Photo not yet uploaded"; }}
            />
            <p
              style={{
                color: "rgba(255,255,255,.65)",
                marginTop: "0.9rem",
                fontSize: "13px",
                fontFamily: "'Lora', Georgia, serif",
                fontStyle: "italic",
                textAlign: "center",
                maxWidth: "60ch",
              }}
            >
              {images[lightbox].caption}
            </p>
          </div>

          {lightbox > 0 && (
            <button
              className="lb-btn"
              style={{ left: "1rem" }}
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
            >
              ‹
            </button>
          )}

          {lightbox < images.length - 1 && (
            <button
              className="lb-btn"
              style={{ right: "1rem" }}
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}
