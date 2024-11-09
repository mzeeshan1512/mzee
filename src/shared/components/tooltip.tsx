import React from "react";
import ShowIf from "./show-if";

type ToolTipProps = {
  position?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
  toolTipText?: string;
  toolTipProps?: React.ComponentProps<"div">;
  containerProps?: React.ComponentProps<"div">;
  toolTipArrowProps?: React.ComponentProps<"span">;
  mode?: "controlled" | "uncontrolled";
};

const ToolTip = ({
  children,
  containerProps,
  position = "top",
  toolTipProps,
  toolTipText,
  toolTipArrowProps
}: ToolTipProps) => {
  const { tooltipPosition, tooltipArrowStyles } = React.useMemo(() => {
    let tooltipPosition = "";
    let tooltipArrowStyles = {};

    switch (position) {
      case "top":
        tooltipPosition = "bottom-[125%] left-1/2 transform -translate-x-1/2";
        tooltipArrowStyles = {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid var(--primary)"
        };
        break;
      case "bottom":
        tooltipPosition = "top-[125%] left-1/2 transform -translate-x-1/2";
        tooltipArrowStyles = {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderBottom: "5px solid var(--primary)"
        };
        break;
      case "left":
        tooltipPosition = "top-1/2 right-[105%] transform -translate-y-1/2";
        tooltipArrowStyles = {
          top: "50%",
          left: "100%",
          transform: "translateY(-50%)",
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: "5px solid var(--primary)"
        };
        break;
      case "right":
        tooltipPosition = "top-1/2 left-[105%] transform -translate-y-1/2";
        tooltipArrowStyles = {
          top: "50%",
          right: "100%",
          transform: "translateY(-50%)",
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderRight: "5px solid var(--primary)"
        };
        break;
      default:
        tooltipPosition = "";
        tooltipArrowStyles = {};
    }

    return { tooltipPosition, tooltipArrowStyles };
  }, [position]);

  return (
    <div
      {...containerProps}
      className={`${
        toolTipText ? "relative inline-block cursor-pointer group" : ""
      } ${containerProps?.className || ""}`}
    >
      {children}
      <ShowIf conditionalRenderKey={toolTipText}>
        <div
          {...toolTipProps}
          className={`absolute w-[120px] bg-primary-500 text-white text-center rounded-md py-1 px-2 opacity-0 hidden group-hover:opacity-100 group-hover:block duration-300 z-50 ${
            toolTipProps?.className || ""
          } ${tooltipPosition}`}
        >
          {toolTipText}
          <span
            {...toolTipArrowProps}
            style={{ ...tooltipArrowStyles, ...toolTipArrowProps?.style }}
            className={`absolute ${toolTipArrowProps?.className || ""}`}
          />
        </div>
      </ShowIf>
    </div>
  );
};

export default ToolTip;

export type { ToolTipProps };
