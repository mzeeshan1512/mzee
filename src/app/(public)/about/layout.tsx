import HorizontalLayout from "@/shared/layouts/horizontal-layout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HorizontalLayout
        headerProps={{
          menuProps: {
            hideMenu: true
          },
          headerContainerProps: {
            className: "w-calc-10 p-4"
          }
        }}
      >
        {children}
      </HorizontalLayout>
    </>
  );
};

export default layout;
