"use client";
import React, { useCallback } from "react";
import {
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "@/shared/firebase-services/mutations";
import { getSafeArrayValue } from "@/shared/utils/common";
import ScreenLoader from "@/shared/components/loaders-spinners/screen-loader";
import { getDataKeyObjectFromArray } from "@/shared/utils/array-data";
import { Col, Row } from "@/shared/components/row-cols";
import IconLabel from "@/shared/components/icon-label";
import Button from "@/shared/components/button";
import { Field, SubmitFormButton } from "./components";
import { formFieldsList, HookFormProps } from "../types/fields";

/**
 * Renders a form for creating or editing data in the admin panel.
 *
 * @component
 * @param {HookFormProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */

const FieldArrayForm = ({
  collectionId,
  fieldsList,
  formId,
  validationSchema,
  defaultValues,
  formClassName = "",
  fieldArrayName = "",
  formRowClassName = "",
  isInProcess,
  dataId,
  showSubmitFormButton,
  onSaveCallBack,
}: HookFormProps & {
  validationSchema?: any;
}) => {
  const { isLoading: isProcessing, mutate } = usePostData(collectionId);

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    clearErrors,
  } = useForm({
    mode: "onChange",
    resolver: validationSchema && yupResolver(validationSchema),
    defaultValues: defaultValues || {
      [`${fieldArrayName}`]: [getDataKeyObjectFromArray(fieldsList, "name")],
    },
  });

  const { isSubmitting, submitCount } = useFormState({ control });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: fieldArrayName!,
  });

  const watchedAllFields = useWatch({
    control,
    name: fieldArrayName!,
  });

  const onSubmit = async (data: any) => {
    if (!isSubmitting) {
      if (onSaveCallBack) {
        onSaveCallBack(data);
      } else {
        mutate({
          collectionId: collectionId,
          fieldArrayName: fieldArrayName,
          dataId: dataId,
          data,
        });
      }
    }
  };

  const handleRemove = (id: any) => {
    if (fields.length > 1) {
      remove(id);
    } else {
      reset({
        [`${fieldArrayName}`]: [getDataKeyObjectFromArray(fieldsList, "name")],
      });
    }
  };

  const getErrorObject = useCallback(
    (props: formFieldsList) => {
      let error: any = errors;
      error = getSafeArrayValue(
        errors?.[`${fieldArrayName}`],
        props.index!,
        null
      );
      if (error) error = error[props?.name!];
      return error;
    },
    [errors, fieldArrayName]
  );

  const handleCallBack = (item: formFieldsList, index: number) => {
    if (item?.impactedKey) {
      const c_item = watchedAllFields?.[index!];
      let value = !c_item?.[item?.name!];
      if (typeof value === "boolean") {
        value = !!value;
      }
      const updatedObj = {
        ...c_item,
        [item?.impactedKey?.key]:
          item?.impactedKey?.value || item?.impactedKey?.fieldKey!
            ? getValues(item?.impactedKey?.fieldKey!)
            : "",
        [item.name!]: value,
        impactedKey: item?.impactedKey || null,
        fieldIndex: index,
      };
      clearErrors(`${fieldArrayName}[${index}]?.${item?.impactedKey?.key}`);
      update(index!, updatedObj);
    }
  };

  const renderFields = useCallback(
    (item: formFieldsList, fieldIndex: number, field: any) => {
      const obj = watchedAllFields?.[fieldIndex!];
      let isDisabled: any = false;
      if (
        obj &&
        item?.name === obj?.impactedKey?.key &&
        obj.hasOwnProperty(item?.watchedKey) &&
        obj[item?.watchedKey!]
      ) {
        isDisabled = obj.impactedKey.isDisabled;
      }
      return (
        <Field
          {...item}
          isArray={true}
          control={control}
          disabled={isDisabled || item?.disabled || isSubmitting}
          error={getErrorObject({ ...item, index: fieldIndex })}
          callBack={() => handleCallBack(item, fieldIndex)}
          name={`${fieldArrayName}[${fieldIndex}].${item?.name}`}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [control, getErrorObject, handleCallBack]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${formClassName} position-relative`}
        autoComplete="off"
        id={showSubmitFormButton ? "" : formId}
      >
        <div className="max-form-table-h-scroll my-4">
          {fields?.map((field: any, index: number) => {
            return (
              <Row
                key={field.id}
                className={`my-3 even-odd-bg align-items-baseline mx-0 me-1 border border-secondary rounded p-2 ${formRowClassName}`}
              >
                {Array.isArray(fieldsList) &&
                  fieldsList?.map((item, fieldIndex) => (
                    <Col lg={item?.col || ""} key={fieldIndex} className="my-2">
                      {renderFields(item, index, field)}
                    </Col>
                  ))}
                <Col className="my-2">
                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={() => handleRemove(index)}
                      variant="danger"
                    >
                      <IconLabel icon="remove" title="Remove Item" />
                    </Button>
                  </div>
                </Col>
              </Row>
            );
          })}
        </div>
        <div className="d-flex justify-content-end mt-2 gap-1">
          <Button
            onClick={() => {
              append(getDataKeyObjectFromArray(fieldsList, "name"));
            }}
            outline
          >
            <IconLabel icon="add" title="Add New Entry" />
          </Button>

          <SubmitFormButton
            callBack={handleSubmit(onSubmit)}
            showSubmitFormButton={showSubmitFormButton}
          />
        </div>
      </form>
      <ScreenLoader loading={isProcessing || isInProcess!} />
    </>
  );
};

export default React.memo(FieldArrayForm);