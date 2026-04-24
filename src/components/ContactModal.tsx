import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: 'General Inquiry'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', goal: 'General Inquiry' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-obsidian-light border border-white/10 rounded-none p-8 overflow-hidden"
          >
            <div className="absolute top-0 w-full h-1 bg-lime left-0" />
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer">
              <X className="w-6 h-6" />
            </button>
            
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-lime/20 border border-lime/50 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-lime" />
                </div>
                <h3 className="font-anton text-4xl mb-2 text-white uppercase tracking-wider">Target Acquired</h3>
                <p className="font-mono text-sm text-gray-400 uppercase tracking-widest">We will initiate training soon.</p>
                <button 
                    onClick={onClose}
                    className="mt-8 bg-white text-black font-anton uppercase px-8 py-3 hover:bg-lime transition-colors cursor-pointer"
                >
                    Dismiss
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-anton text-4xl mb-2 text-white uppercase tracking-wider">Find Your Power</h3>
                <p className="font-mono text-sm text-gray-400 mb-8 uppercase tracking-widest">Submit parameters to join the elite.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Full Name</label>
                    <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-none px-4 py-3 font-mono text-sm focus:outline-none focus:border-lime transition-colors text-white uppercase" 
                        placeholder="Warrior Name" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Comm Link (Email)</label>
                    <input 
                        required 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-none px-4 py-3 font-mono text-sm focus:outline-none focus:border-lime transition-colors text-white uppercase" 
                        placeholder="email@link.com" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Primary Objective</label>
                    <select 
                        value={formData.goal}
                        onChange={(e) => setFormData({...formData, goal: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-none px-4 py-3 font-mono text-sm focus:outline-none focus:border-lime transition-colors text-white uppercase"
                    >
                        <option value="General Inquiry" className="bg-obsidian">General Inquiry</option>
                        <option value="Start Trial" className="bg-obsidian">Start Trial</option>
                        <option value="Membership" className="bg-obsidian">Membership</option>
                        <option value="Personal Training" className="bg-obsidian">Personal Training</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={status === 'sending'} 
                    className="mt-4 w-full group relative overflow-hidden rounded-none px-6 py-5 bg-lime text-black hover:bg-lime-hover transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span className="font-anton text-xl uppercase tracking-widest relative z-10">
                      {status === 'sending' ? 'Transmitting...' : 'Initiate Sequence'}
                    </span>
                  </button>
                  {status === 'error' && <p className="text-red-500 text-center font-mono text-xs uppercase tracking-widest">Link failure. Try again.</p>}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
