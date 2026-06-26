import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const articles = [
  {
    title: 'What It Takes to Turn AI Into a Business Asset',
    date: 'APR 29, 2026',
    readTime: '2 MINS READ',
    description: 'Using AI tools is easy. Turning them into something that drives real outcomes across your business requires structure.',
    image: '/images/blog_featured.png',
    featured: true,
  },
  {
    title: 'Why Your AI Outputs Feel Inconsistent',
    date: 'APR 29, 2026',
    readTime: '3 MINS READ',
    image: '/images/blog_article_2.png',
  },
  {
    title: 'From Prompting to Systems: The Real Shift in AI',
    date: 'APR 29, 2026',
    readTime: '2 MINS READ',
    image: '/images/blog_article_3.png',
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="blog" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-body font-light text-arctic-powder leading-tight mb-2">
            Intelligence in every line of logic
          </h2>
          <p className="text-base text-text-muted font-body max-w-2xl leading-relaxed">
            Deep dives into AI architecture, agent automation, and the future of enterprise intelligence. Stay ahead of the neural curve.
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 mt-12">
          {/* Featured article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="blog-card group cursor-pointer"
            data-cursor="view"
            data-cursor-text="Read"
          >
            <div className="relative h-72 md:h-80 rounded-xl overflow-hidden border border-border/20 mb-4">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-oceanic via-oceanic/30 to-transparent z-10" />
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl md:text-2xl font-body text-arctic-powder group-hover:text-forsythia transition-colors">
                  {articles[0].title}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-heading text-xs text-text-muted tracking-[0.15em]">{articles[0].date}</span>
              <span className="font-heading text-xs text-text-muted tracking-[0.15em]">{articles[0].readTime}</span>
            </div>
            <p className="text-sm text-text-muted font-body leading-relaxed mt-3">
              {articles[0].description}
            </p>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {articles.slice(1).map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -3 }}
                className="blog-card group cursor-pointer flex flex-col sm:flex-row gap-4"
                data-cursor="view"
                data-cursor-text="Read"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-36 h-48 sm:h-28 md:w-48 md:h-36 rounded-lg overflow-hidden border border-border/20 flex-shrink-0 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-body text-arctic-powder group-hover:text-forsythia transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-[10px] text-text-muted tracking-[0.15em]">{article.date}</span>
                    <span className="font-heading text-[10px] text-text-muted tracking-[0.15em]">{article.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View Articles CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-4"
            >
              <p className="text-sm text-text-muted font-heading tracking-wide mb-3">
                Access all our articles in one place.
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-arctic-powder text-oceanic px-6 py-3 rounded-lg font-heading text-xs tracking-wide hover:bg-forsythia transition-colors"
                id="blog-cta"
              >
                <span className="w-5 h-5 rounded border border-oceanic/20 flex items-center justify-center text-[10px]">⊞</span>
                View Articles
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
