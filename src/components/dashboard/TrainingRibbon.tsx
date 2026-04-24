import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Play, Clock, Flame, Zap, Wind, Dumbbell } from 'lucide-react';

/* ── Abstract gradient backgrounds (faceless) ─── */
const ORBS = [
  { bg: 'radial-gradient(ellipse at 70% 30%, rgba(204,255,0,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,102,255,0.10) 0%, transparent 60%), #0f0f0f' },
  { bg: 'radial-gradient(ellipse at 30% 20%, rgba(0,102,255,0.20) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(0,180,255,0.08) 0%, transparent 60%), #0f0f0f' },
  { bg: 'radial-gradient(ellipse at 60% 40%, rgba(255,80,80,0.14) 0%, transparent 60%), radial-gradient(ellipse at 20% 60%, rgba(204,255,0,0.08) 0%, transparent 60%), #0f0f0f' },
  { bg: 'radial-gradient(ellipse at 40% 30%, rgba(180,0,255,0.14) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(0,102,255,0.10) 0%, transparent 60%), #0f0f0f' },
];

const CONTINUE = [
  { name: 'Iron & Grit', sub: 'Strength Block · Wk 4', week: 4, day: 2, total: 24, progress: 58, last: 'Yesterday', accent: '#ccff00', icon: Dumbbell },
  { name: 'High Voltage', sub: 'HIIT Conditioning · Wk 2', week: 2, day: 5, total: 20, progress: 35, last: '2 days ago', accent: '#0066ff', icon: Zap },
];

const RECOMMENDED = [
  { name: 'Velocity Sprint', type: 'Cardio', duration: 40, intensity: 'Max', match: 94, icon: Wind },
  { name: 'Iron & Grit', type: 'Strength', duration: 60, intensity: 'Heavy', match: 91, icon: Dumbbell },
  { name: 'High Voltage', type: 'HIIT', duration: 45, intensity: 'High', match: 88, icon: Zap },
  { name: 'Power Complex', type: 'Compound', duration: 55, intensity: 'Max', match: 85, icon: Flame },
];

function HScrollTrack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {children}
    </div>
  );
}

interface TrainingRibbonProps {
  onOpenContact: () => void;
}

export default function TrainingRibbon({ onOpenContact }: TrainingRibbonProps) {
  return (
    <div className="flex flex-col gap-10">

      {/* ── Continue Training ─────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-5 bg-lime" />
            <h2 className="font-anton text-xl text-white uppercase tracking-wider">Continue Training</h2>
          </div>
          <button onClick={onOpenContact} className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-white/25 hover:text-white transition-colors cursor-pointer">
            All Programs <ChevronRight size={12} />
          </button>
        </div>

        <HScrollTrack>
          {CONTINUE.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="snap-start shrink-0 w-72 border border-white/[0.07] overflow-hidden relative group cursor-pointer hover:border-white/20 transition-colors"
              style={{ background: ORBS[i % ORBS.length].bg }}
              onClick={onOpenContact}
            >
              {/* Orb */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <prog.icon size={80} className="text-white/10" />
              </div>

              <div className="relative p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: prog.accent }}>{prog.sub}</p>
                    <h3 className="font-anton text-2xl text-white uppercase tracking-wider">{prog.name}</h3>
                  </div>
                  <div className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-lime hover:text-lime transition-colors text-white/40 group-hover:text-lime group-hover:border-lime">
                    <Play size={14} />
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">Progress</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">{prog.progress}%</span>
                  </div>
                  <div className="h-[2px] bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prog.progress}%` }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                      className="h-full"
                      style={{ background: prog.accent }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">
                    Day {prog.day} of {prog.total}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">Last: {prog.last}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </HScrollTrack>
      </section>

      {/* ── Recommended For You ──────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-5 bg-volt-blue" />
            <h2 className="font-anton text-xl text-white uppercase tracking-wider">Recommended For You</h2>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">AI-matched</span>
        </div>

        <HScrollTrack>
          {RECOMMENDED.map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="snap-start shrink-0 w-48 border border-white/[0.06] overflow-hidden relative group cursor-pointer hover:border-white/15 transition-colors"
              style={{ background: ORBS[(i + 2) % ORBS.length].bg }}
              onClick={onOpenContact}
            >
              {/* Match badge */}
              <div className="absolute top-3 right-3 bg-black/50 px-2 py-0.5 backdrop-blur-sm">
                <span className="font-mono text-[9px] uppercase tracking-widest text-lime font-bold">{cls.match}% match</span>
              </div>

              <div className="p-4 pt-10 flex flex-col gap-3">
                <cls.icon size={22} className="text-white/20" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-1">{cls.type}</p>
                  <h4 className="font-anton text-base text-white uppercase tracking-wider leading-tight">{cls.name}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-white/30">
                    <Clock size={10} />
                    <span className="font-mono text-[9px]">{cls.duration}m</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/30">
                    <Flame size={10} />
                    <span className="font-mono text-[9px] uppercase">{cls.intensity}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </HScrollTrack>
      </section>
    </div>
  );
}
