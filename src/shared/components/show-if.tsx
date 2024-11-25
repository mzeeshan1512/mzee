import React from "react";
import { getTypeOfItem, isNotNullValue } from "../utils/common";

type ShowIfProps<T> = {
  conditionalRenderKey: boolean | string | number | T; // Generic type T for objects or arrays
  children: React.ReactNode;
  elseComponent?: React.ReactNode | JSX.Element | null;
  elseCallBackMessage?: string | null;
};

/**
 * ShowIfProps renders children or a specified component based on a condition.
 * @param conditionalRenderKey - Condition to evaluate for rendering.
 * @param children - Elements to render when the condition is true.
 * @param elseComponent - Optional component to render when the condition is false.
 * @param elseCallBackMessage - Optional message to render when the condition is false.
 * @returns Rendered children or specified component if condition is true, otherwise null.
 */

const ShowIf = <T,>({
  conditionalRenderKey = false,
  children,
  elseComponent = null,
  elseCallBackMessage
}: ShowIfProps<T>) => {
  const getElseComponent = () => {
    if (elseComponent || elseCallBackMessage) {
      return elseComponent || elseCallBackMessage;
    }
    const type = getTypeOfItem(conditionalRenderKey);
    if (["array", "object"]?.includes(type)) {
      return "Current item is either empty or contains invalid entries";
    }
    return null;
  };
  return isNotNullValue(conditionalRenderKey) ? children : getElseComponent();
};

export default ShowIf;

export type { ShowIfProps };
