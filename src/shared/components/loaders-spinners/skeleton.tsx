import { appIcon } from "@/shared/config";
import Image from "next/image";
import React, { ComponentProps, CSSProperties } from "react";

type Props = {
  height?: string | number;
  width?: string | number;
  items?: number;
} & ComponentProps<"div">;

const SkeletonLoader = (props: Props) => {
  return (
    <div
      className={`skeleton-loading rounded ${props.className || ""}`}
      style={{ height: props.height, width: props.width,
        ...props.style
       }}
    />
  );
};

const FormSkeleton = ({ items = 1, height = 40, width = "100%" }: Props) => {
  const list = new Array(items).fill(0);
  return (
    <div className="d-flex flex-column gap-3 my-2">
      {list?.map((item, index) => (
        <SkeletonLoader height={height} width={width} key={index} />
      ))}
    </div>
  );
};
const DynamicLoader = () => {
  return (
    <div className="screen-Loader">
      <Image src={appIcon} alt="logo" className="color-transform" />;
    </div>
  );
};

const ContentHeaderLoader = () => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex gap-2">
        {[1, 2, 3].map((i, index) => (
          <SkeletonLoader width={100} height={25} key={index} />
        ))}
      </div>
      <SkeletonLoader width={200} height={40} />
    </div>
  );
};

export { FormSkeleton, DynamicLoader, ContentHeaderLoader };

export default SkeletonLoader;
