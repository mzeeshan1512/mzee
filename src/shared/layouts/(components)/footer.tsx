import React from "react";
import { FooterProps } from "./types";
import Logo from "./app-logo";
import ShowIf from "@/shared/components/show-if";

const Footer = ({
  appIcon,
  footerCallBackComponent,
  footerTagProps
}: FooterProps) => {
  return (
    <footer
      {...footerTagProps}
      className={`container mx-auto w-calc-10 p-4 flex justify-between items-center flex-col lg:flex-row ${
        footerTagProps?.className || ""
      }`}
    >
      {/* Conditional Logo Display */}
      <ShowIf conditionalRenderKey={!appIcon?.hideIcon}>
        <Logo {...appIcon} isCollapsed={false} />
      </ShowIf>
      {/* Footer Text */}
      <p className="my-1 text-center select-none">
        <span>© {new Date().getFullYear()} </span>
        <span className="border-l px-2 border-r mx-2">
          All rights reserved ✨
        </span>
        <span>Empowering dreams, protecting creativity.</span>
      </p>
      {/* Conditional Footer Callback Component */}
      <ShowIf conditionalRenderKey={footerCallBackComponent}>
        {footerCallBackComponent}
      </ShowIf>
    </footer>
  );
};

export default Footer;
