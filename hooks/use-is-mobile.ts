"use client";

import { useEffect, useState } from "react";

const useIsMobile = (): boolean | null => {
  const [width, setWidth] = useState<number | null>(null);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width ? width <= 768 : null;
};

export default useIsMobile;
