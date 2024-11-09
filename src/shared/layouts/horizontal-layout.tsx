import React from "react";
import { FooterProps, HeaderProps } from "./(components)/types";
import Header from "./(components)/header";
import Footer from "./(components)/footer";
import ContentRender from "./content-renderer";
import Settings from "./(components)/settings";

type LayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
};

const HorizontalLayout = ({
  children,
  headerProps,
  footerProps
}: LayoutProps) => {
  return (
    <ContentRender>
      <Header {...headerProps} />
      {children}
      <Footer {...footerProps} />
      <Settings />
    </ContentRender>
  );
};

export default HorizontalLayout;

export type { LayoutProps };
