"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useCallback, KeyboardEvent } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ShowIf from "./show-if";

type ContentType = React.ReactNode | JSX.Element | string | number | null;

interface TabList {
  title: string;
  tabId: string;
  tabContent: ContentType;
  disabled?: boolean;
}

interface TabNavProps {
  navContainerProps?: React.ComponentProps<"nav">;
  listContainerProps?: React.ComponentProps<"ul">;
  listItemProps?: React.ComponentProps<"li">;
  activeTabClass?: string;
  callBackComponent?: ContentType;
}

interface TabProps extends TabNavProps {
  tabsList: TabList[];
  defaultActiveTab?: TabList;
  useSearchParamsToggle?: boolean;
  onTabChange?: (tab: TabList) => void;
}

const SEARCH_TAB_ID = {
  TAB_ID: "tabId",
  TAB_INDEX: "tabIndex"
};

const Tabs: React.FC<TabProps> = ({
  tabsList,
  activeTabClass = "text-gradient",
  callBackComponent,
  listContainerProps,
  listItemProps,
  navContainerProps,
  defaultActiveTab,
  useSearchParamsToggle = true,
  onTabChange
}) => {
  // Next.js navigation hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine active tab with robust fallback mechanism
  const initialActiveTab = useMemo(() => {
    // Prioritize search params, then default, then first tab
    if (searchParams) {
      const tabId = searchParams.get(SEARCH_TAB_ID.TAB_ID);
      const tabIndex = searchParams.get(SEARCH_TAB_ID.TAB_INDEX);

      if (tabIndex && tabsList[+tabIndex - 1]) return tabsList[+tabIndex - 1];
      if (tabId) {
        const foundTab = tabsList.find((tab) => tab.tabId === tabId);
        return foundTab || tabsList[0];
      }
    }

    return defaultActiveTab || tabsList[0];
  }, [searchParams, defaultActiveTab, tabsList]);

  // Active tab state
  const [activeTab, setActiveTab] = useState<TabList>(initialActiveTab);
  // Handle tab navigation with keyboard support
  // const handleTabNavigation = useCallback(
  //   (event: KeyboardEvent<HTMLUListElement>) => {
  //     const currentIndex = tabsList.findIndex(
  //       (tab) => tab.tabId === activeTab.tabId
  //     );
  //     console.log({ event });
  //     switch (event.key) {
  //       case "ArrowRight":
  //         event.preventDefault();
  //         const nextIndex = (currentIndex + 1) % tabsList.length;
  //         handleTabClick(tabsList[nextIndex], nextIndex);
  //         break;
  //       case "ArrowLeft":
  //         event.preventDefault();
  //         const prevIndex =
  //           (currentIndex - 1 + tabsList.length) % tabsList.length;
  //         handleTabClick(tabsList[prevIndex], prevIndex);
  //         break;
  //     }
  //   },
  //   [activeTab, tabsList]
  // );

  // Handle tab selection
  const handleTabClick = useCallback(
    (tab: TabList, index?: number) => {
      // Prevent selection of disabled tabs
      if (tab.disabled) return;

      if (useSearchParamsToggle && searchParams) {
        const params = new URLSearchParams(searchParams);
        tab.tabId && params.set(SEARCH_TAB_ID.TAB_ID, tab.tabId);
        index !== undefined &&
          params.set(SEARCH_TAB_ID.TAB_INDEX, (index + 1).toString());
        router.replace(`${pathname}?${params.toString()}`);
      } else {
        setActiveTab(tab);
      }

      // Optional callback for tab change
      onTabChange?.(tab);
    },
    [router, pathname, searchParams, useSearchParamsToggle, onTabChange]
  );

  const getActiveTab = useMemo(
    () => (useSearchParamsToggle ? initialActiveTab : activeTab),
    [activeTab, initialActiveTab, useSearchParamsToggle]
  );

  if (tabsList?.length < 1) {
    return <>No tab list has been provided</>;
  }

  return (
    <>
      <nav
        {...navContainerProps}
        className={`flex justify-between items-center ${
          navContainerProps?.className || ""
        }`}
      >
        <ul
          {...listContainerProps}
          className={`flex-1 flex list-none gap-4 flex-wrap ${
            listContainerProps?.className || ""
          }`}
          role="tablist"
          // onKeyDown={handleTabNavigation}
        >
          {tabsList?.map((tab, index) => (
            <li
              {...listItemProps}
              key={tab?.tabId ?? index}
              role="tab"
              aria-selected={getActiveTab?.tabId === tab.tabId}
              aria-disabled={tab.disabled ?? false}
              // tabIndex={0}
              className={`
                cursor-pointer 
                ${getActiveTab?.tabId === tab.tabId ? activeTabClass : ""}
                ${listItemProps?.className || ""}
                ${tab.disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              onClick={() => handleTabClick(tab, index)}
            >
              {tab?.title}
            </li>
          ))}
        </ul>
        <ShowIf conditionalRenderKey={callBackComponent}>
          <div role="complementary">{callBackComponent}</div>
        </ShowIf>
      </nav>
      <ShowIf
        conditionalRenderKey={getActiveTab && getActiveTab?.tabContent}
        elseCallBackMessage={"No tab content has been provided"}
      >
        {getActiveTab?.tabContent}
      </ShowIf>
    </>
  );
};

export default Tabs;
export { SEARCH_TAB_ID };
export type { TabList, TabNavProps, TabProps };
