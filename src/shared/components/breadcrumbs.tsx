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
      <div className="title">
        <LinkScrollSpy data={parent} />
      </div>
      <span className="horizontal-line" />
      <ConditionalRenderer condition={childList?.length > 0}>
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
