import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdminLogs = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');


  const logs = [
    { id: 1, user: 'john.smith@example.com', action: 'login', status: 'success', ipAddress: '192.168.1.1', timestamp: '2025-04-22 09:45:23', details: 'User logged in successfully' },
    { id: 2, user: 'sarah.j@example.com', action: 'transfer', status: 'success', ipAddress: '192.168.0.5', timestamp: '2025-04-22 10:12:08', details: 'Transferred $500 to Savings' },
    { id: 3, user: 'michael.b@example.com', action: 'login', status: 'failed', ipAddress: '192.168.0.11', timestamp: '2025-04-22 08:30:15', details: 'Invalid password attempt' },
    { id: 4, user: 'emily.d@example.com', action: 'invoice', status: 'success', ipAddress: '192.168.1.8', timestamp: '2025-04-21 16:22:45', details: 'Generated invoice #INV-2025-0421' },
    { id: 5, user: 'robert.w@example.com', action: 'signup', status: 'success', ipAddress: '192.168.2.3', timestamp: '2025-04-21 14:05:12', details: 'New user registration' },
    { id: 6, user: 'jennifer.t@example.com', action: 'password_reset', status: 'success', ipAddress: '192.168.1.22', timestamp: '2025-04-21 11:18:32', details: 'Password reset completed' },
    { id: 7, user: 'david.m@example.com', action: 'login', status: 'failed', ipAddress: '192.168.0.19', timestamp: '2025-04-20 21:45:09', details: 'Account locked after multiple attempts' },
    { id: 8, user: 'lisa.a@example.com', action: 'transfer', status: 'failed', ipAddress: '192.168.3.7', timestamp: '2025-04-20 18:30:55', details: 'Insufficient funds for transfer' },
    { id: 9, user: 'john.smith@example.com', action: 'profile_update', status: 'success', ipAddress: '192.168.1.1', timestamp: '2025-04-20 15:12:40', details: 'Updated contact information' },
    { id: 10, user: 'sarah.j@example.com', action: 'invoice', status: 'success', ipAddress: '192.168.0.5', timestamp: '2025-04-20 10:08:22', details: 'Downloaded invoice #INV-2025-0401' },
  ];


  const filteredLogs = selectedFilter === 'all'
    ? logs
    : logs.filter(log => log.status === selectedFilter);


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


  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-900 text-green-300';
      case 'failed': return 'bg-red-900 text-red-300';
      case 'warning': return 'bg-yellow-900 text-yellow-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'login': return 'bg-blue-900 text-blue-300';
      case 'transfer': return 'bg-purple-900 text-purple-300';
      case 'invoice': return 'bg-indigo-900 text-indigo-300';
      case 'signup': return 'bg-themeGreen bg-opacity-20 text-themeGreen';
      case 'password_reset': return 'bg-orange-900 text-orange-300';
      case 'profile_update': return 'bg-cyan-900 text-cyan-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <motion.div
      className="w-full p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
        variants={itemVariants}
      >
        <motion.h1
          className="text-3xl font-bold mb-4 md:mb-0 text-themeGreen"
          variants={itemVariants}
        >
          System Logs
        </motion.h1>

        <div className="flex space-x-2">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-themeGreen"
          >
            <option value="all">All Logs</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>

          <motion.button
            className="bg-themeGreen text-white px-4 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Export Logs
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 mb-8"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Recent Activity Logs</h2>
          <div className="flex items-center text-gray-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Time</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">User</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Action</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">IP Address</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-150"
                  variants={itemVariants}
                  custom={index}
                >
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <div>{log.timestamp.split(' ')[0]}</div>
                      <div className="text-gray-500">{log.timestamp.split(' ')[1]}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{log.user}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-400">{log.ipAddress}</span>
                  </td>
                  <td className="py-3 px-4">
                    {log.details}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-1">Total Events</h3>
          <p className="text-3xl font-bold text-themeGreen">843</p>
          <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-1">Success Rate</h3>
          <p className="text-3xl font-bold text-green-400">94.2%</p>
          <p className="text-sm text-gray-400 mt-1">+2.1% from last month</p>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-1">Failed Logins</h3>
          <p className="text-3xl font-bold text-red-400">12</p>
          <p className="text-sm text-gray-400 mt-1">Past 7 days</p>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-1">Active Sessions</h3>
          <p className="text-3xl font-bold text-blue-400">28</p>
          <p className="text-sm text-gray-400 mt-1">Current users online</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogs;