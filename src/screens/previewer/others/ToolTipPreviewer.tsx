import React, { useState } from "react";
import ToolTip from "@/shared/components/tool-tip";

const ToolTipPreviewer = () => {
  const [variant, setVariant] = useState<toolTipPosition>("top");
  return (
    <>
        <div className="d-flex align-items-center text-center">
      <ToolTip toolTipText={"This is tooltip"} toolTipPosition={variant}>
          <span>Hover Over Me</span>
      </ToolTip>
        </div>
      <ul>
        {["top", "bottom", "left", "right"]?.map((item) => (
          <li
            key={item}
            onClick={() => setVariant(item as toolTipPosition)}
            className={`general-hover-cursor ${
              variant === item ? "text-gradient-effect" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToolTipPreviewer;
