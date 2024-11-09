"use client";
import React, { useMemo } from "react";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "@/shared/firebase-services/mutations";
import { getSafeArrayValue } from "@/shared/utils/common";
import ScreenLoader from "@/shared/components/loaders-spinners/screen-loader";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import { getDataKeyObjectFromArray } from "@/shared/utils/array-data";
import { Col, Row } from "@/shared/components/row-cols";
import IconLabel from "@/shared/components/icon-label";
import { Trash } from "@/shared/icons/common";
import Button from "@/shared/components/button";
import {Field, SubmitFormButton } from "./components";
import { formFieldsList, HookFormProps } from "../types/fields";

/**
 * Renders a form for creating or editing data in the admin panel.
 *
 * @component
 * @param {HookFormProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */

const AllInOneForm = ({
  collectionId,
  fieldsList,
  formId,
  formClassName = "",
  fieldArrayName = "",
  formRowClassName = "",
  validationSchema,
  defaultValues = {},
  formType = "field-form",
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
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: validationSchema && yupResolver(validationSchema),
    defaultValues:
      defaultValues || fieldArrayName
        ? {
            [`${fieldArrayName}`]: [
              getDataKeyObjectFromArray(fieldsList, "name"),
            ],
          }
        : getDataKeyObjectFromArray(fieldsList, "name") || {},
  });
  const { isSubmitting, submitCount } = useFormState({ control });

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName!,
  });

  /**
   * Returns the header array for the tabular view.
   * The header array includes the "SR#", field names, and "Action" column.
   * If tabularView is false, an empty array is returned.
   *
   * @returns The tabular view header array.
   */
  const tabularViewHeader: string[] | any[] = useMemo(() => {
    if (formType === "tabular-form" && Array.isArray(fieldsList) ) {
      return ["SR#", ...fieldsList?.map((item) => item?.name), "Action"];
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formType === "tabular-form"]);

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

  const renderAppend = () => {
    return (
      <div className="d-flex justify-content-end mt-2">
        <Button
          onClick={() => {
            const t = getDataKeyObjectFromArray(fieldsList, "name");
            append(t);
          }}
        >
          <IconLabel icon="add" title="Add Item" />
        </Button>
      </div>
    );
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

  /**
   * Retrieves the error object for a given form field.
   * @param props - The form field properties.
   * @returns The error object for the form field.
   */
  const getErrorObject = (props: formFieldsList) => {
    let error: any = errors;
    if (fieldArrayName) {
      error = getSafeArrayValue(
        errors?.[`${fieldArrayName}`],
        props.index!,
        null
      );
      if (error) error = error[props?.fieldName!];
    }
    return error;
  };

  /**
   * Renders the fields for the form.
   * @param item - The formFieldsList item.
   * @returns The rendered fields.
   */
  const renderFields = (item: formFieldsList) => {
    return (
      <Field
        {...item}
        error={getErrorObject(item)!}
        control={control}
        isArray={fieldArrayName! || formType === "tabular-form"}
        disabled={item.disabled || isSubmitting}
      />
    );
  };

  /**
   * Renders the non-tabular form.
   *
   * @returns The JSX element representing the non-tabular form.
   */
  const renderNonTabularForm = () => {
    return (
      <Row className={formRowClassName}>
        {Array.isArray(fieldsList) && fieldsList?.map((item, index) => (
          <Col
            lg={formType === "tabular-form" ? "" : item.col}
            key={index}
            className="my-1"
          >
            {renderFields(item)}
          </Col>
        ))}
      </Row>
    );
  };

  /**
   * Renders the field array.
   *
   * @returns The rendered field array.
   */
  const renderFieldArray = () => {
    return (
      <>
        {fields?.map((field: any, index: number) => (
          <Row
            key={field.id}
            className={`even-odd-bg py-2 align-items-baseline mx-0 ${formRowClassName}`}
          >
            <ConditionalRenderer condition={formType === "tabular-form"}>
              <Col cols={1} className="my-1 text-center">
                {index + 1}
              </Col>
            </ConditionalRenderer>
            {Array.isArray(fieldsList) &&
              fieldsList?.map((item, itemIndex) => (
                <Col
                  lg={formType === "tabular-form" ? "" : item.col}
                  key={itemIndex}
                  className="my-1"
                >
                  {renderFields({
                    ...item,
                    name: `${fieldArrayName}[${index}].${item?.name}`,
                    fieldName: item?.name,
                    index: index,
                  })}
                </Col>
              ))}
            <Col lg={formType === "tabular-form" ? "" : "3"} className="my-1">
              <div
                className="d-flex justify-content-center"
                onClick={() => handleRemove(index)}
              >
                <Trash className="text-danger general-hover-cursor" />
              </div>
            </Col>
          </Row>
        ))}
        <ConditionalRenderer condition={formType !== "tabular-form"}>
          {renderAppend()}
        </ConditionalRenderer>
      </>
    );
  };

  /**
   * Renders a tabular form.
   * @returns The rendered tabular form.
   */
  const renderTabularForm = () => {
    return (
      <>
        <Row
          className={`theme-bg shadow p-2 mx-0 flex-wrap ${formRowClassName}`}
        >
          {tabularViewHeader?.map((item: string, index: number) => (
            <Col
              key={index}
              cols={item === "SR#" ? 1 : ""}
              className="my-1 text-capitalize text-center"
            >
              {item}
            </Col>
          ))}
        </Row>
        <div className="border">{renderFieldArray()}</div>
        {renderAppend()}
      </>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${formClassName} position-relative`}
        autoComplete="off"
        id={showSubmitFormButton ? "" : formId}
      >
        <ConditionalRenderer
          condition={formType === "tabular-form"}
          component={
            <ConditionalRenderer
              condition={formType === "field-array-form" || fieldArrayName}
              component={renderNonTabularForm()}
            >
              {renderFieldArray()}
            </ConditionalRenderer>
          }
        >
          {renderTabularForm()}
        </ConditionalRenderer>
        <SubmitFormButton
          callBack={handleSubmit(onSubmit)}
          showSubmitFormButton={showSubmitFormButton}
        />
      </form>
      <ScreenLoader loading={isProcessing || isInProcess!} />
    </>
  );
};

export default AllInOneForm;
