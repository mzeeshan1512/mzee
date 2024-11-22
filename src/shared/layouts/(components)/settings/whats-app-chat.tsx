"use client";
import React from "react";
import { WhatsApp } from "@/shared/icon/social";
import Popup from "@/shared/components/pop-up";
import { AppIcon } from "../app-logo";
import { Cross } from "@/shared/icon/common";
import { ChatBG } from "@/shared/app-config";
import TrustedRedirect from "@/shared/components/trusted-redirect";

type ChatBoxProps = {
  open: boolean;
  close: () => void;
  PopupProps?: React.ComponentProps<"div">;
};

type CommonProps = {
  name: string;
  status?: string;
  message?: string[];
};

type ChatProps = {
  ContainerProps?: React.ComponentProps<"div">;
  IconProps?: React.ComponentProps<"svg">;
} & CommonProps;

const ChatBox = ({
  open,
  close,
  PopupProps,
  name,
  status = "Typically reply's within a day",
  message = [
    "Hello! 👋",
    "Thank you for reaching out. How can I assist you today? 😊",
    "Please let me know if you have any questions or need help with anything, and I’ll be happy to assist you.",
    "Looking forward to helping you!"
  ]
}: CommonProps & ChatBoxProps) => {
  const [request, setRequest] = React.useState<string | null>("");

  const handleClose = (e: React.SyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    close();
    setRequest(null);
  };

  React.useEffect(() => {
    return () => {
      setRequest(null);
    };
  }, []);
  return (
    <Popup
      isOpen={open}
      onClose={close}
      containerProps={{
        ...PopupProps,
        className:
          "filter-none !opacity-100 absolute bottom-[135%] -right-1 h-auto w-[280px] rounded-lg text-white z-[50] shadow-primary-500" +
          (PopupProps?.className || "")
      }}
    >
      {/* chat header */}
      <div className="flex justify-between items-center p-[10px] border border-[#128c7e] bg-[#128c7e] rounded-tl-lg rounded-tr-lg">
        <figure className="flex justify-center items-center gap-2">
          <AppIcon
            isCollapsed
            imgProps={{
              width: 35,
              height: 35,
              className: "border rounded-full border-2 p-1 bg-white"
            }}
          />
          <div className="flex flex-col text-white text-left">
            <span className="text-[14px] font-bold" title={name}>
              {name?.length > 8 ? name?.substring(0, 8) + "..." : name}
            </span>
            <small
              style={{
                fontSize: "9px"
              }}
            >
              {status}
            </small>
          </div>
        </figure>
        <Cross onClick={handleClose} className="hover:text-primary-500" />
      </div>
      {/* chat container */}
      <div
        className="h-[200px] relative border-t border-white p-[5px] rounded-bl-lg rounded-br-lg"
        style={{
          backgroundImage: `url(${ChatBG?.src})`
        }}
      >
        {/* default message */}
        <div
          className="relative ml-2 p-1 bg-white min-w-[50px] max-w-[calc(100%-10px)] text-left border border-white rounded-[10px]"
          style={{
            boxShadow: "rgba(var(--primary-color), 0.15) 2.4px 2.4px 3.2px"
          }}
        >
          <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-[#fdfeff] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent"></div>
          <div className="text-primary-500 text-[10px]" title={name}>
            {message.map((data, index) => (
              <p key={index}>{data}</p>
            ))}
          </div>
        </div>
        {/* input-container */}
        <div className="absolute bottom-0 border flex justify-between items-baseline gap-2 inset-x-0 m-2">
          <div className="bg-white flex-1 rounded-[10px] hide-scroll w-full p-2">
            <textarea
              className="max-h-[50px] w-full resize-none overflow-auto border-0 h-full hide-scroll text-sm text-gray-500 font-sans focus:outline-none focus:border-0 hover:border-0"
              placeholder="Message"
              value={request || ""}
              onChange={(e) => {
                e?.preventDefault();
                e?.stopPropagation();
                setRequest(e.target.value);
              }}
            />
          </div>
          <div className="content"></div>
          <TrustedRedirect
            href={`${process.env.NEXT_PUBLIC_WHATSAPP}?text=${request}`}
            target="_blank"
            className="bg-[#128c7e] rounded-full p-1.5 w-[30px] h-[30px] flex justify-center items-center text-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </TrustedRedirect>
        </div>
      </div>
    </Popup>
  );
};

const WhatsAppChat = ({ ContainerProps, IconProps, ...rest }: ChatProps) => {
  const [show, toggle] = React.useState<boolean>(false);
  return (
    <div
      {...ContainerProps}
      className={`relative ${ContainerProps?.className || ""}`}
    >
      <WhatsApp
        {...IconProps}
        className="cursor-pointer"
        onClick={(e: React.MouseEvent<SVGSVGElement>) => {
          if (IconProps?.onClick) {
            IconProps.onClick(e);
          }
          toggle(!show);
        }}
      />
      <ChatBox open={show} close={() => toggle(false)} {...rest} />
    </div>
  );
};

export default WhatsAppChat;

export type { ChatBoxProps, ChatProps };
