import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CreditCard, FileText, ArrowUpRight, ChevronRight, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Overview = () => {
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


    const accountBalance = "$24,589.50";
    const recentActivity = [
        { id: 1, title: "Netflix Subscription", amount: "-$15.99", date: "Today" },
        { id: 2, title: "Salary Deposit", amount: "+$3,500.00", date: "Yesterday" },
        { id: 3, title: "Amazon Purchase", amount: "-$49.99", date: "Jan 15" },
    ];

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
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Welcome to FinConnect
                                </h1>
                                <p className="text-gray-300 mb-6 max-w-md">
                                    Your financial dashboard shows your current balance and recent activity.
                                </p>

                                <div className="p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 inline-block">
                                    <div className="flex items-center">
                                        <Wallet className="text-themeGreen mr-3" size={24} />
                                        <div>
                                            <p className="text-gray-400 text-sm">Current Balance</p>
                                            <p className="text-2xl font-bold text-white">{accountBalance}</p>
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

              
                <motion.div
                    className="w-full md:w-1/3 bg-gray-800/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl"
                    variants={itemVariants}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                        <button className="text-themeGreen text-sm flex items-center">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {recentActivity.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
                                <div>
                                    <p className="text-white font-medium">{item.title}</p>
                                    <p className="text-gray-400 text-xs">{item.date}</p>
                                </div>
                                <span className={`font-medium ${item.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                    {item.amount}
                                </span>
                            </div>
                        ))}
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