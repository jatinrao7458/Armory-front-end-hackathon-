import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BoltLogo } from './icons';

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Projects', href: '#cases' },
  { label: 'Articles', href: '#blog' },
];

const company = [
  { label: 'About Us', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Book A Call', href: '#' },
  { label: 'More Templates', href: '#' },
];

const policies = [
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

const socials = [
  { label: '𝕏', href: '#' },
  { label: 'in', href: '#' },
  { label: '▶', href: '#' },
  { label: '◻', href: '#' },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer className="relative pt-20 pb-0 overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[200px_1fr_1fr_1fr] gap-10 md:gap-12 mb-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <BoltLogo className="w-24 h-24 md:w-32 md:h-32 text-arctic-powder" />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-heading text-xs tracking-[0.25em] uppercase text-text-muted mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-body text-arctic-powder/70 hover:text-forsythia transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-heading text-xs tracking-[0.25em] uppercase text-text-muted mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-body text-arctic-powder/70 hover:text-forsythia transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-heading text-xs tracking-[0.25em] uppercase text-text-muted mb-6">Policies</h4>
            <ul className="space-y-3">
              {policies.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-body text-arctic-powder/70 hover:text-forsythia transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-8">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-sm text-text-muted hover:text-forsythia hover:border-forsythia/40 transition-all"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Giant brand name */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative w-full overflow-hidden mt-8"
      >
        <h2
          className="font-body font-black text-[18vw] sm:text-[14vw] md:text-[12vw] leading-none text-transparent tracking-tighter select-none pb-0"
          style={{
            WebkitTextStroke: '2px rgba(241,246,244,0.08)',
          }}
        >
          armory
        </h2>
        {/* Gradient overlay for bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-oceanic to-transparent" />
      </motion.div>
    </footer>
  );
}
