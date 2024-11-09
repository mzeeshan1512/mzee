"use client";
import React, { CSSProperties, ReactNode, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSafeArrayValue } from "@/shared/utils/common";
import ConditionalRenderer from "./conditional-renderer";

type tab = {
  title: string;
  content?: React.ReactNode;
  disabled?: boolean;
  asterisk?: boolean;
  id: string;
};

interface Props {
  tabsList: tab[];
  headerCallBackComponent?: any;
  children?: ReactNode;
  navBarClassName?: string;
  activeClassName?: string;
  listClassName?: string;
  contentClass?: string;
  tabClassName?: string;
  navBarStyles?: CSSProperties;
  listStyles?: CSSProperties;
  tabStyles?: CSSProperties;
  contentStyles?: CSSProperties;
  activeTab?: tab | null;
  onSetCallBackActive?: (...args: any) => void;
}

const Tabs = ({
  tabsList,
  activeClassName = "active",
  contentClass = "p-3",
  listClassName = "",
  navBarClassName = "",
  tabClassName = "",
  contentStyles,
  listStyles,
  navBarStyles,
  tabStyles,
  activeTab,
  children,
  headerCallBackComponent,
  onSetCallBackActive,
}: Props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const navigation = useRouter();
  const [active_Tab, setActiveTab] = React.useState<tab | null>(
    activeTab || getSafeArrayValue(tabsList, 0)
  );
  useEffect(() => {
    const tabId = searchParams?.get("tabId");
    if (tabId) {
      const tab = tabsList?.find((tab) => tab?.id === tabId);
      setActiveTab(tab || activeTab || getSafeArrayValue(tabsList, 0));
    } else {
      setActiveTab(activeTab || getSafeArrayValue(tabsList, 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get("tabId")]);
  return (
    <>
      <nav
        className={`d-flex justify-content-between align-items-center theme-bg bottom-shadow br-top p-2 ms-0 ${navBarClassName}`}
        style={{ ...navBarStyles }}
      >
        <ul
          className={`tab-navigation-pane ${listClassName}`}
          style={{ ...listStyles }}
        >
          {tabsList.map((tab, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                !tab.disabled && active_Tab?.id === tab.id
                  ? activeClassName + " shadow rounded"
                  : ""
              } ${tab?.disabled ? "tab-disabled " : "hover"} ${tabClassName}`}
              style={{ ...tabStyles }}
              onClick={() => {
                if (!tab.disabled) {
                  setActiveTab(tab);
                  if (onSetCallBackActive) {
                    onSetCallBackActive(tab);
                  } else navigation.push(`${pathName}?tabId=${tab.id}`);
                }
              }}
            >
              <a>{tab.title}</a>
              {tab.asterisk ? (
                <span className="ms-1 text-danger">*</span>
              ) : null}
            </li>
          ))}
        </ul>
        <ConditionalRenderer condition={headerCallBackComponent}>
          {headerCallBackComponent}
        </ConditionalRenderer>
      </nav>
      <ConditionalRenderer condition={!children} component={children}>
        <ConditionalRenderer
          condition={active_Tab?.content}
          component={<div className="p-3">No Content to render</div>}
        >
          <main className={contentClass} style={{ ...contentStyles }}>
            {active_Tab?.content}
          </main>
        </ConditionalRenderer>
      </ConditionalRenderer>
    </>
  );
};

export default Tabs;
