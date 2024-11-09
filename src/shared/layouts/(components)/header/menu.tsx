"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ShowIf from "@/shared/components/show-if";
import ToolTip from "@/shared/components/tooltip";
import { HeaderMenuList, MenuProps } from "../types";
import ScrollSpy from "./scroll-spy";
import { AppIcon } from "../app-logo";

type ContentProps = {
  item: HeaderMenuList;
  isInView?: boolean; // Add this prop
} & MenuProps;

const VisibleContent = ({
  showToolTip,
  item,
  toolTipPosition,
  showLogoAsRoute,
  activeClass,
  isInView
}: ContentProps) => {
  if (showLogoAsRoute?.show) {
    return <AppIcon />;
  }
  return (
    <ToolTip
      toolTipText={showToolTip ? item?.toolTipText || item?.title : ""}
      position={toolTipPosition || "bottom"}
    >
      <div
        className={`flex gap-2 ${isInView ? "active-tab" : activeClass || ""}`}
      >
        {item.title}
      </div>
    </ToolTip>
  );
};

const Menu = ({
  navTagProps,
  menuList,
  hideMenu,
  ulTagProps,
  liTagProps,
  isExactPath,
  showToolTip,
  isStaticPageNavigation,
  staticScrollSpyPath,
  showLogoAsRoute,
  toolTipPosition,
  isCollapsible
}: MenuProps) => {
  const pathName = usePathname();

  const isActivePathName = (data: HeaderMenuList) => {
    return isExactPath
      ? data?.link === pathName
      : data?.link === pathName || pathName?.includes(data?.link);
  };

  const urlMatcher = (url: string, replaceChar: string | null) => {
    let modifiedUrl = url;
    if (replaceChar && url[0] !== replaceChar) {
      modifiedUrl = replaceChar + url;
    }
    return modifiedUrl;
  };

  const renderNextLink = (item: HeaderMenuList) => {
    if (item.isStatic) return;
    return (
      <Link
        href={urlMatcher(item.link, "/")}
        className={!showToolTip && isActivePathName(item) ? "active-tab" : ""}
        onClick={item.onClickCallBack}
      >
        <VisibleContent
          item={item}
          toolTipPosition={toolTipPosition}
          showToolTip={showToolTip}
          isCollapsible={isCollapsible}
          activeClass={isActivePathName(item) ? "active-tab" : ""}
          showLogoAsRoute={{
            route: showLogoAsRoute?.route || "",
            show: item?.link === showLogoAsRoute?.route
          }}
        />
      </Link>
    );
  };

  const renderScrollSpy = (item: HeaderMenuList) => {
    return (
      <ScrollSpy id={item.link} href={"#" + item.link}>
        <VisibleContent
          item={item}
          toolTipPosition={toolTipPosition}
          showToolTip={showToolTip}
          isCollapsible={isCollapsible}
          showLogoAsRoute={{
            route: showLogoAsRoute?.route || "",
            show: item?.link === showLogoAsRoute?.route
          }}
        />
      </ScrollSpy>
    );
  };

  if (hideMenu) {
    return null;
  }

  return (
    <nav
      {...navTagProps}
      className={`text-xl leading-tight ${navTagProps?.className}`}
    >
      <ul
        {...ulTagProps}
        className={`list-none flex gap-2" ${ulTagProps?.className || ""}`}
      >
        {menuList?.map((item) => {
          return (
            <li
              key={item.title}
              {...liTagProps}
              className={`relative px-2.5 cursor-pointer ${
                showToolTip ? "" : "hover-bottom-outline"
              } ${liTagProps?.className || ""}`}
            >
              <ShowIf
                conditionalRenderKey={
                  isStaticPageNavigation ||
                  staticScrollSpyPath?.includes(pathName)
                }
                elseComponent={renderNextLink(item)}
              >
                {renderScrollSpy(item)}
              </ShowIf>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
