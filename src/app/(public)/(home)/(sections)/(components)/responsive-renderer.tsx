"use client";
import { useMediaQuery } from "@/shared/hooks/use-media-query";

type ResponsiveRendererProps = {
  mediaQueryString?: string;
  children?: React.ReactNode;
  elseChildren?: React.ReactNode;
};

const ResponsiveRenderer = ({
  children,
  elseChildren,
  mediaQueryString = "(max-width: 1024px)"
}: ResponsiveRendererProps) => {
  const isBreakPointMeet = useMediaQuery(mediaQueryString, true, {
    getInitialValueInEffect: false
  });
  return isBreakPointMeet ? children ?? null : elseChildren ?? null;
};

export default ResponsiveRenderer;
