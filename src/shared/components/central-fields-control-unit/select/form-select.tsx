import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { FormProps } from "@/shared/types/fields";
import {
  commonTheme,
  commonStyles,
  disabledStyles,
} from "@/shared/components/central-fields-control-unit/select/react-style";
import FieldError from "../field-error";
import Label from "../label";

const FormSelect = (props: FormProps) => {
  const isError = () => {
    return props.isArray
      ? props.error
        ? true
        : false
      : props?.error && props.error[props.name!]
      ? true
      : false;
  };
  const styles = {
    ...commonStyles,
    ...props.selectStyles,
  };
  return (
    <div className="d-flex flex-column gap-1">
      <Label {...props} />
      <Controller
        name={props?.name!}
        control={props?.control}
        render={({ field }) => {
          return props?.isCreatable ? (
            <CreatableSelect
              {...field}
              {...field}
              options={props?.options}
              theme={commonTheme}
              classNamePrefix={` ${
                props.selectCssClass ? props.selectCssClass : ""
              } ${
                props?.disabled
                  ? "clr"
                  : isError()
                  ? "select-invalid"
                  : field?.value
                  ? "select-valid"
                  : ""
              } `}
              isMulti={props.isMulti}
              menuPlacement={props.menuPlacement}
              isClearable={props.isClearable}
              styles={
                props?.disabled
                  ? { ...styles, ...disabledStyles }
                  : { ...styles }
              }
              placeholder={props.placeholder}
              onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(e));
                if (props?.isMulti) {
                  temp = e.map((item: selectObject) => ({
                    value: item.value,
                    label: item?.label
                  }));
                } else {
                  temp = { value: e.value, label: e?.label };
                }
                if (props.callBack && temp) {
                 
                    props.callBack(temp);
                }
                field.onChange(temp);
              }}
              isDisabled={props?.disabled}
              components={{ ...props?.customComponent }}
              menuPortalTarget={document.body}
            />
          ) : (
            <Select
              {...field}
              options={props?.options}
              theme={commonTheme}
              classNamePrefix={` ${
                props.selectCssClass ? props.selectCssClass : ""
              } ${
                props?.disabled
                  ? "clr"
                  : isError()
                  ? "select-invalid"
                  : field?.value
                  ? "select-valid"
                  : ""
              } `}
              isMulti={props.isMulti}
              menuPlacement={props.menuPlacement}
              isClearable={props.isClearable}
              styles={
                props?.disabled
                  ? { ...styles, ...disabledStyles }
                  : { ...styles }
              }
              placeholder={props.placeholder}
              onChange={(e) => {
                if (props.callBack && e) {
                  props.callBack(e);
                }
                field.onChange(e);
              }}
              isDisabled={props?.disabled}
              components={{ ...props?.customComponent }}
              menuPortalTarget={document.body}
            />
          );
        }}
      />
      <FieldError {...props} />
    </div>
  );
};

export default FormSelect;
