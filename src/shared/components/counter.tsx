/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";

export type CounterProps = {
  target?: number;
  duration?: number;
  showPlus?: boolean;
  heading?: string;
  subHeading?: string;
  mainContainer?: React.ComponentProps<"div">;
  spanProps?: React.ComponentProps<"span">;
  textContainer?: React.ComponentProps<"div">;
  headingContainer?: React.ComponentProps<"h3">;
  subHeadingContainer?: React.ComponentProps<"p">;
};

const Counter = ({
  heading,
  headingContainer,
  mainContainer,
  showPlus = true,
  duration = 2000,
  spanProps,
  subHeading,
  subHeadingContainer,
  target = 20,
  textContainer
}: CounterProps) => {
  const [count, setCount] = React.useState(0);
  const counterRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (isVisible && target) {
      let start = 0;
      const incrementTime = Math.abs(Math.floor(duration / target));

      const counter = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === target) {
          clearInterval(counter);
        }
      }, incrementTime);

      return () => clearInterval(counter); // Cleanup on unmount
    }
  }, [isVisible, target]);

  return (
    <div
      ref={counterRef}
      {...mainContainer}
      className={
        "flex items-end w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap " +
        (mainContainer?.className || "")
      }
    >
      {target && (
        <>
          <span
            {...spanProps}
            className={spanProps?.className || ""}
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              fontWeight: "bold",
              marginRight: "1rem",
              lineHeight: 1,
              ...spanProps?.style
            }}
          >
            {showPlus ? "+" : null}
            {count < 10 ? `0${count}` : count}
          </span>
          <div
            {...textContainer}
            className={
              "flex flex-col justify-center " +
              (textContainer?.className ? textContainer?.className : "")
            }
          >
            {heading && (
              <h3
                {...headingContainer}
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.5rem)",
                  fontWeight: "bold",
                  ...headingContainer?.style
                }}
              >
                {heading}
              </h3>
            )}
            {subHeading && (
              <p
                {...subHeadingContainer}
                style={{
                  fontSize: "clamp(0.5rem, 1.5vw, 1rem)",
                  color: "gray",
                  ...subHeadingContainer?.style
                }}
              >
                {subHeading}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Counter;
