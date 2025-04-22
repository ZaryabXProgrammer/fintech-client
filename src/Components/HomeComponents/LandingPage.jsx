import LandingHero from './LandingHero';
import StatsSection from './StatsSection';
import FeaturesSection from './FeaturesSection';
import InternationalSection from './InternationalSection';
import PaymentSection from './PaymentSection';
import TestimonialsSection from './TestimonialsSection';

const LandingPage = () => {
    return (
        <div className="bg-[#151515]">
            <LandingHero />
            <StatsSection />
            <FeaturesSection />
            <InternationalSection />
            <PaymentSection />
            <TestimonialsSection />
        </div>
    );
};

export default LandingPage; 