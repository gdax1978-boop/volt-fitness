import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Moon, Battery, Activity, Brain, ChevronRight } from 'lucide-react';

interface CheckIn {
  sleep: number;
  energy: number;
  soreness: number;
  stress: number;
}

interface ReadinessWidgetProps {
  onScoreReady: (score: number) => void;
}

function calcScore(c: CheckIn) {
  // sleep (1–5) × 20pts, energy (1–5) × 20pts, soreness (1–5 inverted) × 15pts, stress (1–5 inverted) × 15pts
  return Math.round(
    c.sleep * 20 + c.energy * 20 + (6 - c.soreness) * 15 + (6 - c.stress) * 15 - 50
  );
}

function getProfile(score: number) {
  if (score >= 80)
    return {
      label: 'Peak Performance',
      sub: 'Your body is primed. Push maximum intensity today.',
      color: '#ccff00',
      ring: '#ccff00',
      rec: 'High Voltage',
      recType: 'HIIT — 45 min',
      icon: Zap,
    };
  if (score >= 60)
    return {
      label: 'Good to Train',
      sub: 'Solid recovery. Standard programming applies.',
      color: '#0066ff',
      ring: '#0066ff',
      rec: 'Iron & Grit',
      recType: 'Strength — 60 min',
      icon: Activity,
    };
  if (score >= 40)
    return {
      label: 'Moderate Load',
      sub: 'Reduce volume by 20%. Focus on technique.',
      color: '#f59e0b',
      ring: '#f59e0b',
      rec: 'Velocity',
      recType: 'Cardio — 40 min',
      icon: Battery,
    };
  return {
    label: 'Active Recovery',
    sub: 'Your body needs to rebuild. Opt for mobility work.',
    color: '#ef4444',
    ring: '#ef4444',
    rec: 'Deep Recovery',
    recType: 'Mobility — 30 min',
    icon: Moon,
  };
}

/* SVG circular gauge */
function Gauge({ score, color }: { score: number; color: string }) {
  const R = 72;
  const circ = 2 * Math.PI * R;
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDisplayed(score), 80);
    return () => clearTimeout(t);
  }, [score]);

  const offset = circ - (displayed / 100) * circ;

  return (
    <svg width="180" height="180" viewBox="0 0 180 180" className="shrink-0">
      {/* Track */}
      <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
      {/* Progress */}
      <circle
        cx="90" cy="90" r={R}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 90 90)"
        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.34,1.56,0.64,1), stroke 0.5s ease' }}
      />
      {/* Score */}
      <text x="90" y="84" textAnchor="middle" fill="white" fontSize="36" fontFamily="Anton, sans-serif" fontWeight="bold">
        {score}
      </text>
      <text x="90" y="102" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="3">
        READINESS
      </text>
    </svg>
  );
}

const SLIDERS = [
  { key: 'sleep' as const, label: 'Sleep Quality', icon: Moon, lo: 'Poor', hi: 'Deep' },
  { key: 'energy' as const, label: 'Energy Level', icon: Battery, lo: 'Drained', hi: 'Electric' },
  { key: 'soreness' as const, label: 'Muscle Soreness', icon: Activity, lo: 'Severe', hi: 'Fresh', invert: true },
  { key: 'stress' as const, label: 'Stress / Mental Load', icon: Brain, lo: 'High', hi: 'Calm', invert: true },
];

export default function ReadinessWidget({ onScoreReady }: ReadinessWidgetProps) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [score, setScore] = useState(0);
  const [profile, setProfile] = useState(getProfile(0));
  const [form, setForm] = useState<CheckIn>({ sleep: 3, energy: 3, soreness: 3, stress: 3 });

  const submit = () => {
    const s = Math.max(10, Math.min(100, calcScore(form)));
    setScore(s);
    setProfile(getProfile(s));
    setCheckedIn(true);
    onScoreReady(s);
  };

  return (
    <div className="bg-midnight-card border border-white/[0.06] overflow-hidden relative noise flex flex-col h-full">
      {/* Ambient orb */}
      <div
        className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-15 orb-animate blur-glow pointer-events-none"
        style={{ background: profile.color }}
      />

      <AnimatePresence mode="wait">
        {!checkedIn ? (
          /* ── CHECK-IN FORM ─────────────────────────────── */
          <motion.div
            key="form"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6 p-6 flex-1"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-1">Daily Check-In</p>
              <h3 className="font-anton text-2xl text-white uppercase tracking-wider">How do you feel today?</h3>
            </div>

            <div className="flex flex-col gap-5">
              {SLIDERS.map(({ key, label, icon: Icon, lo, hi, invert }) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={13} className="text-white/30" />
                      <span className="font-mono text-xs text-white/50 uppercase tracking-widest">{label}</span>
                    </div>
                    <span className="font-mono text-xs text-white/60 font-bold">{form[key]}/5</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/20 w-10 text-right">{invert ? hi : lo}</span>
                    <input
                      type="range" min={1} max={5} step={1}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: Number(e.target.value) }))}
                      className="flex-1 h-1 accent-lime bg-white/10 cursor-pointer appearance-none rounded-none"
                      style={{ accentColor: '#ccff00' }}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/20 w-10">{invert ? lo : hi}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={submit}
              className="mt-auto flex items-center justify-center gap-2 bg-lime text-black font-anton uppercase tracking-widest text-sm py-4 hover:bg-lime-hover transition-colors cursor-pointer"
            >
              Analyse Readiness <ChevronRight size={16} />
            </button>
          </motion.div>
        ) : (
          /* ── SCORE RESULT ─────────────────────────────── */
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-6 p-6 flex-1"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-1">Today's Status</p>
              <h3 className="font-anton text-2xl text-white uppercase tracking-wider" style={{ color: profile.color }}>
                {profile.label}
              </h3>
            </div>

            {/* Gauge + sub-stats */}
            <div className="flex items-center gap-6">
              <Gauge score={score} color={profile.ring} />
              <div className="flex flex-col gap-3 flex-1">
                {SLIDERS.map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center gap-3">
                    <Icon size={12} className="text-white/25 shrink-0" />
                    <div className="flex-1 h-[3px] bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(form[key] / 5) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full bg-lime/60"
                      />
                    </div>
                    <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest w-8 text-right">{form[key]}/5</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Adaptive recommendation */}
            <div className="border border-white/[0.07] p-4 bg-white/[0.02] relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: profile.color }} />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-1 pl-3">AI Recommendation</p>
              <p className="font-sans text-sm text-white/70 leading-relaxed pl-3 mb-3">{profile.sub}</p>
              <div className="flex items-center justify-between pl-3">
                <div>
                  <p className="font-anton text-white uppercase tracking-wider text-sm">{profile.rec}</p>
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{profile.recType}</p>
                </div>
                <button
                  onClick={() => setCheckedIn(false)}
                  className="font-mono text-[9px] uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors cursor-pointer"
                >
                  Re-check
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
