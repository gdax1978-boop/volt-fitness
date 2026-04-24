import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const EVENTS = [
  { text: '14 members training live right now', accent: true },
  { text: 'Alex K. finished High Voltage · 847 cal · 2m ago' },
  { text: 'Zara T. hit a 30-day streak 🔥' },
  { text: 'Kai M. new PR: 315 lb squat · Iron & Grit · 5m ago' },
  { text: 'Riley B. started their free trial · 18m ago' },
  { text: 'Jordan S. finished Velocity · 5k in 21:30 · 22m ago' },
  { text: 'Casey L. completed Iron & Grit · 423 cal · 35m ago' },
  { text: 'Morgan P. booked High Voltage · Tonight 7PM' },
  { text: '9 new PRs logged this week across the community' },
  { text: 'Marcus Dash just posted a new programming note' },
];

// Duplicate for seamless loop
const DOUBLED = [...EVENTS, ...EVENTS];

export default function LiveTicker() {
  const [liveCount, setLiveCount] = useState(14);

  // Gently fluctuate the live member count
  useEffect(() => {
    const id = setInterval(() => {
      setLiveCount((c) => Math.max(8, Math.min(22, c + (Math.random() > 0.5 ? 1 : -1))));
    }, 7000);
    return () => clearInterval(id);
  }, []);

  // Patch the live count text dynamically
  const events = DOUBLED.map((e, i) =>
    i === 0 || i === EVENTS.length
      ? { ...e, text: `${liveCount} members training live right now` }
      : e
  );

  return (
    <div className="bg-midnight border-t border-white/[0.05] py-2.5 overflow-hidden flex items-center gap-4">
      {/* Fixed label */}
      <div className="flex items-center gap-2 px-4 shrink-0 border-r border-white/[0.06] pr-4">
        <span className="w-1.5 h-1.5 rounded-full bg-lime pulse-dot shrink-0" />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 whitespace-nowrap">
          Live Feed
        </span>
      </div>

      {/* Scrolling track */}
      <div className="flex-1 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-midnight to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-midnight to-transparent z-10 pointer-events-none" />

        <div className="ticker-animate flex whitespace-nowrap items-center gap-10" style={{ width: 'max-content' }}>
          {events.map((event, i) => (
            <span key={i} className="flex items-center gap-2 shrink-0">
              <Zap size={10} className={event.accent ? 'text-lime' : 'text-white/15'} />
              <span className={`font-mono text-[10px] uppercase tracking-widest ${event.accent ? 'text-white/50' : 'text-white/25'}`}>
                {event.text}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
