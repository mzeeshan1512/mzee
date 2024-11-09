import { useCallback, useRef, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { getBase64 } from "@/shared/utils/common";

interface FilePickerProps {
  name: string;
  control: UseControllerProps<any>["control"];
  render: (props: {
    field?: {
      type: "file";
      name: string;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
      ref: (instance: HTMLInputElement | null) => void;
    };
    base64?: string | null;
    select?: () => void;
    remove?: () => void;
  }) => JSX.Element;
  defaultValue?: any;
  isSvg?: boolean;
  multiple?:boolean;
}

const FilePicker: React.FC<FilePickerProps> = ({
  name,
  control,
  defaultValue,
  isSvg,
  multiple,
  render,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { field } = useController({ name, control, defaultValue });

  const getSvgCode = async (event: any) => {
    const file = event?.target?.files[0];
    if (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const svgCode = e?.target?.result;
            const svgElement = document.createElement("div");
            svgElement.innerHTML = svgCode;
            const svgAttributes = svgElement.querySelector("svg")?.attributes;
            const attributesObj: any = {};
            if (svgAttributes) {
              for (let i = 0; i < svgAttributes?.length; i++) {
                const attr = svgAttributes[i];
                attributesObj[attr?.name] = attr?.value;
              }
            }
            const tagsRegex = /<[^>]+>/g;
            const tagsExceptSvg = e?.target?.result
              ?.replace(/<svg[^>]*>/, "")
              ?.replace(/<\/svg>/, "")
              ?.match(tagsRegex);
            const content = {
              props: attributesObj,
              code: tagsExceptSvg?.toString(),
            };
            resolve(content);
          } catch (error) {
            reject(error);
          }
        };
  
        reader.onerror = (error) => reject(error);
  
        reader.readAsText(file);
      });
    } else {
      return null;
    }
  };

  const onChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event?.target?.files) {
        const files = Array.from(event.target.files);
        const filePromises = files.map(async (file) => {
          let svg: any = null;
          if (isSvg) {
            svg = await getSvgCode({ target: { files: [file] } });
          }
          const result = await getBase64(file);
          let obj:any = {
            base64: result as string,
            src: file,
          }
          if(svg){
            obj.svg = svg
          }
          return obj
        });
        const fileResults = await Promise.all(filePromises);
        
        field.onChange(multiple ? fileResults : fileResults[0]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field]
  );

  return render({
    field: {
      type: "file",
      name,
      onChange,
      ref: (instance: HTMLInputElement | null) => {
        field.ref(instance);
        if (instance) {
          inputRef.current = instance;
        }
      },
    },
    select: () => inputRef.current?.click()
  });
};

export default FilePicker;
