import React from "react";
import { CommonInputProps, InputProps, LabelProps } from "@/shared/types/fields";
import Label from "../label";

const FileInput = (props: LabelProps & InputProps & CommonInputProps) => {
  return (
    <>
      <Label {...props} />
      <label
        className={`d-flex border rounded cursor-pointer position-relative w-full ${
          props.inValid ? "is-invalid" : ""
        }  ${props.isValid ? "is-valid" : ""} ${
          props.disabled ? "disabled cursor-none" : ""
        } ${props?.inputCssClass ?props?.inputCssClass :""} `}
        htmlFor={props.id || props.name}
        style={props.inputStyles}
      >
        <span className="p-2 bg-primary rounded-start-2 text-white">
          Choose File
        </span>
        <span className={`p-2 flex-grow-1 flex-shrink-2 text-secondary clr`}>
          {props?.value || "No file Chosen."}
        </span>
        <input
          type="file"
          className="position-absolute -z-10"
          id={props.id || props.name}
          name={props.name}
          onChange={props.onChange}
          onBlur={props.onBlur}
          accept={props.accept}
          multiple={props.multiple}
          disabled={props.disabled}
        />
      </label>
    </>
  );
};

export default FileInput;
