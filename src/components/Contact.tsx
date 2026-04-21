import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import { Mail, Github, Linkedin, ArrowUpRight, Send } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [focused, setFocused] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('Sending message...');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.contact.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setStatus('success');
      setStatusMessage('Message sent! I will get back to you soon.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setStatusMessage('Unable to send message. Please use the email link above.');
      console.error('Contact form error:', err);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="section-label mb-6 justify-center">Contact</p>
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold tracking-tight leading-none mb-6">
            Let's build something<br />
            <span className="text-accent">interesting.</span>
          </h2>
          <p className="text-text-secondary font-light text-lg max-w-md mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: links + info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="group glass rounded-2xl p-6 flex items-center justify-between hover:border-accent/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-0.5">Email</p>
                  <p className="text-white font-medium text-sm">{portfolioData.contact.email}</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-text-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* GitHub */}
            <a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noreferrer"
              className="group glass rounded-2xl p-6 flex items-center justify-between hover:border-accent/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Github size={16} className="text-white/70" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-0.5">GitHub</p>
                  <p className="text-white font-medium text-sm">Aiman-Momin</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-text-secondary group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* LinkedIn */}
            <a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group glass rounded-2xl p-6 flex items-center justify-between hover:border-accent/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Linkedin size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-0.5">LinkedIn</p>
                  <p className="text-white font-medium text-sm">aiman-momin-d11</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-text-secondary group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Availability note */}
            <div className="mt-auto rounded-2xl border border-accent/15 bg-accent/5 p-6 flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
              <p className="text-white/70 text-sm font-light">
                Currently available for freelance &amp; internship opportunities.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-3xl p-8"
          >
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-secondary font-mono">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    onFocus={() => setFocused('Name')}
                    onBlur={() => setFocused(null)}
                    className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all ${
                      focused === 'Name' ? 'border-accent/50' : 'border-white/8'
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-secondary font-mono">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    onFocus={() => setFocused('Email')}
                    onBlur={() => setFocused(null)}
                    className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all ${
                      focused === 'Email' ? 'border-accent/50' : 'border-white/8'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-text-secondary font-mono">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Let's collaborate on..."
                  onFocus={() => setFocused('Subject')}
                  onBlur={() => setFocused(null)}
                  className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all ${
                    focused === 'Subject' ? 'border-accent/50' : 'border-white/8'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-text-secondary font-mono">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  onFocus={() => setFocused('Message')}
                  onBlur={() => setFocused(null)}
                  className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all resize-none ${
                    focused === 'Message' ? 'border-accent/50' : 'border-white/8'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group flex items-center justify-center gap-2.5 bg-accent text-[#080808] py-4 rounded-xl font-semibold text-sm hover:bg-accent-dim transition-colors mt-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              {statusMessage && (
                <p className={`text-sm mt-3 ${status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {statusMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;