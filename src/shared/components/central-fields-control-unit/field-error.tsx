import React from "react";
import { errorObj, ErrorProps, inputType } from "@/shared/types/fields";
import ConditionalRenderer from "../conditional-renderer";

const ErrorMessage = ({
  errorCssClass,
  errorStyles,
  errorTag,
  message,
  type
}: ErrorProps & {
  type?:inputType
}) => {
  const Tag: any = errorTag ? errorTag : "span";
  const ErrorClass = (type==="password" ? "text-danger" : `text-danger`);
  return (
    <ConditionalRenderer condition={message}>
      <Tag
        className={`${ErrorClass} ${errorCssClass ? errorCssClass : ""}`}
        style={{ ...errorStyles }}
      >
        {message}
      </Tag>
    </ConditionalRenderer>
  );
};

const FieldError = (
  props: ErrorProps &
    errorObj & {
      name?: string;
      type?:inputType
    }
) => {
  const getErrorMessage=()=>{
    if(props?.error && Object?.keys( props?.error )?.length > 0){
      if(props?.isArray && props?.error?.message){
       return props?.error?.message?.split(".")[1] || props?.error?.message
      }
      if(props?.name! && props?.error[props?.name!] ){
        return props?.error[props?.name!]?.message
      }
      return null
    }
  }
  return (
    <>
      <ErrorMessage
        {...props}
        message={
          getErrorMessage()
        }
      /> 
    </>
  );
};

export {
  ErrorMessage
}

export default FieldError;
