import React from "react";

interface FloatingInputProps extends React.ComponentProps<"div"> {
  label: string;
  isValid?: boolean;
  isInvalid?: boolean;
  error?: any;
  inputProps?: React.ComponentProps<"input">;
  textAreaProps?: React.ComponentProps<"textarea">;
  isTextBox?: boolean;
}

const FloatingOutlinedInput = ({
  label,
  isValid,
  isInvalid,
  id,
  error,
  inputProps,
  textAreaProps,
  isTextBox,
  ...rest
}: FloatingInputProps) => {
  const validationClass = React.useMemo(() => {
    if (isInvalid) {
      return {
        input: "!border-red-500 focus:!ring-red-500 focus:!border-red-500",
        label: "!text-red-500"
      };
    } else if (isValid) {
      return {
        input:
          "!border-green-500 focus:!ring-green-500 focus:!border-green-500",
        label: "!text-green-500"
      };
    }
  }, [isInvalid, isValid]);

  return (
    <div {...rest}>
      <div
        className={
          "relative rounded shadow-[0_0_1px_0px_rgba(0,0,0,0.4)] dark:shadow-[0_0_1px_0px_rgba(255,255,255,0.4)] "
        }
      >
        {isTextBox ? (
          <textarea
            {...textAreaProps}
            id={id}
            placeholder={/* textAreaProps?.placeholder || label || */ ""}
            className={
              "block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-inherit border-0 border-b-2 border-gray-100  dark:border-gray-600 appearance-none dark:text-white dark:focus:border-secondary-500 focus:outline-none focus:ring-0 focus:border-secondary-600 peer " +
              validationClass?.input +
              " " +
              textAreaProps?.className
            }
          />
        ) : (
          <input
            {...inputProps}
            id={id}
            placeholder={/* inputProps?.placeholder || label || */ ""}
            className={
              "rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-inherit border-0 border-b-2 border-gray-100  dark:border-gray-600 appearance-none dark:text-white dark:focus:border-secondary-500 focus:outline-none focus:ring-0 focus:border-secondary-600 peer " +
                validationClass?.input ||
              "" + " " + inputProps?.className ||
              ""
            }
          />
        )}
        <label
          htmlFor={id}
          className={
            "capitalize absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary-500 " +
              validationClass?.label || ""
          }
        >
          {label}
        </label>
      </div>
      {error && <small className="text-red-400 text-sm">{error}</small>}
    </div>
  );
};

export { FloatingOutlinedInput };
