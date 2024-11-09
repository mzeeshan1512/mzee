"use client"
import React, { useEffect, useState } from "react";
import { adjustChildTopRelativeToParent } from "@/shared/utils/css-modifiers";
import Logo from "@/shared/components/app-logo";
import Menu from "./menu";

type Props = {
  collapse?: boolean;
} & SideBarProps;

const SideBar = ({
  baseUrl,
  hideSideBar,
  isStaticPageNavigation,
  navMenuList,
}: Props) => {
  const [collapseSidebar, toggleCollapse] = useState<boolean>(true);
  useEffect(() => {
    adjustChildTopRelativeToParent("side-bar-header", "side-bar-content");
  }, []);

  return (
    <div
      className={`side-bar shadow theme-bg d-none d-lg-block ${
        collapseSidebar ? "width-100px" : ""
      }`}
      id="side-bar"
    >
      {/* header */}
      <div className="bar-header theme-bg " id="side-bar-header">
        <Logo
          baseUrl={baseUrl}
          isCollapsed={collapseSidebar}
        />
        <div
          className="side-bar-toggler theme-bg shadow general-hover-cursor"
          onClick={() => toggleCollapse(!collapseSidebar)}
          id="collapse-toggler"
        >
          <div
            className={`chevron-icon ${
              collapseSidebar ? "right" : "left"
            } hover-scale`}
          />
        </div>
      </div>
      {/* content */}
      <div className="side-bar-content" id="side-bar-content">
        <Menu
          isStaticPageNavigation={isStaticPageNavigation}
          navMenuList={navMenuList}
          showToolTip={collapseSidebar}
          toolTipPosition="right"
          isCollapsible
        />
      </div>
    </div>
  );
};

export default SideBar;
