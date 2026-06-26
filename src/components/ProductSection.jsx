import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { WavyLines, Search } from './icons';

export default function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="product" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <WavyLines className="w-5 h-5 text-text-muted" />
          <span className="font-heading text-xs tracking-[0.25em] uppercase text-text-muted">Our Product</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-body font-light text-arctic-powder leading-tight mb-16 max-w-lg"
        >
          Build logic at scale
        </motion.h2>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Top toolbar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-bg-card border border-border rounded-lg px-4 py-2">
              <span className="w-5 h-5 rounded bg-border/50 flex items-center justify-center text-xs text-text-muted">⊡</span>
              <span className="font-heading text-xs text-text-muted tracking-wide">LAYERS</span>
            </div>

            {/* AI model icons */}
            <div className="flex items-center gap-2">
              {['◎', '✳', '◆', '⊕', 'M', '+'].map((icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.15 }}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-sm text-text-muted hover:text-forsythia hover:border-forsythia/40 transition-all cursor-pointer"
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main product area */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-4">
            {/* Left sidebar - AUTO indicator */}
            <div className="hidden lg:flex flex-col items-start justify-end pb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 rounded-full border border-border flex items-center px-1">
                  <motion.div
                    animate={{ x: [0, 14, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-forsythia"
                  />
                </div>
                <span className="font-heading text-xs tracking-[0.2em] text-text-muted">AUTO</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
                    className="w-3 h-1 bg-forsythia/40 rounded"
                  />
                ))}
              </div>
            </div>

            {/* Center - 3D globe / sphere */}
            <div className="relative flex items-center justify-center min-h-[300px]">
              {/* Wireframe sphere CSS */}
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-48 h-48 md:w-64 md:h-64 relative"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '800px',
                }}
              >
                {/* Sphere rings */}
                {[0, 30, 60, 90, 120, 150].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border border-arctic-powder/10"
                    style={{
                      transform: `rotateY(${deg}deg)`,
                      transformStyle: 'preserve-3d',
                    }}
                  />
                ))}
                {[0, 30, 60, 90, 120, 150].map((deg, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute inset-0 rounded-full border border-arctic-powder/10"
                    style={{
                      transform: `rotateX(${deg}deg)`,
                      transformStyle: 'preserve-3d',
                    }}
                  />
                ))}
                {/* Center glow */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-nocturnal/20 to-forsythia/5 blur-xl" />
              </motion.div>

              {/* Connecting lines */}
              <div className="absolute top-4 left-4 right-4 bottom-4 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  <line x1="0" y1="150" x2="100" y2="150" stroke="rgba(241,246,244,0.05)" strokeWidth="1" />
                  <line x1="300" y1="150" x2="400" y2="150" stroke="rgba(241,246,244,0.05)" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="80" stroke="rgba(241,246,244,0.05)" strokeWidth="1" />
                  <line x1="200" y1="220" x2="200" y2="300" stroke="rgba(241,246,244,0.05)" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Right side - cursor/user indicator */}
            <div className="hidden lg:flex flex-col items-end justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-arctic-powder/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 3l14 9-7 2-3 7z"/>
                </svg>
                <span className="bg-bg-card border border-border rounded-full px-3 py-1 text-xs font-heading text-text-muted">You</span>
              </motion.div>
              {/* Vertical line */}
              <div className="w-px h-32 bg-gradient-to-b from-border to-transparent mt-4" />
            </div>
          </div>

          {/* Chat interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-bg-card/50 border border-border rounded-xl p-4"
          >
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Ask Daemon AI anything..."
                className="flex-1 bg-transparent text-text-muted font-heading text-sm placeholder:text-text-muted/40 outline-none tracking-wide"
                readOnly
                id="ai-chat-input"
              />
              <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-forsythia transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-3">
                <span className="text-text-muted/50 text-lg">+</span>
                <span className="flex items-center gap-1.5 text-xs font-heading text-text-muted tracking-wide">
                  <span className="text-text-muted/40">≡</span> Tools
                </span>
              </div>
              <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center">
                <span className="text-xs text-text-muted">◎</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
