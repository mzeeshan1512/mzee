import React, { CSSProperties } from "react";
import ConditionalRenderer from "./conditional-renderer";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <ConditionalRenderer condition={progress >= 0}>
      <div className="progress my-2">
        <ConditionalRenderer
          condition={progress}
          component={<p className="text-center w-full">Nothing added</p>}
        >
          <div
            className={`progress-bar progress-bar-striped progress-bar-animated bg-success`}
            role="progressbar"
            style={{
              width: `${progress}%`,
              opacity: `${progress}%`,
            }}
          >
            {progress}%
          </div>
        </ConditionalRenderer>
      </div>
    </ConditionalRenderer>
  );
};

type CircularProgressBarConfig = {
  progress?: number;
  width?: number;
  height?: number;
  borderWidth?: number;
  bgColor?: string;
  fillColor?: string;
  textColor?: string;
};

const CircularProgressBar = ({
  progress = 0,
  width = 100,
  height = 100,
  borderWidth = 10,
  fillColor,
  bgColor,
  textColor,
}: CircularProgressBarConfig) => {
  const halfWidth = width / 2;
  const circleRadius = halfWidth - borderWidth;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress">
      <div
        className="circular-progress-container"
        style={
          {
            "--width": `${width}px`,
            "--height": `${height}px`,
            "--border-width": `${borderWidth}px`,
            "--bg-color": bgColor,
            "--fill-color": fillColor,
            "--text-color": textColor,
          } as CSSProperties
        }
      >
        <svg
          className="circular-progress"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <circle
            className="progress-bg"
            cx={halfWidth}
            cy={halfWidth}
            r={circleRadius}
          />
          <circle
            className="progress-bar"
            cx={halfWidth}
            cy={halfWidth}
            r={circleRadius}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="progress-text clr" style={{ fontSize: `${width / 5}px` }}>
          {`${progress}%`}
        </div>
      </div>
    </div>
  );
};

export { CircularProgressBar };

export default ProgressBar;
