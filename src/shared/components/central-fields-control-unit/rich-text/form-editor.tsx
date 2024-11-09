import React from "react";
import { Controller } from "react-hook-form";
import { FormProps } from "@/shared/types/fields";
import FieldError from "../field-error";
import Label from "../label";
import RichTextEditor from ".";

const FormRichTextEditor = (props: FormProps) => {
  const isError = () => {
    return props.isArray
      ? props.error
        ? true
        : false
      : props?.error && props.error[props.name!]
      ? true
      : false;
  };

  return (
    <>
      <Label {...props} />
      <Controller
        name={props?.name!}
        control={props?.control}
        defaultValue={props?.defaultValue}
        render={({ field }) => {
          let value =
          props?.control?._formValues?.[props?.name!]
          if(value && props.parsedHtml){
            value = atob(value)
          }
          return (
            <>
              <RichTextEditor
                {...field}
                {...props}
                value={value}
                onChange={(data: string) => {
                  let e = data;
                  if (data === "<p><br></p>") {
                    e = "";
                  }else if(props.parsedHtml){
                    e= btoa(data)
                  }
                  if (props.callBack) {
                    props.callBack(e);
                  }
                  field!.onChange!(e);
                }}
                inValid={isError()}
                isValid={!isError() && field?.value}
              />
              <FieldError {...props} />
            </>
          );
        }}
      />
    </>
  );
};

export default FormRichTextEditor;
