import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TestimonialsSection = () => {
    const [activeTestimonial] = useState(0);

    const testimonials = [
        {
            quote: "FinConnect has revolutionized the way I manage both personal and business finances. The seamless integration with various payment platforms gives me peace of mind while simplifying transactions.",
            name: "Jessica Lee",
            position: "Small Business Owner, New York",
            image: "https://randomuser.me/api/portraits/women/10.jpg"
        },

    ];


    return (
        <div className="bg-[#151515] py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-4xl mx-auto text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block">
                        <div className="flex items-center justify-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-themeGreen mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <div className="text-lg font-semibold text-themeGreen">WHAT OUR USERS SAY ABOUT US</div>
                        </div>
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className={`${index === activeTestimonial ? 'block' : 'hidden'}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <motion.div
                                className="text-2xl md:text-3xl font-bold text-white mb-10 text-center leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                "{testimonial.quote}"
                            </motion.div>

                            <motion.div
                                className="flex items-center justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-themeGreen" />
                                <div>
                                    <div className="text-white font-semibold">{testimonial.name}</div>
                                    <div className="text-white/60 text-sm">{testimonial.position}</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Logo section */}
            <motion.div
                className="mt-32 bg-themeGreen py-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-6">
                    <motion.div
                        className="flex justify-center mb-16"
                        initial={{ scale: 0.9, y: 20 }}
                        whileInView={{ scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <i>    <div className="text-6xl font-bold font-orbitron text-black">FINCONNECT</div></i>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="text-3xl font-bold text-black mb-8">TAKE CONTROL OF YOUR<br />FINANCIAL FUTURE WITH FINCONNECT</h2>
                        <Link to='/register' className="bg-black text-white rounded-full px-8 py-3 font-medium hover:bg-black/80 transition-all duration-300 transform hover:scale-105">
                            Get Started
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default TestimonialsSection; 