import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import SplineScene from './SplineScene';

const skills = ['React', 'TypeScript', 'Solidity', 'Node.js', 'Web3'];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D Background */}
      <SplineScene />

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 bg-radial-[at_70%_50%] from-transparent via-transparent to-[#080808]/80 z-[1]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col gap-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">

          {/* Left: Main content */}
          <div className="flex-1 max-w-3xl">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-accent/30 bg-accent/5"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent font-mono text-xs tracking-widest uppercase">Available for work</span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-[0.88] tracking-tight text-white"
              >
                Aiman
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-[0.88] tracking-tight text-gradient"
              >
                Momin
              </motion.h1>
            </div>

            {/* Role + tagline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-10"
            >
              <p className="text-text-secondary text-lg font-light max-w-xs leading-relaxed">
                Web Developer &amp; Blockchain Enthusiast. Building things that actually work.
              </p>
              <div className="w-px h-12 bg-white/10 hidden sm:block self-center" />
              <p className="font-mono text-xs text-text-secondary max-w-[200px] leading-relaxed">
                BSc Blockchain @ SPPU <br />
                Pune, India
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 bg-accent text-[#080808] px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-accent-dim transition-colors"
              >
                See my work
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full border border-white/10 text-white/80 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Get in touch
              </a>
              <div className="flex items-center gap-3 ml-auto sm:ml-0">
                <a href="https://github.com/Aiman-Momin" target="_blank" rel="noreferrer"
                   className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-all">
                  <Github size={15} />
                </a>
                <a href="https://www.linkedin.com/in/aiman-momin-d11/" target="_blank" rel="noreferrer"
                   className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 transition-all">
                  <Linkedin size={15} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Side stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="hidden lg:flex flex-col gap-4 pb-2"
          >
            {[
              { value: '6+', label: 'Projects shipped' },
              { value: '2', label: 'Internships' },
              { value: '∞', label: 'Bugs fixed' },
            ].map(stat => (
              <div key={stat.label} className="text-right">
                <p className="font-display text-4xl font-bold text-white leading-none">{stat.value}</p>
                <p className="text-text-secondary text-xs font-mono mt-1 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Skills marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="relative overflow-hidden border-y border-white/5 py-4"
        >
          <div className="marquee-track">
            {[...skills, ...skills, ...skills, ...skills].map((s, i) => (
              <span key={i} className="flex items-center gap-6 pr-8">
                <span className="text-xs font-mono tracking-widest uppercase text-text-secondary whitespace-nowrap">{s}</span>
                <span className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary font-mono">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
