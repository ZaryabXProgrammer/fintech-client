import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BenefitItem = ({ text, index }) => {
    return (
        <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
            <div className="w-5 h-5 rounded-full bg-themeGreen flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
            <span className="text-white/90">{text}</span>
        </motion.div>
    );
};

const InternationalSection = () => {
    const benefits = [
        "Securely manage all your financial accounts in one platform",
        "Get real-time transaction categorization and insights",
        "Enjoy seamless and secure transfers between accounts",
        "Track your financial health with personalized reports and analytics"
    ];


    return (
        <div className="bg-[#151515] py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Card visuals */}
                    <motion.div
                        className="md:w-1/2 relative lg:h-[400px]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Main card */}
                        <motion.div
                            className="absolute lg:block hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-gradient-to-br from-themeGreen to-themeGreen/80 rounded-xl shadow-xl z-30 transform rotate-6"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="p-6 h-full lg:flex flex-col hidden justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="text-black font-semibold">finconnect</span>
                                    <div className="w-8 h-5 rounded-sm bg-gradient-to-r from-yellow-500 to-yellow-300"></div>
                                </div>
                                <div className="text-black/80 text-sm">
                                    <div>INTERNATIONAL</div>
                                    <div className="mt-1">CARD</div>
                                </div>
                            </div>

                            {/* World map overlay */}
                            <div className="absolute inset-0  opacity-10">
                                <svg viewBox="0 0 256 128" className="w-full h-full">
                                    <path d="M128 0 L256 0 L256 128 L128 128 Z" fill="rgba(255,255,255,0.1)" />
                                    <circle cx="60" cy="40" r="3" fill="rgba(255,255,255,0.4)" />
                                    <circle cx="100" cy="30" r="2" fill="rgba(255,255,255,0.4)" />
                                    <circle cx="180" cy="50" r="3" fill="rgba(255,255,255,0.4)" />
                                    <circle cx="200" cy="80" r="2" fill="rgba(255,255,255,0.4)" />
                                    <circle cx="140" cy="90" r="2" fill="rgba(255,255,255,0.4)" />
                                    <circle cx="40" cy="70" r="2" fill="rgba(255,255,255,0.4)" />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Secondary card for effect */}
                        <motion.div
                            className="absolute lg:block hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-black rounded-xl shadow-lg border border-gray-700 z-20 transform -rotate-6"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 20, opacity: 0.7 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className="p-6 h-full flex flex-col justify-between opacity-70">
                                <div className="flex justify-between items-start">
                                    <span className="text-white font-semibold">finguard</span>
                                    <div className="w-8 h-5 rounded-sm bg-gradient-to-r from-gray-300 to-gray-100"></div>
                                </div>
                                <div className="text-white/80 text-sm">
                                    <div>TRAVEL</div>
                                    <div className="mt-1">REWARDS</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">BENEFITS<br />MANAGING YOUR FINANCES</h2>
                        <p className="text-white/70 mb-8">Take control of your financial future with powerful tools designed to provide security, real-time insights, and seamless transactions.</p>


                        <div className="mb-8">
                            {benefits.map((benefit, index) => (
                                <BenefitItem key={index} text={benefit} index={index} />
                            ))}
                        </div>

                        <Link to='/register'
                            className="bg-themeGreen w-max text-black rounded-full px-8 py-3 font-medium hover:bg-themeGreen/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            Register
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default InternationalSection; 