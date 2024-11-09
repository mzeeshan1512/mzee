import React from "react";
import { Props } from "./type";

const Row = ({
  lg,
  md,
  sm,
  children,
  onClick = () => {},
  onChange = () => {},
  className,
  styles,
  isRowCol,
}: Props) => {
  let stylesClass = `row${
    isRowCol
      ? `${lg ? ` row-cols-${lg}` : ""}${md ? ` row-cols-${md}` : ""}${
          sm ? ` row-cols-${sm}` : ""
        }`
      : `${lg ? ` row-${lg}` : ""}${md ? ` row-${md}` : ""}${
          sm ? ` row-${sm}` : ""
        }`
  } ${className ? className : ""}`;
  return (
    <div
      className={stylesClass}
      style={styles}
      onClick={onClick}
      onChange={onChange}
    >
      {children}
    </div>
  );
};

export default Row;
