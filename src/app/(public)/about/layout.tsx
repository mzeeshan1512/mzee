import ContactModal from "@/shared/components/contact-form/contact-modal";
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
          },
          callBackComponent: (
            <div className="flex-1 grid grid-cols-2 items-center">
              <h1 className="text-2xl text-right font-bold">About</h1>
              <div className="flex justify-end">
                <ContactModal />
              </div>
            </div>
          )
        }}
      >
        {children}
      </HorizontalLayout>
    </>
  );
};

export default layout;
