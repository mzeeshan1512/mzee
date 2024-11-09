"use client";
import React from "react";
import { useWindowEvent } from "@/shared/hooks/use-window-event";
import ShowIf from "@/shared/components/show-if";
import { ChevronIcon } from "@/shared/icon/common";
import { settingContentTailwindClass, settingBgHoverTailwindClass } from ".";

export interface ScrollToTopProps {
  scrollBehavior?: "smooth" | "auto";
  offSetTop?: number;
  customSVG?: JSX.Element;
  containerProps?: React.ComponentProps<"div">;
  defaultSVGProps?: React.ComponentProps<"svg">;
}

const ScrollToTop = ({
  offSetTop = 30,
  scrollBehavior = "smooth",
  containerProps,
  customSVG,
  defaultSVGProps
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window?.scrollTo({
        top: 0,
        behavior: scrollBehavior
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (containerProps?.onClick) {
      containerProps.onClick(e);
    } else scrollToTop();
  };

  useWindowEvent("scroll", handleScroll);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      {...containerProps}
      className={`${settingContentTailwindClass} -rotate-90 ${settingBgHoverTailwindClass} ${containerProps?.className} `}
      onClick={handleClick}
    >
      <ShowIf conditionalRenderKey={!customSVG} elseComponent={customSVG}>
        <ChevronIcon {...defaultSVGProps} />
      </ShowIf>
    </div>
  );
};

export default ScrollToTop;
