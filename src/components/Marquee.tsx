import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

const ITEMS = Array.from({ length: 8 }, (_, i) => i);

export default function Marquee() {
  return (
    <div className="bg-lime text-black py-4 overflow-hidden clip-diagonal-both-reverse relative z-20 -mt-10 md:-mt-20 flex items-center">
      {/* Duplicate the strip so it tiles seamlessly at -50% */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
        className="flex whitespace-nowrap items-center will-change-transform"
        style={{ width: 'max-content' }}
      >
        {[...ITEMS, ...ITEMS].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-4xl md:text-5xl font-anton uppercase px-6">No Excuses</span>
            <Zap size={28} className="shrink-0" />
            <span
              className="text-4xl md:text-5xl font-anton uppercase px-6"
              style={{ WebkitTextStroke: '1.5px black', color: 'transparent' }}
            >
              Pure Power
            </span>
            <Zap size={28} className="shrink-0" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
