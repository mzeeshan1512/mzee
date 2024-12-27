"use client";
import React from "react";
import Logo from "@/shared/layouts/(components)/app-logo";
import Menu from "./menu";
import { MobileMenuProps } from "../types";
import { useDocumentEvent } from "@/shared/hooks/use-window-event";
import { Cross } from "@/shared/icon/common";

const MobileMenu = ({ appIcon, close, menuProps, open }: MobileMenuProps) => {
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      close();
    }
  };

  React.useEffect(() => {
    if (open) {
      document?.body?.classList?.add("no-scroll");
    } else {
      document?.body?.classList?.remove("no-scroll");
    }
    // eslint-disable-next-line
  }, [open]);

  useDocumentEvent("mousedown", handleClickOutside);

  return (
    <div className={`fixed  ${open ? "z-[100] inset-0" : "-inset-0 -z-50"} `}>
      {/* Backdrop */}
      <div
        className={`${
          open ? "fixed left-0" : "-left-[1500px]"
        } w-full h-screen bg-black bg-opacity-60 z-100 transition-all duration-500 ease-in-out ${
          open ? "" : "hidden"
        }`}
      />

      {/* Menu */}
      <div
        className={`${
          open ? "left-0 opacity-100" : "-left-[300px] opacity-0"
        } fixed top-0 h-screen w-[290px] bg-white dark:bg-black p-10 overflow-y-auto transition-all duration-700 ease-in-out theme-bg z-100 shadow`}
        ref={menuRef}
      >
        <div className="flex justify-between items-center">
          <Logo {...appIcon} />
          <Cross
            className="cursor-pointer hover:text-primary-600"
            onClick={() => close()}
          />
        </div>
        <div className="mt-4 pt-4">
          <Menu
            {...menuProps}
            ulTagProps={{
              ...menuProps?.ulTagProps,
              className: `flex-col gap-4 ${
                menuProps?.ulTagProps?.className || ""
              }`
            }}
            liTagProps={{
              ...menuProps?.liTagProps,
              className: `!px-0 ${menuProps?.liTagProps?.className || ""}`
            }}
            showLogoAsRoute={{
              show: false,
              route: ""
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;