import React from "react";
import { Props } from "./type";

const Col = ({
  lg,
  md,
  sm,
  children,
  onClick = () => {},
  onChange = () => {},
  className,
  styles,
  isRowCol = false,
  cols,
  dataAos,
  dataAosDuration,
  dataAosEasing,
}: Props) => {
  let stylesClass = `${!lg && !md && !sm ? "col" : ""}${
    cols ? ` col-${cols}` : ""
  }${sm ? ` col-sm-${sm}` : ""}${md ? ` col-md-${md}` : ""}${lg ? ` col-lg-${lg}` : ""} ${className ? className : ""}`;

  return (
    <div
      className={stylesClass}
      style={styles}
      onClick={onClick}
      onChange={onChange}
      data-aos={dataAos}
      data-aos-duration={dataAosDuration}
      data-aos-easing={dataAosEasing}
    >
      {children}
    </div>
  );
};

export default Col;
