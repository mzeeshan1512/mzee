import React from "react";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import ProgressBar from "@/shared/components/progress-bar";
import { getSafeArrayValue } from "@/shared/utils/common";
import { FormProps } from "@/shared/types/fields";
import { Trash } from "@/shared/icons/common";
import { ErrorMessage } from "../field-error";
import FilePicker from "./file-picker";
import Input from "../input";
import { deleteFilesFromFirebaseStorage } from "@/shared/firebase-services/useCollections";
import ImagePreviewer from "../../image-previewer";

/**
 * Functional component for rendering a file picker form field with preview.
 * @param {FormProps} props - The props object containing form properties.
 * @returns {JSX.Element} A JSX element representing the file picker form field.
 */

const FormFilePicker = (props: FormProps) => {
  const isInValid = () => {
    if (props?.error) {
      if (props?.isArray) {
        return props?.error?.ref?.name === props?.name ? true : false;
      }
      return props?.error[props?.name!] ? true : false;
    }
    return false;
  };

  const handleImageRemove = async (index?: number, directory?: any) => {
    const filesArray = props.control._formValues[props.name!];
    if (directory) {
      await deleteFilesFromFirebaseStorage(directory);
    }
    if (props.multiple && Array.isArray(filesArray) && index) {
      // Create a new array excluding the item at the specified index
      const updatedFilesArray = filesArray.filter((_, i) => i !== index);
      if (props.setValue) {
        props.setValue(props.name, updatedFilesArray, { shouldValidate: true });
      }
    } else {
      if (props.setValue) {
        props.setValue(props.name, null, { shouldValidate: true });
      }
    }
  };

  /**
   * Functional component for displaying a file preview based on the provided props.
   * @param props - Object containing the necessary properties for rendering the file preview.
   * @returns JSX element representing the file preview with conditional rendering based on the props.
   */
  const FilePreviewer = ({
    base64,
    src,
    error,
    progress,
    directory,
    index,
    disabled,
    isImage,
    className = "",
  }: GenericObject) => {
    return (
      <ConditionalRenderer
        condition={(base64 && base64) || (src && typeof src === "string")}
      >
        <div
          className={`gap-2 my-1 border border-hover-cursor rounded p-2 position-relative ${
            error ? "select-invalid" : ""
          } ${base64 || src ? "select-valid" : ""} ${className} `}
          key={index}
        >
          <ConditionalRenderer condition={!disabled}>
            <div
              className="image-delete-remove general-hover-cursor"
              onClick={() => handleImageRemove(index, directory)}
            >
              <Trash />
            </div>
          </ConditionalRenderer>
          <ProgressBar progress={base64 && progress} />
          <ConditionalRenderer
            condition={isImage}
            component={
              <iframe
                src={base64 || (src && typeof src === "string" ? src : "")}
                style={{
                  width: "100%",
                  height: "auto"
                }}
              />
            }
          >
            <ImagePreviewer
              src={base64 || (src && typeof src === "string" ? src : "")}
              alt=""
              className="w-full"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto"
              }}
              width={500}
              height={250}
            />
          </ConditionalRenderer>
          <ErrorMessage message={error?.message!} />
        </div>
      </ConditionalRenderer>
    );
  };

  /**
   * Renders a FilePicker component with customizable input fields and conditional file previewer.
   * Handles file selection, validation, and callbacks within a React form.
   */
  return (
    <FilePicker
      name={props.name!}
      control={props?.control!}
      {...props}
      render={({ field }) => {
        const propsContent =
          props?.control?._formValues?.[props?.name!] || null;
        let fileName =
          (propsContent && propsContent?.src?.name) || propsContent?.directory;
        if (props.multiple && propsContent) {
          fileName = propsContent?.length + " files selected";
        }
        return (
          <>
            <Input
              {...props}
              {...field}
              type="file"
              isSvg={props.isSvg}
              inValid={isInValid()}
              isValid={!isInValid() && !props?.disabled && fileName}
              value={fileName || null}
              onChange={(e: any) => {
                field?.onChange(e);
                if (props?.callBack) {
                  props?.callBack(e);
                }
              }}
              onBlur={props?.control?.field?.onBlur}
            />
            <ConditionalRenderer condition={propsContent}>
              {props?.multiple ? (
                <div className="image-grid gap-2 mt-3 mx-1">
                  {propsContent &&
                    propsContent?.map((item: any, index: number) => {
                      let fieldError: any = props.error?.hasOwnProperty(
                        props?.name!
                      );
                      if (fieldError) {
                        fieldError = getSafeArrayValue(
                          props.error?.[props?.name],
                          index,
                          null
                        );
                      }
                      return (
                        <FilePreviewer
                          key={index}
                          base64={item?.base64}
                          index={index}
                          isImage={item?.src?.type?.includes("image")}
                          progress={props?.progress?.[index]}
                          src={item?.src?.url}
                          error={fieldError?.message!}
                          directory={item?.directory}
                          disabled={props?.disabled}
                        />
                      );
                    })}
                </div>
              ) : (
                <FilePreviewer
                  className="w-50 mt-3"
                  base64={propsContent?.base64}
                  isImage={props?.control?._formValues?.[
                    props?.name!
                  ]?.src?.type?.includes("image")}
                  src={propsContent?.src?.url}
                  error={isInValid()}
                  directory={propsContent?.directory}
                  disabled={props?.disabled}
                  progress={props?.progress}
                />
              )}
            </ConditionalRenderer>
          </>
        );
      }}
    />
  );
};

export default FormFilePicker;
