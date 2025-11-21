import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const scrollToTop = () => {
      // Attempt to scroll immediately with instant behavior
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, behavior: 'instant' });
    };

    scrollToTop(); // Run once immediately

    // Add a small timeout as a fallback for stubborn cases
    // This ensures it runs after any potential immediate DOM updates
    const timer = setTimeout(scrollToTop, 0); 

    return () => clearTimeout(timer); // Clean up the timer
  }, [pathname]);

  return null;
};
