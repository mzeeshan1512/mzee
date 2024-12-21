"use client"
import React, { useState } from "react";
import { Eye, EyeSlash } from "@/shared/icons/common";
import { CommonInputProps, InputProps, LabelProps } from "@/shared/types/fields";
import ConditionalRenderer from "../../conditional-renderer";
import { getInputCssClass } from "../css-classes";
import Label from "../label";

const Password = ({
  label,
  labelCssClass,
  labelStyle,
  showTick,
  disabled,
  inValid,
  isValid,
  inputStyles,
  inputCssClass,
  id,
  name,
  type,
  placeholder,
  value,
  required,
  onBlur = () => {},
  onChange = () => {},
}: InputProps & CommonInputProps & LabelProps) => {
  const [show, toggle] = useState<boolean>(false);

  return (
    <>
      <Label
        label={label}
        labelCssClass={labelCssClass}
        required={required}
        showTick={showTick}
        id={id}
        labelStyle={labelStyle}
      />
      <div className="d-flex justify-content-between align-items-center position-relative">
        <input
          id={id}
          type={
            disabled ? "password" : type === "password" && show ? "text" : type
          }
          name={name}
          className={getInputCssClass({
            inValid,
            disabled,
            isValid,
            type,
            inputCssClass
          })}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          style={inputStyles}
          onChange={onChange}
          onBlur={onBlur}
        />
        <ConditionalRenderer condition={type === "password" && !disabled}>
          <div
            className={`password-input ${
              isValid || inValid ? "right-adjustment" : ""
            }`}
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(!show);
            }}
          >
            <ConditionalRenderer condition={show} component={<Eye />}>
              <EyeSlash />
            </ConditionalRenderer>
          </div>
        </ConditionalRenderer>
      </div>
    </>
  );
};

export default Password;
