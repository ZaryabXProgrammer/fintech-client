import { motion } from 'framer-motion';

const PaymentCard = ({ icon, index }) => {
    return (
        <motion.div
            className="bg-themeGreen rounded-2xl overflow-hidden flex items-center justify-center h-36"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(8, 192, 104, 0.4)" }}
        >
            <div className="text-3xl font-bold text-black">{icon}</div>
        </motion.div>
    );
};

const PaymentSection = () => {
    const payments = [
        {
            name: "Apple Pay",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1.2-3.6c-.327.047-.652.07-.975.07-1.038 0-1.962-.217-2.773-.65a4.344 4.344 0 01-1.753-1.85c-.403-.8-.605-1.72-.605-2.77 0-1.25.302-2.328.905-3.235a5.868 5.868 0 012.403-2.07c.984-.467 2.06-.7 3.228-.7.518 0 1.072.043 1.662.13-.23.52-.456 1.095-.68 1.725a8.895 8.895 0 00-1.037-.125c-.822 0-1.544.147-2.167.44a3.512 3.512 0 00-1.473 1.303c-.36.572-.54 1.254-.54 2.047 0 .826.178 1.535.535 2.126.357.592.85 1.045 1.48 1.36.63.315 1.37.472 2.22.472.407 0 .798-.035 1.17-.104.314.67.59 1.246.83 1.73a7.89 7.89 0 01-1.43.11z" />
                </svg>
            )
        },
        {
            name: "PayPal",
            icon: (
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.067 8.417C20.067 10.817 18.7 12.117 16.167 12.117H14.767C14.459 12.117 14.192 12.317 14.134 12.617L13.434 16.817C13.417 16.917 13.384 17.009 13.326 17.092C13.267 17.175 13.192 17.242 13.105 17.292C13.018 17.342 12.92 17.368 12.817 17.375C12.717 17.384 12.617 17.375 12.517 17.342H12.5L12.767 15.517C12.775 15.409 12.759 15.3 12.717 15.2C12.675 15.1 12.609 15.009 12.526 14.942C12.442 14.875 12.342 14.825 12.234 14.792C12.127 14.759 12.017 14.767 11.917 14.775H10.25C10.034 14.775 9.834 14.675 9.734 14.492C9.617 14.292 9.65 14.05 9.784 13.867C9.917 13.675 10.134 13.567 10.367 13.567H11.517C11.825 13.567 12.092 13.367 12.15 13.067L12.85 8.867C12.867 8.767 12.9 8.675 12.958 8.592C13.017 8.509 13.092 8.442 13.179 8.392C13.266 8.342 13.366 8.309 13.467 8.3C13.568 8.291 13.666 8.3 13.767 8.334H16.167C16.334 8.334 16.667 8.334 17.067 8.25C17.167 8.242 17.267 8.234 17.35 8.225H17.367C18.384 8.075 19.15 7.75 19.667 7.259C19.959 6.975 20.067 6.709 20.067 6.25V8.417Z" />
                </svg>
            )
        },
        {
            name: "Wise",
            icon: <div className="text-2xl font-bold">wise</div>
        },
        {
            name: "Google Pay",
            icon: (
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.542 10.642H14.917C14.917 10.642 14.917 12.084 14.917 13.034C15.95 13.034 16.917 13.034 17.542 13.034C17.3 14.034 16.567 14.875 15.584 15.342V16.7C17.125 16.15 18.284 14.525 18.284 12.534C18.284 12.034 18.284 11.392 18.284 11.392C18.284 11.084 17.983 10.642 17.542 10.642Z" />
                    <path d="M15 8.33398C16.83 8.33398 17.58 9.46732 17.83 10.1673L17.9 10.334L19.33 9.26732L19.2 9.08398C18.7 8.16732 17.58 6.66732 15 6.66732C12.91 6.66732 11.5 7.50065 10.58 8.66732L12 9.75065C12.58 8.91732 13.58 8.33398 15 8.33398Z" />
                    <path d="M15 16.25C13.5 16.25 12.58 15.584 12.083 15.084C11.583 14.584 11.167 13.834 11.083 13.5C11.083 13.5 7.16699 13.5 6.41699 13.5C6.41699 15.667 8.00033 19 14.917 19C17.833 19 19.5 17.417 20.333 16.167L19 15C18.5 15.5 17.25 16.25 15 16.25Z" />
                    <path d="M11.084 12.25C11.084 11.834 11.084 11.417 11.084 11C11.084 10.25 11.334 9.333 12.084 8.666L10.667 7.583C10.084 8.166 9.58398 9 9.33398 10H5.33398V12.25H11.084Z" />
                </svg>
            )
        }
    ];

    return (
        <div className="bg-black py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    className="mb-16 max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">REAL-TIME FINANCIAL<br />INSIGHTS & MANAGEMENT</h2>
                    <p className="text-white/70">Leverage Finguard’s advanced tools to monitor your finances in real-time, giving you full control over your spending and investments.</p>

                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {payments.map((payment, index) => (
                        <PaymentCard
                            key={index}
                            icon={payment.icon}
                            index={index}
                        />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <motion.button
                        className="bg-white/10 backdrop-blur-sm text-white rounded-full px-8 py-3 font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        See More Integrations
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSection; 