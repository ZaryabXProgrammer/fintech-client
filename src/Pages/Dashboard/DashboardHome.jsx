// pages/dashboard/DashboardHome.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Balance from './Balance';
import Overview from './Overview';
import Transfer from './Transfer';
import Transactions from './Transactions';
import Invoice from './Invoice';
import AdminUsers from './AdminUsers';
import AdminLogs from './AdminLogs';
import Sidebar from './Sidebar';

const DashboardHome = () => {
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // if (!user) return <Navigate to="/login" />;
    // if (!user?.isSubscribed) return <Navigate to="/pricing" />;

    return (
        <div className="relative min-h-screen b bg-gradient-to-br from-gray-900 to-gray-950">
         
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(50,50,50,0.1)_0%,rgba(0,0,0,0)_50%)]"></div>

            <div className={`flex flex-col md:flex-row min-h-screen`}>
                {!isMobile && <Sidebar />}

                <div className="flex-1 p-3 md:p-6 overflow-hidden">
                    <div className="h-full rounded-2xl bg-gray-900/50 backdrop-blur-md border border-white/5 shadow-xl overflow-auto p-4 md:p-6">
                        <Routes>
                            <Route index element={<Navigate to="overview" />} />
                            <Route path="overview" element={<Overview />} />
                            <Route path="balance" element={<Balance />} />
                            <Route path="transfer" element={<Transfer />} />
                            <Route path="transactions" element={<Transactions />} />
                            <Route path="invoice" element={<Invoice />} />
                            <Route path="admin/users" element={<AdminUsers />} />
                            <Route path="admin/logs" element={<AdminLogs />} />
                            <Route path="*" element={
                                <div className="flex items-center justify-center h-64">
                                    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
                                        <h2 className="text-xl font-semibold text-themeGreen">Dashboard page not found</h2>
                                    </div>
                                </div>
                            } />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
