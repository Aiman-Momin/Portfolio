import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['about', 'projects', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.5 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      {/* Backdrop */}
      <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? 'bg-[#080808]/85 backdrop-blur-xl border-b border-white/5' : ''}`} />

      <div className="relative max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="group flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-[#080808] font-display font-bold text-sm leading-none">A</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Aiman<span className="text-text-secondary font-normal">.dev</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-text-secondary hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/8 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{link.name}</span>
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-[#080808] text-sm font-semibold hover:bg-accent-dim transition-colors"
        >
          Hire me
        </motion.a>

        {/* Mobile toggle */}
        <button
          className="md:hidden relative z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={16} /></motion.span>
              : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={16} /></motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#0d0d0d] border-b border-white/5"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl text-lg font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-4 px-4 py-3 rounded-xl bg-accent text-[#080808] font-semibold text-center"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;