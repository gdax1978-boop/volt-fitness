import { ArrowRight } from 'lucide-react';

interface MembershipProps {
  onOpenContact: () => void;
}

export default function Membership({ onOpenContact }: MembershipProps) {
  return (
    <section id="membership" className="py-24 md:py-32 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 w-full relative">
          <div className="absolute -inset-4 border border-lime/20 -z-10 translate-x-2 translate-y-2"></div>
          <div className="absolute -inset-4 border border-lime/20 -z-10 -translate-x-2 -translate-y-2"></div>
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop" 
            alt="Gym facilities" 
            className="w-full h-[600px] object-cover grayscale border-2 border-white/10"
          />
        </div>
        
        <div className="flex-1 md:pl-8">
          <span className="text-lime font-bold tracking-[0.2em] uppercase text-sm mb-4 block">No Commitments. Just Results.</span>
          <h2 className="text-5xl md:text-7xl font-anton mb-8 text-white">JOIN THE <span className="text-white/40">MOVEMENT</span></h2>
          <p className="text-gray-400 font-sans text-lg mb-10 font-light leading-relaxed">
            Gain full access to all classes, open gym hours, and elite coaching. Choose the pass that fits your intensity level.
          </p>

          <div className="space-y-6">
            {[
              { name: "Drop-In", price: "$35", desc: "Single class pass. Good for any session." },
              { name: "Monthly Unlimited", price: "$250", desc: "Full access. Includes recovery zones." }
            ].map((plan, i) => (
              <div 
                key={i} 
                onClick={onOpenContact}
                className="flex justify-between items-center p-6 border border-white/10 hover:border-lime transition-colors group cursor-pointer bg-obsidian-light"
              >
                <div>
                  <h4 className="text-2xl font-anton text-white group-hover:text-lime transition-colors">{plan.name}</h4>
                  <p className="text-gray-500 text-sm mt-1">{plan.desc}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-anton mr-6 text-white">{plan.price}</span>
                  <ArrowRight className="text-white/30 group-hover:text-lime group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
