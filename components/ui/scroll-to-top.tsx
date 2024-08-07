"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const ScrollToTop = () => {
  const path = usePathname();
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    handleRouteChange();
    console.log("hello");
  }, [path]);

  return null;
};
