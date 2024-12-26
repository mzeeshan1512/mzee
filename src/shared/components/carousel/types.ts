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

type ButtonProps =  React.ComponentProps<"button">

type TagProps = {
    sliderContainerProps?:React.ComponentProps<"div">
    sliderProps?:React.ComponentProps<"ul">
    slidesProps?:React.ComponentProps<"li">
    leftArrowProps?:ButtonProps
    rightArrowProps?:ButtonProps
    dotsContainerProps?:React.ComponentProps<"div">
    dotsProps?:ButtonProps
}    

type CarouselProps = ChildOrSlide &
  TagProps & {
    responsive?: ResponsiveObject;
    autoPlaySpeed?: number;
    autoPlay?: boolean;
    showDots?: boolean;
    showArrows?: boolean;
    infinite?: boolean;
    draggable?: boolean;
    centeredMode?: boolean;
    defaultItems?: number;
  };


export type {
    BreakpointConfig,
    ResponsiveConfig,
    ResponsiveObject,
    ChildOrSlide,
    CarouselProps,
    ButtonProps
}