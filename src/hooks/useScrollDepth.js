import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '../utils/analytics';

/**
 * Custom Hook to track scroll depth
 * Tracks when user scrolls to 25%, 50%, 75%, and 100% of the page
 */
const useScrollDepth = () => {
  const scrollDepthTracked = useRef({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Calculate scroll percentage
      const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

      // Current page path
      const currentPath = window.location.pathname;

      // Track milestones
      if (scrollPercentage >= 25 && !scrollDepthTracked.current[25]) {
        scrollDepthTracked.current[25] = true;
        trackScrollDepth(25, currentPath);
      }

      if (scrollPercentage >= 50 && !scrollDepthTracked.current[50]) {
        scrollDepthTracked.current[50] = true;
        trackScrollDepth(50, currentPath);
      }

      if (scrollPercentage >= 75 && !scrollDepthTracked.current[75]) {
        scrollDepthTracked.current[75] = true;
        trackScrollDepth(75, currentPath);
      }

      if (scrollPercentage >= 99 && !scrollDepthTracked.current[100]) {
        scrollDepthTracked.current[100] = true;
        trackScrollDepth(100, currentPath);
      }
    };

    // Throttle scroll event for performance
    let scrollTimeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 200);
      }
    };

    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  // Reset tracking when route changes
  useEffect(() => {
    scrollDepthTracked.current = {
      25: false,
      50: false,
      75: false,
      100: false,
    };
  }, [window.location.pathname]);
};

export default useScrollDepth;
