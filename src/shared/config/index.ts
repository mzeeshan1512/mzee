import AppLogo from "@/assets/logos/appLogo.png";
import ChatLogo from "@/assets/logos/chat.png";
import DefaultBg from "@/assets/bgs/home-dark.png";
import ChatBG from "@/assets/bgs/whatsapp.jpg";
import AboutPng from "@/assets/about.png"

const appName =  process.env.NEXT_PUBLIC_APP_Name || "";
const baseUrl = "";
const appIcon = AppLogo || process.env.NEXT_PUBLIC_APP_LOGO;
const chatLogo = ChatLogo || process.env.NEXT_PUBLIC_APP_CHAT_LOGO;
const layoutType: "horizontal" | "vertical" = "horizontal";
const aboutPng =  process.env.NEXT_PUBLIC_ABOUT_PNG || AboutPng;
// const DefaultBg = {
//     src:""
// }

export { appIcon, appName, baseUrl, layoutType, chatLogo, DefaultBg, ChatBG, aboutPng };
