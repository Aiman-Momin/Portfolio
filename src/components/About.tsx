import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import { useInView } from 'react-intersection-observer';
import { Code2, Blocks, Zap } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Frontend Dev', desc: 'React, TypeScript, Tailwind' },
  { icon: Blocks, label: 'Blockchain', desc: 'Solidity, Web3, DApps' },
  { icon: Zap, label: 'Fast Learner', desc: 'Always building something new' },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-5">About me</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              A developer who <br />
              <span className="text-gradient">actually ships</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-text-secondary font-light max-w-sm leading-relaxed text-base md:text-right"
          >
            I turn caffeine into code — and most of the time, it works.
          </motion.p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Photo / identity card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 glass rounded-3xl overflow-hidden relative group min-h-[360px]"
          >
            <div className="absolute inset-0 bg-[url('/pfp.png')] bg-cover bg-[position:50%_30%] bg-no-repeat opacity-30 grayscale group-hover:opacity-50 group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-600/25 via-gray-600/12 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-display text-3xl font-bold text-white mb-1">Aiman Momin</p>
              <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Web3 &amp; Frontend Dev</p>
              <div className="flex flex-wrap gap-2">
                {['Pune, India', 'Open to work', '2024–2027'].map(t => (
                  <span key={t} className="tag text-[10px]">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            <div className="glass rounded-3xl p-8 flex-1">
              <p className="text-white/80 font-light leading-relaxed text-[1.05rem] mb-6">
                {portfolioData.about.content}
              </p>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.slice(0, 5).map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.08 }}
                  className="glass rounded-2xl p-5 group hover:border-accent/20 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <h.icon size={16} className="text-accent" />
                  </div>
                  <p className="font-display font-semibold text-white text-sm mb-1">{h.label}</p>
                  <p className="text-text-secondary text-xs leading-relaxed">{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;