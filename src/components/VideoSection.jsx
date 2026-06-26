import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

export default function VideoSection() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoClick = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <section className="relative py-4" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-xl overflow-hidden aspect-video border border-border/20 group"
          data-cursor="play"
          onClick={handleVideoClick}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            src="/demo.mp4"
            className="w-full h-full object-cover"
            playsInline
            loop
            onEnded={() => setIsPlaying(false)}
          />

          {/* Overlay — fades out when playing */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-oceanic/60 backdrop-blur-sm flex items-center justify-center"
              >
                {/* Dot pattern */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(rgba(241,246,244,0.03) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />

                {/* Corner brackets */}
                <div className="absolute top-6 left-6 w-8 h-8">
                  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-arctic-powder/30">
                    <path d="M2 12V2h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="absolute top-6 right-6 w-8 h-8">
                  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-arctic-powder/30">
                    <path d="M30 12V2H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="absolute bottom-6 left-6 w-8 h-8">
                  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-arctic-powder/30">
                    <path d="M2 20v10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="absolute bottom-6 right-6 w-8 h-8">
                  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-arctic-powder/30">
                    <path d="M30 20v10H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Play button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); handlePlay(); }}
                  className="relative z-10 border border-arctic-powder/30 hover:border-forsythia/50 rounded-lg px-8 py-4 font-heading text-xs tracking-[0.25em] uppercase text-arctic-powder hover:text-forsythia transition-all duration-300 flex items-center gap-4"
                  id="video-play"
                >
                  {/* Play triangle */}
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3l12 7-12 7V3z" />
                  </svg>
                  Play Video
                </motion.button>

                {/* Duration label */}
                <div className="absolute bottom-6 right-20 flex items-center gap-2 text-text-muted">
                  <span className="text-lg">⏱</span>
                  <span className="font-heading text-xs tracking-[0.15em]">2 Minutes Watch</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pause indicator — shown briefly when video is playing */}
          {isPlaying && (
            <div className="absolute top-6 left-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 rounded-lg bg-oceanic/60 backdrop-blur flex items-center justify-center">
                <svg className="w-4 h-4 text-arctic-powder" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              </div>
              <span className="font-heading text-[10px] tracking-[0.15em] uppercase text-arctic-powder/70">Pause</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
