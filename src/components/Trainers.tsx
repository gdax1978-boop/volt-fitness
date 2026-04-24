import { motion } from 'motion/react';
import { Instagram, Twitter } from 'lucide-react';

const trainers = [
  {
    name: "Sarah 'The Hammer' Jenks",
    role: 'Head of Strength',
    bio: 'Former national powerlifting champion. Holds three state records. Will make you lift heavier than you thought possible.',
    tags: ['Powerlifting', 'Olympic Lifting', 'Mobility'],
    img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Marcus Dash',
    role: 'Speed & Endurance',
    bio: 'D1 track athlete turned elite conditioning coach. Specialises in VO2 max programming and sprint mechanics.',
    tags: ['Sprint Training', 'VO2 Max', 'Row & Bike'],
    img: 'https://images.unsplash.com/photo-1567013127542-490d757e51cd?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Elena Volkov',
    role: 'HIIT Specialist',
    bio: 'Certified CSCS with a background in gymnastics. Her High Voltage classes are consistently the most booked in the gym.',
    tags: ['HIIT', 'Plyometrics', 'Core Work'],
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Trainers() {
  return (
    <section id="trainers" className="py-24 md:py-32 bg-obsidian-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-lime font-bold tracking-[0.2em] uppercase text-sm mb-4 block">The Elite</span>
          <h2 className="text-5xl md:text-7xl font-anton text-white">
            MEET THE <span className="text-white/40">SQUAD</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainers.map((trainer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative overflow-hidden bg-obsidian"
            >
              {/* Photo */}
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={trainer.img}
                  alt={trainer.name}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
              </div>

              {/* Info — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <span className="text-lime font-bold uppercase tracking-wider text-xs mb-1 block">
                  {trainer.role}
                </span>
                <h3 className="text-2xl font-anton text-white mb-3">{trainer.name}</h3>

                {/* Bio — hidden until hover */}
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {trainer.bio}
                </p>

                {/* Specialty tags */}
                <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                  {trainer.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono uppercase tracking-wider bg-white/10 text-white/70 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-lime hover:text-black transition-colors text-white"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-lime hover:text-black transition-colors text-white"
                  >
                    <Twitter size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
