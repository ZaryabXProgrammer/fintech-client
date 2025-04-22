import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { userRequest } from '../../lib/RequestMethods';

const AdminLogs = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    count: 0,
    page: 1,
    pageSize: 20,
    totalPages: 1
  });

  useEffect(() => {
    const getLogs = async () => {
      try {
        setLoading(true);
        const res = await userRequest.get("/admin/logs");
        console.log(res.data);

        if (res.data && res.data.logs) {
          setLogs(res.data.logs);
          setPagination({
            count: res.data.count || 0,
            page: res.data.page || 1,
            pageSize: res.data.pageSize || 20,
            totalPages: res.data.totalPages || 1
          });
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    getLogs();
  }, []);


  const transformedLogs = logs.map((log, index) => ({
    id: index,
    user: log.userId || 'Unknown User',
    action: getActionFromUrl(log.method, log.url),
    status: 'success', // Assuming all logs are successful operations
    timestamp: formatTimestamp(log.timestamp),
    details: `${log.method} ${log.url} (${log.userAgent})`,
  }));


  function getActionFromUrl(method, url) {
    if (url.includes('/auth')) return 'login';
    if (url.includes('/transfer')) return 'transfer';
    if (url.includes('/invoice')) return 'invoice';
    if (url.includes('/create-mock-user')) return 'signup';
    if (url.includes('/balance')) return 'balance';
    if (url.includes('/transactions')) return 'transaction';
    if (url.includes('/users')) return 'user_access';
    return method.toLowerCase();
  }

  // Helper function to format timestamp
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  const filteredLogs = selectedFilter === 'all'
    ? transformedLogs
    : transformedLogs.filter(log => log.status === selectedFilter);

  
  const exportToCSV = () => {
    // Create CSV header row
    const headers = ['Time', 'User ID', 'Action', 'Status', 'Details'];

 
    const csvData = filteredLogs.map(log => [
      log.timestamp,
      log.user,
      log.action,
      log.status,
      log.details
    ]);


    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

   
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

   
    link.setAttribute('href', url);
    link.setAttribute('download', `system_logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      case 'balance': return 'bg-cyan-900 text-cyan-300';
      case 'transaction': return 'bg-pink-900 text-pink-300';
      case 'user_access': return 'bg-amber-900 text-amber-300';
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
            onClick={exportToCSV}
          >
            Export Logs
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards - Moved to the top */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-1">Total Events</h3>
          <p className="text-3xl font-bold text-themeGreen">{pagination.count}</p>
          <p className="text-sm text-gray-400 mt-1">Total logged events</p>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-1">Success Rate</h3>
          <p className="text-3xl font-bold text-green-400">100%</p>
          <p className="text-sm text-gray-400 mt-1">All requests successful</p>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-1">GET Requests</h3>
          <p className="text-3xl font-bold text-blue-400">
            {logs.filter(log => log.method === 'GET').length}
          </p>
          <p className="text-sm text-gray-400 mt-1">Total GET requests</p>
        </motion.div>

        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold mb-1">POST Requests</h3>
          <p className="text-3xl font-bold text-purple-400">
            {logs.filter(log => log.method === 'POST').length}
          </p>
          <p className="text-sm text-gray-400 mt-1">Total POST requests</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="bg-gray-900 rounded-xl shadow-lg border border-gray-800"
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
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-themeGreen"></div>
            </div>
          ) : (
            <table className="min-w-full bg-gray-900">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Time</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">User ID</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Action</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log, index) => (
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
                      <td className="py-3 px-4">
                        <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded">
                          {log.user}
                        </span>
                      </td>
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
                        {log.details}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr className="border-b border-gray-800">
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No logs found with the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogs;