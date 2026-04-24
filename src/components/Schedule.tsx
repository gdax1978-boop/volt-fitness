import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ScheduleProps {
  onOpenContact: () => void;
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const scheduleData: Record<string, Array<{ time: string; class: string; coach: string; spots: number }>> = {
  Mon: [
    { time: '06:00 AM', class: 'High Voltage', coach: 'Elena Volkov', spots: 4 },
    { time: '09:00 AM', class: 'Iron & Grit', coach: 'Sarah Jenks', spots: 12 },
    { time: '05:30 PM', class: 'Velocity', coach: 'Marcus Dash', spots: 7 },
    { time: '07:00 PM', class: 'High Voltage', coach: 'Elena Volkov', spots: 0 },
  ],
  Tue: [
    { time: '07:00 AM', class: 'Velocity', coach: 'Marcus Dash', spots: 10 },
    { time: '10:00 AM', class: 'Iron & Grit', coach: 'Sarah Jenks', spots: 16 },
    { time: '06:00 PM', class: 'High Voltage', coach: 'Elena Volkov', spots: 3 },
  ],
  Wed: [
    { time: '06:00 AM', class: 'High Voltage', coach: 'Elena Volkov', spots: 8 },
    { time: '05:30 PM', class: 'Iron & Grit', coach: 'Sarah Jenks', spots: 14 },
    { time: '07:00 PM', class: 'Velocity', coach: 'Marcus Dash', spots: 2 },
  ],
  Thu: [
    { time: '07:00 AM', class: 'Velocity', coach: 'Marcus Dash', spots: 16 },
    { time: '06:00 PM', class: 'High Voltage', coach: 'Elena Volkov', spots: 5 },
    { time: '07:30 PM', class: 'Iron & Grit', coach: 'Sarah Jenks', spots: 11 },
  ],
  Fri: [
    { time: '06:00 AM', class: 'High Voltage', coach: 'Elena Volkov', spots: 6 },
    { time: '09:00 AM', class: 'Velocity', coach: 'Marcus Dash', spots: 16 },
    { time: '05:00 PM', class: 'Iron & Grit', coach: 'Sarah Jenks', spots: 9 },
  ],
  Sat: [
    { time: '09:00 AM', class: 'High Voltage', coach: 'Elena Volkov', spots: 1 },
    { time: '11:00 AM', class: 'Iron & Grit', coach: 'Sarah Jenks', spots: 16 },
  ],
  Sun: [
    { time: '10:00 AM', class: 'Velocity', coach: 'Marcus Dash', spots: 13 },
  ],
};

export default function Schedule({ onOpenContact }: ScheduleProps) {
  const [activeDay, setActiveDay] = useState('Mon');

  return (
    <section id="schedule" className="py-24 md:py-32 bg-obsidian border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <span className="text-lime font-bold tracking-[0.2em] uppercase text-sm block mb-4">Operations</span>
            <h2 className="text-5xl md:text-7xl font-anton text-white">
              BATTLE <span className="text-white/40">ROSTER</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-2 font-anton uppercase text-lg transition-all cursor-pointer ${
                  activeDay === day
                    ? 'bg-lime text-black'
                    : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {scheduleData[activeDay]?.map((item, idx) => {
                const full = item.spots === 0;
                const almostFull = item.spots > 0 && item.spots <= 4;
                return (
                  <div
                    key={idx}
                    className={`group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 bg-obsidian-light border transition-all ${
                      full ? 'border-white/5 opacity-50' : 'border-white/5 hover:border-lime/30'
                    }`}
                  >
                    <div className="flex items-center gap-6 md:gap-8 mb-4 md:mb-0">
                      <span className="font-anton text-xl md:text-2xl text-lime min-w-[100px] md:min-w-[120px]">{item.time}</span>
                      <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                      <div>
                        <h4 className="text-xl md:text-2xl font-anton text-white uppercase tracking-wider">{item.class}</h4>
                        <p className="text-white/30 font-mono text-xs uppercase tracking-widest mt-1">
                          Commanded by {item.coach}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4">
                      {/* Availability badge */}
                      <span className={`font-mono text-xs uppercase tracking-widest ${
                        full ? 'text-red-500' : almostFull ? 'text-yellow-400' : 'text-white/30'
                      }`}>
                        {full ? 'Full' : `${item.spots} spots`}
                      </span>

                      {/*
                        Reserve button:
                        - Mobile (touch): always visible, full width
                        - Desktop (hover-capable): hidden until row is hovered
                      */}
                      <button
                        onClick={full ? undefined : onOpenContact}
                        disabled={full}
                        className={`font-anton uppercase text-sm transition-all cursor-pointer px-6 py-3 md:px-8
                          ${full
                            ? 'bg-white/5 text-white/20 cursor-not-allowed'
                            : `bg-white/8 hover:bg-lime hover:text-black text-white
                               opacity-100 translate-x-0
                               [@media(hover:hover)]:opacity-0
                               [@media(hover:hover)]:translate-x-4
                               [@media(hover:hover)]:group-hover:opacity-100
                               [@media(hover:hover)]:group-hover:translate-x-0`
                          }`}
                      >
                        {full ? 'Full' : 'Reserve Slot'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-white/20 font-mono text-xs uppercase tracking-widest text-center mt-8">
          Classes capped at 16 members · Spots update in real time
        </p>
      </div>
    </section>
  );
}
