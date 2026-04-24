import { motion } from 'motion/react';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        {/* Desktop: left-to-right cinematic gradient */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent z-10" />

        {/* Mobile: multi-directional gradient for portrait — dark from bottom + left for legibility */}
        <div
          className="md:hidden absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.75) 40%, rgba(10,10,10,0.3) 100%),' +
              'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.5) 50%, transparent 100%)',
          }}
        />

        {/* Ambient lime glow — visible on mobile, subtle on desktop */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none blur-glow"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 20% 60%, rgba(204,255,0,0.07) 0%, transparent 70%),' +
              'radial-gradient(ellipse 40% 50% at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)',
          }}
        />

        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Athlete training"
          className="w-full h-full object-cover grayscale opacity-70 mix-blend-overlay"
          fetchpriority="high"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-12 md:mt-0">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex items-center space-x-4 mb-4">
            <span className="h-[2px] w-12 bg-lime"></span>
            <span className="text-lime font-bold tracking-[0.2em] uppercase text-sm">Find Your Power</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.85] mb-8 text-white stroke-black" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
            <span className="block">PUSH</span>
            <span className="block text-transparent" style={{ WebkitTextStroke: '2px white' }}>PAST</span>
            <span className="block text-lime">LIMITS.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-sans max-w-lg mb-10 leading-relaxed font-light">
            Volt is a premium high-intensity sanctuary. We combine elite programming with an atmosphere engineered for serious performance.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={onOpenContact}
              className="bg-lime text-black font-anton text-xl uppercase px-10 py-5 hover:bg-lime-hover transition-colors flex items-center justify-center group cursor-pointer"
            >
              Start Trial <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
            <a
              href="#classes"
              className="border border-white/20 text-white font-anton text-xl uppercase px-10 py-5 hover:bg-white hover:text-black transition-colors flex items-center justify-center"
            >
              View Schedule
            </a>
          </div>

          {/* Member portal entry */}
          <Link
            to="/dashboard"
            className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/30 hover:text-lime transition-colors group"
          >
            <LayoutDashboard size={13} className="group-hover:text-lime transition-colors" />
            Member Portal
            <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative large text behind */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 font-anton text-[20vw] leading-none text-white/5 select-none pointer-events-none whitespace-nowrap z-0">
        VOLT
      </div>
    </section>
  );
}
