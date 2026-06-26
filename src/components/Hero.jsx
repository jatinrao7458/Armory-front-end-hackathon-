import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BoltLogo } from './icons';

const brands = ['Aetna', 'Cigna', 'Anthem', 'Kaiser', 'Humana', 'UnitedHealth'];

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="hero" className="relative min-h-[100svh] md:min-h-screen flex flex-col justify-end pb-16 md:pb-20 pt-20 md:pt-24 overflow-hidden" ref={ref}>
      {/* Interlocking Gears Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-20">
        {/* Large Gold Gear */}
        <div className="hidden md:block absolute top-[10%] -right-[200px] w-[500px] h-[500px] md:w-[700px] md:h-[700px] mix-blend-screen animate-spin-slow-cw">
          <img
            src="/images/gear_gold.png"
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Medium Teal Gear (Interlocking with Gold Gear) */}
        <div className="hidden md:block absolute top-[35%] -right-[80px] w-[350px] h-[350px] md:w-[500px] md:h-[500px] mix-blend-screen animate-spin-slow-ccw">
          <img
            src="/images/gear_teal.png"
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Background gradient overlay to blend it in */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-darker/60 via-oceanic/40 to-oceanic transition-colors duration-500" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 md:opacity-25 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(17,76,90,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(17,76,90,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glowing orb */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden md:block absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-nocturnal/30 blur-[120px]"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 w-full">
        {/* Nav links - right side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-body font-light leading-[0.95] tracking-tight text-arctic-powder mb-6"
        >
          {['AI Strategy', 'Custom Agents', 'Process Automation', 'Data Intelligence'].map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-xl md:text-2xl font-body text-arctic-powder/80 hover:text-forsythia transition-colors cursor-pointer"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        {/* Brand logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16 overflow-hidden"
        >
          <div className="hidden md:flex items-center gap-16 justify-end pr-10">
            {brands.slice(0, 3).map((brand, i) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 0.5, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-sm font-heading tracking-[0.2em] uppercase text-arctic-powder/50 hover:text-arctic-powder/80 transition-colors cursor-default"
              >
                ♦ {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Main content */}
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-body font-light leading-[0.95] tracking-tight text-arctic-powder mb-6"
          >
            Power your{" "}
            <br />
            future with <span className="text-forsythia">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base md:text-lg text-text-muted font-body leading-relaxed mb-8 max-w-lg"
          >
            Deploy custom enterprise agents and automate complex workflows.
            Scale your intelligence with Armory today.
          </motion.p>

          <motion.a
            href="#product"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-transparent border border-arctic-powder/30 hover:border-forsythia/60 text-arctic-powder px-6 py-3 rounded-lg font-heading text-sm tracking-wide transition-all duration-300 group"
            id="hero-cta"
          >
            <span className="w-8 h-8 rounded border border-arctic-powder/20 flex items-center justify-center group-hover:border-forsythia/40 transition-colors">
              <BoltLogo className="w-4 h-4" />
            </span>
            Build A Workflow
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-arctic-powder/20 flex justify-center pt-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-forsythia/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
