import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { WavyLines } from './icons';

/*──────────────────────────────────────────────────────────────────────
 * MULTI-DIMENSIONAL PRICING MATRIX
 * ─────────────────────────────────────────────────────────────────────
 * Axis 1: Tier          → Starter | Growth | Enterprise
 * Axis 2: Billing Cycle → Monthly | Annual (flat 20 % discount)
 * Axis 3: Currency      → USD ($) | INR (₹) | EUR (€)
 *
 * Final price = baseTierRate × regionalTariff × billingMultiplier
 *────────────────────────────────────────────────────────────────────*/

const ANNUAL_DISCOUNT = 0.80; // 20% off

// Regional tariff variables (purchasing-power adjustment)
const REGIONAL_TARIFFS = {
  USD: 1.00,
  INR: 82.50,  // approximate PPP-adjusted exchange
  EUR: 0.92,
};

// Currency display config
const CURRENCY_CONFIG = {
  USD: { symbol: '$', locale: 'en-US', code: 'USD' },
  INR: { symbol: '₹', locale: 'en-IN', code: 'INR' },
  EUR: { symbol: '€', locale: 'de-DE', code: 'EUR' },
};

// Base tier rates (in USD, monthly)
const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    baseRate: 29,
    tagline: 'For solo builders and small experiments',
    features: [
      '5 AI Agent deployments',
      '10K API calls / month',
      'Community support',
      'Basic analytics dashboard',
      'Single workspace',
    ],
    highlighted: false,
    icon: '◇',
  },
  {
    id: 'growth',
    name: 'Growth',
    baseRate: 79,
    tagline: 'Scale your operations with confidence',
    features: [
      '25 AI Agent deployments',
      '100K API calls / month',
      'Priority email support',
      'Advanced analytics & reports',
      'Team workspaces (up to 10)',
      'Custom model fine-tuning',
      'Webhook integrations',
    ],
    highlighted: true,
    badge: 'Most Popular',
    icon: '◆',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    baseRate: 199,
    tagline: 'Full-scale neural infrastructure',
    features: [
      'Unlimited AI Agent deployments',
      'Unlimited API calls',
      'Dedicated account manager',
      'Real-time monitoring suite',
      'Unlimited workspaces',
      'Custom SLA & uptime guarantees',
      'SSO & advanced security',
      'On-premise deployment option',
    ],
    highlighted: false,
    icon: '⬡',
  },
];

/**
 * Compute the final price from the matrix.
 * price = baseTierRate × regionalTariff × billingMultiplier
 */
function computePrice(baseRate, currency, isAnnual) {
  const tariff = REGIONAL_TARIFFS[currency];
  const multiplier = isAnnual ? ANNUAL_DISCOUNT : 1;
  return baseRate * tariff * multiplier;
}

function formatPrice(amount, currency) {
  const cfg = CURRENCY_CONFIG[currency];
  // For INR, we don't want decimals on large numbers
  const opts = {
    style: 'currency',
    currency: cfg.code,
    minimumFractionDigits: currency === 'INR' ? 0 : 2,
    maximumFractionDigits: currency === 'INR' ? 0 : 2,
  };
  return new Intl.NumberFormat(cfg.locale, opts).format(amount);
}

function AnimatedPrice({ price, currency }) {
  return (
    <motion.span
      key={`${price}-${currency}`}
      initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="inline-block"
    >
      {formatPrice(price, currency)}
    </motion.span>
  );
}

