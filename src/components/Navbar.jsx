import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BoltLogo, XMark } from './icons';

const navLinks = [
  { label: 'AI Strategy', href: '#strategy' },
  { label: 'Custom Agents', href: '#agents' },
  { label: 'Process Automation', href: '#product' },
  { label: 'Data Intelligence', href: '#stats' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-oceanic/80 backdrop-blur-xl border-b border-border/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <BoltLogo className="w-7 h-7 text-arctic-powder group-hover:text-forsythia transition-colors duration-300" />
          <span className="font-heading text-lg font-bold text-arctic-powder tracking-tight">
            armory
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className="relative px-4 py-2 text-sm text-text-muted hover:text-arctic-powder transition-colors duration-200 font-body group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-forsythia group-hover:w-3/4 transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
          id="nav-menu-toggle"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-[5px]">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-arctic-powder origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="block w-6 h-[2px] bg-arctic-powder"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-arctic-powder origin-center"
            />
          </div>
        </button>
      </div>

      {/* Mobile/Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-oceanic/95 backdrop-blur-xl border-t border-border/20"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-heading text-arctic-powder hover:text-forsythia transition-colors py-2"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
