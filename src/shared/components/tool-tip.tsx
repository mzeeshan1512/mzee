/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';

const ToolTip = ({
  toolTipText,
  toolTipPosition,
  children,
  tooltipContainerProps,
  mode,
}: {
  toolTipText: string | null;
  toolTipPosition?: toolTipPosition;
  children: React.ReactNode;
  tooltipContainerProps?: React.ComponentProps<"div">;
  mode?:"body"
}) => {
   const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyles, setTooltipStyles] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (!isVisible || !containerRef.current || !tooltipRef.current || mode !== "body") return;

  const parentRect = containerRef.current.getBoundingClientRect();
  const tooltipRect = tooltipRef.current.getBoundingClientRect();

  const maxTooltipWidth = 300; // Set the maximum width for the tooltip
  let top = 0, left = 0;

  switch (toolTipPosition) {
    case "top":
      top = parentRect.top - tooltipRect.height - 8;
      left = parentRect.left + parentRect.width / 2 - Math.min(tooltipRect.width, maxTooltipWidth) / 2;
      break;
    case "bottom":
      top = parentRect.bottom + 8;
      left = parentRect.left + parentRect.width / 2 - Math.min(tooltipRect.width, maxTooltipWidth) / 2;
      break;
    case "left":
      top = parentRect.top + parentRect.height / 2 - tooltipRect.height / 2;
      left = Math.max(parentRect.left - tooltipRect.width - 8, 0);
      break;
    case "right":
      top = parentRect.top + parentRect.height / 2 - tooltipRect.height / 2;
      left = Math.min(parentRect.right + 8, window.innerWidth - maxTooltipWidth);
      break;
  }

  // Ensure the tooltip does not overflow off-screen horizontally
  const viewportPadding = 16; // Add padding to avoid edge clipping
  if (left + maxTooltipWidth > window.innerWidth - viewportPadding) {
    left = window.innerWidth - maxTooltipWidth - viewportPadding;
  } else if (left < viewportPadding) {
    left = viewportPadding;
  }

  setTooltipStyles({
    ...tooltipContainerProps?.style,
    top: `${top}px`,
    left: `${left}px`,
    position: "fixed",
    maxWidth: `${maxTooltipWidth}px`,
    zIndex: 150,
    visibility: isVisible ? "visible" : "hidden",
    opacity: isVisible ? 1 : 0,
    transition: `opacity 0.3s ease-in-out`,
  });
}, [isVisible, toolTipPosition, mode]);


  if(!toolTipText || toolTipText===""){
    return children
  }

  if(mode==="body"){
     return (
          <>
      <div
        ref={containerRef}
        className="tooltip-container"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      
      {isVisible &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            {...tooltipContainerProps}
            className={`tooltip bg-primary p-2 ${tooltipContainerProps?.className ?? ""}`}
            style={tooltipStyles}
          >
            {toolTipText}
          </div>,
          document?.body
        )}
        </div>
    </>
     )
  }

  return (
      <div
        className={`tooltip-container ${toolTipPosition
          ? toolTipPosition
          : ""}`}
      >
        {children}
        <div {...tooltipContainerProps} className={"tooltip " +(tooltipContainerProps?.className ?? "")}>
          {toolTipText}
        </div>
      </div>
  );
};

export default ToolTip;
