import React from "react";
import { FooterProps, HeaderProps } from "./(components)/types";
import Header from "./(components)/header";
import Footer from "./(components)/footer";
import Settings from "./(components)/settings";
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
