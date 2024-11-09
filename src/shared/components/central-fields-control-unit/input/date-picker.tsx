import React from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Label from "../label";
import { CommonInputProps,  LabelProps } from "@/shared/types/fields";

const FormDatePicker = (
  props: DatePickerProps & CommonInputProps & LabelProps
) => {

  return (
    <>
      <Label {...props} />
      <DatePicker
        {...props}
        required={false}
        selected={props?.disabled ?null : props?.value?.date || props?.value}
        placeholderText={props.placeholder! || props.label!}
        calendarClassName="shadow" 
        className={`border rounded ${props?.isValid ? "is-valid" : props?.inValid ? "is-invalid" : ""}`}
        onChange={(date) => {
          if (props?.dateFormat) {
            props.onChange &&
              props.onChange({ date: date?.toISOString(), format: props?.dateFormat });
          } else {
            props.onChange && props.onChange(date?.toISOString());
          }
        }}
      />
    </>
  );
};

export default FormDatePicker;
