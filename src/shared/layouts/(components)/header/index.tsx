"use client";
import React from "react";
import dynamic from "next/dynamic";
/* shared */
import ShowIf from "@/shared/components/show-if";
import { MenuToggler } from "@/shared/icon/common";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { useWindowEvent } from "@/shared/hooks/use-window-event";
/* inherit */
import { HeaderProps } from "../types";
import { AppIcon } from "../app-logo";
import useScrollSpy from "@/shared/hooks/use-scroll-into-view/use-scroll-spy";
//dynamic
const Menu = dynamic(() => import("./menu"), { ssr: false });
const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false });

const Header = ({
  menuProps,
  /* header props */
  hideHeader = false,
  headerContainerProps,
  callBackComponent,
  centeredMode,
  floatingMenu,
  showStickyNavRoutesOrId,
  appIcon,
  ...restHeaderProps
}: HeaderProps) => {
  const [floating, toggleFloating] = React.useState<boolean>(false);
  const [isHovered, toggleHovered] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  let scrollTimeout: NodeJS.Timeout | null = null;

  const matchMedia = useMediaQuery("(min-width: 1024px)", true, {
    getInitialValueInEffect: false
  });
  const mediumDeviceMedia = useMediaQuery("(max-width: 1024px)", true, {
    getInitialValueInEffect: false
  });

  const classToggler = () => {
    const value = window?.scrollY;
    if (value > 0) {
      if (matchMedia && centeredMode && floatingMenu) {
        toggleFloating(true);
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          toggleFloating(false);
        }, 200);
      } else {
        document.querySelector(".fixed")?.classList.add("glassomorhpic-effect");
      }
    } else {
      document
        .querySelector(".fixed")
        ?.classList.remove("glassomorhpic-effect");
    }
  };

  useWindowEvent("scroll", classToggler);

  const { elementName, isInView } = useScrollSpy({
    id: showStickyNavRoutesOrId!
  });

  const renderAppIcon = () => {
    return (
      <div className="flex gap-2 items-center">
        <ShowIf
          conditionalRenderKey={
            !menuProps?.hideMenu &&
            menuProps?.menuList &&
            menuProps?.menuList?.length > 0
          }
        >
          <MenuToggler
            className="cursor-pointer hover:text-primary-500 block lg:hidden mx-1"
            onClick={() => setShow(true)}
          />
        </ShowIf>
        <ShowIf conditionalRenderKey={!appIcon?.hideIcon}>
          <AppIcon {...appIcon} />
        </ShowIf>
      </div>
    );
  };

  if (hideHeader) {
    return null;
  }

  return (
    <>
      <header
        {...restHeaderProps}
        id={restHeaderProps.id || "header"}
        className={`header w-screen fixed inset-x-0 top-0 z-50 h-20 transition-all duration-200 ease-in-out bg-transparent select-none ${
          menuProps?.verticalLayout ? "sticky" : ""
        }  ${restHeaderProps?.className || ""} ${
          centeredMode || floatingMenu
            ? "shadow-none flex justify-center p-4 lg:p-0 lg:pt-4"
            : "shadow dark:shadow-white p-4"
        }`}
        onMouseOver={() => (floatingMenu ? toggleHovered(true) : () => {})}
        onMouseLeave={() => (floatingMenu ? toggleHovered(false) : () => {})}
      >
        {/* standard-header */}
        <ShowIf
          conditionalRenderKey={!matchMedia || (!centeredMode && !centeredMode)}
        >
          <div
            {...headerContainerProps}
            className={`${
              centeredMode || floatingMenu ? "block lg:hidden" : ""
            } container mx-auto flex justify-between items-center gap-2 h-full ${
              headerContainerProps?.className || ""
            }`}
          >
            {/* app-icon and menu-toggler */}
            <ShowIf
              conditionalRenderKey={
                !appIcon?.hideIcon ||
                (!menuProps?.hideMenu &&
                  menuProps?.menuList &&
                  menuProps?.menuList?.length > 0)
              }
            >
              {renderAppIcon()}
            </ShowIf>
            {/* menu-bar */}
            <ShowIf
              conditionalRenderKey={
                !menuProps?.hideMenu &&
                menuProps?.menuList &&
                menuProps?.menuList?.length > 0
              }
            >
              <Menu
                {...menuProps}
                navTagProps={{
                  ...menuProps?.navTagProps,
                  className: `${menuProps?.navTagProps?.className} flex-1 hidden lg:block`
                }}
              />
            </ShowIf>
            {/* call-back-component */}
            <ShowIf conditionalRenderKey={callBackComponent}>
              {callBackComponent}
            </ShowIf>
          </div>
        </ShowIf>
        {/* center-mode or floating menu */}
        <ShowIf
          conditionalRenderKey={
            matchMedia &&
            centeredMode &&
            !menuProps?.hideMenu &&
            menuProps?.menuList &&
            menuProps?.menuList?.length > 0
          }
        >
          <Menu
            {...menuProps}
            navTagProps={{
              ...menuProps?.navTagProps,
              className: `${
                menuProps?.navTagProps?.className || ""
              } hidden lg:block glassy-effect p-3 rounded shadow max-w-[calc(100vw-25%)]
      transition-opacity duration-500 ease-out
      transition-transform duration-700 ease-out
      flex align-middle self-center 
      shadow dark:shadow-white glassomorhpic-effect-center-nav
      ${
        floating ||
        isHovered ||
        (elementName === showStickyNavRoutesOrId && isInView)
          ? "opacity-100 translate-y-2"
          : "opacity-0 -translate-y-1"
      }`
            }}
            ulTagProps={{
              ...menuProps?.ulTagProps,
              className: `${
                menuProps?.ulTagProps?.className || ""
              } justify-center items-center`
            }}
          />
        </ShowIf>
      </header>
      <ShowIf
        conditionalRenderKey={
          mediumDeviceMedia &&
          (!appIcon?.hideIcon ||
            (!menuProps?.hideMenu &&
              menuProps?.menuList &&
              menuProps?.menuList?.length > 0))
        }
      >
        <MobileMenu
          appIcon={appIcon!}
          menuProps={menuProps!}
          open={show}
          close={() => setShow(false)}
        />
      </ShowIf>
    </>
  );
};

export default Header;
