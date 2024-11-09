"use client";
import React, { ReactNode, useContext } from "react";
import { LayoutThemeContext } from "@/shared/context";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import HorizontalLayout from "./horizontal-layout";
import VerticalLayout from "./vertical-layout";
import Settings from "./settings";

type Props = {
  children: ReactNode;
  callBackHeaderComponent?: ReactNode | any;
} & LayoutProps;
const LayoutController = (props: Props) => {
  const layoutThemeContext = useContext(LayoutThemeContext);
  return (
    <>
      {layoutThemeContext?.layout?.layout === "horizontal" ? (
        <HorizontalLayout {...props} hideSettings={false}>{props?.children}</HorizontalLayout>
      ) : (
        <VerticalLayout {...props} hideSettings={false}>{props?.children}</VerticalLayout>
      )}
      <ConditionalRenderer condition={!props?.hideSettings}>
        <Settings
          hiderScrollToTop={props?.hiderScrollToTop!}
          excludeSettingsList={props?.excludeSettingsList}
        />
      </ConditionalRenderer>
    </>
  );
};

export default LayoutController;
