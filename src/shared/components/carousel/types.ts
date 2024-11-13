import React from "react";

interface BreakpointConfig {
  max: number;
  min: number;
}

interface ResponsiveConfig {
  breakpoint: BreakpointConfig;
  items: number;
}

interface ResponsiveObject {
  [key: string]: ResponsiveConfig;
}

type ChildOrSlide =
  | {
      slides?: never;
      children: React.ReactNode;
    }
  | {
      slides: React.ReactNode[];
      children?: never;
    };

type ArrowsProps =  React.ComponentProps<"button">

type TagProps = {
    sliderContainerProps?:React.ComponentProps<"div">
    sliderProps?:React.ComponentProps<"ul">
    slidesProps?:React.ComponentProps<"li">
    leftArrowProps?:ArrowsProps
    rightArrowProps?:ArrowsProps
    dotsContainerProps?:React.ComponentProps<"ul">
    dotsProps?:React.ComponentProps<"li">
}    

type CarouselProps = ChildOrSlide & TagProps & {
  responsive?: ResponsiveObject;
  autoPlaySpeed?: number;
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  infinite?:boolean;
  draggable?:boolean;
  centeredMode?:boolean
};


export type {
    BreakpointConfig,
    ResponsiveConfig,
    ResponsiveObject,
    ChildOrSlide,
    CarouselProps,
    ArrowsProps
}