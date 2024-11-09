"use client";
import React, { useState } from "react";
import { MenuToggler } from "@/shared/icons/common";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import Logo from "../app-logo";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";

const Header = ({
  baseUrl,
  headerContentClass,
  hideNavMenu,
  isStaticPageNavigation,
  navMenuList,
  callBackHeaderComponent,
  hideLogo,
  isVerticalLayout,
}: HeaderProps) => {
  const [show, setShow] = useState<boolean>(false);

  typeof window !== "undefined" &&
    window?.addEventListener("scroll", function () {
      var value = window.scrollY;
      if (value > 0) {
        document
          .querySelector(".header-fixed")
          ?.classList.add("glassomorhpic-effect");
      } else {
        document
          .querySelector(".header-fixed")
          ?.classList.remove("glassomorhpic-effect");
      }
    });

  return (
    <>
      <header
        id="header"
        className={`header header-fixed ${isVerticalLayout ? "position-sticky":""}  ${
          headerContentClass ? headerContentClass : ""
        }`}
      >
        <div className="container d-flex justify-content-between align-items-center text-center h-full w-calc">
          <div className="d-flex align-items-center gap-2">
            <ConditionalRenderer
              condition={!hideNavMenu && navMenuList?.length! > 0}
            >
              <MenuToggler
                size={30}
                className="general-hover-cursor d-md-block d-lg-none mx-1"
                onClick={() => setShow(true)}
              />
            </ConditionalRenderer>
            <ConditionalRenderer condition={!hideLogo}>
              <div
                className={isVerticalLayout ? "d-none d-md-block d-lg-none" : "d-none d-md-block"}
              >
                <Logo baseUrl={baseUrl} />
              </div>
              <div
                className={"d-block d-md-none"}
              >
                <Logo baseUrl={baseUrl} isCollapsed />
              </div>
            </ConditionalRenderer>
            <ConditionalRenderer
              condition={!hideNavMenu && navMenuList?.length! > 0}
            >
              <div
                className={
                  isVerticalLayout ? "d-none" : "d-none d-lg-block"
                }
              >
                <Menu
                  navMenuList={navMenuList}
                  isStaticPageNavigation={isStaticPageNavigation}
                />
              </div>
            </ConditionalRenderer>
          </div>
          <ConditionalRenderer condition={callBackHeaderComponent}>
            {callBackHeaderComponent}
          </ConditionalRenderer>
        </div>
      </header>
      <MobileMenu
        baseUrl={baseUrl!}
        hide={() => setShow(false)}
        show={show}
        isStaticPageNavigation={isStaticPageNavigation}
        navMenuList={navMenuList}
      />
    </>
  );
};

export default Header;
