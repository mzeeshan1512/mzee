"use client";
import React, { useMemo } from "react";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import { SettingIcon } from "@/shared/icons/common";
import ThemeToggler, {LayoutToggler} from "./layout-theme-toggler";
import ScrollToTop from "./scroll-to-top";
import WhatsAppChat from "./whats-app-chat-button";

const LayoutHandler = ({
  hiderScrollToTop = false,
  excludeSettingsList,
}: LayoutProps) => {
  const LayoutList: {
    title: LayoutHandlerList;
    Component: any;
    styles?: any;
  }[] = [
    {
      title: "whatsapp",
      Component: WhatsAppChat,
      styles: { background: "#25d366" }
    },
    {
      title: "theme-toggler",
      Component: ThemeToggler
    },
    {
      title: "layout-toggler",
      Component: LayoutToggler
    } 
  ];

  const list = useMemo(() => {
    return LayoutList.filter(
      (item) => !excludeSettingsList?.includes(item.title)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excludeSettingsList]);

  return (
    <>
      <ConditionalRenderer condition={list?.length > 0}>
        <ConditionalRenderer
          condition={list.length > 2}
          component={
            <div className="setting-visibility">
              {list?.map((item, index) => (
                <div
                  className="settings-content shadow"
                  key={index}
                  style={{ ...item?.styles }}
                >
                  <item.Component key={index} />
                </div>
              ))}
            </div>
          }
        >
          <div
            className="group-setting-visibility"
          >
            <SettingIcon/>
            <div
              className={`content-visibility`}
            >
              {list?.map((item, index) => (
                <div
                  className="settings-content shadow"
                  key={index}
                  style={{ ...item?.styles }}
                >
                  <item.Component key={index} />
                </div>
              ))}
            </div>
          </div>
        </ConditionalRenderer>
      </ConditionalRenderer>
      <ConditionalRenderer condition={!hiderScrollToTop}>
        <ScrollToTop />
      </ConditionalRenderer>
    </>
  );
};

export default LayoutHandler;
