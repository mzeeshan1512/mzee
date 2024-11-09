"use client";
const Cross = ({
  className,
  color,
  fill = "currentColor",
  height,
  strokeColor,
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 25,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill || color}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={`cursor-pointer ${className ? className : ""}`}
      height={height?.toString() || size?.toLocaleString()}
      width={width?.toString() || size?.toLocaleString()}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
    </svg>
  );
};

const MenuToggler = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor,
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 25,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill || color}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={height?.toString() || size?.toLocaleString()}
      width={width?.toString() || size?.toLocaleString()}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M21 17.9995V19.9995H3V17.9995H21ZM17.4038 3.90332L22 8.49951L17.4038 13.0957L15.9896 11.6815L19.1716 8.49951L15.9896 5.31753L17.4038 3.90332ZM12 10.9995V12.9995H3V10.9995H12ZM12 3.99951V5.99951H3V3.99951H12Z"></path>
    </svg>
  );
};

const SendButton = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor,
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 25,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill || color}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={height?.toString() || size?.toLocaleString()}
      width={width?.toString() || size?.toLocaleString()}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
    </svg>
  );
};

const Left = ({
  className = "",
  color,
  fill = "none",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 2,
  onClick = () => {},
  size = 25,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || color || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={height?.toString() || size?.toLocaleString()}
      width={width?.toString() || size?.toLocaleString()}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
};

const Right = ({
  className = "",
  color,
  fill = "none",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 2,
  onClick = () => {},
  size = 25,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || color || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={height?.toString() || size?.toLocaleString()}
      width={width?.toString() || size?.toLocaleString()}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

const Eye = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 576 512",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 1,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || color || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
    </svg>
  );
};

const EyeSlash = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 640 512",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 1,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || color || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
    </svg>
  );
};

const BorderPlus = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 448 512",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 1,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || color || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
    </svg>
  );
};

const Trash = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 448 512",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 1,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || color || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
    </svg>
  );
};

const Reset = ({
  className,
  color,
  fill = "none",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 2,
  onClick = () => {},
  size = 20,
  role,
  strokeLinecap = "round",
  strokeLinejoin = "round",
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill || color}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={`cursor-pointer ${className ? className : ""}`}
      height={height?.toString() || size?.toLocaleString()}
      width={width?.toString() || size?.toLocaleString()}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
    >
      <polyline points="1 4 1 10 7 10"></polyline>
      <polyline points="23 20 23 14 17 14"></polyline>
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
    </svg>
  );
};

const Save = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 448 512",
  width,
  strokeWidth = 2,
  onClick = () => {},
  size = 1,
  role,
  strokeLinecap,
  strokeLinejoin,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill || color}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
    >
      <path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"></path>
    </svg>
  );
};

const BorderMinus = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 448 512",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 1,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || color || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={className}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M108 284c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v32c0 6.6-5.4 12-12 12H108zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
    </svg>
  );
};

const Warning = ({
  className = "",
  color,
  fill = "none",
  height = 6,
  strokeColor,
  viewBox = "0 0 22.085 18.939",
  width = 8,
  strokeWidth,
  onClick = () => {},
  size,
  strokeLinecap,
  strokeLinejoin,
  role,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill || color}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={`cursor-pointer ${className ? className : ""}`}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
    >
      <g id="noun-error-1151606" transform="translate(0)">
        <path
          id="Path_7790"
          data-name="Path 7790"
          d="M125.881,78.39a1.258,1.258,0,0,0-1.007.6l-9.823,16.552a1.209,1.209,0,0,0,.009,1.193,1.252,1.252,0,0,0,1.062.6h19.627a1.28,1.28,0,0,0,1.072-.6,1.187,1.187,0,0,0,0-1.193L127,78.986a1.273,1.273,0,0,0-1.118-.6Zm.056,5a1.313,1.313,0,0,1,1.314,1.314l-.261,4.734a1.053,1.053,0,1,1-2.106,0l-.261-4.734a1.313,1.313,0,0,1,1.314-1.314Zm0,7.894a1.58,1.58,0,1,1-1.575,1.575A1.581,1.581,0,0,1,125.937,91.28Z"
          transform="translate(-114.899 -78.389)"
        />
      </g>
    </svg>
  );
};

const Upload = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 50,
  strokeLinecap,
  strokeLinejoin,
  role,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill || color}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={`cursor-pointer ${className ? className : ""}`}
      height={`${height ? height : size}`}
      width={`${width ? width : size}`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
    </svg>
  );
};

const Done = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 1,
  strokeLinecap,
  strokeLinejoin,
  role,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      color={color}
      className={`cursor-pointer ${className ? className : ""}`}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      style={{ color: color ? color : "" }}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
    </svg>
  );
};

const ContactMessages = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 1,
  strokeLinecap,
  strokeLinejoin,
  role,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      color={color}
      className={`cursor-pointer ${className ? className : ""}`}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      style={{ color: color ? color : "" }}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M21 8V7l-3 2-3-2v1l3 2 3-2zm1-5H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm8-6h-8V6h8v6z"></path>
    </svg>
  );
};

const History = ({
  className = "",
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 1,
  strokeLinecap,
  strokeLinejoin,
  role,
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      color={color}
      className={`cursor-pointer ${className ? className : ""}`}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      style={{ color: color ? color : "" }}
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"></path>{" "}
    </svg>
  );
};

const SettingIcon = ({
  className,
  color,
  fill = "currentColor",
  height,
  strokeColor,
  viewBox = "0 0 512 512",
  width,
  strokeWidth = 0,
  onClick = () => {},
  size = 1.3,
  role = "img",
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill || color}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={`cursor-pointer ${className ? className : ""}`}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
    >
      <path d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z" />
    </svg>
  );
};

const EditIcon = ({
  className,
  color,
  fill = "currentColor",
  strokeColor,
  width,
  height,
  viewBox = "0 0 24 24",
  strokeWidth,
  onClick = () => {},
  size = 1,
  role = "img",
}: IconProps) => {
  return (
    <svg
      stroke={strokeColor || fill || color}
      fill={fill}
      strokeWidth={strokeWidth?.toString()}
      viewBox={viewBox}
      className={`cursor-pointer ${className ? className : ""}`}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
    >
      <path
        d="M3 21h3.75L17.81 9.94l-3.75-3.75L3 17.25V21zM22.41 5.34l-3.75-3.75a1.001 1.001 0 00-1.41 0L15 4.84l3.75 3.75 3.66-3.66a1.001 1.001 0 000-1.41z"
        fill={fill}
      />
    </svg>
  );
};

export {
  Cross,
  MenuToggler,
  SendButton,
  Left,
  Right,
  Eye,
  EyeSlash,
  BorderPlus,
  Trash,
  Reset,
  Save,
  BorderMinus,
  Warning,
  Upload,
  Done,
  ContactMessages,
  History,
  SettingIcon,
  EditIcon,
};
