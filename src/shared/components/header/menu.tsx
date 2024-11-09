"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import ToolTip from "../tool-tip";

type ContentProps = {
  item: HeaderMenuList;
  showToolTip?: boolean;
  toolTipPosition?: toolTipPosition;
  isCollapsible?: boolean;
  activeClass?: string;
};

const ContentRenderer = ({
  children,
  item,
  showToolTip,
  toolTipPosition,
  activeClass,
}: { children: React.ReactNode } & ContentProps) => {
  return (
    <ToolTip
      toolTipText={showToolTip ? item?.toolTipText || item?.title : null}
      toolTipPosition={toolTipPosition}
    >
      <span
        className={`icon ${
          showToolTip ? "general-hover-cursor " : ""
        } ${activeClass}`}
      >
        {children}
      </span>
    </ToolTip>
  );
};

const VisibleContent = (props: ContentProps) => {
  return (
    <div className="d-flex gap-4">
      {props?.item?.icon && (
        <ContentRenderer {...props}>
          {React.createElement(props?.item?.icon)}
        </ContentRenderer>
      )}
      <ConditionalRenderer
        condition={props?.isCollapsible && props?.showToolTip}
      >
        <ContentRenderer {...props}>
          {props?.item?.title?.slice(0, 2)}
        </ContentRenderer>
      </ConditionalRenderer>
      <span className="text-visibility">{props?.item?.title}</span>
    </div>
  );
};

const Menu = ({
  navMenuList,
  isStaticPageNavigation,
  activeClass,
  toolTipPosition,
  showToolTip = false,
  isCollapsible = false,
  isExactPath = false,
  menuClassName = "",
  listClass="",
  linkCallBackClick=()=>{}
}: MenuProps & {
  toolTipPosition?: toolTipPosition;
  showToolTip?: boolean;
  isCollapsible?: boolean;
  isExactPath?: boolean;
  activeClass?: string;
  menuClassName?: string;
  listClass?:string,
  linkCallBackClick?:(e?:any)=>void
}) => {
  const pathName = usePathname();

  const isActivePathName = (data: HeaderMenuList) => {
    return isExactPath
      ? data?.link === pathName
      : data?.link === pathName || pathName?.includes(data?.link);
  };

  return (
    <div className={`nav-list ${menuClassName}`}>
      <ul className={listClass}>
        {navMenuList?.map((data, index) => (
          <li
            key={index}
            className={`custom-drop-down content-class ${
              showToolTip ? "" : "hove-effect"
            }`}
          >
            <ConditionalRenderer
              condition={isStaticPageNavigation}
              component={
                <Link
                  href={data.link}
                  className={
                    !showToolTip && isActivePathName(data)
                      ? activeClass
                        ? activeClass
                        : "active-link"
                      : ""
                  }
                  onClick={(e)=>linkCallBackClick(e)}
                >
                  <VisibleContent
                    item={data}
                    toolTipPosition={toolTipPosition}
                    showToolTip={showToolTip}
                    isCollapsible={isCollapsible}
                    activeClass={isActivePathName(data) ? "color-primary" : ""}
                  />
                </Link>
              }
            >
              <ScrollLink
                activeClass="active-tab"
                spy={true}
                to={data?.link}
                offset={-70}
              >
                <VisibleContent
                  item={data}
                  toolTipPosition={toolTipPosition}
                  showToolTip={showToolTip}
                  isCollapsible
                />
              </ScrollLink>
            </ConditionalRenderer>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
