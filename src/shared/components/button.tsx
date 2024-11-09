"use client";
import React, { useContext } from "react";
import Spinner from "./loaders-spinners/spinner";
import ConditionalRenderer from "./conditional-renderer";
import { LayoutThemeContext } from "../context";

const Button = ({
  className,
  type = "button",
  outline = false,
  disabled = false,
  loading = false,
  variant = "primary",
  onClick = () => {},
  onSubmit = () => {},
  color,
  style,
  Loader,
  formId = null,
  children,
}: ButtonProps & {
  children?: React.ReactNode;
}) => {
  const globalContext = useContext(LayoutThemeContext);
  const class_Name = `d-flex justify-content-center align-items-center btn ${
    outline
      ? `btn-outline-${variant.toLowerCase()}`
      : `btn-${variant.toLowerCase()}`
  } ${color ? color : ""} ${className ? className : ""} hover ms-0`;
  return (
    <button
      className={class_Name}
      style={style}
      type={type}
      disabled={globalContext?.disabled || disabled || loading}
      onClick={onClick}
      onSubmit={onSubmit}
      form={formId!}
    >
      <ConditionalRenderer
        condition={globalContext?.disabled || loading}
        component={
          <ConditionalRenderer condition={children}>
            {children}
          </ConditionalRenderer>
        }
      >
        <ConditionalRenderer
          condition={Loader}
          component={<Spinner height={25} width={25} />}
        >
          {Loader}
        </ConditionalRenderer>
      </ConditionalRenderer>
    </button>
  );
};

export default Button;
