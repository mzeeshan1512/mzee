/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../use-reduced-motion";
import { easeInOutQuad } from "./utils/ease-in-out-quad";
import { getRelativePosition } from "./utils/get-relative-position";
import { getScrollStart } from "./utils/get-scroll-start";
import { setScrollParam } from "./utils/set-scroll-param";
import { useWindowEvent } from "../use-window-event";

interface ScrollIntoViewAnimation {
  alignment?: "start" | "end" | "center";
}

interface ScrollIntoViewParams {
  onScrollFinish?: () => void;
  duration?: number;
  axis?: "x" | "y";
  easing?: (t: number) => number;
  offset?: number;
  cancelable?: boolean;
  isList?: boolean;
  targetId?: string;
}

interface ScrollIntoViewReturnType<
  Target extends HTMLElement,
  Parent extends HTMLElement | null = null
> {
  scrollableRef: React.MutableRefObject<Parent>;
  targetRef: React.MutableRefObject<Target>;
  scrollIntoView: (params?: ScrollIntoViewAnimation) => void;
  cancel: () => void;
  currentTargetIdInView: string | null;
}

export function useScrollIntoView<
  Target extends HTMLElement,
  Parent extends HTMLElement | null = null
>({
  duration = 1250,
  axis = "y",
  onScrollFinish,
  easing = easeInOutQuad,
  offset = 0,
  cancelable = true,
  isList = false,
  targetId
}: ScrollIntoViewParams = {}) {
  const frameID = useRef(0);
  const startTime = useRef(0);
  const shouldStop = useRef(false);
  const scrollableRef = useRef<Parent>(null);
  const targetRef = useRef<Target>(null);
  const reducedMotion = useReducedMotion();

  const [currentTargetIdInView, setCurrentTargetIdInView] = useState<string | null>(null);

  const cancel = (): void => {
    if (frameID.current) {
      cancelAnimationFrame(frameID.current);
    }
  };

  const scrollIntoView = useCallback(
    ({ alignment = "start" }: ScrollIntoViewAnimation = {}) => {
      shouldStop.current = false;

      if (frameID.current) {
        cancel();
      }

      const start =
        getScrollStart({ parent: scrollableRef.current, axis }) ?? 0;

      const targetElement = targetId 
        ? document?.getElementById(targetId)
        : targetRef.current;

      const change =
        getRelativePosition({
          parent: scrollableRef.current,
          target: targetElement,
          axis,
          alignment,
          offset,
          isList
        }) - (scrollableRef.current ? 0 : start);

      function animateScroll() {
        if (startTime.current === 0) {
          startTime.current = performance.now();
        }

        const now = performance.now();
        const elapsed = now - startTime.current;
        const t = reducedMotion || duration === 0 ? 1 : elapsed / duration;
        const distance = start + change * easing(t);

        setScrollParam({
          parent: scrollableRef.current,
          axis,
          distance
        });
        if (targetElement) {
           setCurrentTargetIdInView(targetElement?.id || targetId!)
        }else setCurrentTargetIdInView(null)

        if (!shouldStop.current && t < 1) {
          frameID.current = requestAnimationFrame(animateScroll);
        } else {
          if (typeof onScrollFinish === "function") onScrollFinish();
          startTime.current = 0;
          frameID.current = 0;
          cancel();
        }
      }
      animateScroll();
    },
    [axis, duration, easing, isList, offset, onScrollFinish, reducedMotion, targetId]
  );

  const handleStop = () => {
    if (cancelable) {
      shouldStop.current = true;
    }
  };

  useWindowEvent("wheel", handleStop, {
    passive: true
  });

  useWindowEvent("touchmove", handleStop, {
    passive: true
  });

  useEffect(() => cancel, []);

  return {
    scrollableRef,
    targetRef,
    scrollIntoView,
    cancel,
    currentTargetIdInView
  } as ScrollIntoViewReturnType<Target, Parent>;
}

export type {
  ScrollIntoViewAnimation,
  ScrollIntoViewParams,
  ScrollIntoViewReturnType
};
