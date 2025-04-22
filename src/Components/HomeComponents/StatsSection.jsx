import { motion } from 'framer-motion';

const StatsSection = () => {
    const stats = [
        {
            number: '10K+',
            label: 'developers',
            description: 'FinConnect empowers developers worldwide to build secure and scalable fintech apps with ease.',
            color: 'bg-transparent text-themeGreen'
        },
        {
            number: '99.9%',
            label: 'uptime',
            description: 'Enterprise-grade uptime ensures your API integrations stay fast, secure, and reliable.',
            color: 'bg-transparent text-themeGreen'
        },
        {
            number: '50+',
            label: 'API endpoints',
            description: 'A comprehensive library of financial APIs, including payments, analytics, and identity services.',
            color: 'bg-transparent text-themeGreen'
        }
    ];


    return (
        <div className="bg-[#151515] py-16">
            <div className="container mx-auto px-6">
                <motion.div
                    className="mb-12 max-w-xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
    GETTING TO<br />KNOW FINCONNECT
</h2>
<p className="text-white/70">
    We're building the gateway for developers to securely access powerful financial APIs—your sandbox for innovation starts here.
</p>

                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-black/30 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="p-8">
                                <div className={`${stat.color} inline-block text-5xl md:text-6xl font-bold`}>
                                    {stat.number}
                                    <span className="text-lg ml-1">{stat.label}</span>
                                </div>
                                <p className="text-white/80 mt-4">{stat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsSection; 