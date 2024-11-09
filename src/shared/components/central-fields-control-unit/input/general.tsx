import React from "react";
import {
  CommonInputProps,
  InputProps,
  LabelProps,
} from "@/shared/types/fields";
import ConditionalRenderer from "../../conditional-renderer";
import { getInputCssClass } from "../css-classes";
import Label from "../label";

const GeneralInput = ({
  inputCssClass,
  inputStyles,
  label,
  labelCssClass,
  labelStyle,
  showTick,
  radioCheckLabelPlacement,
  CallBackComponent,
  type,
  placeholder,
  floatingLabels,
  defaultValue,
  formGroupClass,
  isValid,
  inValid,
  error,
  ...props
}: InputProps & CommonInputProps & LabelProps) => {
  let Tag: any = type === "textarea" ? "textarea" : "input";
  return (
    <>
      <ConditionalRenderer condition={!floatingLabels}>
        <Label
          {...props}
          {...{
            label,
            labelCssClass,
            labelStyle,
            showTick,
            radioCheckLabelPlacement,
            CallBackComponent,
          }}
        />
      </ConditionalRenderer>
      <Tag
        {...props}
        type={type}
        required={false}
        styles={props.inputStyles}
        className={getInputCssClass({ ...props, inputCssClass })}
        placeholder={
          floatingLabels ? label || placeholder : placeholder || label
        }
      />

      <ConditionalRenderer condition={floatingLabels}>
        <Label
          {...props}
          {...{
            label,
            labelCssClass,
            labelStyle,
            showTick,
            radioCheckLabelPlacement,
            CallBackComponent,
          }}
        />
      </ConditionalRenderer>
    </>
  );
};

export default GeneralInput;
