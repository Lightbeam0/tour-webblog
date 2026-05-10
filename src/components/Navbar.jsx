export default function Navbar({ onHome }) {
  return (
    <nav className="w-full border-b border-stone-200 bg-[#FAF7F2] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Left — School name */}
        <div className="text-xs uppercase tracking-widest text-stone-400 font-medium hidden sm:block">
          WMSU · College of Computing Studies
        </div>

        {/* Center — Blog title (clickable) */}
        <button
          onClick={onHome}
          className="font-serif text-xl italic text-stone-800 hover:text-amber-800 transition-colors duration-200 mx-auto sm:mx-0"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Beyond the Classroom
        </button>

        {/* Right — Tour label */}
        <div className="text-xs uppercase tracking-widest text-stone-400 hidden sm:block">
          BSIT Tour · 2026
        </div>

      </div>
    </nav>
  );
}