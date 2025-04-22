import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, index }) => {
    return (
        <motion.div
            className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-themeGreen/30 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="p-8">
                <div className="bg-themeGreen/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-white/70">{description}</p>
            </div>
        </motion.div>
    );
};

const FeaturesSection = () => {
    const features = [
        {
            title: "Secure Stripe Integration",
            description: "Integrate payments seamlessly with Stripe using our pre-built SDKs and secure tokenization.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-themeGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.5 0-4 1.5-4 4v8h2v-8c0-1.25.75-2 2-2s2 .75 2 2v8h2v-8c0-2.5-1.5-4-4-4z" />
                </svg>
            )
        },
        {
            title: "Real-Time Transaction Monitoring",
            description: "Receive instant webhooks and visual dashboards to track API-driven transactions and events.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-themeGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M3 15l6-6 4 4 8-8" />
                </svg>
            )
        },
        {
            title: "Bank-Grade Security",
            description: "All data is encrypted in-transit and at rest, with OAuth2 flows and PCI-DSS compliance.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-themeGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c.667 0 1 .333 1 1v1h-2v-1c0-.667.333-1 1-1zm-6 6h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a5 5 0 10-10 0v1H6a2 2 0 00-2 2v5a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Unified API Dashboard",
            description: "Manage multiple financial APIs including Stripe, Plaid, and Wise through one sleek dashboard.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-themeGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10m-4 4h10" />
                </svg>
            )
        }
    ];


    return (
        <div className="bg-[#151515] py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    className="mb-16 max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">ALL-IN-ONE PLATFORM<br />FOR SECURE FINANCIAL MANAGEMENT</h2>
                    <p className="text-white/70">Take control of your financial future with seamless account management and automated transaction categorization.</p>

                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection; 