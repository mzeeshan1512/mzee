"use client";
import React, { useEffect, useState } from "react";
import ConditionalRenderer from "@/shared/components/conditional-renderer";

interface Props {
  scrollBehavior?: "smooth" | "auto";
  offSetTop?: number;
  svg?: any;
}

const ScrollToTop = ({
  offSetTop = 30,
  scrollBehavior = "smooth",
  svg,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window?.scrollTo({
        top: 0,
        behavior: scrollBehavior,
      });
    }
  };

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window?.scrollY > offSetTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window?.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window?.removeEventListener("scroll", handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`scroll-to-top shadow ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <ConditionalRenderer
        condition={svg}
        component={<span className="chevron-icon" />}
      >
        {svg}
      </ConditionalRenderer>
    </div>
  );
};

export default ScrollToTop;
