import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  special?: string;
}

function AnimatedStat({ value, suffix, special }: StatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView || special) return;
    const el = ref.current;
    if (!el) return;

    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * value) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, suffix, special]);

  return (
    <span ref={ref} className="text-6xl md:text-7xl font-anton mb-2 block tabular-nums">
      {special ?? `0${suffix}`}
    </span>
  );
}

export default function Statistics() {
  const stats: StatProps[] = [
    { value: 50, suffix: '+', label: 'Classes Weekly' },
    { value: 12, suffix: '', label: 'Elite Coaches' },
    { value: 0, suffix: '', label: 'Access', special: '24/7' },
    { value: 100, suffix: '%', label: 'Results' },
  ];

  return (
    <section className="relative py-24 bg-white text-black clip-diagonal-both flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <AnimatedStat {...stat} />
              <span className="font-bold tracking-widest uppercase text-xs md:text-sm text-gray-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
