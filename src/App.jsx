import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntegrationSection from './components/IntegrationSection';
import StatsSection from './components/StatsSection';
import CaseStudies from './components/CaseStudies';
import ProductSection from './components/ProductSection';
import BentoAccordion from './components/BentoAccordion';
import ProductDashboard from './components/ProductDashboard';
import ProductTabs from './components/ProductTabs';
import PricingSection from './components/PricingSection';
import BlogSection from './components/BlogSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="relative min-h-screen bg-oceanic cursor-none">
      <div aria-hidden="true">
        <CustomCursor />
      </div>
      <Navbar />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-arctic-powder focus:px-4 focus:py-2 focus:text-oceanic"
      >
        Skip to content
      </a>

      <main id="main-content" aria-label="Armory product platform overview">
        <Hero />
        <IntegrationSection />
        <StatsSection />
        <CaseStudies />
        <ProductSection />
        <BentoAccordion />
        <ProductDashboard />
        <ProductTabs />
        <PricingSection />
        <BlogSection />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
