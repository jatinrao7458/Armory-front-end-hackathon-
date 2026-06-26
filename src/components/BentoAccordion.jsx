import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { WavyLines, BoltLogo, Cube16Solid, Cog8Tooth, ArrowTrendingUp, ChartPie, LinkIcon } from './icons';

/*──────────────────────────────────────────────────────────────────────
 * BENTO-TO-ACCORDION WRAPPER WITH STATE PERSISTENCE
 * ─────────────────────────────────────────────────────────────────────
 * Desktop  → Modern Bento-Grid layout (hover to expand nodes)
 * Mobile   → Touch-optimized Accordion list
 *
 * CONTEXT LOCK CONSTRAINT:
 * If a user is actively hovering over a bento-node on desktop and
 * resizes past the mobile breakpoint, the active index is
 * programmatically transferred to the accordion state, ensuring
 * the corresponding panel opens smoothly on layout transition.
 *────────────────────────────────────────────────────────────────────*/

const MOBILE_BREAKPOINT = 768; // px

const FEATURES = [
  {
    id: 'neural-routing',
    title: 'Neural Routing',
    subtitle: 'Intelligent task orchestration',
    description: 'Route complex tasks through specialized AI agents automatically. Our neural router analyzes intent, context, and capability to direct each request to the optimal processing pipeline.',
    Icon: BoltLogo,
    gradient: 'from-forsythia/15 to-deep-saffron/5',
    accentColor: 'text-forsythia',
    stats: { label: 'Routing Accuracy', value: '99.7%' },
    gridArea: 'span 2 / span 2',
  },
  {
    id: 'context-memory',
    title: 'Context Memory',
    subtitle: 'Persistent intelligence',
    description: 'Agents retain and recall contextual information across sessions. Long-term memory graphs ensure continuity and deeper understanding with every interaction.',
    Icon: Cube16Solid,
    gradient: 'from-nocturnal/20 to-transparent',
    accentColor: 'text-mystic-mint',
    stats: { label: 'Recall Depth', value: '10K tokens' },
    gridArea: 'span 1 / span 1',
  },
  {
    id: 'secure-sandbox',
    title: 'Secure Sandbox',
    subtitle: 'Isolated execution',
    description: 'Every agent runs inside a hardened sandbox with zero-trust networking. Your data never leaves your perimeter — guaranteed by design, not policy.',
    Icon: Cog8Tooth,
    gradient: 'from-nocturnal/15 to-transparent',
    accentColor: 'text-arctic-powder',
    stats: { label: 'Uptime SLA', value: '99.99%' },
    gridArea: 'span 1 / span 1',
  },
  {
    id: 'multi-model',
    title: 'Multi-Model Fusion',
    subtitle: 'Best-of-breed AI',
    description: 'Combine outputs from multiple foundation models — GPT, Claude, Gemini, Llama — and fuse them through ensemble scoring to produce superior results.',
    Icon: ArrowTrendingUp,
    gradient: 'from-deep-saffron/10 to-forsythia/5',
    accentColor: 'text-deep-saffron',
    stats: { label: 'Models Supported', value: '14+' },
    gridArea: 'span 1 / span 2',
  },
  {
    id: 'real-time-analytics',
    title: 'Real-Time Analytics',
    subtitle: 'Live intelligence feeds',
    description: 'Monitor agent performance, token usage, latency distributions, and error rates in real time. Custom alerting rules trigger before issues become incidents.',
    Icon: ChartPie,
    gradient: 'from-nocturnal/20 to-nocturnal/5',
    accentColor: 'text-forsythia',
    stats: { label: 'Latency P99', value: '<50ms' },
    gridArea: 'span 1 / span 1',
  },
  {
    id: 'workflow-builder',
    title: 'Workflow Builder',
    subtitle: 'Visual agent pipelines',
    description: 'Drag-and-drop workflow editor for composing multi-step agent pipelines. Connect data sources, processing nodes, and output channels without writing code.',
    Icon: LinkIcon,
    gradient: 'from-forsythia/10 to-transparent',
    accentColor: 'text-forsythia',
    stats: { label: 'Avg Build Time', value: '< 5 min' },
    gridArea: 'span 1 / span 1',
  },
];

