import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CatalogSection from '@/components/catalog/CatalogSection';
import ServicesSection from '@/components/sections/ServicesSection';
import OrderStepsSection from '@/components/sections/OrderStepsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import GuaranteeSection from '@/components/sections/GuaranteeSection';
import FaqSection from '@/components/sections/FaqSection';
import ClosingSection from '@/components/sections/ClosingSection';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import { site } from '@/data/site';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CatalogSection />
        <ServicesSection />
        <OrderStepsSection />
        <TestimonialsSection />
        <GuaranteeSection />
        <FaqSection />
        <ClosingSection />
      </main>
      <Footer />
      <FloatingWhatsApp contact={site.whatsapp} />
    </>
  );
}
