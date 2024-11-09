"use client";
import React, { useEffect, useState } from "react";
import { getGreetingAndDateTime } from "../utils/date";

const GreetingClock = () => {
  const [dateTime, setDateTime] = useState(getGreetingAndDateTime(true));

  useEffect(() => {
    const updateDateTime = () => setDateTime(getGreetingAndDateTime(true));

    // Update every second
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  return (
    <div className="flex-grow-1 d-flex flex-column">
      <div
        className="d-flex align-items-center flex-wrap justify-content-center"
        style={{
          gap: "4px 8px",
        }}
      >
        <h5
          style={{
            background: dateTime.color,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {dateTime.greeting},
        </h5>
        <h6
          className="text-gradient-effect m-0"
          style={{
            lineHeight: 1.3,
          }}
        >
          {dateTime.date}
        </h6>
        , {dateTime.time}
      </div>
    </div>
  );
};

export { GreetingClock };
