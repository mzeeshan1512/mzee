import React from "react";
import Image from "next/image";
import { appIcon } from "@/shared/config";
import Modal from "../modal";

const ScreenLoader = ({ loading = false }: { loading: boolean }) => {
  return (
    <Modal 
    open={loading}
    preventClose
    ContentClass="screen-Loader"
    noDefaultClass
    >
      <Image
        src={appIcon}
        alt="logo"
        className="color-transform"
      />
    </Modal>
  );
};

export default ScreenLoader;
