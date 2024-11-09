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

type PartialProps =
  | {
      children: React.ReactNode;
      path?: never; // `path` should not be defined if `children` is provided
    }
  | {
      path: string;
      children?: never; // `children` should not be defined if `path` is provided
    };

type Props = PartialProps & linearGradientProps & React.ComponentProps<"svg">;

const SVGGradientBinder = ({
  path,
  children,
  showLinearGradient = true,
  linearGradientProps,
  stopProps,
  ...svgProps
}: Props) => {
  return (
    <svg {...svgProps}>
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
