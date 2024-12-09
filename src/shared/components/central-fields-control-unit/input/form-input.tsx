import React from "react";
import { Controller } from "react-hook-form";
import { FormProps, DateFormat } from '@/shared/types/fields';
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

  const formatDateInput = (e:any):string=>{
    const format = props.DateFormat;
   let input = e.target.value.replace(/[^0-9a-zA-Z]/g, '');

    let formattedValue = '';
    let currentIndex = 0;

    for (let i = 0; i < format.length; i++) {
      if (/[A-Za-z]/.test(format[i])) {
        formattedValue += input[currentIndex] || '';
        currentIndex++;
      } else {
        formattedValue += format[i];
      }
      if (currentIndex >= input.length) break;
    }
    return formattedValue
  }

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
              const value = props.type==="date-time" ?formatDateInput(e) :e
              field?.onChange(value);
             callBack(value);
            }}
            onBlur={field?.onBlur}
          />
        );
      }}
    />
  );
};

export default FormInput;
