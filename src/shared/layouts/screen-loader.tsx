import Image from "next/image";
import { appIcon, appName } from "../app-config";

const ScreenLoader = () => {
  return <div className="w-full h-screen fixed inset-0 flex justify-center items-center !bg-neutral-700 bg-opacity-50">
      <Image src={appIcon} alt={appName || ""} className={"animate-grayscale-transform w-[clamp(200px,30vw,30%)] h-[clamp(100px,5vw,150px)] aspect-video"} />
    </div>;
};

export default ScreenLoader;
