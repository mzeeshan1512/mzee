import React from "react";
import { Done } from "@/shared/icons/common";
import { CommonInputProps, LabelProps } from "@/shared/types/fields";
import ConditionalRenderer from "../conditional-renderer";

const RequiredLabel = ({
  title,
  required,
  showTick,
}: {
  title: string;
  required?: boolean;
  showTick?: boolean;
}) => {
  return (
    <span className="d-flex gap-1">
      {title}
      <ConditionalRenderer condition={required}>
        <span className="text-danger">*</span>
      </ConditionalRenderer>
      <ConditionalRenderer condition={showTick}>
        <Done color="green" />
      </ConditionalRenderer>
    </span>
  );
};

const Label = ({
  label,
  labelStyle,
  labelCssClass,
  id,
  required,
  showTick,
  CallBackComponent,
}: LabelProps & CommonInputProps) => {
  return (
    <ConditionalRenderer condition={label}>
      <div className="d-flex justify-content-between">
        <label
          htmlFor={id}
          className={"text-clamp-size" +(labelCssClass ? labelCssClass : "")}
          style={labelStyle}
        >
          <RequiredLabel
            title={label!}
            required={required}
            showTick={showTick}
          />
        </label>
        <ConditionalRenderer condition={CallBackComponent}>
          {CallBackComponent}
        </ConditionalRenderer>
      </div>
    </ConditionalRenderer>
  );
};

export { RequiredLabel };
export default Label;
