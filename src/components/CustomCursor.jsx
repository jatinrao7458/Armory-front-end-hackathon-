import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Custom cursor with spring physics + orbiting particle aura.
 *
 * Particles orbit the cursor in organized circular paths:
 *  - Multiple orbit rings at different radii
 *  - Each particle has its own angular speed & direction
 *  - Orbits follow the cursor with spring-like easing
 *  - Random size pulsing creates a breathing effect
 *  - Connection lines between nearby particles form a constellation
 */

// ── Orbit system config ──
const PALETTE = [
  { r: 255, g: 200, b: 1 },   // forsythia
  { r: 255, g: 153, b: 50 },  // deep-saffron
  { r: 241, g: 246, b: 244 }, // arctic-powder
  { r: 217, g: 232, b: 226 }, // mystic-mint
  { r: 17,  g: 76,  b: 90 },  // nocturnal
];

const ORBIT_COUNT = 18;         // total orbiting particles
const CONNECTION_DISTANCE = 70; // max distance for constellation lines

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const smoothMouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const trailRef = useRef([]);     // breadcrumb trail dots
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Initialize orbiting particles ──
    const particles = [];
    for (let i = 0; i < ORBIT_COUNT; i++) {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      // Distribute across 3 orbit rings
      const ring = Math.floor(i / (ORBIT_COUNT / 3));
      const baseRadius = 25 + ring * 22 + (Math.random() - 0.5) * 10;

      particles.push({
        // Orbit properties
        angle: (Math.PI * 2 * i) / ORBIT_COUNT + Math.random() * 0.5,
        radius: baseRadius,
        baseRadius: baseRadius,
        angularSpeed: (0.008 + Math.random() * 0.018) * (Math.random() > 0.5 ? 1 : -1),
        // Position (computed each frame)
        x: 0,
        y: 0,
        // Visual
        size: 1.2 + Math.random() * 2.8,
        baseSize: 1.2 + Math.random() * 2.8,
        color,
        alpha: 0.3 + Math.random() * 0.5,
        baseAlpha: 0.3 + Math.random() * 0.5,
        // Pulsing
        pulseSpeed: 0.02 + Math.random() * 0.04,
        pulsePhase: Math.random() * Math.PI * 2,
        // Orbit wobble (makes circles feel organic, not mechanical)
        wobbleAmp: 3 + Math.random() * 8,
        wobbleFreq: 0.5 + Math.random() * 2,
        wobblePhase: Math.random() * Math.PI * 2,
        // Shape: 0=circle, 1=diamond
        shape: Math.random() < 0.75 ? 0 : 1,
      });
    }
    particlesRef.current = particles;

    // ── Mouse tracking ──
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Animation loop ──
    const animate = () => {
      frameRef.current++;
      const t = frameRef.current;
      ctx.clearRect(0, 0, width, height);

      // Smooth-follow the cursor (spring-like easing)
      const ease = 0.08;
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * ease;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * ease;
      const cx = smoothMouseRef.current.x;
      const cy = smoothMouseRef.current.y;

      // Skip if cursor is off-screen
      if (cx < -100 || cy < -100) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // ── Trail breadcrumbs ──
      if (t % 4 === 0) {
        trailRef.current.push({ x: cx, y: cy, life: 1.0 });
        if (trailRef.current.length > 25) trailRef.current.shift();
      }
      // Draw + decay trail
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        const tr = trailRef.current[i];
        tr.life -= 0.025;
        if (tr.life <= 0) { trailRef.current.splice(i, 1); continue; }
        const trAlpha = tr.life * 0.15;
        const trSize = 2 * tr.life;
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, trSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 1, ${trAlpha})`;
        ctx.fill();
      }

      // ── Update & draw orbiting particles ──
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Advance orbit angle
        p.angle += p.angularSpeed;

        // Organic radius wobble
        const wobble = Math.sin(t * 0.01 * p.wobbleFreq + p.wobblePhase) * p.wobbleAmp;
        p.radius = p.baseRadius + wobble;

        // Pulsing size
        const pulse = Math.sin(t * p.pulseSpeed + p.pulsePhase);
        p.size = p.baseSize * (0.6 + 0.4 * (pulse * 0.5 + 0.5));
        p.alpha = p.baseAlpha * (0.5 + 0.5 * (pulse * 0.3 + 0.7));

        // Compute position (orbit around smoothed cursor)
        p.x = cx + Math.cos(p.angle) * p.radius;
        p.y = cy + Math.sin(p.angle) * p.radius;

        // Draw particle
        const { r, g, b } = p.color;
        ctx.globalAlpha = p.alpha;

        if (p.shape === 0) {
          // Glowing circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
          ctx.fill();
          // Soft glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.1})`;
          ctx.fill();
        } else {
          // Diamond
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle * 0.5);
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.4);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size * 1.4);
          ctx.lineTo(-p.size, 0);
          ctx.closePath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
          ctx.fill();
          ctx.restore();
        }
      }

      // ── Constellation lines between nearby particles ──
      ctx.globalAlpha = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const lineAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255, 200, 1, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // ── Center glow aura ──
      const glowPulse = 0.4 + Math.sin(t * 0.015) * 0.15;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      gradient.addColorStop(0, `rgba(255, 200, 1, ${glowPulse * 0.08})`);
      gradient.addColorStop(0.5, `rgba(17, 76, 90, ${glowPulse * 0.04})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9997]"
    />
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN CURSOR COMPONENT
// ═══════════════════════════════════════════════════════════

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const onMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  const onMouseLeave = useCallback(() => setIsVisible(false), []);
  const onMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const addHoverListeners = () => {
      document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
      ).forEach((el) => {
        el.addEventListener('mouseenter', () => { setCursorVariant('pointer'); setCursorText(''); });
        el.addEventListener('mouseleave', () => { setCursorVariant('default'); setCursorText(''); });
      });
      document.querySelectorAll('[data-cursor="view"], .case-study-row, .blog-card').forEach((el) => {
        el.addEventListener('mouseenter', () => { setCursorVariant('view'); setCursorText(el.getAttribute('data-cursor-text') || 'View'); });
        el.addEventListener('mouseleave', () => { setCursorVariant('default'); setCursorText(''); });
      });
      document.querySelectorAll('[data-cursor="play"]').forEach((el) => {
        el.addEventListener('mouseenter', () => { setCursorVariant('play'); setCursorText('Play'); });
        el.addEventListener('mouseleave', () => { setCursorVariant('default'); setCursorText(''); });
      });
      document.querySelectorAll('[data-cursor="drag"]').forEach((el) => {
        el.addEventListener('mouseenter', () => { setCursorVariant('drag'); setCursorText('Drag'); });
        el.addEventListener('mouseleave', () => { setCursorVariant('default'); setCursorText(''); });
      });
    };

    const observer = new MutationObserver(() => addHoverListeners());
    addHoverListeners();
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
    };
  }, [onMouseMove, onMouseLeave, onMouseEnter]);

  const variants = {
    default: {
      width: 36, height: 36,
      backgroundColor: 'transparent',
      border: '1.5px solid rgba(241, 246, 244, 0.3)',
      mixBlendMode: 'difference',
    },
    pointer: {
      width: 48, height: 48,
      backgroundColor: 'rgba(255, 200, 1, 0.15)',
      border: '1.5px solid rgba(255, 200, 1, 0.6)',
      mixBlendMode: 'normal',
    },
    view: {
      width: 80, height: 80,
      backgroundColor: 'rgba(255, 200, 1, 0.9)',
      border: 'none',
      mixBlendMode: 'normal',
    },
    play: {
      width: 80, height: 80,
      backgroundColor: 'rgba(241, 246, 244, 0.95)',
      border: 'none',
      mixBlendMode: 'normal',
    },
    drag: {
      width: 64, height: 64,
      backgroundColor: 'rgba(17, 76, 90, 0.8)',
      border: '1.5px solid rgba(241, 246, 244, 0.3)',
      mixBlendMode: 'normal',
    },
  };

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      <ParticleCanvas />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width: cursorVariant === 'default' ? 6 : 0,
            height: cursorVariant === 'default' ? 6 : 0,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="rounded-full bg-forsythia"
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center"
        animate={{ ...variants[cursorVariant], opacity: isVisible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5, opacity: { duration: 0.15 } }}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: cursorText ? 1 : 0, scale: cursorText ? 1 : 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="font-heading text-[10px] font-bold tracking-[0.15em] uppercase select-none"
          style={{ color: cursorVariant === 'view' || cursorVariant === 'play' ? '#172B36' : '#F1F6F4' }}
        >
          {cursorText}
        </motion.span>
      </motion.div>
    </>
  );
}
