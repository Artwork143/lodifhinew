import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const pathname = useLocation();

  useEffect(() => {
    const source = pathname.state ? pathname.state.source : null;
    if (source === "footer") {
      window.scrollTo(0, 1000);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
