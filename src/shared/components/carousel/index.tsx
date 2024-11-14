/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ButtonProps, CarouselProps } from "./types";
import Button from "../button";
import { settingContentTailwindClass } from "@/shared/constants-enums/reused-tailwind-css";
import { ChevronIcon } from "@/shared/icon/common";
import { useWindowEvent } from "@/shared/hooks/use-window-event";

const CarouselButton = ({ className, ...buttonProps }: ButtonProps) => {
  return (
    <Button
      {...buttonProps}
      className={`${settingContentTailwindClass} !bg-black !bg-opacity-30 !rounded-full absolute top-1/2 transform -translate-y-1/2 ${
        className || ""
      }`}
    >
      <ChevronIcon />
    </Button>
  );
};

const Carousel = ({
  responsive,
  autoPlay,
  autoPlaySpeed,
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

  const slidesElement = useMemo(() => {
    return slides ? slides : children ? React?.Children?.toArray(children) : [];
  }, [children, slides]);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    let items = 1;

    if (responsive) {
      Object?.entries(responsive)?.forEach(([_, config]) => {
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
    if (autoPlay && !isAnimating && !dragStart) {
      const timer = setInterval(() => {
        handleNext();
      }, autoPlaySpeed);

      return () => clearInterval(timer);
    }
  }, [autoPlay, autoPlaySpeed, isAnimating, dragStart]);

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
    if (!draggable || dragStart === null) return;

    const threshold = window.innerWidth * 0.2;
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
      Math.min((dragOffset / window.innerWidth) * 100, slideWidth)
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
          <CarouselButton
            {...leftArrowProps}
            className={`${leftArrowProps?.className || ""} rotate-180 left-6`}
            onClick={handlePrev}
            disabled={!infinite && activeIndex === 0}
          />
          <CarouselButton
            {...rightArrowProps}
            onClick={handleNext}
            className={`${rightArrowProps?.className || ""} -rotate-1 right-6`}
            disabled={!infinite && activeIndex === slidesElement.length - 1}
          />
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
