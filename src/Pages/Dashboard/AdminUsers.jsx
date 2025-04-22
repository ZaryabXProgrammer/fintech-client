import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit2, Trash2, UserPlus, MoreHorizontal, Cross } from 'lucide-react';
import { useDeviceDetect } from '../../utils/responsiveUtils';
import { userRequest } from '../../lib/RequestMethods'

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    proSubscribers: 0,
    newThisMonth: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await userRequest.get('/admin/users')
      if (res.data && Array.isArray(res.data.users)) {
        setUsers(res.data.users);

        // Set statistics
        setStats({
          totalUsers: res.data.totalUsers || res.data.users.length,
          activeUsers: res.data.activeUsers || 0,
          proSubscribers: res.data.proSubscribers || 0,
          newThisMonth: res.data.newThisMonth || 0
        });
      }
    }

    getAllUsers();
  }, [])

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getStatusColor = (subscribed) => {
    return subscribed
      ? 'bg-green-500/20 text-green-400 border border-green-500/20'
      : 'bg-red-500/20 text-red-400 border border-red-500/20';
  };

  // Plan badge colors
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-themeGreen/20 text-themeGreen border border-themeGreen/20';
      case 'pro': return 'bg-purple-500/20 text-purple-400 border border-purple-500/20';
      default: return 'bg-blue-500/20 text-blue-400 border border-blue-500/20';
    }
  };

  const toggleUserDetails = (user) => {
    setSelectedUser(selectedUser?._id === user._id ? null : user);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const MobileUserCard = ({ user }) => (
    <motion.div
      className="bg-gray-800/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-4"
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-themeGreen/20 border border-themeGreen/30 flex items-center justify-center text-themeGreen font-medium mr-3">
            {user.name?.charAt(0) || '?'}
          </div>
          <div>
            <h3 className="font-semibold text-white">{user.name || 'Unknown'}</h3>
            <p className="text-sm text-gray-400">{user.email || 'No email'}</p>
          </div>
        </div>
        <button onClick={() => toggleUserDetails(user)}>
          <MoreHorizontal className="text-gray-400" size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.subscribed)}`}>
          {user.subscribed ? 'Subscribed' : 'Not Subscribed'}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
          {user.role || 'User'}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700/30 text-gray-300 border border-gray-500/20">
          Joined: {formatDate(user.createdAt)}
        </span>
      </div>

      {selectedUser?._id === user._id && (
        <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all">
            <Edit2 size={16} className="mr-2" /> Edit
          </button>
          <button className="flex items-center justify-center p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
        </div>
      )}
    </motion.div>
  );

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
        variants={itemVariants}
      >
        <motion.h1
          className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 text-white"
          variants={itemVariants}
        >
          <span className="text-themeGreen">User</span> Management
        </motion.h1>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass-input px-4 py-2 pl-10 text-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>

          <motion.button
            className="glass-button px-4 py-2 rounded-xl flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus size={18} className="mr-2" /> Add User
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6"
        variants={containerVariants}
      >
        <motion.div
          className="glass-card p-4 md:p-6"
          variants={itemVariants}
        >
          <h3 className="text-sm md:text-lg font-semibold mb-1 text-gray-300">Total Users</h3>
          <p className="text-xl md:text-3xl font-bold text-themeGreen">{stats.totalUsers}</p>
        </motion.div>

        <motion.div
          className="glass-card p-4 md:p-6"
          variants={itemVariants}
        >
          <h3 className="text-sm md:text-lg font-semibold mb-1 text-gray-300">Active Users</h3>
          <p className="text-xl md:text-3xl font-bold text-green-400">{stats.activeUsers}</p>
        </motion.div>

        <motion.div
          className="glass-card p-4 md:p-6"
          variants={itemVariants}
        >
          <h3 className="text-sm md:text-lg font-semibold mb-1 text-gray-300">Pro Subscribers</h3>
          <p className="text-xl md:text-3xl font-bold text-purple-400">{stats.proSubscribers}</p>
        </motion.div>

        <motion.div
          className="glass-card p-4 md:p-6"
          variants={itemVariants}
        >
          <h3 className="text-sm md:text-lg font-semibold mb-1 text-gray-300">New This Month</h3>
          <p className="text-xl md:text-3xl font-bold text-blue-400">{stats.newThisMonth}</p>
        </motion.div>
      </motion.div>

      {isMobile && (
        <motion.div
          className="md:hidden"
          variants={containerVariants}
        >
          {filteredUsers.map((user) => (
            <MobileUserCard key={user._id} user={user} />
          ))}
        </motion.div>
      )}

      {!isMobile && (
        <motion.div
          className="bg-gray-900/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 hidden md:block"
          variants={itemVariants}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-800/50 border-b border-white/10">
                  <th className="py-3 px-4 text-left text-gray-300 font-medium">Name</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-medium">Email</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-medium">Status</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-medium">Role</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-medium">Joined Date</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-medium">Balance</th>
                  <th className="py-3 px-4 text-left text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    className="border-b border-gray-800/50 hover:bg-white/5 transition-colors duration-150"
                    variants={itemVariants}
                    custom={index}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-themeGreen/20 border border-themeGreen/30 flex items-center justify-center text-themeGreen font-medium mr-3 shadow-lg shadow-themeGreen/10">
                          {user.name?.charAt(0) || '?'}
                        </div>
                        <span className="font-medium text-white">{user.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{user.email || 'No email'}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.subscribed)}`}>
                        {user.subscribed ? 'Subscribed' : 'Not Subscribed'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role || 'User'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{formatDate(user.createdAt)}</td>
                    <td className="py-4 px-4 text-gray-300">${user.balance || 0}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <motion.button
                          className="p-2 rounded-lg flex items-center gap-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all"
                          whileHover={{ scale: 1.1 }}
                        >
                          <p className='text-[8px]'> Revoke Plan</p>  <Trash2 className='text-red-600' size={16} />
                        </motion.button>
                      
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminUsers;