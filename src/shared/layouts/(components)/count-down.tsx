/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { time } from "node:console";
import React, { useState, useEffect } from "react";
import { useInterval } from "../../hooks/use-interval";

const DisplayFormat = ({ text, label }: { text: string; label: string }) => {
  return (
    <div className="flex flex-col gap-2 bg-opacity-50 backdrop-blur-md p-2 justify-center items-center text-center rounded-md shadow">
      <h1 className="text-[clamp(30px,5vw,2vw+60px)]">
        {+text < 10 ? `0${text}` : text}
      </h1>
      <p>{label}</p>
    </div>
  );
};

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference < 1) {
      stop();
    }
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());
  const { stop } = useInterval(() => setTimeLeft(calculateTimeLeft()), 1000, {
    autoInvoke: true
  });

  return (
    <div className="flex flex-row flex-wrap gap-2 items-center">
      <DisplayFormat text={timeLeft?.days} label="days" />
      <div className="text-lg font-extrabold hidden md:block">:</div>
      <DisplayFormat text={timeLeft?.hours} label="hours" />
      <div className="text-lg font-extrabold hidden md:block">:</div>
      <DisplayFormat text={timeLeft?.minutes} label="minutes" />
      <div className="text-lg font-extrabold hidden md:block">:</div>
      <DisplayFormat text={timeLeft?.seconds} label="seconds" />
    </div>
  );
};

export default Countdown;
