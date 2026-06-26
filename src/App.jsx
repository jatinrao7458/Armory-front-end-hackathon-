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
      <CustomCursor />
      <Navbar />

      <main>
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
