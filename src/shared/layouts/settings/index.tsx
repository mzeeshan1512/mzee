import React from "react";
import WhatsAppChat from "./whats-app-chat";
import ThemeToggler from "@/shared/theme/theme-toggler";
import {
  settingBgHoverTailwindClass,
  settingContentTailwindClass
} from "@/shared/constants-enums/reused-tailwind-css";

const webSettings = [
  {
    component: (
      <WhatsAppChat name={process.env.NEXT_PUBLIC_APP_Name || "Whats App"} />
    ),
    className: `${settingContentTailwindClass} bg-green-500`
  },
  {
    className: `${settingContentTailwindClass} ${settingBgHoverTailwindClass}`,
    component: <ThemeToggler />
  }
];
const Settings = () => {
  return (
    <div
      className="fixed bottom-4 right-4 
            z-[10] text-white flex gap-2 items-center justify-center"
    >
      <div className="flex flex-col gap-2">
        {webSettings?.map((item, index) => (
          <div className={item.className} key={index}>
            {item.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;

export { settingBgHoverTailwindClass, settingContentTailwindClass };
