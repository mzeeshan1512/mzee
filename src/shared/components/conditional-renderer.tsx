
type conditionalRenderProps = {
  condition: boolean | string | number | any,
  children: any,
  component?: any
}

/**
 * ConditionalRenderer renders children or a specified component based on a condition.
 * @param condition - Condition to evaluate for rendering.
 * @param children - Elements to render when the condition is true.
 * @param component - Optional component to render instead of children when the condition is true.
 * @returns Rendered children or specified component if condition is true, otherwise null.
 */

const ConditionalRenderer = ({ condition, children, component }: conditionalRenderProps) => {
  return condition ? children : component ? component:  null;
};

export default ConditionalRenderer