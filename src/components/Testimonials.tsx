import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Jessica M.',
    since: 'Member since 2023',
    text: 'Volt completely changed my relationship with fitness. The coaches push you past what you thought was possible — and they mean it every single session.',
    result: 'Lost 28 lbs in 4 months',
    initial: 'J',
  },
  {
    name: 'Derek T.',
    since: 'Member since 2022',
    text: "I've trained at a dozen gyms. None of them come close to the energy and programming here. This place is genuinely different.",
    result: 'Benched 315 for the first time',
    initial: 'D',
  },
  {
    name: 'Aisha R.',
    since: 'Member since 2024',
    text: 'High Voltage is brutal in the best way. I started barely finishing the warm-up. Three months later I\'m leading the pack.',
    result: 'Down 22 lbs in 3 months',
    initial: 'A',
  },
  {
    name: 'Chris B.',
    since: 'Member since 2023',
    text: "Sarah's Iron & Grit class rebuilt my squat from scratch. I hit a 315lb PR last month — something I was chasing for years at other gyms.",
    result: '315 lb squat PR',
    initial: 'C',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-obsidian-light relative overflow-hidden">
      {/* Background text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-anton text-[18vw] leading-none text-white/[0.025] select-none pointer-events-none whitespace-nowrap">
        RESULTS
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-lime font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Real People</span>
          <h2 className="text-5xl md:text-7xl font-anton text-white">
            THE PROOF IS <span className="text-white/40">IN THE WORK</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-obsidian border border-white/5 hover:border-lime/20 transition-colors p-8 flex flex-col gap-6 group"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="fill-lime text-lime" />
                ))}
              </div>

              <blockquote className="text-gray-300 font-light text-lg leading-relaxed flex-grow">
                "{t.text}"
              </blockquote>

              {/* Result badge */}
              <div className="inline-flex items-center gap-2 self-start">
                <span className="h-[1px] w-6 bg-lime" />
                <span className="text-lime font-mono text-xs uppercase tracking-widest">{t.result}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-lime text-black flex items-center justify-center font-anton text-lg shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="font-anton text-white uppercase tracking-wider">{t.name}</p>
                  <p className="text-white/30 font-mono text-xs uppercase tracking-widest">{t.since}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
