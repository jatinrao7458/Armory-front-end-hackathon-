import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Search, ChartPie, ArrowTrendingUp, ArrowPath } from './icons';

const tabs = [
  {
    id: 'discovery',
    label: 'Discovery',
    Icon: Search,
    title: 'Discover patterns in your enterprise data',
    description: 'Our AI agents scan, classify, and map your organizational data landscape. Identify hidden inefficiencies and untapped automation opportunities across every department.',
    visual: 'from-nocturnal/30 to-forsythia/5',
  },
  {
    id: 'analysis',
    label: 'Analysis',
    Icon: ChartPie,
    title: 'Evaluate agent performance with surgical precision',
    description: 'Get real-time scoring on accuracy, safety, and contextual relevance. Quantify every interaction for total quality.',
    visual: 'from-forsythia/10 to-deep-saffron/5',
  },
  {
    id: 'training',
    label: 'Training',
    Icon: ArrowTrendingUp,
    title: 'Fine-tune models on your proprietary datasets',
    description: 'Train domain-specific agents that understand your industry terminology, compliance requirements, and operational nuances.',
    visual: 'from-deep-saffron/10 to-nocturnal/20',
  },
  {
    id: 'deploy',
    label: 'Deploy',
    Icon: ArrowPath,
    title: 'Ship production-ready agents in minutes',
    description: 'One-click deployment to any cloud infrastructure. Auto-scaling, monitoring, and rollback capabilities built into every release pipeline.',
    visual: 'from-nocturnal/20 to-forsythia/10',
  },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-16 md:py-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Descriptive text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-base text-text-muted font-body max-w-3xl leading-relaxed mb-10"
        >
          Go beyond simple chat interfaces. Armory provides the underlying architecture to build, test, and scale enterprise-grade agents.
        </motion.p>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap border-b border-border/30 mb-0 relative"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`relative flex items-center gap-2 px-6 py-4 font-heading text-xs tracking-[0.2em] uppercase transition-colors duration-300
                ${activeTab === i ? 'text-arctic-powder' : 'text-text-muted hover:text-arctic-powder/70'}`}
              id={`tab-${tab.id}`}
              data-cursor="pointer"
            >
              <span className={`transition-colors duration-300 ${activeTab === i ? 'text-forsythia' : ''}`}>
                <tab.Icon className="w-4 h-4" />
              </span>
              {tab.label}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-forsythia"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-0 bg-gradient-to-br ${tabs[activeTab].visual} rounded-b-xl overflow-hidden min-h-[350px]`}
          >
            {/* Visual side */}
            <div className="relative flex items-center justify-center p-10 min-h-[250px]">
              {/* Mockup card */}
              <div className="w-full max-w-sm bg-bg-darker/60 backdrop-blur border border-border/30 rounded-xl overflow-hidden shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/20">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-arctic-powder/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-arctic-powder/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-arctic-powder/20" />
                  </div>
                  <Search className="w-4 h-4 text-text-muted/40" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-body text-arctic-powder">Your score</span>
                    <span className="text-forsythia text-sm">★★★★★</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-forsythia">✓</span>
                    <div className="flex-1 h-2 bg-bg-card rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '72%' }}
                        transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-forsythia to-deep-saffron rounded-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['9/10', '8/10', '100%', '8.5'].map((val) => (
                      <div key={val} className="bg-bg-card rounded-lg p-3 text-center">
                        <span className="text-sm font-heading text-arctic-powder">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="flex flex-col justify-center p-10 lg:p-14">
              <h3 className="text-2xl md:text-3xl font-body font-light text-arctic-powder mb-4 leading-snug">
                {tabs[activeTab].title}
              </h3>
              <p className="text-sm text-text-muted font-body leading-relaxed mb-6">
                {tabs[activeTab].description}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-forsythia">✓</span>
                <span className="font-heading text-xs tracking-[0.2em] uppercase text-text-muted">Score Metrics</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
