import React from "react";

type svgProp = React.ComponentProps<"svg">;

const MenuToggler = ({
  fill = "currentColor",
  height,
  viewBox = "0 0 24 24",
  width = 25,
  strokeWidth = 0,
  ...rest
}: svgProp) => {
  return (
    <svg
      {...rest}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      height={height?.toString() || width?.toString()}
      width={width?.toString() || height?.toString()}
    >
      <path d="M21 17.9995V19.9995H3V17.9995H21ZM17.4038 3.90332L22 8.49951L17.4038 13.0957L15.9896 11.6815L19.1716 8.49951L15.9896 5.31753L17.4038 3.90332ZM12 10.9995V12.9995H3V10.9995H12ZM12 3.99951V5.99951H3V3.99951H12Z"></path>
    </svg>
  );
};

const Cross = ({
  fill = "currentColor",
  height,
  viewBox = "0 0 24 24",
  width = 25,
  strokeWidth = 0,
  ...rest
}: svgProp) => {
  return (
    <svg
      {...rest}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      height={height?.toString() || width?.toString()}
      width={width?.toString() || height?.toString()}
    >
      <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
    </svg>
  );
};

const ChevronIcon = ({
  fill = "currentColor",
  height,
  viewBox = "0 0 185.343 185.343",
  width = 15,
  strokeWidth = 0,
  ...rest
}: svgProp) => {
  return (
    <svg
      {...rest}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      height={height?.toString() || width?.toString()}
      width={width?.toString() || height?.toString()}
    >
      <g>
        <g>
          <path
            d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175
			l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934
			c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"
          />
        </g>
      </g>
    </svg>
  );
};

export { MenuToggler, Cross, ChevronIcon };
