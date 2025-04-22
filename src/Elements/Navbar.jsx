import { motion, AnimatePresence } from 'framer-motion'
import GooeyNav from '../Helpers/AnimatedComponents/GooeyNav';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronDown, User2Icon } from 'lucide-react'; // Import ChevronDown icon
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../Redux/userSlice';

export const Navbar = () => {

    const user = useSelector((state) => state.user.currentUser ? state.user.currentUser.user.name : null);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false);


    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Define dashboard subitems
    const dashboardItems = [
        { label: "Overview", href: "/dashboard/overview" },
        { label: "Balance", href: "/dashboard/balance" },
        { label: "Transfer", href: "/dashboard/transfer" },
        { label: "Transactions", href: "/dashboard/transactions" },
        { label: "Invoice", href: "/dashboard/invoice" },
        { label: "Admin Users", href: "/dashboard/admin/users" },
        { label: "Admin Logs", href: "/dashboard/admin/logs" },
    ];

    const items = [
        { label: "Home", href: "/" },
        { label: "About", href: "#contact" },
        { label: "Dashboard", href: "/dashboard/overview", hasSubmenu: true },
        { label: "Pricing", href: "/pricing" },
    ];

    const menuVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.5,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -10 }
    };

    const submenuVariants = {
        open: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.3,
                staggerChildren: 0.07,
                delayChildren: 0.1
            }
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const submenuItemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: -10 }
    };

    return (
        <motion.nav
            className="flex items-center relative justify-between py-5 px-6 md:px-12 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Link to='/' className="flex items-center gap-[1px] font-orbitron">
                    <img
                        src="https://img.icons8.com/?size=100&id=tTy9wkoqgqew&format=png&color=0ab061"
                        className="w-[33px] object-cover rotate-[9deg]"
                        alt="FinConnect Logo"
                    />



                    <i><span className="text-white text-xl font-bold ">FIN<span className="text-themeGreen  font-bold">CONNECT</span></span></i>

                </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <GooeyNav
                    items={items}
                    particleCount={15}
                    particleDistances={[90, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="z-50 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex flex-col justify-between w-7 h-6">
                        <motion.div
                            className="w-full h-0.5 bg-white rounded-full"
                            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="w-full h-0.5 bg-white rounded-full"
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="w-full h-0.5 bg-white rounded-full"
                            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.button>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        className="fixed inset-0 bg-gray-900/95 z-40 flex flex-col items-center justify-center"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <motion.ul className="flex flex-col items-center space-y-6">
                            {items.map((item, index) => (
                                item.hasSubmenu ? (
                                    <motion.div key={index} className="flex flex-col items-center" variants={itemVariants}>
                                        <motion.div
                                            className="flex items-center cursor-pointer"
                                            onClick={() => setDashboardOpen(!dashboardOpen)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="text-white text-2xl font-medium hover:text-themeGreen transition-colors">
                                                {item.label}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: dashboardOpen ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="ml-2"
                                            >
                                                <ChevronDown size={20} className="text-white" />
                                            </motion.div>
                                        </motion.div>

                                        <AnimatePresence>
                                            {dashboardOpen && (
                                                <motion.ul
                                                    className="mt-4 flex flex-col items-center space-y-3 overflow-hidden"
                                                    variants={submenuVariants}
                                                    initial="closed"
                                                    animate="open"
                                                    exit="closed"
                                                >
                                                    {dashboardItems.map((subItem, subIndex) => (
                                                        <motion.li
                                                            key={subIndex}
                                                            variants={submenuItemVariants}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Link
                                                                to={subItem.href}
                                                                className="text-gray-300 text-lg font-medium hover:text-themeGreen transition-colors"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        </motion.li>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ) : (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            to={item.href}
                                            className="text-white text-2xl font-medium hover:text-themeGreen transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.li>
                                )
                            ))}
                            <motion.div
                                className="flex flex-col space-y-4 mt-8 items-center"
                                variants={itemVariants}
                            >
                                <Link
                                    to='/login'
                                    className="border border-themeGreen font-[500] text-white rounded-full px-8 py-2 hover:bg-themeGreen hover:text-white transition-colors w-32 text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/register'
                                    className="border border-themeGreen font-[500] text-white rounded-full px-8 py-2 hover:bg-themeGreen hover:text-white transition-colors w-32 text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </motion.div>
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Auth Buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='hidden md:flex flex-row items-center gap-2'
            >
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="border border-themeGreen font-[500] flex items-center gap-[6px] text-white rounded-full px-5 py-2 hover:bg-themeGreen hover:text-white transition-colors">
                            <User2Icon className="text-white w-5" /> {user}
                        </span>
                        <button
                            onClick={() => dispatch(signOut())}
                            className="border border-red-500 font-[500] text-white rounded-full px-5 py-2 hover:bg-red-500 hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="border border-themeGreen font-[500] text-white rounded-full px-5 py-2 hover:bg-themeGreen hover:text-white transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="border border-themeGreen font-[500] text-white rounded-full px-5 py-2 hover:bg-themeGreen hover:text-white transition-colors"
                        >
                            Register
                        </Link>
                    </div>
                )}

            </motion.div>
        </motion.nav>
    );
};