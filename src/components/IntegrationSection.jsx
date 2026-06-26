import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowPath, Cog8Tooth, Cube16Solid, ChartPie } from './icons';

const icons = [
  { Icon: ArrowPath, label: 'Sync' },
  { Icon: Cube16Solid, label: 'Models' },
  { Icon: Cog8Tooth, label: 'Configure' },
  { Icon: ChartPie, label: 'Analyze' },
];

export default function IntegrationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="strategy" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Integration icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          {icons.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-forsythia hover:border-forsythia/40 transition-all duration-300 cursor-default"
            >
              <Icon className="w-5 h-5" />
            </motion.div>
          ))}
        </motion.div>

        {/* Large reveal text */}
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-body font-light leading-tight text-arctic-powder mb-2"
          >
            Integrate with the world's most powerful neural engines.{' '}
            <span className="text-text-muted">
              Seamlessly connect your custom data to GPT-4, Claude 3, and Perplexity for unmatched precision. Build agents that don't just process, they understand.
            </span>
          </motion.h2>
        </div>

        {/* Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 text-base text-text-muted font-body max-w-2xl leading-relaxed"
        >
          Unlock the full potential of LLM-native workflows. Our infrastructure ensures low latency and high-fidelity output for every request.
        </motion.p>
      </div>
    </section>
  );
}
