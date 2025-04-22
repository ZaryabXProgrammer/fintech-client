import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, Plus, Calendar } from 'lucide-react';

const Balance = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  // Sample account data
  const accounts = [
    {
      id: 1,
      type: "Checking Account",
      number: "**** 4582",
      balance: "$12,569.00",
      icon: <CreditCard size={24} />
    },
    {
      id: 2,
      type: "Savings Account",
      number: "**** 7291",
      balance: "$8,942.50",
      icon: <DollarSign size={24} />
    },
    {
      id: 3,
      type: "Investment Account",
      number: "**** 1035",
      balance: "$3,078.00",
      icon: <ArrowUpRight size={24} />
    }
  ];

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-6 text-white"
        variants={itemVariants}
      >
        <span className="text-themeGreen">Balance</span> Overview
      </motion.h1>


      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
        variants={containerVariants}
      >
        {accounts.map(account => (
          <motion.div
            key={account.id}
            className="bg-gray-800/30 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-themeGreen/10 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-themeGreen/10 border border-themeGreen/20 text-themeGreen">
                {account.icon}
              </div>
              <span className="text-2xl font-bold text-white">{account.balance}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">{account.type}</h3>
            <p className="text-gray-400 text-sm">{account.number}</p>
          </motion.div>
        ))}
      </motion.div>


      <motion.div
        className="flex flex-col lg:flex-row gap-5"
        variants={containerVariants}
      >
        {/* Recent Transactions */}
        <motion.div
          className="w-full lg:w-2/3 bg-gray-800/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
            <button className="text-sm text-themeGreen hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            <TransactionItem
              title="Salary Deposit"
              date="Jan 15, 2023"
              amount="+$3,500.00"
              isCredit={true}
            />
            <TransactionItem
              title="Amazon Purchase"
              date="Jan 14, 2023"
              amount="-$49.99"
              isCredit={false}
            />
            <TransactionItem
              title="Netflix Subscription"
              date="Jan 10, 2023"
              amount="-$15.99"
              isCredit={false}
            />
            <TransactionItem
              title="Savings Transfer"
              date="Jan 5, 2023"
              amount="-$500.00"
              isCredit={false}
            />
          </div>
        </motion.div>


        <motion.div
          className="w-full lg:w-1/3 bg-gray-800/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold text-white mb-5">Quick Actions</h2>

          <div className="space-y-3">
            <QuickAction
              title="Add New Account"
              icon={<Plus size={18} />}
            />
            <QuickAction
              title="Schedule Payment"
              icon={<Calendar size={18} />}
            />
            <QuickAction
              title="Transfer Money"
              icon={<ArrowUpRight size={18} />}
            />
            <QuickAction
              title="Request Money"
              icon={<ArrowDownRight size={18} />}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


const TransactionItem = ({ title, date, amount, isCredit }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg mr-3 ${isCredit ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {isCredit ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
      </div>
      <div>
        <p className="text-white font-medium">{title}</p>
        <p className="text-gray-400 text-xs">{date}</p>
      </div>
    </div>
    <span className={`font-medium ${isCredit ? 'text-green-400' : 'text-red-400'}`}>
      {amount}
    </span>
  </div>
);


const QuickAction = ({ title, icon }) => (
  <div className="flex items-center p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-themeGreen/10 transition-all duration-300 cursor-pointer group">
    <div className="p-2 rounded-lg mr-3 bg-themeGreen/10 text-themeGreen group-hover:bg-themeGreen/20">
      {icon}
    </div>
    <p className="text-white font-medium group-hover:text-themeGreen">{title}</p>
  </div>
);

export default Balance;