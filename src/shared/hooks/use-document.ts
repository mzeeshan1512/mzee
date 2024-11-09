import { useEffect, useMemo, useState } from "react";

type returnType = {
  element: HTMLElement | null;
  computedStyles: unknown;
} | null;

export function useDocument(
  elementId: string,
  isMemoized?: boolean
): returnType {
  // Set up state for non-memoized version
  const [element, setElement] = useState<returnType>(null);

  // Memoized logic
  const memoizedElement = useMemo(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return null;
    }
    let result: returnType = null;
    if (elementId) {
      const element = document?.getElementById(elementId);
      const computedStyles = window?.getComputedStyle(element!);
      result = {
        element: element!,
        computedStyles: computedStyles,
      };
    }
    return result;
  }, [elementId]);

  // Non-memoized logic (useEffect)
  useEffect(() => {
    if (!isMemoized && elementId && typeof document !== "undefined" && typeof window !== "undefined") {
      const targetElement = document?.getElementById(elementId);
      const computedStyles = window?.getComputedStyle(targetElement!);

      setElement({
        element: targetElement!,
        computedStyles: computedStyles,
      });
    }
  }, [elementId, isMemoized]);

  // Return either memoized or non-memoized value
  return isMemoized ? memoizedElement : element;
}
