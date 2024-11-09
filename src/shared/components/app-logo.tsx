import React from "react";
import Link from "next/link";
import Image from "next/image";
import { appIcon, baseUrl as appBaseURL, chatLogo } from "@/shared/config";

const Logo = ({
  baseUrl = appBaseURL || "/",
  isCollapsed = false,
  icon = null,
}: {
  baseUrl?: string;
  icon?: any;
  isCollapsed?: boolean;
}) => {
  return (
    <Link href={baseUrl}>
      <Image
        src={icon || isCollapsed ? chatLogo! : appIcon!}
        alt="M."
        width={isCollapsed ? 50 : 150}
        height={50}
        className="transition-ease-in-out img-size-clamped"
      />
    </Link>
  );
};

export default Logo;
