import React from "react";

const Spinner = ({
  type = "basic",
  size = 25,
  width,
  height,
  animationDuration = 0.7,
}: {
  type?: "email" | "two-color" | "basic" | "ben-loader" | "cloud-loader" | string;
  width?: string | number;
  height?: string | number;
  animationDuration?: string | number;
  size?:string | number
}) => {
  const className =
    type === "email"
      ? "email-success"
      : type === "cloud-loader"
      ? "cloud-loader"
      : type === "two-color"
      ? "two-color-spinner"
      : type === "ben-loader"
      ? "ben-loader"
      : "basic-spinner";
  return (
    <span
      className={`${className} m-2`}
      style={{
        width: `${width ? width:size}px`,
        height: `${height?height:size}px`,
        animationDuration: `${animationDuration}s`,
      }}
    ></span>
  );
};

export default Spinner;
