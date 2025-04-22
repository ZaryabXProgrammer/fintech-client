import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const totalPages = 5;


  const allTransactions = [
    { id: 1, type: 'sent', amount: 200, from: 'Account A', to: 'Account B', date: '2025-04-21', status: 'completed' },
    { id: 2, type: 'received', amount: 1500, from: 'Employer', to: 'Main Account', date: '2025-04-19', status: 'completed' },
    { id: 3, type: 'sent', amount: 75.50, from: 'Main Account', to: 'Electricity Bill', date: '2025-04-18', status: 'completed' },
    { id: 4, type: 'sent', amount: 35.99, from: 'Main Account', to: 'Netflix Subscription', date: '2025-04-16', status: 'completed' },
    { id: 5, type: 'sent', amount: 120, from: 'Main Account', to: 'Internet Bill', date: '2025-04-15', status: 'completed' },
    { id: 6, type: 'received', amount: 400, from: 'Client Payment', to: 'Main Account', date: '2025-04-12', status: 'completed' },
    { id: 7, type: 'sent', amount: 65.75, from: 'Main Account', to: 'Water Bill', date: '2025-04-10', status: 'completed' },
    { id: 8, type: 'sent', amount: 25, from: 'Main Account', to: 'Savings Account', date: '2025-04-08', status: 'completed' },
    { id: 9, type: 'received', amount: 1500, from: 'Employer', to: 'Main Account', date: '2025-04-05', status: 'completed' },
    { id: 10, type: 'sent', amount: 99.99, from: 'Main Account', to: 'Amazon', date: '2025-04-03', status: 'completed' },
  ];


  const getCurrentTransactions = () => {
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    return allTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      className="w-full lg:p-6 p-[0.3%]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-themeGreen"
        variants={itemVariants}
      >
        Transaction History
      </motion.h1>

      <motion.div
        className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 mb-8"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-semibold mb-4 md:mb-0">Recent Transactions</h2>
          <div className="flex space-x-2 text-[10px] lg:text-[14px]">
            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-themeGreen"
            >
              <option value="all">All Transactions</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
            </select>
            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-themeGreen"
            >
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="year">This year</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Date</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Description</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Amount</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentTransactions().map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-150"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                >
                  <td className="py-4 px-4">{transaction.date}</td>
                  <td className="py-4 px-4">
                    {transaction.type === 'sent'
                      ? `Sent from ${transaction.from} to ${transaction.to}`
                      : `Received from ${transaction.from} to ${transaction.to}`
                    }
                  </td>
                  <td className={`py-4 px-4 font-medium ${transaction.type === 'sent' ? 'text-red-400' : 'text-green-400'}`}>
                    {transaction.type === 'sent' ? '-' : '+'} ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300">
                      {transaction.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-400">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex space-x-2">
            <motion.button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-gray-600 text-white hover:border-themeGreen'}`}
              whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
              whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            >
              Previous
            </motion.button>
            <motion.button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border ${currentPage === totalPages ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-gray-600 text-white hover:border-themeGreen'}`}
              whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
              whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
            >
              Next
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800"
        variants={itemVariants}
      >
        <h3 className="text-xl font-semibold mb-4 text-themeGreen">Transaction Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-5 rounded-lg">
            <p className="text-gray-400 mb-1">Total Sent</p>
            <p className="text-2xl font-semibold text-red-400">-$621.24</p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg">
            <p className="text-gray-400 mb-1">Total Received</p>
            <p className="text-2xl font-semibold text-green-400">+$3,400.00</p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg">
            <p className="text-gray-400 mb-1">Net Flow</p>
            <p className="text-2xl font-semibold text-themeGreen">+$2,778.76</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Transactions;