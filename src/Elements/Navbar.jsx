import { motion } from 'framer-motion'
import GooeyNav from '../Helpers/AnimatedComponents/GooeyNav';
import { Link } from 'react-router-dom';

export const Navbar = () => {

    const items = [
        { label: "Home", href: "/" },
        { label: "About", href: "#contact" },
        { label: "Contact", href: "#" },
        { label: "Pricing", href: "/pricing" },
    ];
    return (
        <motion.nav
            className="flex items-center relative justify-between py-6 px-6 md:px-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center">
                    <span className="text-white text-2xl font-bold">FIN</span>
                    <span className="text-themeGreen text-2xl font-bold">CONNECT</span>
                </div>
            </motion.div>


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

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='flex flex-row items-center gap-2'
            >
                <Link to='/login' className="border border-themeGreen font-[500] text-white rounded-full px-5 py-2 hover:bg-themeGreen hover:text-white transition-colors">
                    Login
                </Link>
                <Link to='/register' className="border border-themeGreen font-[500] text-white rounded-full px-5 py-2 hover:bg-themeGreen hover:text-white transition-colors">
                    Register
                </Link>
               
            </motion.div>
        </motion.nav>
    );
};