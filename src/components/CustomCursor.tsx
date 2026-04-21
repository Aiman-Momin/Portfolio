import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState<'default' | 'hover' | 'click'>('default');
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });

      const el = e.target as HTMLElement;
      const isInteractive = el.closest('a, button, [role="button"], input, textarea');
      setMode(isInteractive ? 'hover' : 'default');
    };

    const handleDown = () => setMode('click');
    const handleUp = () => setMode(prev => prev === 'click' ? 'default' : prev);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    // Smooth trailing dot
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let current = { x: -100, y: -100 };
    const animate = () => {
      current.x = lerp(current.x, targetRef.current.x, 0.12);
      current.y = lerp(current.y, targetRef.current.y, 0.12);
      setTrail({ x: current.x, y: current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Main dot — follows cursor exactly */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-accent"
        style={{
          width: mode === 'click' ? 5 : 6,
          height: mode === 'click' ? 5 : 6,
          left: pos.x - 3,
          top: pos.y - 3,
          transition: 'width 0.1s, height 0.1s',
        }}
      />

      {/* Trailing ring — lagged */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border border-accent/50"
        animate={{
          left: trail.x - (mode === 'hover' ? 22 : 14),
          top: trail.y - (mode === 'hover' ? 22 : 14),
          width: mode === 'hover' ? 44 : mode === 'click' ? 20 : 28,
          height: mode === 'hover' ? 44 : mode === 'click' ? 20 : 28,
          opacity: mode === 'click' ? 0.3 : 1,
          backgroundColor: mode === 'hover' ? 'rgba(184,255,87,0.05)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.5 }}
        style={{ position: 'fixed' }}
      />
    </div>
  );
};

export default CustomCursor;