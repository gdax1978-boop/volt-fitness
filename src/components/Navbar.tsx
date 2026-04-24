import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Classes', 'Trainers', 'Schedule', 'Membership', 'Contact'];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-obsidian/90 backdrop-blur-md py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-3xl font-anton tracking-widest text-white">VOL<span className="text-lime">T</span>.</a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-semibold tracking-wider uppercase hover:text-lime transition-colors text-white">
              {link}
            </a>
          ))}
          <button 
            onClick={onOpenContact}
            className="bg-lime text-black font-anton uppercase px-6 py-2 hover:bg-lime-hover transition-colors transform hover:-translate-y-1 cursor-pointer"
          >
            Join Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-obsidian-light border-t border-white/10 flex flex-col items-center py-8 space-y-6">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-xl font-anton tracking-wider uppercase hover:text-lime transition-colors text-white">
              {link}
            </a>
          ))}
          <button 
            onClick={() => { setIsOpen(false); onOpenContact(); }}
            className="bg-lime text-black font-anton uppercase px-8 py-3 w-3/4 hover:bg-lime-hover transition-colors cursor-pointer"
          >
            Join Now
          </button>
        </div>
      )}
    </nav>
  );
}
