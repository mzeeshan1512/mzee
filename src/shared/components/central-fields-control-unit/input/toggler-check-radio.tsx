import React from "react";
import { CommonInputProps, InputProps, LabelProps } from "@/shared/types/fields";
import ConditionalRenderer from "../../conditional-renderer";
import Label from "../label";

const Toggler = (props: InputProps & CommonInputProps) => {
  return (
    <div className="switch-wrapper-51">
      <input
        type="checkbox"
        id={props?.id || props?.name!}
        name={props.name!}
        onChange={props.onChange}
        onBlur={props.onBlur}
        checked={props.value }
        disabled={props?.disabled}
      />
      <label htmlFor={props?.id || props?.name!} className="toggle">
        <span style={{
          opacity:props?.disabled ? 0.3 :1
        }}>
          <svg width="10px" height="10px" viewBox="0 0 10 10">
            <path d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"></path>
          </svg>
        </span>
      </label>
    </div>
  );
};

const CheckBox = ({
  id,
  name,
  value,
  onChange = () => {},
  onBlur = () => {},
  disabled=false
}: InputProps & CommonInputProps) => {
  return (
    <div className="custom-checkbox">
      <input
        type="checkbox"
        id={id || name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        checked={value}
        disabled={disabled}
      />
      <label htmlFor={id || name} className="check">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
    </div>
  );
};

const Radio = (props: InputProps & CommonInputProps) => {
  return (
    <div className="radio-container">
      <input
        type="radio"
        id={props?.id || props?.name}
        name={props?.name}
        onChange={props?.onChange}
        onBlur={props?.onBlur}
        checked={props?.value}
        disabled={props?.disabled}
      />
      <Label {...props} />
    </div>
  );
};

const RadioCheckToggler = (
  props: InputProps & CommonInputProps & LabelProps
) => {
  return (
    <ConditionalRenderer
      condition={props?.type !== "radio"}
      component={<Radio {...props} />}
    >
      <div className="d-flex gap-4">
        <ConditionalRenderer
          condition={props?.radioCheckLabelPlacement === "left"}
        >
          <Label {...props} />
        </ConditionalRenderer>
        <ConditionalRenderer condition={props?.type === "switch"}>
          <Toggler {...props} />
        </ConditionalRenderer>
        <ConditionalRenderer condition={props?.type === "checkbox"}>
          <CheckBox {...props} />
        </ConditionalRenderer>

        <ConditionalRenderer
          condition={props?.radioCheckLabelPlacement === "right"}
        >
          <Label {...props} />
        </ConditionalRenderer>
      </div>
    </ConditionalRenderer>
  );
};

export {
  Toggler,
  CheckBox, 
  Radio
}

export default RadioCheckToggler;
