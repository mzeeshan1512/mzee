import React from "react";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import Logo from "@/shared/components/app-logo";

const Footer = ({
  baseUrl,
  footerCallbackComponent,
  hideLogo,
  footerContentClass,
  isVerticalLayout,
}: FooterProps & {
  isVerticalLayout?: boolean;
}) => {
  return (
    <footer className={`theme-bg shadow`}>
      <div
        className={`container ${
          footerContentClass ? footerContentClass : "justify-content-between"
        } d-flex  py-3 align-items-center flex-col flex-lg-row`}
      >
        <ConditionalRenderer condition={!hideLogo}>
          <div className={isVerticalLayout ? "d-none d-md-block d-lg-none my-1" : "d-none d-md-block my-1"}>
            <Logo baseUrl={baseUrl} />
          </div>
          <div className={"d-block d-md-none my-1"}>
            <Logo baseUrl={baseUrl} isCollapsed />
          </div>
        </ConditionalRenderer>
        <p className="my-1 text-unelectable text-center">
          <span>Copyright © {new Date().getFullYear()} &nbsp; </span>
          <span className="general-hover-cursor text-decoration-underline">
            {process.env.NEXT_PUBLIC_FOOTER_TITLE}
          </span>
          <span>&nbsp; All Rights Reserved.</span>
        </p>
        <ConditionalRenderer condition={footerCallbackComponent}>
          <div className="my-1">{footerCallbackComponent}</div>
        </ConditionalRenderer>
      </div>
    </footer>
  );
};

export default Footer;
