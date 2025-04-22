import { motion } from 'framer-motion'
import RotatingText from '../../Helpers/AnimatedComponents/RotatingText'
import { Link } from 'react-router-dom';



export const Hero = () => {
  return (
    <div className="relative">
      {/* Green overlay effect */}
      <motion.div
        className="absolute right-0 top-10 w-96 h-96 bg-themeGreen rounded-full opacity-10 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >



          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="text-white">Welcome to</span>
            <span className="text-white flex items-center justify-center gap-2">

              <RotatingText
                texts={['FinConnect', 'A Secure', 'Scalable', 'Place for Devs']}
                mainClassName="inline-flex self-center text-[#151515] lg:mt-4 px-2 sm:px-2 md:px-3 bg-themeGreen text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 40, stiffness: 400 }}
                rotationInterval={4000}
              />
            </span>
          </motion.h1>



          <motion.p
            className="text-white/80 text-lg md:text-xl mb-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            A Subscription-Gated Fintech API Dashboard
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-10"
          >
            <Link to='/register' className="bg-transparent border-2 border-themeGreen text-white rounded-full px-10 py-3 font-medium hover:bg-themeGreen hover:text-black transition-all duration-300 transform hover:scale-105">
              Register Now
            </Link>
          </motion.div>


          <motion.div
            className="bg-themeGreen/90 rounded-xl py-4 px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">

              <motion.div
                className="text-left mb-6 md:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <h3 className="text-black text-lg font-bold leading-tight">
                  Trusted By<br />
                  Industry Leaders
                </h3>
                <p className="text-black mt-2 text-sm md:text-[13px] max-w-sm ">
                  Powering innovation in fintech, enterprise, and cloud <br /> with seamless integration, robust security, and real-time performance.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center gap-10 md:gap-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                {/* Client Logos / Names */}
                <div className="text-black font-bold text-xl">LINETECH</div>
                <div className="text-black font-bold text-xl">RADIX</div>
                <div className="text-black font-bold text-xl">VIBETECHNO</div>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};