import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { WavyLines, ArrowTrendingUp } from './icons';

function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value);
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* Corner bracket decoration SVG */
function CornerBracket({ position = 'top-right' }) {
  const classes = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0 rotate-[-90deg]',
    'bottom-right': 'bottom-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 rotate-180',
  };
  return (
    <svg className={`absolute ${classes[position]} w-6 h-6 text-border`} viewBox="0 0 24 24" fill="none">
      <path d="M8 2H2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(14, 0)" />
    </svg>
  );
}

const stats = [
  { value: '12', suffix: 'ms', label: 'Average latency for real-time inference.' },
  { value: '10', suffix: 'x', label: 'Increase in manual task processing speed.' },
  { value: '99', suffix: '%', label: 'Uptime for critical agent infrastructure.' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stats" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-6"
        >
          <WavyLines className="w-5 h-5 text-text-muted" />
          <span className="font-heading text-xs tracking-[0.25em] uppercase text-text-muted">Statistics</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-2xl md:text-3xl font-body font-light text-arctic-powder max-w-2xl leading-snug mb-6"
        >
          Quantifiable impact across every deployment. We measure success by the speed and scale of your neural ops.
        </motion.h2>

        {/* CTA */}
        <motion.a
          href="#product"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 border border-arctic-powder/20 hover:border-forsythia/40 text-arctic-powder px-5 py-2.5 rounded-lg font-heading text-xs tracking-wide transition-all duration-300 mb-14"
          id="stats-cta"
        >
          <ArrowTrendingUp className="w-4 h-4" />
          View Report
        </motion.a>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-oceanic p-8 md:p-10 group"
            >
              <CornerBracket position="top-right" />

              <h3 className="text-5xl md:text-6xl font-heading font-light text-arctic-powder mb-4 tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm font-heading text-text-muted leading-relaxed tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
