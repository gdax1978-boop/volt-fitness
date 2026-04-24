import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Classes from '../components/Classes';
import Statistics from '../components/Statistics';
import Trainers from '../components/Trainers';
import Testimonials from '../components/Testimonials';
import Schedule from '../components/Schedule';
import Membership from '../components/Membership';
import FAQ from '../components/FAQ';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const open = () => setIsContactOpen(true);
  const close = () => setIsContactOpen(false);

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navbar onOpenContact={open} />
      <Hero onOpenContact={open} />
      <Marquee />
      <Classes onOpenContact={open} />
      <Statistics />
      <Trainers />
      <Testimonials />
      <Schedule onOpenContact={open} />
      <Membership onOpenContact={open} />
      <FAQ />
      <CTABanner onOpenContact={open} />
      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={close} />
    </div>
  );
}
