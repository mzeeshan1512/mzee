import React from "react";
import {
  ScrollIntoViewParams,
  useScrollIntoView
} from "@/shared/hooks/use-scroll-into-view/use-scroll-into-view";
import useScrollSpy from "@/shared/hooks/use-scroll-into-view/use-scroll-spy";

type ScrollSpyProps = {
  children: React.ReactNode;
  id: string;
  activeClass?: string;
  scrollParams?: ScrollIntoViewParams;
} & React.ComponentProps<"a">;

const ScrollSpy = ({
  children,
  id,
  activeClass = "active-tab",
  className = "",
  scrollParams,
  href,
  ...rest
}: ScrollSpyProps) => {
  const { scrollIntoView } = useScrollIntoView<HTMLDivElement>({
    ...scrollParams,
    targetId: id
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (rest?.onClick) {
      rest.onClick(e);
    } else scrollIntoView();
  };

  const { elementName, isInView } = useScrollSpy({ id });

  const enhancedChildren = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, { isInView })
    : children;

  return (
    <a
      {...rest}
      href={href || "#" + id}
      className={`${className} ${
        elementName === id && isInView ? activeClass : ""
      }`}
      onClick={handleClick}
    >
      {enhancedChildren}
    </a>
  );
};

export default ScrollSpy;
