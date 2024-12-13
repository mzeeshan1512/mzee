import React from "react";
import { FooterProps, HeaderProps } from "./(components)/types";
import dynamic from "next/dynamic";
const Header = dynamic(()=>import("./(components)/header"),{ssr:false});
const Footer = dynamic(()=>import("./(components)/footer"),{ssr:true});
const Settings = dynamic(()=>import("./(components)/settings"),{ssr:true});
import ShowIf from "../components/show-if";

type LayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  hideSetting?: boolean;
  hideFooter?: boolean;
  hideHeader?: boolean;
};

const HorizontalLayout = ({
  children,
  headerProps,
  footerProps,
  hideFooter,
  hideHeader,
  hideSetting
}: LayoutProps) => {
  return (
    <>
      <ShowIf conditionalRenderKey={!hideHeader}>
        <Header {...headerProps} />
      </ShowIf>
      {children}
      <ShowIf conditionalRenderKey={!hideFooter}>
        <Footer {...footerProps} />
      </ShowIf>
      <ShowIf conditionalRenderKey={!hideSetting}>
        <Settings />
      </ShowIf>
    </>
  );
};

export default HorizontalLayout;

export type { LayoutProps };
