import React from "react";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import ConditionalRenderer from "./conditional-renderer";

/* 
  The LinkScrollSpy component in React handles conditional rendering of links based on provided data, supporting regular,
   scroll, and callback links with dynamic visibility and functionality.
*/

const VisibleContent = ({ item }: { item: scrollSpyLinkProps }) => {
  return (
    <div className={`text-capitalize d-flex gap-4 ${item?.disable ? "disable-class" : ""}`}>
      {item?.icon && (
        <span className={`icon`}>{React.createElement(item?.icon)}</span>
      )}
      <span className="text-visibility">{item?.title}</span>
    </div>
  );
};

const LinkScrollSpy = ({ data }: { data: scrollSpyLinkProps }) => {
  return (
    <ConditionalRenderer
      condition={data?.link}
      component={
        <ConditionalRenderer
          condition={data?.onCallBack}
          component={<VisibleContent item={data} />}
        >
          {/* eslint-disable-next-line react-hooks/exhaustive-deps */}
          <a onClick={data?.onCallBack}>
            <VisibleContent item={data} />
          </a>
        </ConditionalRenderer>
      }
    >
      <ConditionalRenderer
        condition={data?.isStaticLink!}
        component={
          <Link href={data?.disable ? "" : data?.link!}>
            <VisibleContent item={data} />
          </Link>
        }
      >
        <ScrollLink
          activeClass="active-tab"
          spy={true}
          to={data?.link!}
          offset={-70}
          disabled={data?.disable}
        >
          <VisibleContent item={data} />
        </ScrollLink>
      </ConditionalRenderer>
    </ConditionalRenderer>
  );
};

export default LinkScrollSpy;
