import React from "react";
import { FooterProps, HeaderProps } from "./(components)/types";
import Header from "./(components)/header";
import Footer from "./(components)/footer";
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
    <>
      <Header {...headerProps} />
      {children}
      <Footer {...footerProps} />
      <Settings />
    </>
  );
};

export default HorizontalLayout;

export type { LayoutProps };