function CurrencySwitcher({ currency, setCurrency }) {
  const currencies = ['USD', 'INR', 'EUR'];

  return (
    <div className="relative inline-flex bg-bg-card/50 border border-border/30 rounded-lg p-1 isolate">
      {currencies.map((cur) => (
        <button
          key={cur}
          onClick={() => setCurrency(cur)}
          className={`relative z-10 px-4 py-2 font-heading text-xs tracking-[0.15em] uppercase transition-colors duration-200 rounded-md
            ${currency === cur ? 'text-oceanic' : 'text-text-muted hover:text-arctic-powder'}`}
          id={`currency-${cur.toLowerCase()}`}
        >
          <span className="mr-1">{CURRENCY_CONFIG[cur].symbol}</span>
          {cur}
          {currency === cur && (
            <motion.div
              layoutId="currency-pill"
              className="absolute inset-0 bg-forsythia rounded-md -z-10"
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

function BillingToggle({ isAnnual, setIsAnnual }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`font-heading text-xs tracking-[0.15em] uppercase transition-colors ${!isAnnual ? 'text-arctic-powder' : 'text-text-muted'}`}>
        Monthly
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative w-14 h-7 rounded-full border border-border/40 bg-bg-card/30 transition-colors duration-300"
        id="billing-toggle"
        aria-label="Toggle billing cycle"
      >
        <motion.div
          animate={{ x: isAnnual ? 28 : 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute top-1 w-5 h-5 rounded-full bg-forsythia"
        />
      </button>
      <span className={`font-heading text-xs tracking-[0.15em] uppercase transition-colors ${isAnnual ? 'text-arctic-powder' : 'text-text-muted'}`}>
        Annual
      </span>
      {isAnnual && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="inline-flex items-center gap-1 bg-forsythia/15 border border-forsythia/30 text-forsythia px-2.5 py-1 rounded-full font-heading text-[10px] tracking-[0.15em] uppercase"
        >
          Save 20%
        </motion.span>
      )}
    </div>
  );
}

function TierCard({ tier, currency, isAnnual, index, isInView }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const price = useMemo(
    () => computePrice(tier.baseRate, currency, isAnnual),
    [tier.baseRate, currency, isAnnual]
  );

  const monthlyEquivalent = useMemo(
    () => isAnnual ? computePrice(tier.baseRate, currency, false) : null,
    [tier.baseRate, currency, isAnnual]
  );

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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.2 + index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 200, damping: 15 } }}
      className={`relative flex flex-col rounded-xl overflow-hidden transition-all duration-300
        ${tier.highlighted
          ? 'bg-gradient-to-b from-forsythia/10 via-bg-card/80 to-bg-card/60 border-2 border-forsythia/40 shadow-[0_0_40px_rgba(255,200,1,0.08)]'
          : 'bg-bg-card/30 border border-border/30 hover:border-border/60'
        }`}
    >
      {/* Dynamic Hover Spotlight Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${
              tier.highlighted ? 'rgba(255, 200, 1, 0.08)' : 'rgba(241, 246, 244, 0.04)'
            }, transparent 80%)`,
          }}
        />
      )}

      {/* Badge */}
      {tier.badge && (
        <div className="absolute top-0 right-0 z-20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="bg-forsythia text-oceanic font-heading text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-bl-lg font-bold"
          >
            {tier.badge}
          </motion.div>
        </div>
      )}

      <div className="p-8 flex-1 flex flex-col relative z-10">
        {/* Tier icon & name */}
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-lg ${tier.highlighted ? 'text-forsythia' : 'text-text-muted'}`}>{tier.icon}</span>
          <h3 className="font-heading text-sm tracking-[0.2em] uppercase text-arctic-powder font-medium">
            {tier.name}
          </h3>
        </div>

        <p className="text-sm text-text-muted font-body mb-6">{tier.tagline}</p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <AnimatePresence mode="wait">
              <span className="text-4xl md:text-5xl font-heading font-light text-arctic-powder tracking-tight">
                <AnimatedPrice price={price} currency={currency} />
              </span>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-heading text-text-muted tracking-[0.15em]">
              / {isAnnual ? 'mo, billed yearly' : 'month'}
            </span>
            {isAnnual && monthlyEquivalent && (
              <span className="text-xs font-heading text-text-muted/50 line-through tracking-wide">
                {formatPrice(monthlyEquivalent, currency)}
              </span>
            )}
          </div>
          {isAnnual && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-heading text-forsythia/80 tracking-widest mt-2 uppercase font-medium"
            >
              {formatPrice(price * 12, currency)} Billed Yearly
            </motion.div>
          )}
        </div>

        {/* Divider */}
        <div className={`h-px mb-6 ${tier.highlighted ? 'bg-forsythia/20' : 'bg-border/30'}`} />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {tier.features.map((feature, fi) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + fi * 0.04 }}
              className="flex items-start gap-3 text-sm font-body text-arctic-powder/80"
            >
              <span className={`mt-0.5 text-xs flex-shrink-0 ${tier.highlighted ? 'text-forsythia' : 'text-text-muted'}`}>✓</span>
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cursor="pointer"
          className={`mt-8 w-full py-3.5 rounded-lg font-heading text-xs tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2
            ${tier.highlighted
              ? 'bg-forsythia text-oceanic hover:bg-deep-saffron font-bold'
              : 'border border-border/40 text-arctic-powder hover:border-forsythia/40 hover:text-forsythia'
            }`}
          id={`pricing-cta-${tier.id}`}
        >
          <span className={`w-5 h-5 rounded border flex items-center justify-center text-[10px]
            ${tier.highlighted ? 'border-oceanic/20' : 'border-arctic-powder/20'}`}>
            ⊞
          </span>
          {tier.highlighted ? 'Start Building' : tier.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState('USD');

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-nocturnal/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-6"
        >
          <WavyLines className="w-5 h-5 text-text-muted" />
          <span className="font-heading text-xs tracking-[0.25em] uppercase text-text-muted">Pricing</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-body font-light text-arctic-powder leading-tight mb-4 max-w-lg"
        >
          Scale your intelligence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="text-base text-text-muted font-body max-w-xl leading-relaxed mb-10"
        >
          Transparent pricing that grows with your ambition. Every plan includes core agent infrastructure with zero hidden fees.
        </motion.p>

        {/* Controls: Billing Toggle + Currency Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-14"
        >
          <BillingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
          <CurrencySwitcher currency={currency} setCurrency={setCurrency} />
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier, i) => (
            <TierCard
              key={tier.id}
              tier={tier}
              currency={currency}
              isAnnual={isAnnual}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Matrix footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-heading text-text-muted/60 tracking-wide"
        >
          <span>
            Prices computed via matrix: <span className="text-text-muted/80">baseRate</span> × <span className="text-text-muted/80">tariff</span>
            {isAnnual && <> × <span className="text-forsythia/70">0.80</span></>}
          </span>
          <span className="hidden sm:inline text-text-muted/30">|</span>
          <span>
            Regional tariff ({currency}): <span className="text-text-muted/80">{REGIONAL_TARIFFS[currency]}</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
