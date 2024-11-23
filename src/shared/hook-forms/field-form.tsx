"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormState } from "react-hook-form";
import ScreenLoader from "@/shared/components/loaders-spinners/screen-loader";
import { HandleFileUpload } from "@/shared/firebase-services/file-uploads";
import { usePostData } from "@/shared/firebase-services/mutations";
import { getDataKeyObjectFromArray } from "@/shared/utils/array-data";
import { Col, Row } from "@/shared/components/row-cols";
import ConditionalRenderer from "../components/conditional-renderer";
import { Field, SubmitFormButton } from "./components";
import { LayoutThemeContext } from "../context";
import { formFieldsList, HookFormProps } from "../types/fields";
import TextWithLine from "../components/text-with-line";

const FieldForms = ({
  collectionId,
  dataId,
  defaultValues,
  fieldsList,
  GroupedClass = "",
  formClassName = "",
  formRowClassName = "",
  formId,
  isInProcess,
  validationSchema,
  showSubmitFormButton,
  onlyFormData = false,
  onSaveCallBack,
}: HookFormProps & {
  validationSchema?: any;
}) => {
  const { setISDisabled } = useContext(LayoutThemeContext);
  const [fileProgress, setFileProgress] = useState<GenericObject>({});
  const { isLoading: isProcessing, mutate } = usePostData(collectionId);

  const getDefaultValues = () => {
    return  defaultValues && Object?.keys(defaultValues)?.length>0
      ? defaultValues
      : getDataKeyObjectFromArray(fieldsList, "name") || {};
  };
  const getFileTypeItems = (arr: any) =>
    arr
      ?.filter((item: any) => item?.type === "file")
      ?.map((item: any) => item?.name) || [];

  const fileList = useMemo(() => {
    let list: any = [];
    if (Array.isArray(fieldsList)) {
      list = fieldsList;
    } else if (typeof fieldsList === "object") {
      const objArray = Object?.values(fieldsList);
      list = objArray?.flat(objArray?.length);
    }
    return getFileTypeItems(list);
  }, [fieldsList]);

  const {
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
    clearErrors,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: validationSchema && yupResolver(validationSchema),
    defaultValues: getDefaultValues(),
    resetOptions: {
      keepDefaultValues: true,
      keepValues: true,
    },
  });

  const { isSubmitting, submitCount } = useFormState({ control });

  useEffect(() => {
      reset({...getDefaultValues()});
    // eslint-disable-next-line @next/next/no-img-element 
  }, [defaultValues]);

  const FileUploaderManger = async (
    item: any,
    key: string,
    index: any,
    setProgress: any,
    setUrls: any
  ) => {
    const directoryPath = `${item?.src?.type}/${
      item?.src?.name
    }-${new Date()?.toISOString()}`;
    return await HandleFileUpload(
      item?.src,
      directoryPath,
      key,
      setProgress,
      (e: any) => {
        setUrls({ src: e, directoryPath });
      }
    ).catch((error) => {
      // Handle the error for each individual promise
      console.error(`Error uploading image at index ${index}:`, error);
      // You may choose to throw the error again if you want to stop processing on error
      // throw error;
    });
  };

  const handleImageUpload = async (data: any) => {
    let formData: any = {};
    if (!onlyFormData) {
      formData = {
        ...defaultValues
      };
    }
    formData = {
      ...formData,
      ...data
    };

    let fileUploads: GenericObject = {};
    fileList.forEach((item: any) => {
      fileUploads[item] = data[item];
    });

    // Prepare an array to hold all the upload promises
    const promises: Promise<any>[] = [];
    let file_Urls: any = {};
    Object.keys(fileUploads).forEach((key: any, index: number) => {
      let item = fileUploads[key];
      if (Array.isArray(item)) {
        item?.forEach((subItem: any, subItemIndex: number) => {
          if (typeof subItem?.src?.url === "string") {
            file_Urls[key].push({
              ...subItem
            });
          } else {
            promises.push(
              FileUploaderManger(
                subItem,
                key,
                index,
                (progress: any) => {
                  setFileProgress((prev: any) => ({
                    ...prev,
                    [key]: {
                      ...(prev[key] || {}),
                      [subItemIndex]: progress
                    }
                  }));
                },
                (e: any) => {
                  if (!file_Urls[key]) {
                    file_Urls[key] = [];
                  }

                  // Push the new item into the array
                  file_Urls[key].push({
                    src: {
                      url: e?.src,
                      type: subItem?.src?.type
                    },
                    directory: e?.directoryPath
                  });
                }
              )
            );
          }
        });
      } else {
        if (typeof item?.src?.url === "string") {
          file_Urls[key] = {
            ...item
          };
        } else {
          promises.push(
            FileUploaderManger(
              item,
              key,
              index,
              (progress: any) => {
                setFileProgress((prev: any) => ({ ...prev, [key]: progress }));
              },
              (e: any) => {
                file_Urls[key] = {
                  src: {
                    url: e?.src,
                    type: item?.src?.type
                  },
                  directory: e?.directoryPath,
                  svg: item?.svg || null
                };
              }
            )
          );
        }
      }
    });

    // Wait for all uploads to finish
    try {
      const results: any = await Promise.allSettled(promises);
      // Check if all promises were fulfilled
      const allFulfilled = results.every(
        (result: any) => result.status === "fulfilled"
      );
      if (allFulfilled) {
        const data = {
          ...formData,
          ...file_Urls
        };
        handleMutation(data);
      } else {
        // Handle the case where one or more uploads failed
        results.forEach((result: any, index: any) => {
          if (result.status === "rejected") {
            console.error(`Upload failed for index ${index}:`, result.reason);
          }
        });
      }
    } catch (error) {}

    setISDisabled(false);
  };

  const handleMutation = async (data: any) => {
    setISDisabled(false);
    if (onSaveCallBack) {
      onSaveCallBack(data);
    } else {
      mutate({
        collectionId: collectionId,
        dataId: dataId,
        data: data
      });
    }
  };

  const watchAllFields = watch();

  const onSubmit = async (data: any) => {
    if (!isSubmitting) {
      setISDisabled(true);
      if (fileList?.length > 0) {
        handleImageUpload(data);
      } else {
        handleMutation(data);
      }
    }
  };

  const renderFields = (fieldsList: formFieldsList[]) => {
    return (
      <Row className={formRowClassName}>
        {fieldsList?.map(({col,watchedKey,colClassName,impactedKey,...item}, index) => {
          const obj = fieldsList?.find(
            (obj) => watchedKey === obj?.name
          )?.impactedKey;
          const isDisabled: any =
            obj && watchedKey && watchAllFields[watchedKey!]
              ? obj?.isDisabled
              : false;
          return (
            <Col
              lg={col}
              key={item?.name! + +index}
              className={
                (colClassName ? colClassName : "") + " my-1"
              }
            >
              <Field
                {...item}
                control={control}
                error={errors}
                defaultValue={item?.value}
                disabled={isDisabled || item?.disabled || isSubmitting}
                setValue={setValue}
                clearErrors={clearErrors}
                getValues={getValues}
                progress={
                  fileProgress &&
                  fileProgress.hasOwnProperty(item.name!) &&
                  fileProgress[item?.name!]
                }
                callBack={(...args: any) => {
                  if (impactedKey) {
                    clearErrors(impactedKey?.key!);
                    let fieldValue = impactedKey?.value || impactedKey?.fieldKey!
                      ? getValues(impactedKey?.fieldKey!)
                      : "";
                    if (
                      typeof fieldValue === "object" &&
                      !Array.isArray(fieldValue)
                    ) {
                      const t =
                        fieldValue?.[impactedKey?.nestedFieldKey!];
                      fieldValue = t;
                    }
                    const value = impactedKey?.value || fieldValue;
                    let modifiedValue =
                      impactedKey?.mode === "append"
                        ? value + "-" + getValues(impactedKey?.key!)
                        : value;
                    if (impactedKey?.replaceSpecialCharacter) {
                      modifiedValue = modifiedValue
                        ?.replace(
                          impactedKey?.replaceSpecialCharacter?.char,
                          impactedKey?.replaceSpecialCharacter
                            ?.replacedChar
                        )
                        .replace(/^-+|-+$/g, "");
                    }
                    setValue(impactedKey?.key!, modifiedValue);
                  }
                }}
              />
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <>
      <ConditionalRenderer condition={isSubmitting && fileList?.length > 0}>
        <span className="text-warning">Processing the files/blobs</span>
      </ConditionalRenderer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${formClassName} position-relative`}
        autoComplete="off"
        id={showSubmitFormButton ? "" : formId}
      >
        {Array.isArray(fieldsList)
          ? renderFields(fieldsList)
          : typeof fieldsList === "object"
          ? Object.keys(fieldsList)?.map((item: string, index) => {
              return (
                fieldsList[item]?.length > 0 && (
                  <React.Fragment key={item + index}>
                    <TextWithLine text={item} wrapperClass={GroupedClass} />
                    {renderFields(fieldsList[item])}
                  </React.Fragment>
                )
              );
            })
          : null}
        <SubmitFormButton
          callBack={handleSubmit(onSubmit)}
          showSubmitFormButton={showSubmitFormButton}
        />
      </form>
      <ScreenLoader loading={isProcessing || isInProcess!} />
    </>
  );
};

export default FieldForms;
