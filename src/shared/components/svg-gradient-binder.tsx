import React from "react";
import ShowIf from "./show-if";
type linearGradientProps = {
  showLinearGradient?: boolean;
  linearGradientProps?: React.ComponentProps<"linearGradient">;
  stopProps?: {
    1: React.ComponentProps<"stop">;
    2: React.ComponentProps<"stop">;
  };
} | null;

type PartialSvgGradientProps =
  | {
      children: React.ReactNode;
      path?: never; // `path` should not be defined if `children` is provided
    }
  | {
      path: string;
      children?: never; // `children` should not be defined if `path` is provided
    };

type SvgGradientProps = PartialSvgGradientProps &
  linearGradientProps &
  React.ComponentProps<"svg">;

const excludeList: string[] = ["xlmns", "xmlns:xlink", "enable-background"];

const convertToCamelCase = (inputString: string): string =>
  inputString
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

const getCleanData = (obj: Record<string, any>, excludedFields: string[]) => {
  const cleanData = { ...obj };
  const keysToExclude = excludedFields;
  keysToExclude.forEach((key) => {
    if (key in cleanData) {
      delete cleanData[key];
    }
    if (key?.includes("-")) {
      cleanData[convertToCamelCase(key)] = cleanData[key];
    }
  });
  return cleanData;
};

const RenderSvgAsDangerouslySetInnerHTML = (
  props: React.ComponentProps<"svg">
) => <svg {...getCleanData(props, excludeList)} />;

const SVGGradientBinder = ({
  path,
  children,
  showLinearGradient = true,
  linearGradientProps,
  stopProps,
  ...svgProps
}: SvgGradientProps) => {
  return (
    <svg {...getCleanData(svgProps, excludeList)}>
      <ShowIf conditionalRenderKey={showLinearGradient}>
        <defs>
          <linearGradient
            {...linearGradientProps}
            id={linearGradientProps?.id}
            x1={linearGradientProps?.x1 || "0%"}
            y1={linearGradientProps?.y1 || "0%"}
            x2={linearGradientProps?.x2 || "100%"}
            y2={linearGradientProps?.y2 || "100%"}
          >
            <stop
              {...stopProps?.[1]}
              offset={stopProps?.[1]?.offset || "0%"}
              style={{
                ...stopProps?.[1]?.style,
                stopColor: stopProps?.[1]?.style?.stopColor || "#ffbf00",
                stopOpacity: stopProps?.[1]?.style?.stopOpacity || 1
              }}
            />
            <stop
              {...stopProps?.[2]}
              offset={stopProps?.[2]?.offset || "100%"}
              style={{
                ...stopProps?.[2]?.style,
                stopColor: stopProps?.[2]?.style?.stopColor || "#cc0c40",
                stopOpacity: stopProps?.[2]?.style?.stopOpacity || 1
              }}
            />
          </linearGradient>
        </defs>
      </ShowIf>
      <ShowIf conditionalRenderKey={children}>{children}</ShowIf>
      <ShowIf conditionalRenderKey={path}>{path}</ShowIf>
    </svg>
  );
};

export default SVGGradientBinder;

export { RenderSvgAsDangerouslySetInnerHTML };

export type { linearGradientProps, PartialSvgGradientProps, SvgGradientProps };
