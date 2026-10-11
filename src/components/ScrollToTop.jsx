import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollTop = () => {
      window.scrollTo(0, 0);

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollTop();

    requestAnimationFrame(() => {
      scrollTop();

      requestAnimationFrame(() => {
        scrollTop();
      });
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;