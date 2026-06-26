import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { WavyLines } from './icons';

const cases = [
  {
    year: '//2026',
    brand: 'Cigna',
    title: 'Cigna Smart Health Systems',
    description: 'Revolutionizing patient care through predictive analytics and seamless AI-driven diagnostic integration tools.',
    image: '/images/case_cigna.png',
    color: 'from-nocturnal/20 to-transparent',
  },
  {
    year: '//2026',
    brand: 'Aetna',
    title: 'Aetna Health Data Ecosystem',
    description: "We automated Aetna's member data management using secure AI to provide personalized care and clinical insights.",
    image: '/images/case_aetna.png',
    color: 'from-forsythia/10 to-deep-saffron/5',
  },
  {
    year: '//2026',
    brand: 'Anthem',
    title: 'Anthem Neural Care Network',
    description: "We deployed a custom LLM to automate Anthem's provider relations, reducing ticket latency by eighty-five percent.",
    image: '/images/case_anthem.png',
    color: 'from-deep-saffron/10 to-transparent',
  },
];

function CaseRow({ c, i, isInView }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="case-study-row relative group grid grid-cols-1 md:grid-cols-[200px_1fr_200px_auto] gap-4 md:gap-8 items-center py-8 md:py-10 border-b border-oceanic/10 cursor-pointer px-4 -mx-4 rounded-lg overflow-hidden"
      data-cursor="view"
      data-cursor-text="View"
    >
      {/* Full-width background image — revealed on hover with clip-path transition */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            exit={{ clipPath: 'inset(0 0 0 100%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
          >
            <img
              src={c.image}
              alt={c.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-oceanic/80 via-oceanic/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand logo area */}
      <div className="relative z-10 flex items-center gap-4">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-oceanic/5 flex items-center justify-center overflow-hidden"
        >
          {isHovered ? (
            <motion.img
              src={c.image}
              alt={c.brand}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="font-heading text-sm text-oceanic/70 font-bold tracking-wide">{c.brand}</span>
          )}
        </motion.div>
      </div>

      {/* Year */}
      <div className="relative z-10 md:order-first">
        <span className={`font-heading text-xs tracking-widest transition-colors duration-300 ${isHovered ? 'text-arctic-powder/80' : 'text-oceanic/40'}`}>
          {c.year}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 md:col-span-1">
        <h3 className={`text-xl md:text-2xl font-body font-medium mb-2 transition-colors duration-300 ${isHovered ? 'text-arctic-powder' : 'text-oceanic'}`}>
          {c.title}
        </h3>
        <p className={`text-sm font-heading leading-relaxed tracking-wide transition-colors duration-300 ${isHovered ? 'text-arctic-powder/70' : 'text-oceanic/50'}`}>
          {c.description}
        </p>
      </div>

      {/* Arrow with slide animation */}
      <div className="relative z-10 flex items-center justify-end">
        <motion.div
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <span className={`text-2xl transition-colors duration-300 font-body ${isHovered ? 'text-forsythia' : 'text-oceanic/30'}`}>
            &#x27A9;&#x27A9;
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="cases" className="relative py-24 md:py-32 bg-arctic-powder" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <WavyLines className="w-5 h-5 text-oceanic/40" />
          <span className="font-heading text-xs tracking-[0.25em] uppercase text-oceanic/50">Case Studies</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-body font-light text-oceanic leading-tight mb-4 max-w-xl"
        >
          Proven neural solutions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-base text-oceanic/60 font-body max-w-xl mb-14 leading-relaxed"
        >
          We partner with industry leaders to deploy bespoke AI agents that solve complex operational hurdles and drive measurable growth.
        </motion.p>

        {/* Case study rows */}
        <div className="border-t border-oceanic/10">
          {cases.map((c, i) => (
            <CaseRow key={c.title} c={c} i={i} isInView={isInView} />
          ))}
        </div>

        {/* More Projects CTA */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.03 }}
          className="inline-flex items-center gap-3 bg-oceanic text-arctic-powder px-6 py-3 rounded-lg font-heading text-xs tracking-wide mt-10 hover:bg-nocturnal transition-colors"
          id="cases-cta"
        >
          <span className="w-6 h-6 rounded border border-arctic-powder/20 flex items-center justify-center text-xs">⊞</span>
          More Projects
        </motion.a>
      </div>
    </section>
  );
}
