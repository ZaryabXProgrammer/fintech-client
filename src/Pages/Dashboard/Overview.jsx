import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CreditCard, FileText, ArrowUpRight, ChevronRight, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userRequest } from '../../lib/RequestMethods'

const Overview = () => {

    const userBalance = useSelector((state) => state.user.currentUser ? state.user.currentUser.user.balance : null);

    console.log(userBalance)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="flex flex-col md:flex-row items-start gap-5"
                variants={containerVariants}
            >

                <motion.div
                    className="w-full md:w-2/3 rounded-2xl overflow-hidden"
                    variants={itemVariants}
                >
                    <div className="h-full bg-gradient-to-br from-themeGreen/20 to-gray-800/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div>
                                <aside className="flex items-center mb-2">
                                    <span className="text-2xl md:text-3xl font-bold text-white">
                                        Welcome to&nbsp;
                                    </span>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex items-center gap-[1px]"
                                    >
                                        <img
                                            src="https://img.icons8.com/?size=100&id=tTy9wkoqgqew&format=png&color=0ab061"
                                            className="w-[30px] object-cover rotate-[9deg]"
                                            alt="FinConnect Logo"
                                        />

                                        <i>  <span className="text-xl md:text-2xl font-bold text-white font-orbitron leading-none">
                                            FIN<span className="text-themeGreen">CONNECT</span>
                                        </span></i>
                                    </motion.div>
                                </aside>

                                <p className="text-gray-300 mb-6 max-w-md">
                                    Your financial dashboard shows your current balance and recent activity.
                                </p>

                                <div className="p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 inline-block">
                                    <div className="flex items-center">
                                        <Wallet className="text-themeGreen mr-3" size={24} />
                                        <div>
                                            <p className="text-gray-400 text-sm">Current Balance</p>
                                            <p className="text-2xl font-bold text-white">${userBalance}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block h-32 w-32 rounded-full bg-themeGreen/20 backdrop-blur-md border border-themeGreen/20 flex items-center justify-center mt-4 md:mt-0">
                                <TrendingUp size={48} className="text-themeGreen" />
                            </div>
                        </div>
                    </div>
                </motion.div>



            </motion.div>


            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5"
                variants={containerVariants}
            >
                <QuickAccessCard
                    title="Manage Transfers"
                    description="Send money securely between your accounts"
                    icon={<ArrowUpRight size={20} />}
                    linkTo="/dashboard/transfer"
                    variants={itemVariants}
                />

                <QuickAccessCard
                    title="View Balance"
                    description="Track your current balance and spending"
                    icon={<CreditCard size={20} />}
                    linkTo="/dashboard/balance"
                    variants={itemVariants}
                />

                <QuickAccessCard
                    title="Invoice Generator"
                    description="Generate and download invoice reports"
                    icon={<FileText size={20} />}
                    linkTo="/dashboard/invoice"
                    variants={itemVariants}
                />
            </motion.div>
        </motion.div>
    );
};

const QuickAccessCard = ({ title, description, icon, linkTo, variants }) => (
    <motion.div
        className="bg-gray-800/30 hover:bg-gray-800/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-themeGreen/5 group cursor-pointer"
        variants={variants}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
        <Link to={linkTo}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-themeGreen transition-colors">{title}</h3>
                    <p className="text-gray-400 mt-1 text-sm">{description}</p>
                </div>
                <div className="p-3 rounded-xl bg-themeGreen/10 border border-themeGreen/20 text-themeGreen group-hover:bg-themeGreen/20 transition-all">
                    {icon}
                </div>
            </div>
        </Link>
    </motion.div>
);

export default Overview; 