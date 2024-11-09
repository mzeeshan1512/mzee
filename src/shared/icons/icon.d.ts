type IconProps = {
  color?: string;
  fill?: string;
  strokeColor?: string;
  role?: string;
  strokeLinecap?:  "round" | "butt" | "square" | "inherit" | undefined;
  strokeLinejoin?: "round" | "inherit" | "miter" | "bevel" | undefined;
  viewBox?: string;
  className?: string;
  strokeWidth?: number;
  height?: number;
  width?: number;
  size?: number;
  onClick?: (e?: any) => void | {};
};
