import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RotatingText from "../../Helpers/AnimatedComponents/RotatingText";

const FloatingCard = ({ delay, className }) => {
  return (
    <motion.div
      className={`absolute ${className} w-48 h-32 rounded-xl backdrop-blur-md bg-black/10 shadow-lg border border-white/10 overflow-hidden`}
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 2, 0, -2, 0],
        opacity: 1,
      }}
      transition={{
        y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay },
        rotate: { repeat: Infinity, duration: 6, ease: "easeInOut", delay },
        opacity: { duration: 0.8, delay },
      }}
    >
      <div className="h-8 bg-themeGreen/80 w-full flex items-center px-3">
        <div className="w-8 h-5 rounded-sm bg-gradient-to-r from-yellow-500 to-yellow-300"></div>
      </div>
      <div className="p-3">
        <div className="h-3 w-3/4 bg-white/30 rounded-full mb-2"></div>
        <div className="h-3 w-1/2 bg-white/30 rounded-full mb-2"></div>
        <div className="h-3 w-2/3 bg-white/30 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export const LandingHero = () => {
  const username = useSelector((state) =>
    state.user.currentUser ? state.user.currentUser?.user?.name : null
  );

  return (
    <div className="relative overflow-hidden bg-[#151515] min-h-screen pt-16 pb-20">
      {/* Background effects */}
      <motion.div
        className="absolute right-0 top-10 w-96 h-96 bg-themeGreen rounded-full opacity-10 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute left-20 bottom-40 w-72 h-72 bg-themeGreen/30 rounded-full opacity-20 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="text-white block mb-2">UNLOCK SECURE</span>
              <span className="text-white">FINTECH APIs</span>
            </motion.h1>

            <motion.p
              className="text-white/80 text-lg md:text-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Build, test, and launch financial apps with powerful mock APIs
              gated by real-time subscription logic — JWT-secured and
              developer-ready.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                to={username ? "/dashboard" : "/register"}
                className="bg-themeGreen text-black rounded-full px-8 py-3 font-medium hover:bg-themeGreen/90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <Link
                to="/pricing"
                className="bg-transparent border-2 border-themeGreen text-white rounded-full px-8 py-3 font-medium hover:bg-themeGreen/10 transition-all duration-300"
              >
                Pricing
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-themeGreen bg-gray-800`}
                  ></div>
                ))}
              </div>
              <div className="text-white/80 text-sm">
                <span className="text-themeGreen font-semibold">
                  Built for Devs
                </span>{" "}
                with seamless API access & RBAC control
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative h-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Main card */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-gradient-to-br from-themeGreen to-themeGreen/80 rounded-xl shadow-xl z-30"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-black font-semibold">finconnect</span>
                  <div className="w-8 h-5 rounded-sm bg-gradient-to-r from-yellow-500 to-yellow-300"></div>
                </div>
                <div className="text-black/80 text-sm">
                  <div>**** **** **** 4829</div>
                  <div className="mt-1">PREMIUM</div>
                </div>
              </div>
            </motion.div>

            {/* Secondary cards */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-black rounded-xl shadow-lg border border-gray-700 z-20"
              initial={{ y: 50, opacity: 0, rotate: -5 }}
              animate={{ y: 30, opacity: 1, rotate: -5 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-white font-semibold">finconnect</span>
                  <div className="w-8 h-5 rounded-sm bg-gradient-to-r from-gray-300 to-gray-100"></div>
                </div>
                <div className="text-white/80 text-sm">
                  <div>**** **** **** 7635</div>
                  <div className="mt-1">STANDARD</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-gray-800 rounded-xl shadow-lg border border-gray-700 z-10"
              initial={{ y: 70, opacity: 0, rotate: 5 }}
              animate={{ y: 60, opacity: 0.8, rotate: 5 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-white font-semibold">finconnect</span>
                  <div className="w-8 h-5 rounded-sm bg-gradient-to-r from-gray-500 to-gray-400"></div>
                </div>
                <div className="text-white/80 text-sm">
                  <div>**** **** **** 2159</div>
                  <div className="mt-1">BASIC</div>
                </div>
              </div>
            </motion.div>

            {/* Floating cards in background */}
            <FloatingCard delay={0.5} className="top-10 left-10" />
            <FloatingCard delay={0.8} className="bottom-10 right-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
