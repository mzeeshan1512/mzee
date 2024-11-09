"use client";
import React, { useRef, useEffect } from "react";
import { Cross } from "@/shared/icons/common";
import Logo from "@/shared/components/app-logo";
import Menu from "./menu";

const MobileMenu = ({
  show,
  hide,
  isStaticPageNavigation,
  navMenuList,
  baseUrl,
}: {
  show: Boolean;
  hide: (e?: any) => void;
  baseUrl: string;
} & MenuProps) => {
  const menuRef: any = useRef<any>(null);
  const handleClickOutside = (event: any) => {
    if (menuRef?.current && !menuRef?.current.contains(event.target)) {
      hide();
    }
  };

  useEffect(() => {
    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // eslint-disable-next-line
  }, [show]);

  useEffect(() => {
    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document?.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="mobile-menu d-md-block d-lg-none ">
      <div className={`backdrop ${show && "backdrop-show"}`} />
      <div className={`menu theme-bg ${show && "active"} container`} ref={menuRef}>
        <div className="d-flex justify-content-between align-items-center">
          <Logo baseUrl={baseUrl} />
          <Cross
            className="general-hover-cursor"
            size={30}
            onClick={() => hide()}
          />
        </div>
        <Menu
          navMenuList={navMenuList}
          isStaticPageNavigation={isStaticPageNavigation}
          linkCallBackClick={()=>hide()}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
