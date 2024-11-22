import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  appIcon,
  baseUrl as appBaseURL,
  chatLogo,
  appName
} from "@/shared/app-config";
import { AppIconProps } from "./types";

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
      width={imgProps?.width ? +imgProps?.width : isCollapsed ? 50 : 150}
      height={imgProps?.height ? +imgProps?.height : 50}
      className={
        "transition-all duration-500 ease-in-out delay-100 " +
          imgProps?.className || ""
      }
    />
  );
};

const Logo = ({
  baseUrl = appBaseURL || "/",
  linkProps,
  ...rest
}: AppIconProps) => {
  if (rest?.hideIcon) {
    return null;
  }
  return (
    <Link {...linkProps} href={linkProps?.href || baseUrl}>
      <AppIcon {...rest} />
    </Link>
  );
};

export { AppIcon };

export type { AppIconProps };

export default Logo;
