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
        <div className="container mx-auto w-calc-10 p-4 min-h-[calc(100vh-160px)] border">
          {children}
        </div>
      </HorizontalLayout>
    </>
  );
};

export default layout;
