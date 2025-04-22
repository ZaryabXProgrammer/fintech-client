import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight,
  CreditCard,
  Loader2,
} from "lucide-react";
import { userRequest } from "../lib/RequestMethods";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const PricingCard = ({
  tier,
  price,
  popular,
  emoji,
  color,
  features,
  onSelectPlan,
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -8,
      boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.12)",
      transition: { duration: 0.4 },
    },
  };

  const [isLoading, setIsLoading] = useState(false);

  // Get button and background colors based on plan
  const getColors = () => {
    switch (tier) {
      case "Basic":
        return {
          bg: "bg-themeGreen",
          button: "bg-themeGreen hover:bg-opacity-90",
          icon: <Zap className="w-5 h-5 text-themeGreen" />,
        };
      case "Standard":
        return {
          bg: "bg-themeGreen",
          button: "bg-themeGreen hover:bg-opacity-90",
          icon: <ShieldCheck className="w-5 h-5 text-themeGreen" />,
        };
      case "Professional":
        return {
          bg: "bg-themeGreen",
          button: "bg-themeGreen hover:bg-opacity-90",
          icon: <Star className="w-5 h-5 text-themeGreen" />,
        };
      default:
        return {
          bg: "bg-themeGreen",
          button: "bg-themeGreen hover:bg-opacity-90",
          icon: <Check className="w-5 h-5 text-themeGreen" />,
        };
    }
  };

  const handleSelectPlanClick = async () => {
    setIsLoading(true);
    try {
      await onSelectPlan(tier.toLowerCase(), price);
    } finally {
      // If redirect doesn't happen, we'll reset loading state after a timeout
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  const colors = getColors();

  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg p-6 flex flex-col overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Complex background shape */}
      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gray-100 opacity-50" />
      <div className="absolute right-12 bottom-16 w-16 h-16 rounded-full bg-gray-100 opacity-30" />

      {/* New ribbon design using polygon */}
      <div className="absolute -top-1 -right-1">
        <div
          className={`${colors.bg} py-1 px-4 text-white font-bold flex flex-col items-center`}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)",
            minWidth: "70px",
            height: "70px",
          }}
        >
          <span className="text-xl">${price}</span>
          <span className="text-xs">/ month</span>
        </div>
      </div>

      {/* Card content */}
      <div className="mb-4 mt-4 relative z-10 flex items-center">
        <div>
          <h3 className="text-2xl font-bold">{tier}</h3>
          {popular && (
            <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-1">
              Most Popular
            </div>
          )}
        </div>
      </div>

      {/* Features list with custom checkmarks */}
      <div className="flex-grow relative z-10">
        <ul className="space-y-4 my-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-3 bg-gray-100 rounded-full p-1.5">
                <Check className="h-4 w-4 text-themeGreen" />
              </div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Buy button with hover effect */}
      <motion.button
        onClick={handleSelectPlanClick}
        className={`${colors.button} w-full py-3 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Subscribe
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

const PricingComponent = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const user = useSelector((state) => state.user.currentUser?.user || null);



  useEffect(() => {
    // Check if user is already subscribed
    const checkSubscriptionStatus = async () => {
      try {
        if (user) {
          const response = await userRequest.get("/subscriptions/status");
          setIsSubscribed(response.data.subscribed);
        }
      } catch (error) {
        console.error("Error checking subscription status:", error);
      }
    };

    checkSubscriptionStatus();
  }, [user]);

  const handleSelectPlan = async (planId, price) => {
    try {
      setLoading(true);
      setSelectedPlan({ planId, price });

      if (!user) {
        toast.error("Please login first to subscribe");
        return;
      }

      // Create checkout session
      const response = await userRequest.post(
        "/subscriptions/create-checkout-session",
        {
          priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
        }
      );

      // Redirect to checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const redirectToBillingPortal = async () => {
    try {
      setLoadingPortal(true);

      if (!user) {
        toast.error("Please login first to manage your subscription");
        return;
      }

      // Create billing portal session
      const response = await userRequest.get("/subscriptions/billing-portal");

      // Redirect to billing portal
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error redirecting to billing portal:", error);
      toast.error("Failed to access billing portal. Please try again.");
    } finally {
      setLoadingPortal(false);
    }
  };

  // Map planId to Stripe priceId (these should match your Stripe products)
  const getPriceId = (planId) => {
    switch (planId) {
      case "basic":
        return "price_basic"; // Replace with your actual Stripe price ID
      case "standard":
        return "price_standard"; // Replace with your actual Stripe price ID
      case "professional":
        return "price_professional"; // Replace with your actual Stripe price ID
      default:
        return "price_basic"; // Default price ID
    }
  };

  const pricingData = [
    {
      tier: "Basic",
      price: "19.99",
      popular: false,
      emoji: "🦊",
      color: "themeGreen",
      features: [
        "Unlock all features from our site",
        "24/7 Priority support",
        "Access to Pro group",
        "Cancel anytime you want",
      ],
    },
    {
      tier: "Standard",
      price: "19.99",
      popular: true,
      emoji: "🐼",
      color: "themeGreen",
      features: [
        "Unlock all features from our site",
        "24/7 Priority support",
        "Access to Pro group",
        "Cancel anytime you want",
      ],
    },
    {
      tier: "Professional",
      price: "19.99",
      popular: false,
      emoji: "🦄",
      color: "themeGreen",
      features: [
        "Unlock all features from our site",
        "24/7 Priority support",
        "Access to Pro group",
        "Cancel anytime you want",
      ],
    },
  ];

  return (
    <div className="max-w-[76%] mx-auto px-4 py-12 ">
      {/* Title section with decorative elements */}
      <div className="text-center mb-16 relative">
        <div className="absolute left-1/4 -top-4 w-8 h-8 rounded-full bg-themeGreen bg-opacity-20" />
        <div className="absolute right-1/3 top-8 w-6 h-6 rounded-full bg-themeGreen bg-opacity-10" />

        <h2 className="text-4xl font-bold mb-4 relative z-10 text-white">
          Choose Your Plan
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          Select the perfect plan for your needs. All plans include full access
          to our features with different levels of support.
        </p>

        {isSubscribed && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 mt-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg transition duration-200"
          >
            Plan: Premium
          </motion.button>
        )}

        {isSubscribed && (
          <div className="mt-6">
            <motion.button
              onClick={redirectToBillingPortal}
              disabled={loadingPortal}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loadingPortal ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Manage Subscription
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 text-black md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingData.map((plan, index) => (
          <PricingCard key={index} {...plan} onSelectPlan={handleSelectPlan} />
        ))}
      </div>

      {/* Guarantee message with icon */}
      <div className="text-center mt-16 flex items-center justify-center text-gray-400">
        <ShieldCheck className="w-5 h-5 mr-2 text-themeGreen" />
        <p>30-day money-back guarantee. Cancel anytime.</p>
      </div>
    </div>
  );
};

export default PricingComponent;
