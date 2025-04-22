import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Invoice = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);


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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);


    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
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
        Generate Invoice
      </motion.h1>

      <motion.div
        className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800 mb-8"
        variants={itemVariants}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2" htmlFor="endDate">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-400 mb-2" htmlFor="invoiceType">
                Invoice Type
              </label>
              <select
                name="invoiceType"
                id="invoiceType"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                defaultValue="detailed"
              >
                <option value="detailed">Detailed</option>
                <option value="summary">Summary</option>
                <option value="itemized">Itemized</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2" htmlFor="format">
                Format
              </label>
              <select
                name="format"
                id="format"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
                defaultValue="pdf"
              >
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
                <option value="xlsx">Excel</option>
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-themeGreen text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Invoice...
              </div>
            ) : 'Generate Invoice'}
          </motion.button>
        </form>
      </motion.div>

      {isGenerated && (
        <motion.div
          className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-themeGreen rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Your Invoice is Ready!</h3>
              <p className="text-gray-400">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-400 text-sm">Invoice ID</p>
                <p className="font-medium">INV-2025-0422</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Period</p>
                <p className="font-medium">{formData.startDate} to {formData.endDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="font-medium text-themeGreen">$1,245.00</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.a
              href="#"
              className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Invoice_Mock.pdf
            </motion.a>
          </div>
        </motion.div>
      )}

      <motion.div
        className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 mt-8"
        variants={itemVariants}
      >
        <h3 className="text-xl font-semibold mb-4 text-themeGreen">Recent Invoices</h3>
        <div className="space-y-4">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div>
              <p className="font-medium">Invoice #INV-2025-0401</p>
              <p className="text-sm text-gray-400">2025-03-01 to 2025-03-31</p>
            </div>
            <div className="flex items-center">
              <p className="text-themeGreen font-medium mr-4">$985.50</p>
              <motion.button
                className="text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.button>
            </div>
          </div>
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div>
              <p className="font-medium">Invoice #INV-2025-0301</p>
              <p className="text-sm text-gray-400">2025-02-01 to 2025-02-28</p>
            </div>
            <div className="flex items-center">
              <p className="text-themeGreen font-medium mr-4">$1,120.75</p>
              <motion.button
                className="text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Invoice;