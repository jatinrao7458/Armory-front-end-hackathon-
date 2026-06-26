import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="4" y="4" width="32" height="32" rx="2" className="stroke-arctic-powder/30"/>
        <path d="M12 12h16v16H12z" className="stroke-arctic-powder/50"/>
        <path d="M8 8h8v8H8zM24 8h8v8h-8zM8 24h8v8H8zM24 24h8v8h-8z" className="stroke-arctic-powder/20"/>
        <circle cx="20" cy="20" r="2" className="fill-forsythia"/>
      </svg>
    ),
    title: 'Infinite Visual\nCanvas',
    description: 'Map out multi-step agent behaviors on a high-precision grid. Drag and drop triggers, logic gates, and actions to craft custom paths.',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M20 4v32M4 20h32" className="stroke-arctic-powder/20"/>
        <path d="M10 10l20 20M30 10L10 30" className="stroke-arctic-powder/20"/>
        <circle cx="20" cy="20" r="10" className="stroke-arctic-powder/40"/>
        <circle cx="20" cy="20" r="4" className="stroke-forsythia"/>
        <path d="M20 16v8M16 20h8" className="stroke-forsythia/60" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Autonomous\nExecution',
    description: 'Run complex decision trees without manual intervention. Our engine handles conditional branching and error recovery automatically.',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="6" y="6" width="28" height="28" rx="4" className="stroke-arctic-powder/30"/>
        <rect x="10" y="10" width="20" height="20" rx="2" className="stroke-arctic-powder/20"/>
        <path d="M14 20h12" className="stroke-forsythia" strokeWidth="1.5"/>
        <circle cx="20" cy="20" r="6" className="stroke-arctic-powder/40" strokeDasharray="3 3"/>
        <path d="M6 6l4 4M34 6l-4 4M6 34l4-4M34 34l-4-4" className="stroke-arctic-powder/15"/>
      </svg>
    ),
    title: 'End-to-End\nEncryption',
    description: 'Every node and data transfer is shielded by industrial-grade security. Maintain total control over your organizational data flow.',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M8 32l8-12 8 8 8-16" className="stroke-forsythia" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="4" y="4" width="32" height="32" rx="2" className="stroke-arctic-powder/30"/>
        <path d="M4 28h32M12 4v32M20 4v32M28 4v32" className="stroke-arctic-powder/10"/>
        <circle cx="16" cy="20" r="2" className="fill-forsythia/60"/>
        <circle cx="24" cy="16" r="2" className="fill-forsythia/60"/>
        <circle cx="32" cy="12" r="2" className="fill-forsythia/60"/>
      </svg>
    ),
    title: 'Production-\nReady Stack',
    description: 'Connect core business platforms and internal services through secure, ready integrations that scale with your volume.',
  },
];

export default function FeaturesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-16 md:py-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/20 rounded-xl overflow-hidden">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="bg-oceanic p-8 group cursor-default hover:bg-bg-card transition-colors duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-6 text-arctic-powder"
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-heading text-base font-medium text-arctic-powder mb-3 leading-snug tracking-wide whitespace-pre-line">
                {feature.title}
              </h3>
              <p className="text-sm text-text-muted font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
