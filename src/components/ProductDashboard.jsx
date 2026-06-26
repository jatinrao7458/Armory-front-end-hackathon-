import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { WavyLines } from './icons';

function GaugeMeter({ value, label, size = 140 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const timer = setInterval(() => {
      start += value / 60;
      if (start >= value) {
        setAnimatedValue(value);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  const angle = (animatedValue / 100) * 270 - 135;
  const r = size / 2 - 10;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background arc */}
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(42,74,86,0.3)" strokeWidth="4"
          strokeDasharray={`${2 * Math.PI * r * 0.75} ${2 * Math.PI * r * 0.25}`}
          strokeDashoffset={2 * Math.PI * r * 0.125}
          strokeLinecap="round"
        />
        {/* Tick marks */}
        {[...Array(24)].map((_, i) => {
          const a = (i / 24) * 270 - 135;
          const rad = (a * Math.PI) / 180;
          const x1 = size/2 + (r - 6) * Math.cos(rad);
          const y1 = size/2 + (r - 6) * Math.sin(rad);
          const x2 = size/2 + (r + 2) * Math.cos(rad);
          const y2 = size/2 + (r + 2) * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(241,246,244,0.15)" strokeWidth="1" />;
        })}
        {/* Needle */}
        <line
          x1={size/2} y1={size/2}
          x2={size/2 + (r - 20) * Math.cos((angle * Math.PI) / 180)}
          y2={size/2 + (r - 20) * Math.sin((angle * Math.PI) / 180)}
          stroke="#FFC801" strokeWidth="2" strokeLinecap="round"
        />
        <circle cx={size/2} cy={size/2} r="4" fill="#FFC801" />
      </svg>
      <span className="font-heading text-xs text-text-muted tracking-[0.2em] uppercase">{label}</span>
    </div>
  );
}

function BarChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const bars = [40, 65, 50, 80, 60, 90, 70, 85];

  return (
    <div ref={ref} className="flex items-end gap-2 h-32">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={isInView ? { height: `${h}%` } : {}}
          transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 bg-gradient-to-t from-nocturnal/60 to-nocturnal/20 rounded-t border-t border-forsythia/30"
        />
      ))}
    </div>
  );
}

function LineChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative h-32 mt-6">
      <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 30, 60, 90, 120].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(42,74,86,0.2)" strokeWidth="0.5" />
        ))}
        {[0, 80, 160, 240, 320, 400].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="rgba(42,74,86,0.2)" strokeWidth="0.5" />
        ))}
        {/* Line */}
        <motion.path
          d="M0,100 C40,95 80,80 120,70 S200,55 240,40 S320,30 360,25 L400,20"
          fill="none"
          stroke="#F1F6F4"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

export default function ProductDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-16 md:py-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-10"
        >
          <WavyLines className="w-5 h-5 text-text-muted" />
          <span className="font-heading text-xs tracking-[0.25em] uppercase text-text-muted">Product Statistics</span>
        </motion.div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Gauges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="bg-bg-card/30 border border-border/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <GaugeMeter value={60} label="Cache" size={120} />
              <div className="text-center">
                <span className="text-4xl font-heading text-arctic-powder font-light">15</span>
                <p className="text-xs font-heading text-text-muted tracking-wide mt-1">Core Systems</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-heading text-forsythia">6M</span>
              <span className="text-xs font-heading text-text-muted tracking-wide">UPTIME</span>
            </div>
          </motion.div>

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-bg-card/30 border border-border/30 rounded-xl p-6"
          >
            <BarChart />
            <div className="w-full h-px bg-forsythia/30 mt-2 mb-4" />
          </motion.div>

          {/* Stats numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-bg-card/30 border border-border/30 rounded-xl p-6 flex flex-col justify-between"
          >
            <GaugeMeter value={85} label="Active Nodes" size={120} />
            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-2xl font-heading text-arctic-powder">152</span>
                <p className="text-xs font-heading text-text-muted tracking-[0.15em] mt-1">TOTAL QUERIES</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-heading text-arctic-powder">115</span>
                <p className="text-xs font-heading text-text-muted tracking-[0.15em] mt-1">ACTIVE NODES</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Growth vector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-4 bg-bg-card/30 border border-border/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-arctic-powder/10 flex items-center justify-center text-sm font-bold text-arctic-powder">𝕏</div>
              <div>
                <span className="font-body font-medium text-arctic-powder">Growth Vector</span>
                <span className="ml-4 text-sm font-heading text-forsythia">99.98%</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-text-muted font-body mt-1">Efficiency gains over 30 days</p>

          <div className="flex items-end justify-between mt-4">
            <div>
              <span className="text-5xl md:text-6xl font-heading font-light text-arctic-powder">82%</span>
              <p className="text-xs font-heading text-text-muted tracking-[0.2em] mt-1">NET GROWTH</p>
            </div>
          </div>

          <LineChart />

          <div className="flex items-center justify-between mt-6">
            <p className="text-xs font-heading text-text-muted leading-relaxed tracking-wide">
              Optimizing neural<br/>weights for output.
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 border border-arctic-powder/20 hover:border-forsythia/40 text-arctic-powder px-5 py-2.5 rounded-lg font-heading text-xs tracking-wide transition-all duration-300"
              id="dashboard-cta"
            >
              <span className="w-5 h-5 rounded border border-arctic-powder/20 flex items-center justify-center text-[10px]">⊞</span>
              Request Demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
