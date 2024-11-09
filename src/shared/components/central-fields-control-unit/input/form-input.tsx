import React from "react";
import { Controller } from "react-hook-form";
import { FormProps } from "@/shared/types/fields";
import Input from ".";

const FormInput = ({ callBack=()=>{},getValues,progress,setValue,clearErrors,...props}: FormProps) => {
  const isInValid = () => {
    if (props?.error) {
      if (props?.isArray) {
        return props?.error?.ref?.name === props?.name ? true : false;
      }
      return props?.error[props?.name!] ? true : false;
    }
    return false;
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
            isValid={
              !isInValid() && !props?.disabled && field?.value
            }
            control={field}
            value={field?.value || ""}
            onChange={(e: any) => {
              field?.onChange(e);
             callBack(e);
            }}
            onBlur={field?.onBlur}
          />
        );
      }}
    />
  );
};

export default FormInput;
