import React, { ComponentProps, useEffect, useState } from "react";
import ErrorImage from "@/assets/image-load-error.png";
import SkeletonLoader from "./loaders-spinners/skeleton"; // Assuming this is your loader component
import Image, { ImageProps } from "next/image";
import ConditionalRenderer from "./conditional-renderer";

const ImagePreviewer = (
  props: { nextImage?: boolean; fallbackSrc?: string } & ComponentProps<"img"> &
    ImageProps
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState<any>(props.src);

  const handleImageError = () => {
    if (props.fallbackSrc) {
      setSrc(props.fallbackSrc || ErrorImage?.src);
    }
    setIsLoading(false);
  };

  return (
    <div className="position-relative">
      <ConditionalRenderer condition={isLoading}>
        <div className="position-absolute w-full h-full">
          <SkeletonLoader style={{
            height:"100%",
            width:"100%"
          }}  />
        </div>
      </ConditionalRenderer>
      <ConditionalRenderer
        condition={!props.nextImage}
        component={
          <Image
            loading="lazy"
            {...props}
            alt={props.alt || ""}
            src={src}
            onLoadingComplete={() => setIsLoading(false)}
            onError={handleImageError}
          />
        }
      >
         {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" {...props}  alt={props.alt || ""} src={src}  onLoad={() => setIsLoading(false)} onError={handleImageError} />
      </ConditionalRenderer>
    </div>
  );
};

export default React.memo(ImagePreviewer);
