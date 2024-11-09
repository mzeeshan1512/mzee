import { CSSProperties, ReactNode } from "react";

export type Props = {
  lg?: string | number;
  md?: string | number;
  sm?: string | number;
  children?: ReactNode;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  className?: string;
  isRowCol?: boolean;
  cols?: string | number;
  dataAos?: string,
  dataAosDuration?: string,
  dataAosEasing?: string,
  styles?:CSSProperties
};
