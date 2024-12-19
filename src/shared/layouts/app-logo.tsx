import React from "react";
import Image, { ImageProps } from "next/image";
import { appIcon, chatLogo, appName } from "@/shared/app-config";

type AppIconProps = {
  icon?: JSX.Element | null;
  isCollapsed?: boolean;
  imgProps?: ImageProps | React.ComponentProps<"img">;
  hideIcon?: boolean;
};

const AppIcon = ({
  isCollapsed = false,
  icon = null,
  imgProps,
  hideIcon
}: AppIconProps) => {
  if (hideIcon) {
    return null;
  }
  return (
    <Image
      {...imgProps}
      src={imgProps?.src || icon || isCollapsed ? chatLogo! : appIcon!}
      alt={imgProps?.alt || appName || ""}
      width={imgProps?.width ? +imgProps?.width : isCollapsed ? 50 : 250}
      height={imgProps?.height ? +imgProps?.height : 100}
      className={
        "transition-all duration-500 ease-in-out delay-100 drop-shadow-lg " +
          imgProps?.className || ""
      }
    />
  );
};

export { AppIcon };

export type { AppIconProps };
