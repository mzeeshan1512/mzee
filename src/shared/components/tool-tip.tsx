import React from "react";
import ConditionalRenderer from "./conditional-renderer";

const ToolTip = ({
  toolTipText,
  toolTipPosition,
  children,
}: {
  toolTipText: string | null;
  toolTipPosition?: toolTipPosition;
  children: React.ReactNode;
}) => {
  return (
    <ConditionalRenderer
      condition={toolTipText && toolTipText !== ""}
      component={children}
    >
      <div
        className={`tooltip-container ${
          toolTipPosition ? toolTipPosition : ""
        }`}
      >
        {children}
        <div className="tooltip">{toolTipText}</div>
      </div>
    </ConditionalRenderer>
  );
};

export default ToolTip;
