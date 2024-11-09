import React from "react";
import SkeletonLoader, { ContentHeaderLoader } from "./skeleton";
import FormSkeletonLoader from "./form-skeleton-loader";

const TabContentLoader = (props: {
  formFieldsList?:any;
}) => {
  return (
    <div className="p-3 d-flex gap-2 flex-column w-full h-full">
      <div className="d-flex gap-2 w-full overflow-hidden">
        {[1, 2, 3, 4, 5]?.map((_i, index) => (
          <SkeletonLoader width={100} height={40} key={index}/>
        ))}
      </div>
      <ContentHeaderLoader />
      <FormSkeletonLoader
        formFieldsList={
          props.formFieldsList || {
            "": [1, 2, 3,],
            " ": [1, 2, 3,],
            "  ": [1, 2, 3,],
          }
        }
      />
    </div>
  );
};

export default TabContentLoader;
