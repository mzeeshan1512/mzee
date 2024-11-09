"use client";
import React from "react";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import Breadcrumbs from "@/shared/components/breadcrumbs";
import Button from "@/shared/components/button";
import IconLabel from "@/shared/components/icon-label";

const ContentHeader = ({
  breadCrumbs,
  buttonControl,
  showButtonControl = true,
  contentClassName = "",
  CallBackComponent,
  CallBackButtonComponent,
}: ContentHeader) => {
  
  return (
    <div
      className={`d-flex justify-content-between flex-wrap align-items-center text-center ${contentClassName}`}
    >
      <div className="flex-grow-1 flex-shrink-1">
        <Breadcrumbs
          parent={breadCrumbs?.parent!}
          childList={breadCrumbs?.childList!}
        />
      </div>
      <ConditionalRenderer condition={CallBackComponent}>
        <div className="flex-grow-1 flex-shrink-1">{CallBackComponent}</div>
      </ConditionalRenderer>
      <ConditionalRenderer
        condition={CallBackButtonComponent || showButtonControl}
      >
        <div className="flex-grow-1 flex-shrink-1 d-flex gap-2 justify-content-end">
          <ConditionalRenderer condition={CallBackButtonComponent}>
            {CallBackButtonComponent}
          </ConditionalRenderer>
          {/* button */}
          <ConditionalRenderer condition={showButtonControl}>
            <Button {...buttonControl} type="submit">
              <ConditionalRenderer
                condition={!buttonControl?.hideIcon}
                component={buttonControl?.content || "Button"}
              >
                <IconLabel
                  icon={buttonControl?.icon!}
                  title={buttonControl?.content || "Button"}
                />
              </ConditionalRenderer>
            </Button>
          </ConditionalRenderer>
        </div>
      </ConditionalRenderer>
    </div>
  );
};

export default ContentHeader;
