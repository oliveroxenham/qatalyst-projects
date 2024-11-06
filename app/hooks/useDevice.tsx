import { useEffect, useState } from 'react';

const useDevice = () => {
  const [isMobileView, setIsMobileView] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth < 720);
  const [isTabletView, setIsTabletView] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth < 1_280 && window.innerWidth >= 720,
  );
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth >= 1_280,
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(typeof window !== 'undefined' && window.innerWidth < 720);
      setIsTabletView(typeof window !== 'undefined' && window.innerWidth < 1_280 && window.innerWidth >= 720);
      setIsDesktopView(typeof window !== 'undefined' && window.innerWidth >= 1_280);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return { isDesktopView, isMobileView, isTabletView };
};

export default useDevice;
