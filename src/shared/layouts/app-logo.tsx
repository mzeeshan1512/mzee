import React from "react";
import Image from "next/image";
import appIcon from "@/assets/logos/appLogo.png";

const AppIcon = ({ className = "" }: { className?: string }) => {
  return (
    <Image
      src={appIcon!}
      alt={process.env.NEXT_PUBLIC_APP_Name ?? ""}
      width={250}
      height={100}
      className={
        "transition-all duration-500 ease-in-out delay-100 drop-shadow-lg " +
        className
      }
    />
  );
};

export { AppIcon };