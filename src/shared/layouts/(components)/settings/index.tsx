import React from "react";
import ScrollToTop from "./scroll-to-top";
import WhatsAppChat from "./whats-app-chat";
import ThemeToggler from "@/shared/theme/theme-toggler";

const settingContentTailwindClass = `h-9 w-9 p-0.5 rounded-full cursor-pointer transition-all ease-in duration-300 flex justify-center items-center`;
const settingBgHoverTailwindClass = ` bg-primary-gradient hover:opacity-80`;

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
      <ScrollToTop />
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
