import { motion } from 'motion/react';
import { ArrowRight, Flame, Dumbbell, Wind } from 'lucide-react';

interface ClassesProps {
  onOpenContact: () => void;
}

const classes = [
  {
    name: 'High Voltage',
    type: 'HIIT',
    duration: '45 min',
    intensity: 'Max',
    desc: 'Total-body burn designed to red-line your heart rate. Expect burpees, plyometrics, and zero mercy.',
    icon: Flame,
    img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Iron & Grit',
    type: 'Strength',
    duration: '60 min',
    intensity: 'Heavy',
    desc: 'Heavy compound lifts, low reps, maximum load. Built to forge raw power from the ground up.',
    icon: Dumbbell,
    img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Velocity',
    type: 'Cardio',
    duration: '40 min',
    intensity: 'Fast',
    desc: 'Endurance-focused sprint and row intervals. Fast, rhythmic, relentless — your lungs will hate you.',
    icon: Wind,
    img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Classes({ onOpenContact }: ClassesProps) {
  return (
    <section id="classes" className="py-24 md:py-32 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-lime font-bold tracking-[0.2em] uppercase text-sm block mb-4">Our Programs</span>
            <h2 className="text-5xl md:text-7xl font-anton text-white">
              SELECT YOUR<br />
              <span className="text-white/40">WEAPON</span>
            </h2>
          </div>
          <button
            onClick={onOpenContact}
            className="hidden md:flex text-white font-bold uppercase tracking-wider items-center hover:text-lime transition-colors mt-6 md:mt-0 cursor-pointer"
          >
            All Classes <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classes.map((cls, i) => {
            const Icon = cls.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-obsidian-light border border-white/5 hover:border-lime/50 transition-colors overflow-hidden flex flex-col"
              >
                {/*
                  Lime top bar:
                  - Mobile (touch): always visible (scale-x-100)
                  - Desktop (hover-capable): hidden until hover
                */}
                <div className="absolute top-0 left-0 w-full h-1 bg-lime transform origin-left
                  scale-x-100
                  [@media(hover:hover)]:scale-x-0
                  [@media(hover:hover)]:group-hover:scale-x-100
                  transition-transform duration-500 ease-out z-10" />

                {/* Image */}
                <div className="relative h-52 overflow-hidden shrink-0">
                  <img
                    src={cls.img}
                    alt={cls.name}
                    className="w-full h-full object-cover transition-all duration-700
                      opacity-90 scale-100
                      [@media(hover:hover)]:grayscale
                      [@media(hover:hover)]:opacity-70
                      group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-light to-transparent" />
                  <Icon className="absolute top-4 right-4 text-lime w-6 h-6 opacity-80" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-grow p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-3 py-1">
                      {cls.type}
                    </span>
                    <span className="text-white/30 text-xs font-mono uppercase tracking-widest">
                      {cls.duration}
                    </span>
                    <span className="ml-auto text-lime text-xs font-bold uppercase tracking-wider">
                      {cls.intensity}
                    </span>
                  </div>
                  <h3 className="text-3xl font-anton mb-3 text-white">{cls.name}</h3>
                  <p className="text-gray-400 font-sans font-light flex-grow leading-relaxed">{cls.desc}</p>
                  <button
                    onClick={onOpenContact}
                    className="mt-8 uppercase font-bold text-sm tracking-wider flex items-center text-lime
                      group-hover:translate-x-2 transition-transform cursor-pointer"
                  >
                    Book Session <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
