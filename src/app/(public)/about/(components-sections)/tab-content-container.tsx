"use client";
import React from "react";
import ShowIf from "@/shared/components/show-if";
import { CarouselButton } from "@/shared/components/carousel";

type TabContentContainerProps = {
  title?: string;
  children: React.ReactNode;
  hideNavIcons?: boolean;
};

const TabContentContainer = ({
  children,
  title,
  hideNavIcons
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
    <section className="relative flex-1 drop-shadow-md dark:shadow-white p-4 rounded">
      <ShowIf conditionalRenderKey={title}>
        <h1 className="capitalize text-[clamp(15px,2vw,2vw+15px)] ">{title}</h1>
      </ShowIf>
      <div className="h-[calc(100vh-265px)] overflow-auto ">
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
