import React, { ReactNode } from "react";
import SideBar from "@/shared/components/header/side-bar";
import HorizontalLayout from "./horizontal-layout";

type Props = {
  children: ReactNode;
  callBackHeaderComponent?: ReactNode | any;
} & LayoutProps;

const VerticalLayout = (props: Props) => {
  return (
    <>
      <div className="vertical-layout d-lg-flex">
        <SideBar {...props} />
        <div className="content-container position-relative">
          <HorizontalLayout
            {...props}
            headerContentClass={"container-override theme-bg shadow"} // in side bar layout we need give this class for making every thing upto the theme
            footerContentClass={"justify-content-between justify-content-lg-center"} // in side bar layout we need give this class for making every thing upto the theme
            isVerticalLayout={true}
          >
            <div className="content-wrapper" id="content-container">
              {props?.children}
            </div>
          </HorizontalLayout>
        </div>
      </div>
    </>
  );
};

export default VerticalLayout;
