import React from "react";
import { Controller } from "react-hook-form";
import { FormProps } from "@/shared/types/fields";
import Input from ".";
import { validateDateFormat } from "@/shared/constants/regex";

const FormInput = ({
  callBack = () => {},
  getValues,
  progress,
  setValue,
  clearErrors,
  ...props
}: FormProps) => {
  const isInValid = () => {
    if (props?.error) {
      if (props?.isArray) {
        return props?.error?.ref?.name === props?.name ? true : false;
      }
      if (props?.dateFormat) {
        return props?.error[props?.name!] ||
          props?.error?.manualDateError?.[props?.name!]
          ? true
          : false;
      }
      return props?.error[props?.name!] ? true : false;
    }
    return false;
  };

  const formatDateInput = (e: any): string | void => {
    const format = props?.dateFormat ?? null;
    // clearErrors(`manualDateError`);
    if (clearErrors) {
      clearErrors();
    }
    props.controls?.clearErrors();
    if (format) {
      let input = e.target.value.replace(/[^0-9a-zA-Z]/g, "");
      let formattedValue = "";
      let currentIndex = 0;

      for (let i = 0; i < format.length; i++) {
        const formatChar = format[i];

        if (/[A-Za-z]/.test(formatChar)) {
          formattedValue += input[currentIndex] || "";
          currentIndex++;
        } else {
          formattedValue += formatChar;
        }

        if (currentIndex >= input.length) break;
      }

      const error = validateDateFormat(formattedValue, format);
      if (error?.errorMessage) {
        props?.control?.setError(`manualDateError.${props.name}`, {
          message: error.errorMessage
        });
      }

      return formattedValue;
    }
  };

  return (
    <Controller
      name={props?.name!}
      control={props?.control}
      defaultValue={props?.defaultValue}
      render={({ field }) => {
        return (
          <Input
            {...field}
            {...props}
            inValid={isInValid()}
            isValid={!isInValid() && !props?.disabled && field?.value}
            control={field}
            value={field?.value || ""}
            onChange={(e: any) => {
              const value = props.type === "date-time" ? formatDateInput(e) : e;
              field?.onChange(value);
              callBack(value);
            }}
          />
        );
      }}
    />
  );
};

export default FormInput;
