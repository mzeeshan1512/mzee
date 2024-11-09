"use client"

const AboutMe = ({
  className,
  color,
  fill = "currentColor",
  height,
  strokeColor,
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 0,
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
      <title></title>
      <path d="M19.536 9.146c-1.373 0-2.133 1.014-2.294 2.116h4.608c-.125-1.05-.867-2.115-2.314-2.115m-2.26 3.617c.235 1.156 1.193 1.97 2.532 1.97.725 0 1.77-.27 2.384-.914l1.175 1.35c-1.064 1.11-2.653 1.426-3.74 1.426-2.64 0-4.697-1.906-4.697-4.606 0-2.535 1.894-4.62 4.57-4.62 2.585 0 4.5 1.98 4.5 4.604v.766h-6.723v.023zm-6.487 3.83v-5.69c0-.976-.435-1.536-1.338-1.536-.814 0-1.355.585-1.717 1.007v6.24h-2.35v-5.7c0-.976-.415-1.532-1.318-1.532-.813 0-1.375.586-1.717 1.006v6.24H0V7.505h2.35v1.15c.4-.463 1.302-1.26 2.71-1.26 1.247 0 2.096.526 2.477 1.59.524-.761 1.5-1.59 2.91-1.59 1.7 0 2.69 1.01 2.69 2.963v6.24h-2.353l.005-.007z"></path>
    </svg>
  );
};

const Project = ({
  className,
  color,
  fill = "currentColor",
  height,
  strokeColor,
  viewBox = "0 0 640 512",
  width,
  strokeWidth = 0,
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
      <path d="M384 320H256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM192 32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v128c0 17.67 14.33 32 32 32h95.72l73.16 128.04C211.98 300.98 232.4 288 256 288h.28L192 175.51V128h224V64H192V32zM608 0H480c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z"></path>
    </svg>
  );
};

const Service = ({
  className,
  color,
  fill = "none",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 2,
  onClick = () => {},
  size = 1,
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
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
      <path d="M13 15v-6l3 4l3 -4v6"></path>
    </svg>
  );
};

const Technology = ({
  className,
  color,
  fill = "currentColor",
  height,
  strokeColor = "currentColor",
  viewBox = "0 0 24 24",
  width,
  strokeWidth = 0,
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
      className={`cursor-pointer ${className ? className : ""}`}
      height={`${height ? height : size}em`}
      width={`${width ? width : size}em`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={role}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"></path>
    </svg>
  );
};

export { AboutMe, Project, Service, Technology};
