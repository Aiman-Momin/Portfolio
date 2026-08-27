import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

const imageMap: Record<string, string> = {
  Sentra: '/images/sentra.png',
  'Continuum Protocol': '/images/continnum.png',
  'Collaborative Whiteboard': '/images/whiteboard.png',
  'Ether Museum': '/images/museum.png',
  'Student Grade Tracker': '/images/grade.png',
  'Smart Study Scheduler': '/images/study.png',
  'Sudoku Game': '/images/sudoku.png',
  'Nasreen Collection': '/images/nasreen.png',
};

const tagMap: Record<string, string[]> = {
  Sentra: ['Security', 'Wallet', 'On-chain'],
  'Continuum Protocol': ['Blockchain', 'Solidity', 'DApp'],
  'Collaborative Whiteboard': ['React', 'Socket.io', 'Canvas'],
  'Ether Museum': ['Solidity', 'React', 'Web3'],
  'Student Grade Tracker': ['Java', 'Data'],
  'Smart Study Scheduler': ['TypeScript', 'React'],
  'Sudoku Game': ['JavaScript', 'UI'],
  'Nasreen Collection': ['TypeScript', 'React', 'Vercel'],
};

const fallbackImage = (title: string) => {
  const normalized = title.toLowerCase();

  if (normalized.includes('museum') || normalized.includes('ether')) {
    return 'https://source.unsplash.com/900x600/?art,museum,blockchain';
  }

  if (normalized.includes('grade') || normalized.includes('student')) {
    return 'https://source.unsplash.com/900x600/?education,grade,analytics';
  }

  if (normalized.includes('protocol') || normalized.includes('blockchain')) {
    return 'https://source.unsplash.com/900x600/?crypto,security,technology';
  }

  if (normalized.includes('whiteboard')) {
    return 'https://source.unsplash.com/900x600/?whiteboard,collaboration,team';
  }

  if (normalized.includes('study')) {
    return 'https://source.unsplash.com/900x600/?study,planner,student';
  }

  if (normalized.includes('sudoku')) {
    return 'https://source.unsplash.com/900x600/?puzzle,game,brain';
  }

  return `https://picsum.photos/seed/${encodeURIComponent(title.replace(/\s+/g, ''))}/900/600`;
};

const Projects = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

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

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, index) => {
            const primaryLink = project.live || project.github || project.link;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="group glass overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
              >
                <a href={primaryLink} target="_blank" rel="noreferrer" className="block">
                  <div className="relative aspect-[16/9] bg-[#111] overflow-hidden">
                    <img
                      src={imageMap[project.title] ?? fallbackImage(project.title)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />
                    <div className="absolute top-5 left-5 font-mono text-[10px] tracking-widest text-white/30 uppercase">
                      0{index + 1}
                    </div>
                    <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                      {(tagMap[project.title] ?? []).slice(0, 2).map(t => (
                        <span key={t} className="tag bg-black/30 border-white/10 text-white/80">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 py-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-accent">
                          {project.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mt-2">
                          {project.description}
                        </p>
                      </div>
                      <ExternalLink size={18} className="text-text-secondary transition-colors group-hover:text-accent" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(tagMap[project.title] ?? []).map(t => (
                        <span key={t} className="text-[10px] font-mono uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-white/5 text-text-secondary">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>

                <div className="px-6 pb-6 flex flex-wrap gap-3">
                  <a
                    href={project.github || project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-accent/40 hover:text-accent"
                  >
                    GitHub
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-medium text-accent transition hover:bg-accent/20"
                    >
                      Live
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;