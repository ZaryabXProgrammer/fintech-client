import { useState, useEffect } from "react";

// Custom hook to detect device type
export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

// Function to get responsive class names
export const getResponsiveClasses = (
  baseClasses,
  mobileClasses,
  tabletClasses,
  desktopClasses
) => {
  return `${baseClasses} ${mobileClasses} ${tabletClasses} ${desktopClasses}`;
};

// Common responsive values
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

// Calculate padding based on screen size
export const getResponsivePadding = (size) => {
  switch (size) {
    case "sm":
      return {
        base: "p-2",
        mobile: "sm:p-3",
        tablet: "md:p-4",
        desktop: "lg:p-5",
      };
    case "md":
      return {
        base: "p-3",
        mobile: "sm:p-4",
        tablet: "md:p-6",
        desktop: "lg:p-8",
      };
    case "lg":
      return {
        base: "p-4",
        mobile: "sm:p-6",
        tablet: "md:p-8",
        desktop: "lg:p-10",
      };
    default:
      return {
        base: "p-4",
        mobile: "sm:p-5",
        tablet: "md:p-6",
        desktop: "lg:p-8",
      };
  }
};
