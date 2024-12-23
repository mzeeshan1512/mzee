import React from "react";
import ConditionalRenderer from "./conditional-renderer";
import LinkScrollSpy from "./link-scrollspy";

const Breadcrumbs = ({
  parent,
  childList,
}: {
  parent: BreadCrumbsProps;
  childList: BreadCrumbsProps[] | [];
}) => {
  return (
    <nav className="bread--crumbs">
      <div
        className="title"
        style={{
          border: childList?.length < 1 ? "none" : ""
        }}
      >
        <LinkScrollSpy data={parent} />
      </div>

      <ConditionalRenderer condition={childList?.length > 0}>
        <span className="horizontal-line" />
        <ul>
          {childList?.map((child: BreadCrumbsProps, index: number) => (
            <li key={index}>
              <LinkScrollSpy data={child} />
              <ConditionalRenderer condition={index < childList?.length - 1}>
                <div className="chevron-icon right" />
              </ConditionalRenderer>
            </li>
          ))}
        </ul>
      </ConditionalRenderer>
    </nav>
  );
};

export default Breadcrumbs;
