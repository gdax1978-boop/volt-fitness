import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Bell } from 'lucide-react';

interface DashNavProps {
  readinessScore: number | null;
}

function scoreLabel(score: number) {
  if (score >= 80) return { label: 'PEAK', color: 'text-lime' };
  if (score >= 60) return { label: 'GOOD', color: 'text-volt-blue' };
  if (score >= 40) return { label: 'MODERATE', color: 'text-yellow-400' };
  return { label: 'RECOVERY', color: 'text-red-400' };
}

export default function DashNav({ readinessScore }: DashNavProps) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const badge = readinessScore !== null ? scoreLabel(readinessScore) : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="text-xl font-anton tracking-widest text-white shrink-0">
          VOL<span className="text-lime">T</span>.
        </a>

        {/* Center — Readiness pill */}
        {badge && readinessScore !== null && (
          <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 border border-white/[0.07] bg-white/[0.03] rounded-none">
            <Zap size={12} className="text-lime shrink-0" />
            <span className="font-mono text-xs tracking-[0.15em] text-white/40 uppercase">Readiness</span>
            <span className="font-mono text-xs font-bold tracking-widest text-white">{readinessScore}</span>
            <span className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase ${badge.color}`}>{badge.label}</span>
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-5 shrink-0">
          <span className="hidden md:block font-mono text-xs text-white/25 uppercase tracking-widest">{today}</span>
          <button className="text-white/30 hover:text-white transition-colors cursor-pointer">
            <Bell size={16} />
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Site</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
