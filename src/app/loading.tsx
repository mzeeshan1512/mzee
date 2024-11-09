import { appIcon } from "@/shared/config";
import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="screen-Loader">
      <Image src={appIcon} alt="logo" className="color-transform" />
    </div>
  );
};

export default Loading;
