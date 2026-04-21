import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const imageMap: Record<string, string> = {
  'EtherMuseum': '/images/museum.png',
  'Continnum Protocol': '/images/continnum.png',
  'A Collaborative Whiteboard': '/images/whiteboard.png',
  'Student Grade Tracker': '/images/grade.png',
  'Smart Study Scheduler': '/images/study.png',
  'Sudoku Game': '/images/sudoku.png',
};

const tagMap: Record<string, string[]> = {
  'EtherMuseum': ['Solidity', 'React', 'Web3'],
  'Continnum Protocol': ['Blockchain', 'Solidity', 'DApp'],
  'A Collaborative Whiteboard': ['React', 'Socket.io', 'Canvas'],
  'Student Grade Tracker': ['Java', 'Data'],
  'Smart Study Scheduler': ['TypeScript', 'React'],
  'Sudoku Game': ['JavaScript', 'UI'],
};

const Projects = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const featured = portfolioData.projects.slice(0, 2);
  const rest = portfolioData.projects.slice(2);

  return (
    <section id="projects" className="py-32 relative">
      {/* Subtle bg tint */}
      <div className="absolute inset-0 bg-[#0d0d0d]/60" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-5">Featured work</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
              Selected <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-text-secondary max-w-xs font-light leading-relaxed"
          >
            Anyway, here's what I've been up to.
          </motion.p>
        </div>

        {/* Featured 2 — large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.12 }}
              className="group relative"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-[#111]">
                {/* Image */}
                <img
                  src={imageMap[project.title] ?? `https://picsum.photos/seed/${project.title.replace(/\s/g, '')}/800/500`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />

                {/* Number */}
                <div className="absolute top-5 left-5 font-mono text-[10px] tracking-widest text-white/30 uppercase">
                  0{index + 1}
                </div>

                {/* Hover actions */}
                <AnimatePresence>
                  {hovered === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-5 right-5 flex gap-3"
                    >
                      <a href={project.link} target="_blank" rel="noreferrer"
                         className="w-10 h-10 rounded-full bg-accent text-[#080808] flex items-center justify-center hover:scale-110 transition-transform">
                        <Github size={16} />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Meta */}
              <div className="flex items-start justify-between gap-4 px-1">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(tagMap[project.title] ?? []).map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-accent transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary font-light text-sm leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>
                <a href={project.link} target="_blank" rel="noreferrer"
                   className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all mt-1">
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rest — compact list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.08 }}
              className="group glass rounded-2xl p-5 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-[9px] tracking-widest text-text-secondary uppercase">
                  0{index + 3}
                </span>
                <ExternalLink size={13} className="text-text-secondary group-hover:text-accent transition-colors" />
              </div>
              <h4 className="font-display font-semibold text-white text-base mb-2 group-hover:text-accent transition-colors leading-tight">
                {project.title}
              </h4>
              <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                {project.description}
              </p>
              {tagMap[project.title] && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tagMap[project.title].slice(0, 2).map(t => (
                    <span key={t} className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-text-secondary">{t}</span>
                  ))}
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;