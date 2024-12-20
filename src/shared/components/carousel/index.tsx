/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ButtonProps, CarouselProps } from "./types";
import Button from "../button";
import { settingContentTailwindClass } from "@/shared/constants-enums/reused-tailwind-css";
import { ChevronIcon } from "@/shared/icon/common";
import { useWindowEvent } from "@/shared/hooks/use-window-event";

const CarouselButton = ({
  className,
  disabled,
  ...buttonProps
}: ButtonProps) => {
  return (
    <Button
      {...buttonProps}
      className={`${settingContentTailwindClass} !bg-black ${
        disabled ? "!bg-opacity-10 cursor-not-allowed" : "!bg-opacity-30"
      }  !rounded-full absolute top-1/2 transform -translate-y-1/2 ${
        className || ""
      }`}
    >
      <ChevronIcon />
    </Button>
  );
};

const defaultResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Carousel = ({
  responsive,
  autoPlay,
  autoPlaySpeed = 3000,
  children,
  draggable = true,
  infinite,
  showArrows = true,
  showDots = true,
  slides,
  rightArrowProps,
  dotsContainerProps,
  dotsProps,
  leftArrowProps,
  sliderContainerProps,
  sliderProps,
  slidesProps
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<number>(1);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [hover, toggleHover] = useState<boolean>(false);

  const slidesElement = useMemo(() => {
    return slides ? slides : children ? React?.Children?.toArray(children) : [];
  }, [children, slides]);

  const handleResize = () => {
    const windowWidth =
      typeof window !== "undefined" ? window?.innerWidth : 100;
    let items = 1;
    const respConfig = { ...defaultResponsive, ...responsive };

    if (respConfig) {
      Object?.entries(respConfig)?.forEach(([_, config]) => {
        if (
          windowWidth >= config?.breakpoint?.min &&
          windowWidth <= config?.breakpoint?.max
        ) {
          items = config?.items;
        }
      });
    }

    setVisibleItems(items);
  };

  useWindowEvent("resize", handleResize);

  useEffect(() => {
    if (autoPlay && !isAnimating && !dragStart && !hover) {
      const timer = setInterval(() => {
        handleNext();
      }, autoPlaySpeed);

      return () => clearInterval(timer);
    }
  }, [autoPlay, autoPlaySpeed, isAnimating, dragStart, hover]);

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) =>
        prev === 0 ? (infinite ? slidesElement.length - 1 : 0) : prev - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) =>
        prev === slidesElement.length - 1 ? (infinite ? 0 : prev) : prev + 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!draggable || dragStart === null) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    toggleHover(false);
    if (!draggable || dragStart === null) return;

    const threshold =
      (typeof window !== "undefined" ? window?.innerWidth : 100) * 0.2;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    setDragStart(null);
    setDragOffset(0);
  };

  const calculateTranslate = () => {
    const slideWidth = 100 / visibleItems;
    const totalTranslate = activeIndex * slideWidth;
    const dragTranslate = Math.max(
      0,
      Math.min(
        (dragOffset /
          (typeof window !== "undefined" ? window?.innerWidth : 100)) *
          100,
        slideWidth
      )
    );
    return -(totalTranslate + dragTranslate);
  };

  return (
    <div
      {...sliderContainerProps}
      className={`relative overflow-hidden ${
        sliderContainerProps?.className || ""
      }`}
    >
      <ul
        {...sliderProps}
        className={`flex transition-transform duration-500 ease-in-out h-full list-none ${
          sliderProps?.className || ""
        }`}
        style={{
          ...sliderProps?.style,
          transform: `translateX(${calculateTranslate()}%)`,
          cursor: draggable ? "grab" : "default"
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseOver={() => toggleHover(true)}
      >
        {slidesElement?.map((slide, index) => (
          <li
            key={index}
            {...slidesProps}
            className={`w-[calc(100%-1rem)] flex-shrink-0 px-2 ${
              slidesProps?.className || ""
            }`}
            style={{
              ...slidesProps?.style,
              flex: `0 0 ${100 / visibleItems}%`
            }}
          >
            {slide}
          </li>
        ))}
      </ul>

      {showArrows && slidesElement?.length > visibleItems && (
        <>
          {activeIndex > 0 && (
            <CarouselButton
              {...leftArrowProps}
              className={`${leftArrowProps?.className || ""} rotate-180 left-6`}
              onClick={handlePrev}
              disabled={!infinite && activeIndex === 0}
            />
          )}
          {activeIndex < slidesElement.length - 1 && (
            <CarouselButton
              {...rightArrowProps}
              onClick={handleNext}
              className={`${
                rightArrowProps?.className || ""
              } -rotate-1 right-6`}
              disabled={!infinite && activeIndex === slidesElement.length - 1}
            />
          )}
        </>
      )}

      {showDots && (
        <div
          {...dotsContainerProps}
          className={
            "absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 " +
            (dotsContainerProps?.className || "")
          }
        >
          {slidesElement?.map((_, index) => (
            <Button
              {...dotsProps}
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/75"
              } ${dotsProps?.className || ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

export { CarouselButton };
