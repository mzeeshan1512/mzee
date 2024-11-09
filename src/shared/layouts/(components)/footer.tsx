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
      className={`container mx-auto p-4 flex justify-between items-center flex-col lg:flex-row ${
        footerTagProps?.className || ""
      }`}
    >
      {/* Conditional Logo Display */}
      <ShowIf conditionalRenderKey={!appIcon?.hideIcon}>
        <Logo {...appIcon} isCollapsed={false} />
      </ShowIf>
      {/* Footer Text */}
      <p className="my-1 text-center select-none">
        <span>Copyright © {new Date().getFullYear()} &nbsp; </span>
        <span className="cursor-pointer underline">
          {process.env.NEXT_PUBLIC_FOOTER_TITLE}
        </span>
        <span>&nbsp; All Rights Reserved.</span>
      </p>
      {/* Conditional Footer Callback Component */}
      <ShowIf conditionalRenderKey={footerCallBackComponent}>
        {footerCallBackComponent}
      </ShowIf>
    </footer>
  );
};

export default Footer;
