import HeroSection from "../../components/homeComponents/hero-section/HeroSection";
import VideoSection from "../../components/homeComponents/VideoSection";
import ServicesSection from "../../components/homeComponents/ServicesSection";
import WhyChooseSection from "../../components/homeComponents/WhyChooseSection";
import FactSection from "../../components/homeComponents/FactSection";
import ProcessSection from "../../components/homeComponents/ProcessSection";
import OptimizeSection from "../../components/homeComponents/OptimizeSection";
import ClientsSection from "../../components/homeComponents/ClientsSection";
import PricingSection from "../../components/homeComponents/PricingSection";
import TestimonialSection from "../../components/homeComponents/TestimonialSection";

const Home = () => {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <WhyChooseSection />
      <FactSection />
      <ProcessSection />
      <OptimizeSection />
      <PricingSection />
      <ClientsSection />
      <TestimonialSection />
    </main>
  );
};

export default Home;