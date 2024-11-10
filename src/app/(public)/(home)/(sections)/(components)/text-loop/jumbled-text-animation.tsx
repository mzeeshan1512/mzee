"use client";
import React, { ComponentProps, useEffect, useState } from "react";
import "./style.css";

interface TextLoopProps {
  wordsList: string[];
  interval?: number;
  delay?: number;
}

const JumbledTextAnimation: React.FC<
  TextLoopProps & ComponentProps<"span">
> = ({ wordsList, interval = 3000, delay = 1000, ...rest }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalDuration = interval + delay;

  useEffect(() => {
    if (wordsList.length === 0) return;

    const timeoutId = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 === wordsList?.length - 1 ? 0 : prevIndex + 1
      );
    }, totalDuration);

    return () => clearTimeout(timeoutId);
  }, [currentIndex, wordsList, totalDuration]);

  return (
    <div className="animate-container">
      <div className="title">
        <div className="word" key={currentIndex}>
          {wordsList[currentIndex]?.split("")?.map((char, charIndex) => (
            <span
              key={charIndex}
              style={{
                animationDelay: `${0.05 * charIndex}s`,
                animationDuration: `${interval / 1000}s`
              }}
              {...rest}
            >
              {char === " " ? "\u00A0" /* Non-breaking space */ : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JumbledTextAnimation;
