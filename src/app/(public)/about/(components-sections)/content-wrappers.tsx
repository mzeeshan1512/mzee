import Image from "next/image";
import React from "react";

type ListWrapperProps<T> = {
  listProps?: React.ComponentProps<"ul">;
  listItem?: React.ComponentProps<"li">;
  list: T[];
  children: React.ReactNode;
};

const ListWrapper = <T,>({
  list,
  listItem,
  listProps,
  children
}: ListWrapperProps<T>) => {
  return (
    <ul
      {...listProps}
      className={
        "order-2 md:order-1 list-[square] ps-5 marker:text-primary-500 md:col-span-2 " +
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
          key={index}
          data-aos="zoom-in-right"
          data-aos-duration="1000"
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
};

const StickyImageWrapper = ({
  imgAlt,
  imgSrc,
  containerProps,
  imageClassName,
  wrapperProps,
  mainWrapperProps
}: StickyImageWrapperProps) => {
  return (
    <div
      {...mainWrapperProps}
      className={"order-1 md:order-2 " + (mainWrapperProps?.className || "")}
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
            src={imgSrc}
            alt={imgAlt || process.env.NEXT_PUBLIC_APP_Name || ""}
            className={
              "w-full p-2 rounded-full aspect-square drop-shadow-[-1px_2px_5px_var(--secondary)] dark:drop-shadow-[-1px_2px_5px_var(--primary)] " +
              (imageClassName || "")
            }
          />
        </div>
      </div>
    </div>
  );
};

export { ListWrapper, StickyImageWrapper };

export type { ListWrapperProps, StickyImageWrapperProps };
