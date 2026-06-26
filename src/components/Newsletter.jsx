import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-arctic-powder leading-tight mb-4 max-w-lg"
        >
          Stay ahead of AI systems
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-base text-text-muted font-body max-w-xl leading-relaxed mb-8"
        >
          Weekly insights on automation, AI workflows, and real builds. No fluff, just what works.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch gap-0 max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="jane@framer.com"
            className="flex-1 bg-bg-card/50 border border-border/40 border-r-0 rounded-l-lg px-5 py-3.5 text-sm font-body text-arctic-powder placeholder:text-text-muted/40 outline-none focus:border-forsythia/40 transition-colors"
            id="newsletter-email"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex items-center gap-2 bg-bg-card border border-border/40 hover:border-forsythia/40 rounded-r-lg px-6 py-3.5 font-heading text-xs tracking-wide text-arctic-powder hover:text-forsythia transition-all"
            id="newsletter-submit"
          >
            <span className="w-5 h-5 rounded border border-arctic-powder/20 flex items-center justify-center text-[10px]">⊞</span>
            Subscribe
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
