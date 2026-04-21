import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-bg text-white selection:bg-accent selection:text-bg noise">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      <CustomCursor />

      <div className="relative">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />

        <footer className="py-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
                <span className="text-[#080808] font-display font-bold text-xs">A</span>
              </div>
              <p className="text-text-secondary text-sm font-light">
                © 2026 Aiman Momin
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
              Designed &amp; Built with ☕
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Cookies'].map(l => (
                <a key={l} href="#" className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-white transition-colors font-mono">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}