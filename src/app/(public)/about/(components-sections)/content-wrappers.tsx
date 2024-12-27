import Image from "next/image";
import React from "react";
import ShowIf from "@/shared/components/show-if";
import TrustedRedirect from "@/shared/components/trusted-redirect";
import { DateFormat, formatDate } from "@/shared/utils/date";
import { getEndDate } from "./utils";

type ListWrapperProps<T> = {
  listProps?: React.ComponentProps<"ul">;
  listItem?: React.ComponentProps<"li">;
  list: T[];
  children: React.ReactNode;
  order?: 1 | 2;
};

const ListWrapper = <T,>({
  list,
  listItem,
  listProps,
  children,
  order = 1
}: ListWrapperProps<T>) => {
  return (
    <ul
      {...listProps}
      className={
        `order-2 ${
          order === 1 ? "md:order-1" : "md:order-2"
        } list-[square] ps-5 marker:text-primary-500 md:col-span-2 me-3 ` +
        (listProps?.className || "")
      }
    >
      {list?.map((item: any, index: number) => (
        <li
          {...listItem}
          className={
            "text-[clamp(15px,1.1vw,1.1vw+15px)] py-2 " +
            (listItem?.className || "")
          }
          // data-aos="zoom-in-right"
          // data-aos-duration="1000"
          key={index}
        >
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement, {
                ...item
              })
            : children}
        </li>
      ))}
    </ul>
  );
};

type StickyImageWrapperProps = {
  mainWrapperProps?: React.ComponentProps<"div">;
  containerProps?: React.ComponentProps<"div">;
  wrapperProps?: React.ComponentProps<"div">;
  imageClassName?: string;
  imgSrc: any;
  imgAlt: string;
  order?: 1 | 2;
};

const StickyImageWrapper = ({
  imgAlt,
  imgSrc,
  containerProps,
  imageClassName,
  wrapperProps,
  mainWrapperProps,
  order = 1
}: StickyImageWrapperProps) => {
  if (!imgSrc) {
    return null;
  }
  return (
    <div
      {...mainWrapperProps}
      className={
        `order-1 ${order === 1 ? "md:order-2" : "md:order-1"}` +
        (mainWrapperProps?.className || "")
      }
    >
      <div
        {...containerProps}
        className={
          "p-2 mx-auto md:sticky md:top-0 md:inset-x-0 overflow-hidden " +
          (containerProps?.className || "")
        }
      >
        <div
          {...wrapperProps}
          className={
            "flex flex-col gap-3 justify-center w-full items-center " +
              wrapperProps?.className || ""
          }
          data-aos="zoom-in-left"
          data-aos-duration="1000"
        >
          <Image
            src={imgSrc!}
            alt={imgAlt || process.env.NEXT_PUBLIC_APP_Name || ""}
            className={
              "w-1/2 md:w-full p-2 aspect-square drop-shadow-[-1px_2px_5px_var(--secondary)] dark:drop-shadow-[-1px_2px_5px_var(--primary)] " +
              (imageClassName || "")
            }
          />
        </div>
      </div>
    </div>
  );
};

const renderTimeLineFormat = (timeline: ExpTimelineFormat[]) => {
  return (
    <ul className="ps-5">
      {timeline?.map((item, index) => (
        <li key={index} className="text-[clamp(15px,1.1vw,1.1vw+15px)]">
          <div className="flex flex-col ps-4 py-2 relative">
            <div
              className={`absolute h-3 w-3 rounded-full top-[14px] -left-1  ${
                item?.currently ? "bg-primary-500" : "bg-slate-600"
              }`}
            />
            <div
              className={`absolute h-[95%] top-[14px] left-[0.1rem] ${
                index !== timeline?.length - 1
                  ? "border-s-2 border-spacing-2 border-slate-600"
                  : ""
              }`}
            />
            <h1>{item?.title}</h1>
            <small className="text-sm text-slate-400">
              <time>{formatDate(item?.start_date!, "MMM-YYYY")}</time>
              <span className="mx-1">-</span>
              <time>{getEndDate(item, "MMM-YYYY")}</time>
            </small>
            <small className="text-slate-300">{item.description}</small>
          </div>
        </li>
      ))}
    </ul>
  );
};

const renderTrustedDomain = (item: AboutContentDataProps) =>
  item?.link ? (
    <div className="hover-bottom-outline">
      <TrustedRedirect
        href={item?.link || undefined}
        symbol
        className={`!font-normal !text-primary-500 hover:!text-transparent hover:!font-semibold`}
      >
        {item?.organization}
      </TrustedRedirect>
    </div>
  ) : (
    <div className="!text-primary-500">{item?.organization}</div>
  );

const RenderListItemContent = ({
  format = "MMM-YYYY",
  ...listItemContent
}: AboutContentDataProps & { format?: DateFormat }) => {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <ShowIf
          conditionalRenderKey={listItemContent?.timeLine?.length! > 0}
          elseComponent={<span>{listItemContent?.title}</span>}
        >
          <div className="text-current">
            {renderTrustedDomain(listItemContent)}
          </div>
        </ShowIf>
        {listItemContent?.start_date && listItemContent?.end_date && (
          <div className="text-slate-400">
            {listItemContent.start_date && (
              <>
                <time>{formatDate(listItemContent?.start_date!, format)}</time>
                <span className="mx-1">-</span>
              </>
            )}
            {listItemContent?.end_date && (
              <time>{getEndDate(listItemContent, format!)}</time>
            )}
          </div>
        )}
      </div>
      <ShowIf
        conditionalRenderKey={listItemContent?.timeLine?.length! > 0}
        elseComponent={renderTrustedDomain(listItemContent)}
      >
        {renderTimeLineFormat(listItemContent?.timeLine!)}
      </ShowIf>
      <ShowIf conditionalRenderKey={listItemContent?.description}>
        <small className="text-slate-300">{listItemContent.description}</small>
      </ShowIf>
    </>
  );
};

const RenderCoursesList = (listContent: GroupedCoursesCertification) => {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-2 w-full text-current">
        <strong className="text-primary-500">{listContent?.prefix}</strong>
        <span className="text-slate-500">
          {listContent?.institute} - {listContent?.platform}
        </span>
      </div>
      <ul className="list-[circle] ps-5 marker:text-primary-500">
        {listContent?.courses!.map((course) => (
          <li key={course.id}>
            <div className="hover-bottom-outline">
              <TrustedRedirect
                href={course?.link || undefined}
                symbol
                className={`!font-normal hover:!text-transparent hover:!font-semibold`}
              >
                {course?.title}
              </TrustedRedirect>
            </div>
            <span className="text-slate-500">{course.verificationId}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export {
  ListWrapper,
  StickyImageWrapper,
  renderTrustedDomain,
  RenderListItemContent,
  renderTimeLineFormat,
  RenderCoursesList
};

export type { ListWrapperProps, StickyImageWrapperProps };
