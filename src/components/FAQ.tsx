import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How do I get started?',
    a: 'Hit the "Start Trial" button, fill out your details, and one of our coaches will reach out within 24 hours to set up your first session at no cost.',
  },
  {
    q: 'Do I need prior fitness experience?',
    a: 'No. Every class is coached, and our trainers scale all movements to your current fitness level. Whether you\'re brand new or a seasoned athlete, Volt will challenge you appropriately.',
  },
  {
    q: 'What\'s included in the Monthly Unlimited membership?',
    a: 'All group classes (unlimited), 24/7 open gym access, recovery zone access, and monthly fitness assessments. No hidden fees.',
  },
  {
    q: 'How large are the classes?',
    a: 'We cap every class at 16 members. Keeping class sizes small is non-negotiable — it means every person gets direct coaching attention on every rep.',
  },
  {
    q: 'Is there parking?',
    a: 'Yes. We have a dedicated private lot adjacent to the building, available at no extra charge to members and drop-ins.',
  },
  {
    q: 'Can I freeze or cancel my membership?',
    a: 'Monthly memberships can be cancelled with 7 days notice. Freezes of up to 30 days per year are available at no cost for travel, injury, or other circumstances.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-obsidian border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-lime font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Got Questions</span>
          <h2 className="text-5xl md:text-7xl font-anton text-white">
            WE HAVE <span className="text-white/40">ANSWERS</span>
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`border transition-colors ${isOpen ? 'border-lime/40 bg-obsidian-light' : 'border-white/5 bg-obsidian-light hover:border-white/10'}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
                >
                  <span className="font-anton text-xl text-white uppercase tracking-wider pr-4 group-hover:text-lime transition-colors">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-lime">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-400 font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
