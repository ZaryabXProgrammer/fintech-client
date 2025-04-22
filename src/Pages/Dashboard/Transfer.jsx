import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { userRequest } from '../../lib/RequestMethods';
import { useSelector } from 'react-redux'

const Transfer = () => {


  const currentUserId = useSelector((state) => state.user.currentUser ? state.user.currentUser.user.id : null);
  console.log(currentUserId)

  const [formData, setFormData] = useState({
    fromAccount: currentUserId,
    toAccount: '',
    amount: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { fromAccount, toAccount, amount } = formData;

    try {
      const response = await userRequest.post("/transfer", {
        sourceId: fromAccount,
        destinationId: toAccount,
        amount: parseFloat(amount),
      });

      console.log('Transfer Successful:', response.data);
      

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            fromAccount: '',
            toAccount: '',
            amount: '',
          });
        }, 3000);
      }, 1500);
    } catch (error) {
      console.error('Transfer failed:', error);

      setIsSubmitting(false);
    }
  };


  return (
    <motion.div
      className="w-full p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-themeGreen"
        variants={itemVariants}
      >
        Transfer Funds
      </motion.h1>

      <motion.div
        className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 mb-8"
        variants={itemVariants}
      >
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-themeGreen rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Transfer Successful!</h3>
            <p className="text-gray-400">Your funds have been transferred successfully.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="fromAccount">
                  From Account
                </label>
                  <input
                    disabled
                  type="text"
                  name="fromAccount"
                  id="fromAccount"
                  placeholder="Enter account number"
                  value={formData.fromAccount}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2" htmlFor="toAccount">
                  To Account
                </label>
                <input
                  type="text"
                  name="toAccount"
                  id="toAccount"
                  placeholder="Enter account number"
                  value={formData.toAccount}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-400 mb-2" htmlFor="amount">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <span className="text-gray-400">$</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-themeGreen text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : 'Transfer Funds'}
            </motion.button>
          </form>
        )}
      </motion.div>

      <motion.div
        className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800"
        variants={itemVariants}
      >
        <h3 className="text-xl font-semibold mb-4 text-themeGreen">Recent Transfers</h3>
        <div className="space-y-4">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div>
              <p className="font-medium">To Savings Account</p>
              <p className="text-sm text-gray-400">April 15, 2025</p>
            </div>
            <p className="text-yellow-400 font-medium">$500.00</p>
          </div>
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div>
              <p className="font-medium">From Investment Account</p>
              <p className="text-sm text-gray-400">April 10, 2025</p>
            </div>
            <p className="text-green-400 font-medium">$1,200.00</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Transfer;