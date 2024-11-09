import React, { ReactNode } from "react";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import Header from "@/shared/components/header";
import Footer from "@/shared/components/footer";
import Settings from "./settings/index";

type Props = {
  children: ReactNode;
  callBackHeaderComponent?: ReactNode | any;
} & LayoutProps;

const HorizontalLayout = (props: Props) => {
  return (
    <>
      <ConditionalRenderer condition={!props?.hideHeader}>
        <Header
        {...props}
        />
      </ConditionalRenderer>
        {props.children}
        <ConditionalRenderer condition={!props?.hideFooter}>
          <Footer
           {...props}
          />
        </ConditionalRenderer>
      <ConditionalRenderer condition={!props?.hideSettings}>
        <Settings
        {...props}
        />
      </ConditionalRenderer>
    </>
  );
};

export default HorizontalLayout;
