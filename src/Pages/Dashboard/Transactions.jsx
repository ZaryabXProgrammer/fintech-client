import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { userRequest } from '../../lib/RequestMethods'

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('30');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await userRequest.get("/transactions");
        setTransactions(response.data.transactions || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [currentPage, filter, timeframe]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  // Calculate summary data
  const summaryData = transactions.reduce((acc, transaction) => {
    const amount = transaction.amount;

    if (transaction.direction === 'incoming') {
      acc.totalReceived += amount;
    } else {
      acc.totalSent += amount;
    }

    return acc;
  }, { totalSent: 0, totalReceived: 0 });

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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="outgoing">Sent</option>
              <option value="incoming">Received</option>
            </select>
            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-themeGreen"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
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
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Reference</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Type</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Description</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Counterparty</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Amount</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-4 px-4 text-center">Loading transactions...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-4 px-4 text-center">No transactions found</td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-150"
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ x: 5 }}
                  >
                    <td className="py-4 px-4">{formatDate(transaction.timestamp)}</td>
                    <td className="py-4 px-4 font-mono text-sm">{transaction.reference}</td>
                    <td className="py-4 px-4 capitalize">{transaction.type}</td>
                    <td className="py-4 px-4">{transaction.description}</td>
                    <td className="py-4 px-4">{transaction.counterparty?.name || 'N/A'}</td>
                    <td className={`py-4 px-4 font-medium ${transaction.direction === 'outgoing' ? 'text-red-400' : 'text-green-400'}`}>
                      {transaction.direction === 'outgoing' ? '-' : '+'} ${transaction.amount.toFixed(2)} {transaction.currency}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.status === 'completed'
                        ? 'bg-green-900 text-green-300'
                        : transaction.status === 'pending'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-red-900 text-red-300'
                        }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
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
            <p className="text-2xl font-semibold text-red-400">-${summaryData.totalSent.toFixed(2)}</p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg">
            <p className="text-gray-400 mb-1">Total Received</p>
            <p className="text-2xl font-semibold text-green-400">+${summaryData.totalReceived.toFixed(2)}</p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg">
            <p className="text-gray-400 mb-1">Net Flow</p>
            <p className="text-2xl font-semibold text-themeGreen">
              ${(summaryData.totalReceived - summaryData.totalSent).toFixed(2)}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Transactions;