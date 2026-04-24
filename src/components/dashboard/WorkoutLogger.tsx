import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, ChevronRight, Timer } from 'lucide-react';

const EXERCISES = [
  { name: 'Trap Bar Deadlift', sets: '4 × 5', load: '275 lb' },
  { name: 'Front Squat', sets: '3 × 6', load: '185 lb' },
  { name: 'Romanian Deadlift', sets: '3 × 8', load: '155 lb' },
  { name: 'Glute-Ham Raise', sets: '3 × 10', load: 'BW +25' },
  { name: 'Farmer Carry', sets: '3 × 40m', load: '100 lb/side' },
];

/* ── Slide-to-complete thumb ─────────────────── */
function SlideToComplete({ onComplete, completed }: { onComplete: () => void; completed: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragX, setDragX] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  const maxX = () => (trackRef.current ? trackRef.current.offsetWidth - 44 : 200);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (completed) return;
    dragging.current = true;
    startX.current = e.clientX - dragX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const x = Math.max(0, Math.min(e.clientX - startX.current, maxX()));
    setDragX(x);
    if (x >= maxX() * 0.87) {
      dragging.current = false;
      setDragX(maxX());
      setTimeout(onComplete, 120);
    }
  };

  const handlePointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (!completed) {
      setDragX(0);
    }
  };

  return (
    <div
      ref={trackRef}
      className="relative h-11 bg-white/[0.03] border border-white/[0.06] overflow-hidden select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Fill track */}
      <div
        className="absolute inset-y-0 left-0 transition-none"
        style={{
          width: completed ? '100%' : dragX + 44,
          background: completed ? 'rgba(204,255,0,0.12)' : 'rgba(204,255,0,0.06)',
        }}
      />

      {/* Thumb */}
      <div
        className="absolute top-1.5 bottom-1.5 left-0 w-8 flex items-center justify-center touch-none z-10 cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(${completed ? maxX() : dragX}px)`,
          transition: dragging.current ? 'none' : completed ? 'transform 0.2s ease' : 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          background: completed ? '#ccff00' : 'rgba(204,255,0,0.7)',
        }}
        onPointerDown={handlePointerDown}
      >
        {completed
          ? <Check size={13} className="text-black" />
          : <ChevronRight size={13} className="text-black" />
        }
      </div>

      {/* Label */}
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.18em] text-white/20 pointer-events-none pl-10">
        {completed ? '— complete —' : 'slide to log'}
      </span>
    </div>
  );
}

/* ── Elapsed timer ───────────────────────────── */
function ElapsedTimer({ running }: { running: boolean }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return <span className="font-mono text-xs text-white/40 tabular-nums">{m}:{s}</span>;
}

export default function WorkoutLogger() {
  const [completed, setCompleted] = useState<boolean[]>(Array(EXERCISES.length).fill(false));
  const [started, setStarted] = useState(false);
  const done = completed.filter(Boolean).length;
  const pct = Math.round((done / EXERCISES.length) * 100);

  return (
    <div className="bg-midnight-card border border-white/[0.06] flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.05] flex items-center justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 mb-0.5">Today's Session</p>
          <h3 className="font-anton text-xl text-white uppercase tracking-wider">Iron &amp; Grit — Wk 4 / D2</h3>
        </div>
        <div className="flex items-center gap-3">
          <Timer size={13} className="text-white/25" />
          <ElapsedTimer running={started} />
          {!started && (
            <button
              onClick={() => setStarted(true)}
              className="font-mono text-[9px] uppercase tracking-widest bg-lime text-black px-3 py-1.5 hover:bg-lime-hover transition-colors cursor-pointer"
            >
              Start
            </button>
          )}
        </div>
      </div>

      {/* Overall progress */}
      <div className="px-6 py-3 border-b border-white/[0.04] flex items-center gap-4">
        <div className="flex-1 h-[2px] bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-lime"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 shrink-0">
          {done}/{EXERCISES.length} done
        </span>
      </div>

      {/* Exercise list */}
      <div className="flex flex-col divide-y divide-white/[0.04] flex-1 overflow-y-auto">
        {EXERCISES.map((ex, i) => (
          <div key={i} className={`px-6 py-4 flex flex-col gap-2 transition-opacity ${completed[i] ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-white/20 w-4">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className={`font-sans text-sm font-semibold tracking-wide ${completed[i] ? 'line-through text-white/30' : 'text-white'}`}>
                    {ex.name}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mt-0.5">
                    {ex.sets} · {ex.load}
                  </p>
                </div>
              </div>
            </div>
            <SlideToComplete
              completed={completed[i]}
              onComplete={() => setCompleted((prev) => prev.map((v, idx) => idx === i ? true : v))}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      {done === EXERCISES.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="px-6 py-5 border-t border-lime/20 bg-lime/5 text-center"
        >
          <p className="font-anton text-xl text-lime uppercase tracking-wider">Session Complete</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-1">Results logged · Rest 24–48h</p>
        </motion.div>
      )}
    </div>
  );
}
