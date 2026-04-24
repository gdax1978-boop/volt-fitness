import { useState } from 'react';
import { motion } from 'motion/react';
import DashNav from '../components/dashboard/DashNav';
import ReadinessWidget from '../components/dashboard/ReadinessWidget';
import TrainingRibbon from '../components/dashboard/TrainingRibbon';
import WorkoutLogger from '../components/dashboard/WorkoutLogger';
import Leaderboard from '../components/dashboard/Leaderboard';
import LiveTicker from '../components/dashboard/LiveTicker';
import ContactModal from '../components/ContactModal';

const GREETING = (() => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
})();

export default function Dashboard() {
  const [readinessScore, setReadinessScore] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#050505', color: '#f5f5f5' }}>
      <DashNav readinessScore={readinessScore} />

      {/* Main scrollable area */}
      <main className="flex-1 pt-14 pb-0 flex flex-col">
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">

          {/* ── Greeting ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25 mb-1">{GREETING}</p>
              <h1 className="font-anton text-4xl md:text-5xl text-white uppercase tracking-wider leading-none">
                Member <span className="text-gradient-lime">Portal</span>
              </h1>
            </div>
            {readinessScore !== null && (
              <div className="flex items-center gap-2 border border-white/[0.06] px-4 py-2 self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-lime pulse-dot" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">Readiness logged</span>
                <span className="font-mono text-sm font-bold text-lime">{readinessScore}</span>
              </div>
            )}
          </motion.div>

          {/* ── Row 1: Readiness + Workout Logger ──────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:min-h-[520px]"
            >
              <ReadinessWidget onScoreReady={setReadinessScore} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="lg:min-h-[520px]"
            >
              <WorkoutLogger />
            </motion.div>
          </div>

          {/* ── Row 2: Netflix-style Training Ribbons ──── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
          >
            <TrainingRibbon onOpenContact={() => setContactOpen(true)} />
          </motion.div>

          {/* ── Row 3: Leaderboard ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="min-h-[400px]"
          >
            <Leaderboard />
          </motion.div>

        </div>

        {/* ── Live Community Ticker ── pinned to bottom ─ */}
        <div className="sticky bottom-0 z-40">
          <LiveTicker />
        </div>
      </main>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
