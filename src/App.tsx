import { useState, useEffect, useRef, type ReactNode } from 'react';

/* ══════════════════════════════════════════
   ROSE PETALS — Falling petals background
   ══════════════════════════════════════════ */
function RosePetals() {
  const petals = Array.from({ length: 25 }, (_, i) => {
    const left = Math.random() * 100;
    const size = 10 + Math.random() * 16;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 15;
    const hue = 340 + Math.random() * 30;
    const sat = 60 + Math.random() * 30;
    const light = 55 + Math.random() * 25;
    return (
      <div
        key={i}
        className="petal"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size * 0.7}px`,
          borderRadius: '50% 0 50% 0',
          background: `hsl(${hue}, ${sat}%, ${light}%)`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  return <>{petals}</>;
}

/* ══════════════════════════════════════════
   BOKEH LIGHTS — Warm floating lights
   ══════════════════════════════════════════ */
function BokehLights() {
  const lights = Array.from({ length: 12 }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = 4 + Math.random() * 8;
    const duration = 5 + Math.random() * 6;
    const delay = Math.random() * 5;
    const colors = [
      'rgba(255,180,190,0.5)',
      'rgba(255,200,170,0.4)',
      'rgba(255,160,180,0.45)',
      'rgba(255,220,200,0.35)',
    ];
    return (
      <div
        key={i}
        className="bokeh"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          background: colors[i % colors.length],
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  return <>{lights}</>;
}

/* ══════════════════════════════════════════
   SCROLL REVEAL — Fade in when visible
   ══════════════════════════════════════════ */
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   SECTION DIVIDER
   ══════════════════════════════════════════ */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-12">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400/30" />
      <span className="text-pink-400/50 text-lg">❦</span>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-400/30" />
    </div>
  );
}

/* ══════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a0e18] via-[#1a0a10] to-[#1a0a10] opacity-80" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,5,8,0.8) 100%)'
      }} />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Rose decoration */}
        <div className="text-6xl md:text-7xl heartbeat mb-2">🌹</div>
        
        {/* Main title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide warm-glow"
            style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300 }}>
          לבלן שלי
        </h1>
        
        {/* Cursive subtitle */}
        <p className="cursive-title text-3xl md:text-5xl text-pink-300/80 mt-2"
           style={{ fontFamily: "'Great Vibes', cursive" }}>
          With all my love
        </p>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mt-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400/50" />
          <span className="text-pink-300/60 text-sm tracking-[0.3em]">♡ אני אוהב אותך ♡</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-pink-400/50" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 bounce-arrow text-pink-300/40">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   COUNT-UP TIMER
   ══════════════════════════════════════════ */
function CountUp() {
  const targetDate = new Date(2025, 9, 16); // Oct 16, 2025
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = now.getTime() - targetDate.getTime();
  const isFuture = diff < 0;
  const absDiff = Math.abs(diff);

  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((absDiff / 1000) % 60);

  const units = [
    { label: 'ימים', value: days },
    { label: 'שעות', value: hours },
    { label: 'דקות', value: minutes },
    { label: 'שניות', value: seconds },
  ];

  return (
    <section className="py-20 px-4">
      <Reveal className="max-w-3xl mx-auto text-center">
        <div className="text-4xl mb-4">💕</div>
        <h2 className="text-3xl md:text-4xl font-light mb-2 warm-glow">
          {isFuture ? 'עד שנהיה ביחד' : 'מאז שנהיינו ביחד'}
        </h2>
        <p className="text-pink-300/50 text-lg mb-10">
          16.10.2025 — היום שהכל התחיל
        </p>

        <div className="flex justify-center gap-3 md:gap-5 flex-wrap">
          {units.map((u, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-4 md:p-6 min-w-[75px] md:min-w-[100px] soft-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="text-3xl md:text-5xl font-light text-pink-200 mb-1">
                {String(u.value).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm text-pink-300/50 tracking-wider">
                {u.label}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-pink-300/30 text-sm">
          {isFuture ? '...וסופרים את הרגעים' : 'כל רגע איתך שווה הכל'}
        </p>
      </Reveal>
    </section>
  );
}

/* ══════════════════════════════════════════
   LOVE LETTER
   ══════════════════════════════════════════ */
function LoveLetter() {
  return (
    <section className="py-20 px-4">
      <Reveal className="max-w-2xl mx-auto text-center">
        <div className="text-4xl mb-4">💌</div>
        <h2 className="text-3xl md:text-4xl font-light mb-10 warm-glow">
          מכתב אהבה
        </h2>

        <div className="letter-card rounded-3xl p-8 md:p-12 text-right soft-pulse relative overflow-hidden">
          {/* Subtle ribbon shine */}
          <div className="absolute inset-0 ribbon-shine pointer-events-none" />
          
          {/* Opening decoration */}
          <div className="text-pink-400/20 text-6xl leading-none mb-4 text-right">״</div>
          
          <p className="text-lg md:text-xl leading-loose text-pink-100/90 relative z-10"
             style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 300 }}>
            יפה שלי, מאמי שלי אני אוהב אותך מאוד מאוד. אני רוצה להגיד לך תודה. תודה על זה שיש לי אותך, 
            תודה על החמישה החודשים שלנו שאנחנו ביחד. כיף לי איתך, תמיד מצחיק, תמיד כיף לי לבוא אלייך 
            כי אני מרגיש חום ואהבה ומרגיש שאיפה שאני נמצא איתך אני מרגיש בבית. את תמיד מרגיעה אותי 
            ומכניסה לחיים שלי המון ביטחון ואהבה. כשאני איתך אני יותר רגוע ומאושר. אין כמוך בעולם ואני 
            מאחל לנו המון שנים ביחד
          </p>

          {/* Closing */}
          <div className="mt-8 flex flex-col items-center gap-2 relative z-10">
            <div className="h-px w-20 bg-pink-400/20" />
            <p className="text-pink-300/70 text-base mt-2">שלך לתמיד ❤</p>
            <div className="text-pink-400/20 text-6xl leading-none">״</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ══════════════════════════════════════════
   PHOTO GALLERY
   ══════════════════════════════════════════ */
function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    caption: [
      'רגע ראשון 🌹',
      'חיוך שלך ✨',
      'יחד תמיד 💕',
      'אהבה שלנו 💗',
      'זכרון מתוק 🍯',
      'יום מושלם ☀️',
      'חיבוק חם 🤗',
      'עיניים יפות 👀',
      'צוחקים ביחד 😂',
      'הלב שלי 💖',
      'אנחנו 🥰',
      'לנצח שלנו 💞',
    ][i],
    gradient: [
      'from-rose-900/60 to-pink-800/40',
      'from-pink-900/60 to-rose-800/40',
      'from-red-900/50 to-pink-900/40',
      'from-rose-800/50 to-red-900/40',
      'from-pink-800/50 to-rose-900/40',
      'from-rose-900/40 to-pink-800/50',
      'from-red-900/40 to-rose-800/50',
      'from-pink-900/40 to-red-900/50',
      'from-rose-800/40 to-pink-900/50',
      'from-red-800/40 to-rose-900/50',
      'from-pink-800/40 to-rose-800/50',
      'from-rose-900/50 to-red-800/40',
    ][i],
  }));

  return (
    <section className="py-20 px-4">
      <Reveal className="max-w-5xl mx-auto text-center">
        <div className="text-4xl mb-4">📷</div>
        <h2 className="text-3xl md:text-4xl font-light mb-3 warm-glow">
          הרגעים שלנו
        </h2>
        <p className="text-pink-300/40 text-base mb-12">כל תמונה — סיפור של אהבה</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card rounded-2xl overflow-hidden cursor-pointer group relative aspect-square"
              onClick={() => setLightbox(photo.id)}
            >
              {/* Placeholder gradient — replace with <img> */}
              <div className={`w-full h-full bg-gradient-to-br ${photo.gradient} flex items-center justify-center`}>
                <span className="text-pink-300/20 text-5xl">🌹</span>
              </div>

              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500
                              flex items-end justify-center pb-4">
                <span className="text-sm text-pink-100/90">{photo.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="lightbox-overlay fixed inset-0 z-50 bg-black/90 backdrop-blur-md
                     flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full">
            <div className={`aspect-square rounded-3xl bg-gradient-to-br ${photos[lightbox - 1].gradient}
                            flex items-center justify-center`}>
              <span className="text-pink-300/20 text-8xl">🌹</span>
            </div>
            <p className="text-center text-pink-200/70 mt-4 text-lg">{photos[lightbox - 1].caption}</p>
            <button
              className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-pink-900/50 border border-pink-400/20
                         text-pink-200 flex items-center justify-center hover:bg-pink-800/60 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════
   12 REASONS I LOVE YOU
   ══════════════════════════════════════════ */
function Reasons() {
  const reasons = [
    { emoji: '🌹', text: 'את הדבר הכי יפה שקרה לי בחיים' },
    { emoji: '🏠', text: 'את גורמת לי להרגיש בבית בכל מקום' },
    { emoji: '😂', text: 'את תמיד גורמת לי לצחוק' },
    { emoji: '🤗', text: 'החיבוקים שלך מרגיעים את הנשמה' },
    { emoji: '💪', text: 'את נותנת לי כוח וביטחון' },
    { emoji: '🌅', text: 'כל יום איתך הוא יום מושלם' },
    { emoji: '🔥', text: 'את מכניסה חום ואהבה לחיים שלי' },
    { emoji: '✨', text: 'העיניים שלך מאירות לי את העולם' },
    { emoji: '🧘', text: 'איתך אני יותר רגוע ומאושר' },
    { emoji: '🍯', text: 'את מתוקה כמו דבש' },
    { emoji: '💎', text: 'את יחידה ומיוחדת, אין כמוך בעולם' },
    { emoji: '♾️', text: 'אני רוצה אותך לנצח' },
  ];

  return (
    <section className="py-20 px-4">
      <Reveal className="max-w-4xl mx-auto text-center">
        <div className="text-4xl mb-4">💗</div>
        <h2 className="text-3xl md:text-4xl font-light mb-3 warm-glow">
          למה אני אוהב אותך
        </h2>
        <p className="text-pink-300/40 text-base mb-12">12 סיבות מתוך מיליון, בלן שלי</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((reason, i) => (
            <Reveal key={i}>
              <div className="reason-card glass-card rounded-2xl p-6 text-center h-full flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-pink-400/30 text-sm font-light">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <span className="reason-emoji text-3xl transition-transform duration-300">{reason.emoji}</span>
                <p className="text-pink-100/80 text-base leading-relaxed font-light">{reason.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-16 px-4 text-center">
      <Reveal>
        <div className="text-5xl heartbeat mb-6">🌹</div>
        <p className="text-2xl md:text-3xl font-light text-pink-200/80 warm-glow mb-4">
          אוהב אותך לנצח, בלן שלי
        </p>
        <p className="text-pink-300/30 text-sm mb-8">נבנה באהבה, בשבילך ♡</p>
        <div className="flex justify-center gap-2 text-xl flex-wrap">
          {['🌹', '💕', '💌', '🕯️', '🦢', '💎', '🌸', '🍷', '🎀', '💗'].map((e, i) => (
            <span
              key={i}
              className="float-gentle inline-block"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {e}
            </span>
          ))}
        </div>
      </Reveal>
    </footer>
  );
}

/* ══════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════ */
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background layers */}
      <RosePetals />
      <BokehLights />

      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none"
           style={{
             background: 'radial-gradient(ellipse at 50% 30%, rgba(80,20,40,0.3) 0%, transparent 60%)'
           }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Divider />
        <CountUp />
        <Divider />
        <LoveLetter />
        <Divider />
        <PhotoGallery />
        <Divider />
        <Reasons />
        <Divider />
        <Footer />
      </div>
    </div>
  );
}
