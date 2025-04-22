import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    CreditCard,
    ArrowRightLeft,
    FileText,
    BarChart2,
    Users,
    Activity,
    ChevronLeft,
    ChevronRight,
    Settings,
    Menu,
    X
} from 'lucide-react';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Check for mobile viewport
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsExpanded(false);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sidebarVariants = {
        expanded: { width: 240, transition: { duration: 0.3 } },
        collapsed: { width: 80, transition: { duration: 0.3 } }
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    const menuItems = [
        { name: 'Overview', icon: <Home size={20} />, path: '/dashboard/overview' },
        { name: 'Balance', icon: <CreditCard size={20} />, path: '/dashboard/balance' },
        { name: 'Transfer', icon: <ArrowRightLeft size={20} />, path: '/dashboard/transfer' },
        { name: 'Transactions', icon: <BarChart2 size={20} />, path: '/dashboard/transactions' },
        { name: 'Invoice', icon: <FileText size={20} />, path: '/dashboard/invoice' },
        {
            name: 'Admin',
            icon: <Settings size={20} />,
            submenu: [
                { name: 'Users', icon: <Users size={18} />, path: '/dashboard/admin/users' },
                { name: 'Logs', icon: <Activity size={18} />, path: '/dashboard/admin/logs' }
            ]
        }
    ];

    // Check if a path is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Check if a submenu item is active
    const isSubmenuActive = (submenu) => {
        return submenu.some(item => location.pathname === item.path);
    };

    const renderMenuItems = () => {
        return menuItems.map((item, index) => (
            <div key={index}>
                {item.submenu ? (
                    <div className={`mb-2 ${isSubmenuActive(item.submenu) ? 'bg-white/10 backdrop-blur-sm rounded-xl' : ''}`}>
                        <div className={`flex items-center px-3 py-3 rounded-xl ${isExpanded ? '' : 'justify-center'}`}>
                            <div className={`${isSubmenuActive(item.submenu) ? 'text-themeGreen' : 'text-gray-300'}`}>
                                {item.icon}
                            </div>
                            {isExpanded && (
                                <span className={`ml-3 font-medium ${isSubmenuActive(item.submenu) ? 'text-themeGreen' : 'text-gray-200'}`}>
                                    {item.name}
                                </span>
                            )}
                        </div>

                        {isExpanded && (
                            <div className="mt-1 ml-8 space-y-1">
                                {item.submenu.map((subItem, subIndex) => (
                                    <Link
                                        key={subIndex}
                                        to={subItem.path}
                                        className={`flex items-center px-3 py-2 rounded-xl transition-all duration-300 ${isActive(subItem.path)
                                            ? 'bg-themeGreen/20 text-themeGreen backdrop-blur-sm'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={isActive(subItem.path) ? 'text-themeGreen' : ''}>{subItem.icon}</div>
                                        <span className="ml-3 font-medium">{subItem.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to={item.path}
                        className={`flex items-center px-3 py-3 rounded-xl transition-all duration-300 ${isExpanded ? '' : 'justify-center'} ${isActive(item.path)
                            ? 'bg-themeGreen/20 text-themeGreen backdrop-blur-sm shadow-lg shadow-themeGreen/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <div className={isActive(item.path) ? 'text-themeGreen' : ''}>{item.icon}</div>
                        {isExpanded && <span className="ml-3 font-medium">{item.name}</span>}
                    </Link>
                )}
            </div>
        ));
    };

    // Mobile Menu Toggle
    const MobileMenuToggle = () => (
        <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="fixed top-4 right-4 z-50 bg-themeGreen/20 backdrop-blur-md p-2 rounded-full shadow-lg text-white md:hidden"
        >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
    );

    // Mobile Menu Component
    const MobileMenu = () => (
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={mobileMenuVariants}
                    className="fixed top-0 left-0 right-0 h-auto z-40 bg-gray-900/80 backdrop-blur-md border-b border-white/10 shadow-xl overflow-x-auto md:hidden"
                >
                    <div className="flex p-4 pt-16 pb-6 space-x-2 overflow-x-scroll no-scrollbar">
                        {menuItems.map((item, index) => (
                            <React.Fragment key={index}>
                                {item.submenu ? (
                                    <div className="flex flex-col min-w-[120px]">
                                        <div className="flex items-center justify-center p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-white/5">
                                            <div className="text-gray-300">{item.icon}</div>
                                            <span className="ml-2 font-medium text-sm text-gray-200">{item.name}</span>
                                        </div>
                                        <div className="flex mt-2 space-x-2">
                                            {item.submenu.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`flex flex-col items-center p-2 rounded-xl transition-all min-w-[80px] ${isActive(subItem.path)
                                                        ? 'bg-themeGreen/20 text-themeGreen backdrop-blur-sm'
                                                        : 'bg-gray-800/50 text-gray-300 border border-white/5'
                                                        }`}
                                                >
                                                    <div>{subItem.icon}</div>
                                                    <span className="text-xs mt-1 font-medium">{subItem.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all min-w-[100px] ${isActive(item.path)
                                            ? 'bg-themeGreen/20 text-themeGreen backdrop-blur-sm shadow-lg shadow-themeGreen/10'
                                            : 'bg-gray-800/50 text-gray-300 border border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <div>{item.icon}</div>
                                        <span className="text-xs mt-1 font-medium">{item.name}</span>
                                    </Link>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    // If mobile view, render the mobile navigation
    if (isMobile) {
        return (
            <>
                <MobileMenuToggle />
                <MobileMenu />
            </>
        );
    }

    // Desktop view
    return (
        <motion.div
            className="h-screen border-r border-white/10 flex flex-col bg-gray-900/70 backdrop-blur-md shadow-2xl"
            variants={sidebarVariants}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            initial="expanded"
            style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
            }}
        >
            {/* Logo and Toggle */}
            <div className="p-4 flex items-center justify-between border-b border-white/10">
                {isExpanded && (
                    <div className="text-themeGreen font-bold text-xl">FinConnect</div>
                )}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
                >
                    {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-themeGreen/20 scrollbar-track-transparent">
                {renderMenuItems()}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-themeGreen/20 border border-themeGreen/30 flex items-center justify-center text-themeGreen font-medium shadow-lg shadow-themeGreen/10">
                        U
                    </div>
                    {isExpanded && (
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">User Name</p>
                            <p className="text-xs text-gray-400">user@example.com</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;