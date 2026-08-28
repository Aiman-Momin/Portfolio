import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap } from 'lucide-react';

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="section-label mb-5">Journey</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
            Experience &amp; <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Timeline — left */}
          <div className="lg:col-span-3 flex flex-col gap-0">
            {[
              ...portfolioData.experience.map(e => ({ ...e, type: 'work' as const })),
              ...portfolioData.education.map(e => ({ ...e, type: 'edu' as const, role: e.degree, company: e.institution })),
            ].map((item, i, arr) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex gap-6 relative"
              >
                {/* Connector line */}
                {i < arr.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-white/5 z-0" />
                )}

                {/* Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                    item.type === 'work'
                      ? 'border-accent/30 bg-accent/10 text-accent'
                      : 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                  }`}>
                    {item.type === 'work'
                      ? <Briefcase size={15} />
                      : <GraduationCap size={15} />
                    }
                  </div>
                </div>

                {/* Content */}
                <div className={`pb-12 ${i === arr.length - 1 ? 'pb-0' : ''} flex-1`}>
                  <span className={`font-mono text-[10px] tracking-widest uppercase mb-2 block ${
                    item.type === 'work' ? 'text-accent' : 'text-blue-400'
                  }`}>
                    {item.period}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mb-1">{item.role}</h3>
                  <p className="text-white/60 text-sm mb-3">{item.company}</p>
                  {'description' in item && item.description && (
                    <p className="text-text-secondary font-light text-sm leading-relaxed">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills — right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Skills card */}
            <div className="glass rounded-3xl p-7 flex-1">
              <p className="text-xs font-mono uppercase tracking-widest text-text-secondary mb-6">Technical Stack</p>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="tag cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Current focus callout */}
            <div className="rounded-2xl border border-accent/15 bg-accent/5 p-6">
              <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3">Current Focus</p>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Spending most of my time turning messy ideas into working code and occasionally writing docs nobody reads.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;