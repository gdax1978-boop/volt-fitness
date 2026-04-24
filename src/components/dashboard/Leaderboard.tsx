import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';

const BOARD = [
  { rank: 1, name: 'Alex K.', pts: 2840, streak: 28, delta: 0 },
  { rank: 2, name: 'Zara T.', pts: 2710, streak: 30, delta: 1 },
  { rank: 3, name: 'Jordan S.', pts: 2540, streak: 14, delta: -1 },
  { rank: 4, name: 'Kai M.', pts: 2380, streak: 21, delta: 2 },
  { rank: 5, name: 'Riley B.', pts: 2210, streak: 7, delta: 0 },
  { rank: 6, name: 'Casey L.', pts: 1990, streak: 11, delta: -2 },
  { rank: 7, name: 'Morgan P.', pts: 1840, streak: 5, delta: 1 },
];

const YOU_RANK = 4; // simulate current user = Kai M.
const MAX_PTS = BOARD[0].pts;

function DeltaIcon({ delta }: { delta: number }) {
  if (delta > 0) return <TrendingUp size={11} className="text-lime" />;
  if (delta < 0) return <TrendingDown size={11} className="text-red-400" />;
  return <Minus size={11} className="text-white/20" />;
}

function avatar(name: string) {
  return name.charAt(0).toUpperCase();
}

export default function Leaderboard() {
  return (
    <div className="bg-midnight-card border border-white/[0.06] flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 mb-0.5">This Week</p>
          <h3 className="font-anton text-xl text-white uppercase tracking-wider">Community Board</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-lime pulse-dot" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">Live</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="px-5 py-2 flex items-center gap-3 border-b border-white/[0.04]">
        <span className="w-5 font-mono text-[8px] uppercase tracking-widest text-white/15">#</span>
        <span className="flex-1 font-mono text-[8px] uppercase tracking-widest text-white/15">Member</span>
        <span className="w-20 font-mono text-[8px] uppercase tracking-widest text-white/15 hidden sm:block">Points</span>
        <span className="w-14 font-mono text-[8px] uppercase tracking-widest text-white/15">Streak</span>
        <span className="w-5 font-mono text-[8px] uppercase tracking-widest text-white/15">Δ</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-white/[0.03] flex-1 overflow-y-auto">
        {BOARD.map((member, i) => {
          const isYou = member.rank === YOU_RANK;
          const barW = Math.round((member.pts / MAX_PTS) * 100);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`px-5 py-3 flex items-center gap-3 transition-colors ${isYou ? 'bg-lime/[0.04] border-l-2 border-lime' : 'hover:bg-white/[0.02]'}`}
            >
              {/* Rank */}
              <span className={`w-5 font-mono text-xs font-bold shrink-0 ${member.rank <= 3 ? 'text-lime' : 'text-white/30'}`}>
                {member.rank}
              </span>

              {/* Avatar + name */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className={`w-7 h-7 flex items-center justify-center text-xs font-anton shrink-0 ${isYou ? 'bg-lime text-black' : 'bg-white/8 text-white/50'}`}>
                  {avatar(member.name)}
                </div>
                <div className="min-w-0">
                  <p className={`font-sans text-sm font-semibold truncate ${isYou ? 'text-white' : 'text-white/70'}`}>
                    {member.name}{isYou && <span className="ml-1.5 font-mono text-[9px] uppercase tracking-widest text-lime/60">you</span>}
                  </p>
                  {/* Mini bar */}
                  <div className="hidden sm:block h-[2px] bg-white/5 mt-1 w-16">
                    <motion.div
                      className="h-full bg-lime/40"
                      initial={{ width: 0 }}
                      animate={{ width: `${barW}%` }}
                      transition={{ duration: 0.8, delay: i * 0.06 + 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* Points */}
              <span className="w-20 font-mono text-xs text-white/50 hidden sm:block tabular-nums">
                {member.pts.toLocaleString()}
              </span>

              {/* Streak */}
              <div className="w-14 flex items-center gap-1">
                <Flame size={10} className={member.streak >= 14 ? 'text-lime' : 'text-white/20'} />
                <span className={`font-mono text-xs tabular-nums ${member.streak >= 14 ? 'text-white/60' : 'text-white/25'}`}>
                  {member.streak}d
                </span>
              </div>

              {/* Delta */}
              <div className="w-5 flex justify-center">
                <DeltaIcon delta={member.delta} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="px-5 py-3 border-t border-white/[0.04] text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/15">
          Resets every Monday · Points from completed sessions
        </p>
      </div>
    </div>
  );
}
