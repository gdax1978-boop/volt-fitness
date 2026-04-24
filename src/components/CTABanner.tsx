import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';

interface CTABannerProps {
  onOpenContact: () => void;
}

export default function CTABanner({ onOpenContact }: CTABannerProps) {
  return (
    <section className="relative py-24 bg-lime overflow-hidden clip-diagonal-top">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Large background text */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-anton text-[22vw] leading-none text-black/[0.07] select-none pointer-events-none whitespace-nowrap">
        VOLT
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-black w-6 h-6" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] font-bold text-black/60">
              First class on us
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-anton text-black leading-none">
            STOP PLANNING.<br />START TRAINING.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center md:items-end gap-4 shrink-0"
        >
          <button
            onClick={onOpenContact}
            className="bg-black text-lime font-anton text-2xl uppercase px-12 py-6 hover:bg-obsidian-light transition-colors flex items-center gap-3 group cursor-pointer"
          >
            Claim Free Trial
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
          <p className="text-black/50 font-mono text-xs uppercase tracking-widest">
            No commitment · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
