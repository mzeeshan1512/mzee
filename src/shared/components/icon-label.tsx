import React from "react";
import { BorderPlus, Save, BorderMinus } from "@/shared/icons/common";
import ConditionalRenderer from "./conditional-renderer";

const IconLabel = ({
  title,
  icon,
}: {
  title?: string;
  icon?: "add" | "" | "remove";
}) => {
  return (
    <div className="d-flex align-items-center">
      {icon === "add" ? (
        <BorderPlus />
      ) : icon === "remove" ? (
        <BorderMinus />
      ) : (
        <Save />
      )}
      <ConditionalRenderer condition={title}>
        <span className="ms-1">{title}</span>
      </ConditionalRenderer>
    </div>
  );
};

export default IconLabel;
