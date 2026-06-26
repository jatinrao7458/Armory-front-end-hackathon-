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
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'coffee') {
      root.setAttribute('data-theme', 'coffee');
      localStorage.setItem('theme', 'coffee');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

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

        {/* Actions Row (Theme Toggle + Hamburger Menu) */}
        <div className="flex items-center gap-4">
          {/* Theme switcher */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'coffee' : 'dark')}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors text-arctic-powder hover:text-forsythia"
            title={`Switch to ${theme === 'dark' ? 'Coffee Beige' : 'Oceanic Dark'} theme`}
            id="theme-switcher"
            data-cursor="pointer"
          >
            {theme === 'dark' ? (
              // Light bulb or coffee cup styled SVG
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              // Sparkles/moon/star icon for dark mode
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            id="nav-menu-toggle"
            aria-label="Toggle menu"
            data-cursor="pointer"
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
