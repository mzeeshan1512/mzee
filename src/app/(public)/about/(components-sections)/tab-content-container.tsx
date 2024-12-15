"use client";
import React from "react";
import ShowIf from "@/shared/components/show-if";
import { CarouselButton } from "@/shared/components/carousel";

type TabContentContainerProps = {
  title?: string;
  children: React.ReactNode;
  hideNavIcons?: boolean;
  contentClass?: string;
};

const TabContentContainer = ({
  children,
  title,
  hideNavIcons,
  contentClass = ""
}: TabContentContainerProps) => {
  const [slicedCount, setSlicedCount] = React.useState<number>(0);
  const recordsPerView = 5;
  const enhancedChildren = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, {
        slicedCount,
        recordsPerView
      })
    : children;
  return (
    <section className="relative flex-1 drop-shadow-md dark:shadow-white p-8 rounded">
      <ShowIf conditionalRenderKey={title}>
        <h1 className="capitalize text-[clamp(15px,2vw,2vw+15px)] text-primary-500">
          <b className="text-gradient">{title}</b>
        </h1>
      </ShowIf>
      <div
        className={
          "max-h-[calc(100vh-310px)] overflow-auto mt-2 grid grid-flow-row md:grid-cols-3 gap-8 relative md:pe-4 " +
          contentClass
        }
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        {enhancedChildren}
      </div>
      <ShowIf conditionalRenderKey={hideNavIcons}>
        <div className="sticky bottom-1/4 inset-x-0 z-10 flex justify-between">
          <CarouselButton className={`rotate-180 left-6 drop-shadow-md`} />
          <CarouselButton className={`-rotate-1 right-6 drop-shadow-md`} />
        </div>
      </ShowIf>
    </section>
  );
};

export default TabContentContainer;
