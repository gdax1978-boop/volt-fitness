import { Instagram, Twitter, Facebook } from 'lucide-react';
import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
    }
  };

  return (
    <footer id="contact" className="bg-black pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-6xl font-anton mb-6 text-white">VOL<span className="text-lime">T</span>.</h2>
            <p className="text-gray-500 max-w-sm font-light">
              123 Industry Blvd, Warehouse C<br/>
              Metropolis, NY 10001<br/><br/>
              hello@voltfitness.com
            </p>
          </div>
          <div>
            <h4 className="text-lime font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4 font-semibold text-gray-400 uppercase tracking-wider text-sm">
              <li><a href="#classes" className="hover:text-white transition-colors">Classes</a></li>
              <li><a href="#trainers" className="hover:text-white transition-colors">Trainers</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Schedule</a></li>
              <li><a href="#membership" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lime font-bold uppercase tracking-widest text-sm mb-6">Social</h4>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-lime hover:text-black hover:border-lime transition-all text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-lime hover:text-black hover:border-lime transition-all text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-lime hover:text-black hover:border-lime transition-all text-white">
                <Twitter size={20} />
              </a>
            </div>
            <h4 className="text-white font-anton text-xl mb-4 uppercase">Subscribe</h4>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR EMAIL" 
                  className="bg-obsidian-light border border-white/10 px-4 py-3 w-full focus:outline-none focus:border-lime text-sm uppercase tracking-wider text-white" 
                  required
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-white text-black px-4 font-anton hover:bg-lime transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {status === 'loading' ? '...' : 'JOIN'}
                </button>
              </div>
              {status === 'success' && <p className="text-lime text-xs font-mono uppercase tracking-widest mt-1">Logged into the grid.</p>}
              {status === 'error' && <p className="text-red-500 text-xs font-mono uppercase tracking-widest mt-1">Link failure. Try again.</p>}
            </form>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} VOLT FITNESS. ALL RIGHTS RESERVED.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
