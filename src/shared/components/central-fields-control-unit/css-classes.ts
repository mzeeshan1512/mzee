import { InputProps } from "react-select";
import { CommonInputProps } from "@/shared/types/fields";

const getInputCssClass = ({
  inValid,
  disabled,
  isValid,
  type,
  inputCssClass,
}: InputProps & CommonInputProps) => {
  return `form-control border ${disabled ? "clr" : ""} ${
    type === "range"
      ? "form-range no-border no-focus"
      : type === "number"
      ? "hide-number-controls"
      : type === "textarea"
      ? "text-box-no-resize"
      : ""
  } ${inputCssClass ? inputCssClass : ""} ${
    inValid ? "is-invalid" : isValid ? "is-valid" : ""
  }`;
};

export { getInputCssClass };

