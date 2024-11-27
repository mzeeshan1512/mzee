import Image from "next/image";
import { appIcon, appName } from "../app-config";

const ScreenLoader = () => {
  return (
    <div className="w-full h-screen fixed inset-0 flex justify-center items-center">
      <Image
        src={appIcon}
        alt={appName || ""}
        className={"animate-grayscale aspect-video"}
      />
    </div>
  );
};

export default ScreenLoader;