/**
 * Custom hook to track viewport width and detect mobile/desktop.
 * Returns { isMobile, width }
 */
function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    let rafId;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setWidth(window.innerWidth);
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    isMobile: width < MOBILE_BREAKPOINT,
    width,
  };
}

/* ═══════════════════════════════════════════════════════════════════
 *  BENTO NODE (DESKTOP)
 * ═══════════════════════════════════════════════════════════════════ */
function BentoNode({ feature, index, activeIndex, setActiveIndex, isInView }) {
  const isActive = activeIndex === index;
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.15 + index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        layout: { type: 'spring', stiffness: 200, damping: 25 },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setActiveIndex(index); setIsHovered(true); }}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => { setActiveIndex(index); }}
      className={`
        relative rounded-xl overflow-hidden transition-all duration-300 p-6 md:p-8
        border cursor-pointer group select-none
        ${isActive
          ? 'border-forsythia/40 bg-gradient-to-br ' + feature.gradient + ' shadow-[0_0_40px_rgba(255,200,1,0.06)]'
          : 'border-border/20 bg-bg-card/20 hover:border-border/40'
        }
      `}
      style={{
        gridRow: feature.gridArea.split('/')[0].trim(),
        gridColumn: feature.gridArea.split('/')[1].trim(),
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      data-cursor="view"
      data-cursor-text="Explore"
      id={`bento-${feature.id}`}
    >
      {/* Dynamic Hover Spotlight Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl z-0"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 200, 1, 0.07), transparent 80%)`,
          }}
        />
      )}

      {/* Content wrapper with relative z-indexing to stack on top of the hover glow */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Icon + Title Row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ scale: isActive ? 1.15 : 1, rotate: isActive ? 8 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={`${feature.accentColor}`}
              >
                <feature.Icon className="w-6 h-6" />
              </motion.span>
              <div>
                <h3 className={`font-heading text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-300
                  ${isActive ? 'text-arctic-powder' : 'text-arctic-powder/70'}`}>
                  {feature.title}
                </h3>
                <p className="font-heading text-[10px] tracking-[0.1em] text-text-muted mt-0.5">
                  {feature.subtitle}
                </p>
              </div>
            </div>

            {/* Active indicator */}
            <motion.div
              animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-2 h-2 rounded-full bg-forsythia flex-shrink-0 mt-1"
            />
          </div>

          {/* Description — expands on hover/active */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm text-arctic-powder/70 font-body leading-relaxed mb-5">
                  {feature.description}
                </p>

                {/* Stat chip */}
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 bg-bg-darker/40 border border-border/20 rounded-lg px-3 py-1.5">
                    <span className={`text-xs font-heading tracking-wide ${feature.accentColor}`}>
                      {feature.stats.value}
                    </span>
                    <span className="text-[10px] font-heading text-text-muted tracking-[0.1em]">
                      {feature.stats.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-forsythia/60 via-deep-saffron/40 to-transparent origin-left z-20"
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  ACCORDION PANEL (MOBILE)
 * ═══════════════════════════════════════════════════════════════════ */
function AccordionPanel({ feature, index, activeIndex, setActiveIndex, isInView }) {
  const isOpen = activeIndex === index;

  const togglePanel = () => {
    setActiveIndex(isOpen ? -1 : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.06 }}
      className={`border-b transition-colors duration-300
        ${isOpen ? 'border-forsythia/30' : 'border-border/20'}`}
    >
      {/* Header — always visible */}
      <button
        onClick={togglePanel}
        className="w-full flex items-center justify-between py-5 px-4 text-left group"
        aria-expanded={isOpen}
        id={`accordion-${feature.id}`}
      >
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ rotate: isOpen ? 12 : 0, scale: isOpen ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className={`${isOpen ? feature.accentColor : 'text-text-muted'}`}
          >
            <feature.Icon className="w-5 h-5" />
          </motion.span>
          <div>
            <span className={`font-heading text-xs tracking-[0.15em] uppercase font-medium block transition-colors
              ${isOpen ? 'text-arctic-powder' : 'text-arctic-powder/60'}`}>
              {feature.title}
            </span>
            <span className="font-heading text-[10px] tracking-[0.1em] text-text-muted">
              {feature.subtitle}
            </span>
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-6 h-6 rounded-full border border-border/30 flex items-center justify-center flex-shrink-0"
        >
          <svg className={`w-3 h-3 transition-colors ${isOpen ? 'text-forsythia' : 'text-text-muted'}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`content-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: 'spring', stiffness: 200, damping: 25 },
              opacity: { duration: 0.25 },
            }}
            className="overflow-hidden"
          >
            <div className={`px-4 pb-6 pt-1 bg-gradient-to-b ${feature.gradient} rounded-b-lg mx-2 mb-2`}>
              <p className="text-sm text-arctic-powder/70 font-body leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Stat chip */}
              <div className="inline-flex items-center gap-2 bg-bg-darker/40 border border-border/20 rounded-lg px-3 py-2">
                <span className={`text-sm font-heading tracking-wide font-medium ${feature.accentColor}`}>
                  {feature.stats.value}
                </span>
                <span className="text-[10px] font-heading text-text-muted tracking-[0.1em] uppercase">
                  {feature.stats.label}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  MAIN WRAPPER — BENTO ↔ ACCORDION WITH CONTEXT LOCK
 * ═══════════════════════════════════════════════════════════════════ */
export default function BentoAccordion() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { isMobile } = useViewport();

  /*
   * STATE PERSISTENCE — The Context Lock
   * A single activeIndex is shared between Bento and Accordion.
   * When the viewport crosses the breakpoint, the same index
   * is preserved so the user's context isn't lost.
   */
  const [activeIndex, setActiveIndex] = useState(0);
  const prevMobileRef = useRef(isMobile);

  // Context Lock: persist active index across layout transitions
  useEffect(() => {
    const wasMobile = prevMobileRef.current;
    const nowMobile = isMobile;

    if (wasMobile !== nowMobile) {
      // Viewport crossed the breakpoint — carry state over.
      // activeIndex is already shared, so we just need to ensure
      // the accordion opens the right panel.
      // If activeIndex is -1 (nothing open) on accordion, set to 0.
      if (nowMobile && activeIndex === -1) {
        setActiveIndex(0);
      }
      prevMobileRef.current = nowMobile;
    }
  }, [isMobile, activeIndex]);

  // On desktop, if mouse leaves the grid, keep last active
  const handleGridLeave = useCallback(() => {
    // Don't reset — preserve last hovered context for the lock
  }, []);

  return (
    <section id="bento-features" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-nocturnal/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <WavyLines className="w-5 h-5 text-text-muted" />
          <span className="font-heading text-xs tracking-[0.25em] uppercase text-text-muted">Core Features</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-body font-light text-arctic-powder leading-tight mb-4 max-w-xl"
        >
          Infrastructure that thinks
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="text-base text-text-muted font-body max-w-xl leading-relaxed mb-14"
        >
          Six foundational capabilities that power every Armory deployment — from routing to real-time observability.
        </motion.p>

        {/* Layout mode indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-8"
        >
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isMobile ? 'bg-text-muted' : 'bg-forsythia'}`} />
          <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-text-muted/60">
            {isMobile ? 'Accordion View' : 'Bento Grid View'}
          </span>
          <span className="font-heading text-[10px] tracking-[0.15em] text-text-muted/30 ml-2">
            Active: {activeIndex >= 0 ? FEATURES[activeIndex]?.title : 'None'}
          </span>
        </motion.div>

        {/* ── DESKTOP: BENTO GRID ── */}
        {!isMobile && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onMouseLeave={handleGridLeave}
            className="grid grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4"
          >
            {FEATURES.map((feature, i) => (
              <BentoNode
                key={feature.id}
                feature={feature}
                index={i}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                isInView={isInView}
              />
            ))}
          </motion.div>
        )}

        {/* ── MOBILE: ACCORDION ── */}
        {isMobile && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="border-t border-border/20"
          >
            {FEATURES.map((feature, i) => (
              <AccordionPanel
                key={feature.id}
                feature={feature}
                index={i}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                isInView={isInView}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
